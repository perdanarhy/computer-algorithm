---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 15: Final Exam

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: This is the last class of the semester. Open by naming that directly:
"Fifteen weeks ago we started with a student lost on move-in day. Today we
close the loop." Keep the tone warm, not just administrative.
-->

---

<!-- SLOT 2: Where we are (Act 0 / LOCATE) -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Algorithm Concepts</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Complexity Analysis</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">Recursion &amp; Recurrence</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Basic Sorting</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Advanced Sorting</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">Searching</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review now"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: "Fifteen weeks, one row each. Today is the last one - and it's a review, not new material." -->

---

<!-- SLOT 3: Recap (Act 0 / LOCATE) -->

# Weeks 9-14, In One Slide

- **Week 9, Divide & Conquer:** split into independent subproblems, recurse, combine; recurrences solved with the Master theorem.
- **Week 10, Greedy:** locally optimal choices, correctness proved with exchange arguments - but not every problem has the structure that makes greedy safe.
- **Week 11, DP I:** overlapping subproblems and optimal substructure, solved bottom-up (tabulation) or top-down (memoization) - two implementations of one recurrence.
- **Week 12, DP II (longest common subsequence, LCS):** the same DP idea, extended from one sequence to comparing two at once.
- **Week 13, Graph Representation:** networks as adjacency lists or matrices, chosen by density, not by habit.
- **Week 14, Shortest Path:** Dijkstra for non-negative weights, Bellman-Ford when weights go negative - plus the P vs. NP sidebar on what "efficiently solvable" even means.

---

<!-- Before the Exam: logistics, outside the spine numbering, same placement pattern as Week 1's appendix -->

# Before the Exam

- **Coverage:** Weeks 9-14 - Divide & Conquer through Shortest Path, including the P vs. NP sidebar. Weeks 1-7/Midterm material is not retested directly, but the reasoning it built (correctness, complexity) is assumed throughout.
- **Format:** same style as the midterm - a mix of short-answer, trace-by-hand, and proof-sketch questions, written in the same style as this semester's assignments and worksheets, worth 25% of the final grade.
- **Materials policy:** per the instructor's announcement for this exam - check the course announcement before exam day for exactly what's allowed.
- **Assignment 4** (Dynamic Programming & Graphs) is due **before** the exam, not during it.
- **Accommodations:** if you need any testing accommodation, arrange it with the instructor in advance - not on exam day itself.

---

<!-- Act 3 / BUILD: the review-question format expanded into the full review (short review variant, SPINE.md) -->

# Coverage

<div class="thread">Seven ideas. Six weeks. One exam.</div>

1. **Divide & Conquer / Master Theorem** - splitting a problem and solving its recurrence.
2. **Greedy** - local choices, exchange-argument proofs, and when greedy fails.
3. **Dynamic Programming I** - overlapping subproblems, memoization vs. tabulation.
4. **Dynamic Programming II / LCS** - DP across two sequences at once.
5. **Graph Representation** - adjacency list vs. matrix, and why the choice matters; breadth-first / depth-first search for traversing the result.
6. **Shortest Path** - Dijkstra, Bellman-Ford, and where each one breaks.
7. **P vs. NP** - polynomial-time solvable vs. polynomial-time verifiable.

---

<!-- Review Question 1 - Week 9, D&C / Master Theorem (moved from Week 14's final-exam-blueprint block per SPINE decongestion pass) -->

# Review Question 1

CampusNav's multi-stop tour recursion has recurrence
$T(n) = 2T(n/2) + O(n)$. Use the Master theorem to find $T(n)$'s
growth rate.

---

# Answer 1

Master theorem form $T(n) = aT(n/b) + f(n)$ with $a=2$, $b=2$,
$f(n) = O(n)$.

$n^{\log_b a} = n^{\log_2 2} = n^1 = n$, which matches $f(n) = \Theta(n)$ -
this is **Case 2** (the split-work and combine-work grow at the
same rate).

$$T(n) = \Theta(n \log n)$$

---

<!-- Review Question 2 - Week 10, Greedy -->

# Review Question 2

CampusNav's room-booking scheduler receives these requests for one
seminar room, as (start, finish): A(1,4), B(3,5), C(0,6), D(5,7),
E(8,9), F(5,9). Using earliest-finish-time greedy, which requests get
the room, and how many total bookings?

---

# Answer 2

Sort by finish time: A(1,4), B(3,5), C(0,6), D(5,7), F(5,9), E(8,9).

- Pick **A** (1,4) - finish = 4.
- B(3,5): start 3 < 4 - reject. C(0,6): start 0 < 4 - reject.
- **D** (5,7): start 5 ≥ 4 - accept, finish = 7.
- F(5,9): start 5 < 7 - reject.
- **E** (8,9): start 8 ≥ 7 - accept.

**Result: A, D, E - 3 bookings.**

---

<!-- Review Question 3 - Week 11, DP I -->

# Review Question 3

A free block of 6 (10-minute units) and activities (duration,
enjoyment): Coffee (2,3), Club Fair (3,5), Quick Nap (1,1), Gallery
(4,6). Maximize total enjoyment without exceeding 6 units (0/1
knapsack).

---

# Answer 3

Total weight available if everything were chosen: 2+3+1+4=10 (over
budget), so some subset must be dropped. Checking combinations that
fit within capacity 6:

- Gallery + Coffee = 4+2 = 6 units, enjoyment 6+3 = **9**
- Club Fair + Nap + Coffee = 3+1+2 = 6 units, enjoyment 5+1+3 = **9**
- Club Fair + Gallery = 3+4 = 7 units - over budget, invalid

**Maximum enjoyment = 9** (e.g. Gallery + Coffee), found by the DP
table's standard "include vs. exclude" recurrence, same one used for
the Tour Planner in Week 11.

---

<!-- Review Question 4 - Week 12, DP II / LCS -->

# Review Question 4

Student A's course sequence: [CS101, MATH201, ENG150, PHYS110].
Student B's: [MATH201, CS101, PHYS110, ART100]. Find the longest
common subsequence (shared courses, in the order each student has
them).

---

# Answer 4

Checking length-3 candidates: "MATH201, CS101, PHYS110" needs
MATH201 before CS101 in **both** sequences - true in B, but false in
A (CS101 comes first in A). No length-3 common subsequence exists.

Length-2 candidates that work in both orders: **{CS101, PHYS110}** -
in A, CS101 (pos 1) before PHYS110 (pos 4); in B, CS101 (pos 2)
before PHYS110 (pos 3). Both consistent.

**LCS length = 2**, e.g. CS101, PHYS110 - that's what CampusNav's
study-buddy matcher reports these two students share, in order.

---

<!-- Review Question 5 - Week 13, Graph Representation -->

# Review Question 5

CampusNav's full campus graph has $V = 50$ (buildings/junctions) and
$E = 140$ (walkways). Should CampusNav use an adjacency matrix or an
adjacency list? Justify with space complexity.

---

# Answer 5

- Adjacency **matrix**: $V^2 = 50^2 = 2{,}500$ cells, regardless
  of how many walkways actually exist.
- Adjacency **list**: $O(V + E) = 50 + 140 = 190$ entries total.

The graph is sparse - 140 actual edges against up to $\binom{50}{2} =
1{,}225$ possible undirected pairs, roughly 11% density. **Adjacency
list** is the right choice: it uses over 10× less space here, and
listing one vertex's neighbors is still fast - exactly the
Week 13 decision CampusNav actually made.

---

<!-- Review Question 6 - Week 14, Shortest Path & P/NP -->

# Review Question 6

(a) Run Dijkstra by hand from $S$ on: $S{-}A=2$, $S{-}B=5$, $A{-}B=1$,
$A{-}C=7$, $B{-}C=2$. Find $\delta(S, C)$.

(b) True or False, with a one-sentence justification: "The
campus-wide scavenger hunt is in P because we already know how to
solve shortest path efficiently."

---

# Answer 6

**(a)** Settle $S$(0). Frontier: $A=2, B=5$. Settle $A$(2); relax
$A{-}B$: $B = \min(5, 2+1)=3$; relax $A{-}C$: $C=\min(\infty,2+7)=9$.
Settle $B$(3); relax $B{-}C$: $C=\min(9,3+2)=5$. Settle $C$(5).

$$\delta(S, C) = 5 \quad \text{(path } S{\to}A{\to}B{\to}C\text{)}$$

**(b) False.** Shortest path solves "cheapest route between two
fixed points" - a single-destination problem. The scavenger hunt adds
a "visit every location exactly once" constraint, which is a
fundamentally different (Hamiltonian-path/travelling-salesman-problem-shaped,
TSP-shaped) problem; solving one does not give an efficient algorithm
for the other.

---

<!-- Review Question 7 - Week 13, Graph Traversal (BFS/DFS) -->

# Review Question 7

Using CampusNav's 6-node campus graph and its adjacency list
(`G→[L,D]  L→[G,C,Y]  C→[L,F]  D→[G,Y]  Y→[L,D,F]  F→[Y,C]`), trace
BFS starting from the Gate. List the visit order, and state how many
"hops" (edges) the Cafeteria is from the Gate.

---

# Answer 7

Queue trace: enqueue G. Dequeue G, enqueue L, D. Dequeue L, enqueue C,
Y (G already visited). Dequeue D - both neighbors already
visited/enqueued. Dequeue C, enqueue F (L already visited). Dequeue Y
- all neighbors already visited/enqueued. Dequeue F - done.

**Visit order: G, L, D, C, Y, F.**

Layer by layer: G is 0 hops; L and D are 1 hop (direct neighbors of
G); C and Y are 2 hops (first reached via L); F is first reached via
C, so **Cafeteria is 3 hops from the Gate** - exactly what BFS's
layer-by-layer order is built to answer.

---

<!-- NEW: transition slide introducing the deeper per-topic practice block -->

# One More Pass: New Practice, One Per Topic

<div class="thread">The seven questions above were a quick pass. Here's one new, harder problem per week - full solutions, worked out completely.</div>

For each of Weeks 9-14: a one-slide recap of the core technique, then
a brand-new CampusNav-flavored practice problem (not copied from that
week's own deck), then its complete worked solution - the same
difficulty a real final-exam question would ask.

---

<!-- NEW: Week 9 recap card -->

# Recap: Week 9, Divide & Conquer

- **Idea:** split a problem into independent subproblems of the same shape, solve each recursively, combine the results.
- **Analyzing the cost:** a recurrence $T(n) = aT(n/b) + f(n)$, solved with the **Master theorem** by comparing $f(n)$ to $n^{\log_b a}$.
- **CampusNav features:** the best-free-time-block maximum-subarray problem, and the fast-halving shortcut-step counter.

---

<!-- NEW: Week 9 new practice problem -->

# New Practice: A Three-Way Split

CampusNav's engineering team prototypes a variant of the shortcut
counter that recursively splits each subproblem into **three** equal
halves instead of two, doing $O(n)$ combining work per level:

$$T(n) = 3T(n/2) + O(n)$$

Use the Master theorem to find $T(n)$'s growth rate.

---

<!-- NEW: Week 9 worked solution -->

# Worked Solution

Master theorem form $T(n) = aT(n/b) + f(n)$ with $a=3$, $b=2$, $f(n) = O(n)$.

$n^{\log_b a} = n^{\log_2 3} \approx n^{1.585}$. Since $f(n) = O(n^1)$
and $1 < \log_2 3$, $f(n)$ grows **strictly slower** than
$n^{\log_2 3}$ - this is **Case 1** (the recursive splitting work
dominates the combining work).

$$T(n) = \Theta(n^{\log_2 3}) \approx \Theta(n^{1.585})$$

Slower-growing than the real $T(n) = 2T(n/2) + O(1)$ shortcut counter
(Week 9's actual feature, itself $\Theta(n)$ by the same theorem) -
a concrete reminder that changing *either* $a$ or $f(n)$ can change
which Master theorem case applies.

---

<!-- NEW: Week 10 recap card -->

# Recap: Week 10, Greedy Algorithms

- **Idea:** at each step, make the locally best-looking choice and never reconsider it - correctness must be *proved*, typically with an exchange argument.
- **When it works:** earliest-finish-time scheduling (CampusNav's room-booking assistant) - provably optimal.
- **When it fails:** change-making with denominations like {1, 3, 4} - the classic counterexample showing greedy is not universally safe.

---

<!-- NEW: Week 10 new practice problem -->

# New Practice: Campus Points, the Hard Way

CampusNav's gamified "campus points" system uses denominations
{1, 3, 4}. A student earns exactly **6** points as a single reward.
Using greedy (always take the largest denomination that still fits),
how many coins does greedy use? Is that optimal - and if not, what's
the true minimum?

---

<!-- NEW: Week 10 worked solution -->

# Worked Solution

**Greedy trace:** remaining = 6 &rarr; largest denomination &le; 6 is
**4**, remaining = 2 &rarr; largest &le; 2 is **1**, remaining = 1
&rarr; take **1**, remaining = 0. Greedy uses **{4, 1, 1} = 3 coins**.

**Checking for better:** {3, 3} also sums to 6, using only **2
coins** - fewer than greedy's 3. Greedy is **not optimal** here.

This is the {1, 3, 4} counterexample from Week 10's misconception
bank, made concrete: greedy's "always take the biggest" rule has no
correctness proof for this denomination set, and this instance shows
why no such proof could exist.

---

<!-- NEW: Week 11 recap card -->

# Recap: Week 11, Dynamic Programming I

- **Idea:** overlapping subproblems + optimal substructure, solved bottom-up (tabulation) or top-down (memoization) - two implementations of the *same* recurrence, not two different algorithms.
- **CampusNav feature:** the Tour Planner - given a free block of time and activities with (duration, enjoyment), maximize enjoyment without running late (0/1 knapsack).

---

<!-- NEW: Week 11 new practice problem -->

# New Practice: A Different Free Block

A free block of **5** (10-minute units) and activities (duration,
enjoyment): Movie (2, 4), Board Game (3, 5), Trivia (1, 2), Photo Walk
(4, 6). Using the 0/1 knapsack DP recurrence, find the maximum total
enjoyment without exceeding 5 units - and which activities achieve it.

---

<!-- MERGED: Week 11 worked solution (table + reading, was 2 slides) -->

# Worked Solution: Table and Result

<div class="thread">dp[i][w] = best enjoyment using the first i activities, budget w.</div>

| Items included | w=0 | w=1 | w=2 | w=3 | w=4 | w=5 |
|---|---|---|---|---|---|---|
| (none) | 0 | 0 | 0 | 0 | 0 | 0 |
| + Movie (2,4) | 0 | 0 | 4 | 4 | 4 | 4 |
| + Board Game (3,5) | 0 | 0 | 4 | 5 | 5 | 9 |
| + Trivia (1,2) | 0 | 2 | 4 | 6 | 7 | 9 |
| + Photo Walk (4,6) | 0 | 2 | 4 | 6 | 7 | 9 |

`dp[4][5] = 9` - the maximum, via **Movie + Board Game** (2+3=5
units, 4+5=9 enjoyment). Tracing back: Photo Walk and Trivia both
leave `w=5` unchanged, so neither is used; Board Game raises it from
4 to 9 using its own budget 3 plus Movie's budget 2 - the same
"include vs. exclude" recurrence as the Tour Planner.

---

<!-- NEW: Week 12 recap card -->

# Recap: Week 12, Dynamic Programming II (LCS)

- **Idea:** the same overlapping-subproblems/optimal-substructure idea, extended to comparing *two* sequences at once: `dp[i][j] = dp[i-1][j-1] + 1` if the two elements match, else `max(dp[i-1][j], dp[i][j-1])`.
- **CampusNav feature:** the study-buddy matcher - the longest common subsequence of two students' course-code sequences.

---

<!-- NEW: Week 12 new practice problem -->

# New Practice: Two More Students

Student C's sequence: [MATH201, CS101, ENG150, STAT210]. Student D's:
[CS101, MATH201, STAT210, ART100]. Find the longest common
subsequence (shared courses, in order).

---

<!-- MERGED: Week 12 worked solution (table + reading, was 2 slides) -->

# Worked Solution: Table and Result

<div class="thread">Rows = Student C's courses, columns = Student D's courses.</div>

| | &empty; | CS101 | MATH201 | STAT210 | ART100 |
|---|---|---|---|---|---|
| &empty; | 0 | 0 | 0 | 0 | 0 |
| MATH201 | 0 | 0 | 1 | 1 | 1 |
| CS101 | 0 | 1 | 1 | 1 | 1 |
| ENG150 | 0 | 1 | 1 | 1 | 1 |
| STAT210 | 0 | 1 | 1 | 2 | 2 |

`dp[4][4] = 2`: **LCS = [CS101, STAT210], length 2.** Tracing back
from the bottom-right corner: STAT210 matches STAT210 (the final
"2"), then CS101 matches CS101 (the "1") - MATH201 and ENG150
contribute no consistent match. Both courses appear in this order in
*both* sequences - what CampusNav's study-buddy matcher would report.

---

<!-- NEW: Week 13 recap card -->

# Recap: Week 13, Graph Representation

- **Idea:** a graph is vertices + edges; adjacency **matrix** (O(V²) space, O(1) edge lookup) and adjacency **list** (O(V+E) space, O(deg(u)) lookup) store the same graph differently - list wins once the graph is sparse.
- **Traversal:** BFS (queue, layer-by-layer, shortest paths on unweighted graphs) and DFS (stack/recursion, deep-first, connectivity), both O(V+E).

---

<!-- NEW: Week 13 new practice problem -->

# New Practice: A Five-Room Floor

A building floor has 5 rooms, connected (unweighted, undirected):
A-B, A-C, B-D, C-D, D-E. (a) Write the adjacency list, and how many
cells would an adjacency matrix need? (b) Trace BFS starting from A.

---

<!-- MERGED: Week 13 worked solution (representation + BFS trace, was 2 slides) -->

# Worked Solution: Representation and BFS Trace

**Adjacency list:** A:[B,C], B:[A,D], C:[A,D], D:[B,C,E], E:[D] - a
total of $V + 2E = 5 + 2(5) = 15$ entries (5 edges, each stored at
both endpoints). **Adjacency matrix:** $V^2 = 5^2 = 25$ cells.

Enqueue A. Dequeue A, enqueue B, C - `Q=[B,C]`. Dequeue B, enqueue D
(A already visited) - `Q=[C,D]`. Dequeue C - both neighbors (A, D)
already visited/enqueued - `Q=[D]`. Dequeue D, enqueue E (B, C
already visited) - `Q=[E]`. Dequeue E - done.

**Visit order: A, B, C, D, E.** Hops from A: B and C are 1 hop, D is
2 hops (first reached via B or C), E is 3 hops.

---

<!-- NEW: Week 14 recap card -->

# Recap: Week 14, Shortest Path & P/NP

- **Dijkstra:** greedy, settle-and-never-revisit, $O((V+E)\log V)$ - correct only with non-negative weights.
- **Bellman-Ford:** relax every edge $V-1$ times, $O(VE)$ - correct even with negative weights, and detects negative cycles.
- **P** = solvable in polynomial time. **NP** = a candidate solution is *verifiable* in polynomial time - the campus scavenger hunt is in NP but believed not in P.

---

<!-- NEW: Week 14 new practice problem, Dijkstra -->

# New Practice: the Night Shuttle Network

CampusNav's night shuttle stops P, Q, R, S, T, with one-way segments:
P&rarr;Q = 3, P&rarr;R = 1, R&rarr;Q = 1, Q&rarr;T = 2, R&rarr;S = 4,
S&rarr;T = 1, Q&rarr;S = 5. Run Dijkstra from P. Find $\delta(P, T)$
and the route that achieves it.

---

<!-- NEW: Week 14 worked solution, Dijkstra -->

# Worked Solution: Dijkstra Trace

Settle P(0). Frontier: Q=3, R=1. Settle **R**(1) - relax R&rarr;Q:
$Q=\min(3,1+1)=2$; relax R&rarr;S: $S=\min(\infty,1+4)=5$. Settle
**Q**(2) - relax Q&rarr;T: $T=\min(\infty,2+2)=4$; relax Q&rarr;S:
$S=\min(5,2+5)=5$ (no change). Settle **T**(4) - the smallest
remaining tentative distance, so it settles before S; T has no
outgoing edges to relax. Settle **S**(5) last.

$$\delta(P, T) = 4 \quad \text{(route } P \to R \to Q \to T\text{)}$$

---

<!-- NEW: Week 14 new practice problem, P/NP -->

# New Practice: Classify These Two

(a) "Verify that a proposed graduation seating chart has no two
*listed feuding families* seated next to each other" (a candidate
chart is given). (b) "Find *any* seating chart for a full guest list
such that no two feuding families sit adjacent, given the full list
of feuding pairs." Classify each: in P, in NP (but not known to be in
P), or both.

---

<!-- NEW: Week 14 worked solution, P/NP -->

# Worked Solution: P vs. NP, Applied

**(a)** is in **P** - and it's easy to solve outright, not just
verify: scan the seating order once, checking each adjacent pair
against the feuding list, $O(n)$ - trivially both solvable and
verifiable in polynomial time.

**(b)** is in **NP** (a candidate chart, once proposed, is checked
exactly as in (a), in polynomial time) but is **not known to be in
P** - it has the same shape as graph-coloring / independent-set
problems (seats form a cycle graph, feuding pairs become "must
differ" constraints), which are NP-complete in general. Finding a
chart from scratch has no known efficient algorithm; checking one
someone hands you does.

---

<!-- topic-cluster mistakes, D&C and Greedy - folds in the cut Check-Yourself pair as a worked-instance bullet -->

# Common Final-Exam Mistakes: D&C and Greedy

- **Misapplying the Master theorem** to a recurrence that doesn't divide the problem size - e.g. $T(n) = T(n-1) + O(n)$ has no $b$ to plug in; it must be expanded/summed directly, not run through the three Master-theorem cases.
- **Assuming greedy always finds the optimal solution.** The {1, 3, 4} coin-denomination counterexample (Week 10) exists precisely to break this assumption - greedy needs a proof (an exchange argument), not just an intuition.
- **Sorting by the wrong key** in a greedy scheduler - earliest-*finish*-time is what makes the room-booking assistant provably optimal; sorting by start time or duration instead does not carry the same guarantee.
- **Worked instance:** $T(n) = T(n-1) + O(n)$ has no valid $b$ to substitute, so the Master theorem simply doesn't apply. Expanding directly: $O(n)+O(n-1)+\dots+O(1)$, an arithmetic series summing to $O(n^2)$ - the same shape as unoptimized linear recursion, not a divide-and-conquer split at all.

---

<!-- topic-cluster mistakes, Dynamic Programming - folds in the cut Check-Yourself pair -->

# Common Final-Exam Mistakes: Dynamic Programming

- **Treating memoization and tabulation as different algorithms.** They implement the exact same recurrence - one top-down with a cache, one bottom-up with a table - not two competing techniques.
- **Skipping the base row/column** when hand-filling a DP table. `dp[0][*]` and `dp[*][0]` anchor every later cell - get them wrong and every downstream cell is wrong too.
- **Confusing 0/1 knapsack with unbounded (reuse-allowed) knapsack.** Reading from the *same* row $i$ instead of the previous row $i-1$ when excluding item $i$ silently allows item $i$ to be reused.
- **Worked instance:** in a 0/1 knapsack table, "exclude item $i$" must read row $i-1$, never row $i$. Row $i-1$ is the best value using only items $1,\dots,i-1$, before item $i$ existed; reading from row $i$ would let a cell that already includes item $i$ feed into itself, effectively allowing reuse - exactly the difference between 0/1 knapsack and unbounded knapsack.

---

<!-- topic-cluster mistakes, Graphs and Shortest Paths - folds in the cut Check-Yourself pair -->

# Common Final-Exam Mistakes: Graphs and Shortest Paths

- **Defaulting to an adjacency matrix regardless of density.** At real campus scale (~300 nodes, ~600 edges) the matrix costs 60x more space than a list - matrix vs. list is a density decision, never a habit.
- **Assuming Dijkstra is safe whenever there's "no negative cycle."** A single negative *edge*, with no cycle at all, is already enough to break Dijkstra - only Bellman-Ford is safe once any weight can be negative.
- **Forgetting an undirected edge needs an entry in *both* endpoints' adjacency lists** - missing one direction silently breaks traversal from the other side.
- **Worked instance:** a single negative edge, with zero cycles anywhere, already breaks Dijkstra - the $S, A, B, C$ counterexample from Week 14 reported $\delta(S,C)=2$ when the true value is $-1$. Negative cycles are a separate failure mode (they break even Bellman-Ford's own notion of "shortest"); Dijkstra's unsafety needs only one negative edge, cycle or not.

---

<!-- topic-cluster mistakes, P vs NP - folds in the cut Check-Yourself pair -->

# Common Final-Exam Mistakes: P vs. NP

- **"NP means not solvable in polynomial time."** False - NP means a *candidate solution* can be verified in polynomial time. Every problem in P is also in NP.
- **Assuming one graph problem's efficiency generalizes to all graph problems.** Shortest path is in P; the campus scavenger hunt (Hamiltonian-path-shaped) is NP-hard - same campus, two entirely different problem shapes.
- **Confusing "NP-hard" with "proven outside P."** P =? NP is still open - nobody has proven an NP-complete problem *cannot* have a polynomial algorithm, only that none has ever been found.
- **Worked instance:** if P = NP were ever proven, every NP-complete problem - the campus scavenger hunt included - would instantly gain a polynomial-time algorithm, by the very definition of NP-completeness (every problem in NP reduces to it in polynomial time). Resolving the open question would reclassify all of them at once.

---

<!-- SLOT N+1: "What to Focus On Next" (Act 4 / CLOSE), replaces Limits - reflective, since this is the last week -->

# What to Focus On Next

<div class="limits">
There is no Week 16 "Limits" slide to write, so this is a different kind
of close. Week 1 asked: "What separates a method that just happens to
work from one we can trust, measure, and reuse?" Every week since has
been one more answer to that question - Big-O, recursion, sorting,
searching, then D&C, greedy, DP, graphs, shortest paths. That question
does not end with this course. It's the same question a technical
interview asks. It's the same question your database, machine learning,
systems, and networks courses will assume you can already answer,
without re-teaching it. What carries forward isn't any single algorithm -
it's the habit of asking, for any new problem: what's the shape of this,
which paradigm fits, and can I prove it's both correct and fast?
</div>

---

<!-- SLOT N+2: Bridge (Act 4 / CLOSE), repurposed as a closing note - no next week -->

# This Course Ends Here

<div class="driving-q">The techniques don't.</div>

---

<!-- SLOT N+3: Summary (Act 4 / CLOSE) -->

# Summary

- Weeks 9-14 gave you four general paradigms - D&C, greedy, DP, and graph
  algorithms - the toolkit for *inventing* a solution to a new problem,
  not just applying a memorized one.
- Correctness is never assumed: exchange arguments, Master theorem
  cases, and the P vs. NP boundary are all ways of proving a claim, not
  just believing it.
- CampusNav went from a printed room list in Week 1 to a full
  wayfinding-and-scheduling assistant by Week 14 - every feature was
  something you could justify, not just something that ran.
- **Review:** revisit your own Assignment 3 and 4 submissions - they're
  worked instances of exactly these techniques, with your own mistakes
  already found and corrected.
- **Prepare:** rest before the exam. There is no new reading this week.

---

<!-- SLOT N+4: Thank You (Act 4 / CLOSE) - course-closing, slightly celebratory -->
<!-- _class: end -->

# Thank You - and Congratulations on Finishing the Semester

<!--
notes: This is the last slide of the last class. Say it plainly: "Fifteen
weeks ago, a student was lost looking for Room 703 in Building A. You now know exactly
what it takes to build the algorithm that finds it - and prove it's
right." Wish them well on the exam, and beyond it.
-->
