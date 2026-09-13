# Week 14 Check - Shortest Path

Computer Algorithms (506994-002). Released Week 14. **Due before Week
15's class begins** (submit via the course Learning Management
System, LMS). Individual work. A short, teacher-graded check on this
week's Dijkstra, Bellman-Ford, and P vs. NP material only - separate
from **Assignment 4** (Dynamic Programming & Graphs, released Week
13, due Week 15).

## Tasks

**1. Dijkstra by hand (30 pts).** Run Dijkstra from source $S$ on:
$S{-}A=1$, $S{-}B=4$, $A{-}B=2$, $A{-}C=6$, $B{-}C=1$ (undirected).
Show the settled order and the final distance to every vertex, one
round per row, in the lecture's trace-table format.

**2. Bellman-Ford and a negative edge (30 pts).** CampusNav proposes
a one-way shortcut credit on a night-shuttle segment: the directed
graph $S{\to}C=3$, $S{\to}B=6$, $B{\to}C=-5$. Run Dijkstra from $S$ by
hand and report $\delta(S,C)$. Then run Bellman-Ford from $S$ on the
same graph (all $V-1$ rounds) and report its $\delta(S,C)$. State
which algorithm is correct here, and exactly why Dijkstra's strategy
fails on this instance.

**3. P vs. NP classification (25 pts).** For each of the following,
state whether it is in P, in NP (but not known to be in P), or both,
with a one-sentence justification: (a) "check whether a given list of
campus stops, visited in a given order, forms a valid route of total
length under 20 minutes"; (b) "find the shortest route visiting every
campus stop exactly once."

**4. Short written question (15 pts).** In 2-3 sentences, explain why
"NP" does not mean "not solvable in polynomial time," and give one
concrete example (from lecture or your own) of a problem that is in
P.

## Submission format

One PDF or Markdown file containing all four tasks, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All traces and classifications are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Trace precision** | Dijkstra and Bellman-Ford traces both fully correct, round by round | Minor omission or off-by-one | One trace has a real error | No real trace attempted |
| **Negative-edge diagnosis** | Correctly identifies exactly where and why Dijkstra goes wrong | Identifies the failure, explanation has a gap | Vague or partly correct | Not attempted |
| **P/NP reasoning** | Both classifications correct with clear justification | One minor terminology slip | Right intuition, wrong terminology | Missing or incorrect |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
