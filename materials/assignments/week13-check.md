# Week 13 Check - Graph Representation

Computer Algorithms (506994-002). Released Week 13. **Due before Week
14's class begins** (submit via the course Learning Management
System, LMS). Individual work. A short, teacher-graded check on this
week's graph representations and traversals only - separate from
**Assignment 4** (Dynamic Programming & Graphs, also released Week
13, but due Week 15, before the final exam).

## Tasks

**1. Representations (30 pts).** A 5-room floor is connected
(unweighted, undirected): P-Q, P-R, Q-S, R-S, S-T. Build the
adjacency matrix and the adjacency list by hand. State how many
matrix cells and how many list entries each representation uses.

**2. Density and choice (20 pts).** CampusNav's engineering team is
evaluating a new wing with $V = 100$ locations and $E = 250$
walkways. Compute the adjacency matrix's cell count and the
adjacency list's entry count, and justify - with the numbers, not
just intuition - which representation CampusNav should use.

**3. BFS and DFS traces (30 pts).** Using the 5-room floor from Task
1 and the neighbor-list order you built there, trace BFS from P and
DFS from P, listing the visit/discovery order for each. State how
many hops (edges) room T is from P.

**4. Order depends on the start (20 pts).** Using the same graph,
trace DFS starting from room S instead of P. Report the discovery
order, and in 2-3 sentences, explain why it differs from DFS's order
starting at P, even though nothing about the graph itself changed.

## Submission format

One PDF or Markdown file containing all four tasks, clearly labeled.
Traces may be handwritten-then-scanned, as long as they're legible.

## Rubric

| Criterion | Excellent (full) | Good | Needs work | Missing/incorrect |
|---|---|---|---|---|
| **Correctness** | All representations, traces, and counts are correct | One minor error | Several errors, core idea present | Fundamentally wrong or absent |
| **Representation precision** | Matrix and list both built correctly, counts match the formulas | Minor omission or off-by-one | One representation wrong | No real attempt |
| **Trace precision** | BFS and DFS traces both fully correct, hop count correct | Minor omission | One trace wrong | No real trace attempted |
| **Clarity of explanation** | Justification is clear and complete | Mostly clear, one weak spot | Justification thin or hard to follow | Little to no explanation |

Graded within one week of the due date. Model answers and weak-topic
guidance are shared with the class after grading; individual review is
available on request.
