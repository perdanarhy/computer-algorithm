# Week 9 Worksheet - Divide and Conquer

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~10 minutes)

Below is a fresh 8-element array, indices 0 through 7:

$$
B = [\,3,\ -1,\ 4,\ 1,\ -5,\ 9,\ 2,\ -6\,]
$$

You are tracing **`FIND-CROSSING(B, low=0, mid=3, high=7)`** - the step
of the maximum-subarray algorithm that finds the best contiguous run
that starts in the left half and ends in the right half.

**A1. Best-left.** Starting at `mid = 3` and moving *left* toward
`low = 0`, add one element at a time and track the running sum. Fill in
the table (recall $B[3]=1$, $B[2]=4$, $B[1]=-1$, $B[0]=3$):

| add index | 3 | 2 | 1 | 0 |
|---|---|---|---|---|
| value | | | | |
| running sum | | | | |

Best-left sum: _______   Achieved starting at index: _______

**A2. Best-right.** Starting at `mid+1 = 4` and moving *right* toward
`high = 7`, add one element at a time and track the running sum.
(Recall $B[4]=-5$, $B[5]=9$, $B[6]=2$, $B[7]=-6$):

| add index | 4 | 5 | 6 | 7 |
|---|---|---|---|---|
| value | | | | |
| running sum | | | | |

Best-right sum: _______   Achieved ending at index: _______

**A3. Crossing sum.** Crossing sum = best-left + best-right = _______,
spanning indices [_____, _____].

**A4. Compare.** By inspection (small enough to eyeball), the best
subarray *entirely within* the left half `[3,-1,4,1]` (indices 0-3) has
sum _______, and the best subarray *entirely within* the right half
`[-5,9,2,-6]` (indices 4-7) has sum _______. Compare all three
candidates (left-only, right-only, crossing). Which one wins, and what
is the overall maximum-subarray sum for all of `B`?

Winner: _______   Overall maximum sum: _______   Range: [_____, _____]

**A5. Why linear time?** In one sentence, explain why steps A1 and A2
together only cost $\Theta(n)$, even though they're finding the *best*
crossing run out of many possible ones.

_____________________________________________________________

---

## Worksheet Part B (~10 minutes)

For each recurrence below: (1) identify $a$, $b$, and $f(n)$; (2)
compute the watershed function $n^{\log_b a}$; (3) state which Master
theorem case applies (showing the comparison that justifies it); (4)
state $T(n)$.

**B1.** $T(n) = 2T(n/2) + n$

$a=$ _____  $b=$ _____  $f(n)=$ _____  Watershed $n^{\log_b a} =$ _____

Case: _____   Justification: ___________________________________

$T(n) =$ _____________________

**B2.** $T(n) = 8T(n/2) + n^2$

$a=$ _____  $b=$ _____  $f(n)=$ _____  Watershed $n^{\log_b a} =$ _____

Case: _____   Justification: ___________________________________

$T(n) =$ _____________________

**B3.** $T(n) = 3T(n/4) + n\log n$

$a=$ _____  $b=$ _____  $f(n)=$ _____  Watershed $n^{\log_b a} \approx$ _____

Case: _____   Justification: ___________________________________
(Don't forget to check the regularity condition if you land on Case 3.)

$T(n) =$ _____________________

**B4. Short answer.** In your own words (2-3 sentences), explain why
the Master theorem is faster to use than tracing a recursion tree by
hand - and name one situation where you'd still have to trace the tree
instead.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

- **A1.** Values in order: $B[3]=1, B[2]=4, B[1]=-1, B[0]=3$. Running
  sums: $1,\ 5,\ 4,\ 7$. Best-left sum = **7**, achieved starting at
  **index 0** (the running sum keeps climbing after a dip, and the max
  over the sequence is the last value, 7).
- **A2.** Values in order: $B[4]=-5, B[5]=9, B[6]=2, B[7]=-6$. Running
  sums: $-5,\ 4,\ 6,\ 0$. Best-right sum = **6**, achieved ending at
  **index 6** (the running sum peaks at 6 after adding index 6, then
  drops when index 7 is added).
- **A3.** Crossing sum $= 7 + 6 = \mathbf{13}$, spanning indices
  **[0, 6]**.
- **A4.** Left half `[3,-1,4,1]`: best subarray by inspection is the
  whole thing, sum $= 3-1+4+1 = 7$. Right half `[-5,9,2,-6]`: best
  subarray by inspection is `[9,2]`, sum $= 11$. Comparing left-only
  (7), right-only (11), and crossing (13): **crossing wins**. Overall
  maximum sum for all of `B` = **13**, range **[0, 6]** (the subarray
  `[3,-1,4,1,-5,9,2]`).
- **A5.** Accept any answer capturing: each of the two scans (best-left,
  best-right) visits every element in its half exactly once, doing a
  constant amount of work per element, so together they touch every
  element of the array once - $\Theta(n)$ total - even though they
  correctly find the single best crossing run out of the many possible
  (start, end) pairs, because tracking a running sum implicitly checks
  all of them without enumerating each pair separately.

### Part B

- **B1.** $a=2,\ b=2,\ f(n)=n$. Watershed $= n^{\log_2 2} = n^1 = n$.
  $f(n) = \Theta(n)$ matches the watershed exactly → **Case 2**.
  $T(n) = \Theta(n\log n)$.
- **B2.** $a=8,\ b=2,\ f(n)=n^2$. Watershed $= n^{\log_2 8} = n^3$.
  $f(n) = n^2 = O(n^{3-1})$, polynomially slower than the watershed →
  **Case 1**. $T(n) = \Theta(n^3)$.
- **B3.** $a=3,\ b=4,\ f(n)=n\log n$. Watershed $= n^{\log_4 3} \approx
  n^{0.7925}$. $f(n) = n\log n$ grows polynomially faster than the
  watershed (for any small $\varepsilon > 0$, $n\log n$ eventually
  dominates $n^{0.7925+\varepsilon}$, since the extra $\log n$ factor
  keeps growing) → candidate **Case 3**. Regularity check: $a\,f(n/b) =
  3\cdot \frac{n}{4}\log\frac{n}{4} \approx \frac{3}{4} n\log n \le c\,
  n\log n$ for $c = 3/4 < 1$ and large $n$ - holds. So **Case 3**
  applies: $T(n) = \Theta(f(n)) = \Theta(n\log n)$.
- **B4.** Accept any answer capturing: the Master theorem gives a
  direct classification from $a$, $b$, and $f(n)$ in a few lines,
  instead of drawing out every level of the recursion tree and summing
  the cost per level. You still need to trace the tree by hand whenever
  the recurrence doesn't fit the $T(n)=aT(n/b)+f(n)$ shape at all, or
  when $f(n)$ falls in the gap between two cases, or a Case-3
  regularity check fails.
