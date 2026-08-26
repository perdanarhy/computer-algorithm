# Week 9 Self-Check Quiz - Divide and Conquer

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** The three stages of every divide-and-conquer algorithm, in
order, are:

A. Sort, search, combine
B. Divide, conquer, combine
C. Recurse, memoize, return
D. Split, merge, sort

**2.** Beyond "it calls itself recursively," what does a recursive
algorithm also need to actually count as divide-and-conquer?

A. It must run in $O(n \log n)$ time
B. It must have independent subproblems and an explicit combine step
C. It must use an array, not a linked list
D. It must have exactly two recursive calls

**3.** For the recurrence $T(n) = 2T(n/2) + \Theta(n)$ - merge sort's
and the maximum-subarray algorithm's shape - the Master theorem gives:

A. $\Theta(n)$
B. $\Theta(n^2)$
C. $\Theta(n \log n)$
D. $\Theta(\log n)$

**4.** For the recurrence $T(n) = 4T(n/2) + n$, which Master theorem
case applies, and what is $T(n)$?

A. Case 1, $T(n) = \Theta(n^2)$
B. Case 2, $T(n) = \Theta(n \log n)$
C. Case 3, $T(n) = \Theta(n)$
D. No case applies

**5.** In the maximum-subarray divide-and-conquer algorithm, the
"crossing" case is needed in addition to recursing on the left and
right halves because:

A. It makes the algorithm easier to code
B. The true best subarray might start in the left half and end in the right half, which neither recursive call alone can find
C. Recursion alone is never correct
D. It's required to make the algorithm recursive at all

**6.** The crossing-subarray step (scanning outward from the midpoint
in both directions) runs in:

A. $\Theta(1)$
B. $\Theta(\log n)$
C. $\Theta(n)$
D. $\Theta(n^2)$

**7.** CampusNav's Week-4 recursion for counting ways to climb a
20-step shortcut (1 or 2 steps at a time) is **not** divide-and-conquer
because:

A. It only makes one recursive call
B. Its two recursive calls solve overlapping smaller subproblems instead of independent ones
C. It doesn't have a base case
D. Counting problems can never be recursive

**8. Short answer.** In your own words, explain why "it's recursive"
is not the same claim as "it's divide-and-conquer." Give one concrete
example from class.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - divide, conquer, combine, in that order.
2. **B** - independent subproblems and an explicit combine step are
   what separates D&C from recursion in general.
3. **C** - $a=2$, $b=2$, watershed $=n$, $f(n)=\Theta(n)$ matches the
   watershed exactly (Case 2), giving $\Theta(n\log n)$.
4. **A** - watershed $=n^{\log_2 4}=n^2$, $f(n)=n=O(n^{2-1})$ (Case 1),
   giving $\Theta(n^2)$.
5. **B** - the two recursive calls only ever look *within* one half or
   the other; a subarray that straddles the midpoint is invisible to
   both, so it needs its own dedicated step.
6. **C** - the two outward scans together touch every element in the
   range exactly once.
7. **B** - $\text{ways}(n-1)$ and $\text{ways}(n-2)$ overlap: many of
   the same smaller subproblems get recomputed by both calls, which is
   the opposite of the independent subproblems D&C requires.
8. Open-ended. Accept any answer that correctly identifies that D&C
   additionally requires independent (non-overlapping) subproblems
   **and** a combine step, and pairs it with a believable example
   (e.g. the Week-4 shortcut-counting recursion is recursive but not
   D&C, since its calls overlap; merge sort or the maximum-subarray
   algorithm are recursive *and* D&C, since their halves are
   independent and each has a combine step).
