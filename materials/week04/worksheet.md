# Week 4 Worksheet - Recursion & Recurrence

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~20 minutes)

**A1. Trace the call stack - `factorial(5)`.** Using the same
`factorial` from class:

```text
FACTORIAL(n):
    if n == 0:
        return 1
    return n * FACTORIAL(n - 1)
```

Fill in every call going down to the base case, then every return
coming back up.

*Going down:*

| Step | Call | Waiting on |
|---|---|---|
| 1 | `factorial(5)` | _______________ |
| 2 | _______________ | _______________ |
| 3 | _______________ | _______________ |
| 4 | _______________ | _______________ |
| 5 | _______________ | _______________ |
| 6 | _______________ | base case - returns ___ |

*Coming back up:*

| Step | Call finishes as | Returns to |
|---|---|---|
| 7 | `factorial(0)` = ___ | `factorial(1)` |
| 8 | `factorial(1)` = ___ | `factorial(2)` |
| 9 | `factorial(2)` = ___ | `factorial(3)` |
| 10 | `factorial(3)` = ___ | `factorial(4)` |
| 11 | `factorial(4)` = ___ | `factorial(5)` |
| 12 | `factorial(5)` = ___ | (final answer) |

How many stack frames are alive at the deepest point of this trace? _______

**A2. Draw a recursion tree - `fib(4)`.**

```text
FIB(n):
    if n == 0: return 0
    if n == 1: return 1
    return FIB(n - 1) + FIB(n - 2)
```

Draw (or list, indented) every call made while computing `fib(4)`,
starting from `fib(4)` at the top and branching into its two
recursive calls each time, down to every `fib(1)` or `fib(0)` base
case.

```




```

Count your calls:

- Total number of calls (including `fib(4)` itself): _______
- How many separate times does `fib(2)` get computed? _______
- How many separate times does `fib(1)` get computed? _______
- These repeats mean the *same* sub-answer is being recomputed more
  than once. What technique, previewed in today's Key Words, would
  let you compute each one only once? _______________________

**A3. Find the bug.** Here is a recursive attempt at "count down from
$n$ to 0, printing each number":

```text
COUNTDOWN(n):
    print(n)
    COUNTDOWN(n - 1)
```

What happens when you call `COUNTDOWN(3)`? Which piece of a correct
recursive algorithm (base case or recursive case) is missing here, and
what specifically goes wrong as a result?

_____________________________________________________________
_____________________________________________________________

---

## Worksheet Part B (~20 minutes)

**B1. Recursion tree, fill in the blanks.** A CampusNav feature has
the recurrence $T(n) = 2T(n/2) + n$ (same shape shown in class).
Fill in the missing cells (assume $n$ is a power of 2):

| Level | Subproblems | Size each | Cost at this level |
|---|---|---|---|
| 0 | 1 | $n$ | $n$ |
| 1 | ___ | $n/2$ | ___ |
| 2 | 4 | ___ | $n$ |
| 3 | ___ | $n/8$ | ___ |
| $\log_2 n$ | $n$ | ___ | ___ |

Total number of levels (in terms of $n$): _______
Closed-form total cost, $T(n) = $ _______________________

**B2. Substitution, checked by hand.** For the recurrence $T(n) =
T(n-1) + 2$, with $T(0) = 1$, compute the first few values directly:

| $n$ | $T(n)$ |
|---|---|
| 0 | 1 |
| 1 | _______ |
| 2 | _______ |
| 3 | _______ |
| 4 | _______ |
| 5 | _______ |

Someone guesses the closed form $T(n) = 2n + 1$. Check this guess
against **every** row in your table above. Does it match?
_______

**B3. Short answer.** In your own words (2-3 sentences), explain why
the base case of a recursive algorithm bounds how deep its recursion
tree can grow - not just "where it happens to stop."

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

**B4. Connect it back.** Think of one real-world procedure (not from
class) that is naturally recursive - something that contains a
smaller version of itself. Name it, and state its base case and
recursive case in plain words.

Procedure: _______________________
Base case: _____________________________________________________
Recursive case: ________________________________________________
