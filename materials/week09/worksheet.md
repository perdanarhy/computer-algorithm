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
