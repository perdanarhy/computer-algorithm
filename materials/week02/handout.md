# Week 2 Handout - Algorithm Concepts

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, all three worked examples explained step by step, extra
reading, and practice problems with answers.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Property (of an algorithm)** | One required condition a procedure must satisfy to count as a real algorithm - there are five. |
| **Finiteness** | Must terminate after a finite number of steps, for *every* valid input - provably, not just "it stopped when I ran it." |
| **Definiteness** | Every step is precisely and unambiguously specified; no step can be read two different ways. |
| **Input** | Zero or more well-defined values, from a specified set, supplied before execution begins. |
| **Output** | One or more well-defined values, with a specified relationship to the input - including what happens when there's no good answer. |
| **Effectiveness** | Every step must be basic enough to be carried out exactly, in principle by a person with pencil and paper, in finite time. |
| **Ambiguous** | Allows more than one reasonable interpretation - exactly what a real algorithm must never be. |
| **Pseudocode** | A structured, language-independent way of writing algorithm steps precisely, without full programming-language syntax. |
| **Flowchart** | A diagram form of an algorithm using standardized shapes (start/end oval, process rectangle, decision diamond, arrows) instead of text. |
| **Trace** | Running an algorithm by hand, step by step, on one specific input, to check what it actually does. |
| **Algorithm vs. program** | The algorithm is the language-independent idea (the steps); a program is one specific implementation of it, in one specific language. |
| **Loop bound** | The specific, checkable condition that guarantees a loop cannot run forever - what finiteness actually requires you to state. |
| **Spec (specification)** | A precise statement of what problem an algorithm solves: what counts as valid input, and what output is required. |

---

## Part 1b: Pseudocode Reference Card

Everything below is the fixed set of conventions this course's pseudocode
follows, all semester. Come back to this page whenever a new symbol shows
up mid-course and you can't remember what it means.

| Construct | Meaning |
|---|---|
| One operation per line | No line does two things at once. |
| `for i = 1 to n` | A loop with an explicit bound, stated up front. |
| 0-based indexing | Array indices run `0` to `length(A) - 1`. |
| No vague verbs | "Check," "look," "handle" never appear without saying exactly what operation happens. |
| `NAME(param1, param2)` | Every function names its input and output on the signature line. |
| `=` | **Assignment** - store a value: `x = 5` sets `x` to 5. |
| `==`, `!=` | **Comparison** - a true/false test: `x == 5` asks whether `x` already is 5. |
| `if condition:` (indented block) | Everything indented under it runs only when the condition is true. Indentation alone marks the block - no closing keyword. |
| `while condition:` | Repeats its indented block as long as the condition holds. Use it when the number of passes isn't known in advance; use `for` when it is. |
| `return value` | Ends the function immediately, handing `value` back to the caller. |
| `mod` | The remainder after division: `17 mod 5 = 2`, because $17 = 3 \times 5 + 2$. Used constantly starting with the GCD example a few pages ahead. |
| `swap A[i] and A[j]` | Exchanges their two values. How it happens under the hood (usually a temporary variable) never matters for reading pseudocode - only that both values trade places. |
| `and`, `or`, `not` | Boolean combinators. `and`/`or` evaluate **left to right** - so `i < length(A) and A[i] == target` is safe: the length check runs first and can block the unsafe index read before it happens. |
| `break` | Exits the nearest enclosing loop immediately, skipping any remaining passes. |
| `A[lo..hi]` | The subarray from index `lo` to index `hi`, **inclusive** of both ends. |
| `someRecord.field` | Dot access on a record (or struct) - reads one named field out of a group, e.g. `directory[i].room`. |

### Previewed here, arriving later in the course

These constructs don't appear in pseudocode until later weeks. They're
listed here so you have one place to look them up the first time you meet
one - each also gets a short reminder gloss on the slide where it first
shows up.

| Construct | Meaning | First appears |
|---|---|---|
| `repeat ... until condition` | A post-test loop: the body runs *at least once*, then repeats until the condition becomes true (checked *after* the body, not before). | Week 6, Hoare partition |
| `for i = n downto 1` | A `for` loop that counts *down* instead of up. | Week 9, divide-and-conquer |
| `(a, b, c) = SOMETHING(...)` | A function returning more than one value at once, unpacked into several variables in one line. | Week 9, max-subarray |
| `{}`, `add x to S` | Set notation: `{}` is the empty set; `add x to S` inserts `x` into set `S`. | Week 10, greedy scheduling |

---

## Part 2: The Worked Examples, Step by Step

### What is a GCD, before any algorithm computes one?

The **greatest common divisor** of two whole numbers is the largest
whole number that divides both of them with no remainder.

**GCD(12, 18), the slow way - list every divisor:**
- Divisors of 12: 1, 2, 3, 4, 6, 12
- Divisors of 18: 1, 2, 3, 6, 9, 18
- Common to both: 1, 2, 3, 6
- **Greatest** of those: **6** - so GCD(12, 18) = 6.

That works for small numbers, but listing every divisor of two
12-digit numbers is hopeless. Euclid's algorithm below gets the same
answer without ever listing a single divisor.

**Same algorithm, drawn as a flowchart** (each shape below is one
line of the pseudocode that follows it):

<div style="text-align:center">
<svg viewBox="0 0 560 460" width="340" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="gcdArrowH" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
<path d="M0,0 L10,5 L0,10 z" fill="var(--brand)"/>
</marker>
</defs>
<ellipse cx="250" cy="35" rx="95" ry="28" fill="var(--navy)"/>
<text x="250" y="40" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">GCD(a, b)</text>
<line x1="250" y1="63" x2="250" y2="103" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrowH)"/>
<polygon points="250,103 345,160 250,217 155,160" fill="var(--brand)"/>
<text x="250" y="165" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">b != 0?</text>
<line x1="250" y1="217" x2="250" y2="252" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrowH)"/>
<text x="268" y="238" font-size="14" fill="var(--navy)">yes</text>
<rect x="150" y="252" width="200" height="42" rx="6" fill="var(--pale)" stroke="var(--brand)" stroke-width="1.5"/>
<text x="250" y="278" font-size="15" fill="var(--navy)" text-anchor="middle" font-family="monospace">r = a mod b</text>
<line x1="250" y1="294" x2="250" y2="319" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrowH)"/>
<rect x="150" y="319" width="200" height="42" rx="6" fill="var(--pale)" stroke="var(--brand)" stroke-width="1.5"/>
<text x="250" y="345" font-size="15" fill="var(--navy)" text-anchor="middle" font-family="monospace">a = b</text>
<line x1="250" y1="361" x2="250" y2="386" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrowH)"/>
<rect x="150" y="386" width="200" height="42" rx="6" fill="var(--pale)" stroke="var(--brand)" stroke-width="1.5"/>
<text x="250" y="412" font-size="15" fill="var(--navy)" text-anchor="middle" font-family="monospace">b = r</text>
<path d="M150,407 L60,407 L60,160 L153,160" fill="none" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrowH)"/>
<line x1="345" y1="160" x2="403" y2="160" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrowH)"/>
<text x="374" y="148" font-size="14" fill="var(--navy)" text-anchor="middle">no</text>
<ellipse cx="480" cy="160" rx="75" ry="28" fill="var(--navy)"/>
<text x="480" y="165" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">return a</text>
</svg>
</div>

### Worked example 1 - Euclid's GCD (a clean, classic case)

```text
GCD(a, b):
    while b != 0:
        r = a mod b
        a = b
        b = r
    return a
```

Checked against all five properties:

| Property | Does `GCD` satisfy it? Why |
|---|---|
| Input | Yes - two well-defined positive integers, `a` and `b`. |
| Output | Yes - a single well-defined integer, their greatest common divisor. |
| Definiteness | Yes - `mod`, assignment, and `!=` are each precisely defined, single-meaning operations. |
| Effectiveness | Yes - `mod`, assignment, and comparison are all basic operations anyone could execute by hand. |
| Finiteness | Yes, but it needs a *proof*, not just a lucky run (see below). |

**Why is `GCD` finite?** Trace `GCD(48, 18)`:

| Step | a | b | r = a mod b |
|---|---|---|---|
| Start | 48 | 18 | - |
| 1 | 18 | 12 | 12 |
| 2 | 12 | 6 | 6 |
| 3 | 6 | 0 | 0 |

`b` hits 0 after 3 steps, so `while b != 0` becomes false and the loop
ends. The reason this is *guaranteed*, not just what happened this
time: `r = a mod b` is always strictly smaller than `b`, and it can
never go below 0. So `b` is a strictly decreasing sequence of
non-negative integers - and any such sequence must reach 0 in a
finite number of steps, for **every** valid starting pair `(a, b)`,
not just `(48, 18)`. That argument is what finiteness actually
requires: a bound that holds for all valid inputs, not one successful
trace.

### Worked example 2 - CampusNav's `FIND_ROOM`

```text
FIND_ROOM(directory, target):
    for i = 0 to length(directory) - 1:
        if directory[i].room == target:
            return directory[i].location
    return NOT_FOUND
```

Checked against all five properties:

| Property | Does `FIND_ROOM` satisfy it? Why |
|---|---|
| Input | Yes - a well-defined array `directory` of room records, and a well-defined string `target`. |
| Output | Yes - either a well-defined `location`, or the sentinel value `NOT_FOUND`. Defining the "not found" case is *part of* having a well-defined output, not an afterthought. |
| Definiteness | Yes - `==` on `target` is a precise, single-meaning comparison. No "look around" is left anywhere. |
| Effectiveness | Yes - array indexing and string equality are basic, executable operations. |
| Finiteness | Yes - the loop bound `length(directory) - 1` is a fixed, known number *before* the loop even starts. Unlike `GCD`, this doesn't even need a shrinking-value proof - just a stated, known bound. |

**Contrast:** "look around until you find it" (Week 1's version)
fails definiteness (what does "look around" mean, precisely?) and
effectiveness (it's not a basic, executable step). `FIND_ROOM` is what
that instruction had to become before it counted as an algorithm at
all.

### Worked example 3 - the `MAX` bug (a trap that passes casual review)

```text
MAX(A):
    m = A[0]
    for i = 1 to length(A):
        if A[i] > m:
            m = A[i]
    return m
```

On a quick read, this looks like it satisfies every property: `m`,
comparison, and assignment are all precisely, effectively stated, and
the loop bound `length(A)` is a fixed, known number. It may never once
have produced a visibly wrong answer for the student who wrote it.

**The bug:** array indices run `0` to `length(A) - 1`. The loop
`i = 1 to length(A)` lets `i` reach index `length(A)` itself - one
past the last real element - on *every* run, not just some. Depending
on the language, `A[length(A)]` either crashes with an out-of-bounds
error, or silently reads whatever memory happens to sit next to the
array - which can easily *look like* a valid number small enough that
`A[i] > m` is just false, so the final answer comes out right anyway.
The bug fires every time; whether it's visible is down to luck in what
garbage value gets read, not to which inputs got tested. The fix: the
loop should run `i = 1 to length(A) - 1`.

**Why this matters here:** `MAX`'s properties all *look* satisfied on
a casual read - the bug isn't in whether each step is precisely
stated, it's in whether the stated loop bound is the *correct* one.
Checking the five properties tells you a procedure is well-formed
enough to reason about; it does not, by itself, tell you the procedure
is correct. That's a second, separate question - one this course keeps
returning to, formally, starting with loop invariants in Week 5.

---

## Part 3: Optional Reading - Two Kinds of Finiteness Proof

### Bounded-in-advance vs. proof-by-shrinking

`FIND_ROOM`'s finiteness is the easy kind: the loop bound
(`length(directory) - 1`) is a fixed number you can read off *before*
the algorithm even starts running. Many algorithms you'll meet this
semester are like this - `for i = 1 to n` loops are automatically
finite because `n` is fixed and known.

`GCD`'s finiteness is the harder, more common kind in real
algorithms: there's no `for i = 1 to n` - just a `while` loop with a
condition. To prove it's finite, you have to find some quantity that
(a) strictly decreases every iteration and (b) is bounded below (here,
by 0), so it *cannot* decrease forever. This exact style of argument -
"some measure strictly shrinks each pass, and can't shrink past a
floor" - is the ancestor of the **loop invariant** proofs this course
uses starting Week 5. Getting comfortable with it now pays off later.

### Why "it stopped when I tried it" is not proof

This is this week's most tempting mistake, and it's exactly the same
shape as the `MAX` bug above: testing shows a procedure worked on the
inputs you tried, never that it will work on every valid input. A
procedure like "keep improving the guess until it feels right" might
genuinely stop after a few tries on an easy input. That tells you
nothing about a harder input where "feels right" never triggers.
Without a stated bound or a shrinking-quantity argument, you cannot
claim finiteness - you can only report what happened once.

### Algorithm vs. program, one more time

`GCD` and `FIND_ROOM` above are pseudocode - language-independent.
You could write either one in Python, Java, C, or by hand on paper,
and as long as the steps and their logic match, it's the *same*
algorithm wearing different syntax. A bug introduced by one
language's quirks (like a language that silently wraps integer
overflow) is a bug in the *program*, not necessarily in the
algorithm. Keeping this distinction straight is why this course writes
algorithms in pseudocode first, and only later, in assignments, asks
you to implement them in a real language.

### Where this course is headed

| Weeks | What gets formalized |
|---|---|
| 2 | What counts as a real algorithm (five properties) - this week |
| 3 | How to measure efficiency precisely, so two correct algorithms can be compared (Big-O) |
| 4 | How to analyze algorithms that call themselves (recursion) |
| 5-7 | Two classic building blocks: sorting and searching, each with a correctness proof |
| 9-12 | Four general paradigms for *inventing* new algorithms |
| 13-14 | Modeling problems as networks (graphs), and the limits of what's efficiently solvable at all |

---

## Part 4: Practice Problems (with answers)

Try each problem yourself before checking the answer.

**1.** "Sort the students." What's missing that would keep this from
being a real algorithm, and which property does it violate?

> **Answer:** It doesn't specify *which* collection of students, or
> *by what key* to sort them (name? grade? ID?). This is a violation
> of well-defined **input** - the exact set of legal values (and the
> comparison rule they need) isn't stated.

**2.** "Find a good route to the library." Which property does this
violate, and why?

> **Answer:** Well-defined **output**. "Good" never states its
> required relationship to the input - shortest? fastest? most
> scenic? Two people following this "algorithm" could return
> completely different, equally valid-sounding routes, with no way to
> say which one is correct.

**3.** A loop is written as `while (guess is not good enough): guess
= improve(guess)`, where "good enough" is left to the programmer's
judgment at the time. A student argues: "It's fine - I ran it five
times and it always stopped." Is their argument valid? Why or why not?

> **Answer:** No. Running it five times and observing it stop shows
> only that it stopped on those five inputs. Finiteness requires a
> guarantee that covers *every* valid input - either a fixed bound
> known in advance, or a proof that some quantity strictly shrinks and
> is bounded below (like `GCD`'s `b`). Five successful runs are not
> that guarantee.

**4.** Trace `GCD(a, b)` for `a = 30`, `b = 12`. List each step's
values of `a`, `b`, and `r`, and state the final answer.

> **Answer:**
> Start: a=30, b=12. Step 1: r = 30 mod 12 = 6, so a=12, b=6. Step 2:
> r = 12 mod 6 = 0, so a=6, b=0. `b = 0`, loop ends. `GCD(30, 12) =
> 6`.

**5.** True or false: `FIND_ROOM` written in Python and the same
`FIND_ROOM` written in Java are two different algorithms.

> **Answer:** False. They are the *same* algorithm - identical steps,
> identical order, identical logic - implemented as two different
> *programs*. The algorithm is the language-independent idea; the
> program is one specific implementation of it.

**6.** A flowchart for an algorithm has a Diamond (decision shape)
with only one arrow leading out of it, no matter which way the
decision goes. What's wrong with this flowchart, and which property
does the underlying algorithm most likely fail?

> **Answer:** A decision needs exactly two labeled exits (e.g.
> "yes"/"no"); a single, unconditional exit means the decision doesn't
> actually determine what happens next. The underlying instruction is
> most likely missing a case, which is a **definiteness** violation -
> the step doesn't have one precise, single meaning for every possible
> outcome of the check.
