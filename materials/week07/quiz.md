# Week 7 Self-Check Quiz - Searching Algorithms

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** Which precondition must hold for binary search to be
*correct*, not just fast?

A. The array must contain no duplicate values
B. The array must be sorted
C. The array must have an even number of elements
D. The array must fit in memory

**2.** Linear search's worst-case running time is:

A. O(1)
B. O(log n)
C. O(n)
D. O(n²)

**3.** Binary search's worst-case running time is:

A. O(1)
B. O(log n)
C. O(n)
D. O(n²)

**4.** A binary search loop uses the update `lo = mid` instead of
`lo = mid + 1` on the "target is greater" branch. What is the most
likely consequence?

A. The algorithm becomes faster
B. Nothing changes - both updates are equivalent
C. An infinite loop, on inputs where the range narrows to two adjacent elements
D. An out-of-bounds array access on every input

**5.** The loop invariant for the binary search pseudocode shown in
class is:

A. "`lo` is always less than `mid`"
B. "If the target is present in `A`, it is present within `A[lo..hi]`"
C. "`A[mid]` is always the target"
D. "The array `A` is always sorted"

**6.** Binary search is run on an **unsorted** array and the target
happens to be present. Which outcome is possible?

A. It is guaranteed to always find the target correctly
B. It is guaranteed to always report `NOT-FOUND`
C. It may incorrectly report `NOT-FOUND` even though the target is present
D. It will crash immediately, every time

**7.** A binary search implementation sets `hi = length(A)` at
initialization instead of `length(A) - 1`, but otherwise keeps
`hi = mid - 1` and `while lo <= hi`. This is an example of:

A. A correct alternative convention
B. Mixing the closed and half-open bound conventions, risking an out-of-bounds read
C. A performance-only issue, not a correctness one
D. The standard way binary search is normally written

**8.** In a loop-invariant proof, the "maintenance" step shows:

A. That the invariant is true before the loop starts
B. That if the invariant holds at the start of an iteration, it still holds at the start of the next one
C. That the loop terminates in finite time
D. That the algorithm is efficient

**9. Short answer.** In your own words, explain why "binary search
works on unsorted data, it's just slower" is a false statement. Give
a short, concrete example (from class or your own reasoning).

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - binary search's entire correctness argument depends on the
   array being sorted; nothing else is required.
2. **C** - linear search may need to check every one of the $n$
   entries in the worst case.
3. **B** - binary search halves the remaining range each step, giving
   logarithmic worst-case cost.
4. **C** - when the range narrows to two adjacent indices, `mid`
   equals `lo`, and `lo = mid` leaves `lo` unchanged forever, causing
   an infinite loop; it does not happen on every input, only that
   specific edge case.
5. **B** - "if the target is present in `A`, it is present within
   `A[lo..hi]`" is the exact loop invariant proved in class.
6. **C** - on unsorted data, the maintenance step's reasoning
   ("everything `<= mid` is `<= A[mid]`") breaks, so the algorithm can
   discard the half that actually contains the target and report a
   false `NOT-FOUND`, even though the target is present.
7. **B** - `hi` was initialized under the half-open convention while
   the update and loop condition use the closed convention; this
   mismatch can let `mid` reach an out-of-bounds index.
8. **B** - maintenance proves the invariant is preserved from one
   iteration to the next; initialization and termination are the
   other two (separate) parts of the proof.
9. Open-ended. Accept any answer that correctly identifies that
   binary search's core reasoning - "everything before `mid` is
   `<= A[mid]`, everything after is `>= A[mid]`" - is only true when
   the array is sorted, and that violating it can make the algorithm
   *skip* the half of the array that actually contains the target,
   producing a wrong (not just slow) answer. Accept the class example
   (searching `[50, 10, 30, 90, 5]` for `10`, incorrectly returning
   `NOT-FOUND`) or an equivalent original example.
