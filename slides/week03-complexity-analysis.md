---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 3: Complexity Analysis

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703<br/>
<strong>Assignment 1 released this week</strong> - due Week 5
</div>

<!--
notes: Welcome the class. Ask: "Last week you all wrote a correct algorithm for finding a room. If two of you wrote different correct pseudocode, whose is better, and how would you prove it?" Let a few students answer. That is today's hook.
-->

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Algorithm Concepts</div></div>
<div class="wk now"><div class="n">Wk 3</div><div class="t">Complexity Analysis</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">Recursion &amp; Recurrence</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Basic Sorting</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Advanced Sorting</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">Searching</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">Divide &amp; Conquer</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">Greedy Algorithms</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">Dynamic Programming I</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">Dynamic Programming II</div></div>
<div class="wk"><div class="n">Wk 13</div><div class="t">Graph Representation</div></div>
<div class="wk"><div class="n">Wk 14</div><div class="t">Shortest Path</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

<!-- notes: Point at Week 3. Say: "Weeks 1 and 2 gave us the vocabulary. Today we finally get to measure with it." -->

---

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Two Functions, One Race

<div class="thread">A quick warm-up. No formulas required yet.</div>

Two algorithms exist for the same problem. Algorithm A costs about
$1000n$ steps. Algorithm B costs about $n^2$ steps.

- At $n = 10$: A costs 10,000 steps. B costs 100 steps.
- At $n = 2{,}000$: A costs 2,000,000 steps. B costs 4,000,000 steps.

- Which algorithm is "faster"? Does the answer change depending on $n$?

<!--
notes: Give students 30 seconds before asking. Let them notice A wins at n=10 but loses badly at n=2,000. Ask: "Is there a crossover point? Roughly where?" (n=1000, where 1000n = n^2). Do not name "Big-O" yet - let them feel that the constant (1000) eventually stops mattering.
-->

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** CampusNav's `FIND_ROOM` now exists as real, checkable pseudocode - verified against all five required properties (finiteness, definiteness, input, output, effectiveness).
- **Last week left broken:** we can now write two different *correct* algorithms for the same problem, but we still have no rigorous way to say which one is actually **better** - "better" is still just a feeling.

---

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Time complexity:** how an algorithm's running cost grows as input size grows.
- **Space complexity:** how much *extra* memory an algorithm needs, as a function of input size.
- **Asymptotic:** describing behavior as $n$ gets arbitrarily large - not at one fixed size.
- **Tight bound:** a growth-rate claim that is neither an exaggeration nor an underestimate - formalized today as $\Theta$.

<!-- notes: Read each term aloud once. Say these four words are today's entire vocabulary, made precise by the end of the lecture. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# Two Correct Answers, One Argument

<div class="pain">

Two students both submit pseudocode for CampusNav's "find room
성파703" feature. Both pass every test the TA throws at them - every
single time, the correct room comes back. In the study group, one
student swears their version is "obviously faster." The other says
"prove it." Neither can point to anything beyond a stopwatch and a
shrug, and neither can say what happens once the directory has ten
times as many rooms in it. Nobody in the room has a rule for settling
the argument.

</div>

<!-- notes: Do not say "Big-O" yet. Let the class feel that "correct" alone leaves a real, unanswered question. -->

---

# Both Work. Only One Might Scale.

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">One building, ~40 rooms</div>
  <div class="bar-track"><div class="bar-fill short" style="width: 10%"></div></div>
  <div class="bar-value">both feel instant</div>
</div>
<div class="bar-row">
  <div class="bar-label">Whole campus, ~1,200 rooms</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 45%"></div></div>
  <div class="bar-value">one starts to lag</div>
</div>
<div class="bar-row">
  <div class="bar-label">Campus + partner campuses, 10,000+ rooms</div>
  <div class="bar-track"><div class="bar-fill long" style="width: 95%"></div></div>
  <div class="bar-value">nobody can predict this - yet</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is that "it worked on my test" says nothing about the third row.</div>

<!-- notes: Pause on the third row. Say: "We will actually measure this row, precisely, later today." -->

---

<!-- SLOT 5: Cost of not knowing -->

# What Not Knowing Actually Costs

- Two correct solutions can differ by orders of magnitude in cost, but without a rigorous measure, the CampusNav team can't predict that difference *before* it hurts users.
- Nobody can promise "this will still be fast" once the directory grows - only guess.
- Every design decision (which data structure, which loop shape) becomes a debate settled by opinion instead of proof.

<div class="why">
<strong>In industry:</strong> "What's the time complexity of your
solution?" is the single most common follow-up question in a
technical interview - and a wrong answer, or no answer, fails
candidates who wrote perfectly <em>correct</em> code.
</div>

---

# It Gets Worse As the Problem Grows

<div class="barchart">
<div class="bar-row">
  <div class="bar-label">Small test input</div>
  <div class="bar-track"><div class="bar-fill risk-low" style="width: 12%"></div></div>
  <div class="bar-value">every method looks fine</div>
</div>
<div class="bar-row">
  <div class="bar-label">Real production data</div>
  <div class="bar-track"><div class="bar-fill risk-med" style="width: 55%"></div></div>
  <div class="bar-value">gaps start to show</div>
</div>
<div class="bar-row">
  <div class="bar-label">Data grows 10-100x (the norm, not the exception)</div>
  <div class="bar-track"><div class="bar-fill risk-high" style="width: 92%"></div></div>
  <div class="bar-value">the wrong choice becomes unusable</div>
</div>
</div>
<div class="bar-note">Illustrative, not measured data: the point is the trend, not the exact percentages.</div>

A system with no plan for this **will** ship a feature that quietly
stops working the moment it succeeds and gains more users or data.

---

<!-- SLOT 6: Driving question -->

<!-- _class: section -->

# This Week's Question

<div class="driving-q">"How do we precisely measure an algorithm's cost, and predict - not guess - how that cost grows as CampusNav's data grows?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. State the formal definition of Big-O notation and prove a growth-rate bound directly from it, exhibiting valid constants $c$ and $n_0$.
2. Order the common growth rates from slowest- to fastest-growing, and identify which term dominates a bound.
3. Distinguish time complexity from space complexity, and distinguish a growth-rate bound from a single measured running time.
4. Analyze how CampusNav's current linear-scan room lookup will behave as the directory grows from 1,200 to 10,000+ entries.

---

<!-- NEW: Assignment 1 announcement -->

# Assignment 1: Released Today

<div class="thread">Everything from this week, applied on paper.</div>

- **Assignment 1 - Complexity & Pseudocode** is out starting today.
- Three parts: CLRS-style pseudocode, Big-O proofs from the formal definition, and a growth-rate ordering exercise.
- **Due Week 5, 23:59**, submitted individually via the course LMS.
- Full spec, rubric, and submission format: **`materials/assignments/assignment1.md`**

<!-- notes: Say: "You have two full weeks. Start the pseudocode part now - the proof techniques you need for Part 2 are today's entire lecture." -->

---

<!-- NEW: session-1 close, previews Worksheet Part A -->

# Coming Up: Worksheet Part A

<div class="thread">Next in this class: less listening, more doing.</div>

Later today, you and a partner will order a shuffled deck of
growth-rate cards from slowest to fastest, and time CampusNav's
actual linear scan by hand.

That is **Worksheet Part A**. Keep a pen ready.

---

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did this notation come from?</div>

---

<!-- SLOT 8: Origin -->

# This Problem Is Not New Either

<div class="thread">Different course, same field: mathematicians hit this exact wall a century before computers existed.</div>

<div class="timeline">
<div class="pt"><div class="dot"></div><div class="y">1894</div><div class="d">Paul Bachmann introduces O-notation in a number theory book, to describe error-term bounds cleanly.</div></div>
<div class="pt"><div class="dot"></div><div class="y">1909</div><div class="d">Edmund Landau popularizes and formalizes it - this family is still called "Landau notation."</div></div>
<div class="pt"><div class="dot"></div><div class="y">1976</div><div class="d">Donald Knuth adapts O, &Omega;, &Theta; specifically for algorithm analysis, standardizing what this course uses today.</div></div>
</div>

<div class="why">
Computer scientists needed exactly what mathematicians needed:
a way to compare two formulas' growth <em>without</em> caring about
one specific machine, compiler, or lucky benchmark run.
</div>

---

# A Motivating Example: Racing Two Real Features

<div class="thread">Back to the warm-up - now with an actual CampusNav feature.</div>

CampusNav's room directory is scraped from campus signage, and a few
rooms end up listed twice by mistake. CampusNav wants a "find duplicate
entries" feature. One design compares every pair of entries; another
design is smarter.

| Directory size ($n$) | Naive pairwise check | Linear scan (for comparison) |
|---|---|---|
| 40 | 1,600 comparisons | 40 steps |
| 1,200 | 1,440,000 comparisons | 1,200 steps |
| 10,000 | 100,000,000 comparisons | 10,000 steps |

Same correctness, wildly different cost - and the gap *widens*, not
narrows, as $n$ grows. We need a name for that shape of growth.

---

<!-- SLOT 9: Core concept -->

# Big-O: Formal Definition

<div class="thread">One line of math, and today's entire vocabulary becomes precise.</div>

> $f(n) = O(g(n))$ **if and only if** there exist positive constants
> $c$ and $n_0$ such that $0 \le f(n) \le c \cdot g(n)$ for all $n \ge n_0$.

In plain words: $f(n)$ never grows faster than some constant multiple
of $g(n)$, once $n$ is large enough. $O(g(n))$ is an **upper bound**
on growth rate - not a running time.

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Constants ($c$, $n_0$):** the proof only needs *some* values to exist - you get to choose them, and they don't need to be small or "nice."
- **Dominant term:** the single term in a formula that grows fastest - the only one that survives inside Big-O.
- **Big-&Omega;, Big-&Theta;:** the matching lower-bound and tight-bound notations, defined the same way as Big-O (next slide).
- **In-place:** an algorithm that uses no extra memory beyond a constant amount, regardless of $n$ (today's space-complexity idea).

<!-- notes: Read each term aloud. Say: "You will use every one of these words in Assignment 1, due Week 5." -->

---

<!-- Act 3 / BUILD -->

# Reading the Definition, Piece by Piece

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">Pick a comparison function $g(n)$ - usually the simplest shape that matches $f$'s growth (e.g. $n^2$).</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Find <em>any</em> constant $c > 0$ that, once multiplied by $g(n)$, stays on top of $f(n)$. The exact value of $c$ never matters - only that one exists.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Find <em>any</em> threshold $n_0$. You are allowed to ignore small, "weird" values of $n$ - the bound only has to hold from $n_0$ onward.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">If such $c$ and $n_0$ exist, $f(n)$ grows no faster than $g(n)$'s shape, for large $n$. That is the <em>entire</em> promise - nothing about small $n$, nothing about exact seconds.</div></div>
</div>

---

# Worked Proof: $3n^2 + 10n + 7 = O(n^2)$

<div class="thread">The exact proof style Assignment 1 expects - not just the answer, the argument.</div>

**Claim:** $3n^2 + 10n + 7 = O(n^2)$.

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">For all $n \ge 1$: $n \le n^2$, so $10n \le 10n^2$.</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">For all $n \ge 1$: $1 \le n^2$, so $7 \le 7n^2$.</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Adding: $3n^2 + 10n + 7 \le 3n^2 + 10n^2 + 7n^2 = 20n^2$, for all $n \ge 1$.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">Choose $c = 20$, $n_0 = 1$. Then $0 \le 3n^2+10n+7 \le 20n^2$ holds for every $n \ge 1$. <span class="bignotation">Q.E.D.</span></div></div>
</div>

---

# The Same Proof, Checked Numerically

| $n$ | $3n^2+10n+7$ | $20n^2$ | Holds? |
|---|---|---|---|
| 1 | 20 | 20 | Yes ($20 \le 20$) |
| 2 | 39 | 80 | Yes |
| 10 | 407 | 2,000 | Yes |

**A tighter choice also works:** for $n \ge 10$, $10n \le n^2$ and
$7 \le n^2$, so $3n^2+10n+7 \le 5n^2$ - meaning $c=5$, $n_0=10$ is
also a valid proof.

<div class="why">
There is no single "correct" (c, n&#8320;) pair. Big-O only asks that
<strong>some</strong> pair exists - this is why two students can turn
in different-looking, equally correct proofs of the same bound.
</div>

---

# Big-&Omega; and Big-&Theta;: The Other Two Bounds

<div class="thread">O is only half the picture - here's the rest of the family.</div>

| Notation | Meaning | Formal definition |
|---|---|---|
| $O(g(n))$ | Upper bound - "no worse than" | $\exists\, c, n_0 > 0: 0 \le f(n) \le c \cdot g(n)$ for $n \ge n_0$ |
| $\Omega(g(n))$ | Lower bound - "no better than" | $\exists\, c, n_0 > 0: 0 \le c \cdot g(n) \le f(n)$ for $n \ge n_0$ |
| $\Theta(g(n))$ | Tight bound - "exactly this shape" | $f(n) = O(g(n))$ **and** $f(n) = \Omega(g(n))$ |

Linear search on a random target is $\Theta(n)$: it is never faster
than proportional to $n$ (no shortcut exists) and never slower
either. Most of this course states bounds with $O$, but $\Theta$ is
the stronger, more informative claim when it holds.

---

<!-- NEW: math toolbox (1 of 2), before the growth-rate hierarchy -->

# Math Background You Need Today

<div class="thread">Two building blocks show up in every growth rate from here on. Let's ground them first.</div>

- **Logarithm** ($\log_2 n$): "how many times do you halve $n$ before you
  reach 1?" $\log_2 8 = 3$, because $8 \to 4 \to 2 \to 1$ takes 3
  halvings. This is exactly the shape Week 7's binary search runs on -
  repeatedly cutting a search space in half.

| $n$ | $\log_2 n$ |
|---|---|
| 8 | 3 |
| 16 | 4 |
| 1,000 | ~10 |
| 1,000,000 | ~20 |

- Unless stated otherwise, "$\log n$" in this course always means
  $\log_2 n$ - the base rarely matters for Big-O anyway, since
  different bases only differ by a constant factor.

---

<!-- NEW: math toolbox (2 of 2) -->

# Math Background, Continued

<div class="thread">One more shape, and two symbols you're about to meet.</div>

- **Factorial** ($n!$): multiply every positive integer up to $n$.
  $4! = 4 \times 3 \times 2 \times 1 = 24$. It shows up whenever an
  algorithm considers every possible *ordering* of $n$ items.
- **$\exists$ ("there exists"):** reads like plain English -
  "$\exists\, c > 0$" means "there exists some constant $c > 0$" - you
  only need to produce **one**, not find every one.
- **$\prec$ ("grows strictly slower than"):** $f(n) \prec g(n)$ means
  $f$'s growth rate stays strictly below $g$'s once $n$ is large
  enough - the exact symbol the next slide uses to rank every growth
  rate in this course.

---

# The Growth-Rate Hierarchy

<div class="thread">Every algorithm this semester lands on this one line, slowest to fastest.</div>

<span class="bignotation">O(1)</span> &#8826;
<span class="bignotation">O(log n)</span> &#8826;
<span class="bignotation">O(&radic;n)</span> &#8826;
<span class="bignotation">O(n)</span> &#8826;
<span class="bignotation">O(n log n)</span> &#8826;
<span class="bignotation">O(n$^{1.5}$)</span> &#8826;
<span class="bignotation">O(n&sup2;)</span> &#8826;
<span class="bignotation">O(n&sup3;)</span> &#8826;
<span class="bignotation">O(2&#8319;)</span> &#8826;
<span class="bignotation">O(n!)</span>

- **Polynomial** ($O(1)$ through $O(n^3)$ and beyond): *tractable* - cost grows, but manageably.
- **Exponential and factorial** ($O(2^n)$, $O(n!)$): *intractable* at any real scale - shown next.

---

# Where Do $\sqrt{n}$ and $n^{1.5}$ Fit?

<div class="thread">Two growth rates from the hierarchy above, placed precisely.</div>

- $\sqrt{n}$ grows slower than $n$ - it's the halfway point between
  $O(1)$ and $O(n)$ on a log scale.
- $n^{1.5} = n \cdot \sqrt{n}$ grows faster than $n \log n$ but slower
  than $n^2$.
- You'll meet both again: `materials/assignment1.md` asks you to place
  them in a growth-rate ordering exercise.

---

# Growth Rates, With Real Numbers

| Growth rate | $n = 10$ | $n = 100$ | $n = 1{,}000$ |
|---|---|---|---|
| $O(1)$ | 1 | 1 | 1 |
| $O(\log n)$ | ~3 | ~7 | ~10 |
| $O(n)$ | 10 | 100 | 1,000 |
| $O(n \log n)$ | ~33 | ~664 | ~9,970 |
| $O(n^2)$ | 100 | 10,000 | 1,000,000 |
| $O(n^3)$ | 1,000 | 1,000,000 | 1,000,000,000 |
| $O(2^n)$ | 1,024 | ~$1.27\times10^{30}$ | unimaginably large |
| $O(n!)$ | ~3,628,800 | ~$9.3\times10^{157}$ | incomprehensibly large |

---

# What "Uncomputable" Actually Means

<div class="thread">One row of that table, taken seriously.</div>

<div class="why">
At n=10, even O(n!) finishes in well under a second. At n=100,
O(2^n) alone is already &asymp;1.27&times;10^30 steps - at one
billion steps/second, that's roughly 4&times;10^13 years, about
<strong>3,000 times the current age of the universe.</strong>
</div>

---

# Space Complexity, Briefly

<div class="thread">Cost isn't only time - it's also memory.</div>

- **Space complexity:** the *extra* memory an algorithm uses, as a function of $n$, beyond the input it was given.
- **In-place:** uses only $O(1)$ extra memory - a fixed number of extra variables, regardless of how large $n$ gets. Example: swapping two entries of an array using one temporary variable.
- **Not in-place:** allocates a second structure that grows with $n$. Example: copying CampusNav's entire directory into a new array before sorting it - that copy is $O(n)$ extra space.
- Space complexity uses **the exact same** $O$/$\Omega$/$\Theta$ machinery as time - just measuring memory instead of steps.

<div class="why">
Preview: Weeks 5-6 compare sorting algorithms that are provably
correct <em>and</em> O(n log n) in time, yet differ sharply in
space - some sort in-place, some don't.
</div>

---

<!-- SLOT N-2: Worked example -->

# CampusNav: Timing the Room Directory, For Real

<div class="thread">Everything above, on the actual 1,200-room directory.</div>

Assume one comparison (array access + string check) costs about
**50 nanoseconds** on typical hardware.

**Linear scan, $O(n)$ - CampusNav's actual `FIND_ROOM`:**

| Directory size | Worst-case steps | Worst-case time |
|---|---|---|
| 1,200 rooms (current) | 1,200 | 0.06 ms |
| 10,000+ rooms (partner campuses) | 10,000 | 0.5 ms |

$O(n)$ alone is not the danger here - even 10,000 rooms is imperceptible.

---

# CampusNav: The Duplicate-Checker's Bill Comes Due

<div class="thread">Same directory. A different feature, a different growth rate.</div>

**Duplicate-checker, $O(n^2)$ - the naive pairwise design from earlier:**

| Directory size | Worst-case comparisons | Worst-case time |
|---|---|---|
| 1,200 rooms (current) | 1,440,000 | **72 ms** - noticeable |
| 10,000+ rooms (partner campuses) | 100,000,000 | **5 seconds** - the app freezes |

---

# The Real Lesson

<div class="thread">Not "avoid growth." Know which growth you're shipping.</div>

- CampusNav's core lookup is comfortably $O(n)$ and will stay fine even
  as the campus directory merges with partner schools.
- But "just add one more feature" is not free: a duplicate-checker, a
  recommendation pass, or any feature that compares *every pair* of
  entries defaults to $O(n^2)$ - and $O(n^2)$ is exactly what turns a
  10&times; data-size increase into a 100&times; slowdown.
- This is why every feature this course adds to CampusNav gets its
  growth rate stated up front, not discovered after users complain.

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **"Big-O tells you the exact running time."** Tempting because $O(n^2)$ looks like it should predict a stopwatch reading - but it only bounds how cost *grows*, never the actual seconds. Two $O(n^2)$ algorithms can differ by a huge constant factor and both be correctly labeled $O(n^2)$.
- **"Keep the fanciest term you just learned."** For $n^2 + n\log n$, it is tempting to report $O(n \log n)$ because that term feels more sophisticated - but for large $n$, $n^2$ grows faster and eventually dwarfs $n \log n$ completely. The bound must always come from the **fastest-growing** term present, never the most recently introduced one.

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. True or False: if algorithm A is $O(n^2)$ and algorithm B is $O(n \log n)$, then A is always slower than B, on every input.
2. Is $n^2 + n \log n$ equal to $O(n \log n)$? Justify your answer.
3. CampusNav's linear scan is $O(n)$. If the directory grows 10&times; (1,200 &rarr; 12,000 rooms), roughly how does worst-case time change? What if the scan were $O(n^2)$ instead?

---

# Answers

1. **False.** Big-O is an asymptotic guarantee for *large enough* $n$ - for small $n$, or with very different constants, an $O(n^2)$ algorithm can easily run faster in practice than an $O(n \log n)$ one.
2. **No - it is $O(n^2)$.** The bound comes from the fastest-growing term present. $n^2$ eventually dominates $n \log n$ for any large enough $n$, so dropping $n^2$ instead of $n \log n$ is exactly backwards.
3. $O(n)$: worst-case time also scales roughly 10&times;. $O(n^2)$: worst-case time scales roughly 100&times; - a 10&times; input increase becomes a 100&times; cost increase.

---

<!-- NEW: Try-It hand-off, session 2 -->

# Now: Worksheet Part A

<div class="thread">Time to practice. Sort the cards, then prove a bound.</div>

Work with your neighbor. Open **[Worksheet Part
A](materials/week03/worksheet.html)**. Order a shuffled set of
growth-rate cards from slowest to fastest, then time CampusNav's
linear scan by hand on a sample directory.

**~15 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project Worksheet Part A. Walk the room while pairs work.
After 15 minutes, ask 2 pairs to justify one adjacent pair in their card ordering out loud.
-->

---

<!-- NEW: Try-It hand-off, Part B proof practice -->

# Now: Worksheet Part B

<div class="thread">Same pair. This time: finish a Big-O proof yourself.</div>

Open **[Worksheet Part B](materials/week03/worksheet.html)**.
Complete a fill-in-the-blank Big-O proof, spot the bug in a broken
proof, and connect today's bound back to a real feature.

**~15 minutes.** Raise your hand if you get stuck.

<!--
notes: Hand out or project Worksheet Part B. After 15 minutes, reveal the correct constants for B1 and discuss B2's bug as a class.
-->

---

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: what today's tools still can't touch.</div>

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Recursion:** an algorithm defined partly in terms of itself, on a smaller input - previewed next week.
- **Recurrence relation:** a formula for cost that is partly written in terms of its own cost - Week 4's entire subject.
- **Divide-and-conquer:** a paradigm that splits a problem into smaller independent subproblems - Week 9, once recurrences can be solved.
- **NP-hard:** a problem class with no known efficient algorithm at all - Week 14's teaser, and the final destination of "how efficient can this possibly be?"

<!-- notes: Read each term aloud. Say: "Today formalized cost for algorithms with a known, fixed shape. Next week, algorithms whose shape calls itself." -->

---

# Why This Shows Up in Interviews, Too

<div class="thread">Not only a CampusNav problem.</div>

"State the time complexity of your solution, and prove it" appears in
essentially every technical interview at every major tech company -
not as a formality, but because it is the fastest way to tell whether
a candidate's "working" code will survive contact with real,
large-scale data.

<div class="why">
Every course after this one - sorting, searching, databases, machine
learning, systems - assumes you can read an algorithm and state its
growth rate on sight, the same way this course assumed you could
already write a loop.
</div>

---

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 3 Quiz](materials/week03/quiz.html)**. Answer on your
own, about 10 minutes. Check your own answers at the end. Ask if
anything surprises you.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 4 slot 4 -->

# What Big-O Still Cannot Do

<div class="limits">
We can now precisely compare any two algorithms' growth rates, and
prove those bounds directly from the formal definition - the argument
from this morning's warm-up is finally settled with proof, not a
shrug. But not every algorithm's cost is a simple, already-known
formula in n. An algorithm that calls itself hides its own cost
inside a formula that refers back to itself - and we don't yet have a
way to solve that kind of formula down to a clean Big-O bound.
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 3 leaves **the cost of self-referential algorithms** unsolved -
we can bound $3n^2+10n+7$, but not yet a formula like $T(n) = T(n-1) +
O(1)$ that refers to itself. **Week 4, Recursion & Recurrence**,
gives us the tool: recurrence relations, and how to solve them down
to the same Big-O bounds learned today.

---

<!-- SLOT N+3: Summary -->

# Summary

- $O$ / $\Omega$ / $\Theta$ formalize "how cost *grows*," never "how
  many seconds" - reuse the $c, n_0$ definition to prove it, not guess it.
- The fastest-growing term always wins: $3n^2+10n+7$ is $O(n^2)$,
  and $n^2 + n\log n$ is $O(n^2)$, not $O(n\log n)$.
- An algorithm fine at $n=10$ can be uncomputable at $n=100$ if its
  growth rate is exponential or worse - a structural gap, not a
  matter of a faster computer.
- CampusNav's core lookup stays $O(n)$-safe at 10,000+ rooms, but any
  feature defaulting to $O(n^2)$ (like naive duplicate-checking) will not.
- **Reading:** CLRS, Chapter 3 (Growth of Functions).
- **Prepare:** think about an algorithm that calls itself - how would
  you write its cost as a formula in $n$? Bring an idea to Week 4.
- **Reminder:** Assignment 1 is due Week 5, 23:59.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
