# Computer Algorithms (506994-002)

Markdown-driven web slides for Computer Algorithms, DEU 2026-2, built
with [Marp](https://marp.app/), themed with the department's DEU
visual identity (`themes/algorithms.css`). Deployed via GitHub Pages,
see `.github/workflows/pages.yml`.

Read `SPINE.md` first: it defines the mandatory pedagogical structure
every week's deck must follow (motivation before definition, weeks
chained via a Limits → Pain handoff, all worked examples tied to the
running **CampusNav** case study). Deck content should never drift
from that document without updating it too. `OUTLINE.md` has the full
15-week plan and chain table.

## Layout

```
SPINE.md                  standard structure, read this first
OUTLINE.md                 15-week plan + Limits -> Pain chain
themes/algorithms.css      Marp theme, DEU visual identity
assets/deu-logo.png         university logo
assets/syllabus.pdf         official course syllabus, source of record
slides/
  _template/week-XX.md      copy this to start a new week
  _shared/roadmap.md        Act-0 roadmap table, paste into slot 2
  _shared/case-study.md     running CampusNav case study
  week01-introduction.md
  ...week15-final-review.md
materials/week01/            course handbook (handout only - Week 1 is presentation-only)
materials/assignments/       the 4 graded assignment specs + rubrics (weeks 3/6/10/13)
```

## Setup

Requires Node.js (v20+). First run installs marp-cli into
`node_modules` via `npx`. No separate `npm install` step needed,
though running it once will make subsequent commands faster.

```bash
npx @marp-team/marp-cli --version   # confirms marp-cli resolves
```

## Preview in a browser (live reload)

```bash
npx @marp-team/marp-cli -s slides --theme-set themes/algorithms.css
```

Opens a local server (default http://localhost:8080) listing every
`.md` file in `slides/`; click `week01-introduction.md`.

**Note:** this only serves `slides/`, so a deck's Worksheet/Quiz/Handout
hand-off links (which point at `materials/weekNN/*.html`) will 404 here -
those files don't exist until `make materials` builds them. Use it while
actively editing slide content; use **Full local preview** below to check
that materials links actually resolve.

## Full local preview (with materials)

```bash
make serve
```

Builds the full static site - decks as HTML, `materials/**/*.md` built to
HTML, `assets/` and `index.html` copied in - into `dist/`, the same steps
`.github/workflows/pages.yml` runs on deploy, then serves it at
http://localhost:8080 with `python3 -m http.server`. No live reload (re-run
`make serve` after edits), but every link - deck → worksheet/quiz/handout,
materials → back-to-slides/home, the assignments index - resolves exactly
as it will on the deployed site. Run `make site` alone to just build
`dist/` without serving it.

## Zero-install alternative: VS Code

Install the **Marp for VS Code** extension, open any `slides/*.md` file,
and use the built-in preview pane. To pick up the custom theme, add to
VS Code settings:

```json
"markdown.marp.themes": ["./themes/algorithms.css"]
```

## Export

```bash
npm run build:html   # → dist/*.html, self-contained, open directly in a browser
npm run build:pdf     # → dist/*.pdf
npm run build:pptx    # → dist/*.pptx
npm run build:materials  # → dist/materials/**, handouts/worksheets/quizzes as HTML
```

## Adding a new week

1. Copy `slides/_template/week-XX.md` → `slides/weekNN-topic.md`, fill
   in all 17 spine slots (see `SPINE.md`).
2. Paste the current table from `slides/_shared/roadmap.md` into slot 2,
   bold the new current week's row.
3. If the week advances a CampusNav feature, update
   `slides/_shared/case-study.md` and reflect the change in that
   week's worked-example slide.
4. Add `materials/weekNN/{handout,worksheet,quiz}.md` (skip for the
   Week 8/15 review decks, which have no separate materials; Week 1
   ships handout only - no in-class worksheet/quiz, presentation-only).
5. Preview, check against `SPINE.md`'s hard rule: no formal definition
   before slot 8.
6. Add the week to `index.html`'s list.

## Deployment

Push to `main`; `.github/workflows/pages.yml` builds `slides/*.md` and
`materials/**/*.md` to static HTML and deploys to GitHub Pages. Enable
Pages with source "GitHub Actions" in the repo settings once, first
push.
