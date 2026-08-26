# Week 5 Self-Check Quiz - Basic Sorting

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** A sorting algorithm is called "stable" when:

A. It never crashes on any input
B. Elements with equal keys keep their original relative order after sorting
C. It always runs in $O(n \log n)$ time
D. It uses no extra memory at all

**2.** Bubble sort's best-case time complexity, on an already-sorted
array (using the `swapped` early-exit flag), is:

A. $O(1)$
B. $O(\log n)$
C. $O(n)$
D. $O(n^2)$, same as its worst case

**3.** Selection sort's best-case time complexity, even on an
already-sorted array, is:

A. $O(1)$
B. $O(n)$
C. $O(n \log n)$
D. $O(n^2)$ - it always scans the entire unsorted remainder

**4.** In the loop-invariant proof of insertion sort's correctness,
which part shows that the invariant is true *before the loop ever
runs*?

A. Maintenance
B. Termination
C. Initialization
D. The recursive case

**5.** Tag the array `A = [6a, 6b, 2c]` (subscripts are labels only).
Naive selection sort finds the minimum (`2c`) and swaps it with index
0, producing `[2c, 6b, 6a]`. This demonstrates:

A. Selection sort is stable, since the array ends up sorted
B. Selection sort is **not** stable - `6a` and `6b`'s relative order flipped
C. A bug in selection sort's pseudocode
D. That insertion sort would behave identically here

**6.** Which best describes why "all three $O(n^2)$ sorts behave
identically in practice" is a misconception?

A. They don't all have the same worst-case complexity
B. They differ in adaptiveness, stability, and constant factors - e.g. insertion sort is fast on nearly-sorted input while selection sort is not
C. Only bubble sort actually runs in $O(n^2)$ time
D. In practice, none of the three ever reach $O(n^2)$

**7.** A directory is sorted alphabetically, then a second sort
reorders it by floor number. For the alphabetical order to survive
within each floor, the second sort must be:

A. In-place
B. The fastest possible algorithm
C. Stable
D. Recursive

**8. Short answer.** In your own words, explain why insertion sort is
a better choice than selection sort for re-sorting a CampusNav
directory that is already sorted except for one newly-added room at
the end. Reference both algorithms' best-case behavior.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - stability means equal-key elements keep their original
   relative order; it says nothing about speed, memory, or crashing.
2. **C** - with the `swapped` flag, an already-sorted array makes one
   pass with zero swaps, then exits early: $O(n)$.
3. **D** - selection sort's inner loop always scans the entire
   unsorted remainder to find the minimum, regardless of how sorted
   the array already is, so it never adapts below $O(n^2)$.
4. **C** - Initialization is the part of a loop-invariant proof that
   establishes the invariant holds before the first iteration; it is
   the "base case" of the induction.
5. **B** - `6a` was originally before `6b`; after the swap, `6b` comes
   before `6a`. One such counterexample is enough to show naive
   selection sort is not stable.
6. **B** - the misconception ignores real differences in
   adaptiveness (fast vs. slow on nearly-sorted input), stability, and
   the exact number/cost of swaps or shifts, all of which matter for
   real use even though the worst-case Big-O is the same for all three.
7. **C** - stability is exactly the property that makes a second,
   different-key sort preserve the ordering the first sort already
   established among ties.
8. Open-ended. Accept any answer that identifies: insertion sort is
   adaptive, so re-sorting a nearly-sorted array (one room out of
   place) costs close to $O(n)$ - the inner `while` loop exits almost
   immediately for every already-in-place element, and only the new
   room needs real shifting. Selection sort is not adaptive - its
   inner scan for the minimum always examines the full unsorted
   remainder no matter how sorted the array already is, so it costs
   $O(n^2)$ regardless.
