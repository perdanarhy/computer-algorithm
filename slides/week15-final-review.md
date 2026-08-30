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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
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
- **Week 12, DP II (LCS):** the same DP idea, extended from one sequence to comparing two at once.
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

<!-- Act 3 / BUILD: "Check yourself" expanded into the full review (short review variant, SPINE.md) -->

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

- Adjacency **matrix**: $O(V^2) = 50^2 = 2{,}500$ cells, regardless
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
fundamentally different (Hamiltonian-path/TSP-shaped) problem;
solving one does not give an efficient algorithm for the other.

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

<!-- _class: section -->

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
weeks ago, a student was lost looking for 성파703. You now know exactly
what it takes to build the algorithm that finds it - and prove it's
right." Wish them well on the exam, and beyond it.
-->
</content>
