# Week 4 Self-Check Quiz - Recursion & Recurrence

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** A recursive algorithm's base case is best described as:

A. An optional step that makes the code shorter
B. The smallest input the algorithm answers directly, which bounds how deep the recursion can go
C. The first line of any function
D. A performance optimization, unrelated to correctness

**2.** Which recurrence correctly describes `factorial(n)`'s cost,
where each call does $O(1)$ work of its own?

A. $T(n) = T(n-1) + O(1)$
B. $T(n) = 2T(n-1) + O(1)$
C. $T(n) = T(n/2) + O(1)$
D. $T(n) = T(n-1) + O(n)$

**3.** In the substitution method for solving a recurrence, after
guessing a closed-form answer, the next step is to:

A. Run the algorithm on a large input and time it
B. Prove the guess correct by mathematical induction
C. Draw a recursion tree instead
D. Assume the guess is correct without checking

**4.** CampusNav's `allOrders` function (counting every possible tour
order) branches into one recursive call per *remaining stop*, at every
level. As the number of stops grows, its total number of recursive
calls grows:

A. Linearly, like `factorial`
B. Logarithmically
C. Factorially/exponentially - far faster than `factorial(n)`'s own recursion
D. It stays constant

**5.** True or False: recursion is inherently slower than iteration,
regardless of what the recursive algorithm actually does.

A. True
B. False

**6.** In the recursion-tree method for $T(n) = 2T(n/2) + O(n)$, why
does every level of the tree cost about the same, $O(n)$?

A. Because there are only 2 levels total
B. Because each level has fewer, but proportionally larger, subproblems that add back up to about $n$
C. Because the base case is reached instantly
D. It's a coincidence specific to this one recurrence

**7.** The Master Theorem, as previewed this week, is used to:

A. Prove any algorithm is correct
B. Provide a shortcut for solving recurrences of the shape $T(n) = aT(n/b) + f(n)$ by comparing $f(n)$ to $n^{\log_b a}$
C. Convert any recursive algorithm into an iterative one automatically
D. Calculate an algorithm's exact running time in seconds

**8. Short answer.** In your own words, explain why `factorial(n)` and
CampusNav's `allOrders(stops)` are both fully recursive, yet one stays
cheap ($O(n)$) while the other explodes ($O(n!)$). What is the actual
difference between them?

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - the base case is the smallest input answered directly, and
   it is what bounds the recursion's depth, not just a stopping
   convenience.
2. **A** - $T(n) = T(n-1) + O(1)$: one smaller call, plus constant
   work, matching the call-stack trace hand-counted in class.
3. **B** - guess, then prove the guess correct by induction; a guess
   checked on one example is not a proof.
4. **C** - `allOrders` branches into every remaining stop at every
   level, so its call count grows factorially ($n!$), far faster than
   `factorial(n)`'s own linear ($O(n)$) recursion.
5. **B - False.** The real cost driver is how many calls happen and
   whether they repeat work, not whether the code is written with a
   loop or a call stack - `factorial` and CampusNav's `tourTime` are
   both just as cheap recursively as iteratively.
6. **B** - at each level, the subproblems get smaller but there are
   proportionally more of them, and for this particular recurrence
   those two effects exactly cancel, leaving about $n$ total work per
   level.
7. **B** - it's a shortcut for the common divide-and-conquer
   recurrence shape, comparing the combining work $f(n)$ to
   $n^{\log_b a}$; full conditions and proof come in Week 9.
8. Open-ended. Accept any answer that correctly identifies: both
   functions are equally recursive, but `factorial` makes exactly
   **one** recursive call per call (a straight-line tree, $n$ calls
   deep), while `allOrders` makes **one call per remaining stop**,
   so its recursion tree *branches* at every level, producing $n!$
   leaves instead of $n$. The explosion comes from branching, not from
   recursion itself.
