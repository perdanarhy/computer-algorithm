---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 8: Midterm Exam

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: This is a short review deck, not a lecture. No new material today -
walk the room, answer questions, then hand off to the exam itself.
-->

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Algorithm Concepts</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Complexity Analysis</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">Recursion &amp; Recurrence</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Basic Sorting</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Advanced Sorting</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">Searching</div></div>
<div class="wk review now"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at Week 8. Say: "Seven weeks of toolkit, checked today. No new material - this is the checkpoint." -->

---

<!-- SLOT 3: Recap (Act 0 / LOCATE) - one line per topic-block, Weeks 1-7. No open-wound sentence: short review variant carries no Pain/Ground act. -->

# Recap: Weeks 1-7

- **Wk 1 - Orientation:** course contract, grading, and policy - plus a first taste of why "looks right" isn't the same as provably correct
- **Wk 2 - Algorithm Concepts:** wrote pseudocode and checked it against five required properties
- **Wk 3 - Complexity Analysis:** measured growth rate with Big-O instead of guessing from one run
- **Wk 4 - Recursion & Recurrence:** traced recursive cost and solved it as a recurrence
- **Wk 5 - Basic Sorting:** traced O(n²) sorts by hand, proved correctness with loop invariants
- **Wk 6 - Advanced Sorting:** replaced O(n²) sorts with O(n log n) merge sort / quicksort
- **Wk 7 - Searching:** turned a sorted directory into ~11-step binary search, not a 1,200-step scan

<div class="thread">Same CampusNav directory, the whole way through - that's the thread the exam checks.</div>

---

<!-- Before the Exam: generic logistics, no invented room/date/time -->

# Before the Exam

- **Materials & format:** whatever the instructor's exam announcement specifies - bring exactly that, nothing assumed beyond it
- **Arrive on time:** the exam starts and ends on schedule; plan to be seated early
- **No makeup exam without prior arrangement** - contact the instructor *before* the exam, not after
- **Accommodation needs** (documented, scheduling conflicts, etc.): arrange with the instructor in advance, not on exam day

---

<!-- Act 3 / BUILD, expanded per SPINE's short-review variant: "Check yourself" becomes the whole session -->

# Check Yourself: Full Review

<div class="driving-q">"Can you do, on paper, everything Weeks 1-7 asked you to do?"</div>

---

<!-- Act 3: Coverage - 6 bullets, one per technical topic (Weeks 2-7; Week 1 was orientation, no testable skill), each a skill reminder rather than a fact reminder -->

# Coverage: What You Should Be Able to Do

- **Algorithm Concepts** - check a written procedure against the five required properties (finite, definite, input, output, effective)
- **Complexity Analysis** - prove an O(g(n)) bound from the formal definition (produce valid constants c, n₀)
- **Recursion & Recurrence** - trace a recursion tree and solve the recurrence it produces (substitution or recursion tree)
- **Basic Sorting** - trace an O(n²) sort by hand and prove it correct with a loop invariant
- **Advanced Sorting** - trace merge sort/quicksort, and explain what makes quicksort's worst case O(n²)
- **Searching** - prove binary search correct with a loop invariant, and state why it requires sorted input

---

<!-- NEW: Week 1 review block - recap, practice, solution (Week 1 has no technique of its own, so this reviews the one conceptual point it planted) -->

# Recap: Week 1 - Correct Is Not the Same as Efficient

<div class="thread">Before any technique existed, one idea was already planted.</div>

- Week 1 introduced CampusNav's premise: a printed room list, scanned by
  eye, with no guarantee of correctness or speed - and the course
  contract (grading, policy, schedule).
- The one conceptual point Week 1 planted before any technique existed:
  "looks right" (works on a few tries) is not the same as being
  **provably** correct on every input - a distinction Weeks 5 and 7
  later made rigorous with loop-invariant proofs.
- Nothing here is a testable technique on its own - it's the
  philosophy every later proof in this course cashes out.

---

# Midterm Practice: Week 1 - Correct vs. Efficient

A classmate claims: *"I ran my sorting function on the five test
cases in the assignment and got the right answer every time, so it's
correct."*

Explain, precisely, what this evidence does and doesn't establish -
and name the specific technique (from Weeks 5-7) that actually closes
the gap.

---

# Solution: Week 1 Practice

This evidence supports only a much weaker claim: *the function
produced the correct output on these five particular inputs.* It says
nothing about the (likely) far larger set of inputs the function was
never run on - a bug that only surfaces on, say, an array with
duplicate keys, or an unsorted array handed to binary search, would
pass all five tests undetected.

**What actually closes the gap:** a **loop-invariant proof** (Weeks 5
and 7) - initialization, maintenance, and termination together
establish the claim for **every** valid input, not a sample of them.
That is the exact technical answer to "looks right" versus "is right,"
and it's the one idea Week 1 planted before the machinery to prove it
existed.

---

# Common Midterm Mistake: "Testing Proves Correctness"

**Misconception:** running an algorithm on a handful of test cases and
getting the right answer is treated as equivalent to having proven it
correct.

**Reality:** testing can only ever demonstrate a *failure* - finding
one counterexample. It can never exhaustively check "every possible
input" the way a loop-invariant proof does. This is precisely the gap
Week 1 opened and Weeks 5 and 7's proofs closed.

---

# Check Yourself: Week 1

Why is "I tried it on a few inputs and it worked" not sufficient
evidence for a midterm question that asks you to *prove* something is
correct?

---

# Answer

Because a proof must cover **every** valid input, and a handful of
tried inputs is a sample, not an exhaustive check. A loop-invariant
proof (or any other correctness proof) exists precisely because a bug
can lurk on an input nobody happened to try - as the real, years-long
history of subtly broken binary search implementations (Week 7) shows
in practice, not just in theory.

---

<!-- NEW: Week 2 recap card -->

# Recap: Week 2 - Algorithm Concepts

<div class="thread">The standard every later week's "trace it" and "prove it" work assumes.</div>

- An algorithm must satisfy all **five** required properties at once:
  finiteness, definiteness, input, output, effectiveness.
- Pseudocode is how a procedure gets written precisely enough to check
  those properties - Week 2's own rejected example, "look around until
  you find it," fails because it's too vague to check.
- This is the standard the midterm checks first, before anything about
  speed or output.

---

<!-- Q1: Algorithm properties (Week 2) -->

# Question 1 - Algorithm Concepts

Consider this instruction for CampusNav: *"Keep refining the campus map
until it looks accurate enough."*

Which of the five required properties of an algorithm does this
violate, and why?

---

# Answer 1

It violates **definiteness** (and, arguably, **finiteness**).
"Accurate enough" has no precise stopping test - two people (or the
same person twice) could run this "procedure" and stop at different
points, or never stop at all. A real algorithm needs an unambiguous
step-by-step definition *and* a guaranteed end.

---

<!-- NEW: Week 2 common mistake + check yourself -->

# Common Midterm Mistake: Algorithm Concepts

**Misconception:** "A correct algorithm that's just slow doesn't
really count as a proper algorithm."

**Reality:** none of the five required properties say anything about
speed. A hopelessly slow procedure can still be a perfectly valid
algorithm - efficiency is a *separate*, later question (all of Week
3), not one of the five defining properties.

---

# Check Yourself: Week 2

Which required property is violated by *"sort the list, but only if
it feels necessary"*?

---

# Answer

**Definiteness.** "Feels necessary" has no precise, checkable test -
two runs (or two people) could disagree on whether to sort at all,
which means the step isn't unambiguous enough to qualify as an
algorithm step.

---

<!-- NEW: Week 3 recap card -->

# Recap: Week 3 - Complexity Analysis

<div class="thread">Measuring growth rate instead of guessing from one run.</div>

- Big-O describes a **growth-rate bound**, not an exact running time:
  $f(n) = O(g(n))$ means constants $c > 0$, $n_0 \ge 1$ exist such that
  $f(n) \le c \cdot g(n)$ for all $n \ge n_0$.
- Growth-rate ordering, slowest to fastest as $n \to \infty$:
  $\log n < n < n\log n < n^2 < 2^n < n!$.
- Big-O throws away constants and lower-order terms on purpose - it
  answers "what happens as input size grows without bound," not
  "which run is faster on my laptop today."

---

<!-- Q2: Big-O proof (Week 3) -->

# Question 2 - Complexity Analysis

Prove, from the **formal definition** of Big-O, that

$$3n^2 + 20n + 100 = O(n^2)$$

---

# Answer 2

Need constants $c > 0$, $n_0$ such that $f(n) \le c \cdot g(n)$ for
all $n \ge n_0$.

For $n \ge 1$: $n \le n^2$ and $1 \le n^2$, so

$$3n^2 + 20n + 100 \le 3n^2 + 20n^2 + 100n^2 = 123n^2$$

So $c = 123$, $n_0 = 1$ satisfies the definition - hence
$f(n) = O(n^2)$. $\blacksquare$

<div class="why">Common mistake to flag here: Big-O gives a growth-rate <strong>bound</strong>, not the exact running time - <code>c</code> and <code>n₀</code> are witnesses, not "the" constants.</div>

---

<!-- NEW: Week 3 common mistake + check yourself -->

# Common Midterm Mistake: Complexity Analysis

**Misconception 1:** "$O(n^2)$ means the algorithm takes exactly
$c \cdot n^2$ steps." **Reality:** Big-O is an *upper bound* on growth
rate - it says cost grows no faster than $n^2$, not that it equals
some fixed multiple of $n^2$.

**Misconception 2:** given $3n^2 + 100n$, keeping the $100n$ term
"because 100 is a bigger number." **Reality:** the dominant term is
decided by growth rate as $n \to \infty$ - $n^2$ eventually outgrows
$100n$ for *any* fixed constant - not by which coefficient looks
bigger for small $n$.

---

# Check Yourself: Week 3

For large enough $n$, is $100n$ or $n^2$ the dominant term - and at
roughly what $n$ does $n^2$ overtake $100n$?

---

# Answer

$n^2$ dominates for all sufficiently large $n$: solving $n^2 > 100n$
gives $n > 100$. Below $n = 100$, $100n$ is actually the larger value
- that crossover is exactly why a Big-O claim is stated as "for all
$n \ge n_0$," not "always, no matter how small $n$ is."

---

<!-- NEW: Week 4 recap card -->

# Recap: Week 4 - Recursion & Recurrence

<div class="thread">Tracing and bounding cost that calls itself.</div>

- A recursive algorithm's cost is described by a **recurrence**: cost
  on size $n$ in terms of cost on smaller sizes, plus the non-recursive
  work at that step.
- Solving a recurrence (recursion-tree or substitution method) turns
  "$T(n) = 2T(n/2) + n$" into a closed-form bound like $O(n \log n)$.
- The recursion tree's **depth** (how many times the input shrinks
  before hitting the base case) is what bounds the total work - the
  base case is not "just where you stop," it's half of what determines
  that depth.

---

<!-- Q3: Recurrence (Week 4) -->

# Question 3 - Recursion & Recurrence

CampusNav's merge-sort-based directory sort satisfies

$$T(n) = 2T(n/2) + n$$

Solve it with the recursion-tree method and state the resulting bound.

---

# Answer 3

Each level of the recursion tree splits work into 2 subproblems of
half the size, but the **combine work at each level still totals
$n$**: level 0 does $n$, level 1 does $2 \cdot (n/2) = n$, level 2
does $4 \cdot (n/4) = n$, and so on. The tree has depth $\log_2 n$
(halving until size 1), so:

$$
T(n) = \underbrace{n + n + \cdots + n}_{\log_2 n \text{ levels}} = n \log_2 n
$$

<div class="bignotation">T(n) = Θ(n log n)</div>

---

<!-- NEW: Week 4 common mistake + check yourself -->

# Common Midterm Mistake: Recursion & Recurrence

**Misconception 1:** "Recursion is always less efficient than
iteration." **Reality:** a recursive algorithm's efficiency is decided
by its recurrence, not by the fact that it calls itself - merge sort's
$T(n) = 2T(n/2) + n$ resolves to the same $O(n \log n)$ whether written
recursively or converted to an iterative bottom-up version.

**Misconception 2:** "The base case is just where you stop."
**Reality:** the base case, combined with how fast the input shrinks
each call, determines the recursion tree's **depth** - exactly what
you sum over to get total cost. Get either one wrong, and the whole
cost bound changes.

---

# Check Yourself: Week 4

CampusNav's tour-time recursion (Week 4) has $T(n) = T(n-1) + O(1)$ for
$n$ stops. What is $T(n)$ in Big-O terms, and how does that compare to
merge sort's $T(n) = 2T(n/2) + O(n)$?

---

# Answer

$T(n) = T(n-1) + O(1)$ unrolls to $n$ constant-cost steps, one per
stop: $T(n) = O(n)$ - linear, much cheaper than merge sort's
$O(n \log n)$. The reason is structural: this recurrence shrinks the
problem by only 1 each call (depth $n$) with $O(1)$ work per call,
while merge sort shrinks by half each call (depth $\log n$) but does
$O(n)$ work per level - depth alone never tells you the total cost,
you need depth *and* per-level cost together.

---

<!-- NEW: Week 5 recap card -->

# Recap: Week 5 - Basic Sorting

<div class="thread">Provably correct, at O(n²).</div>

- Bubble, selection, and insertion sort are all $O(n^2)$ worst case -
  but **not** interchangeable: only bubble and insertion sort are
  adaptive (fast on nearly-sorted input) and stable (equal keys keep
  relative order); selection sort is neither.
- Insertion sort is proven correct with a **loop invariant**:
  initialization, maintenance, termination - the exact three-part
  structure every later correctness proof in this course reuses.
- Stability isn't cosmetic - it's what makes multi-key sorting (sort by
  column A, then column B) actually work.

---

<!-- Q4: Sorting trace/stability (Weeks 5-6) -->

# Question 4 - Basic Sorting (Trace & Stability)

Two CampusNav directory entries tie on sort key **2** - call them
$2_a$ (entered first) and $2_b$ (entered second). Trace **insertion
sort**, ascending, on:

$$[\,4,\ 2_a,\ 3,\ 2_b\,]$$

Show the array after each pass. Does $2_a$ stay before $2_b$? Is
insertion sort stable in general?

---

# Answer 4

<div class="tracetable">
<div class="row"><div class="rowlabel">start</div><div class="cell">4</div><div class="cell hl">2a</div><div class="cell">3</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">insert 2a</div><div class="cell hl">2a</div><div class="cell">4</div><div class="cell">3</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">insert 3</div><div class="cell">2a</div><div class="cell hl">3</div><div class="cell">4</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">insert 2b</div><div class="cell">2a</div><div class="cell hl2">2b</div><div class="cell">3</div><div class="cell">4</div></div>
</div>

$2_a$ stays before $2_b$. Insertion sort only shifts an element when
the compared value is **strictly greater** than the key being
inserted - equal keys never swap past each other. So insertion sort
is stable **in general**, not just in this example.

---

<!-- NEW: Week 5 common mistake + check yourself -->

# Common Midterm Mistake: Basic Sorting

**Misconception:** "All three $O(n^2)$ sorts behave identically, since
they share the same worst-case bound." **Reality:** the worst-case
bound matches, but their *personalities* don't: selection sort always
makes exactly $n-1$ swaps and never adapts to nearly-sorted input;
bubble and insertion sort can finish in close to $O(n)$ on
nearly-sorted data; and only bubble and insertion sort are stable. A
question that only asks for the worst-case Big-O is not testing the
whole picture.

---

# Check Yourself: Week 5

A CampusNav directory update adds one new room near the end of an
otherwise-alphabetized 500-entry list. Which of the three basic sorts
finishes fastest re-sorting it, and why?

---

# Answer

**Insertion sort** (or bubble sort, with its early-exit flag) - both
are adaptive, so a list that's already sorted except for one
out-of-place entry costs close to $O(n)$, not $O(n^2)$. Selection sort
gives no such benefit: its inner loop always scans the entire
remaining unsorted region regardless of how close to sorted the array
already is.

---

<!-- NEW: Week 6 recap card -->

# Recap: Week 6 - Advanced Sorting

<div class="thread">Escaping O(n²) - two different ways.</div>

- **Merge sort:** always $O(n \log n)$ - best, average, *and* worst
  case - because it always splits exactly in half; pays $O(n)$
  auxiliary space and allocates new arrays every `MERGE` call.
- **Quicksort:** in-place, $O(n \log n)$ *expected*, but $O(n^2)$ worst
  case if the pivot strategy is predictable (e.g. always the last
  element, on already-sorted data).
- Pivot **choice** (random, median-of-three) is what fixes quicksort's
  worst case - the partition scheme (Lomuto/Hoare) is a separate
  decision from pivot strategy.

---

<!-- Q5: Advanced sorting / quicksort worst case (Week 6) -->

# Question 5 - Advanced Sorting

CampusNav's directory is already sorted, and someone re-runs
quicksort on it (e.g., after a filter is cleared), always choosing
the **last element** as pivot.

What's the running time on this input, why, and what's one fix?

---

# Answer 5

**O(n²).** On already-sorted data, the last element is always the
*largest* remaining element - every partition splits into one
subproblem of size $n-1$ and one of size $0$. That's $n$ levels of
$O(n)$ partition work, not $\log n$ levels - $O(n^2)$ total.

**Fix:** choose the pivot randomly (or median-of-three) so an
adversarial or already-sorted input can't force the worst split. This
is exactly why *"quicksort's worst case is rare/ignorable regardless
of pivot strategy"* is a misconception - it's only rare with a *good*
pivot strategy.

---

<!-- NEW: Week 6 common mistake + check yourself -->

# Common Midterm Mistake: Advanced Sorting

**Misconception:** "Quicksort's $O(n^2)$ worst case is so rare in
practice it can be ignored." **Reality:** it isn't rare *by
construction* - a first- or last-element pivot strategy hits $O(n^2)$
on any already-sorted or reverse-sorted input, an entirely ordinary
shape for real data (e.g. re-sorting an already-mostly-sorted
directory after a small update). The fix is the pivot *strategy*, not
hoping the input stays "random."

---

# Check Yourself: Week 6

You need a sort with a **guaranteed** worst-case bound for a real-time
system, and stability doesn't matter. Merge sort or quicksort - which,
and why?

---

# Answer

**Merge sort.** Its $O(n \log n)$ bound holds in the best, average,
*and* worst case, because the divide step always splits exactly in
half regardless of input. Quicksort's worst case can degrade to
$O(n^2)$ no matter how good its average case looks - disqualifying for
a hard real-time guarantee, even though quicksort is often faster in
practice.

---

<!-- NEW: Week 7 recap card -->

# Recap: Week 7 - Searching

<div class="thread">Making the sorted directory earn its keep.</div>

- Linear search works on any array, sorted or not, in $O(n)$ - binary
  search needs sorted input but runs in $O(\log n)$.
- Binary search's loop invariant: "if `target` is present in $A$, it
  is present within `A[lo..hi]`" - proven with initialization,
  maintenance, termination, the exact three-part shape Week 5 used for
  insertion sort.
- Sortedness is a **correctness** precondition, not just a speed one:
  running binary search on unsorted data can silently return the wrong
  answer, not just a slow one.

---

<!-- Q6: Searching / loop invariant (Week 7) -->

# Question 6 - Searching

State binary search's loop invariant, and use it to explain why
binary search requires the input to already be sorted.

---

# Answer 6

**Invariant:** *if the target is present in the array, it lies within
the current search window* `[lo, hi]`.

- **Before the loop:** the window is the whole array - trivially true.
- **Maintained:** each step discards the half that provably cannot
  contain the target, based on one comparison against the midpoint.
- **At termination:** the window narrows to 0 or 1 elements, giving
  the answer.

"Provably cannot contain the target" is exactly where **sortedness**
is required - discarding a half on one comparison is only valid if
everything in that half is known to be on the wrong side of the
target. On unsorted data it might not be, and the invariant breaks.

---

<!-- NEW: Week 7 common mistake + check yourself -->

# Common Midterm Mistake: Searching

**Misconception 1:** off-by-one bound updates - using `hi = mid`
instead of `hi = mid - 1`, or `lo = mid` instead of `lo = mid + 1` -
either skips a valid index or loops forever. Always trace a 2-element
range by hand to check your convention is self-consistent.

**Misconception 2:** "binary search will just be slow on unsorted
data, like a worse linear search." **Reality:** it can be **wrong**,
silently reporting a present element as missing - the maintenance
proof's core step ("everything $\le$ mid is $\le A[mid]$") only holds
when $A$ is actually sorted.

---

# Check Yourself: Week 7

A binary search call on an 8-element sorted array narrows down to
`lo=3, hi=3` without having returned yet. What happens next, and what
does it tell you about why the loop always terminates?

---

# Answer

One more iteration runs: `mid = 3`, so `A[3]` is checked directly
against `target`. Either it matches (return 3), or it doesn't, in
which case `lo` becomes 4 (`hi` stays 3) or `hi` becomes 2 (`lo` stays
3) - either way, `lo > hi` on the next check, and the loop exits with
`NOT-FOUND`. This shows the loop always reaches a single-element range
before it can run out of room to shrink into - exactly the shrinking
argument the termination proof relies on.

---

<!-- NEW: cross-cutting synthesis, Big-O & recursion together -->

# Check Yourself: Big-O and Recursion, Together

<div class="thread">Same recursion-tree method, applied to a new recurrence.</div>

A recursive algorithm has recurrence $T(n) = 2T(n/2) + O(1)$ - it
halves the input each call, but does only constant work per call (no
combine step). What is $T(n)$ in Big-O terms? Is this faster or slower
than merge sort's $T(n) = 2T(n/2) + O(n)$?

---

# Answer

Recursion tree: level $k$ has $2^k$ nodes, each of size $n/2^k$, each
doing $O(1)$ work - so level $k$ costs $O(2^k)$, unlike merge sort
where every level costs a fixed $O(n)$. Depth is $\log_2 n$. Summing a
geometric series dominated by its last term:

$$
\sum_{k=0}^{\log_2 n} O(2^k) = O(2^{\log_2 n + 1}) = O(n)
$$

So $T(n) = O(n)$ - the **same** asymptotic bound as merge sort's
combine-heavy recurrence, but for a completely different reason: this
one is dominated by the bottom level's sheer node count, while merge
sort's is spread evenly across every level. Two recurrences that look
similar can hit the same bound through very different mechanisms -
always redo the sum, don't pattern-match the shape.

---

<!-- NEW: cross-cutting synthesis, sorting weeks 5-6 -->

# Check Yourself: Sorting, Weeks 5-6 Together

CampusNav's directory (1,200 entries) needs re-sorting after a bulk
import that leaves it almost entirely **reverse**-alphabetized. Which
sort from Weeks 5-6 would you recommend, and which would you
specifically avoid?

---

# Answer

**Avoid insertion sort here** - its adaptiveness only helps on
*nearly-sorted* input; a nearly reverse-sorted array is close to its
actual worst case, where every new key shifts almost the entire sorted
prefix. **Also avoid quicksort with a fixed first- or last-element
pivot** - reverse-sorted input is exactly the adversarial shape that
forces its $O(n^2)$ worst case (mirroring the already-sorted example
from Week 6).

**Best choice:** merge sort, or quicksort with a random or
median-of-three pivot - both guarantee (or expect) $O(n \log n)$
regardless of whether the input arrives sorted, reverse-sorted, or
anything in between.

---

<!-- NEW: cross-cutting synthesis, why sorting must precede searching -->

# Check Yourself: Why Sorting Must Fully Precede Searching

CampusNav could try to binary-search its directory *without* fully
sorting it first, by spot-checking "does this half still look
ordered" at each step and falling back to a linear scan if not. What's
wrong with this plan - as a matter of correctness, not just speed?

---

# Answer

Binary search's maintenance proof relies on **every** index $\le$ mid
being $\le A[\text{mid}]$, across the *entire* current range - not a
spot-check of one or two boundary values. A "looks ordered" heuristic
can pass on a range that isn't actually fully sorted (e.g. a single
out-of-order pair buried in the middle, with both ends still looking
fine), silently breaking the exact assumption the proof depends on.
There's no cheaper substitute for genuine, full sortedness as a
precondition - which is exactly why Weeks 5-6 had to fully solve
sorting before Week 7 could touch searching at all.

---

<!-- NEW: cross-cutting synthesis, loop invariants across the course -->

# Check Yourself: One Proof Shape, Two Algorithms

Insertion sort's loop invariant (Week 5) and binary search's loop
invariant (Week 7) are both proven with the same three-part structure.
State one genuine similarity and one genuine difference between the
two proofs.

---

# Answer

**Similarity:** both use initialization (true before the loop starts,
usually trivially), maintenance (each iteration preserves the
invariant, argued case by case), and termination (what the invariant
implies once the loop's exit condition is reached) - the identical
three-part shape.

**Difference:** insertion sort's invariant describes what's **true of
a growing region** (`A[0..i-1]` is sorted), so termination tells you
the *whole array* ended up in the claimed state - a positive
confirmation. Binary search's invariant describes what's **still
possible** ("if `target` is present, it's in `A[lo..hi]`") - a claim
that gets *narrower* over time, and termination is used to *rule out*
a possibility (the target isn't there) rather than confirm a positive
state. Same proof tool, opposite direction of use.

---

<!-- SLOT N+1: replaces "Limits" per SPINE's short-review variant - forward-looking, not a technical limitation -->

# What to Focus On Next

Weeks 1-7 gave you a toolkit: correctness, complexity, recursion,
sorting, searching. Weeks 9-14 don't add more of the same kind - they
teach **four general strategies for inventing new algorithms**, plus
how to represent networks at all.

<div class="pipeline">
<div class="stage"><div class="h">Wk 9</div><div class="s">Divide &amp; Conquer</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wk 10</div><div class="s">Greedy Algorithms</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wks 11-12</div><div class="s">Dynamic Programming I &amp; II</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">Wks 13-14</div><div class="s">Graphs &amp; Shortest Path</div></div>
</div>

Nothing here is graded today - just orient yourself for what's next.

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 8 is the checkpoint. **Week 9 begins Divide and Conquer** - the
first of four general strategies for *inventing* new algorithms.

---

<!-- SLOT N+3: Summary -->

# Summary

- Weeks 1-7 built one connected toolkit, not seven separate topics:
  correctness/complexity vocabulary, recursion, and the two classic
  building blocks - sorting and searching - all examined through
  CampusNav's directory/lookup features.
- Today was a checkpoint, not new material: use the Coverage list, the
  per-week recap cards and practice problems, and the check-yourself
  questions above to find your own gaps before the exam.
- **Reading:** review CLRS (Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>) 4th ed, Chapters 1-4 (algorithm properties,
  analyzing algorithms, growth of functions, recursion/recurrences),
  §2.1-2.2 (basic sorting), §2.3 and Ch 7 (advanced sorting), and
  Exercise 2.3-6 (binary search) - skim what you've already read, no
  new reading assigned.
- **Prepare:** Assignment 2 (Sorting) is due before the exam per the
  syllabus; bring only what the instructor's exam announcement
  permits.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
