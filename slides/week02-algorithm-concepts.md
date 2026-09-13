---
marp: true
theme: algorithms
paginate: true
footer: 'Department of Intelligent Computing'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Week 2: Algorithm Concepts

<span class="subtitle">Computer Algorithms (506994-002)</span>

<div class="meta">
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · Building A, Room 703
</div>

<!--
notes: Remind the class of last week's "look around until you find it" line from the
course-contract session. Say: "Today we get the actual rules for telling a real
algorithm from a vague instruction that just sounds like one."
-->

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk"><div class="n">Wk 1</div><div class="t">Introduction</div></div>
<div class="wk now"><div class="n">Wk 2</div><div class="t">Algorithm Concepts</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Complexity Analysis</div></div>
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

<!-- notes: Point at Week 2. Say: "Last week we felt why this course exists. This week we get the actual rulebook." -->

---

<!-- REWRITTEN: was a discussion warm-up; now teacher-delivered narration, also folds in the old end-of-deck Check Yourself Q1 (which property does "keep improving the guess" violate) -->

# Before We Start: Could a Computer Actually Run This?

<div class="thread">Three ways to phrase "find room 703." Only one of them is actually an algorithm.</div>

Three instructions for finding room 703 in Building A:

- **A:** "Walk to Building A, take the stairs or elevator to floor 7, and go to room 703."
- **B:** "Look around until you find it."
- **C:** "Keep improving your guess about where it is until it feels right."

---

<!-- SPLIT for overflow: the resolution now gets its own slide -->

# Only One of These Is Actually an Algorithm

<div class="thread">Same three instructions. Here's why only one of them qualifies.</div>

Only **A** could be handed to a computer, or to two different
classmates, and produce the exact same result every time. **B** and
**C** both sound reasonable in conversation - that's exactly the trap.
**B** never says what "look around" means as an executable step (an
**effectiveness** problem); **C** never states a condition for when to
stop (a **finiteness** problem, on top of the same effectiveness gap).
Today's five properties are precisely how we tell A apart from B and
C, instead of just feeling the difference.

---

<!-- SLOT 3: Recap + open wound -->

# Last Week, This Week

- **Last week delivered:** the course contract - grading, policy, schedule - plus a first taste of the question this whole course answers.
- **Last week left broken:** we still have no rigorous way to check whether a written-down procedure even *qualifies* as a real algorithm. "Look around until you find it" still sounded like a perfectly reasonable instruction.

---

<!-- NEW: Key Words Today, session 1 -->

# Key Words Today

- **Property:** one required condition a procedure must satisfy to count as a real algorithm - today's whole topic is five of them.
- **Ambiguous:** allowing more than one reasonable interpretation - exactly what a real algorithm is never allowed to be.
- **Spec (specification):** a precise statement of what problem an algorithm solves - what counts as valid input, and what output is required.
- **Pseudocode:** a structured, language-independent way of writing algorithm steps precisely, without full programming-language syntax.

<!-- notes: Read each term aloud once. Say these four words get put to work in the next ten minutes. -->

---

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon. Split from the original combined pain+two-col slide: pain alone here, the two builds on the next slide. -->

# Two Developers, One Instruction

<div class="pain">

CampusNav's team writes down "find room X" as a spec: "Look around
until you find it, and ask someone if you're stuck." Both developers
say, honestly, that they implemented the spec - and ship completely
different builds for the same instruction.

</div>

<!-- notes: Do not say "definiteness" yet. Let the class feel the mess first; the two builds are on the next slide. -->

---

<!-- NEW: continuation - the two builds, side by side -->

# Two Different Builds, Side by Side

<div class="thread">Same spec. Here's what each developer actually shipped.</div>

<div class="two-col">
<div>

**Developer A's build**
- Displays a static campus photo
- User visually scans the image
- No fallback if the photo is unclear

</div>
<div>

**Developer B's build**
- Pops up "Ask a nearby person"
- No guidance on who to ask or what to say
- No fallback if no one is nearby

</div>
</div>

---

# Two Different Apps, Same Instruction: Why?

<div class="thread">Same spec, two builds - what actually went wrong.</div>

In the demo, nobody in the room can say which one is *wrong* - the
instruction never pinned down what "look around" or "ask someone"
actually means as steps a program executes.

<!-- notes: Do not say "definiteness" yet. Let the class feel the mess first. -->

---

<!-- SLOT 5: Cost of not knowing -->

# What This Actually Costs

- Two "implementations of the same algorithm" behave differently - a bug report against one team's build may not even reproduce on the other's.
- Without fixed rules to check a procedure against, code review is just opinion: "this feels vague" instead of "this precisely violates property X."
- Nobody can even agree on what the "correct" behavior *is*, because the instruction never defined one.

<div class="why">
<strong>In industry:</strong> ambiguous specifications are one of the
most common root causes of the gap between what a team meant to build
and what got shipped. Technical interviews grade your stated
algorithm on exactly this: is it precise enough that two different
graders, tracing it by hand, would reach the identical conclusion?
</div>

---

<!-- SLOT 6: Driving question -->

# This Week's Question

<div class="driving-q">"What makes a written set of steps precise enough that anyone - or any computer - must run it exactly the same way?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Week, You Can

1. State and check the five properties every real algorithm must satisfy: finiteness, definiteness, input, output, effectiveness.
2. Distinguish an algorithm from a program that implements it.
3. Write pseudocode, and read a flowchart, precise enough that a vague instruction is disqualified on sight.
4. Given a broken "algorithm," identify exactly which property it violates and why.

---

<!-- SLOT 8: Origin. Split into two: the older history here, Knuth's fix next. -->

# Precision Is Not New (1)

<div class="thread">You just felt the mess. Now: who fixed it, and how long ago?</div>

- **Euclid's algorithm** for the greatest common divisor (~300 BCE) is the oldest algorithm still taught today - a precise, step-by-step procedure, written down long before "computer" meant a machine.
- In 1936, **Alan Turing** and **Alonzo Church**, working independently, formalized exactly what "a step-by-step procedure a machine can follow" even means - the moment "algorithm" stopped being an informal word.

---

<!-- NEW: continuation of Origin -->

# Precision Is Not New (2)

<div class="thread">One more name, then the rulebook itself, next slide.</div>

- **Donald Knuth**, in *The Art of Computer Programming* (1968), wrote down the five properties on the next slide precisely because, without them, two people who both claimed to have "an algorithm" could be describing completely different things - exactly like our two CampusNav developers.

<div class="why">
Every field that depends on precise procedures - law, medicine,
cooking, computing - eventually invents its own version of "this
instruction is too vague to follow reliably." Computing's version is
the five properties.
</div>

---

<!-- SLOT 9: Core concept -->

# Algorithm: The Five Required Properties

<div class="thread">This is the rulebook. Every algorithm this semester gets checked against all five (CLRS - Cormen, Leiserson, Rivest &amp; Stein's <em>Introduction to Algorithms</em>, 4th ed, Ch 1).</div>

1. **Finiteness** - must terminate after a finite number of steps, for *every* valid input.
2. **Definiteness** - every step must be precisely and unambiguously specified; no room for interpretation.
3. **Input** - zero or more well-defined values, from a specified set, supplied before execution begins.
4. **Output** - one or more well-defined values, with a specified relationship to the input.
5. **Effectiveness** - every step must be basic enough to be carried out exactly, in principle by a person with pencil and paper, in finite time.

A procedure that fails even one of these is not an algorithm - it's a suggestion.

---

<!-- NEW: Key Words Today, session 2 -->

# Key Words Today

- **Finiteness:** must halt after a finite number of steps, for every valid input - *provably*, not just "it stopped when I ran it."
- **Definiteness:** every step has exactly one meaning; no step can be read two different ways.
- **Effectiveness:** every step must be simple enough to actually carry out exactly, in finite time - no step may rely on a "feeling."
- **Well-defined input/output:** the exact set of legal values, stated precisely - including what happens on an input with no good answer.

<!-- notes: Read each term aloud. Say: "Watch for these five ideas in everything for the rest of the hour." -->

---

<!-- Act 3 / BUILD: pseudocode and flowchart conventions -->

# How We'll Write Pseudocode This Semester

<div class="thread">Definiteness and effectiveness, as house rules.</div>

<div class="steps">
<div class="step-row"><div class="step-num">1</div><div class="step-text">One primitive operation per line - no line does two things at once.</div></div>
<div class="step-row"><div class="step-num">2</div><div class="step-text">Every loop states its exact bound: <code>for i = 1 to n</code>, not "repeat a while."</div></div>
<div class="step-row"><div class="step-num">3</div><div class="step-text">Every array index range is explicit - indices run <code>0</code> to <code>length(A) - 1</code>, stated, not assumed.</div></div>
<div class="step-row"><div class="step-num">4</div><div class="step-text">No verb like "check," "look," or "handle" appears without saying exactly what operation it performs.</div></div>
<div class="step-row"><div class="step-num">5</div><div class="step-text">Every function names its input and its output on the signature line: <code>NAME(param1, param2)</code>.</div></div>
</div>

---

<!-- NEW: pseudocode conventions, continued (1 of 2) -->

# Pseudocode Conventions, Continued

<div class="thread">Five more rules before we can read anything on the next few slides.</div>

<div class="steps">
<div class="step-row"><div class="step-num">6</div><div class="step-text"><code>=</code> means <strong>assignment</strong> (store a value); <code>==</code> and <code>!=</code> mean <strong>comparison</strong> (a true/false test) - never confuse them: <code>x = 5</code> sets <code>x</code> to 5, <code>x == 5</code> asks whether it already is.</div></div>
<div class="step-row"><div class="step-num">7</div><div class="step-text"><code>if condition:</code> followed by an indented block is everything that runs when the condition is true - indentation alone marks a block's extent, no closing keyword needed.</div></div>
<div class="step-row"><div class="step-num">8</div><div class="step-text"><code>while condition:</code> repeats its indented block as long as the condition holds. Use <code>while</code> when the number of passes isn't known in advance; use <code>for</code> when it is.</div></div>
<div class="step-row"><div class="step-num">9</div><div class="step-text"><code>return value</code> ends the function immediately and hands <code>value</code> back to whoever called it.</div></div>
<div class="step-row"><div class="step-num">10</div><div class="step-text"><code>mod</code> (modulo) is the remainder after division: <code>17 mod 5 = 2</code>, because $17 = 3 \times 5 + 2$. We lean on it constantly starting with GCD, a few slides from here.</div></div>
</div>

---

<!-- NEW: pseudocode conventions, continued (2 of 2) -->

# Pseudocode Conventions, Continued (2)

<div class="thread">The rest of this semester's vocabulary, in one more pass.</div>

<div class="steps">
<div class="step-row"><div class="step-num">11</div><div class="step-text"><code>swap A[i] and A[j]</code> exchanges their two values. What happens under the hood (usually a temporary variable) never matters for reading pseudocode - only that both values trade places.</div></div>
<div class="step-row"><div class="step-num">12</div><div class="step-text">Boolean conditions combine with <code>and</code>, <code>or</code>, <code>not</code>. <code>and</code>/<code>or</code> evaluate left to right, so <code>i &lt; length(A) and A[i] == target</code> is safe - the length check runs first and can block the unsafe index read before it happens.</div></div>
<div class="step-row"><div class="step-num">13</div><div class="step-text"><code>break</code> exits the nearest enclosing loop immediately, skipping any remaining passes.</div></div>
<div class="step-row"><div class="step-num">14</div><div class="step-text"><code>A[lo..hi]</code> means the subarray from index <code>lo</code> to index <code>hi</code>, <strong>inclusive</strong> of both ends.</div></div>
<div class="step-row"><div class="step-num">15</div><div class="step-text">A <strong>record</strong> (or struct) groups named fields together; <code>someRecord.field</code> reads one of them - <code>directory[i].room</code>, a few slides from here, is exactly this.</div></div>
</div>

---

<!-- NEW: CLRS's own pseudocode conventions, as a second reference point (CLRS 4th ed, §2.1-2.2) -->

# CLRS's Own Pseudocode Style

<div class="thread">Our house style isn't the only one. Here's the textbook's (CLRS 4th ed, §2.1-2.2).</div>

Every algorithm in CLRS is written in a slightly different dialect of
the same idea:

- **1-indexed arrays:** CLRS arrays run `A[1..n]`, not `A[0..n-1]` -
  the very first thing to translate when moving between the book and
  our own pseudocode.
- **Numbered lines:** every statement gets its own line number, so a
  proof (like a loop invariant) can say "after line 5" precisely.
- **`//` comments:** a trailing note that isn't executed - the same
  role as a comment in real code.
- Same underlying rules as ours: definiteness and effectiveness still
  apply - only the surface notation differs.

---

<!-- NEW: worked example in CLRS's own style, style reference only per SPINE.md (insertion sort content itself isn't taught until Week 5). Folds in the old Check Yourself pair on the two pseudocode styles. -->

# Worked Example: INSERTION-SORT, CLRS-Style

<div class="thread">Not today's content - just today's notation, on the algorithm you'll meet properly in Week 5.</div>

```text
INSERTION-SORT(A, n)
1   for i = 2 to n
2       key = A[i]
3       // Insert A[i] into the sorted subarray A[1..i-1].
4       j = i - 1
5       while j > 0 and A[j] > key
6           A[j + 1] = A[j]
7           j = j - 1
8       A[j + 1] = key
```

Notice `A[i]` starts at index 2 (1-indexed), and each line is
numbered. Same five properties apply to this procedure as to any
other - we are not analyzing its cost yet, only reading its shape.

---

<!-- SPLIT for overflow: the notation-vs-algorithm point now gets its own slide -->

# Two Styles, One Idea

<div class="thread">`FIND_ROOM` and `INSERTION-SORT`, compared.</div>

`FIND_ROOM` (our house style) and `INSERTION-SORT` (CLRS style) use
different indexing conventions - **different notation, not a
different algorithm**, exactly the algorithm/program distinction one
level up: the same idea can be written down two ways, as long as each
is precise.

---

<!-- MERGED: flowchart shapes + rules, folds in the old Check Yourself content on unlabeled diamonds and redrawing FIND_ROOM -->

# Flowchart Conventions

<div class="thread">Same rules, drawn instead of written.</div>

<div class="chip-row">
<div class="chip">Oval = Start / End</div>
<div class="chip">Rectangle = Process step</div>
<div class="chip">Diamond = Decision (yes/no branch)</div>
<div class="chip">Arrow = Flow of control</div>
</div>

- Exactly **one** Start oval, and every path must reach an **End** oval - draw one and you're checking finiteness visually.
- Every Diamond must have exactly two labeled exits (e.g. "yes" / "no") - an unlabeled or missing branch is a **definiteness** violation, drawn: whoever reads the flowchart would not know what to do in the unlabeled case, so two readers could build two different behaviors from the same diagram.
- Pseudocode and flowcharts describe the *same* algorithm two ways; `FIND_ROOM` (a few slides ahead) converts cleanly into one Diamond (`directory[i].room == target`), one Rectangle (advance `i`), one Start oval, and two End ovals (found / `NOT_FOUND`).

---

<!-- What Is a GCD?, split: the definition alone here, the slow worked method next -->

# What Is a GCD?

<div class="thread">Before the algorithm: what are we even computing?</div>

The **greatest common divisor** of two whole numbers is the largest whole number that divides both of them with no remainder.

---

<!-- NEW: continuation - the slow, brute-force method -->

# GCD(12, 18), the Slow Way

<div class="thread">One correct method, before we meet the fast one.</div>

**List every divisor:**
- Divisors of 12: 1, 2, 3, 4, 6, 12
- Divisors of 18: 1, 2, 3, 6, 9, 18
- Common to both: 1, 2, 3, 6
- **Greatest** of those: **6** - so GCD(12, 18) = 6.

That works for small numbers, but listing every divisor of two 12-digit numbers is hopeless. Euclid's algorithm gets the same answer without ever listing a single divisor - the next two slides show how, drawn and then written.

---

# Flowchart: Euclid's GCD

<div class="thread">The pseudocode on the next slide, drawn instead of written - same algorithm, converted.</div>

<svg viewBox="0 0 560 460" width="380" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="gcdArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
<path d="M0,0 L10,5 L0,10 z" fill="var(--brand)"/>
</marker>
</defs>
<ellipse cx="250" cy="35" rx="95" ry="28" fill="var(--navy)"/>
<text x="250" y="40" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">GCD(a, b)</text>
<line x1="250" y1="63" x2="250" y2="103" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrow)"/>
<polygon points="250,103 345,160 250,217 155,160" fill="var(--brand)"/>
<text x="250" y="165" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">b != 0?</text>
<line x1="250" y1="217" x2="250" y2="252" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrow)"/>
<text x="268" y="238" font-size="14" fill="var(--navy)">yes</text>
<rect x="150" y="252" width="200" height="42" rx="6" fill="var(--pale)" stroke="var(--brand)" stroke-width="1.5"/>
<text x="250" y="278" font-size="15" fill="var(--navy)" text-anchor="middle" font-family="monospace">r = a mod b</text>
<line x1="250" y1="294" x2="250" y2="319" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrow)"/>
<rect x="150" y="319" width="200" height="42" rx="6" fill="var(--pale)" stroke="var(--brand)" stroke-width="1.5"/>
<text x="250" y="345" font-size="15" fill="var(--navy)" text-anchor="middle" font-family="monospace">a = b</text>
<line x1="250" y1="361" x2="250" y2="386" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrow)"/>
<rect x="150" y="386" width="200" height="42" rx="6" fill="var(--pale)" stroke="var(--brand)" stroke-width="1.5"/>
<text x="250" y="412" font-size="15" fill="var(--navy)" text-anchor="middle" font-family="monospace">b = r</text>
<path d="M150,407 L60,407 L60,160 L153,160" fill="none" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrow)"/>
<line x1="345" y1="160" x2="403" y2="160" stroke="var(--brand)" stroke-width="2" marker-end="url(#gcdArrow)"/>
<text x="374" y="148" font-size="14" fill="var(--navy)" text-anchor="middle">no</text>
<ellipse cx="480" cy="160" rx="75" ry="28" fill="var(--navy)"/>
<text x="480" y="165" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">return a</text>
</svg>

<div class="graphviz-note">Same three lines as the loop body in the pseudocode next: r = a mod b, then a = b, then b = r - the diamond re-checks after each pass around the loop.</div>

---

<!-- Idea + pseudocode merged slide, matching the teacher-centric skeleton -->

# Euclid's GCD: Idea and Pseudocode

<div class="thread">A clean, classic case before we return to CampusNav's messier one (CLRS 4th ed, §31.2).</div>

```text
GCD(a, b):
    while b != 0:
        r = a mod b
        a = b
        b = r
    return a
```

- **Input:** two well-defined positive integers, `a` and `b`.
- **Output:** a single well-defined integer, their greatest common divisor.
- **Definiteness:** `mod`, assignment, and comparison are each precisely defined operations - no step is open to interpretation.
- **Effectiveness:** `mod`, assignment, and `!=` are all basic operations any of us could execute by hand.

---

<!-- NEW: dense worked example, GCD, simple tier -->
<!-- _class: dense -->

<div class="eyebrow">Euclid's GCD · worked example 1 of 3 (simple)</div>

# The Fastest Case: GCD(8, 4)

<div class="wx-top">
<div class="lead">The smallest case that still runs the loop - and stops after just one pass.</div>
<div class="goalbox"><span class="k">Goal</span>Trace GCD(8, 4) and see finiteness hold in the fewest possible steps.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Start</div>
<div class="wx-body">a=8, b=4. b != 0, so the loop body runs.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">One step</div>
<div class="wx-body">r = 8 mod 4 = 0. a = 4, b = 0.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Result</div>
<div class="wx-body">b = 0 now, so the loop stops immediately. Return a = 4.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>GCD(8, 4) = 4 in a single iteration.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Even the "instant" case is governed by the exact same shrinking-`b` rule that guarantees every case eventually stops.</div>

---

<!-- NEW: dense worked example, GCD, moderate tier (reuses the deck's existing verified 48,18 trace) -->
<!-- _class: dense -->

<div class="eyebrow">Euclid's GCD · worked example 2 of 3 (moderate)</div>

# A Full Trace: GCD(48, 18)

<div class="wx-top">
<div class="lead">Three passes this time - watch `b` shrink toward 0 every step.</div>
<div class="goalbox"><span class="k">Goal</span>Trace GCD(48, 18) completely, one iteration per card.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Step 1</div>
<div class="wx-body">a=48, b=18: r = 48 mod 18 = 12. a=18, b=12.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Step 2</div>
<div class="wx-body">a=18, b=12: r = 18 mod 12 = 6. a=12, b=6.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Step 3</div>
<div class="wx-body">a=12, b=6: r = 12 mod 6 = 0. a=6, b=0. b=0, loop stops.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Result</div>
<div class="wx-body">Return a = 6. Matches the divisor-listing check from a few slides back.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>GCD(48, 18) = 6 after 3 iterations - no divisor list needed.</div>
<div class="takeaway"><span class="k">Key takeaway</span>Three steps instead of one - shrinking `b` still guarantees termination, it just takes more passes.</div>

---

<!-- NEW: dense worked example, GCD, harder tier (reuses and completes the deck's existing 89,55 Fibonacci trace; folds the finiteness-proof content) -->
<!-- _class: dense -->

<div class="eyebrow">Euclid's GCD · worked example 3 of 3 (harder)</div>

# The Slow Case: GCD(89, 55), and Why It Still Stops

<div class="wx-top">
<div class="lead">Consecutive Fibonacci numbers are the worst case for this algorithm - let's see why it still terminates.</div>
<div class="goalbox"><span class="k">Goal</span>Trace the slowest realistic case, then prove termination in general, not just for this pair.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Setup</div>
<div class="wx-body">GCD(89, 55) - consecutive Fibonacci numbers. Compare to GCD(48, 18)'s 3 steps.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">First 3 steps</div>
<div class="wx-body">r=89 mod 55=34; r=55 mod 34=21; r=34 mod 21=13 - three steps in, still not close to 0.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Six more steps</div>
<div class="wx-body">r=21 mod 13=8; r=13 mod 8=5; r=8 mod 5=3; r=5 mod 3=2; r=3 mod 2=1; r=2 mod 1=0. Nine steps total, versus three for GCD(48, 18) on similarly-sized inputs.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">Why it must still stop</div>
<div class="wx-body">Every step's remainder r = a mod b is strictly less than b and never negative, so b strictly decreases toward 0 no matter how slowly - the argument that proves finiteness for <em>every</em> valid pair, not just the ones we happen to trace.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>GCD(89, 55) = 1 after 9 steps - three times the work of GCD(48, 18), yet governed by the exact same guarantee.</div>
<div class="takeaway"><span class="k">Key takeaway</span>A trace only shows that one input stopped. Finiteness needs the general argument - `b` strictly decreases, bounded below by 0 - that covers every input, fast or slow.</div>

---

<!-- Rewritten: teacher-delivered exposition instead of a "find the bug" discussion prompt -->

# One More Trap: "It Ran, So It Must Be Right"

<div class="thread">GCD's proof was earned. Most code never gets that scrutiny - here's a bug hiding in plausible-looking code.</div>

A student submits this attempt at "find the maximum value in a list."
It has never once produced a visibly wrong answer for its author - and
it still has a bug that fires on **every single run**.

```text
MAX(A):
    m = A[0]
    for i = 1 to length(A):
        if A[i] > m:
            m = A[i]
    return m
```

---

<!-- NEW: dense worked example, MAX bug reveal. Folds the old "Where MAX Breaks" slide and the "Check Yourself: Tested vs. Proven" pair. -->
<!-- _class: dense -->

<div class="eyebrow">MAX · finding the hidden bug</div>

# Where `MAX` Actually Breaks

<div class="wx-top">
<div class="lead">Array indices run 0 to length(A) - 1. Here's exactly where the loop bound goes wrong.</div>
<div class="goalbox"><span class="k">Goal</span>Show why passing tests never proves an algorithm correct.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">The loop bound</div>
<div class="wx-body">The loop says `i = 1 to length(A)`, letting `i` reach `length(A)` - one past the last real element, out of bounds on every run.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">What happens</div>
<div class="wx-body">Depending on the language, that read either crashes immediately, or silently returns whatever value sits in adjacent memory.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Why nobody noticed</div>
<div class="wx-body">That garbage value is often small enough that `A[i] > m` evaluates false - so the final answer still comes out right, by luck, not by correctness.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The real lesson</div>
<div class="wx-body">The bug fires every run; whether it's <em>visible</em> is luck, not design. Passing tests can show the presence of a bug hides - never its absence.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>The fix: the loop should run `i = 1 to length(A) - 1`. Looking definite and effective is not the same as being correct.</div>
<div class="takeaway"><span class="k">Key takeaway</span>"I tested it and it worked" is never proof of correctness - a silent, harmless-looking garbage read is still a bug.</div>

---

<!-- NEW: dense worked example, two more broken "algorithms". Folds the old Activity + Answers pair. -->
<!-- _class: dense -->

<div class="eyebrow">Spotting broken "algorithms"</div>

# Two More Broken "Algorithms"

<div class="wx-top">
<div class="lead">Neither of these could actually be run, or handed to a colleague, and produce one guaranteed behavior.</div>
<div class="goalbox"><span class="k">Goal</span>Name exactly which property each one violates, and why.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">"While true: print the next prime number."</div>
<div class="wx-body">There is always a next prime - this procedure is designed to never stop and never produce a final output. Violates <strong>finiteness</strong>.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">"Divide the budget fairly among the clubs."</div>
<div class="wx-body">"Fairly" has no fixed meaning - equal shares? by need? by past attendance? Every reader could execute a different procedure. Violates <strong>definiteness</strong>.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The pattern to notice</div>
<div class="wx-body">A procedure with no stopping condition breaks finiteness; a procedure with an undefined word ("fairly," "look around") breaks definiteness - the two most common ways a "sounds reasonable" instruction fails.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>Two failures, two different properties - one has no way to stop, the other has no fixed meaning.</div>
<div class="takeaway"><span class="k">Key takeaway</span>When a procedure "sounds reasonable" but isn't an algorithm, it's almost always missing a stopping rule or a fixed meaning for one of its words.</div>

---

<!-- SLOT N-2: Worked example, idea + pseudocode -->

# `FIND_ROOM`: Idea and Pseudocode

<div class="thread">Same five checks. Now on the actual case study, not a clean textbook example.</div>

<div class="two-col">
<div>

```text
FIND_ROOM(directory, target):
    for i = 0 to length(directory) - 1:
        if directory[i].room == target:
            return directory[i].location
    return NOT_FOUND
```

</div>
<div>

- **Input:** a well-defined array `directory` of room records, and a well-defined string `target`.
- **Output:** either a well-defined location, or the sentinel value `NOT_FOUND`.
- **Definiteness:** `==` on `target` is a precise, single-meaning comparison.
- **Finiteness:** loop bound `length(directory) - 1` is fixed before the loop starts.

</div>
</div>

---

<!-- NEW: dense worked example, FIND_ROOM against all five properties -->
<!-- _class: dense -->

<div class="eyebrow">CampusNav · worked example 1 of 2</div>

# `FIND_ROOM`: All Five Properties, Checked

<div class="wx-top">
<div class="lead">Everything from the last slide, verified against the full rulebook.</div>
<div class="goalbox"><span class="k">Goal</span>Show `FIND_ROOM` satisfies every one of the five required properties.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Finiteness</div>
<div class="wx-body">Loop bound `length(directory) - 1` is a fixed, known number before the loop even starts - no proof needed like GCD's, just a stated bound.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Definiteness</div>
<div class="wx-body">`==` on `target` is a precise, single-meaning comparison - no "look around" left anywhere.</div>
</div>
<div class="wx-step c3">
<div class="wx-num">3</div>
<div class="wx-title">Input &amp; Output</div>
<div class="wx-body">Input: well-defined array `directory` and string `target`. Output: a location, or the explicit sentinel `NOT_FOUND` - defining the "not found" case is part of a well-defined output, not an afterthought.</div>
</div>
<div class="wx-step c4">
<div class="wx-num">4</div>
<div class="wx-title">Effectiveness</div>
<div class="wx-body">Array indexing and string equality are basic, executable operations any of us could carry out by hand.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>All five properties check out - this is what "look around until you find it" had to become before it counted as an algorithm at all.</div>
<div class="takeaway"><span class="k">Key takeaway</span>A precise loop bound plus one precise comparison operator turned a vague sentence into a provable algorithm.</div>

---

<!-- NEW: dense worked example, designing the sentinel value. Folds the old "Check Yourself: The Sentinel Value" pair. -->
<!-- _class: dense -->

<div class="eyebrow">CampusNav · worked example 2 of 2</div>

# Designing the "Not Found" Case

<div class="wx-top">
<div class="lead">A well-defined output has to cover every input - including the one with no "real" answer.</div>
<div class="goalbox"><span class="k">Goal</span>Show why the sentinel value is part of the spec, not an afterthought.</div>
</div>

<div class="wx-steps">
<div class="wx-step">
<div class="wx-num">1</div>
<div class="wx-title">Why `NOT_FOUND` counts</div>
<div class="wx-body">Output only counts as well-defined if every valid input has a specified result, including "the room isn't in the directory." A version that silently did nothing, or crashed, would leave output undefined for that input.</div>
</div>
<div class="wx-step c2">
<div class="wx-num">2</div>
<div class="wx-title">Alternative: return -1</div>
<div class="wx-body">A rewritten `FIND_ROOM` returning `-1` instead of `NOT_FOUND` is the <strong>same algorithm</strong> - both are a single, well-defined sentinel value for "not found."</div>
</div>
<div class="wx-step c4">
<div class="wx-num">&#9733;</div>
<div class="wx-title">The real risk</div>
<div class="wx-body">It would only become a problem if `-1` were also a valid room index somewhere else in the system - making the sentinel ambiguous with real data, a definiteness risk, not a difference in algorithm.</div>
</div>
</div>

<div class="conclusion"><span class="k">Conclusion</span>`NOT_FOUND` and `-1` are both valid designs for the same algorithm - the only real danger is a sentinel that could collide with real data.</div>
<div class="takeaway"><span class="k">Key takeaway</span>A well-defined output must cover every input, including the ones with no "real" answer.</div>

---

<!-- SLOT N-1: Common mistakes, merged into one slide -->

# Common Mistakes

- **Confusing "an algorithm" with "a program."** An algorithm is the language-independent idea - the steps themselves; a program is one specific implementation of it, in one specific language. `FIND_ROOM` above could be written in Python, Java, or C and still be the *same* algorithm.
- **Assuming any loop that eventually stops is automatically finite.** It's tempting because, in casual testing, the loop *did* stop. But finiteness requires a proof that covers every valid input - like GCD's "`b` strictly decreases and can't go below 0" argument - not just the one run you happened to try.
- **"It ran and gave the right answer, so it's correct."** Exactly the `MAX` bug above: one passing run proves nothing about the inputs you didn't try.

---

<!-- NEW: Key Words Today, session 3 -->

# Key Words Today

- **Flowchart:** a diagram form of an algorithm, using standardized shapes (start/end, process, decision) instead of text.
- **Trace:** running an algorithm by hand, step by step, on one specific input, to check what it actually does.
- **Algorithm vs. program:** the algorithm is the language-independent idea; a program is one specific implementation of it, in one specific language.
- **Loop bound:** the specific, checkable condition that guarantees a loop cannot run forever - what finiteness actually requires you to state, not assume.

<!-- notes: Read each term aloud. Say: "These four, plus the five properties, are this week's whole vocabulary." -->

---

# Precision Pays Off Beyond CampusNav, Too

<div class="thread">This isn't only about one app.</div>

Every later week in this course assumes you can write and read
pseudocode this precisely: complexity analysis (Week 3) needs a fixed
procedure to count steps on; recursion (Week 4) needs a precise base
case; every correctness proof after that starts from a procedure
precise enough to reason about in the first place. Skip this week, and
every one of those gets harder.

<div class="why">
The same five checks also show up outside this course, in the same
words - search "algorithm properties" or "is this a valid algorithm"
in any textbook or interview-prep guide.
</div>

---

<!-- SLOT N+1: Limits (Act 4 / CLOSE), becomes Week 3 slot 4 -->

# What This Week's Rulebook Cannot Do

<div class="limits">
We can now write CampusNav's "find room X" as a real algorithm and
check it against all five properties - precise input, precise output,
provably finite, unambiguous, every step executable. But suppose a
teammate proposes a completely different way to search the same
directory, and it <em>also</em> passes all five checks. We have no rigorous
way, yet, to say which precise algorithm is <em>better</em> - faster,
more scalable as the directory grows - only that both are legitimate
algorithms. "Precise" and "provably correct" are not the same claim
as "efficient."
</div>

---

<!-- SLOT N+2: Bridge -->

# Next Week

Week 2 leaves **comparing two precise, correct algorithms** unsolved.
**Week 3, Complexity Analysis**, addresses it: Big-O notation, so we
can say precisely which algorithm is better, not just that both
qualify as real algorithms.

---

<!-- NEW: "Where This Week Lives in CLRS" reference slide, immediately before Summary -->

# Where This Week Lives in CLRS

<div class="thread">This week's ideas, mapped to the textbook.</div>

| This week's topic | CLRS 4th ed |
|---|---|
| The five properties of an algorithm | Ch 1 |
| Pseudocode conventions (our house style vs. CLRS's) | §2.1-2.2 (style reference - INSERTION-SORT isn't taught until Week 5) |
| Euclid's GCD | §31.2 |

**If you want to go deeper:** §2.1's INSERTION-SORT is worth a first
read now for the notation alone; Chapter 31 (Number-Theoretic
Algorithms) covers what GCD is used for beyond this week, including
modular arithmetic and an early look at what becomes Week 9's fast
exponentiation.

---

<!-- SLOT N+3: Summary -->

# Summary

- Every real algorithm must satisfy **five properties**: finiteness, definiteness, input, output, effectiveness - fail one, and it's a suggestion, not an algorithm.
- Pseudocode and flowchart conventions let us write and *check* these properties precisely, instead of just describing intent.
- **Algorithm ≠ program:** the language-independent idea vs. one specific implementation of it.
- Finiteness needs a *proof* (like GCD's shrinking `b`), not just one successful run.
- **New: Week 2 Check** - a short graded exercise on the five properties, GCD, and `FIND_ROOM`, released now, due before Week 3 begins (see `materials/assignments/week02-check.html`).
- **Reading:** CLRS 4th ed, Ch 1; §2.1-2.2 (pseudocode style reference); §31.2 (Euclid's GCD) - no exercises due, but read before Week 3.
- **Prepare:** think of two different, both-correct ways you could search CampusNav's directory, and which one you *guess* is faster. Bring your reasoning to Week 3.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
