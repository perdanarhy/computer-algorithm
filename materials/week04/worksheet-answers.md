# Week 4 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1.** Going down: `factorial(5)` waits on `factorial(4)`; `factorial(4)` waits on `factorial(3)`; `factorial(3)` waits on `factorial(2)`; `factorial(2)` waits on `factorial(1)`; `factorial(1)` waits on `factorial(0)`; `factorial(0)` is the base case, returns `1`. Coming back up: `factorial(0)`=1, `factorial(1)`=1×1=1, `factorial(2)`=2×1=2, `factorial(3)`=3×2=6, `factorial(4)`=4×6=24, `factorial(5)`=5×24=**120**. Six stack frames are alive at the deepest point (`factorial(5)` through `factorial(0)`).
- **A2.** Full call tree for `fib(4)`:
  ```
  fib(4)
  ├─ fib(3)
  │   ├─ fib(2)
  │   │   ├─ fib(1)  [base]
  │   │   └─ fib(0)  [base]
  │   └─ fib(1)  [base]
  └─ fib(2)
      ├─ fib(1)  [base]
      └─ fib(0)  [base]
  ```
  Total calls: **9** (fib(4)×1, fib(3)×1, fib(2)×2, fib(1)×3, fib(0)×2).
  `fib(2)` is computed **2** separate times; `fib(1)` is computed **3**
  separate times. The technique that avoids recomputing them is
  **memoization** (storing each answer the first time it's computed).
  Accept "dynamic programming" as an equivalent answer.
- **A3.** `COUNTDOWN(3)` prints 3, 2, 1, 0, -1, -2, ... forever - it
  never stops, because there is **no base case at all**. Eventually
  this crashes with a stack overflow (too many waiting frames). The
  recursive case is present and correct; what's missing is any check
  that halts the recursion (e.g. `if n < 0: return`).

## Part B

- **B1.** Level 1: 2 subproblems, cost $2 \cdot (n/2) = n$. Level 2:
  size each $n/4$. Level 3: 8 subproblems, cost $8 \cdot (n/8) = n$.
  Level $\log_2 n$: size each $1$, cost $n$. Total levels: $\log_2 n +
  1$. Closed-form total: $T(n) = n(\log_2 n + 1) = O(n \log n)$.
- **B2.** $T(1)=3$, $T(2)=5$, $T(3)=7$, $T(4)=9$, $T(5)=11$. The guess
  $T(n) = 2n+1$ matches every row ($2(0)+1=1$, $2(1)+1=3$, ...,
  $2(5)+1=11$) - **yes, it matches.**
- **B3.** Accept any answer that captures: without a reachable base
  case, the recursive case keeps calling itself indefinitely (or until
  it crashes) - the base case is the only thing that gives the
  recursion (and, once a method branches, its whole tree) a finite
  depth/size in the first place, not merely a convenient stopping
  point chosen at the end.
- **B4.** Open-ended; accept any reasonable naturally-recursive
  example with a coherent base case and recursive case (e.g. a Russian
  nesting doll - base case: the smallest solid doll; recursive case:
  open a doll, find a smaller one inside; or a folder structure - base
  case: a folder with no subfolders; recursive case: list a folder's
  contents, then do the same for each subfolder inside it).
