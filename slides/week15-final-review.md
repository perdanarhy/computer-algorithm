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
- **Format:** written questions and short derivations, in the same style as this semester's assignments and worksheets.
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
5. **Graph Representation** - adjacency list vs. matrix, and why the choice matters.
6. **Shortest Path** - Dijkstra, Bellman-Ford, and where each one breaks.
7. **P vs. NP** - polynomial-time solvable vs. polynomial-time verifiable.

---

<!-- Review Question 1 - Week 9, D&C / Master Theorem -->

# Review Question 1

CampusNav's D&C "best free-time block" feature splits the day in half,
recurses on each half, and spends $O(n)$ work combining the two halves'
answers.

1. Write its recurrence.
2. Solve it with the Master theorem - what's the running time, and which case applies?

---

# Answer 1

- Recurrence: $T(n) = 2T(n/2) + O(n)$.
- Compare $f(n) = O(n)$ against $n^{\log_b a} = n^{\log_2 2} = n^1$ - they match in order, so this is **Master theorem case 2**.
- Running time: $T(n) = O(n \log n)$.

---

<!-- Review Question 2 - Week 10, Greedy -->

# Review Question 2

CampusNav's room-booking scheduler greedily grants the request with the
earliest finish time, and an exchange argument proves this is always
optimal. Separately, CampusNav's "campus points" reward uses denominations
**{1, 3, 4}** and greedily makes change for 6 points.

1. Show that greedy change-making fails here.
2. Name the property earliest-finish scheduling has that general coin systems don't.

---

# Answer 2

- Greedy for 6 points: take 4, then 1, then 1 → **3 coins** (4+1+1).
- Optimal: 3 + 3 → **2 coins**. Greedy is provably wrong here.
- Earliest-finish scheduling has an **exchange-argument structure**: any optimal solution can be rearranged, one swap at a time, into the greedy solution without losing value. The {1, 3, 4} denomination set has no such guarantee - this is exactly the misconception "greedy always finds the optimal solution."

---

<!-- Review Question 3 - Week 11, DP I -->

# Review Question 3

CampusNav's Tour Planner picks activities to maximize total enjoyment
inside a free block without running late - the same shape as 0/1
knapsack.

1. Write the recurrence for `dp[i][w]` (best enjoyment using the first `i` activities, time budget `w`).
2. Why do memoization and tabulation always agree on the answer?

---

# Answer 3

- `dp[i][w] = dp[i-1][w]` if `duration[i] > w`, else
  `dp[i][w] = max(dp[i-1][w], enjoyment[i] + dp[i-1][w - duration[i]])`.
- Memoization (top-down) and tabulation (bottom-up) are **two implementations of the same recurrence** - one fills the table on demand via recursive calls, the other fills it in a fixed order - not two different algorithms. Same subproblems, same answer, same asymptotic cost.

---

<!-- Review Question 4 - Week 12, DP II / LCS -->

# Review Question 4

Two students' course-code sequences, for the study-buddy matcher:

`X = [CS1, DB1, ALG1]`
`Y = [DB1, ALG1, NET1]`

1. Write the LCS recurrence.
2. Find the longest common subsequence by hand.

---

# Answer 4

- Recurrence: if `X[i] == Y[j]`, `dp[i][j] = dp[i-1][j-1] + 1`;
  otherwise `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.
- `DB1` and `ALG1` appear, in order, in both sequences; `CS1` and `NET1` don't line up.
- **LCS = [DB1, ALG1]**, length 2 - the two students share a real, orderable course history, which is exactly what the matcher needs.

---

<!-- Review Question 5 - Week 13, Graph Representation -->

# Review Question 5

CampusNav's campus graph has 8 buildings and 10 walkways - sparse, like a
real campus. A teammate proposes an adjacency **matrix** "for simplicity."

Is that a good default here? Justify with space complexity.

---

# Answer 5

- An adjacency matrix costs $O(V^2)$ space regardless of how many edges actually exist: $8^2 = 64$ cells to represent 10 real walkways - mostly wasted, mostly zeros.
- An adjacency list costs $O(V + E)$: about 18 entries for the same graph.
- For a sparse graph, the list wins on space (and on iterating a node's neighbors). A matrix only pays off for dense graphs or when $O(1)$ edge-existence queries matter more than memory - "adjacency matrix is always fine" is the misconception, not the rule.

---

<!-- Review Question 6 - Week 14, Shortest Path + P vs. NP -->

# Review Question 6

CampusNav adds a "covered-walkway credit": a negative-weight edge that
rewards a rainy-day shortcut. Dijkstra starts returning wrong shortest
paths.

1. Why does Dijkstra break with a negative edge, and what algorithm fixes it?
2. Separately: why is "visit every building exactly once" (the scavenger hunt) a fundamentally *different kind* of problem from shortest path, even though both are about paths on the same graph?

---

# Answer 6

- Dijkstra finalizes each node's distance the moment it's popped as the current minimum, assuming no later edge could ever improve it. A **negative edge encountered later can retroactively beat an already-"settled" distance** - the assumption breaks, and the algorithm returns a wrong (too-high) answer without any error.
- **Bellman-Ford** fixes this by relaxing every edge $V-1$ times, allowing distances to keep improving until they're correct (as long as there's no negative cycle).
- Shortest path is in **P**: a known polynomial-time algorithm exists. The scavenger-hunt route is Hamiltonian-path-shaped - no known polynomial-time algorithm exists, though a *proposed* route can be **verified** in polynomial time. That verifiable-vs-solvable gap is precisely what P vs. NP asks - not "NP means it can't be solved in polynomial time," which is the common misconception.

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
