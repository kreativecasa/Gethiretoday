# Deploy — builder bug sweep: photo sync, AI suggestions, responsive Skills

```bash
find .git -name "*.lock" -delete && \
git add -A && \
git commit -m "Builder: sync photo field with template, popular-role AI seeds, responsive Skills/Summary" && \
git push origin main
```

## What this ships

### 1. Left panel now syncs with the template (photo)
- Added a `PHOTO_TEMPLATES` list (`modern`, `photo-card`) — the only templates with a visible photo slot.
- **Contact editor** now only shows the Profile Photo upload block when the selected template actually renders a photo.
- When the user switches to a template without a photo slot and a photo is already uploaded, the editor shows a small amber note: *"The {template} template doesn't display a profile photo. Your uploaded photo is saved — switch to Modern or Photo Card to show it."* Photo data is preserved, so switching back restores it.
- **Modern template**: the sidebar avatar now renders the real uploaded photo (round, object-cover) when `photo_url` is set, otherwise falls back to the initial letter.
- **PhotoCard template**: the header 90×90 tile now renders the real uploaded photo (rounded-xl, object-cover) when `photo_url` is set, otherwise falls back to the initials gradient.

### 2. AI suggestions — works across every section, even from scratch
- `SuggestionPanel` previously showed only a cryptic "Enter a job title" message when no experience was filled in. Now, when the user lands on **Summary** or **Skills** (or any section) with no job title yet, the panel shows a row of 8 **Popular Titles** — Software Engineer, Product Manager, Marketing Manager, Data Analyst, Customer Success, Sales Representative, Graphic Designer, Project Manager. Click any chip → search auto-fills and AI suggestions load immediately.
- When the user clears the job title, stale suggestions now clear too (no leftover bullets from a previous title).
- Hardened `/api/ai/suggestions`: now returns a clear 503 "AI is temporarily unavailable" if `ANTHROPIC_API_KEY` is missing instead of a generic 500, and safely handles empty `message.content` responses.

### 3. Responsive Skills / Summary / Experience grids
- The 2-column grid in Summary, Experience bullets, and Skills was flipping on at `lg` (1024px), but the builder left panel is only 44% of viewport — at 1024px that's a 450px panel split into two ~210px columns, which overlapped the skill pills, Level dropdowns, and suggestion cards.
- Bumped all three from `lg:grid-cols-2` → `2xl:grid-cols-2`. Now columns only split when the viewport is ≥1536px (left panel ≈676px). At any narrower width they stack cleanly.

## Files changed

```
app/builder/resume/[id]/page.tsx              PHOTO_TEMPLATES const, conditional photo block in Contact editor, 2xl breakpoint on the 3 grids
app/api/ai/suggestions/route.ts               503 on missing key, null-safe content access
components/suggestion-panel.tsx               Popular-titles seed chips, auto-clear stale suggestions when title cleared
components/resume-templates/modern.tsx        Avatar renders real photo_url if present
components/resume-templates/pro-templates.tsx PhotoCard header tile renders real photo_url if present
```
