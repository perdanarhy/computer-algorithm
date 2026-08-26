---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 9: Divide and Conquer

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
</div>

<!--
notes: Welcome the class back from the midterm. Say: "You now know how to sort, search,
and analyze recursion. Today we ask a bigger question: is there a general strategy for
*inventing* a new algorithm, instead of starting from zero every time?"
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
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk now"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Say: "The midterm covered Weeks 1-7. Weeks 9-14 are the second half: four general
design paradigms, plus graphs. Today starts paradigm number one." -->

---

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Grading a Pile of Exams

<div class="thread">A quick warm-up. No algorithms vocabulary needed yet.</div>

Two TAs must count and total the scores on a pile of 200 exam papers.

- **Method A:** One TA counts through all 200 papers, alone, front to back.
- **Method B:** Split the pile into two stacks of 100. Each TA counts their
  own stack independently. Then the two TAs add their two subtotals
  together to get the final total.

- Which method finishes faster? Does the order the papers were split in matter?

<!--
notes: Give students 30 seconds to think before asking.
Ask aloud: "In Method B, could each TA just as easily split their own 100
papers again, into two piles of 50, and hand those to two more people?"
Do not name "divide and conquer" yet - let them describe the shape informally.
-->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** the midterm (Week 8) confirmed you can correctly
  execute and analyze every tool from Weeks 1-7 - Big-O, recursion, basic
  and advanced sorting, and binary search.
- **Last week left broken:** every one of those tools was invented, and
  taught, one problem at a time - Big-O, recursion, sorting, and searching
  are all in place, but there is still no general strategy for building a
  *new* algorithm from scratch when CampusNav hits a problem none of them
  directly solves.

---

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Divide:** break a problem into smaller pieces of the same kind.
- **Conquer:** solve each piece, recursively, until it's small enough to
  solve directly.
- **Combine:** stitch the pieces' answers back into an answer for the
  whole problem.
- **Paradigm:** a general strategy for *inventing* algorithms, reusable
  across totally different problems - not one fixed algorithm.

<!-- notes: Read each term aloud once. Say these four words are today's whole shape, formalized one slide at a time. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# A New Kind of Problem

<div class="pain">

The CampusNav team wants to add a "best free time block" feature: look at
a student's whole day and tell them the single longest, most useful
stretch of free time between classes. One developer just starts writing
code - checking every possible starting point, then every possible
ending point after it, adding everything in between up each time. It
works on the small example she tried. But on a busy day with hundreds of
small time slots, it crawls, and nobody on the team has any general way
to think about making it faster. They know how to sort a list and search
a sorted one. Neither one applies here. They are inventing from zero,
again.

</div>

<!-- notes: Do not say "divide and conquer," "recursion," or "Big-O" here. Let the class feel that this problem is genuinely new. -->

---

<!-- SLOT 5: Cost of not knowing -->

# What Else This Actually Costs

- Sorting and searching solved *one shape* of problem - "put things in
  order" and "find a match." "Best free time block" is a different shape
  entirely, and CampusNav will keep meeting new shapes for the rest of
  the semester.
- Without a general strategy, every new feature means starting design
  from a blank page - with no way to predict, before writing code,
  whether the result will even be fast.

<div class="why">
<strong>In industry:</strong> this is exactly why "algorithm design
paradigms" (divide-and-conquer, greedy, dynamic programming) are their
own interview and job-requirement category, separate from "know these
ten algorithms by name." Employers are testing whether you can invent a
correct, fast approach to a problem you've never seen before.
</div>

---

<!-- SLOT 6: Driving question -->

<!-- _class: section -->

# This Week's Question

<div class="driving-q">"When a problem is genuinely new, is there a general recipe for turning it into a fast algorithm?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. State the divide-and-conquer paradigm as three general stages, and
   explain what "independent subproblems" and "a combine step" mean.
2. State and apply the Master theorem to classify a recurrence of the
   form $T(n) = aT(n/b) + f(n)$ into one of its three cases.
3. Trace the maximum-subarray divide-and-conquer algorithm by hand,
   including its linear-time crossing step.
4. Explain why a recursive algorithm is not automatically
   divide-and-conquer, and identify the difference on sight.

---

<!-- NEW: session-1 close -->

# Coming Up

<div class="thread">Next: where this general strategy actually came from.</div>

Later today, you'll trace the crossing-subarray step yourself on a fresh
array, and classify a few recurrences with the Master theorem. That's
**Worksheet Parts A and B**. First, the mechanics.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did "divide and conquer" come from?</div>

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Recurrence:** an equation that defines a function's cost in terms of
  its own cost on smaller inputs - what Week 4 taught you to trace.
- **Master theorem:** a direct formula for solving recurrences of the
  shape $T(n) = aT(n/b) + f(n)$, without tracing the whole recursion tree.
- **Crossing subarray:** in the maximum-subarray problem, a candidate
  answer that starts in the left half and ends in the right half.
- **Watershed function:** shorthand for $n^{\log_b a}$, the quantity the
  Master theorem compares $f(n)$ against.

<!-- notes: Read each term aloud. Say the recurrence toolkit from Week 4 is about to get its missing piece. -->

---

<!-- SLOT 8: Origin -->

# This Strategy Is Not New - Naming It Was the Breakthrough

<div class="thread">You've already used this shape twice. Today it gets a name.</div>

- **1945:** John von Neumann describes merge sort - split the list in
  half, sort each half, merge the results (Week 6). At the time, it's
  just "a clever sorting trick."
- **1969:** Volker Strassen publishes a way to multiply two matrices
  faster than the "obvious" method, by splitting each matrix into
  quarters and combining the results in an unexpected way. A completely
  different problem, the *same* divide/solve/combine shape.
- **1974:** Aho, Hopcroft, and Ullman's *The Design and Analysis of
  Computer Algorithms* is the first major textbook to pull this
  recurring shape out of individual algorithms and teach it as its own
  reusable strategy - one of a small handful of general **paradigms**.

<div class="why">
Once the pattern had a name, computer scientists could point it at new
problems on purpose, instead of stumbling onto it by luck.
</div>

---

<!-- SLOT 9: Core concept -->

# Divide and Conquer: Definition

<div class="thread">Fifty years of reuse, and the warm-up you just ran with a pile of exams. Here it is, precisely.</div>

> A **divide-and-conquer** algorithm solves a problem of size $n$ by:
> **(1) Divide** the problem into $a$ **independent** subproblems of
> roughly size $n/b$; **(2) Conquer** each subproblem recursively, solving
> it directly once it's small enough (the base case); **(3) Combine** the
> subproblems' solutions into a solution for the original problem.

- **Independent** is doing real work in that definition: the subproblems
  must not overlap or depend on each other's answers.
- Skip the combine step, or let the subproblems overlap, and it is
  recursion - just not *this* paradigm. More on that later.

---

# The General Template

<div class="pipeline">
<div class="stage"><div class="h">1. Divide</div><div class="s">Split the problem into smaller pieces of the same kind</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">2. Conquer</div><div class="s">Solve each piece recursively - directly, if small enough</div></div>
<div class="arrow">&rsaquo;</div>
<div class="stage"><div class="h">3. Combine</div><div class="s">Merge the pieces' answers into one answer for the whole</div></div>
</div>

The exam-grading warm-up: **divide** the pile in two, **conquer** by
having each TA count their own stack, **combine** by adding the two
subtotals. Merge sort (Week 6) is exactly this shape, applied to sorting.

---

# Measuring the Cost: Recurrences, Revisited

<div class="thread">Week 4 taught you to trace these by hand. Today you get a shortcut.</div>

Every divide-and-conquer algorithm's running time has the shape:

$$
T(n) = a \cdot T(n/b) + f(n)
$$

- $a$ - how many subproblems each call makes
- $n/b$ - the size of each subproblem ($b$ is the shrink factor)
- $f(n)$ - the cost of the divide and combine steps themselves,
  *outside* the recursive calls

Merge sort: $a=2$ subproblems, $b=2$ (each half the size), and merging
two sorted halves costs $f(n) = \Theta(n)$. So $T(n) = 2T(n/2) + \Theta(n)$.

---

# The Master Theorem: Setup

<div class="thread">Week 4 only previewed this intuitively. Here it is, formalized.</div>

Given $T(n) = aT(n/b) + f(n)$, with $a \geq 1$ and $b > 1$, compare
$f(n)$ against the **watershed function** $n^{\log_b a}$ - the cost the
recursive calls alone would produce if the divide/combine steps were
free.

- $f(n)$ **smaller** than the watershed → the recursive calls dominate.
- $f(n)$ **equal** to the watershed → both contribute equally.
- $f(n)$ **larger** than the watershed → the divide/combine step dominates.

Three cases, one for each possibility. No tracing the whole tree required.

---

# The Master Theorem: Three Cases

| Case | Condition on $f(n)$ | Result |
|---|---|---|
| **1** | $f(n) = O(n^{\log_b a - \varepsilon})$ for some $\varepsilon>0$ (grows *polynomially slower*) | $T(n) = \Theta(n^{\log_b a})$ |
| **2** | $f(n) = \Theta(n^{\log_b a})$ (grows at the *same rate*) | $T(n) = \Theta(n^{\log_b a}\log n)$ |
| **3** | $f(n) = \Omega(n^{\log_b a + \varepsilon})$ for some $\varepsilon>0$ (grows *polynomially faster*), **and** the regularity condition $a\,f(n/b) \le c\,f(n)$ holds for some constant $c<1$ and all large $n$ | $T(n) = \Theta(f(n))$ |

<div class="why">
Not every recurrence fits one of these three cases cleanly - if f(n)
falls in the gap between cases, or case 3's regularity condition fails,
the Master theorem simply doesn't apply, and you're back to tracing the
tree by hand (Week 4).
</div>

---

# Applying It: Merge Sort's Recurrence

<div class="thread">The anchor example - the same recurrence you traced informally in Week 4.</div>

$$
T(n) = 2T(n/2) + \Theta(n)
$$

- $a = 2$, $b = 2$ → watershed $= n^{\log_2 2} = n^1 = n$
- $f(n) = \Theta(n)$ - exactly matches the watershed
- That's **Case 2**: $f(n) = \Theta(n^{\log_b a})$

$$
T(n) = \Theta(n^{\log_b a}\log n) = \Theta(n \log n)
$$

<span class="bignotation">Θ(n log n)</span> - exactly the bound Week 6
established by tracing the recursion tree by hand. The Master theorem
gets you there in three lines instead of a whole tree diagram.

---

<!-- NEW: mechanics, ties back to recursion (Week 4) and merge sort (Week 6) -->

# You've Already Done Half of This

<div class="thread">Nothing here is new - it's what you already know, now with a name and a shortcut.</div>

- **Week 4** taught you to trace a recursive algorithm's cost by hand,
  one level of the tree at a time.
- **Week 6** built merge sort - divide the list in half, recursively sort
  each half, merge the sorted halves back together - without ever
  calling it "divide-and-conquer."
- Today: the same shape, given a name, a formal definition, and a direct
  formula (the Master theorem) so you don't have to draw the tree by
  hand every time.

---

<!-- NEW: CampusNav worked example intro, sets up the max-subarray build -->

# CampusNav: The Best Free Time Block Feature

<div class="thread">Back to today's pain - now with a plan.</div>

A student's day is logged in 10-minute slots, each marked **+1 free** or
**−1 busy**. CampusNav wants the single longest, most useful contiguous
stretch of free time - the run of slots whose values sum to the largest
number.

For today's trace, consecutive same-type slots are already merged into
one block, to keep the array short: a `+4` means four free slots in a
row (worth 40 minutes); a `−3` means three busy slots in a row. This
doesn't change the algorithm, only how compact the picture is.

$$
[\,4,\ -3,\ 5,\ -2,\ -1,\ 6,\ -3,\ 4,\ -8,\ 5\,]
$$

This is the **maximum subarray problem**: find the contiguous run with
the largest sum.

---

# Divide and Conquer It

<div class="thread">Apply the template. The tricky part is the combine step.</div>

Split the array at its midpoint. The best contiguous run is in exactly
one of three places:

- **Entirely in the left half** - solve recursively on the left half.
- **Entirely in the right half** - solve recursively on the right half.
- **Crossing the midpoint** - starts somewhere in the left half, ends
  somewhere in the right half. Neither recursive call alone can find
  this one - it needs its own step.

The answer is whichever of these three candidates has the largest sum.

---

# The Crossing Step, in Linear Time

<div class="thread">The step that makes this whole algorithm work.</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Scan leftward from the midpoint toward the start, tracking a running sum, and remember the best sum of any run that ends exactly at the midpoint.</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Scan rightward from just after the midpoint toward the end, tracking a running sum, and remember the best sum of any run that starts exactly one past the midpoint.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">The best crossing run = best-left-sum + best-right-sum. Each scan touches every element once - together, this step is Θ(n).</div></div>
</div>

```text
FIND-CROSSING(A, low, mid, high):
    best-left = -infinity, sum = 0
    for i = mid downto low:  sum += A[i]; track best-left, its start index
    best-right = -infinity, sum = 0
    for j = mid+1 to high:   sum += A[j]; track best-right, its end index
    return (start, end, best-left + best-right)
```

---

# Trace: Divide the Array

<div class="tracetable">
<div class="row"><div class="rowlabel">index</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">4</div><div class="cell">5</div><div class="cell">6</div><div class="cell">7</div><div class="cell">8</div><div class="cell">9</div></div>
<div class="row"><div class="rowlabel">value</div><div class="cell hl">4</div><div class="cell hl">-3</div><div class="cell hl">5</div><div class="cell hl">-2</div><div class="cell hl">-1</div><div class="cell hl2">6</div><div class="cell hl2">-3</div><div class="cell hl2">4</div><div class="cell hl2">-8</div><div class="cell hl2">5</div></div>
</div>

$low=0$, $high=9$, $mid = 4$. **Left half** (indices 0-4, blue) and
**right half** (indices 5-9, gold) each recurse independently. Left's
best turns out to be `[4,-3,5]` = **6** (indices 0-2). Right's best
turns out to be `[6,-3,4]` = **7** (indices 5-7). Now check the crossing case.

---

# Trace: Crossing Sums at the Top Level

**Best-left** (scan from index 4 back to 0):

| add index | 4 | 3 | 2 | 1 | 0 |
|---|---|---|---|---|---|
| value | -1 | -2 | 5 | -3 | 4 |
| running sum | -1 | -3 | 2 | -1 | **3** ← best |

**Best-right** (scan from index 5 forward to 9):

| add index | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|
| value | 6 | -3 | 4 | -8 | 5 |
| running sum | 6 | 3 | **7** ← best | -1 | 4 |

Crossing sum $= 3 + 7 = \mathbf{10}$, spanning indices $[0, 7]$.

---

# Trace: The Winner

Compare all three candidates at the top level:

| Candidate | Range | Sum |
|---|---|---|
| Left half, recursive best | $[0,2]$ | 6 |
| Right half, recursive best | $[5,7]$ | 7 |
| **Crossing** | $[0,7]$ | **10** |

<div class="tracetable">
<div class="row"><div class="rowlabel">index</div><div class="cell">0</div><div class="cell">1</div><div class="cell">2</div><div class="cell">3</div><div class="cell">4</div><div class="cell">5</div><div class="cell">6</div><div class="cell">7</div><div class="cell">8</div><div class="cell">9</div></div>
<div class="row"><div class="rowlabel">value</div><div class="cell hl">4</div><div class="cell hl">-3</div><div class="cell hl">5</div><div class="cell hl">-2</div><div class="cell hl">-1</div><div class="cell hl">6</div><div class="cell hl">-3</div><div class="cell hl">4</div><div class="cell">-8</div><div class="cell">5</div></div>
</div>

The crossing case wins: CampusNav's best free-time block runs straight
through the middle of the day, worth **10** - longer and better than the
best block hiding in either half alone. (Full multi-level trace in the handout.)

---

# The Recurrence for Max Subarray

<div class="thread">Same shape as merge sort - that's not a coincidence.</div>

Two recursive calls on halves, plus one linear crossing scan:

$$
T(n) = 2T(n/2) + \Theta(n)
$$

$a=2$, $b=2$, watershed $=n^{\log_2 2}=n$, and $f(n)=\Theta(n)$ matches
it exactly → **Case 2**, same as merge sort:

$$
T(n) = \Theta(n \log n)
$$

Both algorithms halve the data and do linear work to combine - that
shape always lands in Case 2.

---

# Now: Worksheet Parts A and B

<div class="thread">Time to practice. Trace it yourself, then classify recurrences.</div>

Work with your neighbor. Open **[Worksheet Parts A &
B](materials/week09/worksheet.html)**. Part A: trace the crossing-subarray
step on a fresh array. Part B: classify three recurrences with the
Master theorem.

**~20 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project the worksheet. Walk the room while pairs work.
After 20 minutes, ask 2 pairs to share their Part B classifications.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: a second D&amp;C trick, then what this paradigm can't do.</div>

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Fast exponentiation:** computing $a^n$ in $O(\log n)$ multiplications
  by repeated squaring, instead of $n-1$ multiplications one at a time.
- **Overlapping subproblems:** when recursive calls solve the *same*
  smaller subproblem more than once - the opposite of "independent,"
  and the signal for dynamic programming (Week 11), not D&C.
- **Regularity condition:** the extra requirement Master theorem Case 3
  needs before it's safe to apply.

<!-- notes: Read each term aloud. Say Week 11 gives overlapping subproblems their own paradigm. -->

---

<!-- NEW: second, brief D&C example, per the CampusNav case study -->

# A Second D&C Trick: Halving the Shortcut Counter

<div class="thread">Brief - this problem gets solved properly in Week 11.</div>

CampusNav also has a 20-step shortcut you can take 1 or 2 steps at a
time. "How many distinct ways?" was Week 4's runaway recursion-tree
example: $\text{ways}(n) = \text{ways}(n-1) + \text{ways}(n-2)$, traced
by brute force, blowing up exponentially.

That recursion is **not** divide-and-conquer - the two calls both touch
overlapping smaller subproblems, not independent ones. But there's a
genuine D&C trick available: instead of dividing the *steps*, halve the
*step number itself*, the same idea fast exponentiation uses to compute
$a^n$ by squaring.

---

# From Halving Steps to a Logarithmic Bound

<div class="thread">Same trick as fast exponentiation, applied to a counting recurrence.</div>

A pair of identities lets you jump from $\text{ways}(k)$
straight to $\text{ways}(2k)$ and $\text{ways}(2k+1)$ in $O(1)$ arithmetic:

$$
T(n) = T(n/2) + O(1) = \Theta(\log n)
$$

---

# Why This Trick Is Special-Cased

<div class="thread">A preview, not the real fix.</div>

Halving the step number is elegant, but it only works because this
particular counting recurrence has a known closed identity to exploit -
it doesn't generalize to arbitrary overlapping-subproblem recursions.

<div class="why">
Week 11 solves this exact 20-step counter - and the whole family of
problems shaped like it - properly, with <strong>dynamic
programming</strong>: the same numbers, a general technique instead of a
one-off trick, and Week 4's exploding recursion tree finally fixed for good.
</div>

---

<!-- SLOT N-2: Worked example -->

# CampusNav: Two New Features, One Paradigm

<div class="thread">Everything above, together, on the actual features.</div>

- **Best free-time block:** divide the day in half, recurse on each
  half, handle the crossing case in linear time - $T(n)=2T(n/2)+\Theta(n)
  = \Theta(n\log n)$. A genuinely faster algorithm than checking every
  start/end pair, discovered by *applying the paradigm*, not by luck.
- **Shortcut-counter speedup:** halving the step index, fast-exponentiation
  style, gets a brute-force-exponential count down to $\Theta(\log n)$ -
  though this one is a specialized trick, not the general fix (that's Week 11).

Both features exist today only because CampusNav's team finally had a
*strategy* for inventing an algorithm, not just a library of fixed ones.

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"It's recursive, so it's divide-and-conquer."** D&C requires
  *independent* subproblems plus an explicit *combine* step. The
  shortcut-counter recursion from Week 4 is recursive but not D&C - its
  two calls overlap the same smaller subproblems, which is exactly what
  dynamic programming (Week 11) is built to handle differently.
- **"The Master theorem always applies."** It only classifies
  recurrences shaped like $T(n)=aT(n/b)+f(n)$ where $f(n)$ fits cleanly
  into one of the three cases. If $f(n)$ falls in the gap between cases,
  or Case 3's regularity condition fails, you're back to tracing the
  tree (Week 4) or need a different tool entirely.

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. Classify $T(n) = 4T(n/2) + n$ with the Master theorem. Which case,
   and what is $T(n)$?
2. In the maximum-subarray algorithm, why can't the crossing case just
   be found by trying every possible (start, end) pair that straddles
   the midpoint?
3. Why is CampusNav's Week-4 step-counting recursion not
   divide-and-conquer, even though it calls itself twice?

---

# Answers

1. Watershed $= n^{\log_2 4} = n^2$. $f(n) = n = O(n^{2-1})$, so this is
   **Case 1**: $T(n) = \Theta(n^{\log_b a}) = \Theta(n^2)$.
2. Trying every straddling pair is $O(n^2)$ work for that step alone,
   which would make the whole algorithm no faster than brute force.
   Scanning outward from the midpoint once in each direction finds the
   best "ends at mid" and "starts at mid+1" runs in one linear pass each.
3. Its two recursive calls, $\text{ways}(n-1)$ and $\text{ways}(n-2)$,
   are not independent - they recompute many of the same smaller
   subproblems repeatedly. D&C requires independent subproblems; this
   overlap is the signal for dynamic programming instead.

---

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 9 Quiz](materials/week09/quiz.html)**. Answer on your
own, about 10 minutes. Check your own answers at the end.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 10 slot 3's "left broken" and feeds Week 10 slot 4 -->

# What Divide-and-Conquer Cannot Do

<div class="limits">
Divide-and-conquer works when a problem's subproblems are genuinely
independent and a combine step can stitch their answers back together -
CampusNav's free-time finder and shortcut counter both prove it. But
divide-and-conquer assumes a problem splits cleanly into independent
left/right halves that can be solved separately and then merged - not
every problem is shaped like that. Some reward one purely local choice,
made once, instead of a full recursive split.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 9 leaves **what to do when recursion is overkill, and a single
local choice might already be optimal** unsolved. **Week 10, Greedy
Algorithms**, addresses it: CampusNav's room-booking assistant, built by
always granting the request that frees up a room soonest - no recursion,
no combine step, just one correct local choice repeated.

---

<!-- SLOT N+3: Summary -->

# Summary

- **Divide-and-conquer** is a paradigm - divide into independent
  subproblems, conquer recursively, combine - not one fixed algorithm.
- The **Master theorem** classifies $T(n) = aT(n/b) + f(n)$ into one of
  three cases by comparing $f(n)$ to $n^{\log_b a}$, without tracing the
  whole recursion tree.
- The **maximum-subarray** problem needs a linear-time crossing step in
  addition to the two recursive halves - the combine step is where the
  real design work happens.
- **Not every recursive algorithm is D&C** - overlapping subproblems
  (Week 4's shortcut counter) need a different paradigm (DP, Week 11).
- **Reading:** CLRS, Chapter 4 (Divide-and-Conquer: 4.1 Maximum
  Subarray, 4.3-4.5 the Master theorem and its proof).
- **Prepare:** think of one everyday scheduling decision where making
  the locally best choice, once, feels obviously right. Bring it to Week 10.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
