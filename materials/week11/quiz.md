# Week 11 Self-Check Quiz - Dynamic Programming I

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** A problem is a good candidate for dynamic programming exactly
when it has:

A. Recursion and nothing else
B. Optimal substructure only
C. Overlapping subproblems only
D. Both optimal substructure and overlapping subproblems

**2.** Memoization and tabulation are best described as:

A. Two different algorithms that may give different answers
B. Two implementations of the same recurrence - top-down with a cache vs. bottom-up with a table
C. Tabulation is always faster than memoization
D. Memoization only works on recursive functions, tabulation only on loops

**3.** Naive recursive Fibonacci (`fib(n) = fib(n-1) + fib(n-2)`, no
cache) makes roughly how many calls as $n$ grows, compared to the
tabulated version?

A. About the same number of steps
B. Exponentially more calls than the tabulated version's linear steps
C. Fewer calls, because recursion is always more efficient
D. It depends only on the programming language used

**4.** In the CampusNav Tour Planner example (slot 4), always picking
whichever remaining activity gave the best enjoyment-per-minute:

A. Always finds the mathematically best combination
B. Found a plan worth 48 enjoyment, while the true best was 55 - because a locally best pick can block a better overall combination
C. Was mathematically identical to the DP table's answer
D. Failed only because the numbers in the example were unrealistic

**5.** CampusNav's "20-step shortcut" counter (1 or 2 steps at a time)
follows which recurrence?

A. `ways(n) = ways(n-1) * ways(n-2)`
B. `ways(n) = ways(n-1) + ways(n-2)`
C. `ways(n) = 2 * ways(n-1)`
D. `ways(n) = ways(n/2) + O(n)`

**6.** Which of these does **not** actually need dynamic programming?

A. Counting distinct ways to climb $n$ stairs, 1 or 2 steps at a time
B. The 0/1 knapsack-shaped Tour Planner
C. Merge sort's divide-and-recombine step, since its two halves never overlap
D. Counting binary strings of length $n$ with no two consecutive 1s

**7.** In a 0/1 knapsack DP table with $i$ = items considered and $t$
= time budget used so far, a cell `best(i, t)` depends on:

A. Only cells in the same row
B. Only cells in row $i-1$ (same or smaller $t$)
C. Every cell in the entire table, regardless of $i$ or $t$
D. Only the very first row

**8. Short answer.** In your own words, explain why *optimal
substructure alone* is not enough reason to reach for dynamic
programming. Give a short, concrete example (from class or your own
reasoning).

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **D** - a problem needs both conditions; either one alone is not
   sufficient reason to use DP.
2. **B** - same recurrence, same set of distinct subproblems, solved
   once each; only the direction of computation differs.
3. **B** - the naive version's call count grows exponentially
   ($O(2^n)$-shaped), while the cached version is linear ($O(n)$) -
   at $n=30$, roughly 90,000× more work for the naive version.
4. **B** - the best-per-minute-first pick left 10 minutes unused and
   scored 48, while the DP table proved 55 was achievable (Coffee +
   Music) - a locally best choice blocked the globally best plan.
5. **B** - identical in shape to Fibonacci's recurrence, just
   different starting values and a different story.
6. **C** - merge sort has optimal substructure but its two halves
   never recur as the same subproblem, so it has no overlapping
   subproblems; plain recursion (D&C) is already correct and
   sufficient.
7. **B** - tabulation/knapsack DP cells only ever depend on the
   *previous* item row, at the same or a smaller time budget - never
   on later rows or larger budgets.
8. Open-ended. Accept any answer that correctly notes optimal
   substructure alone is exactly what greedy (Week 10) and
   divide-and-conquer (Week 9) already rely on with nothing stored;
   DP is only worth its extra bookkeeping when subproblems *also*
   overlap - e.g. merge sort's halves have optimal substructure but
   never repeat, so caching them buys nothing.
