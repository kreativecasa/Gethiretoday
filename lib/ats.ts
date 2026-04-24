/**
 * ATS scoring — pure functions, importable on both the server (API route) and
 * the client (builder save, dashboard rendering).
 *
 * Single source of truth for:
 *   • `resumeDataToText(data)` — flattens a structured ResumeData object into
 *     the plain-text block the scorer expects. Used by the builder when it
 *     auto-scores on save, by the dashboard when it recomputes scores on-the-
 *     fly, and by the resume-import flow when it seeds the initial score.
 *   • `calculateATSScore(text, jobDescription?)` — runs the 30-point rubric
 *     on a resume text and returns the structured `ATSCheckResult`.
 *   • `scoreResume(data, jobDescription?)` — convenience helper that
 *     combines the two and returns just the overall_score number.
 *
 * Keeping this in one file means we can never drift between "what the builder
 * saves" and "what the public /ats-checker shows" and "what the dashboard
 * displays". Previously the dashboard read a stored `ats_score` column that
 * could be months stale if the user edited without clicking Save.
 */

import type { ResumeData, ATSCheckResult } from '@/types';

/** Flatten structured resume data into a plain-text block the scorer can read. */
export function resumeDataToText(data: ResumeData): string {
  const parts: string[] = [];
  const c = data.contact ?? ({} as ResumeData['contact']);

  if (c.full_name) parts.push(c.full_name);
  if (c.email) parts.push(c.email);
  if (c.phone) parts.push(c.phone);
  if (c.location) parts.push(c.location);
  if (c.linkedin) parts.push(c.linkedin);
  if (c.website) parts.push(c.website);
  if (c.github) parts.push(c.github);

  if (data.summary) parts.push('Summary\n' + data.summary);

  if (data.work_experience?.length) {
    parts.push('Work Experience');
    for (const j of data.work_experience) {
      parts.push(`${j.job_title || ''} at ${j.company || ''}`);
      if (j.location) parts.push(j.location);
      if (j.description) parts.push(j.description);
      j.achievements?.forEach((a) => a && parts.push(a));
    }
  }

  if (data.education?.length) {
    parts.push('Education');
    for (const e of data.education) {
      parts.push(`${e.degree || ''} ${e.field_of_study || ''} ${e.institution || ''}`);
      if (e.location) parts.push(e.location);
      if (e.description) parts.push(e.description);
    }
  }

  if (data.skills?.length) {
    parts.push('Skills');
    parts.push(data.skills.map((s) => s.name).filter(Boolean).join(', '));
  }

  if (data.certifications?.length) {
    parts.push('Certifications');
    for (const cert of data.certifications) {
      parts.push(`${cert.name || ''} ${cert.issuer || ''}`);
    }
  }

  if (data.languages?.length) {
    parts.push('Languages');
    parts.push(data.languages.map((l) => l.name).filter(Boolean).join(', '));
  }

  if (data.projects?.length) {
    parts.push('Projects');
    for (const p of data.projects) {
      parts.push(p.name || '');
      if (p.description) parts.push(p.description);
      if (p.technologies?.length) parts.push(p.technologies.join(', '));
    }
  }

  if (data.volunteer_work?.length) {
    parts.push('Volunteer Work');
    for (const v of data.volunteer_work) {
      parts.push(`${v.role || ''} at ${v.organization || ''}`);
      if (v.description) parts.push(v.description);
    }
  }

  return parts.filter(Boolean).join('\n');
}

/** The core 30-point ATS rubric. Pure function — no IO, no state. */
export function calculateATSScore(
  resumeText: string,
  jobDescription?: string
): ATSCheckResult {
  const text = resumeText.toLowerCase();
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  // Contact info checks
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /(\+?1?\s?)?(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/.test(text);
  const hasLinkedIn = text.includes('linkedin');

  // Section checks
  const hasSummary = text.includes('summary') || text.includes('objective') || text.includes('profile');
  const hasExperience = text.includes('experience') || text.includes('employment') || text.includes('work history');
  const hasEducation = text.includes('education') || text.includes('degree') || text.includes('university') || text.includes('college');
  const hasSkills = text.includes('skills') || text.includes('technologies') || text.includes('proficiencies');

  // Formatting red flags
  const hasTableKeywords = text.includes('colspan') || text.includes('rowspan');
  const hasGraphicKeywords = text.includes('<svg') || text.includes('<img');

  // Score calculation
  if (hasEmail) score += 10; else issues.push('Missing email address');
  if (hasPhone) score += 8; else issues.push('Missing phone number');
  if (hasLinkedIn) score += 5; else suggestions.push('Add your LinkedIn profile URL');
  if (hasSummary) score += 12; else { score -= 5; issues.push('No professional summary detected'); }
  if (hasExperience) score += 20; else issues.push('Work experience section missing or not clearly labeled');
  if (hasEducation) score += 10; else suggestions.push('Add education section');
  if (hasSkills) score += 12; else { issues.push('Skills section missing'); suggestions.push('Add a dedicated Skills section'); }
  if (!hasTableKeywords) score += 8;
  if (!hasGraphicKeywords) score += 5;

  // Length check
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 300 && wordCount <= 800) score += 10;
  else if (wordCount < 300) {
    issues.push('Resume appears too short (under 300 words)');
    suggestions.push('Expand work experience bullet points with quantified achievements');
  } else {
    suggestions.push('Resume may be too long for ATS — aim for 1-2 pages');
  }

  // Keyword matching
  let keywordScore = 0;
  if (jobDescription) {
    const jobWords = jobDescription.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    const matches = jobWords.filter((w) => text.includes(w));
    keywordScore = Math.min(20, Math.round((matches.length / Math.max(jobWords.length, 1)) * 20));
    score += keywordScore;
    if (keywordScore < 10) suggestions.push('Add more keywords from the job description');
  } else {
    score += 10; // neutral if no job description
  }

  score = Math.max(0, Math.min(100, score));

  return {
    overall_score: score,
    sections: {
      keywords: {
        score: jobDescription ? keywordScore * 5 : 70,
        issues: [],
        suggestions: jobDescription ? [] : ['Paste a job description for targeted keyword analysis'],
      },
      formatting: {
        score: !hasTableKeywords && !hasGraphicKeywords ? 90 : 50,
        issues: hasTableKeywords ? ['Tables detected — ATS may fail to parse'] : [],
        suggestions: ['Use simple formatting with no tables or graphics'],
      },
      structure: {
        score: hasSummary && hasExperience && hasEducation && hasSkills ? 95 : 60,
        issues: [],
        suggestions: [],
      },
      contact: {
        score: hasEmail && hasPhone ? 95 : hasEmail ? 70 : 40,
        issues: !hasEmail ? ['No email found'] : [],
        suggestions: !hasPhone ? ['Add phone number'] : [],
      },
      experience: {
        score: hasExperience ? 85 : 30,
        issues: !hasExperience ? ['Work experience section not found'] : [],
        suggestions: ['Use bullet points with quantified achievements (e.g., "Increased sales by 30%")'],
      },
    },
    top_issues: issues.slice(0, 5),
    top_suggestions: suggestions.slice(0, 5),
  };
}

/** Convenience helper — score a structured resume and return just the number. */
export function scoreResume(data: ResumeData, jobDescription?: string): number {
  const text = resumeDataToText(data);
  if (!text.trim()) return 0;
  return calculateATSScore(text, jobDescription).overall_score;
}
