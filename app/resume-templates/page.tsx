"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { TemplatePreview } from "@/components/template-preview";

type Category = "All" | "Professional" | "Modern" | "Creative" | "Simple" | "Executive" | "Academic";
type LayoutType = "classic" | "sidebar" | "executive" | "minimal" | "creative" | "centered";

const categories: Category[] = ["All","Professional","Modern","Creative","Simple","Executive","Academic"];

interface Template {
  id: number;
  templateId: string;
  name: string;
  category: Exclude<Category, "All">;
  accent: string;
  bg: string;
  layout: LayoutType;
  pro: boolean;
  description: string;
}

const templates: Template[] = [
  { id: 1,  templateId: "classic",   name: "Classic Professional", category: "Professional", accent: "#4AB7A6", bg: "#f0fdf9", layout: "classic",   pro: false, description: "Clean, ATS-friendly single-column" },
  { id: 2,  templateId: "modern",    name: "Modern Sidebar",       category: "Modern",       accent: "#1e293b", bg: "#f8fafc", layout: "sidebar",   pro: false, description: "Two-column with dark sidebar" },
  { id: 3,  templateId: "executive", name: "Executive Bold",       category: "Executive",    accent: "#0f172a", bg: "#f8fafc", layout: "executive", pro: true,  description: "Authoritative dark header" },
  { id: 4,  templateId: "creative",  name: "Creative Spectrum",    category: "Creative",     accent: "#7c3aed", bg: "#faf5ff", layout: "creative",  pro: true,  description: "Side-column with photo" },
  { id: 5,  templateId: "minimal",   name: "Academic Harvard",     category: "Academic",     accent: "#1d4ed8", bg: "#eff6ff", layout: "minimal",   pro: false, description: "Traditional centered header" },
  { id: 6,  templateId: "classic",   name: "Contemporary Teal",    category: "Professional", accent: "#0d9488", bg: "#f0fdfa", layout: "classic",   pro: false, description: "Fresh teal accent line" },
  { id: 7,  templateId: "modern",    name: "Tech Engineer",        category: "Modern",       accent: "#4338ca", bg: "#eef2ff", layout: "sidebar",   pro: false, description: "Indigo sidebar for tech roles" },
  { id: 8,  templateId: "classic",   name: "Healthcare Pro",       category: "Professional", accent: "#059669", bg: "#ecfdf5", layout: "classic",   pro: false, description: "Clean green accents" },
  { id: 9,  templateId: "executive", name: "Sales Star",           category: "Professional", accent: "#ea580c", bg: "#fff7ed", layout: "executive", pro: false, description: "Bold orange impact header" },
  { id: 10, templateId: "simple",    name: "Graduate Fresh",       category: "Simple",       accent: "#0891b2", bg: "#ecfeff", layout: "centered",  pro: false, description: "Simple centered design" },
  { id: 11, templateId: "creative",  name: "Creative Bold",        category: "Creative",     accent: "#e11d48", bg: "#fff1f2", layout: "creative",  pro: true,  description: "Vibrant rose side-column" },
  { id: 12, templateId: "executive", name: "Corporate Elite",      category: "Executive",    accent: "#1f2937", bg: "#f9fafb", layout: "executive", pro: true,  description: "Prestige dark header" },
  { id: 13, templateId: "modern",    name: "Marketing Master",     category: "Professional", accent: "#db2777", bg: "#fdf2f8", layout: "sidebar",   pro: false, description: "Pink sidebar for creatives" },
  { id: 14, templateId: "classic",   name: "Finance Pro",          category: "Executive",    accent: "#1e3a8a", bg: "#eff6ff", layout: "classic",   pro: true,  description: "Navy precision lines" },
  { id: 15, templateId: "minimal",   name: "Teacher Edition",      category: "Simple",       accent: "#d97706", bg: "#fffbeb", layout: "minimal",   pro: false, description: "Warm amber minimal style" },
  { id: 16, templateId: "classic",   name: "Legal Professional",   category: "Executive",    accent: "#334155", bg: "#f8fafc", layout: "classic",   pro: true,  description: "Slate formal structure" },
  { id: 17, templateId: "modern",    name: "Startup Founder",      category: "Modern",       accent: "#7c3aed", bg: "#faf5ff", layout: "sidebar",   pro: true,  description: "Purple modern sidebar" },
  { id: 18, templateId: "modern",    name: "Data Scientist",       category: "Professional", accent: "#0891b2", bg: "#ecfeff", layout: "sidebar",   pro: false, description: "Cyan analytical layout" },
  { id: 19, templateId: "executive", name: "Project Manager",      category: "Professional", accent: "#0f766e", bg: "#f0fdfa", layout: "executive", pro: false, description: "Teal executive presence" },
  { id: 20, templateId: "simple",    name: "HR Specialist",        category: "Simple",       accent: "#ec4899", bg: "#fdf2f8", layout: "centered",  pro: false, description: "Soft pink centered style" },
  { id: 21, templateId: "classic",   name: "Consulting Pro",       category: "Executive",    accent: "#374151", bg: "#f9fafb", layout: "classic",   pro: true,  description: "Grey elite consulting" },
  { id: 22, templateId: "classic",   name: "Nurse Practitioner",   category: "Professional", accent: "#10b981", bg: "#ecfdf5", layout: "classic",   pro: false, description: "Emerald healthcare clean" },
  { id: 23, templateId: "creative",  name: "Designer Portfolio",   category: "Creative",     accent: "#6d28d9", bg: "#f5f3ff", layout: "creative",  pro: true,  description: "Violet creative sidebar" },
  { id: 24, templateId: "modern",    name: "Real Estate Agent",    category: "Professional", accent: "#c2410c", bg: "#fff7ed", layout: "sidebar",   pro: false, description: "Orange warm sidebar" },
];

/* ─────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────── */
const Line = ({ w, h = "h-[3px]", op = "1", color = "#e2e8f0" }: { w: string; h?: string; op?: string; color?: string }) => (
  <div className={`${h} ${w} rounded-full`} style={{ backgroundColor: color, opacity: op }} />
);

const SectionLabel = ({ color, text }: { color: string; text: string }) => (
  <div className="flex items-center gap-1 mb-[3px]">
    <div className="h-[1.5px] flex-1" style={{ backgroundColor: color, opacity: 0.4 }} />
    <span className="text-[4px] font-bold tracking-widest uppercase" style={{ color }}>{text}</span>
    <div className="h-[1.5px] flex-1" style={{ backgroundColor: color, opacity: 0.4 }} />
  </div>
);

const BulletRow = ({ w, color }: { w: string; color: string }) => (
  <div className="flex items-center gap-[2px] mb-[2px]">
    <div className="w-[2px] h-[2px] rounded-full flex-shrink-0" style={{ backgroundColor: color, opacity: 0.5 }} />
    <div className={`h-[2px] ${w} rounded-full bg-slate-200`} />
  </div>
);

const Dot = ({ color }: { color: string }) => (
  <div className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: color }} />
);

/* ─────────────────────────────────────────────
   LAYOUT 1 — CLASSIC (single-column, top accent bar)
   Like rezi.ai "Standard" / LiveCareer classic
───────────────────────────────────────────── */
function ClassicLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "7px 8px 6px" }}>
      {/* Top accent bar */}
      <div className="h-[5px] w-full rounded-sm mb-[5px]" style={{ backgroundColor: accent }} />

      {/* Name block */}
      <div className="h-[6px] w-[45%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
      <div className="h-[3px] w-[30%] rounded-full mb-[4px]" style={{ backgroundColor: accent, opacity: 0.45 }} />

      {/* Contact row */}
      <div className="flex items-center gap-[4px] mb-[5px]">
        {[22, 26, 20].map((w, i) => (
          <div key={i} className="flex items-center gap-[2px]">
            <div className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: accent, opacity: 0.5 }} />
            <div className="h-[2px] rounded-full bg-slate-200" style={{ width: `${w}px` }} />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px w-full mb-[4px]" style={{ backgroundColor: accent, opacity: 0.2 }} />

      {/* Summary */}
      <div className="mb-[4px]">
        <SectionLabel color={accent} text="Summary" />
        <div className="space-y-[2px]">
          <Line w="w-full" color="#cbd5e1" />
          <Line w="w-5/6" color="#cbd5e1" />
          <Line w="w-4/5" color="#cbd5e1" />
        </div>
      </div>

      {/* Experience */}
      <div className="mb-[4px]">
        <SectionLabel color={accent} text="Experience" />
        <div className="mb-[3px]">
          <div className="flex justify-between items-center mb-[2px]">
            <Line w="w-[35%]" h="h-[3px]" color="#475569" />
            <Line w="w-[20%]" h="h-[2px]" color="#94a3b8" />
          </div>
          <Line w="w-[28%]" h="h-[2px]" color="#94a3b8" op="0.7" />
          <div className="mt-[2px] space-y-[1.5px]">
            <BulletRow w="w-full" color={accent} />
            <BulletRow w="w-5/6" color={accent} />
            <BulletRow w="w-4/5" color={accent} />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-[1px]">
            <Line w="w-[32%]" h="h-[3px]" color="#475569" />
            <Line w="w-[18%]" h="h-[2px]" color="#94a3b8" />
          </div>
          <Line w="w-[25%]" h="h-[2px]" color="#94a3b8" op="0.7" />
          <div className="mt-[2px] space-y-[1.5px]">
            <BulletRow w="w-full" color={accent} />
            <BulletRow w="w-4/5" color={accent} />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-[4px]">
        <SectionLabel color={accent} text="Education" />
        <div className="flex justify-between items-center mb-[1px]">
          <Line w="w-[38%]" h="h-[3px]" color="#475569" />
          <Line w="w-[16%]" h="h-[2px]" color="#94a3b8" />
        </div>
        <Line w="w-[28%]" h="h-[2px]" color="#94a3b8" op="0.7" />
      </div>

      {/* Skills */}
      <div>
        <SectionLabel color={accent} text="Skills" />
        <div className="flex flex-wrap gap-[2px]">
          {[12, 16, 10, 14, 11, 13].map((w, i) => (
            <div key={i} className="h-[5px] rounded-full px-[3px]" style={{ width: `${w * 3}px`, backgroundColor: accent, opacity: 0.12 }}>
              <div className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LAYOUT 2 — SIDEBAR (dark left sidebar + white main)
   Like rezi.ai "Neat" / "Smart"
───────────────────────────────────────────── */
function SidebarLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full flex">
      {/* Left sidebar */}
      <div className="w-[30%] h-full flex flex-col" style={{ backgroundColor: accent, padding: "8px 5px 6px" }}>
        {/* Photo circle */}
        <div className="w-[22px] h-[22px] rounded-full bg-white/20 mx-auto mb-[5px] flex items-center justify-center">
          <div className="w-[10px] h-[10px] rounded-full bg-white/40" />
        </div>
        {/* Name */}
        <div className="h-[3px] w-[80%] rounded-full bg-white/80 mx-auto mb-[2px]" />
        <div className="h-[2px] w-[60%] rounded-full bg-white/50 mx-auto mb-[5px]" />

        {/* Divider */}
        <div className="h-px w-full bg-white/20 mb-[4px]" />

        {/* Contact */}
        <div className="mb-[4px]">
          <div className="h-[2px] w-[50%] rounded-full bg-white/60 mb-[3px]" />
          {[70, 85, 65, 75].map((op, i) => (
            <div key={i} className="flex items-center gap-[2px] mb-[2px]">
              <div className="w-[2px] h-[2px] rounded-full bg-white/50" />
              <div className="h-[2px] rounded-full bg-white/40 flex-1" style={{ opacity: op / 100 }} />
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-[4px]">
          <div className="h-[2px] w-[50%] rounded-full bg-white/60 mb-[3px]" />
          {[80, 65, 90, 70, 75].map((pct, i) => (
            <div key={i} className="mb-[3px]">
              <div className="h-[2px] rounded-full bg-white/30 mb-[1px]" />
              <div className="h-[2px] rounded-full bg-white/70" style={{ width: `${pct}%` }} />
            </div>
          ))}
        </div>

        {/* Languages */}
        <div>
          <div className="h-[2px] w-[55%] rounded-full bg-white/60 mb-[3px]" />
          {[70, 60].map((op, i) => (
            <div key={i} className="h-[2px] rounded-full bg-white/40 mb-[2px]" style={{ opacity: op / 100 }} />
          ))}
        </div>
      </div>

      {/* Right main */}
      <div className="flex-1 bg-white flex flex-col" style={{ padding: "8px 7px 6px" }}>
        {/* Summary */}
        <div className="mb-[5px]">
          <div className="h-[3px] w-[40%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <div className="h-px w-full mb-[3px]" style={{ backgroundColor: accent, opacity: 0.2 }} />
          <div className="space-y-[2px]">
            <Line w="w-full" color="#cbd5e1" />
            <Line w="w-5/6" color="#cbd5e1" />
          </div>
        </div>

        {/* Experience */}
        <div className="mb-[5px]">
          <div className="h-[3px] w-[45%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <div className="h-px w-full mb-[3px]" style={{ backgroundColor: accent, opacity: 0.2 }} />
          {[0, 1].map((j) => (
            <div key={j} className="mb-[3px]">
              <div className="flex justify-between mb-[1px]">
                <Line w="w-[38%]" h="h-[3px]" color="#334155" />
                <Line w="w-[22%]" h="h-[2px]" color="#94a3b8" />
              </div>
              <Line w="w-[28%]" h="h-[2px]" color="#94a3b8" op="0.7" />
              <div className="mt-[2px] space-y-[1.5px]">
                <BulletRow w="w-full" color={accent} />
                <BulletRow w="w-5/6" color={accent} />
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <div className="h-[3px] w-[40%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <div className="h-px w-full mb-[3px]" style={{ backgroundColor: accent, opacity: 0.2 }} />
          <div className="flex justify-between mb-[1px]">
            <Line w="w-[45%]" h="h-[3px]" color="#334155" />
            <Line w="w-[20%]" h="h-[2px]" color="#94a3b8" />
          </div>
          <Line w="w-[30%]" h="h-[2px]" color="#94a3b8" op="0.7" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LAYOUT 3 — EXECUTIVE (large dark/colored full-width header)
───────────────────────────────────────────── */
function ExecutiveLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Full-width dark header */}
      <div className="w-full flex flex-col items-start" style={{ backgroundColor: accent, padding: "9px 9px 8px" }}>
        <div className="h-[7px] w-[50%] rounded-full bg-white mb-[2px]" />
        <div className="h-[3px] w-[35%] rounded-full bg-white/60 mb-[4px]" />
        {/* Contact row */}
        <div className="flex items-center gap-[5px]">
          {[18, 22, 20].map((w, i) => (
            <div key={i} className="flex items-center gap-[2px]">
              <div className="w-[2.5px] h-[2.5px] rounded-full bg-white/50" />
              <div className="h-[2px] rounded-full bg-white/40" style={{ width: `${w}px` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col" style={{ padding: "6px 9px" }}>
        {/* Summary */}
        <div className="mb-[5px]">
          <div className="flex items-center gap-[3px] mb-[3px]">
            <div className="h-[3px] w-[35%] rounded-full font-bold" style={{ backgroundColor: accent }} />
            <div className="h-px flex-1" style={{ backgroundColor: accent, opacity: 0.2 }} />
          </div>
          <div className="space-y-[2px]">
            <Line w="w-full" color="#cbd5e1" />
            <Line w="w-5/6" color="#cbd5e1" />
            <Line w="w-4/5" color="#cbd5e1" />
          </div>
        </div>

        {/* Experience */}
        <div className="mb-[5px]">
          <div className="flex items-center gap-[3px] mb-[3px]">
            <div className="h-[3px] w-[38%] rounded-full" style={{ backgroundColor: accent }} />
            <div className="h-px flex-1" style={{ backgroundColor: accent, opacity: 0.2 }} />
          </div>
          {[0, 1].map((j) => (
            <div key={j} className="mb-[4px]">
              <div className="flex justify-between mb-[1px]">
                <Line w="w-[40%]" h="h-[3px]" color="#1e293b" />
                <Line w="w-[20%]" h="h-[2px]" color="#94a3b8" />
              </div>
              <Line w="w-[30%]" h="h-[2px]" color="#94a3b8" op="0.7" />
              <div className="mt-[2px] space-y-[1.5px]">
                <BulletRow w="w-full" color={accent} />
                <BulletRow w="w-5/6" color={accent} />
                {j === 0 && <BulletRow w="w-[85%]" color={accent} />}
              </div>
            </div>
          ))}
        </div>

        {/* Two-col bottom: Education + Skills */}
        <div className="flex gap-[5px]">
          <div className="flex-1">
            <div className="h-[3px] w-[60%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
            <div className="h-px w-full mb-[2px]" style={{ backgroundColor: accent, opacity: 0.2 }} />
            <Line w="w-full" color="#cbd5e1" />
            <Line w="w-4/5" color="#cbd5e1" />
            <Line w="w-3/5" color="#cbd5e1" />
          </div>
          <div className="flex-1">
            <div className="h-[3px] w-[45%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
            <div className="h-px w-full mb-[2px]" style={{ backgroundColor: accent, opacity: 0.2 }} />
            <div className="flex flex-wrap gap-[2px]">
              {[10, 13, 9, 12, 10].map((w, i) => (
                <div key={i} className="h-[4px] rounded-full" style={{ width: `${w * 2.5}px`, backgroundColor: accent, opacity: 0.15 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LAYOUT 4 — MINIMAL (centered header, clean lines)
   Like rezi.ai "Compact" or academic styles
───────────────────────────────────────────── */
function MinimalLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "8px 9px 6px" }}>
      {/* Centered header */}
      <div className="text-center mb-[4px]">
        <div className="h-[6px] w-[55%] rounded-full mx-auto mb-[2px]" style={{ backgroundColor: "#1e293b" }} />
        <div className="h-[3px] w-[40%] rounded-full mx-auto mb-[3px]" style={{ backgroundColor: "#64748b" }} />
        {/* Contact row centered */}
        <div className="flex items-center justify-center gap-[5px]">
          {[18, 22, 18].map((w, i) => (
            <div key={i} className="flex items-center gap-[1.5px]">
              <Dot color={accent} />
              <div className="h-[2px] rounded-full bg-slate-300" style={{ width: `${w}px` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Full-width divider with accent */}
      <div className="h-[2px] w-full rounded-full mb-[4px]" style={{ backgroundColor: accent }} />

      {/* Summary */}
      <div className="mb-[4px] text-center">
        <div className="space-y-[2px]">
          <Line w="w-full" color="#cbd5e1" />
          <Line w="w-11/12 mx-auto" color="#cbd5e1" />
          <Line w="w-5/6 mx-auto" color="#cbd5e1" />
        </div>
      </div>

      <div className="h-px w-full bg-slate-200 mb-[4px]" />

      {/* Experience */}
      <div className="mb-[4px]">
        <div className="h-[3px] w-[30%] rounded-full mb-[3px]" style={{ backgroundColor: accent }} />
        {[0, 1].map((j) => (
          <div key={j} className="mb-[3px]">
            <div className="flex justify-between mb-[1px]">
              <Line w="w-[40%]" h="h-[3px]" color="#334155" />
              <Line w="w-[22%]" h="h-[2px]" color="#94a3b8" />
            </div>
            <Line w="w-[30%]" h="h-[2px]" color="#94a3b8" op="0.7" />
            <div className="mt-[2px] space-y-[1.5px]">
              <BulletRow w="w-full" color={accent} />
              <BulletRow w="w-5/6" color={accent} />
            </div>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-slate-200 mb-[4px]" />

      {/* Education + Skills side by side */}
      <div className="flex gap-[6px]">
        <div className="flex-1">
          <div className="h-[2.5px] w-[55%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <Line w="w-full" color="#cbd5e1" />
          <Line w="w-4/5" color="#cbd5e1" />
          <Line w="w-3/5" color="#cbd5e1" />
        </div>
        <div className="w-px bg-slate-200" />
        <div className="flex-1">
          <div className="h-[2.5px] w-[40%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <div className="space-y-[2px]">
            {[75, 90, 60, 85].map((pct, i) => (
              <div key={i} className="flex items-center gap-[2px]">
                <div className="h-[2px] rounded-full bg-slate-200" style={{ width: "100%" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: accent, opacity: 0.5 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LAYOUT 5 — CREATIVE (photo circle + wide sidebar)
   Like rezi.ai "Trendy" / creative templates
───────────────────────────────────────────── */
function CreativeLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full flex">
      {/* Left sidebar */}
      <div className="w-[32%] h-full flex flex-col" style={{ backgroundColor: accent, padding: "8px 5px 6px" }}>
        {/* Photo */}
        <div className="w-[28px] h-[28px] rounded-full bg-white/25 mx-auto mb-[4px] flex items-center justify-center border-2 border-white/40">
          <div className="w-[14px] h-[14px] rounded-full bg-white/50" />
        </div>
        {/* Name */}
        <div className="h-[3px] w-[85%] rounded-full bg-white mx-auto mb-[1.5px]" />
        <div className="h-[2px] w-[65%] rounded-full bg-white/60 mx-auto mb-[5px]" />

        {/* About */}
        <div className="mb-[4px]">
          <div className="h-[2px] w-[50%] rounded-full bg-white/60 mb-[2px]" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[2px] rounded-full bg-white/30 mb-[2px] w-full" />
          ))}
        </div>

        <div className="h-px bg-white/20 mb-[4px]" />

        {/* Contact */}
        <div className="mb-[4px]">
          <div className="h-[2px] w-[55%] rounded-full bg-white/70 mb-[3px]" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-[2px] mb-[2px]">
              <div className="w-[4px] h-[4px] rounded-sm bg-white/40" />
              <div className="h-[2px] rounded-full bg-white/35 flex-1" />
            </div>
          ))}
        </div>

        <div className="h-px bg-white/20 mb-[4px]" />

        {/* Skills */}
        <div>
          <div className="h-[2px] w-[45%] rounded-full bg-white/70 mb-[2px]" />
          {[85, 70, 90, 60, 75].map((pct, i) => (
            <div key={i} className="mb-[3px]">
              <div className="flex justify-between mb-[1px]">
                <div className="h-[2px] w-[60%] rounded-full bg-white/40" />
              </div>
              <div className="h-[2.5px] w-full rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white/70" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right main */}
      <div className="flex-1 bg-white" style={{ padding: "8px 7px 6px" }}>
        {/* Experience */}
        <div className="mb-[4px]">
          <div className="flex items-center gap-[3px] mb-[3px]">
            <div className="h-[3px] w-[38%] rounded-full" style={{ backgroundColor: accent }} />
            <div className="h-[1.5px] flex-1 bg-slate-200" />
          </div>
          {[0, 1].map((j) => (
            <div key={j} className="mb-[4px] pl-[3px] border-l-[2px]" style={{ borderColor: accent + "40" }}>
              <div className="flex justify-between mb-[1px]">
                <Line w="w-[45%]" h="h-[3px]" color="#1e293b" />
                <Line w="w-[20%]" h="h-[2px]" color="#94a3b8" />
              </div>
              <Line w="w-[30%]" h="h-[2px]" color="#94a3b8" op="0.7" />
              <div className="mt-[2px] space-y-[1.5px]">
                <BulletRow w="w-full" color={accent} />
                <BulletRow w="w-5/6" color={accent} />
                {j === 0 && <BulletRow w="w-4/5" color={accent} />}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-[4px]">
          <div className="flex items-center gap-[3px] mb-[3px]">
            <div className="h-[3px] w-[36%] rounded-full" style={{ backgroundColor: accent }} />
            <div className="h-[1.5px] flex-1 bg-slate-200" />
          </div>
          <div className="pl-[3px] border-l-[2px]" style={{ borderColor: accent + "40" }}>
            <Line w="w-[50%]" h="h-[3px]" color="#1e293b" />
            <Line w="w-[35%]" h="h-[2px]" color="#94a3b8" op="0.7" />
            <Line w="w-[25%]" h="h-[2px]" color="#94a3b8" op="0.5" />
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center gap-[3px] mb-[3px]">
            <div className="h-[3px] w-[33%] rounded-full" style={{ backgroundColor: accent }} />
            <div className="h-[1.5px] flex-1 bg-slate-200" />
          </div>
          <BulletRow w="w-full" color={accent} />
          <BulletRow w="w-5/6" color={accent} />
          <BulletRow w="w-4/5" color={accent} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LAYOUT 6 — CENTERED (name centered top, symmetric)
───────────────────────────────────────────── */
function CenteredLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "8px 9px 6px" }}>
      {/* Centered header with accent top border */}
      <div className="h-[4px] w-[40%] rounded-full mx-auto mb-[4px]" style={{ backgroundColor: accent }} />
      <div className="text-center mb-[2px]">
        <div className="h-[6px] w-[55%] rounded-full mx-auto mb-[2px]" style={{ backgroundColor: "#1e293b" }} />
        <div className="h-[2.5px] w-[38%] rounded-full mx-auto mb-[3px]" style={{ backgroundColor: accent, opacity: 0.7 }} />
        <div className="flex items-center justify-center gap-[4px] mb-[3px]">
          {[16, 20, 18, 15].map((w, i) => (
            <div key={i} className="h-[2px] rounded-full bg-slate-300" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>

      {/* Accent divider */}
      <div className="flex items-center gap-[3px] mb-[4px]">
        <div className="h-px flex-1 bg-slate-200" />
        <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Summary */}
      <div className="mb-[4px] text-center">
        <div className="space-y-[2px]">
          <Line w="w-full" color="#cbd5e1" />
          <Line w="w-5/6" color="#cbd5e1" />
        </div>
      </div>

      {/* Experience */}
      <div className="mb-[4px]">
        <div className="text-center mb-[2px]">
          <div className="h-[2.5px] w-[30%] rounded-full mx-auto" style={{ backgroundColor: accent }} />
        </div>
        <div className="h-px w-full bg-slate-200 mb-[3px]" />
        {[0, 1].map((j) => (
          <div key={j} className="mb-[3px]">
            <div className="flex justify-between mb-[1px]">
              <Line w="w-[40%]" h="h-[3px]" color="#334155" />
              <Line w="w-[22%]" h="h-[2px]" color="#94a3b8" />
            </div>
            <Line w="w-[28%]" h="h-[2px]" color="#94a3b8" op="0.7" />
            <div className="mt-[2px] space-y-[1.5px]">
              <BulletRow w="w-full" color={accent} />
              <BulletRow w="w-5/6" color={accent} />
            </div>
          </div>
        ))}
      </div>

      {/* Two-col: Education + Skills */}
      <div className="flex gap-[6px]">
        <div className="flex-1">
          <div className="h-[2.5px] w-[55%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <div className="h-px w-full bg-slate-200 mb-[2px]" />
          <Line w="w-full" color="#cbd5e1" />
          <Line w="w-4/5" color="#cbd5e1" />
        </div>
        <div className="flex-1">
          <div className="h-[2.5px] w-[40%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <div className="h-px w-full bg-slate-200 mb-[2px]" />
          <div className="flex flex-wrap gap-[2px]">
            {[10, 13, 9, 12, 10, 11].map((w, i) => (
              <div key={i} className="h-[4px] rounded-full" style={{ width: `${w * 2.2}px`, backgroundColor: accent, opacity: 0.15 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROUTER — picks the right layout
───────────────────────────────────────────── */
function ResumePreview({ layout, accent }: { layout: LayoutType; accent: string }) {
  return <TemplatePreview layout={layout} accent={accent} />;
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filtered = templates.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesFree = !showFreeOnly || !t.pro;
    return matchesCategory && matchesSearch && matchesFree;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* ── Header ── */}
        <section className="bg-slate-50 py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-sm text-slate-600 mb-5 shadow-sm">
              <Check className="w-3.5 h-3.5" style={{ color: '#4AB7A6' }} />
              ATS-Optimized · Recruiter-Approved · Free to Try
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Professional Resume Templates
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-6 leading-relaxed">
              60+ templates designed by professional resume writers and tested with Fortune 500 recruiters.
              Every template passes ATS screening and looks stunning to human eyes.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-500">
              <span>60+ Templates</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>127,000+ Downloads</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>6 Layout Types</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Fully Customisable</span>
            </div>
          </div>
        </section>

        {/* ── Sticky filter bar ── */}
        <div className="bg-white border-b border-slate-100 sticky top-16 z-10 px-4 sm:px-6 lg:px-8 py-3.5 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-60 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 focus:border-[#4AB7A6] focus:outline-none focus:ring-2 focus:ring-[#4AB7A6]/20 text-sm bg-white"
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 flex-wrap flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                    activeCategory === cat ? "text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  style={activeCategory === cat ? { backgroundColor: '#4AB7A6' } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Free-only toggle */}
            <label className="flex items-center gap-2 cursor-pointer flex-shrink-0">
              <span className="text-sm text-slate-600 select-none">Free only</span>
              <button
                role="switch"
                aria-checked={showFreeOnly}
                onClick={() => setShowFreeOnly(!showFreeOnly)}
                className="relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none"
                style={{ backgroundColor: showFreeOnly ? '#4AB7A6' : '#e2e8f0' }}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                    showFreeOnly ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </label>

            <p className="text-sm text-slate-400 shrink-0 hidden sm:block">
              {filtered.length} template{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* ── Template grid ── */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((template) => (
                  <div
                    key={template.id}
                    className="group flex flex-col rounded-2xl border border-slate-200 overflow-hidden hover:border-[#4AB7A6] hover:shadow-2xl transition-all duration-250 cursor-pointer bg-white"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                  >
                    {/* ── Preview area ── */}
                    <div className="relative overflow-hidden bg-slate-100" style={{ height: "260px" }}>
                      {/* Paper-shadow inset */}
                      <div className="absolute inset-0 flex items-stretch justify-stretch p-2">
                        <div
                          className="flex-1 rounded-lg overflow-hidden"
                          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08)" }}
                        >
                          <ResumePreview layout={template.layout} accent={template.accent} />
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-200 flex items-center justify-center">
                        <Link
                          href={`/builder/resume/new?template=${template.templateId}`}
                          className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 bg-white font-semibold rounded-full px-6 py-2.5 text-sm shadow-lg"
                          style={{ color: '#4AB7A6' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Use This Template →
                        </Link>
                      </div>

                      {/* PRO badge top-left */}
                      {template.pro && (
                        <div className="absolute top-3 left-3 text-[10px] font-bold bg-amber-400 text-amber-900 rounded-full px-2 py-0.5 shadow-sm">
                          PRO
                        </div>
                      )}
                    </div>

                    {/* ── Card footer ── */}
                    <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate leading-tight">{template.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{template.description}</p>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5 ${
                          template.pro
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {template.pro ? "PRO" : "Free"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-slate-700 font-semibold text-lg mb-1">No templates found</p>
                <p className="text-slate-400 text-sm mb-5">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); setShowFreeOnly(false); }}
                  className="text-sm font-semibold rounded-full px-5 py-2 border transition-colors hover:bg-slate-50"
                  style={{ color: '#4AB7A6', borderColor: '#4AB7A6' }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-100 bg-[#f0fdf9]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Can&apos;t find the right template?</h2>
              <p className="text-slate-500 text-sm">New templates added every month. Request a custom design from our team.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/builder/resume/new"
                className="inline-flex items-center gap-2 text-white font-semibold rounded-full px-6 py-2.5 text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#4AB7A6' }}
              >
                Start Building Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold rounded-full px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-white transition-colors"
              >
                Request a Template
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
