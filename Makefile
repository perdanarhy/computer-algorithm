MARP    := npx --yes @marp-team/marp-cli@^4.0.1
THEME   := themes/algorithms.css
SLIDES  := slides
OUT     := dist

.PHONY: all pdf html pptx materials assets site serve preview clean

all: pdf materials assets

## Render every deck in slides/ to PDF, one file per week, in dist/.
pdf:
	$(MARP) -I $(SLIDES) --theme-set $(THEME) --html --pdf --allow-local-files -o $(OUT)

## Render every deck in slides/ to self-contained HTML, in dist/.
html:
	$(MARP) -I $(SLIDES) --theme-set $(THEME) --html --allow-local-files -o $(OUT)

## Render every deck in slides/ to PowerPoint, in dist/.
pptx:
	$(MARP) -I $(SLIDES) --theme-set $(THEME) --html --pptx --allow-local-files -o $(OUT)

## Build materials/**/*.md (handouts, worksheets, quizzes, assignments) to dist/materials/.
materials:
	node scripts/build-materials.js $(OUT)

## Copy static assets (logo, syllabus PDF) and the course homepage into dist/,
## matching what .github/workflows/pages.yml does on deploy.
assets:
	mkdir -p $(OUT)
	cp -r assets $(OUT)/assets
	cp index.html $(OUT)/index.html

## Full static site: decks + materials + assets, in dist/ - the same
## steps .github/workflows/pages.yml runs on deploy. Every cross-link
## (deck -> worksheet/quiz, materials -> back-to-slides, index.html)
## resolves correctly here, unlike `make preview`.
site: html materials assets

## Serve dist/ (built via `site`) at http://localhost:8080 - for
## clicking through the whole site with working links. No live reload;
## use `make preview` instead while actively editing slide content.
serve: site
	@echo "Serving dist/ at http://localhost:8080 (Ctrl+C to stop)"
	cd $(OUT) && python3 -m http.server 8080

## Live-reload preview server for slides/*.md at http://localhost:8080.
## Only serves slides/ - hand-off links to materials/ (worksheet, quiz,
## handout) will 404 here since materials/*.html doesn't exist until
## `make materials` builds it. Use `make serve` to check those links.
preview:
	$(MARP) -s $(SLIDES) --theme-set $(THEME)

clean:
	rm -rf $(OUT)
