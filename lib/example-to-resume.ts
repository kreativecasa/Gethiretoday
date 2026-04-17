import type { ResumeData, WorkExperience, Skill } from '@/types';
import type { ResumeExample } from './resume-examples-data';
import type { PreviewContent } from '@/components/template-preview';

/**
 * Convert a ResumeExample (marketing/examples data) into PreviewContent for
 * the thumbnail component. Produces a minimally-populated preview so each
 * example card shows its real title/skills/experience instead of placeholders.
 */
export function exampleToPreviewContent(ex: ResumeExample): PreviewContent {
  // Derive a fake candidate name from the title for visual differentiation
  const title = ex.sampleExperience.role || ex.title;
  return {
    name: `Sample Candidate`,
    title,
    summary: ex.sampleSummary,
    experiences: [
      {
        role: ex.sampleExperience.role,
        company: ex.sampleExperience.company,
        dates: 'Present',
        bullets: ex.sampleExperience.bullets,
      },
    ],
    skills: ex.skills,
  };
}

/**
 * Convert a ResumeExample into a partial ResumeData that can be used to
 * pre-fill the builder form when a user clicks "Use this template" from an
 * example page. Uses empty contact fields (user fills their own info in).
 */
export function exampleToResumeData(ex: ResumeExample): ResumeData {
  const now = new Date();
  const startYear = now.getFullYear() - 3;

  const firstExperience: WorkExperience = {
    id: crypto.randomUUID ? crypto.randomUUID() : `exp-${Date.now()}`,
    job_title: ex.sampleExperience.role,
    company: ex.sampleExperience.company,
    location: '',
    start_date: `${startYear}-01`,
    end_date: '',
    is_current: true,
    description: '',
    achievements: ex.sampleExperience.bullets,
  };

  const skills: Skill[] = ex.skills.map((name, i) => ({
    id: `skill-${i}`,
    name,
    category: 'Technical',
  }));

  return {
    contact: {
      full_name: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: ex.sampleSummary,
    work_experience: [firstExperience],
    education: [],
    skills,
    certifications: [],
    languages: [],
    volunteer_work: [],
    projects: [],
    custom_sections: [],
  };
}
