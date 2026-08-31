# Week 14 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1 / A2.**

  | Vertex | R0 | R1 | R2 | R3 | R4 | R5 | R6 |
  |---|---|---|---|---|---|---|---|
  | Gate | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
  | Library | ∞ | 3 | 3 | 3 | 3 | 3 | 3 |
  | Dorm | ∞ | 4 | 4 | 4 | 4 | 4 | 4 |
  | CS-Building | ∞ | ∞ | 5 | 5 | 5 | 5 | 5 |
  | Gym | ∞ | ∞ | 8 | 8 | 8 | 8 | 8 |
  | Cafeteria | ∞ | ∞ | ∞ | ∞ | 7 | 7 | 7 |

  Settlement order: R1=Gate, R2=Library, R3=Dorm, R4=CS-Building,
  R5=Cafeteria, R6=Gym. Accept a trace that reaches the same final
  numbers and settlement order even if intermediate columns are
  written slightly differently (e.g. combining rounds), as long as
  the reasoning is sound.
- **A3.** Two valid examples: (1) Round 3, relaxing Dorm→Gym offers
  4+6=10, not better than Gym's existing 8 - rejected. (2) Round 5,
  relaxing Cafeteria→Gym offers 7+3=10, not better than Gym's
  existing 8 - rejected. Accept either (or both).
- **A4.** Distance = **7**. Route: **Gate → Library → CS-Building →
  Cafeteria**.

## Part B

- **B1.** Library settled in **round 2**. Cafeteria settled in
  **round 5** - three rounds later.
- **B2.** No. Standard Dijkstra only relaxes edges into vertices that
  are still unsettled; Library was already settled in round 2, three
  rounds before the Cafeteria→Library edge is even discovered in
  round 5. The algorithm never performs this comparison at all - it
  is structurally excluded, not just numerically rejected.
- **B3.** Offer = 7 + (−4) = **3**. Compared to Library's settled
  distance (3): **equal** (a tie).
- **B4.** Accept any answer that captures: the tie here is a
  coincidence of these specific numbers (the loop Library→CS-Building
  →Cafeteria→Library sums to exactly 2+2−4=0). If the credit were
  −5 instead of −4, that loop would sum to −1 - a **negative cycle**
  - and you could walk it forever, reducing "distance to Library"
  without bound; Dijkstra has no way to detect this and would give a
  wrong, finite answer with no warning. Relying on a tie working out
  is not the same as the algorithm being correct.
- **B5.** Nothing changes after round 1 in this graph - with the
  natural edge order, Bellman-Ford already reaches the final,
  correct distances (G=0, L=3, D=4, C=5, F=7, Y=8) after a single
  pass, and every subsequent round (including the extra check pass)
  confirms no further improvement and no negative cycle. Guaranteed-
  correct rounds needed for any 6-vertex graph, regardless of edge
  order: **V − 1 = 5** (plus one more pass if you want to confirm no
  negative cycle exists).

## Part C

- **C1.** **Both.** It's in P because Dijkstra/Bellman-Ford solve it
  in polynomial time; it's therefore also in NP, because every
  problem in P is automatically in NP (if you can solve it fast, you
  can verify a candidate answer fast too - just solve it yourself and
  compare).
- **C2. False.** NP stands for **N**ondeterministic **P**olynomial
  time - it describes how fast a *candidate solution* can be
  *verified*, not how slow the problem is to solve. A problem being in
  NP says nothing by itself about whether it's also in P.
- **C3.(a)** Walk the proposed route once: check each of the 8
  buildings appears exactly one time (a linear scan), and sum the edge
  weights along the route (also linear in the route's length) - both
  polynomial-time checks.
  **C3.(b)** Verifying *one* proposed route is cheap, but finding the
  *best* route means comparing it against all possible orderings of 8
  buildings - the scavenger hunt is Hamiltonian-path/TSP-shaped, and no
  known algorithm solves it faster than roughly trying all of them
  (exponential). "Easy to verify a candidate" and "easy to find the
  best one" are different claims - that gap is exactly what makes P
  vs. NP a real, unresolved question.
