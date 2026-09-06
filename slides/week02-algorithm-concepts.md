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

<!-- NEW: warm-up, placed right after the roadmap (slot 2) per course design -->

# Before We Start: Could a Computer Actually Run This?

<div class="thread">A quick warm-up. No jargon yet.</div>

Three instructions for finding room 703 in Building A:

- **A:** "Walk to Building A, take the stairs or elevator to floor 7, and go to room 703."
- **B:** "Look around until you find it."
- **C:** "Keep improving your guess about where it is until it feels right."

- Which of these could you hand to a computer - or to two different classmates - and expect the *exact same result*, every time?

<!--
notes: Give 30 seconds of silent thinking before asking. Take a show of hands per instruction.
Do not name "definiteness" or "effectiveness" yet - let students describe the problem in
their own words. Point out that B and C sound reasonable in conversation, which is exactly
the trap.
-->

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

<!-- NEW: session-1 close, previews the worksheet -->

# Coming Up: The Worksheet

<div class="thread">Next in this class: less listening, more doing.</div>

Later today, you and a partner will write CampusNav's "find room"
logic as real pseudocode and trace Euclid's GCD by hand (**Part A**),
then hunt for the exact broken property in three more deliberately bad
"algorithms" (**Part B**).

Keep a pen ready.

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

<div class="thread">This is the rulebook. Every algorithm this semester gets checked against all five (CLRS 4th ed, Ch 1).</div>

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

<!-- NEW: worked example in CLRS's own style, style reference only per SPINE.md (insertion sort content itself isn't taught until Week 5) -->

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

<!-- NEW: check-yourself pair on the two pseudocode styles -->

# Check Yourself: Two Styles, One Idea

1. `FIND_ROOM` (our house style) and `INSERTION-SORT` (CLRS style) use different indexing conventions. Does that make them different *algorithms* by definition, or just differently-notated ones?
2. Why does CLRS bother numbering every line, when our house style doesn't?

---

# Answers

1. **Different notation, not a different algorithm** - exactly the algorithm/program distinction from a few slides back, one level up: the same idea can be *written down* two ways, as long as each is precise.
2. Line numbers let a proof (e.g. a loop invariant argument) refer to an exact step - "true before line 5 executes" - without ambiguity. It's a tool for *writing about* the algorithm, not a requirement of the algorithm itself.

---

<!-- Flowchart conventions, split: shapes here, the two rules + cross-check next -->

# Flowchart Conventions

<div class="thread">Same rules, drawn instead of written.</div>

<div class="chip-row">
<div class="chip">Oval = Start / End</div>
<div class="chip">Rectangle = Process step</div>
<div class="chip">Diamond = Decision (yes/no branch)</div>
<div class="chip">Arrow = Flow of control</div>
</div>

- Exactly **one** Start oval, and every path must reach an **End** oval - draw one and you're checking finiteness visually.

---

<!-- NEW: continuation of Flowchart Conventions -->

# Flowchart Conventions, Continued

<div class="thread">The rest of the rules - and why they matter.</div>

- Every Diamond must have exactly two labeled exits (e.g. "yes" / "no") - an unlabeled or missing branch is a definiteness violation, drawn.
- Pseudocode and flowcharts describe the *same* algorithm two ways; if you can't convert one into the other, one of them is still vague.

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

# Worked Example: Euclid's GCD

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

<!-- Is GCD Finite?, split: the trace here, the proof reasoning next -->

# Is GCD Finite? Trace It First

<div class="thread">The property everyone assumes, and nobody checks.</div>

Trace `GCD(48, 18)`:

<div class="tracetable">
<div class="row"><div class="rowlabel">Start</div><div class="cell">a=48</div><div class="cell">b=18</div><div class="cell empty"></div></div>
<div class="row"><div class="rowlabel">Step 1</div><div class="cell">a=18</div><div class="cell">b=12</div><div class="cell hl">r=12</div></div>
<div class="row"><div class="rowlabel">Step 2</div><div class="cell">a=12</div><div class="cell">b=6</div><div class="cell hl">r=6</div></div>
<div class="row"><div class="rowlabel">Step 3</div><div class="cell">a=6</div><div class="cell hl2">b=0</div><div class="cell hl">r=0</div></div>
</div>

`b` hit 0, so `while b != 0` is false and the loop ends.

---

<!-- NEW: continuation - the actual proof, not just the one trace -->

# Is GCD Finite? Prove It, Don't Assume It

<div class="thread">One successful trace is not a proof - here's the actual argument.</div>

*Why* must the loop above always end? `r = a mod b` is always
strictly smaller than `b` and can't go below 0, so `b` strictly
decreases toward 0 - guaranteeing termination **for every valid pair
`(a, b)`**, not just this one. That argument, not the one successful
run, is what finiteness requires.

---

<!-- NEW: a second, slower trace, from CLRS's own worst-case family for Euclid's algorithm -->

# Another GCD Trace: A Slower Case

<div class="thread">Not every pair shrinks this fast - let's find one that doesn't.</div>

Trace `GCD(89, 55)` - consecutive Fibonacci numbers:

<div class="tracetable">
<div class="row"><div class="rowlabel">Start</div><div class="cell">a=89</div><div class="cell">b=55</div><div class="cell empty"></div></div>
<div class="row"><div class="rowlabel">Step 1</div><div class="cell">a=55</div><div class="cell">b=34</div><div class="cell hl">r=34</div></div>
<div class="row"><div class="rowlabel">Step 2</div><div class="cell">a=34</div><div class="cell">b=21</div><div class="cell hl">r=21</div></div>
<div class="row"><div class="rowlabel">Step 3</div><div class="cell">a=21</div><div class="cell">b=13</div><div class="cell hl">r=13</div></div>
<div class="row"><div class="rowlabel">Step 4</div><div class="cell">a=13</div><div class="cell">b=8</div><div class="cell hl">r=8</div></div>
<div class="row"><div class="rowlabel">Step 5</div><div class="cell">a=8</div><div class="cell hl2">b=5</div><div class="cell hl">r=5</div></div>
</div>

Five steps and still shrinking, versus three for `GCD(48, 18)` -
already noticeably slower, from similarly-sized inputs.

---

<!-- NEW: what the slower trace tells us -->

# What That Slower Trace Tells Us

<div class="thread">Same finiteness proof still holds - it just takes longer to cash in.</div>

Consecutive Fibonacci numbers are the worst case for Euclid's
algorithm: every step's remainder is as large as it can possibly be,
so the number of steps grows, but only slowly, with the size of the
input. The strictly-decreasing-`b` argument from the last slide
covers this case too - finiteness was never in doubt, only the exact
step count. Precisely bounding that step count is a Big-O question,
which is next week's entire subject.

---

<!-- One more trap: a procedure that looks like it satisfies all five properties on a casual read, but is quietly wrong -->

# One More Trap: "It Ran, So It Must Be Right"

<div class="thread">GCD's proof was earned. Most code never gets that scrutiny - watch what slips through.</div>

A student submits this attempt at "find the maximum value in a list":

```text
MAX(A):
    m = A[0]
    for i = 1 to length(A):
        if A[i] > m:
            m = A[i]
    return m
```

It's never once produced a visibly wrong answer for the student. Find
the bug. *(Hint: what index does `i` reach on the last loop pass?)*

<!-- notes: Let students discuss in pairs for 1 minute before revealing. -->

---

# Where `MAX` Breaks

- Array indices run `0` to `length(A) - 1`.
- The loop `i = 1 to length(A)` lets `i` reach index `length(A)`, which is **out of bounds** - one past the last real element - on *every* run, not just some.
- Depending on the language, that read either crashes immediately, or
  silently returns whatever value happens to sit in adjacent memory -
  which can easily be small enough that `A[i] > m` is just false, so
  the final answer still comes out right. The bug fires every time;
  whether it's *visible* is down to luck, not to which inputs got tested.
- The fix: loop should run `i = 1 to length(A) - 1`.

This procedure *looks* definite and effective on a quick read - every
step is precisely stated, nothing seems to rely on a "feeling." The
bug is in whether the stated loop bound is the *correct* one, not
whether it's precisely stated. "I tested it and it worked" is never
proof of that - a silent, harmless-looking garbage read is still a bug.

---

<!-- NEW: check-yourself pair on "tested vs. proven" finiteness, reusing MAX and GCD -->

# Check Yourself: Tested vs. Proven

1. A classmate claims: "My function is finite because it finished every time I ran it in testing." Is that a valid finiteness proof? Why or why not?
2. `MAX`'s bug fires on *every* run, yet it never produced a visibly wrong answer for its author. What does that tell you about "no bugs showed up in testing" as evidence of correctness?

---

# Answers

1. **No.** Finiteness needs an argument that holds for *every* valid input (like GCD's strictly-decreasing `b`), not a report that some finite set of test runs happened to stop.
2. It tells you almost nothing on its own - a bug can fire on every run while still producing a value that happens to look correct, purely by luck of what garbage sat in memory. Testing can show the *presence* of a bug, but passing tests never proves its *absence*.

---

<!-- NEW: broken-algorithm activity, quick in-class try before the worksheet -->

# Activity: Which Property Breaks?

<div class="thread">Two to try together. Three more are waiting on the worksheet.</div>

- **"While true: print the next prime number."**
- **"Divide the budget fairly among the clubs."**

For each one: could you actually run this, or hand it to someone else
and get one guaranteed behavior? If not, which of the five properties
does it fail?

<!-- notes: Give 30 seconds of pair discussion before revealing the next slide. -->

---

# Activity: Answers

- **"While true: print the next prime number."** - violates **finiteness**. There is always a next prime; this procedure is designed to never stop and never produce a final output.
- **"Divide the budget fairly among the clubs."** - violates **definiteness**. "Fairly" has no fixed meaning here - equal shares? by need? by past attendance? - every reader could execute a different procedure and each would claim to have followed the instruction.

Three more broken "algorithms," one for each remaining property, are
on **Worksheet Part B**.

---

<!-- SLOT N-2: Worked example -->

# CampusNav: "Find Room 703 in Building A," Written as a Real Algorithm

<div class="thread">Same five checks. Now on the actual case study, not a clean textbook example.</div>

```text
FIND_ROOM(directory, target):
    for i = 0 to length(directory) - 1:
        if directory[i].room == target:
            return directory[i].location
    return NOT_FOUND
```

- **Input:** a well-defined array `directory` of room records, and a well-defined string `target`.
- **Output:** either a well-defined location, or the sentinel value `NOT_FOUND` - defining the "not found" case is *part of* a well-defined output, not an afterthought.
- **Definiteness:** `==` on `target` is a precise, single-meaning comparison - no "look around" left anywhere.

---

# CampusNav: The Last Two Checks

<div class="thread">Same `FIND_ROOM`. Effectiveness and finiteness, finished.</div>

- **Effectiveness:** array indexing and string equality are basic, executable operations.
- **Finiteness:** the loop bound `length(directory) - 1` is a fixed, known number before the loop even starts - finiteness here doesn't even need a proof like GCD's, just a stated bound.

This is what "look around until you find it" had to become before it
counted as an algorithm at all.

---

<!-- NEW: compact recap of FIND_ROOM against all five properties, at a glance -->

# `FIND_ROOM`: All Five, At a Glance

<div class="thread">Everything from the last two slides, in one table.</div>

| Property | Where it's satisfied |
|---|---|
| Finiteness | Loop bound `length(directory) - 1` is fixed before the loop starts |
| Definiteness | `==` on `target` is a precise, single-meaning comparison |
| Input | Well-defined array `directory` and string `target` |
| Output | A location, or the explicit sentinel `NOT_FOUND` |
| Effectiveness | Array indexing and string equality are basic operations |

---

<!-- NEW: check-yourself pair on well-defined output, reusing FIND_ROOM's sentinel -->

# Check Yourself: The Sentinel Value

1. Why does `FIND_ROOM` returning `NOT_FOUND` count as part of a *well-defined* output, rather than a missing case the spec forgot?
2. Suppose a rewritten `FIND_ROOM` instead returned `-1` when the room isn't found. Same algorithm, or does that change which property is at stake?

---

# Answers

1. Output only counts as well-defined if *every* valid input has a specified result - including the input "the room isn't in the directory." A version that silently did nothing, or crashed, on that input would leave output undefined for some inputs.
2. **Same algorithm, same property satisfied** - `-1` and `NOT_FOUND` are both a single, well-defined sentinel value for "not found." It would only become a *problem* if `-1` were also a valid room index somewhere else in the system, making the sentinel ambiguous with real data - a definiteness risk, not a difference in algorithm.

---

<!-- SLOT N-1: Common mistakes, split into two -->

# Common Mistakes (1)

- **Confusing "an algorithm" with "a program."** An algorithm is the language-independent idea - the steps themselves; a program is one specific implementation of it, in one specific language. `FIND_ROOM` above could be written in Python, Java, or C and still be the *same* algorithm.
- **Assuming any loop that eventually stops is automatically finite.** It's tempting because, in casual testing, the loop *did* stop. But finiteness requires a proof that covers every valid input - like GCD's "`b` strictly decreases and can't go below 0" argument - not just the one run you happened to try. "Keep improving the guess until it feels right" might stop on your machine today and loop forever on a harder input tomorrow; you have no way to know without a bound.

---

<!-- NEW: continuation of Common Mistakes -->

# Common Mistakes (2)

- **"It ran and gave the right answer, so it's correct."** Exactly the `MAX` bug above: one passing run proves nothing about the inputs you didn't try.

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. Which property does "keep improving the guess until it feels right" violate, and why - pick more than one if it applies?
2. In one sentence, why does GCD's finiteness need more than "it stopped when I traced it"?
3. `FIND_ROOM` and a Python re-implementation of it: same algorithm, or different algorithms? Why?
4. Give one reason `MAX` might never have produced a visibly wrong answer, even though its bug fires on every run.

---

# Answers

1. **Effectiveness**, because "feels right" is not a basic, mechanically executable step - and often **finiteness** too, because there's no stated bound guaranteeing it ever stops.
2. One successful trace only shows it stopped on *that* input; finiteness requires an argument (like `b` strictly decreasing and bounded below by 0) that holds for *every* valid input, not just the one tried.
3. **Same algorithm.** The steps, their order, and their logic are identical - only the language-specific syntax differs. The algorithm is the idea; the Python code is one program that implements it.
4. The out-of-bounds read at index `length(A)` happens every time, but the garbage value it returns might just happen to be small enough that `A[i] > m` evaluates false - so the final answer comes out right by luck, not because the bug didn't fire.

---

<!-- NEW: check-yourself pair on flowchart diamond labeling -->

# Check Yourself: Reading the Flowchart

1. In Euclid's flowchart a few slides back, what would go wrong - and which property would it violate - if the `b != 0?` diamond had only one labeled exit instead of two?
2. Could you redraw `FIND_ROOM` as a flowchart using only the four shapes from Flowchart Conventions? What would the one Diamond in your drawing test?

---

# Answers

1. It would violate **definiteness**: whoever reads the flowchart would not know what to do in the unlabeled case, so two readers could build two different behaviors from the same diagram - the drawn equivalent of "look around until you find it."
2. Yes - one Diamond testing `directory[i].room == target`, one Rectangle for advancing `i`, one Start oval, and two End ovals (found / `NOT_FOUND`). The loop itself is drawn as an arrow back up to the Diamond.

---

<!-- NEW: Try-It hand-off, session 2 -->

# Now: The Worksheet

<div class="thread">Time to practice. Check real (and broken) algorithms against the five properties.</div>

Work with your neighbor. Open the **[Week 2
Worksheet](materials/week02/worksheet.html)**. Part A: write
CampusNav's `FIND_ROOM` in your own pseudocode and trace Euclid's GCD
on a new pair of numbers. Part B: find the exact broken property in
three more deliberately bad "algorithms."

**~25-30 minutes total.** Raise your hand if you get stuck.

<!--
notes: Hand out or project the worksheet. Walk the room while pairs work.
After time is up, ask 2 pairs to share which property each broken example violated.
-->

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

<!-- NEW: quiz hand-off -->

# Now: Quick Self-Check Quiz

<div class="thread">Ungraded. Just for you, to see what stuck.</div>

Open the **[Week 2 Quiz](materials/week02/quiz.html)**. Answer on your
own, about 10 minutes. Check your own answers at the end. Ask if
anything surprises you.

<!--
notes: Distribute or project the quiz. After about 10 minutes, reveal the
answer key and discuss as a group any question most of the class missed.
-->

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
- **Reading:** CLRS 4th ed, Ch 1; §2.1-2.2 (pseudocode style reference); §31.2 (Euclid's GCD) - no exercises due, but read before Week 3.
- **Prepare:** think of two different, both-correct ways you could search CampusNav's directory, and which one you *guess* is faster. Bring your reasoning to Week 3.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
