# Week 12 Self-Check Quiz - Dynamic Programming II (Longest Common Subsequence)

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** Which best defines a "subsequence" of a sequence?

A. A contiguous block of elements taken from the sequence
B. Any set of elements that appear anywhere in the sequence, in any order
C. A sequence obtained by deleting zero or more elements without changing the relative order of what's left
D. The sequence reversed

**2.** Is "ACE" a substring of "ABCDE"?

A. Yes, because all its letters appear somewhere in "ABCDE"
B. No, because its letters are not contiguous in "ABCDE"
C. Yes, because it is alphabetically ordered
D. No, because it is shorter than "ABCDE"

**3.** In the LCS recurrence, when $x_i = y_j$ (the characters
match), $L(i,j)$ is set to:

A. $\max(L(i-1,j), L(i,j-1))$
B. $L(i-1,j-1) + 1$
C. $L(i-1,j-1)$
D. $\min(L(i-1,j), L(i,j-1)) + 1$

**4.** When $x_i \ne y_j$ (the characters don't match), $L(i,j)$ is
set to:

A. 0
B. $L(i-1,j-1)$
C. $\max(L(i-1,j), L(i,j-1))$
D. $L(i-1,j) + L(i,j-1)$

**5.** What is the base case for row 0 or column 0 of the LCS table
(comparing against an empty prefix)?

A. 1, since an empty sequence trivially matches anything
B. Undefined - the table can't start without a first real match
C. 0, since nothing can be shared with an empty sequence
D. Equal to the length of the non-empty sequence

**6.** What does the traceback procedure give you that the filled
table alone does not?

A. The time complexity of the algorithm
B. The actual longest common subsequence, not just its length
C. Whether X and Y are anagrams of each other
D. A sorted version of X and Y

**7.** For sequences of length $m$ and $n$, what are the time and
space complexity of building the full LCS DP table?

A. $O(m+n)$ time and space
B. $O(mn)$ time and space
C. $O(2^m)$ time, $O(mn)$ space
D. $O(m \log n)$ time and space

**8. Short answer.** In your own words, explain why LCS needs a
**2-D** table (indexed by both $i$ and $j$) instead of the 1-D table
used in Week 11's DP problems. One or two sentences.

_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **C** - a subsequence deletes elements but never reorders what's
   left; that's what allows gaps.
2. **B** - "ACE" skips B and D, so its letters are not contiguous in
   "ABCDE"; it is a subsequence, but not a substring.
3. **B** - a match always extends the diagonal cell by exactly 1.
4. **C** - a mismatch means the best answer comes from dropping
   whichever character doesn't help, i.e. the larger of the two
   neighbors.
5. **C** - an empty prefix has no elements to share with anything,
   so its LCS length against anything is 0.
6. **B** - the table alone only tells you the *length*; traceback
   walks it backward to recover the actual matching characters.
7. **B** - the table has $(m+1)(n+1)$ cells, each filled in $O(1)$
   time, so both time and (full-table) space are $O(mn)$.
8. Open-ended. Accept any answer that captures: the LCS subproblem
   has to track progress through **both** sequences at once - "how
   far into $X$" and "how far into $Y$" - so a single index can't
   describe the state; Week 11's problems (e.g. the Tour Planner,
   climbing stairs) only ever tracked progress through one sequence
   or one running total, so one index was enough.
