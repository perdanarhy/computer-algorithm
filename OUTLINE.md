# Outline: Computer Algorithms (506994-002)

DEU 2026-2, Mon, periods 1-3 (3×50 min), 성파 703, 3rd-year, Dept. of
Intelligent Computing. Instructor: Ridho Hendra, Ph.D (Assistant
Professor). Primary text: Cormen, Leiserson, Rivest, Stein,
*Introduction to Algorithms*, MIT Press, 2022 ("CLRS"). Secondary:
Kleinberg & Tardos, *Algorithm Design*, Pearson, 2005; Sedgewick,
*Algorithms*, Addison-Wesley, 2011.

Full pedagogical rules (chain-linking, slot structure) live in
`SPINE.md`; this file is the flat semester-level view.

| Wk | Topic | Deck | Format |
|---|---|---|---|
| 1 | Introduction | `slides/week01-introduction.md` | Orientation - course contract |
| 2 | Algorithm Concepts | `slides/week02-algorithm-concepts.md` | Full |
| 3 | Complexity Analysis | `slides/week03-complexity-analysis.md` | Full - Assignment 1 released |
| 4 | Recursion & Recurrence | `slides/week04-recursion-recurrence.md` | Full |
| 5 | Basic Sorting | `slides/week05-basic-sorting.md` | Full - Assignment 1 due |
| 6 | Advanced Sorting | `slides/week06-advanced-sorting.md` | Full - Assignment 2 released |
| 7 | Searching | `slides/week07-searching.md` | Full - midterm review blueprint |
| 8 | Midterm (Wk 1-7) | `slides/week08-midterm-review.md` | Short review |
| 9 | Divide and Conquer | `slides/week09-divide-and-conquer.md` | Full |
| 10 | Greedy Algorithms | `slides/week10-greedy-algorithms.md` | Full - Assignment 3 released |
| 11 | Dynamic Programming I | `slides/week11-dynamic-programming-1.md` | Full - Assignment 2 due |
| 12 | Dynamic Programming II (LCS) | `slides/week12-dynamic-programming-2.md` | Full - Assignment 3 due |
| 13 | Graph Representation | `slides/week13-graph-representation.md` | Full - Assignment 4 released |
| 14 | Shortest Path | `slides/week14-shortest-path.md` | Full - final review blueprint |
| 15 | Final Exam (Wk 9-14) | `slides/week15-final-review.md` | Short review |

## Chain (Limits → Pain), see SPINE.md for full text

(1 orientation) → 2 → 3 → 4 → 5 → 6 → 7 → (8 review) → 9 → 10 → 11 → 12 →
13 → 14 → (15 review). Week 1 is course contract only, no technical
content. Weeks 2-7 build the toolkit every later week assumes:
correctness/complexity vocabulary (2-3), recursion (4), and the two
classic building blocks, sorting and searching (5-7) - all examined
through CampusNav's directory/lookup features. Weeks 9-14 are the
four general design paradigms (D&C, greedy, DP ×2) plus graphs,
applied to CampusNav's scheduling, tour-planning, matching, and
navigation features in that order.

## Running case study

**CampusNav** - a running case study: a fictional campus wayfinding &
scheduling app whose features supply the worked example for each
week's technique. Full state-by-week detail in
`slides/_shared/case-study.md`. Snapshot: room-directory lookup
(Weeks 1-7) → tour-time recursion / free-block D&C (Weeks 4, 9) →
room-booking greedy scheduler / campus-points coin problem (Week 10)
→ Tour Planner knapsack / climbing-stairs DP (Week 11) → study-buddy
schedule matching via LCS (Week 12) → campus-as-graph (Week 13) →
Get Directions via Dijkstra/Bellman-Ford, scavenger-hunt P/NP teaser
(Week 14).

## Assignments

Per the official syllabus, assignments are introduced in class weeks
3, 6, 10, 13 (the assignments column). Due two weeks later so grading fits the
"within one week" policy without colliding with the next release:

| # | Title | Released | Due | Topics |
|---|---|---|---|---|
| 1 | Complexity & Pseudocode | Wk 3 | Wk 5 | Pseudocode, Big-O proofs, growth-rate ordering |
| 2 | Sorting | Wk 6 | Wk 8 (submit before exam) → graded, discussed Wk 11 | Basic + advanced sorts, empirical vs. theoretical comparison |
| 3 | Greedy & Divide-and-Conquer | Wk 10 | Wk 12 | Interval-scheduling proof sketch, a D&C recurrence analysis |
| 4 | Dynamic Programming & Graphs | Wk 13 | Wk 15 (submit before exam) | LCS with traceback, Dijkstra, a short P/NP question |

Assignment specs, rubrics, and (separately, not published) model
answers live under `materials/weekNN/` for the week each is released,
plus a standalone `materials/assignments/` set - see that directory's
own files for full detail.

## Status

Scaffold (theme, spine, roadmap, case study, template) plus Week 1
built as the depth reference. Weeks 2-15 authored to match, one deck +
one materials set (handout/worksheet/quiz) per week, except Weeks 8
and 15 (review decks only, no separate materials) and Week 1
(presentation-only - handout for reference, no in-class worksheet/quiz).
