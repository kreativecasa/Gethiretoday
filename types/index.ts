// ============================================================
// Core User & Auth Types
// ============================================================
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  subscription_status: "free" | "active" | "cancelled" | "past_due";
  subscription_id?: string;
  stripe_customer_id?: string;
  created_at: string;
}

// ============================================================
// Resume Types
// ============================================================
export interface ContactInfo {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  github?: string;
  photo_url?: string;
}

export interface WorkExperience {
  id: string;
  job_title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  field_of_study: string;
  institution: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date_issued: string;
  expiry_date?: string;
  credential_id?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Elementary" | "Limited Working" | "Professional Working" | "Full Professional" | "Native";
}

export interface VolunteerWork {
  id: string;
  role: string;
  organization: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies: string[];
  start_date?: string;
  end_date?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    subtitle?: string;
    date?: string;
    description: string;
  }[];
}

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  work_experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  volunteer_work: VolunteerWork[];
  projects: Project[];
  custom_sections: CustomSection[];
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  data: ResumeData;
  ats_score?: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  color_scheme?: string;
  font_size?: "small" | "medium" | "large";
}

// ============================================================
// Cover Letter Types
// ============================================================
export interface CoverLetterData {
  recipient_name?: string;
  recipient_title?: string;
  company_name: string;
  job_title: string;
  body: string;
  tone?: "professional" | "friendly" | "enthusiastic" | "formal";
}

export interface CoverLetter {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  data: CoverLetterData;
  contact: ContactInfo;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Template Types
// ============================================================
export interface Template {
  id: string;
  name: string;
  category: "professional" | "modern" | "creative" | "simple" | "executive" | "academic";
  preview_image: string;
  is_premium: boolean;
  tags: string[];
  description: string;
}

// ============================================================
// ATS Types
// ============================================================
export interface ATSCheckResult {
  overall_score: number;
  sections: {
    keywords: { score: number; issues: string[]; suggestions: string[] };
    formatting: { score: number; issues: string[]; suggestions: string[] };
    structure: { score: number; issues: string[]; suggestions: string[] };
    contact: { score: number; issues: string[]; suggestions: string[] };
    experience: { score: number; issues: string[]; suggestions: string[] };
  };
  top_issues: string[];
  top_suggestions: string[];
}

// ============================================================
// Subscription Types
// ============================================================
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  stripe_price_id: string;
  is_popular?: boolean;
}

// ============================================================
// Resume Example Types
// ============================================================
export interface ResumeExample {
  id: string;
  title: string;
  job_title: string;
  industry: string;
  experience_level: "entry" | "mid" | "senior" | "executive";
  description: string;
  tags: string[];
  preview_image: string;
}

// ============================================================
// Resource/Blog Types
// ============================================================
export interface Resource {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  read_time: number;
  published_at: string;
  featured_image: string;
}
