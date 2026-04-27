'use client';

import React from 'react';
import { ResumeData } from '@/types';
import { formatDate } from '@/lib/utils';

interface Props { data: ResumeData; colorScheme?: string; fontSize?: 'small' | 'medium' | 'large'; }

const CS: Record<string, { p: string; light: string }> = {
  teal:   { p: '#0d9488', light: '#f0fdfa' },
  blue:   { p: '#2563eb', light: '#eff6ff' },
  slate:  { p: '#475569', light: '#f8fafc' },
  purple: { p: '#7c3aed', light: '#faf5ff' },
  rose:   { p: '#e11d48', light: '#fff1f2' },
};
const FS: Record<string, Record<string, string>> = {
  small:  { base: '12px', sm: '11px', xs: '10px', lg: '14px', xl: '17px', '2xl': '24px' },
  medium: { base: '13.5px', sm: '12.5px', xs: '11px', lg: '16px', xl: '20px', '2xl': '29px' },
  large:  { base: '15px', sm: '14px', xs: '12.5px', lg: '18px', xl: '22px', '2xl': '33px' },
};

export default function ClassicTemplate({ data, colorScheme = 'teal', fontSize = 'medium' }: Props) {
  const c = CS[colorScheme] ?? CS.teal;
  const fs = FS[fontSize] ?? FS.medium;
  const d = { contact: (data.contact ?? {}) as ResumeData['contact'], work_experience: data.work_experience ?? [], education: data.education ?? [], skills: data.skills ?? [], certifications: data.certifications ?? [], languages: data.languages ?? [], volunteer_work: data.volunteer_work ?? [], projects: data.projects ?? [], custom_sections: data.custom_sections ?? [], summary: data.summary ?? '' };

  const contactLine: string[] = [];
  if (d.contact.email)    contactLine.push(d.contact.email);
  if (d.contact.phone)    contactLine.push(d.contact.phone);
  if (d.contact.location) contactLine.push(d.contact.location);
  if (d.contact.linkedin) contactLine.push(d.contact.linkedin);
  if (d.contact.website)  contactLine.push(d.contact.website);
  if (d.contact.github)   contactLine.push(d.contact.github);

  const Sec = ({ title }: { title: string }) => (
    <div style={{ margin: '14px 0 7px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '4px', height: '16px', background: c.p, borderRadius: '2px', flexShrink: 0 }} />
      <span style={{ fontSize: fs.xs, fontWeight: 800, color: '#374151', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontFamily: 'Arial, sans-serif' }}>{title}</span>
      <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
    </div>
  );

  return (
    <div id="resume-preview" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: fs.base, lineHeight: 1.55, color: '#1f2937', background: '#fff', boxSizing: 'border-box' as const }}>
      {/* Top accent bar */}
      <div style={{ height: '5px', background: `linear-gradient(90deg, ${c.p}, ${c.p}99)` }} />

      {/* Header */}
      <div style={{ padding: '14mm 18mm 10mm', borderBottom: `2px solid ${c.p}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: fs['2xl'], fontWeight: 800, color: '#111827', margin: '0 0 3px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              {d.contact.full_name || 'Your Name'}
            </h1>
            {d.work_experience[0]?.job_title && (
              <div style={{ fontSize: fs.lg, color: c.p, fontWeight: 600, marginBottom: '4px' }}>{d.work_experience[0].job_title}</div>
            )}
          </div>
          {contactLine.length > 0 && (
            <div style={{ fontSize: fs.xs, color: '#4b5563', textAlign: 'right' as const, lineHeight: 1.8, flexShrink: 0 }}>
              {contactLine.map((item, i) => <div key={i}>{item}</div>)}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '4mm 18mm 16mm' }}>
        {d.summary && (
          <>
            <Sec title="Professional Summary" />
            <p style={{ margin: 0, color: '#374151', lineHeight: 1.7, fontSize: fs.base }}>{d.summary}</p>
          </>
        )}

        {d.work_experience.length > 0 && (
          <>
            <Sec title="Work Experience" />
            {d.work_experience.map((job, i) => (
              <div key={job.id} style={{ marginBottom: i < d.work_experience.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: fs.lg, color: '#111827' }}>{job.job_title || 'Job Title'}</div>
                    <div style={{ color: c.p, fontWeight: 600, fontSize: fs.base }}>{job.company}{job.location ? ` · ${job.location}` : ''}</div>
                  </div>
                  <div style={{ fontSize: fs.xs, color: '#9ca3af', whiteSpace: 'nowrap' as const, marginLeft: '12px', paddingTop: '2px' }}>
                    {formatDate(job.start_date)} – {job.is_current ? 'Present' : formatDate(job.end_date || '')}
                  </div>
                </div>
                {job.description && <p style={{ margin: '3px 0 2px', color: '#4b5563', lineHeight: 1.5, fontSize: fs.sm }}>{job.description}</p>}
                {job.achievements?.filter(Boolean).map((a, j) => (
                  <div key={j} style={{ display: 'flex', gap: '7px', marginTop: '2px' }}>
                    <span style={{ color: c.p, fontWeight: 700, flexShrink: 0 }}>·</span>
                    <span style={{ fontSize: fs.sm, color: '#374151', lineHeight: 1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {d.education.length > 0 && (
          <>
            <Sec title="Education" />
            {d.education.map((edu, i) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < d.education.length - 1 ? '8px' : 0 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: fs.lg, color: '#111827' }}>{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}</div>
                  <div style={{ color: c.p, fontWeight: 600, fontSize: fs.sm }}>{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</div>
                  {edu.gpa && <div style={{ color: '#6b7280', fontSize: fs.xs }}>GPA: {edu.gpa}</div>}
                </div>
                <div style={{ fontSize: fs.xs, color: '#9ca3af', whiteSpace: 'nowrap' as const }}>
                  {formatDate(edu.start_date)} – {edu.is_current ? 'Present' : formatDate(edu.end_date || '')}
                </div>
              </div>
            ))}
          </>
        )}

        {d.skills.length > 0 && (
          <>
            <Sec title="Skills" />
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
              {d.skills?.map((s) => (
                <span key={s.id} style={{ fontSize: fs.xs, padding: '4px 11px', borderRadius: '20px', background: c.light, color: c.p, fontWeight: 600, border: `1px solid ${c.p}30` }}>{s.name}</span>
              ))}
            </div>
          </>
        )}

        {d.certifications.length > 0 && (
          <>
            <Sec title="Certifications" />
            {d.certifications.map((cert, i) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < d.certifications.length - 1 ? '4px' : 0 }}>
                <span style={{ fontWeight: 600, fontSize: fs.sm, color: '#111827' }}>{cert.name}</span>
                {cert.issuer && <span style={{ fontSize: fs.xs, color: '#9ca3af' }}>{cert.issuer}</span>}
              </div>
            ))}
          </>
        )}

        {d.languages.length > 0 && (
          <>
            <Sec title="Languages" />
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px' }}>
              {d.languages.map((l) => (
                <span key={l.id} style={{ fontSize: fs.sm }}><strong style={{ color: '#111827' }}>{l.name}</strong>{l.proficiency ? <span style={{ color: '#9ca3af' }}> — {l.proficiency}</span> : ''}</span>
              ))}
            </div>
          </>
        )}

        {d.projects.length > 0 && (
          <>
            <Sec title="Projects" />
            {d.projects.map((p, i) => (
              <div key={p.id} style={{ marginBottom: i < d.projects.length - 1 ? '8px' : 0 }}>
                <div style={{ fontWeight: 700, fontSize: fs.base, color: '#111827' }}>{p.name}</div>
                {p.description && <div style={{ fontSize: fs.sm, color: '#374151', marginTop: '2px' }}>{p.description}</div>}
              </div>
            ))}
          </>
        )}

        {d.volunteer_work.length > 0 && (
          <>
            <Sec title="Volunteer Work" />
            {d.volunteer_work.map((vol, i) => (
              <div key={vol.id} style={{ marginBottom: i < d.volunteer_work.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: fs.lg, color: '#111827' }}>{vol.role || 'Role'}</div>
                    <div style={{ color: c.p, fontWeight: 600, fontSize: fs.base }}>{vol.organization}</div>
                  </div>
                  <div style={{ fontSize: fs.xs, color: '#9ca3af', whiteSpace: 'nowrap' as const, marginLeft: '12px' }}>
                    {vol.start_date} – {vol.is_current ? 'Present' : (vol.end_date || '')}
                  </div>
                </div>
                {vol.description && <p style={{ margin: '3px 0 0', color: '#4b5563', lineHeight: 1.5, fontSize: fs.sm }}>{vol.description}</p>}
              </div>
            ))}
          </>
        )}

        {(d.custom_sections ?? []).map((section) => (
          section.items?.length > 0 && (
            <React.Fragment key={section.id}>
              <Sec title={section.title || 'Custom Section'} />
              {section.items.map((item, i) => (
                <div key={item.id} style={{ marginBottom: i < section.items.length - 1 ? '10px' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 700, fontSize: fs.base, color: '#111827' }}>{item.title}</div>
                    {item.date && <div style={{ fontSize: fs.xs, color: '#9ca3af', marginLeft: '12px', whiteSpace: 'nowrap' as const }}>{item.date}</div>}
                  </div>
                  {item.subtitle && <div style={{ color: c.p, fontWeight: 600, fontSize: fs.sm }}>{item.subtitle}</div>}
                  {item.description && <p style={{ margin: '2px 0 0', color: '#4b5563', fontSize: fs.sm, lineHeight: 1.5 }}>{item.description}</p>}
                </div>
              ))}
            </React.Fragment>
          )
        ))}
      </div>
    </div>
  );
}
