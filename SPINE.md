# The Spine: Standard Structure for Every Lecture Week

Computer Algorithms (506994-002), DEU 2026-2. This document is the standard.
Every week's deck (`slides/weekNN-*.md`) must follow it. If a deck and this
document disagree, fix the deck.

## Principle

**Motivation always precedes definition.** A student should never meet a
term before meeting the concrete problem that forced someone to invent it.
Every full-spine week opens with a broken scenario in plain language, not a
formal statement.

**Weeks chain.** The "Limits" slide that closes week N is, almost verbatim,
the "Pain" slide that opens week N+1. The semester should read as one
argument, not fifteen independent talks.

**One running case study.** Every worked example is a feature of
**CampusNav**, a fictional campus wayfinding/scheduling app whose story
supplies the worked example for each week's technique - see
`slides/_shared/case-study.md` for the full feature-by-feature state. A new
technique is introduced because CampusNav's story needs it, not because the
syllabus says so.

## The 17 slots

Acts 0, 1, 2, 4 are **mandatory and fixed**: same slot numbers, same order,
every full-spine week. Act 3 (Build) expands or contracts to fit the topic.

### Act 0: LOCATE

| # | Slide | Rule |
|---|---|---|
| 1 | Title | Week #, topic, course code, instructor, date |
| 2 | Where we are | Shared roadmap graphic (`_shared/roadmap.md`), current week highlighted |
| 3 | Recap + open wound | One sentence on what last week delivered, one sentence on what it left broken |

### Act 1: MOTIVATE

| # | Slide | Rule |
|---|---|---|
| 4 | The pain | Concrete broken scenario inside CampusNav. **Zero jargon.** If a technical term appears here, the slide is wrong |
| 5 | Cost of not knowing | What breaks downstream (wrong answers, slow app, lost work) *and* where this bites in industry (interviews, real outages, job requirements) |
| 6 | Driving question | One sentence the week must answer. Repeat it verbatim on any section-divider slide inside Act 3 |
| 7 | Learning outcomes | 3–4 verbs, each traceable to a syllabus objective |

**Hard rule:** no formal definition before slot 8. If you need one earlier,
the pain slide (4) is too abstract, so fix it instead of breaking the rule.

### Act 2: GROUND

| # | Slide | Rule |
|---|---|---|
| 8 | Origin | Who, when, what forced it. Ideas are answers to historical pain, not arbitrary convention |
| 9 | Core concept | First formal definition of the week |

### Act 3: BUILD (flexible)

| # | Slide | Rule |
|---|---|---|
| 10..N-3 | Mechanics | Stepwise, as many slides as the topic needs. Includes proofs (loop invariants, Master theorem, exchange arguments) where the syllabus calls for correctness |
| N-2 | Worked example | The current CampusNav feature, continued from prior weeks; see `_shared/case-study.md` |
| N-1 | Common mistakes | The misconception(s) this topic is known for (see the bank below), and why each is tempting |
| N | Check yourself | 2–3 questions; put the answers on the slide immediately after, not the same slide |

### Act 4: CLOSE

| # | Slide | Rule |
|---|---|---|
| N+1 | Limits | What this week's technique cannot do. **This text becomes next week's slot 4** |
| N+2 | Bridge | "Week N leaves X unsolved → Week N+1 addresses it." Explicit, one sentence |
| N+3 | Summary | Takeaways + reading assignment + what to prepare |
| N+4 | Thank You | Template end slide |

## The semester chain

| Wk | Topic | Limit (leads to next pain) |
|---|---|---|
| 1 | Introduction (orientation variant) | We know how the course runs and what's expected of us, but we have no rigorous way to check whether a written-down procedure even qualifies as a real algorithm - "look around until you find it" still sounds like a reasonable instruction → **W2** |
| 2 | Algorithm Concepts | We can write a precise algorithm, but have no way to say whether one precise algorithm is *better* than another → **W3** |
| 3 | Complexity Analysis | We can compare growth rates in the abstract, but algorithms that call themselves hide their cost inside a self-referential formula we don't yet know how to solve → **W4** |
| 4 | Recursion & Recurrence | We can trace and bound recursive cost, but we still have no real toolkit - just an unsorted array and brute force → **W5** |
| 5 | Basic Sorting | These sorts are provably correct, but at O(n²) they collapse once the directory is campus-sized → **W6** |
| 6 | Advanced Sorting | Sorting is solved efficiently, but a sorted list is only useful if we can search it fast, which we haven't formalized → **W7** |
| 7 | Searching | Big-O, recursion, sorting, and searching are all in place, but every technique so far is ad hoc per problem - no general strategy exists for *inventing* a new algorithm → **W9** |
| 8 | Midterm | review only, no chain link |
| 9 | Divide & Conquer | D&C works when subproblems are independent, but not every problem splits cleanly - some reward a purely local, greedy choice instead of full recursion → **W10** |
| 10 | Greedy | Greedy is fast, but its local choices are sometimes provably wrong - we need a technique that considers the full choice space without brute-forcing all of it → **W11** |
| 11 | Dynamic Programming I | DP conquers 1-D optimization, but many real problems compare or align *two* sequences at once, which a 1-D recurrence can't express → **W12** |
| 12 | Dynamic Programming II | Everything so far runs on linear structures (arrays, sequences) - real systems are networks, and we have no representation for that yet → **W13** |
| 13 | Graph Representation | We can represent a network and visit every node, but we still can't answer the most common real question: what's the cheapest path from A to B? → **W14** |
| 14 | Shortest Path | Shortest path is solvable efficiently because it's in P - but closely related problems (P/NP) may have no efficient algorithm at all, known or possible → **W15** |
| 15 | Final Exam | review only, no chain link |

Week 1 uses the **orientation variant**: Act 0 (slots 1-2 only - no "last
week" to recap), a brief, non-technical course intro (the CampusNav premise
as a running case study, and a single tease slide posing "look around until
you find it" as a discussion prompt, not a lesson), the driving
question/learning-outcomes pair reframed at course level (what the whole
semester answers, not just one week), then the **course contract** - grading,
policies, textbooks, schedule - as the bulk of the session, outside the spine
numbering. It still closes on Act 4 (slots N+1..N+4) exactly like a
full-spine week, because its Limits text is what Week 2 reuses -
verbatim in Week 2's own slot 3 recap, and as the seed for Week 2's
slot 4 pain slide (a fresh dramatization of the same gap, not a
verbatim copy). This is the one documented exception to "Limits becomes
next week's slot 4" above: Week 1 has no slot 3 of its own to recap
into, so the text surfaces one slot earlier than usual. No Ground or
Act-3 Mechanics: there is no technique to teach yet.
Unlike every other week, Week 1 is **presentation-only**: no in-class
worksheet or self-check quiz hand-off, and its `materials/week01/` ships a
handout only, for reference.

Weeks 8 and 15 use the **short review variant**: Act 0 (slots 1-3) + Act 3
slot "Check yourself" (expanded into full review questions) + Act 4 (slots
N+1..N+4, "Limits" replaced by "What to focus on next"). No Pain or Ground
acts: there is no new concept to motivate.

## Misconception bank (source these for every "Common mistakes" slot)

| Topic | Misconception |
|---|---|
| Big-O | Big-O gives the exact running time, not a growth-rate bound |
| Big-O | Dropping the fastest-growing term instead of the slowest ("keeping n log n" when n² is present) |
| Recursion | Recursion is *always* less efficient than iteration |
| Recursion | The base case is "just where you stop," not what bounds the recursion tree's depth |
| Sorting | All O(n²) sorts behave identically in practice (ignoring constants, adaptiveness, stability) |
| Quicksort | Worst-case O(n²) is rare/ignorable regardless of pivot strategy |
| Binary search | Off-by-one bound updates; assuming it works on unsorted data |
| Greedy | Greedy always finds the optimal solution (coin-change counterexample) |
| Greedy vs DP | Not recognizing when a locally optimal choice breaks global optimality - the DP signal |
| DP | Memoization and tabulation are different algorithms rather than two implementations of one recurrence |
| Graphs | Adjacency matrix is always fine regardless of density/sparsity |
| Dijkstra | Dijkstra works correctly with negative edge weights |
| P vs NP | NP means "not solvable in polynomial time" rather than "verifiable in polynomial time" |

## Enforcement

- Copy `slides/_template/week-XX.md` for every new week. It carries all 17
  slots as HTML comments; fill them in, don't renumber them.
- `slides/_shared/roadmap.md`: single source for the Act 0 roadmap graphic.
- `slides/_shared/case-study.md`: CampusNav's feature state, week by week.
  Update it when a week adds or changes a feature.
- Course logistics (grading, textbook, policies) are Week 1's actual
  content - see the orientation variant above - and live outside the spine
  numbering there. In every other week, administrative content must never
  sit between the roadmap and the pain slide.
- Fairness and correctness (syllabus objectives) are woven into the spine
  they belong to, not taught as standalone weeks: correctness proofs land
  in Weeks 5/7 (loop invariants) and 9-10 (exchange arguments, Master
  theorem); fairness surfaces in Week 10 (greedy scheduling trade-offs);
  P/NP/NP-completeness gets its own Act-3 block in Week 14, the only week
  with no other dedicated slot for it.
