/**
 * High-fidelity resume thumbnail previews.
 * Premium 2026 design — real typography, generous whitespace, restrained color.
 *
 * Accepts optional `content` prop to render real text (name, role, skills).
 * Falls back to refined placeholder bars when no content is provided.
 */

import type { ResumeData } from "@/types";

export type TemplateLayout =
  | "classic"
  | "sidebar"
  | "executive"
  | "minimal"
  | "creative"
  | "centered";

export interface PreviewContent {
  name?: string;
  title?: string;
  location?: string;
  email?: string;
  summary?: string;
  experiences?: Array<{
    role: string;
    company: string;
    dates?: string;
    bullets?: string[];
  }>;
  education?: Array<{
    degree: string;
    school: string;
    dates?: string;
  }>;
  skills?: string[];
}

/**
 * Defensively extract simplified preview content from a full ResumeData object.
 * Handles legacy field names, null/undefined, and unexpected shapes.
 */
export function previewFromResumeData(data?: Partial<ResumeData> | null): PreviewContent | undefined {
  try {
    if (!data || typeof data !== 'object') return undefined;
    const asString = (v: unknown): string | undefined =>
      typeof v === 'string' && v.trim() ? v : undefined;
    const asArray = <T,>(v: unknown): T[] => Array.isArray(v) ? (v as T[]) : [];

    const contact = (data as { contact?: unknown }).contact;
    const contactObj = (contact && typeof contact === 'object') ? contact as Record<string, unknown> : {};

    const workRaw = asArray<Record<string, unknown>>((data as { work_experience?: unknown }).work_experience);
    const eduRaw = asArray<Record<string, unknown>>((data as { education?: unknown }).education);
    const skillsRaw = asArray<unknown>((data as { skills?: unknown }).skills);

    const firstExp = workRaw[0] ?? {};

    const experiences = workRaw.slice(0, 3).map((w) => ({
      role: asString(w.job_title) ?? asString((w as { position?: unknown }).position) ?? '',
      company: asString(w.company) ?? '',
      dates: w.is_current ? 'Present'
        : asString(w.end_date) ?? asString((w as { endDate?: unknown }).endDate) ?? '',
      bullets: asArray<unknown>(w.achievements ?? (w as { bullets?: unknown }).bullets)
        .filter((b) => typeof b === 'string')
        .slice(0, 3) as string[],
    })).filter((e) => e.role || e.company);

    const education = eduRaw.slice(0, 2).map((e) => ({
      degree: asString(e.degree) ?? '',
      school: asString(e.institution) ?? asString((e as { school?: unknown }).school) ?? '',
      dates: asString(e.end_date) ?? '',
    })).filter((e) => e.degree || e.school);

    const skills = skillsRaw.slice(0, 8).map((s) => {
      if (typeof s === 'string') return s;
      if (s && typeof s === 'object' && typeof (s as { name?: unknown }).name === 'string') {
        return (s as { name: string }).name;
      }
      return '';
    }).filter(Boolean);

    return {
      name: asString(contactObj.full_name),
      title: asString(firstExp.job_title) ?? asString((firstExp as { position?: unknown }).position),
      location: asString(contactObj.location),
      email: asString(contactObj.email),
      summary: asString((data as { summary?: unknown }).summary),
      experiences,
      education,
      skills,
    };
  } catch (err) {
    if (typeof console !== 'undefined') console.warn('previewFromResumeData: malformed data', err);
    return undefined;
  }
}

/* ─── Tokens ────────────────────────────────────────────────────────────── */

const INK = "#0f172a";
const INK_MUTED = "#475569";
const INK_LIGHT = "#94a3b8";
const RULE = "#e2e8f0";
const RULE_FAINT = "#f1f5f9";

/* ─── Primitives ────────────────────────────────────────────────────────── */

/** Faint body-text bar — used only when there's no real text to show. */
const BodyBar = ({ w = "w-full", op = 1 }: { w?: string; op?: number }) => (
  <div
    className={`h-[1.5px] ${w} rounded-full`}
    style={{ backgroundColor: RULE, opacity: op }}
  />
);

/** Real body text line — small but legible. */
const BodyLine = ({ text, size = 5.5, color = INK_MUTED, weight = 400 }: { text: string; size?: number; color?: string; weight?: number }) => (
  <div
    className="leading-[1.35] truncate"
    style={{ fontSize: size, color, fontWeight: weight }}
  >
    {text}
  </div>
);

/** Name (largest text in the preview). */
const Name = ({ text, size = 12, color = INK, tracking = "-0.015em" }: { text?: string; size?: number; color?: string; tracking?: string }) => (
  text ? (
    <div
      className="font-bold leading-none truncate"
      style={{ fontSize: size, color, letterSpacing: tracking }}
    >
      {text}
    </div>
  ) : (
    <div className="h-[7px] w-[55%] rounded-full" style={{ backgroundColor: color }} />
  )
);

/** Job title / subtitle under the name. */
const Subtitle = ({ text, size = 7, color = INK_MUTED, tracking = "0em" }: { text?: string; size?: number; color?: string; tracking?: string }) => (
  text ? (
    <div
      className="font-medium leading-none truncate"
      style={{ fontSize: size, color, letterSpacing: tracking }}
    >
      {text}
    </div>
  ) : (
    <div className="h-[3px] w-[38%] rounded-full" style={{ backgroundColor: color, opacity: 0.55 }} />
  )
);

/** Small-caps section header with accent rule. */
const SectionHeader = ({ label, accent, rule = true, center = false }: { label: string; accent: string; rule?: boolean; center?: boolean }) => (
  <div className={`mb-[3px] ${center ? "text-center" : ""}`}>
    <div
      className="font-bold uppercase leading-none inline-block"
      style={{ fontSize: 5.5, letterSpacing: "0.14em", color: accent }}
    >
      {label}
    </div>
    {rule && <div className="h-px w-full mt-[2px]" style={{ backgroundColor: accent, opacity: 0.22 }} />}
  </div>
);

/** Bullet with accent dot + body bar (used when no real bullet text). */
const BulletBar = ({ accent, w = "w-full" }: { accent: string; w?: string }) => (
  <div className="flex items-center gap-[3px] mb-[2px]">
    <div className="w-[2.5px] h-[2.5px] rounded-full shrink-0" style={{ backgroundColor: accent, opacity: 0.7 }} />
    <BodyBar w={w} />
  </div>
);

/** Real bullet text — truncated to fit the thumbnail. */
const BulletLine = ({ text, accent }: { text: string; accent: string }) => (
  <div className="flex items-start gap-[3px] mb-[1.5px]">
    <div className="w-[2.5px] h-[2.5px] rounded-full shrink-0 mt-[2.5px]" style={{ backgroundColor: accent, opacity: 0.7 }} />
    <div
      className="leading-[1.35] truncate"
      style={{ fontSize: 5, color: INK_MUTED }}
    >
      {text}
    </div>
  </div>
);

/** Skill pill — rounded chip, subtle accent background. */
const SkillChip = ({ accent, label, w }: { accent: string; label?: string; w?: number }) => label ? (
  <span
    className="inline-flex items-center font-medium leading-none truncate max-w-[64px]"
    style={{
      fontSize: 5,
      padding: "1.5px 4px",
      borderRadius: 999,
      color: accent,
      backgroundColor: accent + "1a",
      border: `1px solid ${accent}2a`,
    }}
  >
    {label}
  </span>
) : (
  <div
    className="h-[6px] rounded-full"
    style={{ width: `${w ?? 24}px`, backgroundColor: accent + "2a", border: `1px solid ${accent}1a` }}
  />
);

/** Divider — thin hairline for section separation. */
const HR = ({ color = RULE, op = 1 }: { color?: string; op?: number }) => (
  <div className="h-px w-full" style={{ backgroundColor: color, opacity: op }} />
);

/** Contact row — icons + short text. */
const ContactRow = ({ items, color = INK_LIGHT, inline = true }: { items: string[]; color?: string; inline?: boolean }) => (
  <div className={`flex ${inline ? "items-center gap-[7px] flex-wrap" : "flex-col gap-[2px]"}`}>
    {items.filter(Boolean).map((t, i) => (
      <div key={i} className="flex items-center gap-[2px] min-w-0">
        <div className="w-[2.5px] h-[2.5px] rounded-full shrink-0" style={{ backgroundColor: color }} />
        <div className="leading-none truncate" style={{ fontSize: 5, color, fontWeight: 500 }}>
          {t}
        </div>
      </div>
    ))}
  </div>
);

/** Job entry — real text when exp present, otherwise bars. */
const JobEntry = ({
  accent,
  exp,
  compact = false,
}: {
  accent: string;
  exp?: { role: string; company: string; dates?: string; bullets?: string[] };
  compact?: boolean;
}) => (
  <div className={compact ? "mb-[4px]" : "mb-[6px]"}>
    <div className="flex items-center justify-between gap-[6px] mb-[1px]">
      {exp ? (
        <div
          className="font-semibold leading-none truncate flex-1"
          style={{ fontSize: 7, color: INK }}
        >
          {exp.role}
        </div>
      ) : (
        <div className="h-[3px] w-[48%] rounded-full" style={{ backgroundColor: INK }} />
      )}
      {exp?.dates ? (
        <div className="leading-none shrink-0" style={{ fontSize: 5, color: INK_LIGHT, fontStyle: "italic" }}>
          {exp.dates}
        </div>
      ) : (
        <div className="h-[2.5px] w-[22%] rounded-full" style={{ backgroundColor: INK_LIGHT }} />
      )}
    </div>
    {exp ? (
      <div className="leading-none truncate" style={{ fontSize: 6, color: accent, fontWeight: 500 }}>
        {exp.company}
      </div>
    ) : (
      <div className="h-[2.5px] w-[32%] rounded-full" style={{ backgroundColor: accent, opacity: 0.75 }} />
    )}
    <div className="mt-[3px]">
      {exp?.bullets && exp.bullets.length > 0 ? (
        exp.bullets.slice(0, compact ? 1 : 2).map((b, i) => <BulletLine key={i} text={b} accent={accent} />)
      ) : (
        <>
          <BulletBar accent={accent} />
          <BulletBar accent={accent} w="w-10/12" />
        </>
      )}
    </div>
  </div>
);

/* ─── CLASSIC ────────────────────────────────────────────────────────────── */
function ClassicLayout({ accent, content }: { accent: string; content?: PreviewContent }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "10px 11px 8px" }}>
      {/* Header */}
      <div className="mb-[5px]">
        <Name text={content?.name} size={13} tracking="-0.02em" />
        <div className="mt-[3px]">
          <Subtitle text={content?.title} size={7} color={accent} />
        </div>
        <div className="mt-[4px]">
          <ContactRow
            items={content?.email || content?.location ? [content.email, content.location].filter(Boolean) as string[] : ["email@example.com", "Location", "Phone"]}
          />
        </div>
      </div>

      <div className="h-[2px] w-full mb-[6px]" style={{ backgroundColor: accent }} />

      {/* Summary */}
      {content?.summary ? (
        <div className="mb-[7px]">
          <SectionHeader label="Summary" accent={accent} />
          <BodyLine text={content.summary.slice(0, 130)} size={5.5} />
          <div className="mt-[1px]"><BodyLine text={content.summary.slice(130, 260) || ' '} size={5.5} /></div>
        </div>
      ) : (
        <div className="mb-[7px]">
          <SectionHeader label="Summary" accent={accent} />
          <BodyBar />
          <div className="mt-[2px]"><BodyBar w="w-11/12" /></div>
          <div className="mt-[2px]"><BodyBar w="w-4/5" /></div>
        </div>
      )}

      {/* Experience */}
      <div className="mb-[6px]">
        <SectionHeader label="Experience" accent={accent} />
        {content?.experiences && content.experiences.length > 0 ? (
          content.experiences.slice(0, 2).map((e, i) => <JobEntry key={i} accent={accent} exp={e} />)
        ) : (
          <>
            <JobEntry accent={accent} />
            <JobEntry accent={accent} compact />
          </>
        )}
      </div>

      {/* Skills */}
      <div>
        <SectionHeader label="Skills" accent={accent} />
        <div className="flex flex-wrap gap-[3px] mt-[1px]">
          {content?.skills && content.skills.length > 0
            ? content.skills.slice(0, 7).map((s, i) => <SkillChip key={i} accent={accent} label={s} />)
            : [30, 38, 26, 34, 28, 32, 24].map((w, i) => <SkillChip key={i} accent={accent} w={w} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── SIDEBAR ────────────────────────────────────────────────────────────── */
function SidebarLayout({ accent, content }: { accent: string; content?: PreviewContent }) {
  const initials = content?.name
    ? content.name.split(/\s+/).map((n) => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()
    : "";
  return (
    <div className="w-full h-full flex">
      {/* Left dark sidebar */}
      <div
        className="w-[34%] h-full flex flex-col shrink-0 relative overflow-hidden"
        style={{ backgroundColor: accent, padding: "11px 6px 8px" }}
      >
        {/* Avatar */}
        <div className="w-[34px] h-[34px] rounded-full mx-auto mb-[5px] flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: "rgba(255,255,255,0.18)", fontSize: 10, border: "1.5px solid rgba(255,255,255,0.35)" }}>
          {initials || "•"}
        </div>
        {content?.name ? (
          <div className="text-white text-center font-bold leading-tight truncate px-[2px] mb-[2px]" style={{ fontSize: 8, letterSpacing: "-0.01em" }}>
            {content.name}
          </div>
        ) : (
          <div className="h-[3px] w-[85%] rounded-full bg-white/90 mx-auto mb-[3px]" />
        )}
        {content?.title ? (
          <div className="text-center leading-tight truncate px-[2px] mb-[8px]" style={{ fontSize: 5.5, color: "rgba(255,255,255,0.75)" }}>
            {content.title}
          </div>
        ) : (
          <div className="h-[2px] w-[65%] rounded-full bg-white/55 mx-auto mb-[8px]" />
        )}

        <div className="h-px bg-white/20 mb-[6px]" />

        {/* Skills */}
        <div className="mb-[6px]">
          <div className="text-white font-bold uppercase mb-[4px] leading-none" style={{ fontSize: 4.5, letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)" }}>
            Skills
          </div>
          {content?.skills && content.skills.length > 0 ? (
            <div className="flex flex-col gap-[3px]">
              {content.skills.slice(0, 6).map((s, i) => (
                <div key={i} className="leading-none truncate" style={{ fontSize: 5.5, color: "rgba(255,255,255,0.92)" }}>
                  {s}
                </div>
              ))}
            </div>
          ) : (
            [80, 65, 90, 70, 75].map((pct, i) => (
              <div key={i} className="h-[2px] rounded-full mb-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <div className="h-full rounded-full bg-white/75" style={{ width: `${pct}%` }} />
              </div>
            ))
          )}
        </div>

        <div className="h-px bg-white/20 mb-[6px]" />

        {/* Contact */}
        <div>
          <div className="text-white font-bold uppercase mb-[4px] leading-none" style={{ fontSize: 4.5, letterSpacing: "0.18em", color: "rgba(255,255,255,0.85)" }}>
            Contact
          </div>
          {content?.email || content?.location ? (
            <div className="flex flex-col gap-[2px]">
              {content?.email && <div className="leading-none truncate" style={{ fontSize: 5, color: "rgba(255,255,255,0.85)" }}>{content.email}</div>}
              {content?.location && <div className="leading-none truncate" style={{ fontSize: 5, color: "rgba(255,255,255,0.85)" }}>{content.location}</div>}
            </div>
          ) : (
            [60, 45, 55].map((w, i) => (
              <div key={i} className="h-[1.5px] rounded-full mb-[3px]" style={{ width: `${w}%`, backgroundColor: "rgba(255,255,255,0.4)" }} />
            ))
          )}
        </div>
      </div>

      {/* Right main */}
      <div className="flex-1 bg-white flex flex-col" style={{ padding: "11px 10px 8px" }}>
        {/* Large role title since name is on sidebar */}
        <div className="mb-[6px]">
          {content?.title ? (
            <>
              <div className="font-bold leading-none" style={{ fontSize: 10, color: INK, letterSpacing: "-0.01em" }}>
                {content.title}
              </div>
              {content.experiences?.[0]?.company && (
                <div className="mt-[2px] font-medium leading-none truncate" style={{ fontSize: 6, color: accent }}>
                  {content.experiences[0].company}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="h-[5px] w-[60%] rounded-full" style={{ backgroundColor: INK }} />
              <div className="mt-[2px] h-[2.5px] w-[38%] rounded-full" style={{ backgroundColor: accent }} />
            </>
          )}
          <div className="h-px w-full mt-[4px]" style={{ backgroundColor: RULE }} />
        </div>

        {/* Experience */}
        <div className="mb-[5px]">
          <SectionHeader label="Experience" accent={accent} />
          {content?.experiences && content.experiences.length > 0 ? (
            content.experiences.slice(0, 2).map((e, i) => <JobEntry key={i} accent={accent} exp={e} />)
          ) : (
            <>
              <JobEntry accent={accent} />
              <JobEntry accent={accent} compact />
            </>
          )}
        </div>

        {/* Education */}
        <div>
          <SectionHeader label="Education" accent={accent} />
          {content?.education?.[0] ? (
            <>
              <div className="font-semibold leading-none truncate" style={{ fontSize: 6.5, color: INK }}>{content.education[0].degree}</div>
              <div className="mt-[1px] leading-none truncate" style={{ fontSize: 5.5, color: INK_MUTED }}>{content.education[0].school}</div>
            </>
          ) : (
            <>
              <div className="h-[3px] w-[48%] rounded-full" style={{ backgroundColor: INK }} />
              <div className="mt-[1.5px] h-[2px] w-[32%] rounded-full" style={{ backgroundColor: INK_LIGHT }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── EXECUTIVE ──────────────────────────────────────────────────────────── */
function ExecutiveLayout({ accent, content }: { accent: string; content?: PreviewContent }) {
  // Subtle gradient header for premium feel
  const headerStyle = {
    background: `linear-gradient(135deg, ${accent} 0%, ${shadeColor(accent, -18)} 100%)`,
    padding: "11px 12px 10px",
  };
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="w-full shrink-0 text-white" style={headerStyle}>
        <Name text={content?.name} size={13} color="#ffffff" tracking="-0.02em" />
        <div className="mt-[3px]">
          <Subtitle text={content?.title} size={7} color="rgba(255,255,255,0.85)" />
        </div>
        <div className="mt-[6px]">
          <ContactRow
            color="rgba(255,255,255,0.75)"
            items={content?.email || content?.location ? [content.email, content.location].filter(Boolean) as string[] : ["email@example.com", "Location", "Phone"]}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col" style={{ padding: "8px 12px 8px" }}>
        {/* Summary */}
        <div className="mb-[6px]">
          <SectionHeader label="Summary" accent={accent} />
          {content?.summary ? (
            <>
              <BodyLine text={content.summary.slice(0, 120)} size={5.5} />
              <div className="mt-[1px]"><BodyLine text={content.summary.slice(120, 240) || ' '} size={5.5} /></div>
            </>
          ) : (
            <>
              <BodyBar />
              <div className="mt-[2px]"><BodyBar w="w-11/12" /></div>
              <div className="mt-[2px]"><BodyBar w="w-4/5" /></div>
            </>
          )}
        </div>

        {/* Experience */}
        <div className="mb-[6px]">
          <SectionHeader label="Experience" accent={accent} />
          {content?.experiences && content.experiences.length > 0 ? (
            content.experiences.slice(0, 2).map((e, i) => <JobEntry key={i} accent={accent} exp={e} compact={i > 0} />)
          ) : (
            <>
              <JobEntry accent={accent} />
              <JobEntry accent={accent} compact />
            </>
          )}
        </div>

        {/* Footer columns */}
        <div className="flex gap-[10px]">
          <div className="flex-1 min-w-0">
            <SectionHeader label="Education" accent={accent} />
            {content?.education?.[0] ? (
              <>
                <div className="font-semibold leading-none truncate" style={{ fontSize: 6.5, color: INK }}>{content.education[0].degree}</div>
                <div className="mt-[1px] leading-none truncate" style={{ fontSize: 5.5, color: accent }}>{content.education[0].school}</div>
              </>
            ) : (
              <>
                <div className="h-[3px] w-[56%] rounded-full" style={{ backgroundColor: INK }} />
                <div className="mt-[1px] h-[2px] w-[40%] rounded-full" style={{ backgroundColor: accent }} />
              </>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <SectionHeader label="Skills" accent={accent} />
            <div className="flex flex-wrap gap-[3px]">
              {content?.skills && content.skills.length > 0
                ? content.skills.slice(0, 5).map((s, i) => <SkillChip key={i} accent={accent} label={s} />)
                : [26, 32, 22, 28, 24].map((w, i) => <SkillChip key={i} accent={accent} w={w} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MINIMAL ────────────────────────────────────────────────────────────── */
function MinimalLayout({ accent, content }: { accent: string; content?: PreviewContent }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "12px 13px 9px" }}>
      {/* Centered header */}
      <div className="text-center mb-[6px]">
        <Name text={content?.name} size={13} tracking="-0.02em" />
        <div className="mt-[2px] flex justify-center">
          <Subtitle text={content?.title} size={6.5} color={INK_MUTED} tracking="0.01em" />
        </div>
        <div className="mt-[4px] flex justify-center">
          <ContactRow
            items={content?.email || content?.location ? [content.email, content.location].filter(Boolean) as string[] : ["email@example.com", "Phone", "Location"]}
          />
        </div>
      </div>

      {/* Thin accent rule */}
      <div className="h-[1px] w-[40%] mx-auto mb-[7px]" style={{ backgroundColor: accent }} />

      {/* Summary */}
      {content?.summary ? (
        <div className="mb-[6px]">
          <BodyLine text={content.summary.slice(0, 140)} size={5.5} />
          <div className="mt-[1px]"><BodyLine text={content.summary.slice(140, 260) || ' '} size={5.5} /></div>
        </div>
      ) : (
        <div className="mb-[6px]">
          <BodyBar />
          <div className="mt-[2px]"><BodyBar w="w-11/12" /></div>
          <div className="mt-[2px]"><BodyBar w="w-4/5" /></div>
        </div>
      )}

      <HR color={RULE} />

      {/* Experience */}
      <div className="my-[6px]">
        <SectionHeader label="Experience" accent={accent} />
        {content?.experiences && content.experiences.length > 0 ? (
          content.experiences.slice(0, 2).map((e, i) => <JobEntry key={i} accent={accent} exp={e} compact={i > 0} />)
        ) : (
          <>
            <JobEntry accent={accent} />
            <JobEntry accent={accent} compact />
          </>
        )}
      </div>

      <HR color={RULE} />

      {/* Bottom two columns */}
      <div className="flex gap-[10px] mt-[5px]">
        <div className="flex-1 min-w-0">
          <SectionHeader label="Education" accent={accent} rule={false} />
          {content?.education?.[0] ? (
            <>
              <div className="font-semibold leading-none truncate" style={{ fontSize: 6.5, color: INK }}>{content.education[0].degree}</div>
              <div className="mt-[1px] leading-none truncate" style={{ fontSize: 5.5, color: INK_MUTED }}>{content.education[0].school}</div>
            </>
          ) : (
            <>
              <div className="h-[3px] w-[56%] rounded-full" style={{ backgroundColor: INK }} />
              <div className="mt-[1px] h-[2px] w-[40%] rounded-full" style={{ backgroundColor: INK_LIGHT }} />
            </>
          )}
        </div>
        <div className="w-px" style={{ backgroundColor: RULE }} />
        <div className="flex-1 min-w-0">
          <SectionHeader label="Skills" accent={accent} rule={false} />
          <div className="flex flex-wrap gap-[3px]">
            {content?.skills && content.skills.length > 0
              ? content.skills.slice(0, 5).map((s, i) => <SkillChip key={i} accent={accent} label={s} />)
              : [24, 30, 20, 26, 22].map((w, i) => <SkillChip key={i} accent={accent} w={w} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CREATIVE ───────────────────────────────────────────────────────────── */
function CreativeLayout({ accent, content }: { accent: string; content?: PreviewContent }) {
  const initials = content?.name
    ? content.name.split(/\s+/).map((n) => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()
    : "";
  return (
    <div className="w-full h-full flex bg-white">
      {/* Left accent column */}
      <div
        className="w-[34%] h-full flex flex-col shrink-0"
        style={{
          background: `linear-gradient(180deg, ${accent} 0%, ${shadeColor(accent, -22)} 100%)`,
          padding: "12px 7px 9px",
        }}
      >
        <div className="w-[36px] h-[36px] rounded-full mx-auto mb-[6px] flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: "rgba(255,255,255,0.22)", fontSize: 11, border: "2px solid rgba(255,255,255,0.45)" }}>
          {initials || "•"}
        </div>
        {content?.name ? (
          <div className="text-white text-center font-bold leading-tight mb-[2px] px-[2px]" style={{ fontSize: 8.5, letterSpacing: "-0.01em" }}>
            {content.name}
          </div>
        ) : (
          <div className="h-[3px] w-[86%] rounded-full bg-white mx-auto mb-[2px]" />
        )}
        {content?.title ? (
          <div className="text-center leading-tight mb-[7px] px-[2px]" style={{ fontSize: 5.5, color: "rgba(255,255,255,0.75)" }}>
            {content.title}
          </div>
        ) : (
          <div className="h-[2px] w-[66%] rounded-full bg-white/60 mx-auto mb-[7px]" />
        )}

        <div className="h-px bg-white/25 mb-[6px]" />

        {/* About */}
        <div className="mb-[6px]">
          <div className="font-bold uppercase leading-none mb-[3px]" style={{ fontSize: 4.5, letterSpacing: "0.18em", color: "rgba(255,255,255,0.88)" }}>
            About
          </div>
          {content?.summary ? (
            <div className="leading-[1.4]" style={{ fontSize: 4.8, color: "rgba(255,255,255,0.82)" }}>
              {content.summary.slice(0, 100)}{content.summary.length > 100 ? "…" : ""}
            </div>
          ) : (
            <>
              <div className="h-[1.5px] w-full rounded-full mb-[2px]" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
              <div className="h-[1.5px] w-4/5 rounded-full mb-[2px]" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
              <div className="h-[1.5px] w-full rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
            </>
          )}
        </div>

        <div className="h-px bg-white/25 mb-[6px]" />

        {/* Skills */}
        <div>
          <div className="font-bold uppercase leading-none mb-[3px]" style={{ fontSize: 4.5, letterSpacing: "0.18em", color: "rgba(255,255,255,0.88)" }}>
            Expertise
          </div>
          {content?.skills && content.skills.length > 0 ? (
            content.skills.slice(0, 5).map((s, i) => (
              <div key={i} className="leading-none truncate mb-[2.5px]" style={{ fontSize: 5.5, color: "rgba(255,255,255,0.94)" }}>{s}</div>
            ))
          ) : (
            [85, 70, 90, 60, 75].map((pct, i) => (
              <div key={i} className="h-[2.5px] w-full rounded-full mb-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.18)" }}>
                <div className="h-full rounded-full bg-white/80" style={{ width: `${pct}%` }} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right main content */}
      <div className="flex-1" style={{ padding: "11px 10px 8px" }}>
        {/* Experience */}
        <div className="mb-[5px]">
          <SectionHeader label="Experience" accent={accent} />
          {content?.experiences && content.experiences.length > 0 ? (
            content.experiences.slice(0, 2).map((e, i) => (
              <div key={i} className="mb-[5px] pl-[5px] border-l-[2px]" style={{ borderColor: accent }}>
                <div className="flex items-center justify-between gap-[4px]">
                  <div className="font-semibold leading-none truncate" style={{ fontSize: 7, color: INK }}>{e.role}</div>
                  {e.dates && <div className="leading-none shrink-0" style={{ fontSize: 5, color: INK_LIGHT, fontStyle: "italic" }}>{e.dates}</div>}
                </div>
                <div className="leading-none truncate mt-[1px]" style={{ fontSize: 6, color: accent, fontWeight: 500 }}>{e.company}</div>
                <div className="mt-[2px]">
                  {e.bullets && e.bullets.length > 0 ? (
                    e.bullets.slice(0, 2).map((b, j) => <BulletLine key={j} text={b} accent={accent} />)
                  ) : (
                    <>
                      <BulletBar accent={accent} />
                      <BulletBar accent={accent} w="w-5/6" />
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            [0, 1].map((j) => (
              <div key={j} className="mb-[5px] pl-[5px] border-l-[2px]" style={{ borderColor: accent }}>
                <div className="flex items-center justify-between mb-[1px]">
                  <div className="h-[3px] w-[45%] rounded-full" style={{ backgroundColor: INK }} />
                  <div className="h-[2px] w-[22%] rounded-full" style={{ backgroundColor: INK_LIGHT }} />
                </div>
                <div className="h-[2.5px] w-[32%] rounded-full" style={{ backgroundColor: accent }} />
                <div className="mt-[2px]">
                  <BulletBar accent={accent} />
                  <BulletBar accent={accent} w="w-5/6" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Education */}
        <div>
          <SectionHeader label="Education" accent={accent} />
          <div className="pl-[5px] border-l-[2px]" style={{ borderColor: accent }}>
            {content?.education?.[0] ? (
              <>
                <div className="font-semibold leading-none truncate" style={{ fontSize: 6.5, color: INK }}>{content.education[0].degree}</div>
                <div className="mt-[1px] leading-none truncate" style={{ fontSize: 5.5, color: accent }}>{content.education[0].school}</div>
              </>
            ) : (
              <>
                <div className="h-[3px] w-[50%] rounded-full" style={{ backgroundColor: INK }} />
                <div className="mt-[1px] h-[2px] w-[36%] rounded-full" style={{ backgroundColor: accent }} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CENTERED ───────────────────────────────────────────────────────────── */
function CenteredLayout({ accent, content }: { accent: string; content?: PreviewContent }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "12px 13px 9px" }}>
      {/* Centered header */}
      <div className="text-center mb-[5px]">
        <Name text={content?.name} size={13} tracking="-0.02em" />
        <div className="mt-[3px] flex justify-center">
          <Subtitle text={content?.title} size={7} color={accent} />
        </div>
        <div className="mt-[4px] flex justify-center">
          <ContactRow
            items={content?.email || content?.location ? [content.email, content.location].filter(Boolean) as string[] : ["email@example.com", "Phone", "Location"]}
          />
        </div>
      </div>

      {/* Decorative centre divider */}
      <div className="flex items-center gap-[5px] mb-[6px]">
        <div className="h-px flex-1" style={{ backgroundColor: RULE }} />
        <div className="w-[4px] h-[4px] rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-px flex-1" style={{ backgroundColor: RULE }} />
      </div>

      {/* Summary */}
      {content?.summary ? (
        <div className="mb-[6px]">
          <BodyLine text={content.summary.slice(0, 140)} size={5.5} />
          <div className="mt-[1px]"><BodyLine text={content.summary.slice(140, 260) || ' '} size={5.5} /></div>
        </div>
      ) : (
        <div className="mb-[6px]">
          <BodyBar />
          <div className="mt-[2px]"><BodyBar w="w-11/12" /></div>
          <div className="mt-[2px]"><BodyBar w="w-5/6" /></div>
        </div>
      )}

      {/* Experience */}
      <div className="mb-[6px]">
        <SectionHeader label="Experience" accent={accent} center />
        {content?.experiences && content.experiences.length > 0 ? (
          content.experiences.slice(0, 2).map((e, i) => <JobEntry key={i} accent={accent} exp={e} compact={i > 0} />)
        ) : (
          <>
            <JobEntry accent={accent} />
            <JobEntry accent={accent} compact />
          </>
        )}
      </div>

      {/* Two-column footer */}
      <div className="flex gap-[10px]">
        <div className="flex-1 min-w-0">
          <SectionHeader label="Education" accent={accent} center />
          {content?.education?.[0] ? (
            <div className="text-center">
              <div className="font-semibold leading-none truncate" style={{ fontSize: 6.5, color: INK }}>{content.education[0].degree}</div>
              <div className="mt-[1px] leading-none truncate" style={{ fontSize: 5.5, color: INK_MUTED }}>{content.education[0].school}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="h-[3px] w-[56%] rounded-full" style={{ backgroundColor: INK }} />
              <div className="mt-[1px] h-[2px] w-[40%] rounded-full" style={{ backgroundColor: INK_LIGHT }} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <SectionHeader label="Skills" accent={accent} center />
          <div className="flex flex-wrap justify-center gap-[3px]">
            {content?.skills && content.skills.length > 0
              ? content.skills.slice(0, 5).map((s, i) => <SkillChip key={i} accent={accent} label={s} />)
              : [24, 30, 20, 26, 22].map((w, i) => <SkillChip key={i} accent={accent} w={w} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/** Shade a hex color by percent (negative = darker, positive = lighter). */
function shadeColor(hex: string, percent: number): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return hex;
  const num = parseInt(clean, 16);
  let r = (num >> 16) + Math.round((percent / 100) * 255);
  let g = ((num >> 8) & 0x00ff) + Math.round((percent / 100) * 255);
  let b = (num & 0x0000ff) + Math.round((percent / 100) * 255);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

/* ─── Router ─────────────────────────────────────────────────────────────── */
export function TemplatePreview({
  layout,
  accent,
  content,
}: {
  layout: TemplateLayout;
  accent: string;
  content?: PreviewContent;
}) {
  try {
    switch (layout) {
      case "classic":   return <ClassicLayout accent={accent} content={content} />;
      case "sidebar":   return <SidebarLayout accent={accent} content={content} />;
      case "executive": return <ExecutiveLayout accent={accent} content={content} />;
      case "minimal":   return <MinimalLayout accent={accent} content={content} />;
      case "creative":  return <CreativeLayout accent={accent} content={content} />;
      case "centered":  return <CenteredLayout accent={accent} content={content} />;
    }
  } catch {
    return <ClassicLayout accent={accent} />;
  }
}
