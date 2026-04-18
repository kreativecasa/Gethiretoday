# One more push — fix missing download button

The 14 template pills were overflowing the builder header and pushing the
Download PDF / Download Word buttons off-screen. Changed the template picker
to a compact dropdown so everything fits.

```bash
find .git -name "*.lock" -delete && \
git add -A && \
git commit -m "Fix: replace 14 template pills with dropdown so Download PDF/Word buttons stay visible" && \
git push origin main
```

## What this does

- Template picker in the builder header is now a single dropdown (was 14
  inline pills — too wide once we added the 8 new templates).
- Frees up ~500px of header width, so Save, Tips, Download Word, and
  Download PDF buttons are all visible again.

No other changes in this push.
