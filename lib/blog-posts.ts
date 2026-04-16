export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  content: string; // HTML string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-write-ats-friendly-resume-2025",
    title: "How to Write an ATS-Friendly Resume in 2025",
    description: "75% of resumes are rejected by ATS before a human sees them. Here's exactly how to beat the bots and land more interviews.",
    date: "2025-04-10",
    readTime: "8 min read",
    category: "Resume Tips",
    gradient: "from-teal-500 to-cyan-600",
    content: `
<h2>What Is an ATS and Why Does It Matter?</h2>
<p>An Applicant Tracking System (ATS) is software used by 99% of Fortune 500 companies and most mid-size businesses to automatically screen, rank, and filter resumes before a recruiter ever sees them. According to research by Jobscan, <strong>75% of resumes are rejected by ATS before reaching a human</strong>.</p>
<p>The system scans your resume for keywords, formatting compatibility, and relevance to the job description. If your resume fails these checks, you're invisible — regardless of how qualified you are.</p>

<h2>The 7 Rules for ATS-Friendly Resumes</h2>

<h3>1. Use a Clean, Single-Column Layout</h3>
<p>ATS systems parse text linearly. Multi-column layouts, tables, and text boxes confuse the parser — your content ends up scrambled or skipped. Stick to a single-column format, or a two-column layout where the sidebar only contains supplementary info (skills, contact details).</p>
<p><strong>Safe to use:</strong> Simple headers, bullet points, bold text, standard section titles.</p>
<p><strong>Avoid:</strong> Tables, text boxes, headers/footers (ATS often can't read them), images, graphics.</p>

<h3>2. Match Keywords From the Job Description Exactly</h3>
<p>ATS systems perform literal keyword matching. If the job says "project management" and your resume says "project coordination," you may not match — even though they mean the same thing.</p>
<p>How to do this right:</p>
<ul>
  <li>Copy the exact phrases from the job description</li>
  <li>Include both spelled-out and abbreviated forms: "Search Engine Optimization (SEO)"</li>
  <li>Don't keyword stuff — mention each key skill 2–3 times naturally</li>
</ul>

<h3>3. Use Standard Section Headings</h3>
<p>ATS systems look for familiar section labels. Creative headings like "What I've Done" or "My Toolkit" are often not recognized. Stick to standard labels:</p>
<ul>
  <li>Work Experience (not "Career History" or "Professional Journey")</li>
  <li>Education (not "Where I Studied")</li>
  <li>Skills (not "Expertise" or "Toolbox")</li>
  <li>Certifications, Languages, Projects</li>
</ul>

<h3>4. Use Standard File Formats</h3>
<p>Submit your resume as a <strong>.docx or PDF</strong> — but only if the application instructions allow PDF. When in doubt, .docx is more universally parseable. Never submit as an image file (JPG, PNG) or a scanned document.</p>

<h3>5. Include a Skills Section With Exact Keywords</h3>
<p>Your skills section is prime real estate for ATS keywords. List every relevant tool, language, certification, and methodology explicitly. Don't rely on burying them in bullet points alone — dedicate a section to them.</p>
<p>Example: Python, SQL, Tableau, Salesforce, HubSpot, Agile, Scrum, JIRA, Google Analytics, SEO/SEM</p>

<h3>6. Avoid Headers and Footers for Contact Info</h3>
<p>Many ATS systems cannot parse text that lives in Word headers or footers. Put your name, email, phone, and LinkedIn URL in the main body of the document — not in a formatted header section.</p>

<h3>7. Spell Out Acronyms (At Least Once)</h3>
<p>Always include both the acronym and the full term: "Search Engine Optimization (SEO)", "Customer Relationship Management (CRM)". This catches both exact-match and expanded-term searches.</p>

<h2>How to Test Your Resume for ATS Compatibility</h2>
<p>Before submitting any application, use <a href="/ats-checker">our free ATS checker</a> to score your resume against the job description. It highlights missing keywords, formatting issues, and gives you a compatibility score.</p>

<h2>Quick Checklist Before You Apply</h2>
<ul>
  <li>✅ Single-column or simple two-column layout</li>
  <li>✅ Keywords match the exact language of the job posting</li>
  <li>✅ Standard section headings (Work Experience, Education, Skills)</li>
  <li>✅ No tables, text boxes, or images</li>
  <li>✅ Contact info in the body, not in headers/footers</li>
  <li>✅ Submitted as PDF or .docx (not an image)</li>
  <li>✅ Acronyms spelled out at least once</li>
</ul>
<p>Getting past the ATS is the first gate. Once you're through, a polished, achievement-focused resume does the rest of the work.</p>
    `,
  },
  {
    slug: "resume-summary-examples-that-get-interviews",
    title: "10 Resume Summary Examples That Get You Interviews",
    description: "Your summary is the first thing recruiters read. These 10 examples across industries show exactly how to write one that makes them keep reading.",
    date: "2025-04-08",
    readTime: "6 min read",
    category: "Resume Writing",
    gradient: "from-violet-500 to-purple-600",
    content: `
<h2>Why Your Resume Summary Matters More Than You Think</h2>
<p>Recruiters spend an average of 7 seconds on a first resume scan. The professional summary — that 2–4 sentence block at the top — is usually the first thing they read. If it doesn't immediately communicate your value, they move on.</p>
<p>A great summary answers three questions in 3–4 sentences:</p>
<ol>
  <li><strong>Who are you?</strong> (role + years of experience)</li>
  <li><strong>What's your biggest proof point?</strong> (one strong metric or achievement)</li>
  <li><strong>What's your specialty?</strong> (the niche you own)</li>
</ol>

<h2>The Formula</h2>
<p><em>[Role] with [X years] in [specialty]. [Biggest achievement with metric]. [What you're known for / what makes you different].</em></p>

<h2>10 Real Resume Summary Examples</h2>

<h3>1. Software Engineer (Mid-Level)</h3>
<blockquote>Full-stack software engineer with 5 years building scalable web applications in React and Node.js. Reduced API response times by 60% at Acme Corp through query optimization and caching. Passionate about clean architecture, developer experience, and shipping fast.</blockquote>

<h3>2. Marketing Manager</h3>
<blockquote>Results-driven marketing manager with 7 years scaling B2B demand generation. Grew organic traffic 280% at TechCo through SEO-led content programs. Managed $1.2M annual paid media budget with 3.8x ROAS across Google, LinkedIn, and Meta.</blockquote>

<h3>3. Data Scientist</h3>
<blockquote>Data scientist specializing in NLP and recommender systems with 5 years of production ML experience. Built fraud detection model saving $4M annually at FinCo. PhD in Statistics. Strong in Python, PyTorch, and end-to-end ML pipelines on AWS.</blockquote>

<h3>4. Product Manager</h3>
<blockquote>Senior Product Manager with 6 years building B2C mobile products with 1M+ users. Launched subscription feature adding $3.2M ARR at AppCo. Led cross-functional teams of 12 through discovery, delivery, and iteration using OKR and Agile frameworks.</blockquote>

<h3>5. Account Executive</h3>
<blockquote>Enterprise Account Executive with 6 years in SaaS, consistently exceeding quota (avg 124% attainment). Closed $8.4M in ARR in 2024. Specializes in 6–12 month complex sales cycles with C-suite stakeholders using MEDDIC qualification.</blockquote>

<h3>6. Financial Analyst</h3>
<blockquote>CFA Level II candidate with 4 years in equity research and financial modeling. Built 3-statement DCF models for 14 consumer sector companies. Recognized as top analyst two years running at BankCorp for coverage quality and turnaround speed.</blockquote>

<h3>7. UX Designer</h3>
<blockquote>Senior UX designer with 7 years creating user-centered products for fintech and SaaS. Redesigned onboarding flow at PayApp, increasing user activation from 34% to 67%. Expert in Figma, design systems, and mixed-methods user research.</blockquote>

<h3>8. Registered Nurse (ICU)</h3>
<blockquote>Registered Nurse with 6 years of ICU experience at Level 1 trauma centers. ACLS and PALS certified. Expert in Epic EMR and high-acuity patient management. Maintained 98% patient satisfaction score across four consecutive quarters.</blockquote>

<h3>9. Junior Developer (Entry Level)</h3>
<blockquote>Full-stack developer (React, Node.js, PostgreSQL) with bootcamp training and 3 deployed side projects. Built a task management SaaS with 200+ active users. Fast learner with strong CS fundamentals and a track record of shipping working code quickly.</blockquote>

<h3>10. Operations Manager</h3>
<blockquote>Operations manager with 9 years optimizing manufacturing and logistics operations. Reduced operational costs by $2.1M at ManufactureCo through Lean process redesign. Six Sigma Green Belt certified. Led cross-functional teams of 40+ across production, logistics, and QA.</blockquote>

<h2>What Makes These Work</h2>
<p>Every summary above does three things:</p>
<ul>
  <li><strong>Specific number</strong> — not "improved performance" but "reduced costs by $2.1M"</li>
  <li><strong>Company context</strong> — even a fake one adds credibility ("at FinCo", "at TechCo")</li>
  <li><strong>Clear specialty</strong> — the reader knows exactly what you're good at</li>
</ul>

<h2>Common Summary Mistakes to Avoid</h2>
<ul>
  <li>❌ "Hardworking team player with a passion for excellence" — meaningless, every resume says this</li>
  <li>❌ Longer than 4 sentences — summaries are scannable, not essays</li>
  <li>❌ Written in third person ("John is a software engineer...") — always write in first person without using "I"</li>
  <li>❌ Objective statements ("Seeking a challenging role...") — these went out in 2005</li>
</ul>
<p>Use our <a href="/builder/resume/new">AI-powered builder</a> to generate a tailored summary for your specific role in seconds.</p>
    `,
  },
  {
    slug: "resume-mistakes-costing-you-interviews",
    title: "7 Resume Mistakes That Are Costing You Interviews",
    description: "These common resume mistakes silently eliminate you from consideration. Fix them today and watch your response rate climb.",
    date: "2025-04-05",
    readTime: "7 min read",
    category: "Resume Tips",
    gradient: "from-rose-500 to-orange-500",
    content: `
<h2>Why Good Candidates Get Ignored</h2>
<p>It's not always about being underqualified. Many excellent candidates get filtered out before a recruiter ever reads their resume — not because of their experience, but because of easily fixable mistakes in how their resume is written, formatted, or structured.</p>
<p>Here are the 7 most common resume mistakes — and how to fix each one today.</p>

<h2>Mistake 1: Writing Responsibilities Instead of Achievements</h2>
<p>The most common mistake on resumes is listing what you were supposed to do instead of what you actually accomplished.</p>
<p><strong>❌ Wrong:</strong> "Responsible for managing the customer success team."</p>
<p><strong>✅ Right:</strong> "Led customer success team of 8, improving retention from 74% to 89% in 12 months."</p>
<p>Every bullet point should answer: <em>what happened because you were there?</em> If the bullet sounds like it could have been on anyone's job description, rewrite it with a metric.</p>

<h2>Mistake 2: Not Tailoring for Each Application</h2>
<p>Sending the same resume to every job is one of the biggest silent killers. ATS systems score your resume against the job description — a generic resume typically scores 30–50% lower than a tailored one.</p>
<p>You don't need to rewrite your entire resume for every job. Make these targeted changes:</p>
<ul>
  <li>Adjust your professional summary to reflect the role</li>
  <li>Add keywords from the job posting to your skills section</li>
  <li>Reorder bullet points to lead with the most relevant experience</li>
</ul>
<p>This takes 10–15 minutes per application and meaningfully increases your response rate.</p>

<h2>Mistake 3: Unprofessional or Missing Contact Information</h2>
<p>Recruiters report rejecting resumes for these contact information issues:</p>
<ul>
  <li>Email addresses like "partyguy1998@gmail.com" or "hotmail" domains</li>
  <li>Missing LinkedIn URL (especially for professional roles)</li>
  <li>No location (remote or city/country — some roles require specific locations)</li>
  <li>Phone number only (missing email)</li>
</ul>
<p>Use a professional email (firstname.lastname@gmail.com), include your LinkedIn, and list your city/country or "Remote, Open to Relocation" if applicable.</p>

<h2>Mistake 4: Formatting That Breaks ATS Parsing</h2>
<p>Design elements that look beautiful to humans are invisible — or actively harmful — to ATS systems:</p>
<ul>
  <li><strong>Tables and columns</strong> — ATS reads these out of order or skips them</li>
  <li><strong>Text boxes</strong> — not read at all by most parsers</li>
  <li><strong>Headers and footers</strong> — many systems skip these entirely</li>
  <li><strong>Images and icons</strong> — ATS can't read images</li>
  <li><strong>Fancy fonts</strong> — parsers struggle with non-standard fonts</li>
</ul>
<p>Use clean templates with standard formatting. Our <a href="/builder/resume/new">builder uses ATS-safe templates</a> by default.</p>

<h2>Mistake 5: Resume Is Too Long (or Too Short)</h2>
<p>The right resume length depends on experience:</p>
<ul>
  <li><strong>0–5 years experience:</strong> 1 page, no exceptions</li>
  <li><strong>5–15 years experience:</strong> 1–2 pages</li>
  <li><strong>15+ years / executive roles:</strong> 2 pages max</li>
</ul>
<p>The most common mistake is a 3-page resume from someone with 4 years of experience. Pare it down. Ruthlessly cut anything that doesn't directly support why you're right for this role.</p>

<h2>Mistake 6: Listing Skills Without Evidence</h2>
<p>Anyone can write "Leadership" or "Strategic Thinking" in their skills section. These empty soft skills add nothing. Recruiters skim past them.</p>
<p>Two approaches that actually work:</p>
<ol>
  <li>Only list skills you can back up with a bullet point in your experience: if you list "Data Analysis," have a bullet that shows a data analysis result.</li>
  <li>Be specific: "Python (5 years, NumPy, pandas, scikit-learn)" beats "Programming."</li>
</ol>

<h2>Mistake 7: Typos, Inconsistent Formatting, and Grammar Errors</h2>
<p>Surveys consistently show that 60–70% of hiring managers will reject a resume with a single typo. In competitive hiring environments, a typo signals carelessness — exactly the wrong message.</p>
<p>How to catch them:</p>
<ul>
  <li>Read your resume backwards (bottom to top) to catch spelling errors your brain autocorrects</li>
  <li>Read it out loud — awkward phrasing stands out</li>
  <li>Ask one other person to proofread it</li>
  <li>Check formatting consistency: are all dates in the same format? Same bullet style? Same font throughout?</li>
</ul>

<h2>Fix These in 30 Minutes</h2>
<p>None of these mistakes take hours to fix. Set a timer for 30 minutes and go through each one. Then run your updated resume through our <a href="/ats-checker">free ATS checker</a> to get a compatibility score and catch any remaining keyword gaps.</p>
<p>Small improvements to your resume compound into dramatically better response rates. A 1-in-50 response rate that becomes 1-in-20 doubles your number of interviews without changing your job search volume at all.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
