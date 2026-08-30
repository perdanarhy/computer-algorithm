# Week 12 Handout - Dynamic Programming II (Longest Common Subsequence)

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the recurrence derived carefully (not just stated), a
fully worked table with traceback spelled out, extra reading, and
practice problems with answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Sequence** | An ordered list of items where position matters - letters, course codes, anything. |
| **Subsequence** | A sequence built by deleting zero or more items from another sequence, *without* reordering what remains. Gaps are allowed. |
| **Substring** | A subsequence whose kept items are also *contiguous* - no gaps in the middle. Every substring is a subsequence; not every subsequence is a substring. |
| **Common subsequence** | A sequence that is a subsequence of two (or more) sequences at once. |
| **Longest common subsequence (LCS)** | The longest common subsequence of two sequences - both its length and the actual sequence. |
| **Prefix** | The first $i$ elements of a sequence, written $X[1..i]$. The DP table's two axes track "how far into $X$" and "how far into $Y$." |
| **Optimal substructure** | An optimal solution to a problem is built from optimal solutions to its subproblems - the property that makes DP possible at all. |
| **Overlapping subproblems** | The same smaller subproblem is needed again and again during recursion - the property that makes a table worth building. |
| **Recurrence relation** | The equation defining one table cell's value in terms of other, already-computed cells. |
| **Base case** | The recurrence's starting values - here, row 0 and column 0, both 0. |
| **Tabulation (bottom-up DP)** | Filling the table iteratively, smallest subproblems first, as in this week's worked example. |
| **Memoization (top-down DP)** | Solving the same recurrence via recursion, caching (memoizing) each subproblem's answer the first time it's computed. Same recurrence as tabulation - different order of computing it. |
| **Traceback** | Walking a filled DP table backward from its final cell to reconstruct an actual optimal solution, not just its value. |
| **Time complexity** | Here, $O(mn)$ - proportional to the number of table cells, each filled in $O(1)$. |
| **Space complexity** | Here, $O(mn)$ if the full table is kept for traceback; $O(\min(m,n))$ if only the length is needed. |

---

## Part 2: The Recurrence, Derived Carefully

This is not a formula to memorize blindly - each case is provably
correct. Let $X = \langle x_1, \dots, x_m \rangle$, $Y = \langle
y_1, \dots, y_n \rangle$, and define $L(i,j)$ as the length of the
LCS of the prefixes $X[1..i]$ and $Y[1..j]$.

**Base case: $L(i,0) = L(0,j) = 0$ for all $i,j$.**
An empty sequence has no elements at all, so it cannot share any
element with anything. There is nothing to match.

**Case 1: $x_i = y_j$ (the last characters of both prefixes match).**

Claim: $L(i,j) = L(i-1,j-1) + 1$.

*Why this is correct, not just convenient:* suppose $Z$ is some
longest common subsequence of $X[1..i]$ and $Y[1..j]$, with length
$k$. If $Z$'s last element is *not* the shared character $x_i (=
y_j)$, we could append $x_i$ to $Z$ and still have a valid common
subsequence of $X[1..i]$ and $Y[1..j]$ - because $x_i$ is available
at the end of both prefixes - giving length $k+1$. That contradicts
$Z$ being *longest*. So $Z$'s last element **must** be $x_i (=
y_j)$, which means the rest of $Z$ (everything before that last
element) is a common subsequence of $X[1..i-1]$ and $Y[1..j-1]$ -
and it must be the *longest* one, or we could substitute a longer
one and again contradict $Z$'s maximality. So $L(i,j) = L(i-1,j-1) +
1$.

**Case 2: $x_i \ne y_j$ (the last characters differ).**

Claim: $L(i,j) = \max\big(L(i-1,j),\ L(i,j-1)\big)$.

*Why this is correct:* any common subsequence $Z$ of $X[1..i]$ and
$Y[1..j]$ cannot end in *both* $x_i$ and $y_j$, since they're not
equal - at most one of them can be $Z$'s final matched element, and
possibly neither is. So $Z$ is either (a) a common subsequence of
$X[1..i-1]$ and $Y[1..j]$ (it never actually used $x_i$), or (b) a
common subsequence of $X[1..i]$ and $Y[1..j-1]$ (it never actually
used $y_j$). The true LCS is whichever of these two possibilities is
longer - hence the max.

**Putting it together:**

$$
L(i,j) =
\begin{cases}
0 & \text{if } i = 0 \text{ or } j = 0 \\
L(i-1,j-1) + 1 & \text{if } i,j > 0 \text{ and } x_i = y_j \\
\max\big(L(i-1,j),\ L(i,j-1)\big) & \text{if } i,j > 0 \text{ and } x_i \ne y_j
\end{cases}
$$

Because every cell depends only on cells above, to the left, or
diagonally above-left, filling the table row by row (top to bottom,
left to right) always has every needed value ready in time.

---

## Part 3: The Worked Example, Fully

This is the exact example from the slides: $X = $ "ALGDP" ($m = 5$),
$Y = $ "ALGRDP" ($n = 6$) - the first few course codes of two real
CampusNav students' schedules.

**The filled table** (row = $X$, column = $Y$; row 0 / column 0 are
the base case):

| | ε | A | L | G | R | D | P |
|---|---|---|---|---|---|---|---|
| **ε** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 1 | 1 | 1 | 1 | 1 | 1 |
| **L** | 0 | 1 | 2 | 2 | 2 | 2 | 2 |
| **G** | 0 | 1 | 2 | 3 | 3 | 3 | 3 |
| **D** | 0 | 1 | 2 | 3 | 3 | 4 | 4 |
| **P** | 0 | 1 | 2 | 3 | 3 | 4 | **5** |

$L(5,6) = 5$: the LCS has length 5.

**Sample cell walkthroughs**, to see the recurrence in action:

- $L(1,1)$: $X_1 = $ A, $Y_1 = $ A. Match → $L(1,1) = L(0,0) + 1 = 0 + 1 = 1$.
- $L(3,4)$: $X_3 = $ G, $Y_4 = $ R. Mismatch → $L(3,4) = \max(L(2,4), L(3,3)) = \max(2, 3) = 3$. Notice the value comes entirely from the left neighbor, not the diagonal - G and R never match here.
- $L(4,5)$: $X_4 = $ D, $Y_5 = $ D. Match → $L(4,5) = L(3,4) + 1 = 3 + 1 = 4$.
- $L(5,6)$: $X_5 = $ P, $Y_6 = $ P. Match → $L(5,6) = L(4,5) + 1 = 4 + 1 = 5$.

**Traceback, step by step**, starting at $(i,j) = (5,6)$:

1. $(5,6)$: $X_5 = $ P, $Y_6 = $ P - **match**. Record `P`. Move to $(4,5)$.
2. $(4,5)$: $X_4 = $ D, $Y_5 = $ D - **match**. Record `D`. Move to $(3,4)$.
3. $(3,4)$: $X_3 = $ G, $Y_4 = $ R - **mismatch**. $L(2,4) = 2$, $L(3,3) = 3$. The left neighbor is larger, so move to $(3,3)$. (No character recorded - this is the "detour" the mismatch forces.)
4. $(3,3)$: $X_3 = $ G, $Y_3 = $ G - **match**. Record `G`. Move to $(2,2)$.
5. $(2,2)$: $X_2 = $ L, $Y_2 = $ L - **match**. Record `L`. Move to $(1,1)$.
6. $(1,1)$: $X_1 = $ A, $Y_1 = $ A - **match**. Record `A`. Move to $(0,0)$.
7. $i = 0$: stop.

Recorded, in the order found (backward): P, D, G, L, A. **Reverse it**
to read forward: **A, L, G, D, P** - the LCS is `ALGDP`, length 5.

Sanity check: `ALGDP` is a subsequence of `ALGDP` trivially (it's
$X$ itself), and it *is* a subsequence of `ALGRDP` (delete the `R`) -
so the entire shorter string turned out to be "hidden inside" the
longer one, with one extra character (R) in the way. That's exactly
what step 3's detour represents.

---

## Part 4: Optional Reading - Where This Shows Up For Real

### `diff` and Git

When you run `git diff` between two versions of a file, Git is
solving an LCS-shaped problem on the file's *lines*: find the
longest sequence of lines that appear, in order, in both versions.
Every line **not** part of that longest common subsequence is
reported as added or removed. This is essentially the same
algorithm you traced by hand above - invented for exactly this
purpose by Hunt and McIlroy in 1976 for the original Unix `diff`
tool (modern Git primarily uses a faster variant called Myers diff,
which solves a closely related problem).

### DNA and protein sequence alignment

In bioinformatics, comparing two DNA or protein sequences for
similarity - to detect mutations, find related genes, or measure
evolutionary distance - uses a close cousin of the LCS recurrence
called **sequence alignment** (the Needleman-Wunsch algorithm, 1970,
and the related Smith-Waterman algorithm for local alignment). The
core idea is identical: a 2-D table indexed by position in each
sequence, filled with a recurrence that rewards matches and
penalizes gaps, then traced back to reconstruct the best alignment.

### Why this matters beyond this course

Both applications above predate modern computing's most common
programming interview question format by decades - LCS is asked so
often precisely because solving it well requires you to *derive* a
2-D recurrence, not just memorize one. If you can explain why each
case of the recurrence above is correct, you can adapt the same
reasoning to edit distance, sequence alignment, and many other 2-D
DP problems you'll meet later.

---

## Part 5: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** True or false: "ACE" is a substring of "ABCDE."

> **Answer:** False. "ACE" *is* a subsequence of "ABCDE" (delete B
> and D), but not a substring, because its letters are not
> contiguous in "ABCDE" (a substring would be something like "BCD").

**2.** Find the LCS length and the actual subsequence for $X =
$ "ABC" and $Y = $ "AC."

> **Answer:** Length 2, LCS = "AC." Table: $L(1,1)=1$ (A=A, match),
> $L(1,2)=1$ (no new match, carries forward), $L(2,1)=1$, $L(2,2)=1$
> (B≠C, max of neighbors), $L(3,1)=1$, $L(3,2)=2$ (C=C, match, $=
> L(2,1)+1$). Traceback from $(3,2)$: match C, move to $(2,1)$; no
> match (B vs A), move up to $(1,1)$; match A. Reversed: "A", "C" →
> "AC."

**3.** Find the LCS length and the actual subsequence for $X =
$ "AGCAT" and $Y = $ "GAC."

> **Answer:** Length 2, LCS = "AC" (or you may find "GA" - see if
> your traceback took a different tie-breaking direction; both are
> valid, equally correct, length-2 answers, since the input has
> more than one longest common subsequence). Try filling the full
> $6 \times 4$ table yourself; the recurrence is identical to Part 3
> above.

**4.** Why is the DP algorithm's running time $O(mn)$ rather than
exponential, even though the *number of possible subsequences* of
$X$ alone is $2^m$?

> **Answer:** Because the DP algorithm never enumerates
> subsequences at all - it fills a table of $(m+1)(n+1)$ cells, each
> in $O(1)$ time from already-computed neighbors, so total work is
> proportional to the cell count: $O(mn)$. Brute force, which
> generates all $2^m$ subsequences of $X$ and checks each against
> $Y$ (an $O(n)$ check), costs $O(2^m \cdot n)$ - exponential, not
> polynomial.

**5.** During traceback, you reach a cell where $x_i \ne y_j$ and
$L(i-1,j) = L(i,j-1)$ - a tie. Does it matter which direction you
choose?

> **Answer:** Not for the *length* - either direction leads to a
> common subsequence of the same maximum length. It can, however,
> lead to a *different* (but equally valid) longest common
> subsequence string, since LCS is not always unique. Problem 3
> above is a concrete example of this.

**6. (Bonus/challenge.)** This is the classic textbook example
(CLRS): $X = \langle A, B, C, B, D, A, B \rangle$, $Y = \langle B,
D, C, A, B, A \rangle$. Without necessarily building the full
$8\times7$ table, what is the LCS length and one valid LCS string?
Build the table yourself to check your work.

> **Answer:** Length 4. One valid LCS is "BCBA" (another equally
> correct answer some traceback paths find is "BDAB" - again, LCS
> is not unique here). Building the full table is good, thorough
> practice for Assignment 4's larger sequences (released Week 13,
> due Week 15).
