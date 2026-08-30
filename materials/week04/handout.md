# Week 4 Handout - Recursion & Recurrence

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the factorial call-stack trace explained step by step, the
substitution-method proof spelled out in full, the tour-order
recursion tree explained, extra reading, and practice problems with
answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Recursion** | Solving a problem by solving one or more smaller instances of the *same* problem. |
| **Base case** | The smallest input a recursive method answers directly, with no further self-call. Bounds how deep the recursion can go. |
| **Recursive case** | The step where the method expresses a bigger input's answer in terms of a smaller input's answer. |
| **Call stack** | Where the computer keeps track of every call that is still "waiting" on a smaller call to finish, in order. |
| **Stack frame** | One entry on the call stack - one paused, waiting call, with its own local variables. |
| **Recurrence relation** | A formula for an algorithm's cost, written partly in terms of its own cost on a smaller input, e.g. $T(n) = T(n-1) + O(1)$. |
| **Closed-form solution** | A formula for $T(n)$ with no recurrence left in it, e.g. $T(n) = O(n)$. |
| **Substitution method** | Guess the closed-form answer to a recurrence, then prove the guess correct by mathematical induction. |
| **Recursion tree** | A diagram of every recursive call an algorithm makes, used to total its cost level by level. |
| **Master Theorem** | A shortcut for solving recurrences of the shape $T(n) = aT(n/b) + f(n)$, without redoing a recursion tree every time (full conditions and proof: Week 9). |
| **Memoization** | Storing a recursive call's answer the first time it's computed, so an identical later call is free. Not covered in depth until Week 11 - named here because it is the fix Week 4's exploding example is missing. |
| **Stack overflow** | A crash caused by too many waiting call-stack frames at once - usually a missing or unreachable base case. |

---

## Part 2: The Call-Stack Trace, Step by Step

This is the exact trace from the slides: `factorial(4)`, computed
recursively.

```text
FACTORIAL(n):
    if n == 0:
        return 1                    # base case
    return n * FACTORIAL(n - 1)     # recursive case
```

**Going down** - each call needs a smaller call to finish before it can return anything:

| Step | Call | Waiting on |
|---|---|---|
| 1 | `factorial(4)` | `factorial(3)` |
| 2 | `factorial(3)` | `factorial(2)` |
| 3 | `factorial(2)` | `factorial(1)` |
| 4 | `factorial(1)` | `factorial(0)` |
| 5 | `factorial(0)` | **nothing - base case, returns 1 immediately** |

At the bottom of the trace, **five stack frames are alive at once**,
each paused mid-computation, each holding its own copy of `n`. This is
what "the call stack" concretely means: a pile of paused function
calls, most recent on top.

**Coming back up** - now each paused call finally has what it needed, and finishes in reverse order:

| Step | Call finishes as | Returns to |
|---|---|---|
| 6 | `factorial(0)` = `1` | `factorial(1)` |
| 7 | `factorial(1)` = 1 × 1 = `1` | `factorial(2)` |
| 8 | `factorial(2)` = 2 × 1 = `2` | `factorial(3)` |
| 9 | `factorial(3)` = 3 × 2 = `6` | `factorial(4)` |
| 10 | `factorial(4)` = 4 × 6 = `24` | the original caller |

**Why this matters:** notice the base case (`factorial(0)`) is the
*only* step that doesn't create a new frame. If it were missing - say,
if the code checked `n == -1` instead of `n == 0` - `factorial(4)`
would call `factorial(3)`, `factorial(2)`, `factorial(1)`,
`factorial(0)`, `factorial(-1)`, `factorial(-2)`, forever, piling up
stack frames until the program crashes with a stack overflow. The base
case is not a minor detail; it is the thing that makes the recursion
tree finite at all.

---

## Part 2b: A Clean Induction Example, Before the Real Thing

Before applying induction to a recurrence (harder, because the formula
involves $T$ calling itself), it helps to see induction proved once on
something simpler and completely non-algorithmic.

**Claim:** for every integer $n \ge 1$,

$$
1 + 2 + \cdots + n = \frac{n(n+1)}{2}
$$

**Base case ($n = 1$):** the left side is just $1$. The right side is
$\frac{1 \cdot 2}{2} = 1$. Equal - the base case holds.

**Inductive hypothesis:** assume the claim is true for some $n$, i.e.
assume $1 + 2 + \cdots + n = \frac{n(n+1)}{2}$.

**Inductive step:** show the claim then holds for $n + 1$ too:

$$
1 + 2 + \cdots + n + (n+1) = \frac{n(n+1)}{2} + (n+1)
$$

using the inductive hypothesis to replace $1 + 2 + \cdots + n$ with
$\frac{n(n+1)}{2}$. Simplify the right side:

$$
\frac{n(n+1)}{2} + (n+1) = \frac{n(n+1) + 2(n+1)}{2} = \frac{(n+1)(n+2)}{2}
$$

which is exactly the claimed formula with $n+1$ in place of $n$. The
inductive step holds.

**Conclusion:** base case + inductive step together prove the formula
true for every $n \ge 1$. **QED.**

This is the same two-part shape (base case, inductive step) the
substitution-method proof in Part 3 uses - the only difference is that
Part 3's inductive hypothesis is a statement about a recurrence, $T(n)$,
instead of a sum. Getting comfortable with the shape here first, on
plain arithmetic, makes the recurrence version far less mysterious.

---

## Part 3: The Substitution Method, Fully Proven

**Claim:** for the recurrence $T(n) = T(n-1) + d$ (constant work $d$
per call, base case $T(0) = d_0$), $T(n) = O(n)$.

**Step 1 - guess.** Based on the call-stack trace above (`factorial(4)`
used exactly 4 recursive calls, `factorial(n)` will use exactly $n$),
guess $T(n) \le cn + d_0$ for some constant $c \ge d$ and all $n \ge 0$.

**Step 2 - base case of the induction.** At $n = 0$: $T(0) = d_0 \le
c \cdot 0 + d_0 = d_0$. True, with equality.

**Step 3 - inductive hypothesis.** Assume the guess holds for $n - 1$:

$$
T(n-1) \le c(n-1) + d_0
$$

**Step 4 - inductive step.** Using the recurrence itself:

$$
T(n) = T(n-1) + d \le \big[c(n-1) + d_0\big] + d = cn - c + d_0 + d
$$

We need $cn - c + d_0 + d \le cn + d_0$, i.e. $d \le c$. Since we chose
$c \ge d$ in Step 1, this holds.

**Step 5 - conclusion.** By induction, $T(n) \le cn + d_0$ for all
$n \ge 0$, so $T(n) = O(n)$. **QED.**

This matches the trace exactly: `factorial(4)` made 4 recursive calls
before hitting the base case, and in general `factorial(n)` makes
exactly $n$ - linear in $n$, just as the proof concludes.

**Why bother proving what the trace already suggested?** The trace
only tells you about $n = 4$. The proof tells you about *every* $n$ at
once - which is the whole reason substitution exists: a guess checked
on one example is not a proof, exactly as Week 2's `MAX` bug warned
about testing versus correctness.

---

## Part 4: The Tour-Order Recursion Tree, Fully Explained

CampusNav's naive `allOrders` function, for a set of remaining stops:

```text
ALLORDERS(remaining):
    if remaining is empty:
        return 1                          # base case: one order, "done"
    total = 0
    for each stop in remaining:
        total = total + ALLORDERS(remaining - stop)
    return total
```

Trace it on 3 stops, `{Library, Gym, Dorm}`:

- `allOrders({L, G, D})` branches into **3** calls: one per choice of
  first stop - `allOrders({G, D})`, `allOrders({L, D})`, `allOrders({L, G})`.
- Each of those branches into **2** calls (one per remaining stop).
- Each of *those* branches into **1** call (the last stop, forced).
- Each of *those* hits the base case, `allOrders(∅) = 1`.

Multiplying branch counts level by level: $3 \times 2 \times 1 = 6$
leaves - 6 total orders, matching $3! = 6$.

**Why this is exponential (worse, in fact - factorial) and
`factorial(n)` above is not:** both functions are equally
"recursive." The difference is *branching*. `factorial(n)` makes
exactly **one** recursive call per call - the recursion tree is a
straight line, $n$ calls deep, $O(n)$ total work. `allOrders`
makes **one call per remaining stop** - the tree branches, and the
number of leaves is $n!$:

| Stops | Recursive calls (leaves) |
|---|---|
| 3 | $3! = 6$ |
| 6 | $6! = 720$ |
| 10 | $10! = 3{,}628{,}800$ |
| 12 | $12! = 479{,}001{,}600$ |

This is the exact demo from the slides: 3 stops finish instantly, 10
stops froze the laptop for the rest of class. **The fix is not "make
it iterative"** - an iterative version would still generate all $n!$
orders. The real fix (Week 11, dynamic programming) notices that
`allOrders(remaining)` only depends on *which* stops remain, not on
the order taken to reach that set - so many different branches of the
tree ask for the exact same sub-answer, and storing it once
(memoization) avoids recomputing it. That is not covered in depth
until Week 11; the point here is just to see clearly *why* the tree
explodes and *what kind* of explosion it is.

---

## Part 5: Optional Reading - Recursion Before Computers Had a Call Stack

Self-reference is centuries older than programming. $n! = n \times
(n-1)!$ and the Fibonacci sequence ($F(n) = F(n-1) + F(n-2)$) are both
recursive *definitions* from mathematics, and mathematical induction -
proving a base case, then proving "true for $n$ given true for
$n-1$" - is the exact same shape of argument, used to prove theorems
rather than compute values.

Early programming languages did not automatically support a procedure
calling itself. **FORTRAN (1957)** explicitly disallowed it, because
nobody had yet built a runtime mechanism capable of tracking many
"waiting" calls at once - you can see why, from the call-stack trace
above: recursion needs somewhere to keep every paused frame, in order,
until it's ready to resume. That mechanism is the call stack. Once
**LISP (John McCarthy, 1958)** and **ALGOL 60** built it in as a
language feature, recursive procedures stopped being a mathematical
curiosity and became a normal engineering tool - because so many real
problems (traversing a tree, parsing a nested expression, splitting a
problem in half) are naturally defined in terms of smaller versions of
themselves.

**Where this course is headed:**

| Weeks | What gets formalized |
|---|---|
| 4 | Tracing recursion, writing and solving recurrences (this week) |
| 6 | Merge sort - the first real algorithm whose recurrence, $T(n) = 2T(n/2) + O(n)$, was previewed today |
| 9 | Divide-and-conquer as a general design paradigm, and the Master Theorem, proven properly |
| 11 | Dynamic programming - the actual fix for `allOrders`'s exploding recursion tree |

---

## Part 6: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** Write the recursive definition of the Fibonacci sequence
($F(0) = 0$, $F(1) = 1$, and each later term is the sum of the two
before it) as pseudocode with an explicit base case and recursive
case.

> **Answer:**
> ```text
> FIB(n):
>     if n == 0: return 0        # base case
>     if n == 1: return 1        # base case
>     return FIB(n - 1) + FIB(n - 2)   # recursive case
> ```
> Note this function branches into **two** recursive calls per call,
> like `allOrders`, not one like `factorial` - its call tree also
> grows explosively (roughly $O(2^n)$), which is exactly why Week 11
> revisits it as a dynamic-programming example.

**2.** Trace `factorial(3)` the same way this handout traced
`factorial(4)`: list every call going down to the base case, then
every return coming back up.

> **Answer:** Down: `factorial(3)` → `factorial(2)` → `factorial(1)`
> → `factorial(0)` (base case, returns 1). Up: `factorial(1)` = 1×1 =
> 1 → `factorial(2)` = 2×1 = 2 → `factorial(3)` = 3×2 = **6**.

**3.** Write the recurrence relation for a recursive algorithm that
splits its input into **three** equal pieces, recurses on each, and
does $O(n)$ work combining the results.

> **Answer:** $T(n) = 3T(n/3) + O(n)$.

**4.** Using the recursion-tree method, find the total cost of the
recurrence from Problem 3, level by level (assume $n$ is a power of
3).

> **Answer:** Level 0: 1 subproblem of size $n$, cost $n$. Level 1: 3
> subproblems of size $n/3$, cost $3 \cdot (n/3) = n$. Level $k$: cost
> $n$ again, for $\log_3 n$ levels. Total: $T(n) = n(\log_3 n + 1) =
> O(n \log n)$ - the same shape of result as merge sort's recurrence,
> because the per-level cost is constant across levels either way.

**5.** True or false: if a recursive algorithm's base case is
unreachable for some valid input (e.g. it only checks `n == 0` but the
input can be a negative number), the algorithm is still correct as
long as it eventually produces the right answer for the inputs you
tested.

> **Answer:** False. An unreachable base case means the recursion
> never stops on that input - it will keep calling itself until the
> program crashes (stack overflow), regardless of what happened on the
> inputs you happened to test. This is the same "testing is not proof"
> lesson from Week 2's `MAX` bug, applied to recursion specifically.

**6.** CampusNav's `allOrders` takes about 1 millisecond to enumerate
all orders for 6 stops (720 orders). Roughly how long would you expect
it to take for 10 stops, and why is "roughly 5x longer" the wrong
intuition?

> **Answer:** Going from 6 stops to 10 stops multiplies the work by
> $10! / 6! = 10 \times 9 \times 8 \times 7 = 5{,}040$, not by
> $10/6 \approx 1.7$. At roughly 720 orders per millisecond, 10 stops
> (3,628,800 orders) would take on the order of 5 seconds - thousands
> of times longer, not "a bit" longer. This is exactly why a demo that
> feels instant at small $n$ can freeze at only slightly larger $n$:
> factorial growth outruns intuition extremely fast.
