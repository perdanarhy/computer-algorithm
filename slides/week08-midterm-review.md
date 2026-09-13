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
walk through the review directly, answer questions, then hand off to the exam itself.
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

<!-- Act 3 / BUILD, expanded per SPINE's short-review variant -->

# Full Review: What Weeks 1-7 Asked of You

<div class="driving-q">"Can you do, on paper, everything Weeks 1-7 asked you to do?"</div>

What follows is a direct walk-through, week by week: one recap, one
worked practice problem, and one common mistake to watch for, per
topic - then four cross-cutting questions that connect two or more
weeks at once.

---

<!-- Act 3: Coverage -->

# Coverage: What You Should Be Able to Do

- **Algorithm Concepts** - check a written procedure against the five required properties (finite, definite, input, output, effective)
- **Complexity Analysis** - prove an O(g(n)) bound from the formal definition (produce valid constants c, n₀)
- **Recursion & Recurrence** - trace a recursion tree and solve the recurrence it produces (substitution or recursion tree)
- **Basic Sorting** - trace an O(n²) sort by hand and prove it correct with a loop invariant
- **Advanced Sorting** - trace merge sort/quicksort, and explain what makes quicksort's worst case O(n²)
- **Searching** - prove binary search correct with a loop invariant, and state why it requires sorted input

---

<!-- Week 1 review block -->

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

<!-- Dense worked practice: Week 1 -->
<!-- _class: dense -->

<div class="eyebrow">Midterm practice · Week 1</div>

# "It Passed Five Tests" Is Not a Proof

<div class="wx-top">
<div class="lead">A classmate claims: "I ran my sorting function on the five test cases in the assignment and got the right answer every time, so it's correct."</div>
<div class="goalbox"><span class="k">Goal</span>State precisely what this evidence does and doesn't establish.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">What it establishes</div>
<div class="wx-body">Only a much weaker claim: the function produced the correct output on these five particular inputs - nothing about the far larger set of inputs never tried.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">What actually closes the gap</div>
<div class="wx-body">A loop-invariant proof (Weeks 5 and 7): initialization, maintenance, and termination together establish the claim for every valid input, not a sample.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Not a hypothetical</div>
<div class="wx-body">A bug that only surfaces on, say, an array with duplicate keys, or an unsorted array handed to binary search, would pass all five tests undetected - Week 7's real, years-long history of broken binary search implementations shows this happens in practice, not just in theory.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The exact gap Week 1 opened</div>
<div class="wx-body">Testing can only ever demonstrate a *failure* - finding one counterexample. It can never exhaustively check "every possible input" the way a loop-invariant proof does.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>"Looks right on a sample" and "proven correct" are different claims - only the second is what the midterm's proof questions ask for.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>This is the one idea Week 1 planted before the machinery to prove it existed.</div></div>

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

<!-- Week 2 review block -->

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

<!-- Dense worked practice: Week 2 -->
<!-- _class: dense -->

<div class="eyebrow">Midterm practice · Week 2</div>

# Definiteness: Two Failure Cases

<div class="wx-top">
<div class="lead">The same missing property, in two different instructions.</div>
<div class="goalbox"><span class="k">Goal</span>Spot which required property each instruction violates, and why.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Case A</div>
<div class="wx-body">"Keep refining the campus map until it looks accurate enough." Violates **definiteness** (and arguably finiteness): "accurate enough" has no precise stopping test - two runs could stop at different points, or never stop.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Case B</div>
<div class="wx-body">"Sort the list, but only if it feels necessary." Also violates **definiteness**: "feels necessary" has no precise, checkable test - two runs (or two people) could disagree on whether to sort at all.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">The common thread</div>
<div class="wx-body">Both instructions use a vague qualifier ("enough," "necessary") in place of an unambiguous, checkable condition - exactly what definiteness rules out.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">What this is not about</div>
<div class="wx-body">Neither case is a *speed* problem - a correct algorithm can be slow and still be a valid algorithm. Definiteness is checked before efficiency ever comes up.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>A real algorithm needs an unambiguous step-by-step definition and a guaranteed end - "looks/feels right" is never a substitute for either.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>When a midterm question asks "which property is violated," look first for a vague qualifier standing in for a precise test.</div></div>

---

# Common Midterm Mistake: Algorithm Concepts

**Misconception:** "A correct algorithm that's just slow doesn't
really count as a proper algorithm."

**Reality:** none of the five required properties say anything about
speed. A hopelessly slow procedure can still be a perfectly valid
algorithm - efficiency is a *separate*, later question (all of Week
3), not one of the five defining properties.

---

<!-- Week 3 review block -->

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

<!-- Dense worked practice: Week 3 -->
<!-- _class: dense -->

<div class="eyebrow">Midterm practice · Week 3</div>

# A Big-O Proof, and Its Crossover Point

<div class="wx-top">
<div class="lead">Proving a bound, then finding exactly where one term overtakes another.</div>
<div class="goalbox"><span class="k">Goal</span>Prove 3n&sup2; + 20n + 100 = O(n&sup2;), then find where n&sup2; overtakes 100n.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The proof</div>
<div class="wx-body">For n &ge; 1: n &le; n&sup2; and 1 &le; n&sup2;, so 3n&sup2;+20n+100 &le; 3n&sup2;+20n&sup2;+100n&sup2; = 123n&sup2;. Constants c=123, n0=1 satisfy the definition.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">The crossover</div>
<div class="wx-body">For 100n vs. n&sup2;: solving n&sup2; &gt; 100n gives n &gt; 100. Below n=100, 100n is actually the larger value.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Why the crossover matters</div>
<div class="wx-body">It's exactly why a Big-O claim is stated as "for all n &ge; n0," not "always, no matter how small n is" - n0=101 would also be a valid witness for "n&sup2; dominates 100n."</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The witnesses aren't unique</div>
<div class="wx-body">c and n0 are witnesses to the bound, not "the" constants - any larger valid c, or any n0 past the crossover, also works.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>c=123, n0=1 proves the bound; n=100 is the concrete point past which n&sup2; wins outright.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>A Big-O proof and a crossover calculation are two different tools - the first proves a bound holds eventually and forever, the second finds exactly when.</div></div>

---

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

<!-- Week 4 review block -->

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

<!-- Dense worked practice: Week 4 -->
<!-- _class: dense -->

<div class="eyebrow">Midterm practice · Week 4</div>

# Solving a Recurrence, Then Comparing One

<div class="wx-top">
<div class="lead">Merge sort's own recurrence, then a second one to contrast against it.</div>
<div class="goalbox"><span class="k">Goal</span>Solve T(n) = 2T(n/2) + n, then compare it to T(n) = T(n&minus;1) + O(1).</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Solve the merge-sort recurrence</div>
<div class="wx-body">Each of log&#8322;n levels splits into 2 subproblems of half the size, but combine work still totals n per level (level 0: n, level 1: 2&middot;(n/2)=n, ...). Sum: n log&#8322;n &rarr; &Theta;(n log n).</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Solve the tour-time recurrence</div>
<div class="wx-body">T(n) = T(n&minus;1) + O(1), from Week 4's tour-time example: unrolls to n constant-cost steps, one per stop &rarr; O(n).</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Compare structurally</div>
<div class="wx-body">O(n) is much cheaper than O(n log n) - but not because "subtracting 1 is always faster than halving." It's because depth n with O(1) work/call, vs. depth log n with O(n) work/level - depth alone never tells you total cost.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The reusable lesson</div>
<div class="wx-body">Always identify BOTH the recursion tree's depth and the work done per level before claiming a bound - one without the other is an incomplete argument.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>T(n)=2T(n/2)+n &rarr; &Theta;(n log n). T(n)=T(n&minus;1)+O(1) &rarr; O(n) - a smaller bound, for structural reasons, not because recursion "got faster."</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Depth and per-level cost are both required inputs to a recurrence's solution - never just one.</div></div>

---

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

<!-- Week 5 review block -->

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

<!-- Dense worked practice: Week 5 -->
<!-- _class: dense -->

<div class="eyebrow">Midterm practice · Week 5</div>

# A Stability Trace, and a Real-World Pick

<div class="wx-top">
<div class="lead">Two directory entries tie on sort key 2 - call them 2a (entered first) and 2b (entered second).</div>
<div class="goalbox"><span class="k">Goal</span>Trace insertion sort on [4, 2a, 3, 2b] and pick the fastest sort for a near-sorted update.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The trace</div>
<div class="wx-body">
<div class="tracetable">
<div class="row"><div class="rowlabel">start</div><div class="cell">4</div><div class="cell hl">2a</div><div class="cell">3</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">ins 2a</div><div class="cell hl">2a</div><div class="cell">4</div><div class="cell">3</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">ins 3</div><div class="cell">2a</div><div class="cell hl">3</div><div class="cell">4</div><div class="cell">2b</div></div>
<div class="row"><div class="rowlabel">ins 2b</div><div class="cell">2a</div><div class="cell hl2">2b</div><div class="cell">3</div><div class="cell">4</div></div>
</div>
</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Stability holds</div>
<div class="wx-body">2a stays before 2b: insertion sort only shifts elements *strictly greater* than the key, so equal keys never cross - stable in general, not just here.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">The real-world pick</div>
<div class="wx-body">A 500-entry, already-alphabetized directory gets one new room added near the end. Insertion sort (or bubble sort, with its early-exit flag) finishes fastest - both are adaptive.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why selection sort loses here</div>
<div class="wx-body">Selection sort gives no such benefit: its inner loop always scans the entire remaining unsorted region regardless of how close to sorted the array already is.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>[4, 2a, 3, 2b] &rarr; [2a, 2b, 3, 4], order preserved; and adaptive sorts (insertion, bubble) win on nearly-sorted real data.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>The same "strictly greater" comparison that gives insertion sort its stability is also what lets it detect and exploit a nearly-sorted array.</div></div>

---

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

<!-- Week 6 review block -->

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

<!-- Dense worked practice: Week 6 -->
<!-- _class: dense -->

<div class="eyebrow">Midterm practice · Week 6</div>

# Quicksort's Worst Case, and When to Avoid It

<div class="wx-top">
<div class="lead">CampusNav's directory is already sorted, and someone re-runs quicksort on it, always choosing the last element as pivot.</div>
<div class="goalbox"><span class="k">Goal</span>State the running time, why, a fix - and when to reach for merge sort instead.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The running time</div>
<div class="wx-body">O(n&sup2;). On already-sorted data, the last element is always the largest remaining - every partition splits into one subproblem of size n&minus;1 and one of size 0: n levels of O(n) work, not log n levels.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">The fix</div>
<div class="wx-body">Choose the pivot randomly (or median-of-three), so an adversarial or already-sorted input can't force the worst split.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">When to prefer merge sort instead</div>
<div class="wx-body">A real-time system needing a **guaranteed** worst-case bound, where stability doesn't matter: merge sort's O(n log n) holds in the best, average, and worst case, because its divide step always splits exactly in half.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The misconception this kills</div>
<div class="wx-body">"Quicksort's O(n&sup2;) worst case is rare enough to ignore" - it isn't rare by construction, since already- or reverse-sorted data is an entirely ordinary shape for real input.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Fixed last-element pivot on sorted data: O(n&sup2;). Fix the pivot strategy, or choose merge sort when the guarantee itself is the requirement.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>"Faster on average" and "safe to rely on" are different claims - only a worst-case bound answers the second one.</div></div>

---

# Common Midterm Mistake: Advanced Sorting

**Misconception:** "Quicksort's $O(n^2)$ worst case is so rare in
practice it can be ignored." **Reality:** it isn't rare *by
construction* - a first- or last-element pivot strategy hits $O(n^2)$
on any already-sorted or reverse-sorted input, an entirely ordinary
shape for real data (e.g. re-sorting an already-mostly-sorted
directory after a small update). The fix is the pivot *strategy*, not
hoping the input stays "random."

---

<!-- Week 7 review block -->

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

<!-- Dense worked practice: Week 7 -->
<!-- _class: dense -->

<div class="eyebrow">Midterm practice · Week 7</div>

# The Invariant, and Why It Always Terminates

<div class="wx-top">
<div class="lead">State the invariant, use it to explain sortedness, then show termination on a narrow range.</div>
<div class="goalbox"><span class="k">Goal</span>State binary search's invariant and confirm the loop always reaches an exit.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The invariant</div>
<div class="wx-body">If the target is present in the array, it lies within the current search window [lo, hi]. Before the loop, the window is the whole array - trivially true.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Why sortedness is required</div>
<div class="wx-body">Each step discards the half that provably cannot contain the target, based on one comparison against the midpoint - only valid if everything in that half is known to be on the wrong side of the target.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Narrow-range termination</div>
<div class="wx-body">An 8-element search narrows to lo=3, hi=3 without returning yet. One more round runs: mid=3, A[3] is checked directly. Either it matches (return 3), or lo becomes 4 or hi becomes 2 - either way lo&gt;hi next, and the loop exits.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">What this proves</div>
<div class="wx-body">The loop always reaches a single-element range before it can run out of room to shrink into - exactly the shrinking argument the termination proof relies on.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>The invariant plus the shrinking-range argument together guarantee both correctness and termination, on every sorted input.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>"Provably cannot contain the target" is exactly where sortedness is required - on unsorted data the invariant simply breaks.</div></div>

---

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

<!-- Cross-cutting synthesis 1 -->
<!-- _class: dense -->

<div class="eyebrow">Synthesis · recursion &amp; recurrences</div>

# Same Shape, Different Bound

<div class="wx-top">
<div class="lead">A recursive algorithm halves the input each call but does only constant work per call - no combine step.</div>
<div class="goalbox"><span class="k">Goal</span>Solve T(n) = 2T(n/2) + O(1), and compare it honestly to merge sort's recurrence.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Build the tree</div>
<div class="wx-body">Level k has 2^k nodes, each of size n/2^k, each doing O(1) work - so level k costs O(2^k). Depth is log&#8322;n.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Sum the series</div>
<div class="wx-body">&sum; (k=0 to log&#8322;n) O(2^k) = O(2^(log&#8322;n + 1)) = O(n) - a geometric series dominated by its last (bottom) level alone.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Compare to merge sort, correctly</div>
<div class="wx-body">Merge sort's T(n)=2T(n/2)+O(n) gives &Theta;(n log n) - strictly larger than this recurrence's O(n), even though both share a=2, b=2. The difference is entirely in f(n): O(1) here vs. O(n) for merge sort.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The lesson</div>
<div class="wx-body">This one is dominated by the bottom level's sheer node count; merge sort's is spread evenly across every level. Same recurrence *shape* (2, halve) does not mean same bound - always redo the sum.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>T(n) = 2T(n/2) + O(1) resolves to O(n) - smaller than merge sort's &Theta;(n log n), because the per-call work differs, not the branching factor.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Two recurrences that look similar can land on different bounds through very different mechanisms - never pattern-match by shape alone.</div></div>

---

<!-- Cross-cutting synthesis 2 -->
<!-- _class: dense -->

<div class="eyebrow">Synthesis · sorting, Weeks 5-6</div>

# Choosing a Sort for Reverse-Sorted Bulk Data

<div class="wx-top">
<div class="lead">CampusNav's 1,200-entry directory needs re-sorting after a bulk import that leaves it almost entirely reverse-alphabetized.</div>
<div class="goalbox"><span class="k">Goal</span>Recommend a sort - and name the one to specifically avoid.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Avoid: insertion sort</div>
<div class="wx-body">Its adaptiveness only helps on *nearly-sorted* input; a nearly reverse-sorted array is close to its actual worst case, where every new key shifts almost the entire sorted prefix.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Also avoid: fixed-pivot quicksort</div>
<div class="wx-body">Reverse-sorted input is exactly the adversarial shape that forces first- or last-element-pivot quicksort's O(n&sup2;) worst case - mirroring the already-sorted example from Week 6.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Best choice</div>
<div class="wx-body">Merge sort, or quicksort with a random or median-of-three pivot - both guarantee (or expect) O(n log n) regardless of whether the input arrives sorted, reverse-sorted, or anything in between.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The general pattern</div>
<div class="wx-body">Whenever an input's *shape* (not just its size) can be adversarial, prefer whichever algorithm's guarantee doesn't depend on that shape.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Avoid insertion sort and fixed-pivot quicksort here; merge sort or randomized/median-of-three quicksort are both safe.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>"Adaptive" and "guaranteed" are different properties - reverse-sorted data is exactly where the difference shows up.</div></div>

---

<!-- Cross-cutting synthesis 3 -->
<!-- _class: dense -->

<div class="eyebrow">Synthesis · sorting &amp; searching together</div>

# Why Sorting Must Fully Precede Searching

<div class="wx-top">
<div class="lead">CampusNav could try to binary-search its directory without fully sorting it first, by spot-checking "does this half still look ordered" at each step, falling back to linear scan if not.</div>
<div class="goalbox"><span class="k">Goal</span>Show what's wrong with this plan, as a matter of correctness, not just speed.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">What the proof actually requires</div>
<div class="wx-body">Binary search's maintenance proof relies on *every* index &le; mid being &le; A[mid], across the entire current range - not a spot-check of one or two boundary values.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Where the heuristic fails</div>
<div class="wx-body">A "looks ordered" heuristic can pass on a range that isn't actually fully sorted - e.g. a single out-of-order pair buried in the middle, with both ends still looking fine.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">The consequence</div>
<div class="wx-body">That silently breaks the exact assumption the proof depends on - the search can return the wrong answer with no warning, exactly like running it on genuinely unsorted data.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why Weeks 5-6 had to come first</div>
<div class="wx-body">There is no cheaper substitute for genuine, full sortedness as a precondition - which is exactly why sorting had to be fully solved before Week 7 could touch searching at all.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>A spot-check heuristic cannot replace genuine full sortedness - the maintenance proof needs the whole range, not just its ends.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>A precondition that's "probably true" is not the same as one that's proven true - the proof doesn't run on probabilities.</div></div>

---

<!-- Cross-cutting synthesis 4 -->
<!-- _class: dense -->

<div class="eyebrow">Synthesis · proof structure</div>

# One Proof Shape, Two Algorithms

<div class="wx-top">
<div class="lead">Insertion sort's loop invariant (Week 5) and binary search's loop invariant (Week 7) both use the same three-part structure.</div>
<div class="goalbox"><span class="k">Goal</span>State one genuine similarity and one genuine difference between the two proofs.</div>
</div>

<div class="wx-steps chained">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The similarity</div>
<div class="wx-body">Both use initialization (true before the loop starts, usually trivially), maintenance (each iteration preserves the invariant, argued case by case), and termination (what the invariant implies once the exit condition is reached).</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">The difference</div>
<div class="wx-body">Insertion sort's invariant describes what's *true of a growing region* (A[0..i-1] is sorted) - termination confirms the whole array ended up in the claimed state, a positive confirmation.</div>
</div>
<div class="wx-arrow">&rarr;</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">The opposite direction</div>
<div class="wx-body">Binary search's invariant describes what's *still possible* ("if target is present, it's in A[lo..hi]") - a claim that gets narrower over time, and termination *rules out* a possibility rather than confirming a positive state.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Same tool, opposite use</div>
<div class="wx-body">Recognizing which direction a given invariant runs is often the fastest way to see what its termination step is actually proving.</div>
</div>
</div>

<div class="conclusion"><div class="bar-icon">&#10003;</div><div class="bar-text"><span class="k">Conclusion</span>Same three-part shape, one proof builds a positive claim, the other narrows toward ruling a possibility out.</div></div>
<div class="takeaway"><div class="bar-icon">&#128161;</div><div class="bar-text"><span class="k">Key takeaway</span>Learn the shape once, then ask "is this invariant building something, or eliminating something?" for any new proof you meet.</div></div>

---

<!-- SLOT N+1: replaces "Limits" per SPINE's short-review variant -->

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
  per-week recap cards, worked practice problems, and common-mistake
  warnings above to find your own gaps before the exam.
---

# Summary, Continued

- **Reading:** review CLRS (Cormen/Leiserson/Rivest/Stein's <em>Introduction to Algorithms</em>) 4th ed, Chapters 1-4 (algorithm properties,
  analyzing algorithms, growth of functions, recursion/recurrences),
  §2.1-2.2 (basic sorting), §2.3 and Ch 7 (advanced sorting), and
  Exercise 2.3-6 (binary search) - skim what you've already read, no
  new reading assigned.
- **Prepare:** Assignment 2 (Sorting) is due before the exam per the
  syllabus; bring only what the instructor's exam announcement
  permits. No separate Week 8 Check is issued - the worked practice
  above, plus the midterm itself, cover this week.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
