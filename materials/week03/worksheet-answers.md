# Week 3 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1.** Correct order: $O(1) \prec O(\log n) \prec O(n) \prec
  O(n\log n) \prec O(n^2) \prec O(n^3) \prec O(2^n) \prec O(n!)$.
  Accept any correct one-sentence justification for the chosen
  adjacent pair, e.g. "$O(n^2)$ beats $O(n^3)$ eventually because for
  large $n$, multiplying by one more factor of $n$ always wins" or
  "$O(2^n)$ eventually beats every polynomial, including $O(n^3)$,
  because exponential growth outpaces any fixed power of $n$."
- **A2.** Checking #1 through #18 in order: 18 steps. Time: $18 \times
  50\text{ns} = 900\text{ns}$.
- **A3.** 1,200 rooms: 1,200 steps, $1{,}200 \times 50\text{ns} =
  60{,}000\text{ns} = 0.06\text{ms}$. 10,000 rooms: 10,000 steps,
  $10{,}000 \times 50\text{ns} = 500{,}000\text{ns} = 0.5\text{ms}$.
- **A4.** $1000n = n^2 \Rightarrow n = 1000$ (dividing both sides by
  $n$, valid since $n \ne 0$). Below $n=1000$: Algorithm A ($1000n$)
  is cheaper. Above $n=1000$: Algorithm B ($n^2$) is cheaper. At
  exactly $n=1000$, they're equal (1,000,000 steps each).

## Part B

- **B1.** Step 1: $3n \le 3n^2$. Step 2: $1 \le n^2$. Step 3: $5n^2 +
  3n + 1 \le 5n^2 + 3n^2 + n^2 = 9n^2$, for all $n \ge 1$. Step 4:
  $c=9$, $n_0=1$. Final statement: $0 \le 5n^2+3n+1 \le 9n^2$ for all
  $n \ge 1$, which is exactly $5n^2+3n+1 = O(n^2)$. (Accept any other
  internally consistent, algebraically valid $(c, n_0)$ pair, e.g.
  the tighter $c=6$, $n_0=3$.)
- **B2.** The bug: $c$ **must be a fixed constant, independent of
  $n$**. Choosing $c = n$ makes $c$ grow with $n$, which is not
  allowed by the definition - the whole point of $c$ is that *one*
  fixed number works for *every* $n \ge n_0$. With $c$ allowed to
  depend on $n$, literally any function could be "proven" $O$ of any
  other, which would make the notation meaningless.
- **B3.** Accept any answer that captures: the Big-O bound must come
  from the fastest-growing term present, and $n^2$ grows strictly
  faster than $n\log n$ for large $n$ (their ratio diverges), so $n^2$
  cannot be dropped. Tempting mistake: $n \log n$ was the more
  "recently learned" or "interesting-looking" term, but recency or
  novelty has nothing to do with which term dominates.
- **B4.** Open-ended; accept any reasonable feature + $O(n^2)$-or-worse
  behavior + a plausible improvement idea (e.g. sorting first and
  using a smarter comparison strategy, hashing, or restricting
  comparisons to a smaller relevant subset instead of all pairs).
