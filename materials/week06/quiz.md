# Week 6 Self-Check Quiz - Advanced Sorting

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** Merge sort's worst-case time complexity is:

A. $O(n)$
B. $O(n \log n)$
C. $O(n^2)$
D. $O(2^n)$

**2.** Which property does merge sort have that a Lomuto-partition
quicksort does not?

A. It uses recursion
B. It has an $O(n \log n)$ average case
C. It is stable
D. It compares elements

**3.** In the standard `LOMUTO-PARTITION` pseudocode, the pivot is
always chosen as:

A. The first element
B. A randomly chosen element
C. The last element
D. The median of the array

**4.** Running Lomuto partition (last-element pivot) on an
**already-sorted** array produces a partition split of:

A. Roughly $n/2$ and $n/2$, every time
B. 0 and $n-1$, every time
C. A different random split each time
D. It fails to produce a valid partition

**5.** Which pivot-choice strategy has **no single fixed input** an
adversary can choose in advance to guarantee quicksort's worst case?

A. First element
B. Last element
C. Random
D. All strategies share the same worst-case input

**6.** Merge sort's $O(n)$ auxiliary space requirement comes from:

A. The recursion's call stack
B. The temporary `L` and `R` arrays created inside `MERGE`
C. Swapping elements in place
D. Storing the pivot value

**7.** True or False: quicksort's $O(n^2)$ worst case is rare enough
to ignore in practice, regardless of pivot strategy.

A. True
B. False

**8. Short answer.** In your own words, explain why merge sort's
recurrence always resolves to $O(n \log n)$ regardless of the input,
while quicksort's does not. Reference each algorithm's divide step
specifically.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - merge sort's divide step always splits exactly in half, so
   every case - best, average, and worst - is $O(n \log n)$.
2. **C** - merge sort is stable because `MERGE`'s comparison
   (`L[i] <= R[j]`) always favors the left side on a tie; Lomuto
   quicksort's swaps can reorder equal-keyed elements.
3. **C** - Lomuto always fixes the pivot as `A[high]`, the last
   element of the current subarray.
4. **B** - on sorted data the last element is always the current
   maximum, so everything else falls on one side and nothing on the
   other, every single call.
5. **C** - a random pivot means no input can be constructed in
   advance to reliably trigger the worst case, since the adversary
   cannot predict which element will be chosen.
6. **B** - `MERGE` allocates brand-new `L` and `R` arrays and copies
   into them every call; that copying, not the call stack, is the
   $O(n)$ auxiliary space cost.
7. **B - False.** This is exactly this week's misconception: a
   first- or last-element pivot hits $O(n^2)$ on any already-sorted or
   reverse-sorted input, which is an entirely ordinary shape for real
   data, not a rare edge case.
8. Open-ended. Accept any answer that identifies: merge sort's divide
   step (splitting at the midpoint) never depends on the data's
   values, so its recurrence $T(n)=2T(n/2)+O(n)$ is fixed regardless
   of input, giving $O(n \log n)$ always. Quicksort's divide step (the
   partition) depends entirely on how the chosen pivot compares to the
   rest of the data - a bad pivot can produce a 0/$(n-1)$ split, so its
   worst-case recurrence departs sharply from its average case.
