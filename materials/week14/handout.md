# Week 14 Handout - Shortest Path

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the Dijkstra trace spelled out completely, the negative-edge
failure walked through in detail, why Bellman-Ford fixes it, the P/NP
sidebar in plain language, a fully worked final-exam practice set, and
optional reading.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Shortest path** | The minimum-total-weight way to travel from one vertex to another along the graph's edges. |
| **Single-source shortest path** | Find the shortest distance from one fixed starting vertex to *every* other vertex. |
| **Source vertex** | The fixed starting point the algorithm computes distances from. |
| **Tentative distance** | The best distance found *so far* for a vertex - may still improve until the vertex is settled. |
| **Relaxation** | Checking whether reaching a vertex through some other vertex $u$ is cheaper than the current known distance, and updating it if so. |
| **Settled / finalized vertex** | A vertex whose shortest distance is proven final - Dijkstra never looks at it again. |
| **Greedy choice** | Committing to the locally best option at each step without reconsidering it later. |
| **Priority queue** | A data structure that always returns the smallest-keyed item - lets Dijkstra find the closest unvisited vertex in $O(\log V)$. |
| **Negative cycle** | A cycle whose total edge weight is negative - looping it forever keeps reducing "distance" without bound. |
| **Polynomial time** | Cost bounded by $n^k$ for some fixed constant $k$ - this course's definition of "efficient." |
| **P** | The class of problems *solvable* in polynomial time. |
| **NP** | The class of problems where a *candidate solution* can be *verified* in polynomial time (not the same as "solvable fast"). |
| **NP-hard** | At least as hard as every problem in NP. |
| **NP-complete** | In NP, and every other NP problem reduces to it in polynomial time - the "hardest" problems in NP. |
| **P =? NP** | The open question of whether every efficiently *verifiable* problem is also efficiently *solvable*. Unsolved. |

---

## Part 2: The Full Dijkstra Trace, Spelled Out

CampusNav's six-location graph, source = Gate (G):

```
Gate(G) --3-- Library(L) --2-- CS-Building(C)
 |             |                |
 4             5                2
 |             |                |
Dorm(D) --6-- Gym(Y) ----3---- Cafeteria(F)
```

Edges (undirected, walking minutes): G-L 3, G-D 4, L-C 2, L-Y 5,
D-Y 6, Y-F 3, C-F 2.

**Initialization:** `dist[G] = 0`, every other vertex = ∞. Priority
queue holds all six vertices, keyed by `dist`.

**Round 1 - extract G (0).** Settled = {G}. Relax G's edges:

- G→L: `dist[L] = min(∞, 0+3) = 3`
- G→D: `dist[D] = min(∞, 0+4) = 4`

State: G=0, L=3, D=4, C=∞, Y=∞, F=∞.

**Round 2 - extract L (3), the smallest unsettled.** Settled =
{G, L}. Relax L's edges:

- L→G: G already settled, and 3+3=6 > 0 anyway - no change.
- L→C: `dist[C] = min(∞, 3+2) = 5`
- L→Y: `dist[Y] = min(∞, 3+5) = 8`

State: G=0, L=3, D=4, C=5, Y=8, F=∞.

**Round 3 - extract D (4).** Settled = {G, L, D}. Relax D's edges:

- D→G: settled, skip.
- D→Y: candidate `4+6=10`, not better than existing `8` - **no
  update**. (This is relaxation correctly doing nothing - just as
  important to notice as when it succeeds.)

State unchanged: G=0, L=3, D=4, C=5, Y=8, F=∞.

**Round 4 - extract C (5).** Settled = {G, L, D, C}. Relax C's edges:

- C→L: settled, skip.
- C→F: `dist[F] = min(∞, 5+2) = 7`

State: G=0, L=3, D=4, C=5, Y=8, F=7.

**Round 5 - extract F (7), which is now smaller than Y (8).**
Settled = {G, L, D, C, F}. Relax F's edges:

- F→C: settled, skip.
- F→Y: candidate `7+3=10`, not better than existing `8` - no update.

State unchanged: G=0, L=3, D=4, C=5, Y=8, F=7.

**Round 6 - extract Y (8), the last vertex.** Settled = all six.
No unsettled neighbors left to relax.

**Final distances from Gate:**

| Vertex | Distance | Shortest path |
|---|---|---|
| Gate | 0 | - |
| Library | 3 | Gate → Library |
| Dorm | 4 | Gate → Dorm |
| CS-Building | 5 | Gate → Library → CS-Building |
| Cafeteria | 7 | Gate → Library → CS-Building → Cafeteria |
| Gym | 8 | Gate → Library → Gym |

Notice the **order vertices got settled** (G, L, D, C, F, Y) is
exactly the order of their final distances, smallest to largest -
this is not a coincidence, it is the entire correctness argument for
Dijkstra: because every remaining edge weight is non-negative, the
next-smallest tentative distance can never be beaten later by a path
that has to pass through something farther away first.

---

## Part 3: The Negative-Edge Failure, in Full Detail

CampusNav's design team adds a one-way "covered walkway" shortcut
credit: walking **Cafeteria → Library** is logged as **−4 minutes**
(a rainy-day gamification perk, not a real distance).

### Re-running Dijkstra with the new edge

The algorithm proceeds *identically* through Rounds 1-4 above (the
new edge only matters once Cafeteria is reached), because Dijkstra
has no way to "look ahead" at edges it hasn't discovered yet.

- **Round 2:** Library is extracted and **settled at distance 3** -
  the algorithm now considers this final and will never revisit it.
- **Round 5:** Cafeteria is finally extracted and settled at distance
  7. *Now*, for the first time, Dijkstra discovers the edge
  Cafeteria → Library, weight −4. Relaxing it would offer
  `dist[F] + (-4) = 7 - 4 = 3`.
- **But Library is already settled.** Standard Dijkstra's inner loop
  only relaxes edges into **unvisited** vertices - Library was
  removed from that set three rounds ago. The algorithm does not even
  perform the comparison `3 vs 3`; it simply never looks.

### Why this is dangerous even though the numbers tie here

In this *specific* graph, 7 + (−4) = 3, which happens to equal
Library's existing distance exactly. So the final answer CampusNav's
app would show, 3 minutes to Library, is *still correct* - by luck.
The loop Library → CS-Building → Cafeteria → Library costs exactly
2 + 2 + (−4) = **0** minutes to walk in a full circle: free, but not
profitable.

That is exactly the danger. Dijkstra's correctness proof depends on
an invariant - "once settled, a distance can never be improved" -
that negative weights can violate. In this case the violation happens
to be harmless (the loop nets to zero), but:

- **Shave the credit by one more minute** (−5 instead of −4): the
  loop now costs 2 + 2 + (−5) = **−1** minute per lap. That is a
  **negative cycle** - you could walk the loop forever, and each lap
  makes the "distance to Library" fall further, without bound.
  "Shortest path to Library" is no longer even a well-defined number.
  Dijkstra has *no mechanism at all* to detect this - it would simply
  finish and report a wrong, finite answer (still 3, since it never
  even looks at the edge into a settled vertex), with no warning.
- **A cleaner, smaller example of the exact same mechanism, without
  a lucky tie:** the failure needs the cheaper path via the negative
  edge to be *discovered* only after the target is already settled.
  Take source $S$ with edges $S{\to}C=2$, $S{\to}B=3$, and
  $B{\to}C=-4$ (directed). Dijkstra settles $C$ first, at distance 2
  (it's the smaller of the two direct options). It then settles $B$
  at distance 3, and only *now* relaxes $B{\to}C$: candidate
  $3+(-4)=-1$, which is less than $C$'s current distance of 2 - but
  $C$ is already settled, so standard Dijkstra **silently skips this
  update**. Dijkstra reports $\delta(S,C)=2$; the true shortest
  distance, via $S{\to}B{\to}C$, is $-1$. This is an unambiguous,
  clean wrong answer, produced by exactly the same "settle early,
  discover the shortcut late" mechanism as the campus graph - the
  campus numbers simply happened to land on a tie (0-weight loop)
  instead of a clean miss.

### Why Bellman-Ford fixes it

Bellman-Ford never marks any vertex "final" until the very last
round. Every distance stays open to being improved by a later
discovery, no matter how late in the graph that discovery happens.

Relaxing every directed edge (both directions of each undirected
walkway, plus the one-way −4 edge) once, in the natural reading
order (G-L, L-G, G-D, D-G, L-C, C-L, L-Y, Y-L, D-Y, Y-D, Y-F, F-Y,
C-F, F-C, F-L):

| | Round 0 (init) | Round 1 |
|---|---|---|
| Gate | 0 | 0 |
| Library | ∞ | 3 |
| Dorm | ∞ | 4 |
| CS-Building | ∞ | 5 |
| Gym | ∞ | 8 |
| Cafeteria | ∞ | 7 |

Because this particular edge order happens to process G→L→C→F before
F→L is ever relaxed, the graph already reaches its final, correct
state after just **one** round. Rounds 2 through 5 relax every edge
again and find nothing left to improve - including checking F→L:
`dist[F] + (-4) = 7 - 4 = 3`, which is **not** less than `dist[L] =
3`, so no update (correctly - it's a tie, not an improvement). The
sixth, extra pass also finds no improvement anywhere, which **proves**
there is no negative cycle reachable from Gate, and confirms these
five distances are final.

Bellman-Ford's guarantee does not depend on a lucky edge order:
*regardless* of which order the edges are relaxed in, correctness is
guaranteed after $V-1=5$ rounds. A less favorable order might take
the full 5 rounds to converge instead of 1 - but it can never take
more than 5, and it will never silently return a wrong answer the way
Dijkstra can. This is exactly the trade CampusNav makes: Dijkstra is
faster, $O((V+E)\log V)$, but only safe with non-negative weights;
Bellman-Ford is slower, $O(VE)$, but safe (and self-checking) even
when weights go negative.

---

## Part 4: P, NP, and NP-Completeness, in Plain Language

Think of every problem CampusNav might want to solve as falling into
one of two questions:

1. **Can I find a good answer quickly?** (Is it in **P**?)
2. **If someone hands me an answer, can I quickly check it's good?**
   (Is it in **NP**?)

**P** ("solvable in polynomial time") means the answer to question 1
is yes - an algorithm exists whose worst-case running time is bounded
by $n^k$ for some fixed power $k$, as $n$ (the input size) grows.
Sorting, binary search, and this week's shortest path are all in P.

**NP** ("verifiable in polynomial time") means the answer to
question 2 is yes - *even if* nobody knows a fast way to find the
answer, once you have a candidate, checking it is fast. This is the
single most misunderstood idea in the whole topic:

> **NP does *not* mean "not polynomial" or "impossible to solve
> quickly."** NP stands for **N**ondeterministic **P**olynomial
> time, a technical term about *verification*, not a claim about how
> hard the problem is to *solve*.

Every problem in P is automatically also in NP: if you can solve a
problem quickly, you can obviously verify any given answer quickly
too - just solve it yourself and compare. The genuinely open question
is the *reverse*: are there problems that are easy to verify but
*not* easy to solve? Most computer scientists believe yes, but nobody
has proven it. This is the famous **P =? NP** question - one of the
seven Clay Millennium Prize problems, unsolved as of this course.

**Shortest path** (this week's whole topic) is a clean example of a
problem that is both solvable *and* verifiable quickly - it's in P,
so it's automatically in NP too, and there's no mystery left about
it.

**CampusNav's scavenger hunt** (visit every building on campus
exactly once, minimize total distance) is different in shape:

- **Verifying** a proposed route is easy: check every building
  appears exactly once, add up the weights. Polynomial time. So the
  scavenger hunt is in **NP**.
- **Finding** the best route is a different story. This is shaped
  exactly like the classic **Hamiltonian-path**/**Traveling
  Salesman** problem. No algorithm faster than (roughly) trying every
  possible ordering is known - and that grows *factorially*, far
  worse than any polynomial. This problem is believed to be
  **NP-hard** (and, formalized properly, **NP-complete**): among the
  hardest problems in NP.

Knowing an efficient algorithm for shortest path (a *single-pair*
problem) gives **no** shortcut for the scavenger hunt (a
*visit-everything-once* problem) - they are different problems in a
precise, formal sense, not just "harder-sounding" versions of the
same one.

If anyone ever found a polynomial-time algorithm for *any single*
NP-complete problem - including the scavenger hunt - it would prove
**P = NP**, and every problem in NP (thousands of important practical
problems across science and industry) would suddenly be efficiently
solvable too. So far, in over 50 years of trying, nobody has.

---

## Part 5: Final-Exam Practice Set (Weeks 9-14), Fully Worked

Try each yourself before reading the answer.

**1. (Divide & Conquer)** CampusNav's multi-stop tour recursion has
recurrence $T(n) = 2T(n/2) + O(n)$. Use the Master theorem to find
$T(n)$.

> **Answer:** $a=2$, $b=2$, $f(n)=\Theta(n)$. Compare $f(n)$ to
> $n^{\log_b a} = n^{\log_2 2} = n^1$: they match, so this is **Case
> 2** of the Master theorem. $T(n) = \Theta(n \log n)$.

**2. (Greedy)** Room-booking requests as (start, finish): A(1,4),
B(3,5), C(0,6), D(5,7), E(8,9), F(5,9). Using earliest-finish-time
greedy, which requests get the room?

> **Answer:** Sort by finish time: A(1,4), B(3,5), C(0,6), D(5,7),
> F(5,9), E(8,9). Pick A (finish 4). B and C start before 4 - reject
> both. Pick D (start 5 ≥ 4, finish 7). F starts before 7 - reject.
> Pick E (start 8 ≥ 7). **Result: A, D, E - 3 bookings.**

**3. (Dynamic Programming I)** Free block of 6 (10-min units);
activities (duration, enjoyment): Coffee (2,3), Club Fair (3,5),
Quick Nap (1,1), Gallery (4,6). Maximize enjoyment, capacity 6 (0/1
knapsack).

> **Answer:** Gallery + Coffee = 4+2=6 units, enjoyment 6+3=**9**.
> Club Fair + Nap + Coffee = 3+1+2=6 units, enjoyment 5+1+3=**9**.
> Club Fair + Gallery = 7 units, over budget - invalid. No
> combination reaches 10 (the full sum of all four items' weights is
> only 10 anyway, and Club Fair+Gallery alone already exceeds
> capacity). **Maximum enjoyment = 9.**

**4. (Dynamic Programming II / LCS)** Student A: [CS101, MATH201,
ENG150, PHYS110]. Student B: [MATH201, CS101, PHYS110, ART100]. Find
the LCS.

> **Answer:** No length-3 subsequence works in both orders (e.g.
> "MATH201, CS101, PHYS110" requires MATH201 before CS101 in both
> sequences, true in B but false in A). Length-2 subsequence **{CS101,
> PHYS110}** is consistent in both: A has CS101 (pos 1) before
> PHYS110 (pos 4); B has CS101 (pos 2) before PHYS110 (pos 3).
> **LCS length = 2.**

**5. (Graph Representation)** $V=50$, $E=140$. Adjacency matrix or
list? Justify with space complexity.

> **Answer:** Matrix: $O(V^2) = 2{,}500$ cells. List: $O(V+E) = 190$
> entries. With only 140 edges out of up to 1,225 possible undirected
> pairs (~11% density), the graph is sparse. **Adjacency list** uses
> over 10× less space and is the right choice - matching CampusNav's
> actual Week 13 decision.

**6. (Shortest Path & P/NP)** (a) Dijkstra by hand from $S$:
$S{-}A=2$, $S{-}B=5$, $A{-}B=1$, $A{-}C=7$, $B{-}C=2$. Find
$\delta(S,C)$. (b) True/False: "The scavenger hunt is in P because we
already know how to solve shortest path efficiently."

> **Answer (a):** Settle $S$(0). Frontier $A=2,B=5$. Settle $A$(2);
> relax to get $B=\min(5,3)=3$, $C=\min(\infty,9)=9$. Settle $B$(3);
> relax to get $C=\min(9,5)=5$. Settle $C$(5). $\delta(S,C)=5$, path
> $S{\to}A{\to}B{\to}C$.
>
> **Answer (b): False.** Shortest path solves a single-destination
> problem; the scavenger hunt additionally requires visiting every
> location exactly once - a Hamiltonian-path/TSP-shaped constraint.
> Solving the first efficiently gives no efficient algorithm for the
> second; they are different problems.

---

## Part 6: Optional Reading

- CLRS, Chapter 24 - Single-Source Shortest Paths: the full
  correctness proofs for Dijkstra and Bellman-Ford this handout only
  sketched, plus the Bellman-Ford negative-cycle proof in detail.
- CLRS, Chapter 34 - NP-Completeness (skim): the formal definitions
  of P, NP, NP-hardness, NP-completeness, and the reduction technique
  used to prove a problem NP-complete (not required for the final
  exam, but the natural next step after this week's sidebar).
- Look up "Dijkstra's algorithm café anecdote" for Edsger Dijkstra's
  own account of designing the algorithm in about 20 minutes without
  paper - a nice reminder that even famous algorithms started as one
  person's answer to a concrete, personal pain, exactly like
  CampusNav's.
