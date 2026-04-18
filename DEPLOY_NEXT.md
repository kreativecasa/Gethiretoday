# Deploy the UI overhaul (run when you wake up)

All code changes are saved to disk. The sandbox can't remove `.git/*.lock`,
so the final `git commit` + `git push` needs to run on your Mac.

## One-liner to ship everything

Open Terminal, cd to your repo, and run:

```bash
rm -f .git/*.lock && \
git add -A && \
git commit -m "UI overhaul: new templates, Word export, AI fix, example pages

- Fix AI: replace invalid 'claude-opus-4-5' model with haiku-4-5 in ai.ts,
  skills route, and cover-letter route (Generate with AI was 500'ing)
- Add 8 new pro resume templates (bold-header, split-right, timeline, mono,
  photo-card, compact, serif, split-accent) wired into builder [id] page
- Redesign template-preview.tsx: Rezi-inspired thumbnails with curated
  sample content fallback, 14 total layouts, consistent typography
- Add 'Download Word' button in resume builder, pro-gated, uses existing
  /api/resume/[id]/word endpoint
- Fix 'Use Template': now creates a resume with pre-filled starter data
  via POST /api/resume and routes directly to /builder/resume/[id]
- Resume example pages now render a full, styled resume at the top using
  the matching template before the tips section
- TEMPLATE_META extended across dashboard and resumes list pages

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>" && \
git push origin main
```

Vercel will auto-deploy after the push lands on `main`. Takes ~2-3 min.

## What shipped

**Fixes**
- Generate with AI (was failing on invalid model name `claude-opus-4-5`)
- Use Template (now opens a pre-filled builder instead of empty page)
- Resume example pages (now show a full rendered resume, not just tips)
- Thumbnails across dashboard, resumes list, templates page, examples page

**New features**
- Word (.doc) download button in the resume builder
- 8 new pro resume templates: Bold Impact, Corporate Right, Journey Timeline,
  Engineer Console (mono), Portfolio Card, Compact ATS, Elegant Serif,
  Aurora Split — total is now 14 unique layouts

**Design**
- Fresh template thumbnails inspired by Rezi.ai — curated sample content,
  consistent typography hierarchy, proper paper-like feel, restrained color

## Files changed

```
app/api/ai/cover-letter/route.ts           (model fix)
app/api/ai/skills/route.ts                 (model fix)
app/builder/resume/[id]/page.tsx           (Word button, 8 new templates wired)
app/builder/resume/new/page.tsx            (starter data on ?template=)
app/dashboard/page.tsx                     (TEMPLATE_META extended)
app/dashboard/resumes/page.tsx             (TEMPLATE_META extended)
app/resume-examples/[slug]/page.tsx        (full rendered resume at top)
components/resume-templates/pro-templates.tsx  [NEW — 8 templates]
components/template-preview.tsx            (Rezi-style redesign + 8 new layouts)
components/templates-view.tsx              (Use Template handler, new catalog)
lib/ai.ts                                  (model fix)
lib/example-to-resume.ts                   (getTemplateStarterData added)
```

## After deploy — quick verification

1. Visit https://gethiretoday.com/dashboard/templates
   → Thumbnails should look like polished mini-resumes (Rezi-style)
   → Hover a card → "Use Template" → should open builder with Pre-filled content

2. Visit any https://gethiretoday.com/resume-examples/software-engineer
   → Top section should show a full styled resume (not just a tiny gradient icon)

3. Open any resume in the builder
   → Should see both "Download Word" (pro) and "Download PDF" buttons in the header
   → Click "Generate with AI" on Summary section — should actually return text now

4. In builder template picker, you should see all 14 templates (6 + 8 new)
