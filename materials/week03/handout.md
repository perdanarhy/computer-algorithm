# Week 3 Handout - Complexity Analysis

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the worked $O(n^2)$ proof spelled out step by step, the
growth-rate table with real numbers, extra reading, and practice
problems with answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Time complexity** | How an algorithm's running cost grows as input size $n$ grows. |
| **Space complexity** | How much *extra* memory an algorithm needs, as a function of $n$, beyond the input itself. |
| **Asymptotic** | Describing behavior as $n$ gets arbitrarily large - not at one fixed, specific size. |
| **Big-O, $O(g(n))$** | An upper bound on growth rate: $f(n)$ never grows faster than a constant multiple of $g(n)$, for large enough $n$. |
| **Big-Omega, $\Omega(g(n))$** | A lower bound on growth rate: $f(n)$ never grows slower than a constant multiple of $g(n)$, for large enough $n$. |
| **Big-Theta, $\Theta(g(n))$** | A tight bound: $f(n)$ is both $O(g(n))$ and $\Omega(g(n))$ - the growth rate is exactly this shape. |
| **Constants $c$, $n_0$** | The two values a Big-O proof must exhibit to exist: $c$ scales the comparison function, $n_0$ is the point past which the bound is guaranteed to hold. |
| **Dominant term** | The single term in a formula that grows fastest as $n \to \infty$ - the only one that survives inside a Big-O bound. |
| **Growth-rate hierarchy** | The standard order, slowest to fastest: $O(1) \prec O(\log n) \prec O(n) \prec O(n\log n) \prec O(n^2) \prec O(n^3) \prec O(2^n) \prec O(n!)$. |
| **Polynomial time** | Any growth rate $O(n^k)$ for a fixed constant $k$ - considered *tractable*, however large $k$ is. |
| **Exponential / factorial time** | Growth rates like $O(2^n)$ or $O(n!)$ - considered *intractable*: they become uncomputable at realistic input sizes. |
| **Worst case** | The input that makes an algorithm do the most work - Big-O bounds in this course describe the worst case unless stated otherwise. |
| **In-place** | An algorithm using only $O(1)$ extra memory, regardless of $n$. |

---

## Part 2: The Worked Proof, Step by Step

**Claim:** $3n^2 + 10n + 7 = O(n^2)$.

We must exhibit constants $c > 0$ and $n_0 > 0$ such that
$0 \le 3n^2+10n+7 \le c \cdot n^2$ for every $n \ge n_0$.

**Step 1 - bound the middle term.** For all $n \ge 1$, we know
$n \le n^2$ (multiplying both sides of $1 \le n$ by $n \ge 0$). So:

$$10n \le 10n^2 \quad \text{for all } n \ge 1$$

**Step 2 - bound the constant term.** For all $n \ge 1$, we know
$1 \le n^2$. So:

$$7 \le 7n^2 \quad \text{for all } n \ge 1$$

**Step 3 - add the three bounds together.** For all $n \ge 1$:

$$3n^2 + 10n + 7 \;\le\; 3n^2 + 10n^2 + 7n^2 \;=\; 20n^2$$

**Step 4 - name the constants.** Choose $c = 20$ and $n_0 = 1$. Then

$$0 \le 3n^2 + 10n + 7 \le 20n^2 \quad \text{for all } n \ge 1$$

which is exactly the definition of $3n^2+10n+7 = O(n^2)$. $\blacksquare$

**Sanity-check the arithmetic** at $n=1$: left side is
$3+10+7=20$; right side is $20 \times 1 = 20$. $20 \le 20$ holds
(equality is allowed - the definition says $\le$, not $<$).

**A tighter pair also works.** For $n \ge 10$: $10n \le n^2$ (since
$n \ge 10$) and $7 \le n^2$ (since $n \ge 3$ already suffices). So for
$n \ge 10$:

$$3n^2 + 10n + 7 \le 3n^2 + n^2 + n^2 = 5n^2$$

giving $c=5$, $n_0=10$ - a smaller $c$, at the cost of a larger
$n_0$. **Both proofs are correct.** Big-O only requires that *some*
valid $(c, n_0)$ pair exists, not a unique or minimal one. This is
why two students' proofs of the same bound can use different numbers
and both earn full credit, as long as the algebra is valid and the
final inequality actually holds for all $n \ge n_0$.

**The general pattern**, for any polynomial: to prove
$a_k n^k + a_{k-1}n^{k-1} + \cdots + a_0 = O(n^k)$, bound every
lower-order term above by (its coefficient) $\times\, n^k$ using
$n^i \le n^k$ for $i < k$ once $n \ge 1$, then sum the coefficients
to get one valid $c$, with $n_0 = 1$.

---

## Part 3: Growth Rates, With Real Numbers

| Growth rate | $n = 10$ | $n = 100$ | $n = 1{,}000$ |
|---|---|---|---|
| $O(1)$ | 1 | 1 | 1 |
| $O(\log n)$ | ~3 | ~7 | ~10 |
| $O(n)$ | 10 | 100 | 1,000 |
| $O(n \log n)$ | ~33 | ~664 | ~9,970 |
| $O(n^2)$ | 100 | 10,000 | 1,000,000 |
| $O(n^3)$ | 1,000 | 1,000,000 | 1,000,000,000 |
| $O(2^n)$ | 1,024 | ~$1.27 \times 10^{30}$ | unimaginably large |
| $O(n!)$ | ~3,628,800 | ~$9.3 \times 10^{157}$ | incomprehensibly large |

**Why this table is the whole point of the course.** At $n=10$,
every single growth rate above finishes in well under a second on any
computer - even $O(n!)$'s roughly 3.6 million steps. The moment $n$
reaches 100, the picture breaks completely: $O(2^n)$ alone requires
about $1.27 \times 10^{30}$ steps. At one billion steps per second
(a fast modern machine), that is roughly $1.27 \times 10^{21}$
seconds, or about $4 \times 10^{13}$ years - **roughly 3,000 times
the current age of the universe (13.8 billion years).**

An algorithm that is $O(2^n)$ is not "slow." It is **uncomputable**
for any input past a fairly small size, no matter how much faster
computers get. This is why the growth-rate *shape*, not the constant
factor, is what this entire course trains you to identify.

---

## Part 4: Optional Reading - Space Complexity and the CampusNav Numbers

### Space complexity, one more pass

An algorithm's **space complexity** counts extra memory as a function
of $n$, exactly the way time complexity counts extra steps. Swapping
two array entries with one temporary variable is $O(1)$ space - that
single temporary variable never grows, no matter how large the array
is. Copying an entire $n$-entry directory into a second array before
sorting it is $O(n)$ space - the copy grows in direct proportion to
the input. Weeks 5-6 will show sorting algorithms that are both
correct and $O(n \log n)$ in time but differ sharply here: some sort
**in-place** ($O(1)$ extra space), some do not.

### The CampusNav numbers, worked in full

Assume one comparison (an array access plus a string check) costs
about 50 nanoseconds on ordinary hardware - a reasonable, if rough,
estimate.

**Linear scan ($O(n)$), CampusNav's actual `FIND_ROOM`:**

| Directory size | Worst-case steps | Worst-case time |
|---|---|---|
| 1,200 rooms (current, whole campus) | 1,200 | 0.06 ms |
| 10,000+ rooms (partner campuses) | 10,000 | 0.5 ms |

Even at 10,000+ rooms, $O(n)$ alone stays imperceptible to a user.

**Naive duplicate-checker ($O(n^2)$), comparing every pair of entries
to catch a room accidentally listed twice in the signage-scraped
directory:**

| Directory size | Worst-case comparisons | Worst-case time |
|---|---|---|
| 1,200 rooms | $1{,}200^2 = 1{,}440{,}000$ | **72 ms** - starting to be felt in an interactive UI |
| 10,000+ rooms | $10{,}000^2 = 100{,}000{,}000$ | **~5 seconds** - a frozen app |

**The lesson:** $O(n)$ itself was never the danger - the directory
could grow tenfold and stay fast. The danger is any *new* feature
that quietly defaults to $O(n^2)$ (any operation comparing every pair
of entries) riding along on the same growing directory. "Add more
features" is only safe once each new feature's growth rate has been
checked, not assumed.

### Where this course is headed

| Weeks | What gets formalized |
|---|---|
| 2 | What counts as a real algorithm (five properties) |
| 3 | How to measure efficiency precisely, so two correct algorithms can be compared (Big-O) - this week |
| 4 | How to analyze algorithms that call themselves (recursion) |
| 5-7 | Two classic building blocks: sorting and searching, each with a correctness proof |
| 9-12 | Four general paradigms for *inventing* new algorithms |
| 13-14 | Modeling problems as networks (graphs), and the limits of what's efficiently solvable at all |

---

## Part 5: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** Prove, from the formal definition, that $f(n) = 5n + 20$ is
$O(n)$. Exhibit valid constants $c$ and $n_0$.

> **Answer:** For $n \ge 1$: $20 \le 20n$, so $5n + 20 \le 5n + 20n =
> 25n$. Choose $c = 25$, $n_0 = 1$. Then $0 \le 5n+20 \le 25n$ for all
> $n \ge 1$, which is exactly $f(n) = O(n)$. (Other valid pairs exist,
> e.g. $c=6$, $n_0=20$, since $20 \le n$ once $n \ge 20$, giving
> $5n+20 \le 5n+n=6n$.)

**2.** Is $n^2 + n\log n = O(n \log n)$? Justify your answer.

> **Answer:** No - it is $O(n^2)$. The bound must come from the
> fastest-growing term present. For large $n$, $n^2$ grows strictly
> faster than $n \log n$ (their ratio $n / \log n \to \infty$), so
> $n^2$ eventually dominates and cannot be dropped. Reporting
> $O(n\log n)$ drops the *wrong* term - the fastest-growing one,
> instead of the slowest.

**3.** Order the following from slowest- to fastest-growing:
$n^2,\ \log n,\ n!,\ n,\ 2^n,\ 1,\ n\log n$.

> **Answer:** $1 \prec \log n \prec n \prec n\log n \prec n^2 \prec 2^n
> \prec n!$.

**4.** True or false: an algorithm measured at 2 seconds on an input
of size $n=1{,}000$ must be faster than one measured at 5 seconds on
the same input, for every larger input too.

> **Answer:** False. A single timed run at one input size says
> nothing about growth rate - the 2-second algorithm could be
> $O(n^2)$ and the 5-second one $O(n)$ with a larger constant factor,
> in which case the "faster" one at $n=1{,}000$ becomes drastically
> slower once $n$ grows. Only the growth rate, not one measurement,
> predicts behavior at scale.

**5.** CampusNav's linear scan is $O(n)$ and currently handles 1,200
rooms in about 0.06 ms. A new "nearby rooms" feature compares every
pair of rooms to compute distances - what is that feature's growth
rate, and roughly how much worse does its worst-case cost get if the
directory grows from 1,200 to 12,000 rooms (10&times;)?

> **Answer:** Comparing every pair of $n$ rooms is $O(n^2)$. Growing
> $n$ by 10&times; multiplies an $O(n^2)$ cost by roughly
> $10^2 = 100$&times; - a much steeper penalty than the linear scan's
> own 10&times; increase.

**6.** A classmate says "Big-O tells you exactly how many
milliseconds an algorithm takes." What's wrong with this claim, and
what does Big-O actually promise?

> **Answer:** Big-O is a bound on *growth rate*, not a running time.
> It says nothing about constants, the specific machine, the
> programming language, or the exact number of steps - only that cost
> does not grow faster than some constant multiple of $g(n)$ once $n$
> is large enough. Two algorithms with wildly different real running
> times can share the same Big-O bound.
