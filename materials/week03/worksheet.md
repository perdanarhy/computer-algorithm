# Week 3 Worksheet - Complexity Analysis

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~15 minutes)

**A1. Card sort.** Below is a shuffled set of growth-rate labels.
Write them, in the blanks, from **slowest-growing to
fastest-growing**:

$$
O(n^3), \quad O(1), \quad O(2^n), \quad O(\log n), \quad O(n!), \quad
O(n), \quad O(n \log n), \quad O(n^2)
$$

Slowest &rarr; Fastest:

1. _______________  2. _______________  3. _______________  4. _______________

5. _______________  6. _______________  7. _______________  8. _______________

Pick **one adjacent pair** from your ordering above and justify it in
one sentence: why is the one you placed second definitely bigger, for
large $n$?

_____________________________________________________________

**A2. Time it by hand.** Below is a 20-entry sample from CampusNav's
room directory, sorted alphabetically by building name.

| # | Building | Room |
|---|---|---|
| 1 | 가야관 | 101 |
| 2 | 가야관 | 206 |
| 3 | 공학관 | 302 |
| 4 | 공학관 | 415 |
| 5 | 노트르담관 | 110 |
| 6 | 대양홀 | 220 |
| 7 | 미디어센터 | 105 |
| 8 | 법학관 | 301 |
| 9 | 산업협력관 | 402 |
| 10 | 성파관 | 512 |
| 11 | 성파관 | 615 |
| 12 | 성파관 | 703 |
| 13 | 성파관 | 802 |
| 14 | 예술관 | 210 |
| 15 | 인당관 | 305 |
| 16 | 인문관 | 118 |
| 17 | 자연과학관 | 220 |
| 18 | 정보통신관 | **330** |
| 19 | 창의관 | 145 |
| 20 | 학생회관 | 101 |

A linear scan starts at #1 and checks entries one at a time in order.
Target: **정보통신관 330** (#18).

Entries checked (list the numbers, in order): _______________________

Total steps: _______

If a single comparison takes about 50 nanoseconds, how long does this
worst-case scan take, in nanoseconds? _______________

**A3. Extrapolate.** Using the *shape* of linear search - cost grows
proportionally with directory size $n$ - fill in the worst-case step
counts for CampusNav's real directory sizes (50 ns/comparison):

| Directory size | Worst-case steps | Worst-case time |
|---|---|---|
| 1,200 (whole campus) | _______ | _______ |
| 10,000 (partner campuses) | _______ | _______ |

**A4. The crossover.** From this morning's warm-up: Algorithm A costs
$1000n$ steps, Algorithm B costs $n^2$ steps. Find the exact value of
$n$ where they cost the same (solve $1000n = n^2$ for $n \ne 0$).
Which algorithm is cheaper *below* that value of $n$? Which is
cheaper *above* it?

Crossover $n =$ _______   Cheaper below: _______   Cheaper above: _______

---

## Worksheet Part B (~15 minutes)

**B1. Complete the proof.** Fill in the blanks to prove
$5n^2 + 3n + 1 = O(n^2)$.

- Step 1: for all $n \ge 1$, $n \le n^2$, so $3n \le$ __________.
- Step 2: for all $n \ge 1$, $1 \le n^2$, so $1 \le$ __________.
- Step 3: adding, $5n^2 + 3n + 1 \le 5n^2 +$ ____ $+$ ____ $=$ ____ $n^2$, for all $n \ge 1$.
- Step 4: choose $c =$ _______ and $n_0 =$ _______. State the final inequality this proves:

_____________________________________________________________

**B2. Find the bug in this "proof."** A classmate writes: "$n^2 =
O(n)$, because I can pick $c = n$ and then $n^2 \le c \cdot n = n
\cdot n = n^2$, so it holds." What's wrong with this argument?
(Hint: re-read what kind of thing $c$ is allowed to be.)

_____________________________________________________________
_____________________________________________________________

**B3. Short answer.** In your own words (2-3 sentences), explain why
$n^2 + n\log n$ is $O(n^2)$ and **not** $O(n \log n)$ - and why a
student might be tempted to answer wrong.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

**B4. Connect it back.** Name one feature (CampusNav or any real app)
that you think is secretly $O(n^2)$ or worse - something that
compares every pair of items, or checks every item against every
other item. What would you change to make it scale better?

Feature: _______________________________________________
Idea to improve it: _____________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

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

### Part B

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
