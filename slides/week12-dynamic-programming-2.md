---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 12: Dynamic Programming II

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Ask: "Has anyone used `git diff`, or wondered how it decides what changed between two versions of a file, line by line?" Take a few answers. Say: "By the end of today, you'll know the exact algorithm behind that - and it's the same one CampusNav uses to match study buddies."
-->

---

<!-- SLOT 2: Where we are -->

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
<div class="wk now"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at Wk 12. Say: "Last week DP solved one sequence at a time. Today it learns to compare two." -->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** Week 11 solved 1-D optimization problems with dynamic programming - the Tour Planner (a knapsack-shaped problem) and the climbing-stairs counter - by breaking one sequence of choices into overlapping subproblems along a single table.
- **Last week left broken:** CampusNav's next feature doesn't optimize over *one* sequence - it needs to compare *two different* sequences against each other. Week 11's 1-D table has nowhere to put a second sequence.

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# CampusNav Can't Find Study Buddies

<div class="pain">

Minji and Junho both use CampusNav. Each has a weekly class list, in
order: Monday's first class, then the next, and so on. CampusNav
wants to tell them "you two have a lot of classes in common - study
together!" First it tries: are their two lists <em>exactly</em> the same,
in the same order? Almost never true, so it says "no match" for
nearly everyone. Then it tries: do they have a <em>run</em> of
back-to-back identical classes? Still almost nothing - Minji and
Junho actually share four classes, just scattered across different
days and periods. CampusNav tells them they have nothing in common.
It's wrong.

</div>

<!-- notes: Do not say "subsequence" or "LCS" yet. Let the class feel that both naive checks fail for a reason they can't yet name. -->

---

# How Many Matches Are We Missing?

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">"Exact same list" check</div>
  <div class="bar-track"><div class="bar-fill long" style="width: 4%"></div></div>
  <div class="bar-value">finds almost no pairs</div>
</div>
<div class="bar-row">
  <div class="bar-label">"Back-to-back run" check</div>
  <div class="bar-track"><div class="bar-fill long" style="width: 18%"></div></div>
  <div class="bar-value">still misses most real overlap</div>
</div>
<div class="bar-row">
  <div class="bar-label">Today's technique</div>
  <div class="bar-track"><div class="bar-fill short" style="width: 95%"></div></div>
  <div class="bar-value">finds the real shared courses</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the gap, not the exact percentages.</div>

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- A "must be identical" check makes CampusNav's study-buddy feature suggest almost nobody - a feature that quietly does nothing.
- A "must be a back-to-back block" check still misses most real students, because shared classes rarely land consecutively by coincidence.
- Every wrong "no match" is a real student who never finds a study partner they actually had.

<div class="why">
<strong>In industry:</strong> this exact comparison - find the longest
matching stretch between two sequences, in order, gaps allowed -
is what powers <code>diff</code> and Git's line-by-line change
detection, spell-checkers, and DNA sequence alignment in
bioinformatics. It is also one of the most frequently asked dynamic
programming questions in technical interviews.
</div>

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"Given two sequences, how do we find the longest sequence of elements that appears in both - in the same relative order, but not necessarily touching - and reconstruct it, not just its length?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. Distinguish a "subsequence" from a "substring," and explain why this problem needs the former.
2. Derive the recurrence relation for the longest common subsequence (LCS) and justify both of its cases.
3. Build a complete 2-D DP table for two sequences and use traceback to reconstruct the actual longest common subsequence.
4. State and justify LCS's time and space complexity.

---

# This Week, In the Three-Goals Table

<div class="thread">A reminder from Week 1: this is still goal 2.</div>

| # | Goal (from the syllabus) | Where |
|---|---|---|
| 1 | Analyze correctness and efficiency precisely | Weeks 2-3, 5, 7 |
| 2 | Design algorithms with general paradigms (D&C, greedy, DP) | Weeks 4, 9-**12** |
| 3 | Apply classic algorithms and reason about P vs. NP | Weeks 5-7, 13-14 |

LCS is dynamic programming's second and final act this semester -
the paradigm applied to *two* sequences at once instead of one.

---

<!-- Key Words Today, session 1 (kept after Act 1 / MOTIVATE per SPINE.md's no-definition-before-slot-8 rule) -->

# Key Words Today

- **Sequence:** an ordered list of items - letters, course codes, anything where position matters.
- **Subsequence:** a sequence built by deleting zero or more items from another, *without* reordering what's left.
- **Substring:** a subsequence whose kept items are also *contiguous* - no deletions allowed in the middle.
- **Common subsequence:** a sequence that is a subsequence of two (or more) different sequences at once.

<!-- notes: Read each term aloud once. Say: "Watch that third one closely - today's whole topic hinges on the difference between rows two and three." -->

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New

<div class="thread">You just felt the pain. Now: who else felt it, and what did they do?</div>

- **1970, bioinformatics:** Needleman and Wunsch needed to compare
  two DNA or protein sequences for similarity - mutations insert,
  delete, and shift letters, so exact alignment almost never happens.
- **1976, software tools:** Hunt and McIlroy built the algorithm
  behind Unix `diff` - comparing two versions of a file line by line
  to report the minimal set of changes between them.
- Both problems have the *same shape*: two sequences, find the
  longest stretch they share in order, without demanding they touch.

---

# The Pattern Behind Both Fields

<div class="thread">Bioinformatics and software tools, decades apart. Same underlying idea.</div>

<div class="why">
Neither field invented a new trick from scratch - both are solved by
the same dynamic programming recurrence you'll derive today. A tool
built to compare genetic mutations and a tool built to compare source
code file revisions turn out to be the exact same algorithm underneath,
wearing two entirely different names.
</div>

---

# A Motivating Example: COMPUTER and COMMUTER

<div class="thread">Two words. One idea, precisely, coming up next.</div>

Two words: **COMPUTER** and **COMMUTER**. Without counting
letter-by-letter position, the longest run of letters that lines up,
in the same left-to-right order in both words, is not obviously "the
letters both words have" - some skipping is required to line it up.

Delete the **P** from COMPUTER and one **M** from COMMUTER, and both
become **C-O-M-U-T-E-R** - 7 letters, same relative order, in both
original words, even though those 7 letters are not all
next-to-each-other in either original word.

That's today's whole subject, precisely.

---

<!-- SLOT 9: Core concept -->

# Subsequence & Common Subsequence: Definition

<div class="thread">Fifty years of tools, and the COMPUTER/COMMUTER example, point at two words. Here they are, precisely.</div>

> A **subsequence** of a sequence $S$ is any sequence obtainable by
> deleting zero or more elements from $S$ **without changing the
> relative order** of the remaining elements.

> A **common subsequence** of $X$ and $Y$ is a sequence that is a
> subsequence of *both*. The **longest common subsequence (LCS)** is
> the longest such sequence - its length, and the sequence itself.

---

# Subsequence vs. Substring

<div class="thread">One word swapped for another, one requirement dropped.</div>

**Crucial contrast:** a **substring** is a subsequence whose kept
elements are also *contiguous* (no gaps). "ACE" is a subsequence of
"ABCDE" but **not** a substring of it. LCS never requires contiguity.
Same distinction, on real letters: "BD" is a subsequence of "ABCBD"
(delete A and C) but not a substring of it (C sits between B and D).

<div class="graphviz-note">CLRS (Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>) 4th ed - Ch 14, Section 14.4 (Longest common subsequence).</div>

---

<!-- Key Words Today, session 2 -->

# Key Words Today

- **Prefix:** the first $i$ elements of a sequence, written $X[1..i]$ - the DP table's "how far in" axis.
- **Optimal substructure:** an optimal solution to a problem contains optimal solutions to its subproblems - what makes DP possible at all.
- **Overlapping subproblems:** the same smaller subproblem gets needed again and again - what makes a table (not fresh recursion) worthwhile.
- **Recurrence relation:** the equation defining a table cell's value from other cells already computed.

<!-- notes: Read each term aloud. Say: "These four words are what every DP week, including last week, has secretly been built from." -->

---

<!-- Act 3 / BUILD -->

# The Problem, Precisely - and Why Not Brute-Force

<div class="thread">Time to build the actual algorithm.</div>

**Input:** two sequences $X = \langle x_1, \dots, x_m \rangle$ and
$Y = \langle y_1, \dots, y_n \rangle$. **Output:** the length of their
longest common subsequence - **and** the actual subsequence itself,
reconstructed.

A brute-force idea: generate every subsequence of $X$, check each
against $Y$. $X$ has $2^m$ subsequences - one for every possible
subset of its positions kept or dropped. For CampusNav's course lists
($m \approx 12$), that's already over 4,000 checks, and every
additional class either student adds **doubles** that count - the
same exponential shape as Week 4's runaway recursion trees and Week
11's naive Fibonacci call tree. We need the answer without ever
generating a single subsequence by hand.

---

# Optimal Substructure: The Matching Case

<div class="thread">The key insight, argued carefully - not asserted.</div>

Let $L(i,j)$ = length of the LCS of $X[1..i]$ and $Y[1..j]$.

**If $x_i = y_j$:** this matched pair *can always* be the last
element of *some* LCS of $X[1..i], Y[1..j]$ - if an optimal common
subsequence didn't already end there, we could append this shared
element to it and get a strictly longer one, a contradiction (the
contradiction move from Week 7).

$$
L(i,j) = L(i-1, j-1) + 1
$$

---

# Optimal Substructure: The Mismatch Case

<div class="thread">The other half of the argument.</div>

**If $x_i \ne y_j$:** the LCS cannot use *both* $x_i$ and $y_j$ as
its final matched element - they aren't equal, so they can't be the
*same* matched pair. So the best answer either drops $x_i$ or drops
$y_j$ from consideration, whichever choice leaves the longer match:

$$
L(i,j) = \max\big(L(i-1,j),\ L(i,j-1)\big)
$$

Dropping *both* $x_i$ and $y_j$ at once is never necessary - keeping
at least one of them available can only help, never hurt.

---

# The Recurrence, Formalized

<div class="thread">Same two cases, now as one equation.</div>

$$
L(i,j) =
\begin{cases}
0 & \text{if } i = 0 \text{ or } j = 0 \\
L(i-1,j-1) + 1 & \text{if } i,j > 0 \text{ and } x_i = y_j \\
\max\big(L(i-1,j),\ L(i,j-1)\big) & \text{if } i,j > 0 \text{ and } x_i \ne y_j
\end{cases}
$$

**Base case, why 0:** an empty prefix (of either sequence) shares no
elements with anything - there's nothing to match. **A symmetry
worth noting:** swapping which sequence is labeled $X$ and which is
$Y$ transposes the table's shape, but changes neither the recurrence
nor the final LCS length.

---

# Why Row-by-Row Filling Works

<div class="thread">The equation only helps if we can actually compute it, in order.</div>

Every cell $L(i,j)$ depends only on cells *above* it ($L(i{-}1,j)$),
*to its left* ($L(i,j{-}1)$), or *diagonally above-left*
($L(i{-}1,j{-}1)$) - never on a cell below or to the right of it.

- Fill row 0 and column 0 first (the base case), then sweep the
  table row by row, left to right: every dependency a cell needs is
  already computed by the time that cell is reached.

<div class="bignotation">(m+1) × (n+1) cells, each computed in O(1)</div>

---

# Building the Table: The Procedure

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Make an (m+1) × (n+1) grid. Row 0 and column 0 are the empty-prefix baseline: fill them with 0.</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">For i = 1 to m, for j = 1 to n (row by row): if X[i] = Y[j], set L(i,j) = L(i-1,j-1) + 1.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Otherwise, set L(i,j) = max(L(i-1,j), L(i,j-1)).</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">L(m,n), the bottom-right corner, is the length of the LCS of the full X and Y.</div></div>
</div>

---

<!-- Idea + pseudocode: memoization vs. tabulation for LCS -->

# Memoization vs. Tabulation for LCS

<div class="thread">Two bookkeeping styles, the exact same L(i,j) recurrence.</div>

<div class="two-col">
<div>

**Memoization (top-down)**
```text
LCS_MEMO(X, Y, i, j, cache):
    if i == 0 or j == 0:
        return 0
    if cache[i][j] is set:
        return cache[i][j]
    if X[i] == Y[j]:
        cache[i][j] =
          LCS_MEMO(X,Y,i-1,j-1,cache) + 1
    else:
        cache[i][j] = max(
          LCS_MEMO(X,Y,i-1,j,cache),
          LCS_MEMO(X,Y,i,j-1,cache))
    return cache[i][j]
```

</div>
<div>

**Tabulation (bottom-up)**
```text
LCS_TAB(X, Y, m, n):
    L[0][*] = 0, L[*][0] = 0
    for i = 1 to m:
      for j = 1 to n:
        if X[i] == Y[j]:
            L[i][j] = L[i-1][j-1] + 1
        else:
            L[i][j] = max(L[i-1][j],
                          L[i][j-1])
    return L[m][n]
```

</div>
</div>

Same recurrence, same $O(mn)$ distinct subproblems, same $O(mn)$
time. Only the direction differs - exactly like Week 11's Fibonacci.

---

<!-- Dense worked example, LCS, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">LCS · worked example 1 of 3 (simple)</div>

# The Smallest Case: X = AC, Y = CA

<div class="wx-top">
<div class="lead">Two letters each. Enough to need the full recurrence - and enough to already show a tie.</div>
<div class="goalbox"><span class="k">Goal</span>Fill the 3&times;3 table of L(i,j) using only the two-case recurrence.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">X=AC, Y=CA. Base row/column are 0. Fill L(1,1), L(1,2), L(2,1), L(2,2) in order.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Fill the cells</div>
<div class="wx-body">L(1,1): A vs C, mismatch, max(0,0)=0. L(1,2): A vs A, match, L(0,1)+1=1. L(2,1): C vs C, match, L(1,0)+1=1. L(2,2): C vs A, mismatch, max(1,1)=1.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Result</div>
<div class="wx-body">LCS length = 1. Two different one-letter answers both work ("A" or "C") - a tie.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>LCS(AC, CA) = 1 - already a tie between two different valid answers, previewing today's harder tier.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Even a 2-letter pair needs the full recurrence, not intuition - and already shows LCS answers aren't always unique.</div></div>

---

<!-- Dense worked example, LCS, moderate tier (full DP table, too large for a card - shown full-width) -->
<!-- _class: dense -->

<div class="eyebrow">LCS · worked example 2 of 3 (moderate)</div>

# Full Trace: X = ALGDP, Y = ALGRDP

<div class="wx-top">
<div class="lead">The first five and six course codes of Minji's and Junho's real sequences.</div>
<div class="goalbox"><span class="k">Goal</span>Fill all 42 cells using only the recurrence, row by row.</div>
</div>

<div class="tracetable">
<div class="row"><div class="rowlabel"></div><div class="cell empty">&#949;</div><div class="cell">A</div><div class="cell">L</div><div class="cell">G</div><div class="cell">R</div><div class="cell">D</div><div class="cell">P</div></div>
<div class="row"><div class="rowlabel">&#949;</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">A</div><div class="cell">0</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div></div>
<div class="row"><div class="rowlabel">L</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">2</div><div class="cell">2</div><div class="cell">2</div><div class="cell">2</div></div>
<div class="row"><div class="rowlabel">G</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">3</div><div class="cell">3</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">D</div><div class="cell">0</div><div class="cell hl2">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">3</div><div class="cell">4</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">P</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">3</div><div class="cell">4</div><div class="cell hl">5</div></div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>L(5,6) = 5 - filled left to right, row by row, using only the two-case recurrence, 42 cells total.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Every cell only ever needs three neighbors already on the table - never a fresh recursive call.</div></div>

---

<!-- Dense worked example, LCS, moderate tier, continued: how two of its cells were filled -->
<!-- _class: dense -->

<div class="eyebrow">LCS · worked example 2 of 3 (moderate), continued</div>

# Full Trace, Continued: Reading Two Key Cells

<div class="wx-top">
<div class="lead">Same table as the previous slide. Here's exactly how two of its cells were filled.</div>
<div class="goalbox"><span class="k">Goal</span>Show the recurrence's two cases at work on real cells from the table.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Matches extend the diagonal</div>
<div class="wx-body">L(2,2): X[2]=L, Y[2]=L, match &rarr; L(1,1)+1 = 1+1 = 2.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Mismatches take the larger neighbor</div>
<div class="wx-body">L(4,1) (gold): X[4]=D, Y[1]=A, mismatch &rarr; max(L(3,1)=1, L(4,0)=0) = 1 - the up-neighbor wins.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Final answer</div>
<div class="wx-body">Bottom-right (blue): L(5,6) = 5 - the full LCS of ALGDP and ALGRDP has length 5.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Every cell in the table follows the same two-case recurrence, whether it's a clean diagonal match or a mismatch reaching sideways.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Reading a filled table backward, cell by cell, is exactly how you'd check a claimed answer's work.</div></div>

---

<!-- Dense worked example, LCS, harder tier (traceback + tie handling) -->
<!-- _class: dense -->

<div class="eyebrow">LCS · worked example 3 of 3 (harder)</div>

# Traceback: Reconstructing the Actual Sequence

<div class="wx-top">
<div class="lead">The table gives a length. Traceback gives the actual matched letters - and shows what a tie really means.</div>
<div class="goalbox"><span class="k">Goal</span>Walk L(5,6) backward to (0,0), and find a genuine tie elsewhere in the same table.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The procedure</div>
<div class="wx-body">Start at (m,n). If X[i]=Y[j], record it, move diagonally to (i-1,j-1). Otherwise move to whichever of (i-1,j)/(i,j-1) is larger. Stop at i=0 or j=0; reverse what was recorded.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Traced on ALGDP/ALGRDP</div>
<div class="wx-body">(5,6)P&rarr;(4,5)D&rarr;(3,4) mismatch: L(2,4)=2 vs L(3,3)=3, detour left&rarr;(3,3)G&rarr;(2,2)L&rarr;(1,1)A. Reversed: A,L,G,D,P - 5 characters, matching L(5,6)=5 exactly.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">A genuine tie elsewhere</div>
<div class="wx-body">L(4,4) (row D, col R): neighbors L(3,4)=3 and L(4,3)=3, equal. If traceback passed through here, either direction gives a different, equally valid length-3 common subsequence.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">What a tie means</div>
<div class="wx-body">Not a bug: it's the table correctly reporting more than one longest common subsequence exists. Any consistent tie-breaking rule (e.g. "prefer up") produces one valid answer; a different rule produces a different, equally valid one.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Traceback reconstructs A-L-G-D-P, not just the number 5 - and the table's one genuine tie (L(4,4)) shows ties are a real, expected feature of LCS, not an edge case to avoid.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>A DP table doesn't just prove a length is optimal - traceback is what turns that proof into the actual answer.</div></div>

---

# Complexity

<div class="thread">Last piece: how much does this cost? (Big-O can take more than one variable - $O(mn)$ tracks two input sizes at once, not just one $n$.)</div>

- **Time: O(mn).** Each of the (m+1)(n+1) cells is filled in O(1) from already-computed neighbors - total work is proportional to the number of cells.
- **Space: O(mn).** The full table must be kept if you need the traceback (the actual subsequence). **Refinement:** if only the *length* is needed, only the previous row must be kept - $O(\min(m,n))$ space. CampusNav's traceback needs the real string, so it keeps the full table.

<span class="bignotation">O(mn) time · O(mn) space (with traceback)</span>

Compare to brute force's $O(2^m \cdot n)$ - checking every subsequence
of $X$ against $Y$. DP turns exponential into polynomial, same as
every paradigm this course has built since Week 9.

---

<!-- SLOT N-2: Worked example -->

# CampusNav: Find a Study Buddy

<div class="thread">Everything above, on the actual feature.</div>

Minji's and Junho's real weekly course-code sequences:

$$
X = \texttt{ALGDPGRPHSRT} \qquad Y = \texttt{ALGRDPGRAPH}
$$

The short pair just traced by hand, `ALGDP` / `ALGRDP`, is literally
the first five and six codes of these two real sequences - you've
already solved a prefix of CampusNav's real problem. Building the
full 12×11 table and traceback for these exact sequences is
**Assignment 4, Task 1** (released Week 13, due Week 15). Once solved, CampusNav can
finally tell Minji and Junho exactly which courses they share, and
in what order - not "no match."

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Subsequence vs. substring.** LCS does **not** require the shared
  elements to be contiguous. It's tempting because the word "sequence"
  sounds like it should mean an unbroken run - but "ACE" is a valid
  common subsequence of "ABCDE" and "XAYCZE" even though neither
  contains "ACE" as a contiguous block. If you catch yourself checking
  for a shared *block* of characters, you've quietly solved the wrong
  (easier, less useful) problem.
- **Memoization vs. tabulation.** A confusion this course has now
  flagged twice - Week 11 and today. They're the same recurrence - the
  top-down (memoized) version caches results the first time they're
  needed; the table filled by hand above is the bottom-up (tabulated)
  version of the exact same $L(i,j)$ equation. The two code blocks a
  few slides back are proof: same cases, same base case, same final
  answer - only the direction of computation differs.

---

<!-- Key Words Today, session 3 -->

# Key Words Today

- **LCS (Longest Common Subsequence):** the longest sequence that is a subsequence of two given sequences at once.
- **Traceback:** walking a filled DP table backward from its corner to reconstruct an actual optimal solution, not just its value.
- **Edit distance / sequence alignment:** related problems (how many insertions/deletions/substitutions turn one sequence into another) solved with a close cousin of today's recurrence - used in `diff`, spell-checkers, and DNA comparison.
- **2-D DP:** dynamic programming where the subproblem needs two indices, one per sequence - today's structural upgrade from Week 11's 1-D tables.

<!-- notes: Read each term aloud. Say: "Edit distance is the same idea, one small step further - CLRS covers it right after LCS if you want to go deeper." -->

---

# LCS vs. Edit Distance: How Related?

<div class="thread">The Key Words slide just named a close cousin. Here's exactly how close.</div>

Edit distance counts insertions, deletions, and substitutions needed
to turn one string into another. A longer LCS generally means a
smaller edit distance - more shared structure means fewer changes
needed - but the two are related, not identical: edit distance's
recurrence also allows a **substitution** move (swap one character for
another) that LCS's recurrence has no equivalent for - LCS only ever
matches exactly or drops a character. So the two problems are solved
by closely related, but not identical, recurrences. CLRS covers edit
distance (sequence alignment) as the natural next topic after LCS,
for exactly this reason.

---

# CampusNav: One App, Two DP Weeks

<div class="thread">Where Weeks 11-12 sit in the whole build.</div>

<div class="pipeline">
<div class="stage"><div class="h">Wks 1-7</div><div class="s">Directory lookup: sort + search the room list</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wks 9-10</div><div class="s">Free-time finder, room-booking scheduler</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wks 11-12</div><div class="s">Tour Planner (1-D DP), study-buddy matching (2-D DP)</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wks 13-14</div><div class="s">Campus map + Get Directions</div></div>
</div>

Two weeks, one paradigm, two shapes of table - CampusNav now
optimizes over one sequence *and* compares two.

---

# Why This Shows Up in Interviews, Too

<div class="thread">This isn't only about CampusNav.</div>

LCS is one of the most frequently asked dynamic programming
interview questions at every major tech company - precisely because
it forces you to justify a 2-D recurrence from scratch, not just
recite one. The same skeleton (define $L(i,j)$, find the recurrence,
fill a table, trace back) reappears in edit distance, sequence
alignment, and diff algorithms you will meet again outside this
course.

<div class="why">
Recognizing "two sequences, compare them, order matters, gaps
allowed" as an LCS-shaped problem on sight is the actual
transferable skill.
</div>

---

<!-- Preview/outlook, clearly not required this week -->

# Preview: One More Dimension of Choice

<div class="thread">Not required this week - a look at where 2-D DP goes next.</div>

CLRS's next dynamic-programming problem, **matrix-chain
multiplication** (§14.2), asks: given a chain of matrices to multiply
together, in what order should you group the multiplications
(parenthesize them) to do the fewest total scalar multiplications?
Define $m[i,j]$ = the minimum cost to multiply the chain from matrix
$i$ through matrix $j$, and split it at every possible point $k$:

$$
m[i,j] = \min_{i \le k < j} \Big( m[i,k] + m[k+1,j] + \text{cost of combining} \Big)
$$

LCS's recurrence only ever looks at three fixed neighbors - never
anywhere else in the table. Matrix-chain's recurrence must try
**every** split point $k$ between $i$ and $j$ before taking the
minimum, an extra inner loop at every single cell - here so the shape
looks familiar the moment it appears later in CLRS §14.2.

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 13 slot 4 -->

# What Two-Sequence DP Still Cannot Do

<div class="limits">
CampusNav can now optimize over one sequence (Week 11) and compare
two sequences side by side (Week 12) - but every table we've built
this whole course runs down arrays or strings: one line of data, or
two lines laid next to each other. CampusNav's biggest remaining
feature, actual walking directions across the real campus, isn't a
line at all - it's buildings and paths that branch, loop back, and
connect in many different ways at once. Nothing we have built
represents that yet.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 12 leaves **no way to represent a network of connected
places** unsolved. **Week 13, Graph Representation**, addresses it:
modeling CampusNav's buildings and walkways as nodes and edges for
the first time.

---

<!-- Where This Week Lives in CLRS, positioned immediately before Summary -->

# Where This Week Lives in CLRS

<div class="thread">One table, mapping today's topic to its exact source.</div>

| This week's topic | CLRS 4th ed |
|---|---|
| Longest common subsequence, the full derivation, recurrence, and traceback | Ch 14, §14.4 |

<div class="why">
<strong>If you want to go deeper</strong> (not required this week):
§14.2, matrix-chain multiplication - the "one more dimension of
choice" preview from a few slides ago, worked out in full; §14.5,
optimal binary search trees - a third DP problem shaped like LCS's
2-D table, applied to search-tree layout instead of sequence matching.
</div>

---

<!-- SLOT N+3: Summary -->

# Summary

- A **subsequence** allows gaps; a **substring** does not - LCS is
  built entirely on the former, never the latter.
- The recurrence: matching characters extend the diagonal by 1;
  mismatched characters take the better of dropping either character.
- **Traceback** reconstructs the actual LCS string, not just its
  length - walk backward from the table's corner, and a genuine tie
  means more than one correct answer exists.
- **Complexity:** O(mn) time and space (O(min(m,n)) space if only
  the length is needed).
- **New: Week 12 Check** - a short graded exercise on today's LCS
  technique, released now, due before Week 13 begins, **separate from
  Assignment 3** (Greedy & Divide-and-Conquer, released Week 10, due
  this week) - see `materials/assignments/week12-check.html`.

---

# Summary, Continued

- **Reading:** CLRS, Chapter 14 (Dynamic Programming), §14.4
  Longest Common Subsequence.
- **Prepare:** think about how you'd represent CampusNav's buildings
  and the walkways connecting them as data. Bring one idea to Week 13.
- **Reminder:** Assignment 3 (Greedy & Divide-and-Conquer) is due
  this week - submit via the course Learning Management System (LMS).

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
