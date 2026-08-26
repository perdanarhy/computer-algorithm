# Week 11 Handout - Dynamic Programming I

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, both worked examples explained step by step, extra reading,
and practice problems with answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Dynamic programming (DP)** | Solving a big problem by solving each distinct smaller version of it exactly once, and reusing that answer every time it's needed again. |
| **Optimal substructure** | The best overall answer is built from the best answers to its own smaller pieces. Shared with greedy (Week 10) and divide-and-conquer (Week 9). |
| **Overlapping subproblems** | The same smaller sub-question shows up over and over again while solving the bigger one. |
| **Recurrence relation** | An equation defining a problem's answer in terms of the answers to its own smaller subproblems. |
| **Base case** | The smallest subproblem(s), answered directly, with no further recursion - where a recurrence bottoms out. |
| **Memoization** | Top-down: a normal recursive function, plus a cache that's checked first and filled after each first computation. |
| **Tabulation** | Bottom-up: an iterative loop that fills a table of subproblem answers in dependency order, smallest first. |
| **DP table / state** | The structure holding one stored answer per distinct subproblem; a "state" is which specific subproblem one cell represents. |
| **State space** | The full set of distinct states a DP table must cover - its size sets the table's dimensions and the algorithm's runtime. |
| **0/1 knapsack** | Choosing a subset of items, each with a cost and a value, to maximize total value under one shared budget, each item either fully taken or fully left out. |

---

## Part 2: The Worked Examples, Step by Step

### Example 1 - Fibonacci: memoization vs. tabulation

Both implement the **same recurrence**: `fib(n) = fib(n-1) +
fib(n-2)`, with base cases `fib(0) = 0`, `fib(1) = 1`.

**Memoization (top-down).**

```text
FIB_MEMO(n, cache):
    if n <= 1:
        return n
    if cache[n] is set:
        return cache[n]
    cache[n] = FIB_MEMO(n-1, cache) + FIB_MEMO(n-2, cache)
    return cache[n]
```

**Tabulation (bottom-up).**

```text
FIB_TAB(n):
    table[0] = 0
    table[1] = 1
    for i = 2 to n:
        table[i] = table[i-1] + table[i-2]
    return table[n]
```

They are **not two different algorithms**. Both solve exactly the
same $n+1$ distinct subproblems, exactly once each, in $O(n)$ time and
$O(n)$ space. The only difference is *direction*: memoization starts
from the question you actually asked (`fib(n)`) and recurses down,
filling the cache lazily, only for subproblems actually needed;
tabulation starts from the base cases and iterates up, filling every
entry in order, whether or not the original caller strictly needed it.

**Why this matters - the blow-up it fixes.** The naive recursive
version (no cache) recomputes the same small values exponentially
many times:

| $n$ | Naive recursive calls | Memo/tabulation operations |
|---|---|---|
| 10 | 177 | 10 |
| 20 | 21,891 | 20 |
| 30 | 2,692,537 | 30 |

At $n = 30$, that's roughly **90,000× more work** for the naive
version - to compute the exact same number. This is the exact call
tree Week 4 traced by hand; today's fix is what makes it usable at
real scale.

**Trace snapshot** (tabulation, `table[i] = table[i-1] + table[i-2]`):

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `table[i]` | 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 |

`table[7] = table[6] + table[5] = 8 + 5 = 13` - both source cells were
already solved; neither is recomputed.

### Example 2 - CampusNav's Tour Planner (0/1 knapsack), fully traced

**Problem.** Free block: 60 minutes. Nearby activities, each done at
most once:

| Activity | Duration (min) | Enjoyment |
|---|---|---|
| Coffee | 20 | 15 |
| Gallery | 30 | 25 |
| Friend | 10 | 8 |
| Music | 40 | 40 |

Maximize total enjoyment without exceeding 60 minutes.

**Testing the two conditions.**

- *Optimal substructure?* Yes - the best 60-minute plan either
  includes Music or it doesn't; either way, the remainder must be the
  best possible plan for whatever time and activities are left.
- *Overlapping subproblems?* Yes - "best plan for 20 minutes using
  {Coffee, Gallery, Friend}" is asked whether or not Music ends up
  chosen, and other decision branches ask it too.

**Recurrence.** Let `best(i, t)` = the best value achievable using
only the first $i$ activities, within a time budget of $t$ minutes:

$$
best(i,t) = \max\big(\, best(i-1,t),\ \ value_i + best(i-1,\, t - duration_i)\, \big)
$$

(the second term only applies when `duration_i <= t`). Base case:
`best(0, t) = 0` for all $t$.

**Full table** (columns = minutes of budget, in steps of 10; rows =
activities considered so far):

| | 0 | 10 | 20 | 30 | 40 | 50 | 60 |
|---|---|---|---|---|---|---|---|
| 0 items | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| +Coffee | 0 | 0 | 15 | 15 | 15 | 15 | 15 |
| +Gallery | 0 | 0 | 15 | 25 | 25 | 40 | 40 |
| +Friend | 0 | 8 | 15 | 25 | 33 | 40 | 48 |
| +Music | 0 | 8 | 15 | 25 | 40 | 48 | **55** |

**Reading the answer.** The final cell, `best(4, 60) = 55`, is
computed as `max(best(3,60)=48, 40 + best(3,20)=15) = max(48, 55) =
55`. Since the second term won, Music is included, using 40 of the 60
minutes and leaving `best(3, 20) = 15` to solve - which traces back to
`best(1, 20) = 15` (Coffee alone; Friend at that budget only reaches
8, so it loses out). **Optimal plan: Coffee + Music, exactly 60
minutes used, 55 enjoyment** - beating the 48 that "always pick the
best enjoyment-per-minute option first" found.

### Example 3 (brief) - Climbing stairs = Fibonacci in disguise

CampusNav's "20-step shortcut" counter (Week 9's numeric trick, Week
4's exploding recursion tree) asks: how many distinct ways to climb
$n$ steps, 1 or 2 at a time? `ways(n) = ways(n-1) + ways(n-2)`,
`ways(0) = ways(1) = 1` - literally Fibonacci's recurrence with
different starting labels. Tabulating it gives **ways(20) = 10,946**
in 20 additions.

---

## Part 3: Optional Reading

- **CLRS, Dynamic Programming chapter (Ch. 14):** read the rod-cutting
  section and the "elements of dynamic programming" section carefully
  (these are the formal versions of "optimal substructure" and
  "overlapping subproblems" from today); skim the rest.
- **Why "optimal substructure" alone isn't the DP signal.** Both
  greedy (Week 10) and divide-and-conquer (Week 9) also rely on
  optimal substructure - that's not what makes a problem *need* DP.
  The deciding factor is whether the greedy-choice property holds
  (then greedy alone suffices, no storage needed) and whether
  subproblems overlap (then storage is worth it; if they don't, as in
  merge sort, plain recursion is already fine).
- **Bellman's naming anecdote.** Richard Bellman coined "dynamic
  programming" at RAND in the 1950s partly to sound impressive and
  politically inoffensive to a funding sponsor - "programming" meant
  *planning/scheduling*, unrelated to writing code. Worth remembering
  next time a course term sounds oddly disconnected from its meaning.

---

## Part 4: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** Trace the Fibonacci tabulation table by hand for $n = 7$: write
`table[0]` through `table[7]`.

> **Answer:** 0, 1, 1, 2, 3, 5, 8, 13.

**2.** True or false: memoization and tabulation can return different
answers for the same input, because they're different algorithms.

> **Answer:** False. Both implement the identical recurrence and
> base cases; they always agree. Only their computation order (and
> sometimes their space usage) differs.

**3.** A new knapsack-style instance has a 40-minute free block and
two activities: Snack (10 min, enjoyment 6) and Movie clip (30 min,
enjoyment 20). Using the recurrence from Example 2, what's the
best achievable enjoyment, and which activities are chosen?

> **Answer:** Both fit together (10 + 30 = 40 minutes exactly), so the
> best plan takes both: enjoyment $6 + 20 = 26$.

**4.** CampusNav's shortcut counter is changed to allow 1, 2, *or 3*
steps at a time. Write the new recurrence, and compute `ways(4)` by
hand (base cases: `ways(0) = 1`, `ways(1) = 1`, `ways(2) = 2`).

> **Answer:** `ways(n) = ways(n-1) + ways(n-2) + ways(n-3)`.
> `ways(3) = ways(2) + ways(1) + ways(0) = 2 + 1 + 1 = 4`.
> `ways(4) = ways(3) + ways(2) + ways(1) = 4 + 2 + 1 = 7`.

**5.** True or false: any problem solvable by recursion automatically
benefits from memoization.

> **Answer:** False. Memoization only helps when subproblems
> *overlap*. Merge sort (Week 9) is recursive, but its subproblems
> (each half of the array) never repeat - caching them would add
> bookkeeping cost for zero benefit.

**6.** In the Tour Planner table (Part 2, Example 2), what is
`best(2, 40)` (using only Coffee and Gallery, within 40 minutes), and
which of the two, if either, does it use?

> **Answer:** `best(2, 40) = 25`, using Gallery alone (30 min, value
> 25) - Coffee alone only reaches 15, and both together need 50
> minutes, which doesn't fit in the 40-minute budget.
