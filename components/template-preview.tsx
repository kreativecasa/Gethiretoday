/**
 * High-fidelity resume thumbnail previews.
 * Renders as a miniaturised, proportional resume document for each layout type.
 */

export type TemplateLayout =
  | "classic"
  | "sidebar"
  | "executive"
  | "minimal"
  | "creative"
  | "centered";

/* ─── Primitive helpers ──────────────────────────────────────────────────── */

/** A horizontal "text" bar. dark = heading weight, else body-text weight. */
const Bar = ({
  w,
  dark = false,
  accent,
  op = 1,
}: {
  w: string;
  dark?: boolean;
  accent?: string;
  op?: number;
}) => (
  <div
    className={`h-[2.5px] ${w} rounded-full`}
    style={{
      backgroundColor: accent ?? (dark ? "#334155" : "#cbd5e1"),
      opacity: op,
    }}
  />
);

const ThinBar = ({ w, op = 1 }: { w: string; op?: number }) => (
  <div
    className={`h-[1.5px] ${w} rounded-full bg-slate-200`}
    style={{ opacity: op }}
  />
);

const Divider = ({ accent, op = 0.25 }: { accent: string; op?: number }) => (
  <div className="w-full h-px" style={{ backgroundColor: accent, opacity: op }} />
);

/** Labelled section heading — small ALL-CAPS text centred on a rule. */
const SectionHead = ({
  accent,
  style = "rule",
}: {
  accent: string;
  style?: "rule" | "bar" | "underline";
}) => {
  if (style === "bar")
    return (
      <div
        className="h-[2px] w-[38%] rounded-full mb-[3px]"
        style={{ backgroundColor: accent }}
      />
    );
  if (style === "underline")
    return (
      <div className="mb-[3px]">
        <div className="h-[2px] w-[32%] rounded-full mb-[1px]" style={{ backgroundColor: accent }} />
        <div className="h-px w-full bg-slate-200" />
      </div>
    );
  // default: centred rule with label dot
  return (
    <div className="flex items-center gap-[3px] mb-[3px]">
      <div className="h-px flex-1" style={{ backgroundColor: accent, opacity: 0.25 }} />
      <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: accent }} />
      <div className="h-px flex-1" style={{ backgroundColor: accent, opacity: 0.25 }} />
    </div>
  );
};

const Bullet = ({ accent, w }: { accent: string; w: string }) => (
  <div className="flex items-center gap-[2.5px] mb-[1.5px]">
    <div
      className="w-[2.5px] h-[2.5px] rounded-full shrink-0"
      style={{ backgroundColor: accent, opacity: 0.6 }}
    />
    <ThinBar w={w} />
  </div>
);

const SkillPill = ({ accent, w }: { accent: string; w: number }) => (
  <div
    className="h-[5px] rounded-full"
    style={{ width: `${w}px`, backgroundColor: accent, opacity: 0.18 }}
  />
);

const JobEntry = ({
  accent,
  title = "w-[42%]",
  date = "w-[22%]",
  company = "w-[30%]",
  bullets = 2,
}: {
  accent: string;
  title?: string;
  date?: string;
  company?: string;
  bullets?: number;
}) => (
  <div className="mb-[4px]">
    <div className="flex items-center justify-between mb-[1.5px]">
      <Bar w={title} dark />
      <Bar w={date} op={0.6} />
    </div>
    <Bar w={company} op={0.65} />
    <div className="mt-[2px]">
      <Bullet accent={accent} w="w-full" />
      <Bullet accent={accent} w="w-10/12" />
      {bullets >= 3 && <Bullet accent={accent} w="w-4/5" />}
    </div>
  </div>
);

/* ─── CLASSIC ─────────────────────────────────────────────────────────────── */
function ClassicLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "7px 8px 5px" }}>
      {/* Top accent bar */}
      <div className="h-[5px] w-full rounded-sm mb-[5px]" style={{ backgroundColor: accent }} />

      {/* Header */}
      <div className="mb-[4px]">
        <div className="h-[6px] w-[52%] rounded-full mb-[2.5px]" style={{ backgroundColor: accent }} />
        <Bar w="w-[33%]" dark op={0.6} />
        <div className="flex items-center gap-[5px] mt-[3px]">
          {[22, 28, 20].map((w, i) => (
            <div key={i} className="flex items-center gap-[2px]">
              <div className="w-[2.5px] h-[2.5px] rounded-full" style={{ backgroundColor: accent, opacity: 0.5 }} />
              <ThinBar w={`w-[${w}px]`} />
            </div>
          ))}
        </div>
      </div>

      <Divider accent={accent} />

      {/* Summary */}
      <div className="mt-[3px] mb-[4px]">
        <SectionHead accent={accent} style="rule" />
        <ThinBar w="w-full" />
        <div className="mt-[1.5px]"><ThinBar w="w-11/12" /></div>
        <div className="mt-[1.5px]"><ThinBar w="w-4/5" /></div>
      </div>

      {/* Experience */}
      <div className="mb-[3px]">
        <SectionHead accent={accent} style="rule" />
        <JobEntry accent={accent} title="w-[38%]" date="w-[20%]" company="w-[28%]" bullets={3} />
        <JobEntry accent={accent} title="w-[42%]" date="w-[18%]" company="w-[32%]" bullets={2} />
      </div>

      {/* Education */}
      <div className="mb-[3px]">
        <SectionHead accent={accent} style="rule" />
        <div className="flex items-center justify-between mb-[1.5px]">
          <Bar w="w-[40%]" dark />
          <Bar w="w-[18%]" op={0.6} />
        </div>
        <Bar w="w-[30%]" op={0.6} />
      </div>

      {/* Skills */}
      <div>
        <SectionHead accent={accent} style="rule" />
        <div className="flex flex-wrap gap-[2.5px] mt-[1px]">
          {[28, 36, 22, 32, 26, 30, 20].map((w, i) => (
            <SkillPill key={i} accent={accent} w={w} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SIDEBAR ─────────────────────────────────────────────────────────────── */
function SidebarLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full flex">
      {/* Left panel */}
      <div
        className="w-[30%] h-full flex flex-col shrink-0"
        style={{ backgroundColor: accent, padding: "8px 5px 6px" }}
      >
        {/* Photo */}
        <div className="w-[24px] h-[24px] rounded-full bg-white/25 mx-auto mb-[4px] flex items-center justify-center border-2 border-white/40">
          <div className="w-[12px] h-[12px] rounded-full bg-white/50" />
        </div>
        {/* Name */}
        <div className="h-[3px] w-[85%] rounded-full bg-white/90 mx-auto mb-[2px]" />
        <div className="h-[2px] w-[65%] rounded-full bg-white/55 mx-auto mb-[6px]" />

        <div className="h-px w-full bg-white/20 mb-[4px]" />

        {/* Contact */}
        <div className="mb-[5px]">
          <div className="h-[2px] w-[55%] rounded-full bg-white/65 mb-[3px]" />
          {[100, 80, 90, 75].map((pct, i) => (
            <div key={i} className="flex items-center gap-[2px] mb-[2px]">
              <div className="w-[2.5px] h-[2.5px] rounded-full bg-white/55 shrink-0" />
              <div className="h-[1.5px] rounded-full bg-white/40" style={{ width: `${pct * 0.55}%` }} />
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-white/20 mb-[4px]" />

        {/* Skills */}
        <div className="mb-[5px]">
          <div className="h-[2px] w-[50%] rounded-full bg-white/65 mb-[3px]" />
          {[80, 65, 90, 70, 75].map((pct, i) => (
            <div key={i} className="mb-[3px]">
              <div className="h-[1.5px] rounded-full bg-white/25 mb-[1px]" />
              <div className="h-[2px] rounded-full bg-white/70" style={{ width: `${pct}%` }} />
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-white/20 mb-[4px]" />

        {/* Languages */}
        <div>
          <div className="h-[2px] w-[60%] rounded-full bg-white/65 mb-[3px]" />
          {[70, 90, 50].map((pct, i) => (
            <div key={i} className="flex items-center gap-[2px] mb-[2px]">
              <div className="w-[2.5px] h-[2.5px] rounded-full bg-white/55 shrink-0" />
              <div className="h-[1.5px] rounded-full bg-white/40" style={{ width: `${pct * 0.6}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-white flex flex-col" style={{ padding: "8px 7px 6px" }}>
        {/* Name + title on right */}
        <div className="mb-[4px]">
          <div className="h-[5px] w-[60%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <Bar w="w-[40%]" dark op={0.55} />
          <div className="h-px w-full mt-[3px]" style={{ backgroundColor: accent, opacity: 0.2 }} />
        </div>

        {/* Experience */}
        <div className="mb-[4px]">
          <SectionHead accent={accent} style="bar" />
          <JobEntry accent={accent} title="w-[50%]" date="w-[22%]" company="w-[36%]" bullets={2} />
          <JobEntry accent={accent} title="w-[46%]" date="w-[20%]" company="w-[32%]" bullets={2} />
        </div>

        {/* Education */}
        <div className="mb-[4px]">
          <SectionHead accent={accent} style="bar" />
          <div className="flex items-center justify-between mb-[1.5px]">
            <Bar w="w-[50%]" dark />
            <Bar w="w-[20%]" op={0.6} />
          </div>
          <Bar w="w-[35%]" op={0.6} />
        </div>

        {/* Certifications */}
        <div>
          <SectionHead accent={accent} style="bar" />
          <ThinBar w="w-full" />
          <div className="mt-[1.5px]"><ThinBar w="w-4/5" /></div>
        </div>
      </div>
    </div>
  );
}

/* ─── EXECUTIVE ───────────────────────────────────────────────────────────── */
function ExecutiveLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Bold header block */}
      <div
        className="w-full shrink-0"
        style={{ backgroundColor: accent, padding: "9px 10px 8px" }}
      >
        {/* Name */}
        <div className="h-[7px] w-[55%] rounded-full bg-white mb-[3px]" />
        {/* Title */}
        <div className="h-[3px] w-[38%] rounded-full bg-white/65 mb-[5px]" />
        {/* Contact row */}
        <div className="flex items-center gap-[6px]">
          {[22, 26, 20].map((w, i) => (
            <div key={i} className="flex items-center gap-[2.5px]">
              <div className="w-[3px] h-[3px] rounded-full bg-white/55" />
              <div className="h-[2px] rounded-full bg-white/40" style={{ width: `${w}px` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col" style={{ padding: "6px 10px" }}>
        {/* Summary */}
        <div className="mb-[4px]">
          <SectionHead accent={accent} style="underline" />
          <ThinBar w="w-full" />
          <div className="mt-[1.5px]"><ThinBar w="w-11/12" /></div>
          <div className="mt-[1.5px]"><ThinBar w="w-4/5" /></div>
        </div>

        {/* Experience */}
        <div className="mb-[4px]">
          <SectionHead accent={accent} style="underline" />
          <JobEntry accent={accent} title="w-[40%]" date="w-[22%]" company="w-[30%]" bullets={3} />
          <JobEntry accent={accent} title="w-[44%]" date="w-[18%]" company="w-[32%]" bullets={2} />
        </div>

        {/* Two-column footer */}
        <div className="flex gap-[6px]">
          <div className="flex-1">
            <SectionHead accent={accent} style="underline" />
            <Bar w="w-[48%]" dark />
            <div className="mt-[1.5px]"><Bar w="w-[36%]" op={0.6} /></div>
            <ThinBar w="w-full" />
            <div className="mt-[1.5px]"><ThinBar w="w-4/5" /></div>
          </div>
          <div className="flex-1">
            <SectionHead accent={accent} style="underline" />
            <div className="flex flex-wrap gap-[2px] mt-[1px]">
              {[28, 22, 32, 26, 20, 30].map((w, i) => (
                <SkillPill key={i} accent={accent} w={w} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MINIMAL ─────────────────────────────────────────────────────────────── */
function MinimalLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "8px 9px 5px" }}>
      {/* Centered header */}
      <div className="text-center mb-[4px]">
        <div className="h-[6px] w-[50%] rounded-full mx-auto mb-[2.5px] bg-slate-800" />
        <div className="h-[2.5px] w-[35%] rounded-full mx-auto mb-[3px]" style={{ backgroundColor: accent }} />
        {/* Contact row */}
        <div className="flex items-center justify-center gap-[4px]">
          {[18, 22, 18, 14].map((w, i) => (
            <div key={i} className="flex items-center gap-[1.5px]">
              {i > 0 && <div className="w-[1.5px] h-[1.5px] rounded-full bg-slate-300" />}
              <div className="h-[1.5px] rounded-full bg-slate-300" style={{ width: `${w}px` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Full-width accent rule */}
      <div className="h-[2px] w-full rounded-full mb-[4px]" style={{ backgroundColor: accent }} />

      {/* Summary */}
      <div className="mb-[4px]">
        <ThinBar w="w-full" />
        <div className="mt-[1.5px]"><ThinBar w="w-11/12" /></div>
        <div className="mt-[1.5px]"><ThinBar w="w-5/6" /></div>
      </div>

      <div className="h-px w-full bg-slate-200 mb-[3px]" />

      {/* Experience */}
      <div className="mb-[3px]">
        <div className="h-[2.5px] w-[28%] rounded-full mb-[3px]" style={{ backgroundColor: accent }} />
        <JobEntry accent={accent} title="w-[42%]" date="w-[20%]" company="w-[32%]" bullets={2} />
        <JobEntry accent={accent} title="w-[38%]" date="w-[18%]" company="w-[28%]" bullets={2} />
      </div>

      <div className="h-px w-full bg-slate-200 mb-[3px]" />

      {/* Bottom two columns */}
      <div className="flex gap-[6px]">
        <div className="flex-1">
          <div className="h-[2px] w-[55%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          <Bar w="w-[48%]" dark />
          <div className="mt-[1px]"><Bar w="w-[36%]" op={0.6} /></div>
          <div className="mt-[1.5px]"><ThinBar w="w-full" /></div>
          <div className="mt-[1.5px]"><ThinBar w="w-4/5" /></div>
        </div>
        <div className="w-px bg-slate-200" />
        <div className="flex-1">
          <div className="h-[2px] w-[40%] rounded-full mb-[2px]" style={{ backgroundColor: accent }} />
          {[80, 65, 90, 70, 75].map((pct, i) => (
            <div key={i} className="h-[2px] rounded-full bg-slate-200 mb-[2px]">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: accent, opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CREATIVE ────────────────────────────────────────────────────────────── */
function CreativeLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full flex">
      {/* Left accent column */}
      <div
        className="w-[32%] h-full flex flex-col shrink-0"
        style={{ backgroundColor: accent, padding: "8px 5px 6px" }}
      >
        {/* Photo circle */}
        <div className="w-[28px] h-[28px] rounded-full bg-white/25 mx-auto mb-[4px] flex items-center justify-center border-[2.5px] border-white/50">
          <div className="w-[14px] h-[14px] rounded-full bg-white/60" />
        </div>
        {/* Name */}
        <div className="h-[3px] w-[88%] rounded-full bg-white mx-auto mb-[2px]" />
        <div className="h-[2px] w-[65%] rounded-full bg-white/60 mx-auto mb-[5px]" />

        <div className="h-px bg-white/25 mb-[4px]" />

        {/* About */}
        <div className="mb-[4px]">
          <div className="h-[2px] w-[55%] rounded-full bg-white/70 mb-[2.5px]" />
          <ThinBar w="w-full" /><div className="mt-[1px]"><div className="h-[1.5px] w-4/5 rounded-full bg-white/30" /></div>
          <div className="mt-[1px]"><div className="h-[1.5px] w-full rounded-full bg-white/30" /></div>
        </div>

        <div className="h-px bg-white/25 mb-[4px]" />

        {/* Contact */}
        <div className="mb-[4px]">
          <div className="h-[2px] w-[55%] rounded-full bg-white/70 mb-[2.5px]" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-[2px] mb-[2px]">
              <div className="w-[3px] h-[3px] rounded-sm bg-white/45" />
              <div className="h-[1.5px] rounded-full bg-white/35 flex-1" />
            </div>
          ))}
        </div>

        <div className="h-px bg-white/25 mb-[4px]" />

        {/* Skills */}
        <div>
          <div className="h-[2px] w-[45%] rounded-full bg-white/70 mb-[2.5px]" />
          {[85, 70, 90, 60, 75].map((pct, i) => (
            <div key={i} className="mb-[2.5px]">
              <div className="h-[2.5px] w-full rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white/75" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right main content */}
      <div className="flex-1 bg-white" style={{ padding: "8px 7px 6px" }}>
        {/* Experience */}
        <div className="mb-[4px]">
          <div className="flex items-center gap-[3px] mb-[3px]">
            <div className="h-[2.5px] w-[40%] rounded-full" style={{ backgroundColor: accent }} />
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          {[0, 1].map((j) => (
            <div key={j} className="mb-[4px] pl-[3px] border-l-[2px]" style={{ borderColor: accent + "55" }}>
              <div className="flex items-center justify-between mb-[1.5px]">
                <Bar w="w-[45%]" dark />
                <Bar w="w-[20%]" op={0.6} />
              </div>
              <Bar w="w-[32%]" op={0.6} />
              <div className="mt-[2px]">
                <Bullet accent={accent} w="w-full" />
                <Bullet accent={accent} w="w-5/6" />
                {j === 0 && <Bullet accent={accent} w="w-4/5" />}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-[4px]">
          <div className="flex items-center gap-[3px] mb-[3px]">
            <div className="h-[2.5px] w-[38%] rounded-full" style={{ backgroundColor: accent }} />
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="pl-[3px] border-l-[2px]" style={{ borderColor: accent + "55" }}>
            <Bar w="w-[50%]" dark />
            <div className="mt-[1.5px]"><Bar w="w-[35%]" op={0.6} /></div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center gap-[3px] mb-[3px]">
            <div className="h-[2.5px] w-[36%] rounded-full" style={{ backgroundColor: accent }} />
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <Bullet accent={accent} w="w-full" />
          <Bullet accent={accent} w="w-5/6" />
          <Bullet accent={accent} w="w-4/5" />
        </div>
      </div>
    </div>
  );
}

/* ─── CENTERED ────────────────────────────────────────────────────────────── */
function CenteredLayout({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col" style={{ padding: "7px 9px 5px" }}>
      {/* Top accent bar */}
      <div className="h-[4px] w-full rounded-sm mb-[5px]" style={{ backgroundColor: accent }} />

      {/* Centered header */}
      <div className="text-center mb-[4px]">
        <div className="h-[6px] w-[52%] rounded-full mx-auto mb-[2.5px] bg-slate-800" />
        <div className="h-[2.5px] w-[36%] rounded-full mx-auto mb-[3px]" style={{ backgroundColor: accent, opacity: 0.75 }} />
        <div className="flex items-center justify-center gap-[3px]">
          {[16, 20, 18, 14].map((w, i) => (
            <div key={i} className="flex items-center gap-[2px]">
              {i > 0 && <div className="w-[2px] h-[2px] rounded-full bg-slate-300" />}
              <div className="h-[1.5px] rounded-full bg-slate-300" style={{ width: `${w}px` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative centre divider */}
      <div className="flex items-center gap-[4px] mb-[4px]">
        <div className="h-px flex-1 bg-slate-200" />
        <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Summary */}
      <div className="mb-[4px]">
        <ThinBar w="w-full" />
        <div className="mt-[1.5px]"><ThinBar w="w-11/12" /></div>
        <div className="mt-[1.5px]"><ThinBar w="w-5/6" /></div>
      </div>

      {/* Experience */}
      <div className="mb-[4px]">
        <div className="text-center mb-[2px]">
          <div className="h-[2px] w-[28%] rounded-full mx-auto" style={{ backgroundColor: accent }} />
        </div>
        <div className="h-px w-full bg-slate-200 mb-[3px]" />
        <JobEntry accent={accent} title="w-[40%]" date="w-[20%]" company="w-[30%]" bullets={2} />
        <JobEntry accent={accent} title="w-[36%]" date="w-[18%]" company="w-[28%]" bullets={2} />
      </div>

      {/* Two-column footer */}
      <div className="flex gap-[6px]">
        <div className="flex-1">
          <div className="text-center mb-[2px]">
            <div className="h-[2px] w-[45%] rounded-full mx-auto" style={{ backgroundColor: accent }} />
          </div>
          <div className="h-px w-full bg-slate-200 mb-[2px]" />
          <Bar w="w-[48%]" dark />
          <div className="mt-[1px]"><Bar w="w-[36%]" op={0.6} /></div>
          <div className="mt-[2px]"><ThinBar w="w-full" /></div>
          <div className="mt-[1px]"><ThinBar w="w-4/5" /></div>
        </div>
        <div className="flex-1">
          <div className="text-center mb-[2px]">
            <div className="h-[2px] w-[38%] rounded-full mx-auto" style={{ backgroundColor: accent }} />
          </div>
          <div className="h-px w-full bg-slate-200 mb-[2px]" />
          <div className="flex flex-wrap gap-[2.5px] mt-[1px]">
            {[26, 20, 30, 24, 18, 28].map((w, i) => (
              <SkillPill key={i} accent={accent} w={w} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Router ──────────────────────────────────────────────────────────────── */
export function TemplatePreview({
  layout,
  accent,
}: {
  layout: TemplateLayout;
  accent: string;
}) {
  switch (layout) {
    case "classic":   return <ClassicLayout accent={accent} />;
    case "sidebar":   return <SidebarLayout accent={accent} />;
    case "executive": return <ExecutiveLayout accent={accent} />;
    case "minimal":   return <MinimalLayout accent={accent} />;
    case "creative":  return <CreativeLayout accent={accent} />;
    case "centered":  return <CenteredLayout accent={accent} />;
  }
}
