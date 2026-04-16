import Anthropic from '@anthropic-ai/sdk';

let _anthropic: Anthropic | null = null;
export function getAnthropicClient(): Anthropic {
  if (!_anthropic) {
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _anthropic;
}

// Alias for backwards compatibility within this module
function getClient(): Anthropic {
  return getAnthropicClient();
}

const MODEL = 'claude-opus-4-5';

export async function generateSummary(
  jobTitle: string,
  experience: string[]
): Promise<string> {
  const experienceText = experience.join('\n');

  const message = await getClient().messages.create({
    model: MODEL,
    max_tokens: 300,
    system:
      'You are a professional resume writer. Write concise, impactful resume summaries in 2-3 sentences. Use active voice. Focus on value delivered. Do not use clichés like "results-driven" or "dynamic". Return only the summary text, no preamble.',
    messages: [
      {
        role: 'user',
        content: `Write a professional resume summary for a ${jobTitle}.\n\nRelevant experience:\n${experienceText}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');
  return content.text.trim();
}

export async function generateBulletPoints(
  jobTitle: string,
  company: string,
  responsibilities: string
): Promise<string[]> {
  const message = await getClient().messages.create({
    model: MODEL,
    max_tokens: 400,
    system:
      'You are a professional resume writer. Generate 4-5 achievement-oriented bullet points for a work experience entry. Each bullet should start with a strong action verb, include quantifiable results where possible, and demonstrate impact. Return each bullet on its own line starting with a hyphen (-). Return only the bullet points, no preamble.',
    messages: [
      {
        role: 'user',
        content: `Job Title: ${jobTitle}\nCompany: ${company}\n\nResponsibilities/context:\n${responsibilities}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  const bullets = content.text
    .split('\n')
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter((line) => line.length > 0);

  return bullets;
}

export async function generateCoverLetter(
  jobTitle: string,
  company: string,
  skills: string[],
  experience: string
): Promise<string> {
  const skillsList = skills.join(', ');

  const message = await getClient().messages.create({
    model: MODEL,
    max_tokens: 600,
    system:
      'You are a professional cover letter writer. Write a compelling cover letter body (no salutation or closing, just the 3-4 body paragraphs). Be specific, enthusiastic, and tailored. Do not use generic filler phrases. Return only the body paragraphs.',
    messages: [
      {
        role: 'user',
        content: `Write a cover letter body for a ${jobTitle} position at ${company}.\n\nKey skills: ${skillsList}\n\nRelevant experience:\n${experience}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');
  return content.text.trim();
}

export async function checkATS(
  resumeText: string,
  jobDescription?: string
): Promise<{ score: number; issues: string[]; suggestions: string[] }> {
  const jobDescriptionSection = jobDescription
    ? `\n\nJob Description to match against:\n${jobDescription}`
    : '';

  const message = await getClient().messages.create({
    model: MODEL,
    max_tokens: 600,
    system: `You are an ATS (Applicant Tracking System) expert. Analyze resumes for ATS compatibility. Return a JSON object with exactly these fields:
- score: number from 0-100 representing ATS compatibility
- issues: array of strings describing specific problems found
- suggestions: array of strings with actionable improvements

Return only valid JSON, no other text.`,
    messages: [
      {
        role: 'user',
        content: `Analyze this resume for ATS compatibility:\n\n${resumeText}${jobDescriptionSection}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type');

  try {
    const result = JSON.parse(content.text.trim());
    return {
      score: Math.max(0, Math.min(100, Number(result.score) || 0)),
      issues: Array.isArray(result.issues) ? result.issues : [],
      suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
    };
  } catch {
    return {
      score: 0,
      issues: ['Failed to parse ATS analysis response'],
      suggestions: ['Please try again'],
    };
  }
}
