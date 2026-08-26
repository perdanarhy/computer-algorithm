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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
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

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: What Do These Two Words Share?

<div class="thread">A quick warm-up. No formal method needed yet.</div>

Two words: **COMPUTER** and **COMMUTER**.

- Without counting letter-by-letter position, what is the *longest run of letters* you can find, **in the same left-to-right order in both words**, even if you have to skip a letter here and there to line them up?
- Is the answer the same as just "the letters both words have"? Try writing it out.

<!--
notes: Give students 30-45 seconds. Let a few call out answers. Most will find "COM_UTER" (skip the P/second-M) - 7 of 8 letters, in order, not touching.
Do not say "subsequence" yet. Let them describe it as "skipping a letter and still lining up."
-->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** Week 11 solved 1-D optimization problems with dynamic programming - the Tour Planner (a knapsack-shaped problem) and the climbing-stairs counter - by breaking one sequence of choices into overlapping subproblems along a single table.
- **Last week left broken:** CampusNav's next feature doesn't optimize over *one* sequence - it needs to compare *two different* sequences against each other. Week 11's 1-D table has nowhere to put a second sequence.

---

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Sequence:** an ordered list of items - letters, course codes, anything where position matters.
- **Subsequence:** a sequence built by deleting zero or more items from another, *without* reordering what's left.
- **Substring:** a subsequence whose kept items are also *contiguous* - no deletions allowed in the middle.
- **Common subsequence:** a sequence that is a subsequence of two (or more) different sequences at once.

<!-- notes: Read each term aloud once. Say: "Watch that third one closely - today's whole topic hinges on the difference between rows two and three." -->

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

<!-- _class: section -->

# This Week's Question

<div class="driving-q">"Given two sequences, how do we find the longest sequence of elements that appears in both - in the same relative order, but not necessarily touching - and reconstruct it, not just its length?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. Distinguish a "subsequence" from a "substring," and explain why this problem needs the former.
2. Derive the LCS recurrence relation and justify both of its cases.
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

<!-- NEW: session-1 close, previews Worksheet -->

# Coming Up: A Table, By Hand

<div class="thread">Next in this class: less listening, more filling in boxes.</div>

Later today, you and a partner will fill an entire LCS table by hand
for a short pair of strings, then perform the traceback together to
pull out the actual matching sequence.

Keep a pen ready.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did this idea come from?</div>

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

<div class="why">
Neither field invented a new trick from scratch - both are solved by
the same dynamic programming recurrence you'll derive today.
</div>

---

# Back to the Warm-Up: Now Let's Be Precise

<div class="thread">"COM_UTER" felt right. Let's say exactly why.</div>

**COMPUTER** = C, O, M, P, U, T, E, R
**COMMUTER** = C, O, M, M, U, T, E, R

Delete the **P** from COMPUTER and one **M** from COMMUTER, and both
become **C-O-M-U-T-E-R** - 7 letters, same relative order, in both
original words, even though those 7 letters are not all
next-to-each-other in either original word.

That's today's whole subject, precisely.

---

<!-- SLOT 9: Core concept -->

# Subsequence & Common Subsequence: Definition

<div class="thread">Fifty years of tools, and a warm-up you just solved by hand, point at two words. Here they are, precisely.</div>

> A **subsequence** of a sequence $S$ is any sequence obtainable by
> deleting zero or more elements from $S$ **without changing the
> relative order** of the remaining elements.

> A **common subsequence** of $X$ and $Y$ is a sequence that is a
> subsequence of *both*. The **longest common subsequence (LCS)** is
> the longest such sequence - its length, and the sequence itself.

**Crucial contrast:** a **substring** is a subsequence whose kept
elements are also *contiguous* (no gaps). "ACE" is a subsequence of
"ABCDE" but **not** a substring of it. LCS never requires contiguity.

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Prefix:** the first $i$ elements of a sequence, written $X[1..i]$ - the DP table's "how far in" axis.
- **Optimal substructure:** an optimal solution to a problem contains optimal solutions to its subproblems - what makes DP possible at all.
- **Overlapping subproblems:** the same smaller subproblem gets needed again and again - what makes a table (not fresh recursion) worthwhile.
- **Recurrence relation:** the equation defining a table cell's value from other cells already computed.

<!-- notes: Read each term aloud. Say: "These four words are what every DP week, including last week, has secretly been built from." -->

---

<!-- Act 3 / BUILD -->

# The Problem, Precisely

<div class="thread">Time to build the actual algorithm.</div>

**Input:** two sequences $X = \langle x_1, \dots, x_m \rangle$ and
$Y = \langle y_1, \dots, y_n \rangle$.

**Output:** the length of their longest common subsequence - **and**
the actual subsequence itself, reconstructed.

A brute-force idea: generate every subsequence of $X$, check each
against $Y$. $X$ has $2^m$ subsequences. For CampusNav's course
lists ($m \approx 12$), that's over 4,000 checks - and it doubles
for every one more class either student adds. This is exactly the
recursion-tree blowup from Week 4, wearing a new outfit.

---

# Optimal Substructure: Why a Table Works At All

<div class="thread">The key insight, argued carefully - not asserted.</div>

Let $L(i,j)$ = length of the LCS of $X[1..i]$ and $Y[1..j]$.

- **If $x_i = y_j$:** this matched pair *can always* be the last
  element of *some* LCS of $X[1..i], Y[1..j]$ - if an optimal common
  subsequence didn't already end there, we could append this shared
  element to it and get a strictly longer one, a contradiction. So
  $L(i,j) = L(i-1, j-1) + 1$.
- **If $x_i \ne y_j$:** the LCS cannot use *both* $x_i$ and $y_j$ as
  its final matched element (they aren't equal, so they can't be the
  *same* matched pair). So the best answer either drops $x_i$ or
  drops $y_j$ - whichever leaves the longer match. $L(i,j) =
  \max\big(L(i-1,j),\ L(i,j-1)\big)$.

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

- **Base case, why 0:** an empty prefix (of either sequence) shares
  no elements with anything - there's nothing to match.
- Every cell depends only on cells *above* it, *to its left*, or
  *diagonally above-left* - all already computed if we fill the
  table row by row, left to right.

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

# Worked Example: Filling the Table

<div class="thread">X = "ALGDP", Y = "ALGRDP" - the first few course codes of a real CampusNav pair, see the worked example ahead.</div>

<div class="tracetable">
<div class="row"><div class="rowlabel"></div><div class="cell empty">ε</div><div class="cell">A</div><div class="cell">L</div><div class="cell">G</div><div class="cell">R</div><div class="cell">D</div><div class="cell">P</div></div>
<div class="row"><div class="rowlabel">ε</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">A</div><div class="cell">0</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div></div>
<div class="row"><div class="rowlabel">L</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">2</div><div class="cell">2</div><div class="cell">2</div><div class="cell">2</div></div>
<div class="row"><div class="rowlabel">G</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">3</div><div class="cell">3</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">D</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">3</div><div class="cell">4</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">P</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">3</div><div class="cell">4</div><div class="cell">5</div></div>
</div>

Every cell filled with only the rule from the previous slide. Bottom-right corner: **L(5,6) = 5**.

---

# Traceback: The Procedure

<div class="thread">The table gives a length. This gives the actual sequence.</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Start at the bottom-right cell, (i,j) = (m,n).</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">If X[i] = Y[j] (a diagonal-match move): record that character, move to (i-1, j-1).</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Otherwise (a max-direction move): move to whichever of (i-1,j) or (i,j-1) has the larger value - that's the neighbor the max() came from.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">Stop when i = 0 or j = 0. Reverse the recorded characters - you built the LCS backward.</div></div>
</div>

<div class="why">Ties (both neighbors equal) mean more than one longest common subsequence exists - either direction gives a correct, maximum-length answer.</div>

---

# Traceback, Traced

<div class="thread">Same table. Gold = a max-direction detour. Blue = a diagonal match, added to the LCS.</div>

<div class="tracetable">
<div class="row"><div class="rowlabel"></div><div class="cell empty">ε</div><div class="cell">A</div><div class="cell">L</div><div class="cell">G</div><div class="cell">R</div><div class="cell">D</div><div class="cell">P</div></div>
<div class="row"><div class="rowlabel">ε</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div><div class="cell">0</div></div>
<div class="row"><div class="rowlabel">A</div><div class="cell">0</div><div class="cell hl">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div><div class="cell">1</div></div>
<div class="row"><div class="rowlabel">L</div><div class="cell">0</div><div class="cell">1</div><div class="cell hl">2</div><div class="cell">2</div><div class="cell">2</div><div class="cell">2</div><div class="cell">2</div></div>
<div class="row"><div class="rowlabel">G</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell hl">3</div><div class="cell hl2">3</div><div class="cell">3</div><div class="cell">3</div></div>
<div class="row"><div class="rowlabel">D</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">3</div><div class="cell hl">4</div><div class="cell">4</div></div>
<div class="row"><div class="rowlabel">P</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">3</div><div class="cell">4</div><div class="cell hl">5</div></div>
</div>

Path: (5,6)→(4,5)→**(3,4) detour, R doesn't match**→(3,3)→(2,2)→(1,1). Reversed: **A, L, G, D, P**.

---

# Complexity

<div class="thread">Last piece: how much does this cost?</div>

- **Time: O(mn).** Each of the (m+1)(n+1) cells is filled in O(1) from already-computed neighbors - total work is proportional to the number of cells.
- **Space: O(mn).** The full table must be kept if you need the traceback (the actual subsequence).
- **Refinement:** if you only need the *length*, not the subsequence, you only ever need the previous row - O(min(m,n)) space is enough. CampusNav's traceback needs the real string, so it keeps the full table.

<div class="bignotation">O(mn) time · O(mn) space (with traceback)</div>

Compare to brute force's $O(2^m \cdot n)$ - checking every subsequence of $X$ against $Y$. DP turns exponential into polynomial, same as every paradigm this course has built since Week 9.

---

<!-- SLOT N-2: Worked example -->

# CampusNav: Find a Study Buddy

<div class="thread">Everything above, on the actual feature.</div>

Minji's and Junho's real weekly course-code sequences:

$$
X = \texttt{ALGDPGRPHSRT} \qquad Y = \texttt{ALGRDPGRAPH}
$$

The short pair you just traced by hand, `ALGDP` / `ALGRDP`, is
literally the first five and six codes of these two real sequences -
you've already solved a prefix of CampusNav's real problem. Building
the full 12×11 table and traceback for these exact sequences is
**Assignment 4, Task 1** (due Week 15). Once solved, CampusNav can
finally tell Minji and Junho exactly which courses they share, and
in what order - not "no match."

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Confusing "subsequence" with "substring."** LCS does **not**
  require the shared elements to be contiguous. It's tempting because
  the word "sequence" sounds like it should mean an unbroken run -
  but "ACE" is a valid common subsequence of "ABCDE" and "XAYCZE"
  even though neither contains "ACE" as a contiguous block.
- **Treating memoization and tabulation as different algorithms.**
  They're the same recurrence - the top-down (memoized) version
  caches results the first time they're needed; the table you just
  filled by hand is the bottom-up (tabulated) version of the exact
  same $L(i,j)$ equation.

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. Is "BD" a substring of "ABCBD"? Is it a subsequence? Are your two answers different, and why?
2. For X = "AGCAT" and Y = "GAC", what is L(1,1) - comparing just the first character of each - and which recurrence case applies?
3. If |X| = m and |Y| = n, how many cells does the DP table have, and what does that tell you about the algorithm's time complexity?

---

# Answers

1. "BD" is **not** a substring (B and D are not adjacent in "ABCBD" - C sits between them) but **is** a subsequence (delete A and C, keep B and D in order). Different answers because substring demands contiguity; subsequence does not.
2. X[1] = "A", Y[1] = "G" - no match, so the *mismatch* case applies: $L(1,1) = \max(L(0,1), L(1,0)) = \max(0,0) = 0$.
3. $(m+1)(n+1)$ cells. Since each cell costs O(1) to fill, total time is proportional to the cell count - that's exactly where O(mn) time comes from.

---

<!-- NEW: worksheet hand-off -->

# Now: Worksheet - Fill the Table, Trace It Back

<div class="thread">Time to practice. Build one yourself, start to finish.</div>

Work with your neighbor. Open the **[Week 12
Worksheet](materials/week12/worksheet.html)**. Part A: fill an LCS
table by hand for a fresh pair of short strings. Part B: perform the
traceback together and reconstruct the actual longest common
subsequence.

**~25-30 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project the worksheet. Walk the room while pairs work.
After time is up, ask 2 pairs to share their reconstructed LCS strings and confirm both A and B parts.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: where this technique still falls short.</div>

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **LCS (Longest Common Subsequence):** the longest sequence that is a subsequence of two given sequences at once.
- **Traceback:** walking a filled DP table backward from its corner to reconstruct an actual optimal solution, not just its value.
- **Edit distance / sequence alignment:** related problems (how many insertions/deletions/substitutions turn one sequence into another) solved with a close cousin of today's recurrence - used in `diff`, spell-checkers, and DNA comparison.
- **2-D DP:** dynamic programming where the subproblem needs two indices, one per sequence - today's structural upgrade from Week 11's 1-D tables.

<!-- notes: Read each term aloud. Say: "Edit distance is the same idea, one small step further - CLRS covers it right after LCS if you want to go deeper." -->

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

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 12 Quiz](materials/week12/quiz.html)**. Answer on
your own, about 10 minutes. Check your own answers at the end. Ask
if anything surprises you.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

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

<!-- SLOT N+3: Summary -->

# Summary

- A **subsequence** allows gaps; a **substring** does not - LCS is
  built entirely on the former, never the latter.
- The recurrence: matching characters extend the diagonal by 1;
  mismatched characters take the better of dropping either character.
- **Traceback** reconstructs the actual LCS string, not just its
  length - walk backward from the table's corner.
- **Complexity:** O(mn) time and space (O(min(m,n)) space if only
  the length is needed).
- **Reading:** CLRS, Chapter 14 (Dynamic Programming), §14.4
  Longest Common Subsequence.
- **Prepare:** think about how you'd represent CampusNav's buildings
  and the walkways connecting them as data. Bring one idea to Week 13.
- **Reminder:** Assignment 3 (Greedy & Divide-and-Conquer) is due
  this week - submit via the course LMS.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
