# Week 9 Handout - Divide and Conquer

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the Master theorem stated precisely with its merge-sort
application, the complete maximum-subarray trace spelled out level by
level, extra reading, and practice problems with answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Divide-and-conquer (D&C)** | A paradigm: divide a problem into *independent* subproblems, conquer each recursively, combine their answers. |
| **Paradigm** | A general strategy for *inventing* algorithms, reusable across different problems - not one fixed algorithm. |
| **Independent subproblems** | Subproblems that don't overlap and don't depend on each other's answers - required for a recursive algorithm to count as D&C. |
| **Combine step** | The work that stitches subproblem answers into an answer for the whole problem (e.g. merging two sorted halves). |
| **Recurrence** | An equation defining a function's cost in terms of its own cost on smaller inputs, e.g. $T(n) = aT(n/b) + f(n)$. |
| **Master theorem** | A direct formula for solving recurrences shaped $T(n) = aT(n/b) + f(n)$, without tracing the whole recursion tree by hand. |
| **Watershed function** | Shorthand for $n^{\log_b a}$ - what the Master theorem compares $f(n)$ against. |
| **Maximum subarray problem** | Find the contiguous run of an array with the largest sum. |
| **Crossing subarray** | A candidate maximum-subarray answer that starts in the left half and ends in the right half - the case the two recursive calls alone can't find. |
| **Overlapping subproblems** | When recursive calls solve the *same* smaller subproblem more than once - the opposite of independent, and the signal for dynamic programming (Week 11) instead of D&C. |
| **Fast exponentiation** | Computing $a^n$ in $O(\log n)$ multiplications by repeated squaring, instead of $n-1$ one-at-a-time multiplications. |

---

## Part 2: The Master Theorem, Precisely

Given a recurrence of the shape

$$
T(n) = a \cdot T(n/b) + f(n), \qquad a \geq 1,\ b > 1,
$$

compare $f(n)$ against the watershed function $n^{\log_b a}$:

| Case | Condition on $f(n)$ | Result |
|---|---|---|
| **1** | $f(n) = O(n^{\log_b a - \varepsilon})$ for some $\varepsilon>0$ ($f$ grows *polynomially slower* than the watershed) | $T(n) = \Theta(n^{\log_b a})$ |
| **2** | $f(n) = \Theta(n^{\log_b a})$ ($f$ grows at *the same rate*) | $T(n) = \Theta(n^{\log_b a}\log n)$ |
| **3** | $f(n) = \Omega(n^{\log_b a + \varepsilon})$ for some $\varepsilon>0$ ($f$ grows *polynomially faster*), **and** the regularity condition $a\,f(n/b) \le c\,f(n)$ holds for some constant $c<1$ and all sufficiently large $n$ | $T(n) = \Theta(f(n))$ |

**Important limitation:** if $f(n)$ falls in the gap between two cases
(e.g. it's larger than the watershed but not by a full polynomial
factor), or Case 3's regularity condition fails, the Master theorem
simply does not apply - you're back to tracing the recursion tree
(Week 4) or need a different technique.

### Application: merge sort's recurrence (the anchor example)

Merge sort makes 2 recursive calls, each on half the array, and merges
the two sorted halves in linear time:

$$
T(n) = 2T(n/2) + \Theta(n)
$$

- $a = 2$, $b = 2$ → watershed $= n^{\log_2 2} = n^1 = n$
- $f(n) = \Theta(n)$ matches the watershed exactly → **Case 2**

$$
T(n) = \Theta(n^{\log_b a}\log n) = \Theta(n \log n)
$$

This is the same $\Theta(n\log n)$ bound Week 6 derived by drawing out
the whole recursion tree level by level. The Master theorem gets there
directly, without the drawing.

---

## Part 3: The Maximum Subarray Problem, Full Trace

CampusNav's "best energy window" feature: a student's day is logged
in 10-minute slots, each `+1` (energizing) or `-1` (draining).
Consecutive same-type slots are merged into one number to keep the
example short (a `+4` means four energizing slots in a row). The array
traced in class:

$$
A = [\,4,\ -3,\ 5,\ -2,\ -1,\ 6,\ -3,\ 4,\ -8,\ 5\,] \qquad \text{(indices 0-9)}
$$

### The algorithm

```text
MAX-SUBARRAY(A, low, high):
    if low == high:
        return (low, high, A[low])              # base case: single element
    mid = floor((low + high) / 2)
    (Llo, Lhi, Lsum) = MAX-SUBARRAY(A, low, mid)      # entirely left
    (Rlo, Rhi, Rsum) = MAX-SUBARRAY(A, mid+1, high)   # entirely right
    (Clo, Chi, Csum) = FIND-CROSSING(A, low, mid, high)  # straddles mid
    return whichever of the three triples has the largest sum

FIND-CROSSING(A, low, mid, high):
    best-left = -infinity, sum = 0
    for i = mid downto low:
        sum = sum + A[i]
        if sum > best-left: best-left = sum, cross-low = i
    best-right = -infinity, sum = 0
    for j = mid+1 to high:
        sum = sum + A[j]
        if sum > best-right: best-right = sum, cross-high = j
    return (cross-low, cross-high, best-left + best-right)
```

Each call to `FIND-CROSSING` does two linear scans, so it costs
$\Theta(n)$ at the level it's called - giving the recurrence
$T(n) = 2T(n/2) + \Theta(n) = \Theta(n\log n)$, exactly like merge sort.

### Level-by-level trace

**Base cases** (single elements, sum = the element itself):

`(0,0)=4`, `(1,1)=-3`, `(2,2)=5`, `(3,3)=-2`, `(4,4)=-1`, `(5,5)=6`,
`(6,6)=-3`, `(7,7)=4`, `(8,8)=-8`, `(9,9)=5`.

**Combine `[0,1]`** (mid=0): left `(0,0)=4`, right `(1,1)=-3`, crossing
`best-left=4` (idx 0) `+ best-right=-3` (idx 1) `= 1` over `[0,1]`.
Winner: left, **`(0,0), sum=4`**.

**Combine `[3,4]`** (mid=3): left `(3,3)=-2`, right `(4,4)=-1`,
crossing `-2 + -1 = -3` over `[3,4]`. Winner: right, **`(4,4), sum=-1`**.

**Combine `[0,2]`** (mid=1): left `= (0,0), sum=4` (from above), right
`(2,2)=5`. Crossing: best-left scans `1→0`: sum(1)=-3, sum(0)=-3+4=1 →
best-left=1 (starts at idx 0). Best-right scans `2→2`: sum=5 →
best-right=5. Crossing sum $=1+5=6$ over `[0,2]`. Winner: **crossing,
`(0,2), sum=6`**.

**Combine `[5,6]`** (mid=5): left `(5,5)=6`, right `(6,6)=-3`, crossing
`6 + -3 = 3` over `[5,6]`. Winner: left, **`(5,5), sum=6`**.

**Combine `[5,7]`** (mid=6): left `= (5,5), sum=6` (from above), right
`(7,7)=4`. Crossing: best-left scans `6→5`: sum(6)=-3, sum(5)=-3+6=3 →
best-left=3 (starts at idx 5). Best-right scans `7→7`: sum=4 →
best-right=4. Crossing sum $=3+4=7$ over `[5,7]`. Winner: **crossing,
`(5,7), sum=7`**.

**Combine `[8,9]`** (mid=8): left `(8,8)=-8`, right `(9,9)=5`, crossing
`-8+5=-3` over `[8,9]`. Winner: right, **`(9,9), sum=5`**.

**Combine `[0,4]`** (mid=2): left `= (0,2), sum=6`, right `= (4,4),
sum=-1`. Crossing: best-left scans `2→0`: sum(2)=5, sum(1)=5-3=2,
sum(0)=2+4=6 → best-left=6 (starts at idx 0). Best-right scans `3→4`:
sum(3)=-2, sum(4)=-2-1=-3 → best-right=-2 (ends at idx 3). Crossing sum
$=6+-2=4$ over `[0,3]`. Winner: **left, `(0,2), sum=6`** - the left
half's overall best subarray is `[4,-3,5]`.

**Combine `[5,9]`** (mid=7): left `= (5,7), sum=7`, right `= (9,9),
sum=5`. Crossing: best-left scans `7→5`: sum(7)=4, sum(6)=4-3=1,
sum(5)=1+6=7 → best-left=7 (starts at idx 5). Best-right scans `8→9`:
sum(8)=-8, sum(9)=-8+5=-3 → best-right=-3 (ends at idx 9). Crossing sum
$=7+-3=4$ over `[5,9]`. Winner: **left, `(5,7), sum=7`** - the right
half's overall best subarray is `[6,-3,4]`.

**Final combine `[0,9]`** (mid=4): left `= (0,2), sum=6`, right `=
(5,7), sum=7`. Crossing: best-left scans `4→0`: sum(4)=-1, sum(3)=-3,
sum(2)=2, sum(1)=-1, sum(0)=3 → best-left=3 (starts at idx 0).
Best-right scans `5→9`: sum(5)=6, sum(6)=3, sum(7)=7, sum(8)=-1,
sum(9)=4 → best-right=7 (ends at idx 7). Crossing sum $=3+7=\mathbf{10}$
over `[0,7]`.

| Final candidate | Range | Sum |
|---|---|---|
| Left half's best | $[0,2]$ | 6 |
| Right half's best | $[5,7]$ | 7 |
| **Crossing** | $[0,7]$ | **10** |

**Winner: the crossing subarray, `[0,7]`, sum = 10** - the subarray
`[4,-3,5,-2,-1,6,-3,4]`. CampusNav's best energy window runs straight
through the middle of the day, dipping through a draining patch that
the surrounding gains more than make up for.

(You can check this against a straightforward left-to-right scan
tracking "best sum ending here" - known as Kadane's algorithm, a
different, non-D&C way to solve the same problem in $\Theta(n)$ - it
agrees: the running maximum peaks at 10 after index 7.)

---

## Part 4: Optional Reading - Fast Exponentiation and the Shortcut Counter

CampusNav's "20-step shortcut, 1 or 2 steps at a time" counter follows
$\text{ways}(n) = \text{ways}(n-1) + \text{ways}(n-2)$ - the exact
recursion whose call tree exploded exponentially back in Week 4. That
recursion is **not** divide-and-conquer: its two calls overlap the same
smaller subproblems repeatedly instead of splitting into independent
pieces.

There is, however, a genuine D&C trick available: instead of dividing
the *steps*, halve the *step number* itself - the same idea fast
exponentiation uses to compute $a^n$ in $O(\log n)$ multiplications by
repeated squaring rather than $n-1$ one-at-a-time multiplications. A
pair of doubling identities lets you jump from $\text{ways}(k)$ straight
to $\text{ways}(2k)$ and $\text{ways}(2k+1)$ with a constant amount of
arithmetic, giving

$$
T(n) = T(n/2) + O(1) = \Theta(\log n)
$$

This is elegant but special-cased: it only works because this
particular counting recurrence happens to have a known closed identity
to exploit. It does not generalize to arbitrary overlapping-subproblem
recursions. **Week 11** solves this same 20-step counter - and the
whole family of problems shaped like it - properly, with **dynamic
programming**: a general technique instead of a one-off trick.

### Where this course is headed

| Weeks | What gets formalized |
|---|---|
| 4 | Recursion and recurrences, traced by hand |
| 9 | Divide-and-conquer as a general paradigm; the Master theorem |
| 10 | Greedy algorithms - when a single local choice suffices |
| 11-12 | Dynamic programming - the fix for overlapping subproblems |
| 13-14 | Graphs, and the limits of what's efficiently solvable at all |

---

## Part 5: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** Classify $T(n) = T(n/2) + 1$ with the Master theorem (this is
binary search's recurrence). Which case applies, and what is $T(n)$?

> **Answer:** $a=1$, $b=2$ → watershed $= n^{\log_2 1} = n^0 = 1$.
> $f(n) = \Theta(1) = \Theta(n^0)$ matches the watershed exactly → **Case
> 2**. $T(n) = \Theta(n^{\log_b a}\log n) = \Theta(1 \cdot \log n) =
> \Theta(\log n)$.

**2.** Classify $T(n) = 4T(n/2) + n$ with the Master theorem. Which
case applies, and what is $T(n)$?

> **Answer:** $a=4$, $b=2$ → watershed $= n^{\log_2 4} = n^2$. $f(n) = n
> = O(n^{2-1})$, so $f(n)$ grows polynomially slower than the watershed
> → **Case 1**. $T(n) = \Theta(n^{\log_b a}) = \Theta(n^2)$.

**3.** Classify $T(n) = T(n/2) + n$ with the Master theorem. Which case
applies, and what is $T(n)$?

> **Answer:** $a=1$, $b=2$ → watershed $= n^{\log_2 1} = n^0 = 1$.
> $f(n) = n = \Omega(n^{0+1})$, so $f(n)$ grows polynomially faster than
> the watershed → **Case 3** (check the regularity condition: $a\cdot
> f(n/2) = 1 \cdot (n/2) = n/2 \le c \cdot n$ for $c = 1/2 < 1$, which
> holds). $T(n) = \Theta(f(n)) = \Theta(n)$.

**4.** In the maximum-subarray algorithm, what would go wrong if
`FIND-CROSSING` only checked pairs where the left scan and right scan
each stopped after a *fixed* number of steps, instead of scanning all
the way to `low` and `high` respectively?

> **Answer:** It might miss the actual best crossing run, since the
> optimal crossing subarray could need to extend all the way to either
> boundary. The whole point of tracking a running sum across the *full*
> range on each side is to guarantee the best possible crossing run is
> found, not an arbitrary truncated one.

**5.** True or false: if a recursive algorithm makes exactly two
recursive calls on non-overlapping halves of its input, it is
automatically divide-and-conquer.

> **Answer:** True, *if* it also has a combine step that uses both
> halves' answers to produce the final answer - but false if there's no
> combine step at all (e.g. two calls that each independently print an
> answer with nothing stitching them together wouldn't really be
> solving one shared problem). The two required ingredients are
> independent subproblems **and** a combine step, together.

**6.** A classmate says "Master theorem Case 3 always applies whenever
$f(n)$ is bigger than $n^{\log_b a}$." What is missing from that claim?

> **Answer:** Case 3 also requires the regularity condition - $a \cdot
> f(n/b) \le c \cdot f(n)$ for some constant $c < 1$ and all sufficiently
> large $n$. Without checking that condition, Case 3's conclusion
> ($T(n)=\Theta(f(n))$) isn't guaranteed to hold, even if $f(n)$ is
> polynomially larger than the watershed.
