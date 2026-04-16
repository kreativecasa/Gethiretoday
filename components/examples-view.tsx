"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Code2,
  HeartPulse,
  GraduationCap,
  Megaphone,
  BarChart2,
  Palette,
  TrendingUp,
  Briefcase,
  BookOpen,
  Users,
  Scale,
  Building2,
  Home,
  Wrench,
  PenLine,
  Layers,
  Star,
  Beaker,
  Crown,
} from "lucide-react";
import { TemplatePreview, type TemplateLayout } from "@/components/template-preview";

type Industry = "All" | "Technology" | "Healthcare" | "Education" | "Marketing" | "Finance" | "Design" | "Sales" | "Operations";
type ExperienceLevel = "All" | "Entry Level" | "Mid Level" | "Senior" | "Executive";

const industries: Industry[] = ["All", "Technology", "Healthcare", "Education", "Marketing", "Finance", "Design", "Sales", "Operations"];
const experienceLevels: ExperienceLevel[] = ["All", "Entry Level", "Mid Level", "Senior", "Executive"];

const levelColors: Record<string, string> = {
  "Entry Level": "bg-green-100 text-green-700",
  "Mid Level":   "bg-blue-100 text-blue-700",
  Senior:        "bg-violet-100 text-violet-700",
  Executive:     "bg-amber-100 text-amber-700",
};

interface Example {
  slug: string;
  title: string;
  industry: Industry;
  level: ExperienceLevel;
  count: number;
  accentColor: string;
  iconBg: string;
  Icon: React.ElementType;
  layout: TemplateLayout;
  skills: string[];
}

const EXAMPLES: Example[] = [
  { slug: "software-engineer",          title: "Software Engineering",    industry: "Technology", level: "Mid Level",   count: 32, accentColor: "#4AB7A6", iconBg: "#f0fdfa", Icon: Code2,        layout: "sidebar",   skills: ["React", "Node.js", "TypeScript"] },
  { slug: "marketing-manager",          title: "Marketing & Advertising", industry: "Marketing",  level: "Mid Level",   count: 27, accentColor: "#db2777", iconBg: "#fdf2f8", Icon: Megaphone,    layout: "classic",   skills: ["SEO", "Google Ads", "Analytics"] },
  { slug: "registered-nurse",           title: "Healthcare & Nursing",    industry: "Healthcare", level: "Senior",      count: 24, accentColor: "#059669", iconBg: "#f0fdf4", Icon: HeartPulse,   layout: "classic",   skills: ["Patient Care", "EMR", "Clinical"] },
  { slug: "data-analyst",               title: "Data & Analytics",        industry: "Technology", level: "Mid Level",   count: 21, accentColor: "#0891b2", iconBg: "#ecfeff", Icon: BarChart2,    layout: "sidebar",   skills: ["Python", "SQL", "Tableau"] },
  { slug: "high-school-teacher",        title: "Education & Teaching",    industry: "Education",  level: "Entry Level", count: 18, accentColor: "#d97706", iconBg: "#fffbeb", Icon: GraduationCap,layout: "minimal",   skills: ["Curriculum", "EdTech", "K-12"] },
  { slug: "sales-representative",       title: "Sales & Business Dev",    industry: "Sales",      level: "Mid Level",   count: 22, accentColor: "#ea580c", iconBg: "#fff7ed", Icon: TrendingUp,   layout: "executive", skills: ["CRM", "Salesforce", "B2B"] },
  { slug: "financial-analyst",          title: "Finance & Accounting",    industry: "Finance",    level: "Senior",      count: 19, accentColor: "#1d4ed8", iconBg: "#eff6ff", Icon: Briefcase,    layout: "classic",   skills: ["Excel", "GAAP", "Financial Modeling"] },
  { slug: "project-manager",            title: "Project Management",      industry: "Operations", level: "Senior",      count: 15, accentColor: "#0f766e", iconBg: "#f0fdfa", Icon: Layers,       layout: "executive", skills: ["Agile", "PMP", "Jira"] },
  { slug: "ux-designer",                title: "Design & Creative",       industry: "Design",     level: "Mid Level",   count: 20, accentColor: "#7c3aed", iconBg: "#faf5ff", Icon: Palette,      layout: "creative",  skills: ["Figma", "Adobe CC", "UX Research"] },
  { slug: "human-resources-manager",    title: "Human Resources",         industry: "Operations", level: "Mid Level",   count: 14, accentColor: "#ec4899", iconBg: "#fdf2f8", Icon: Users,        layout: "classic",   skills: ["Recruiting", "HRIS", "L&D"] },
  { slug: "operations-manager",         title: "Legal",                   industry: "Operations", level: "Senior",      count: 12, accentColor: "#334155", iconBg: "#f8fafc", Icon: Scale,        layout: "classic",   skills: ["Contract Law", "Litigation", "Compliance"] },
  { slug: "graphic-designer",            title: "Consulting",              industry: "Operations", level: "Senior",      count: 16, accentColor: "#374151", iconBg: "#f9fafb", Icon: Building2,    layout: "executive", skills: ["Strategy", "Problem Solving", "PowerPoint"] },
  { slug: "account-executive",          title: "Real Estate",             industry: "Sales",      level: "Mid Level",   count: 11, accentColor: "#c2410c", iconBg: "#fff7ed", Icon: Home,         layout: "sidebar",   skills: ["MLS", "Negotiation", "CRM"] },
  { slug: "software-developer-entry-level", title: "Engineering",         industry: "Technology", level: "Senior",      count: 17, accentColor: "#4338ca", iconBg: "#eef2ff", Icon: Wrench,       layout: "sidebar",   skills: ["AutoCAD", "Six Sigma", "Lean"] },
  { slug: "content-marketing-manager",  title: "Writing & Content",       industry: "Marketing",  level: "Entry Level", count: 13, accentColor: "#0369a1", iconBg: "#f0f9ff", Icon: PenLine,      layout: "minimal",   skills: ["SEO Writing", "Copywriting", "WordPress"] },
  { slug: "product-manager",            title: "Product Management",      industry: "Technology", level: "Senior",      count: 25, accentColor: "#7c3aed", iconBg: "#faf5ff", Icon: Star,         layout: "sidebar",   skills: ["Roadmapping", "A/B Testing", "User Stories"] },
  { slug: "marketing-director",         title: "Customer Success",        industry: "Sales",      level: "Mid Level",   count: 14, accentColor: "#2dd4bf", iconBg: "#f0fdfa", Icon: HeartPulse,   layout: "classic",   skills: ["Onboarding", "NPS", "Churn Reduction"] },
  { slug: "supply-chain-analyst",       title: "Supply Chain",            industry: "Operations", level: "Mid Level",   count: 10, accentColor: "#0891b2", iconBg: "#ecfeff", Icon: Layers,       layout: "classic",   skills: ["Logistics", "ERP", "Procurement"] },
  { slug: "data-scientist",             title: "Research & Science",      industry: "Education",  level: "Senior",      count: 9,  accentColor: "#059669", iconBg: "#f0fdf4", Icon: Beaker,       layout: "minimal",   skills: ["R", "SPSS", "Grant Writing"] },
  { slug: "chief-technology-officer",   title: "Executive Leadership",    industry: "Operations", level: "Executive",   count: 18, accentColor: "#111827", iconBg: "#f8fafc", Icon: Crown,        layout: "executive", skills: ["P&L Management", "Board Relations", "M&A"] },
];

export default function ExamplesView() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>("All");
  const [activeLevel, setActiveLevel] = useState<ExperienceLevel>("All");
  const [search, setSearch] = useState("");

  const filtered = EXAMPLES.filter((ex) => {
    const matchesIndustry = activeIndustry === "All" || ex.industry === activeIndustry;
    const matchesLevel = activeLevel === "All" || ex.level === activeLevel;
    const matchesSearch =
      ex.title.toLowerCase().includes(search.toLowerCase()) ||
      ex.industry.toLowerCase().includes(search.toLowerCase()) ||
      ex.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesIndustry && matchesLevel && matchesSearch;
  });

  return (
    <>
      {/* Header */}
      <section className="bg-slate-50 py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Resume Examples for Every Job &amp; Industry
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-5 leading-relaxed">
            Browse 500+ professionally written resume samples across every industry and experience level.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span>500+ Examples</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>50 Industries</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>All Levels</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by job title, industry, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-slate-200 focus:border-[#4AB7A6] focus:outline-none focus:ring-2 focus:ring-[#4AB7A6]/20 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Industry:</span>
            {industries.map((ind) => (
              <button key={ind} onClick={() => setActiveIndustry(ind)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeIndustry === ind ? "text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                style={activeIndustry === ind ? { backgroundColor: '#4AB7A6' } : {}}
              >{ind}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Level:</span>
            {experienceLevels.map((level) => (
              <button key={level} onClick={() => setActiveLevel(level)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeLevel === level ? "text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                style={activeLevel === level ? { backgroundColor: '#4AB7A6' } : {}}
              >{level}</button>
            ))}
          </div>
          <p className="text-sm text-slate-400">Showing {filtered.length} example{filtered.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((ex) => {
                const Icon = ex.Icon;
                return (
                  <div key={ex.slug}
                    className="group bg-white rounded-2xl border border-slate-200 hover:border-[#4AB7A6] hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                  >
                    {/* Mini resume preview */}
                    <div className="relative overflow-hidden bg-slate-100" style={{ height: '200px' }}>
                      <div className="absolute inset-0 flex items-stretch justify-stretch p-2">
                        <div className="flex-1 rounded-lg overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08)' }}>
                          <TemplatePreview layout={ex.layout} accent={ex.accentColor} />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                        <Link href={`/resume-examples/${ex.slug}`}
                          className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 bg-white font-semibold rounded-full px-5 py-2 text-sm shadow-lg"
                          style={{ color: '#4AB7A6' }} onClick={(e) => e.stopPropagation()}
                        >
                          View Examples →
                        </Link>
                      </div>
                      <div className="absolute top-3 right-3 text-[10px] font-bold bg-white/90 text-slate-600 rounded-full px-2 py-0.5 shadow-sm">
                        {ex.count} examples
                      </div>
                    </div>

                    <div className="px-4 py-3 flex flex-col flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: ex.iconBg }}>
                          <Icon size={16} style={{ color: ex.accentColor }} />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-sm leading-tight">{ex.title}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border" style={{ color: ex.accentColor, borderColor: ex.accentColor, backgroundColor: ex.iconBg }}>{ex.industry}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${levelColors[ex.level]}`}>{ex.level}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3 flex-1">
                        {ex.skills.map((skill) => (
                          <span key={skill} className="inline-flex items-center text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap">{skill}</span>
                        ))}
                      </div>
                      <Link href={`/resume-examples/${ex.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold hover:underline mt-auto" style={{ color: '#4AB7A6' }}>
                        View Example <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-4">No examples found</p>
              <button onClick={() => { setSearch(""); setActiveIndustry("All"); setActiveLevel("All"); }} className="text-sm font-medium hover:underline" style={{ color: '#4AB7A6' }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Build Your Own?</h2>
            <p className="text-slate-500 mb-7 text-sm">Use our AI-powered builder to create a resume inspired by these examples in minutes.</p>
            <Link href="/builder/resume/new" className="inline-flex items-center gap-2 text-white font-semibold rounded-full px-7 py-3 text-sm" style={{ backgroundColor: '#4AB7A6' }}>
              Build My Resume — Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
