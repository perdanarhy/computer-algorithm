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
| 1 | Building A | 101 |
| 2 | Building A | 206 |
| 3 | Building B | 302 |
| 4 | Building B | 415 |
| 5 | Building C | 110 |
| 6 | Building D | 220 |
| 7 | Building E | 105 |
| 8 | Building F | 301 |
| 9 | Building G | 402 |
| 10 | Building H | 512 |
| 11 | Building H | 615 |
| 12 | Building H | 703 |
| 13 | Building H | 802 |
| 14 | Building I | 210 |
| 15 | Building J | 305 |
| 16 | Building K | 118 |
| 17 | Building L | 220 |
| 18 | Building M | **330** |
| 19 | Building N | 145 |
| 20 | Building O | 101 |

A linear scan starts at #1 and checks entries one at a time in order.
Target: **Building M, room 330** (#18).

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
