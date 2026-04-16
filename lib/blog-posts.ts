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
  {
    slug: "ats-friendly-resume-tips",
    title: "ATS-Friendly Resume: 10 Tips to Get Past the Bots in 2026",
    description: "Learn how to create an ATS-friendly resume that passes scanning software. 10 expert tips to ensure recruiters actually see your application.",
    date: "2026-04-16",
    readTime: "8 min read",
    category: "ATS Optimization",
    gradient: "from-teal-500 to-emerald-600",
    content: `
<h2>What is an ATS and Why Should You Care?</h2>
<p>An Applicant Tracking System is software that companies use to manage job applications at scale. When you submit your resume online, it's immediately parsed by this software, which extracts information like your contact details, work experience, skills, and education. The ATS then scores your resume based on keywords and formatting, deciding whether you move forward or get automatically rejected.</p>
<p>Here's the reality: <strong>most candidates never know why they were rejected</strong>. They're likely not rejected for lacking skills—they're rejected because their resume couldn't be properly parsed by the ATS. According to industry research, <strong>75% of resumes never reach a human recruiter</strong>. The ATS is the gatekeeper, and you need to speak its language.</p>

<h2>10 Tips for Creating an ATS-Friendly Resume</h2>

<h3>1. Use a Simple, Clean Format</h3>
<p><strong>The Problem:</strong> Fancy formatting looks impressive but destroys ATS readability. Tables, text boxes, graphics, headers that span columns, and unusual fonts confuse the parsing software.</p>
<p><strong>The Solution:</strong> Use a straightforward, single-column layout with standard fonts like Arial, Calibri, or Times New Roman. Think of your resume as a plain text document, even if you save it as a PDF.</p>

<h3>2. Keyword Optimization is Non-Negotiable</h3>
<p>The ATS compares your resume to the job description. If you use different words for the same skills, the ATS thinks you don't have them. Mirror the <em>exact</em> language from the job posting — if they ask for "project management experience," don't just mention "managed projects."</p>
<p>Spend 15 minutes reading the job description and highlighting every technical term, skill, and software mentioned. Ensure these exact terms appear in your resume.</p>

<h3>3. Avoid Fancy Graphics, Icons, and Images</h3>
<p>That sleek resume with icons next to section headers and a professional headshot? The ATS sees symbols it can't parse and skips right over them. Stick to text-based formatting — no infographics, no charts, no icons, no photos.</p>

<h3>4. Save as PDF (When You Can)</h3>
<p>PDFs are more stable across systems and preserve formatting better. Save as PDF unless explicitly told otherwise. PDFs render consistently across different computers, preventing parsing problems.</p>

<h3>5. Use Standard Section Headings</h3>
<p>Creativity in section names confuses ATS software. Use headings the ATS recognizes:</p>
<ul>
  <li>PROFESSIONAL EXPERIENCE (not "Career Journey" or "Work History")</li>
  <li>EDUCATION</li>
  <li>SKILLS</li>
  <li>CERTIFICATIONS</li>
  <li>PROFESSIONAL SUMMARY (not "About Me")</li>
</ul>

<h3>6. List Skills Clearly in a Dedicated Section</h3>
<p>Burying your skills throughout the resume in narrative form means the ATS might miss them. Create a dedicated SKILLS section listing your competencies clearly, separated by commas or in bulleted format.</p>

<h3>7. Format Your Dates Consistently</h3>
<p>Inconsistent date formatting confuses ATS parsing. Pick one format and stick with it throughout your entire resume. Recommended: <strong>Jan 2022 – Present</strong>.</p>

<h3>8. Avoid Tables, Columns, and Text Boxes</h3>
<p>Even in modern software, ATS parsing of tables is unreliable. Use line breaks and bullet points instead. Your resume should be copyable into plain text and still be readable.</p>

<h3>9. Include Contact Information at the Top</h3>
<p>Put your full contact information at the very top of your resume: full name, city/state, phone, professional email, and LinkedIn URL. Many ATS systems can't read text placed in Word headers or footers.</p>

<h3>10. Proofread Ruthlessly for Typos and Formatting</h3>
<p>Typos don't just hurt your credibility with humans — they can cause ATS parsing errors. A misspelled word might break how the software reads an entire section. Read your resume out loud, and paste it into a plain text editor to catch formatting issues.</p>

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
<p>Use our <a href="/ats-checker">free ATS Checker</a> to score your resume before you apply.</p>
    `,
  },
  {
    slug: "best-resume-format-2026",
    title: "The Best Resume Format in 2026: Which One Gets You Hired?",
    description: "Compare chronological, functional, and combination resume formats in 2026. Learn which format works best for your situation and how AI tools help you choose.",
    date: "2026-04-16",
    readTime: "7 min read",
    category: "Resume Tips",
    gradient: "from-blue-500 to-indigo-600",
    content: `
<h2>The Three Main Resume Formats Explained</h2>

<h3>Format #1: Chronological Resume</h3>
<p>Your work history listed in reverse chronological order (most recent job first), with accomplishments and responsibilities under each position. <strong>This is the standard.</strong> Most hiring managers expect this format, and most ATS systems are optimized to parse it.</p>
<p><strong>Best for:</strong> Candidates with a clear progression of jobs in the same field, stable employment with minimal gaps, and career advancement within an industry.</p>
<p><strong>Challenges:</strong> Doesn't hide employment gaps, and may bury relevant skills if you change jobs frequently.</p>

<h3>Format #2: Functional Resume</h3>
<p>Your skills and competencies listed prominently, with work history playing a supporting role. The focus is on what you can do, not where you did it.</p>
<p><strong>Best for:</strong> Career changers, people with employment gaps, or those with unrelated job history who want to highlight transferable skills.</p>
<p><strong>Real talk:</strong> Many hiring managers are skeptical of functional resumes because they've been used to hide red flags. Unless you have a strong reason, chronological is safer in 2026.</p>

<h3>Format #3: Combination Resume (Hybrid)</h3>
<p>The best of both worlds. You lead with your relevant skills, then provide a reverse-chronological work history with accomplishments. <strong>This is the format gaining ground in 2026.</strong></p>
<p><strong>Best for:</strong> Most job seekers — career changers with transferable skills, senior candidates with diverse experience, and anyone targeting a specific competency set.</p>
<p><strong>Why it's winning in 2026:</strong> Companies want assurance. The combination format says "here's what I'm good at, and here's where I earned that expertise."</p>

<h2>Choosing Your Format: A Decision Framework</h2>

<p><strong>Use Chronological if:</strong> You're staying in the same field with steady job progression, no significant gaps, and your recent jobs are directly relevant.</p>
<p><strong>Use Combination if:</strong> You're changing roles within your industry, want to emphasize specific competencies the job posting mentions, or have a mix of relevant and less-relevant experience.</p>
<p><strong>Use Functional only if:</strong> You're making a significant career change and most of your experience is in a different field.</p>

<h2>Resume Format by Industry in 2026</h2>
<ul>
  <li><strong>Tech/Software:</strong> Combination or chronological. Emphasize technical skills prominently.</li>
  <li><strong>Sales/Business Dev:</strong> Chronological. Hiring managers want to see your progression.</li>
  <li><strong>Creative (Design, Marketing):</strong> Combination with a portfolio.</li>
  <li><strong>Healthcare:</strong> Chronological. Credentials and licensure history expected.</li>
  <li><strong>Executive/C-Level:</strong> Chronological. Clear progression to leadership is essential.</li>
</ul>

<h2>The Format Trend in 2026</h2>
<p>Here's what we're seeing across the job market:</p>
<ul>
  <li><strong>Chronological is still dominant</strong> — about 60% of resumes follow this format.</li>
  <li><strong>Combination is on the rise</strong> — up from ~15% three years ago to ~30% now.</li>
  <li><strong>Functional is declining</strong> — only about 10% of submissions now, and trending lower.</li>
</ul>
<p>The trend is clear: <strong>hiring managers want to know both what you can do AND where you proved it.</strong> The combination format delivers both.</p>

<h2>Quick Reference: Format Comparison</h2>
<ul>
  <li>✅ <strong>Chronological</strong> — ATS excellent, most trusted, best for stable career paths</li>
  <li>✅ <strong>Combination</strong> — ATS excellent, growing preference, best for career changers</li>
  <li>⚠️ <strong>Functional</strong> — ATS fair, declining preference, use only for major pivots</li>
</ul>
<p>Use our <a href="/builder/resume/new">AI-powered builder</a> to build your resume in the format that matches your background — and get it ATS-ready in minutes.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
