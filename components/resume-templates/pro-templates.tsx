'use client';

/**
 * Eight additional pro-tier resume templates.
 * Each is a complete, full-page (A4) resume renderer.
 */

import { ResumeData } from '@/types';
import { formatDate } from '@/lib/utils';

interface Props {
  data: ResumeData;
  colorScheme?: string;
  fontSize?: 'small' | 'medium' | 'large';
}

const CS: Record<string, { accent: string; dark: string; soft: string }> = {
  blue:   { accent: '#1d4ed8', dark: '#1e3a8a', soft: '#dbeafe' },
  teal:   { accent: '#0d9488', dark: '#134e4a', soft: '#ccfbf1' },
  purple: { accent: '#7c3aed', dark: '#4c1d95', soft: '#ede9fe' },
  rose:   { accent: '#e11d48', dark: '#9f1239', soft: '#ffe4e6' },
  slate:  { accent: '#475569', dark: '#1e293b', soft: '#e2e8f0' },
};

const FS: Record<string, Record<string, string>> = {
  small:  { base: '12px', sm: '11px', xs: '10px', lg: '14px', xl: '17px', '2xl': '24px', name: '32px' },
  medium: { base: '13.5px', sm: '12.5px', xs: '11px', lg: '16px', xl: '19px', '2xl': '27px', name: '37px' },
  large:  { base: '15px', sm: '14px', xs: '12.5px', lg: '17.5px', xl: '21px', '2xl': '31px', name: '43px' },
};

function normalize(data: ResumeData) {
  return {
    contact: (data.contact ?? {}) as ResumeData['contact'],
    summary: data.summary ?? '',
    work_experience: data.work_experience ?? [],
    education: data.education ?? [],
    skills: data.skills ?? [],
    certifications: data.certifications ?? [],
    languages: data.languages ?? [],
    volunteer_work: data.volunteer_work ?? [],
    projects: data.projects ?? [],
    custom_sections: data.custom_sections ?? [],
  };
}

function contactLine(d: ReturnType<typeof normalize>): string[] {
  return [
    d.contact.email,
    d.contact.phone,
    d.contact.location,
    d.contact.linkedin,
    d.contact.website,
    d.contact.github,
  ].filter(Boolean) as string[];
}

function initialsOf(name: string) {
  return (name || '').split(/\s+/).map((n) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 1. BOLD HEADER
 * Dark full-bleed name band with accent underline. Bold typographic hero.
 * ═══════════════════════════════════════════════════════════════════════════ */
export function BoldHeaderTemplate({ data, colorScheme = 'teal', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.teal;
  const fs = FS[fontSize] ?? FS.medium;
  const d = normalize(data);

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, Arial, sans-serif', background: '#fff', color: '#111827', boxSizing: 'border-box' }}>
      {/* Dark hero */}
      <div style={{ background: '#0b1220', padding: '22mm 18mm 14mm', color: '#fff' }}>
        <div style={{ fontSize: fs.name, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
          {d.contact.full_name || 'Your Name'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
          <div style={{ width: '22px', height: '3px', background: c.accent }} />
          <div style={{ fontSize: fs.xl, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
            {d.work_experience[0]?.job_title || 'Your Role'}
          </div>
        </div>
        <div style={{ fontSize: fs.xs, color: 'rgba(255,255,255,0.65)', marginTop: '12px' }}>
          {contactLine(d).join('  ·  ')}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '10mm 18mm 16mm' }}>
        {d.summary && (
          <section style={{ marginBottom: '12px' }}>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.accent, margin: '0 0 6px' }}>Profile</h2>
            <p style={{ margin: 0, color: '#374151', lineHeight: 1.65, fontSize: fs.base }}>{d.summary}</p>
          </section>
        )}

        {d.work_experience.length > 0 && (
          <section style={{ marginBottom: '12px' }}>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.accent, margin: '0 0 8px' }}>Experience</h2>
            {d.work_experience.map((job, i) => (
              <div key={job.id} style={{ marginBottom: i < d.work_experience.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 700, fontSize: fs.lg }}>{job.job_title}</div>
                  <div style={{ fontSize: fs.xs, color: '#9ca3af' }}>{formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}</div>
                </div>
                <div style={{ color: c.accent, fontWeight: 600, fontSize: fs.sm, marginTop: '2px' }}>{job.company}{job.location ? ` · ${job.location}` : ''}</div>
                {job.achievements?.filter(Boolean).map((a, j) => (
                  <div key={j} style={{ display: 'flex', gap: '8px', marginTop: '3px', alignItems: 'flex-start' }}>
                    <span style={{ color: c.accent, fontWeight: 700, flexShrink: 0 }}>•</span>
                    <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.55 }}>{a}</span>
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {d.education.length > 0 && (
            <section>
              <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.accent, margin: '0 0 6px' }}>Education</h2>
              {d.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '7px' }}>
                  <div style={{ fontWeight: 700, fontSize: fs.base }}>{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}</div>
                  <div style={{ fontSize: fs.sm, color: c.accent }}>{edu.institution}</div>
                  <div style={{ fontSize: fs.xs, color: '#9ca3af' }}>{formatDate(edu.start_date)} – {edu.is_current ? 'Present' : formatDate(edu.end_date || '')}</div>
                </div>
              ))}
            </section>
          )}

          {d.skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.accent, margin: '0 0 6px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {d.skills.map((s) => (
                  <span key={s.id} style={{ fontSize: fs.xs, padding: '3px 9px', background: c.accent, color: '#fff', fontWeight: 600, borderRadius: '999px' }}>{s.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 2. SPLIT RIGHT
 * Right-side soft sidebar (mirrors the classic modern layout).
 * ═══════════════════════════════════════════════════════════════════════════ */
export function SplitRightTemplate({ data, colorScheme = 'blue', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.blue;
  const fs = FS[fontSize] ?? FS.medium;
  const d = normalize(data);

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, Arial, sans-serif', background: '#fff', color: '#111827', display: 'flex', boxSizing: 'border-box' }}>
      {/* Left main */}
      <div style={{ flex: 1, padding: '18mm 14mm 18mm 18mm' }}>
        <h1 style={{ fontSize: fs.name, fontWeight: 800, color: c.dark, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{d.contact.full_name || 'Your Name'}</h1>
        {d.work_experience[0]?.job_title && (
          <div style={{ fontSize: fs.xl, color: c.accent, fontWeight: 600, marginTop: '6px' }}>{d.work_experience[0].job_title}</div>
        )}
        <div style={{ height: '2px', width: '60px', background: c.accent, margin: '12px 0 14px' }} />

        {d.summary && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Summary</h2>
            <p style={{ margin: 0, lineHeight: 1.65, fontSize: fs.base, color: '#374151' }}>{d.summary}</p>
          </section>
        )}

        {d.work_experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 8px' }}>Experience</h2>
            {d.work_experience.map((job, i) => (
              <div key={job.id} style={{ marginBottom: i < d.work_experience.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 700, fontSize: fs.lg }}>{job.job_title}</div>
                  <div style={{ fontSize: fs.xs, color: '#9ca3af' }}>{formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}</div>
                </div>
                <div style={{ color: c.accent, fontWeight: 600, fontSize: fs.sm, marginTop: '2px' }}>{job.company}{job.location ? ` · ${job.location}` : ''}</div>
                {job.achievements?.filter(Boolean).map((a, j) => (
                  <div key={j} style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                    <span style={{ color: c.accent, fontWeight: 700 }}>•</span>
                    <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.55 }}>{a}</span>
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Right sidebar */}
      <div style={{ width: '32%', background: '#f8fafc', padding: '18mm 14mm', borderLeft: `1px solid #e2e8f0`, boxSizing: 'border-box' }}>
        <section style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Contact</h2>
          <div style={{ fontSize: fs.sm, lineHeight: 1.75, color: '#374151' }}>
            {contactLine(d).map((p, i) => <div key={i}>{p}</div>)}
          </div>
        </section>

        {d.skills.length > 0 && (
          <section style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {d.skills.map((s) => <div key={s.id} style={{ fontSize: fs.sm, color: '#374151' }}>{s.name}</div>)}
            </div>
          </section>
        )}

        {d.education.length > 0 && (
          <section>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Education</h2>
            {d.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: fs.sm }}>{edu.degree}</div>
                <div style={{ fontSize: fs.xs, color: '#6b7280' }}>{edu.institution}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 3. TIMELINE
 * Left vertical timeline rail with date markers.
 * ═══════════════════════════════════════════════════════════════════════════ */
export function TimelineTemplate({ data, colorScheme = 'purple', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.purple;
  const fs = FS[fontSize] ?? FS.medium;
  const d = normalize(data);

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, Arial, sans-serif', background: '#fff', color: '#111827', padding: '16mm 18mm 18mm', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '10px', borderBottom: `2px solid ${c.accent}`, marginBottom: '14px' }}>
        <div>
          <h1 style={{ fontSize: fs.name, fontWeight: 800, color: c.dark, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{d.contact.full_name || 'Your Name'}</h1>
          <div style={{ fontSize: fs.xl, color: c.accent, fontWeight: 600, marginTop: '6px' }}>{d.work_experience[0]?.job_title}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: fs.xs, color: '#6b7280', lineHeight: 1.7 }}>
          {contactLine(d).map((p, i) => <div key={i}>{p}</div>)}
        </div>
      </header>

      {d.summary && (
        <section style={{ marginBottom: '14px' }}>
          <p style={{ margin: 0, lineHeight: 1.65, fontSize: fs.base, color: '#374151' }}>{d.summary}</p>
        </section>
      )}

      {d.work_experience.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 10px' }}>Experience</h2>
          <div style={{ position: 'relative', paddingLeft: '22px' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '6px', width: '2px', background: c.accent, opacity: 0.35 }} />
            {d.work_experience.map((job, i) => (
              <div key={job.id} style={{ position: 'relative', marginBottom: i < d.work_experience.length - 1 ? '14px' : 0 }}>
                <div style={{ position: 'absolute', left: '-20px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: c.accent, border: '2px solid #fff', boxShadow: `0 0 0 2px ${c.accent}` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 700, fontSize: fs.lg }}>{job.job_title}</div>
                  <div style={{ fontSize: fs.xs, color: '#9ca3af', fontStyle: 'italic' }}>{formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}</div>
                </div>
                <div style={{ color: c.accent, fontWeight: 600, fontSize: fs.sm, marginTop: '2px' }}>{job.company}{job.location ? ` · ${job.location}` : ''}</div>
                {job.achievements?.filter(Boolean).map((a, j) => (
                  <div key={j} style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                    <span style={{ color: c.accent, fontWeight: 700 }}>—</span>
                    <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.55 }}>{a}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
        {d.education.length > 0 && (
          <section>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Education</h2>
            {d.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '6px' }}>
                <div style={{ fontWeight: 700, fontSize: fs.base }}>{edu.degree}</div>
                <div style={{ fontSize: fs.sm, color: c.accent }}>{edu.institution}</div>
              </div>
            ))}
          </section>
        )}
        {d.skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {d.skills.map((s) => (
                <span key={s.id} style={{ fontSize: fs.xs, padding: '3px 9px', color: c.dark, border: `1px solid ${c.accent}`, fontWeight: 600, borderRadius: '999px' }}>{s.name}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 4. MONO (tech/engineering monospace feel)
 * ═══════════════════════════════════════════════════════════════════════════ */
export function MonoTemplate({ data, colorScheme = 'teal', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.teal;
  const fs = FS[fontSize] ?? FS.medium;
  const d = normalize(data);
  const mono = '"JetBrains Mono","SF Mono",Menlo,Consolas,monospace';

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, Arial, sans-serif', background: '#fff', color: '#111827', padding: '18mm', boxSizing: 'border-box' }}>
      <header style={{ paddingBottom: '10px', borderBottom: `1px dashed ${c.accent}`, marginBottom: '14px' }}>
        <div style={{ fontFamily: mono, fontSize: fs.xs, color: c.accent, fontWeight: 600 }}>// curriculum-vitae</div>
        <h1 style={{ fontSize: fs.name, fontWeight: 800, color: c.dark, margin: '4px 0 4px', letterSpacing: '-0.02em', lineHeight: 1 }}>{d.contact.full_name || 'Your Name'}</h1>
        <div style={{ fontFamily: mono, fontSize: fs.sm, color: c.accent }}>
          {'>'} role: <span style={{ color: '#111827' }}>{d.work_experience[0]?.job_title || 'Engineer'}</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: fs.xs, color: '#6b7280', marginTop: '6px' }}>
          @ {contactLine(d).join('  ·  ')}
        </div>
      </header>

      {d.summary && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontFamily: mono, fontSize: fs.xs, color: c.accent, fontWeight: 700, letterSpacing: '0.05em', margin: '0 0 6px' }}>/* PROFILE */</h2>
          <p style={{ margin: 0, lineHeight: 1.65, fontSize: fs.base, color: '#374151' }}>{d.summary}</p>
        </section>
      )}

      {d.work_experience.length > 0 && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontFamily: mono, fontSize: fs.xs, color: c.accent, fontWeight: 700, letterSpacing: '0.05em', margin: '0 0 8px' }}>/* EXPERIENCE */</h2>
          {d.work_experience.map((job, i) => (
            <div key={job.id} style={{ marginBottom: i < d.work_experience.length - 1 ? '12px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: 700, fontSize: fs.lg }}>{job.job_title}</div>
                <div style={{ fontFamily: mono, fontSize: fs.xs, color: '#9ca3af' }}>{formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}</div>
              </div>
              <div style={{ color: c.accent, fontWeight: 600, fontSize: fs.sm, marginTop: '2px' }}>{job.company}{job.location ? ` · ${job.location}` : ''}</div>
              {job.achievements?.filter(Boolean).map((a, j) => (
                <div key={j} style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                  <span style={{ fontFamily: mono, color: c.accent, fontWeight: 700 }}>→</span>
                  <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.55 }}>{a}</span>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {d.skills.length > 0 && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontFamily: mono, fontSize: fs.xs, color: c.accent, fontWeight: 700, letterSpacing: '0.05em', margin: '0 0 6px' }}>/* STACK */</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontFamily: mono }}>
            {d.skills.map((s) => (
              <span key={s.id} style={{ fontSize: fs.xs, padding: '3px 8px', border: `1px solid ${c.accent}`, color: c.dark, borderRadius: '3px', fontWeight: 600 }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {d.education.length > 0 && (
        <section>
          <h2 style={{ fontFamily: mono, fontSize: fs.xs, color: c.accent, fontWeight: 700, letterSpacing: '0.05em', margin: '0 0 6px' }}>/* EDUCATION */</h2>
          {d.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <div style={{ fontWeight: 700, fontSize: fs.base }}>{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}</div>
              <div style={{ fontSize: fs.sm, color: c.accent }}>{edu.institution}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 5. PHOTO CARD
 * Large initials avatar card at top, clean layout below.
 * ═══════════════════════════════════════════════════════════════════════════ */
export function PhotoCardTemplate({ data, colorScheme = 'blue', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.blue;
  const fs = FS[fontSize] ?? FS.medium;
  const d = normalize(data);

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, Arial, sans-serif', background: '#fff', color: '#111827', boxSizing: 'border-box' }}>
      {/* Header card */}
      <div style={{ padding: '16mm 18mm 14mm', display: 'flex', alignItems: 'center', gap: '18px', borderBottom: `1px solid #e5e7eb` }}>
        {d.contact.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={d.contact.photo_url}
            alt={d.contact.full_name || 'Profile'}
            style={{ width: '90px', height: '90px', borderRadius: '16px', objectFit: 'cover', boxShadow: `0 8px 16px ${c.accent}30`, flexShrink: 0, display: 'block' }}
          />
        ) : (
          <div style={{ width: '90px', height: '90px', borderRadius: '16px', background: `linear-gradient(135deg, ${c.accent} 0%, ${c.dark} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '38px', fontWeight: 700, boxShadow: `0 8px 16px ${c.accent}30`, flexShrink: 0 }}>
            {initialsOf(d.contact.full_name || 'Your Name')}
          </div>
        )}
        <div>
          <h1 style={{ fontSize: fs.name, fontWeight: 800, color: c.dark, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{d.contact.full_name || 'Your Name'}</h1>
          <div style={{ fontSize: fs.xl, color: c.accent, fontWeight: 600, marginTop: '6px' }}>{d.work_experience[0]?.job_title}</div>
          <div style={{ fontSize: fs.xs, color: '#6b7280', marginTop: '8px' }}>{contactLine(d).join('  ·  ')}</div>
        </div>
      </div>

      <div style={{ padding: '12mm 18mm 16mm' }}>
        {d.summary && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>About</h2>
            <p style={{ margin: 0, lineHeight: 1.65, fontSize: fs.base, color: '#374151' }}>{d.summary}</p>
          </section>
        )}

        {d.work_experience.length > 0 && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 8px' }}>Experience</h2>
            {d.work_experience.map((job, i) => (
              <div key={job.id} style={{ marginBottom: i < d.work_experience.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 700, fontSize: fs.lg }}>{job.job_title}</div>
                  <div style={{ fontSize: fs.xs, color: '#9ca3af' }}>{formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}</div>
                </div>
                <div style={{ color: c.accent, fontWeight: 600, fontSize: fs.sm, marginTop: '2px' }}>{job.company}</div>
                {job.achievements?.filter(Boolean).map((a, j) => (
                  <div key={j} style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                    <span style={{ color: c.accent, fontWeight: 700 }}>•</span>
                    <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.55 }}>{a}</span>
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {d.education.length > 0 && (
            <section>
              <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Education</h2>
              {d.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '7px' }}>
                  <div style={{ fontWeight: 700, fontSize: fs.base }}>{edu.degree}</div>
                  <div style={{ fontSize: fs.sm, color: c.accent }}>{edu.institution}</div>
                </div>
              ))}
            </section>
          )}
          {d.skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {d.skills.map((s) => (
                  <span key={s.id} style={{ fontSize: fs.xs, padding: '3px 9px', background: c.soft, color: c.dark, fontWeight: 600, borderRadius: '999px' }}>{s.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 6. COMPACT (ultra-dense ATS-friendly)
 * ═══════════════════════════════════════════════════════════════════════════ */
export function CompactTemplate({ data, colorScheme = 'slate', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.slate;
  const fs = FS[fontSize] ?? FS.medium;
  const d = normalize(data);

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, Arial, sans-serif', background: '#fff', color: '#111827', padding: '14mm 18mm 14mm', boxSizing: 'border-box', lineHeight: 1.45 }}>
      <header style={{ marginBottom: '8px' }}>
        <h1 style={{ fontSize: fs.name, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em', lineHeight: 1 }}>{d.contact.full_name || 'Your Name'}</h1>
        <div style={{ fontSize: fs.lg, color: '#334155', fontWeight: 500, marginTop: '3px' }}>{d.work_experience[0]?.job_title}</div>
        <div style={{ fontSize: fs.xs, color: '#6b7280', marginTop: '4px' }}>{contactLine(d).join('  |  ')}</div>
      </header>

      <div style={{ height: '1.5px', background: '#0f172a', marginBottom: '10px' }} />

      {d.summary && (
        <section style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0f172a', margin: '0 0 4px' }}>Summary</h2>
          <p style={{ margin: 0, fontSize: fs.base, color: '#374151' }}>{d.summary}</p>
        </section>
      )}

      {d.work_experience.length > 0 && (
        <section style={{ marginBottom: '10px' }}>
          <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0f172a', margin: '0 0 6px' }}>Experience</h2>
          {d.work_experience.map((job, i) => (
            <div key={job.id} style={{ marginBottom: i < d.work_experience.length - 1 ? '8px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: fs.sm }}>
                  <strong style={{ fontWeight: 700, color: '#0f172a' }}>{job.job_title}</strong>
                  <span style={{ color: '#475569' }}>, {job.company}{job.location ? ` · ${job.location}` : ''}</span>
                </div>
                <div style={{ fontSize: fs.xs, color: '#9ca3af' }}>{formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}</div>
              </div>
              {job.achievements?.filter(Boolean).map((a, j) => (
                <div key={j} style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                  <span style={{ color: c.accent, fontWeight: 700 }}>•</span>
                  <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.45 }}>{a}</span>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '18px' }}>
        {d.education.length > 0 && (
          <section>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0f172a', margin: '0 0 4px' }}>Education</h2>
            {d.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '5px', fontSize: fs.sm }}>
                <strong>{edu.degree}</strong>, <span style={{ color: '#475569' }}>{edu.institution}</span>
              </div>
            ))}
          </section>
        )}
        {d.skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0f172a', margin: '0 0 4px' }}>Skills</h2>
            <div style={{ fontSize: fs.sm, color: '#374151' }}>{d.skills.map((s) => s.name).join(' · ')}</div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 7. SERIF (elegant/academic)
 * ═══════════════════════════════════════════════════════════════════════════ */
export function SerifTemplate({ data, colorScheme = 'slate', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.slate;
  const fs = FS[fontSize] ?? FS.medium;
  const d = normalize(data);
  const serif = '"Playfair Display","Cormorant Garamond","Georgia",serif';

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Georgia, serif', background: '#fff', color: '#1f2937', padding: '18mm 20mm', boxSizing: 'border-box' }}>
      <header style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h1 style={{ fontFamily: serif, fontSize: fs.name, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.01em', lineHeight: 1 }}>{d.contact.full_name || 'Your Name'}</h1>
        <div style={{ fontSize: fs.xl, color: '#6b7280', fontWeight: 400, letterSpacing: '0.1em', marginTop: '6px', textTransform: 'uppercase' }}>{d.work_experience[0]?.job_title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '12px' }}>
          <div style={{ height: '1px', width: '50px', background: '#9ca3af' }} />
          <div style={{ color: c.accent, fontSize: '10px' }}>◆</div>
          <div style={{ height: '1px', width: '50px', background: '#9ca3af' }} />
        </div>
        <div style={{ fontSize: fs.sm, color: '#6b7280', marginTop: '10px' }}>{contactLine(d).join('  ·  ')}</div>
      </header>

      {d.summary && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: fs.lg, color: c.accent, fontWeight: 600, margin: '0 0 6px' }}>Summary</h2>
          <p style={{ margin: 0, lineHeight: 1.7, fontSize: fs.base, color: '#374151' }}>{d.summary}</p>
        </section>
      )}

      {d.work_experience.length > 0 && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: fs.lg, color: c.accent, fontWeight: 600, margin: '0 0 8px' }}>Experience</h2>
          {d.work_experience.map((job, i) => (
            <div key={job.id} style={{ marginBottom: i < d.work_experience.length - 1 ? '12px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: serif, fontWeight: 700, fontSize: fs.lg }}>{job.job_title}</div>
                <div style={{ fontStyle: 'italic', fontSize: fs.xs, color: '#9ca3af' }}>{formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}</div>
              </div>
              <div style={{ fontStyle: 'italic', color: '#4b5563', fontSize: fs.sm, marginTop: '2px' }}>{job.company}{job.location ? ` · ${job.location}` : ''}</div>
              {job.achievements?.filter(Boolean).map((a, j) => (
                <div key={j} style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                  <span style={{ color: c.accent, fontWeight: 700 }}>—</span>
                  <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.6 }}>{a}</span>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {d.education.length > 0 && (
        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: fs.lg, color: c.accent, fontWeight: 600, margin: '0 0 6px' }}>Education</h2>
          {d.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <div style={{ fontFamily: serif, fontWeight: 700, fontSize: fs.base }}>{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}</div>
              <div style={{ fontStyle: 'italic', fontSize: fs.sm, color: '#6b7280' }}>{edu.institution}</div>
            </div>
          ))}
        </section>
      )}

      {d.skills.length > 0 && (
        <section>
          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: fs.lg, color: c.accent, fontWeight: 600, margin: '0 0 6px' }}>Skills</h2>
          <div style={{ textAlign: 'center', fontStyle: 'italic', fontSize: fs.sm, color: '#374151', lineHeight: 1.7 }}>{d.skills.map((s) => s.name).join(' · ')}</div>
        </section>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 8. SPLIT ACCENT (top-third accent gradient with floating initials)
 * ═══════════════════════════════════════════════════════════════════════════ */
export function SplitAccentTemplate({ data, colorScheme = 'purple', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.purple;
  const fs = FS[fontSize] ?? FS.medium;
  const d = normalize(data);

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Inter, Arial, sans-serif', background: '#fff', color: '#111827', boxSizing: 'border-box', position: 'relative' }}>
      {/* Top accent band */}
      <div style={{ background: `linear-gradient(135deg, ${c.accent} 0%, ${c.dark} 100%)`, padding: '18mm 18mm 34mm', color: '#fff', position: 'relative' }}>
        <h1 style={{ fontSize: fs.name, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{d.contact.full_name || 'Your Name'}</h1>
        <div style={{ fontSize: fs.xl, color: 'rgba(255,255,255,0.88)', fontWeight: 500, marginTop: '6px' }}>{d.work_experience[0]?.job_title}</div>
        {/* Floating initials */}
        <div style={{ position: 'absolute', right: '18mm', top: '18mm', width: '72px', height: '72px', borderRadius: '16px', background: 'rgba(255,255,255,0.95)', color: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, boxShadow: '0 6px 16px rgba(0,0,0,0.18)' }}>
          {initialsOf(d.contact.full_name || 'Your Name')}
        </div>
      </div>

      {/* Contact card */}
      <div style={{ margin: '-22mm 18mm 8mm', padding: '10px 18px', background: '#fff', borderRadius: '14px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', textAlign: 'center', fontSize: fs.xs, color: '#6b7280' }}>
        {contactLine(d).join('  ·  ')}
      </div>

      <div style={{ padding: '4mm 18mm 16mm' }}>
        {d.summary && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Summary</h2>
            <p style={{ margin: 0, lineHeight: 1.65, fontSize: fs.base, color: '#374151' }}>{d.summary}</p>
          </section>
        )}

        {d.work_experience.length > 0 && (
          <section style={{ marginBottom: '14px' }}>
            <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 8px' }}>Experience</h2>
            {d.work_experience.map((job, i) => (
              <div key={job.id} style={{ marginBottom: i < d.work_experience.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 700, fontSize: fs.lg }}>{job.job_title}</div>
                  <div style={{ fontSize: fs.xs, color: '#9ca3af' }}>{formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}</div>
                </div>
                <div style={{ color: c.accent, fontWeight: 600, fontSize: fs.sm, marginTop: '2px' }}>{job.company}{job.location ? ` · ${job.location}` : ''}</div>
                {job.achievements?.filter(Boolean).map((a, j) => (
                  <div key={j} style={{ display: 'flex', gap: '8px', marginTop: '3px' }}>
                    <span style={{ color: c.accent, fontWeight: 700 }}>•</span>
                    <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.55 }}>{a}</span>
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {d.education.length > 0 && (
            <section>
              <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Education</h2>
              {d.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: fs.base }}>{edu.degree}</div>
                  <div style={{ fontSize: fs.sm, color: c.accent }}>{edu.institution}</div>
                </div>
              ))}
            </section>
          )}
          {d.skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: fs.xs, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: c.dark, margin: '0 0 6px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {d.skills.map((s) => (
                  <span key={s.id} style={{ fontSize: fs.xs, padding: '3px 9px', background: c.soft, color: c.dark, fontWeight: 600, borderRadius: '999px' }}>{s.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
