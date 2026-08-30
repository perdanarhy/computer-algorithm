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
Ridho Hendra, Ph.D · Dept. of Intelligent Computing · Mon [1-3] · 성파 703
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

Three instructions for finding room 성파703:

- **A:** "Walk to building 성파, take the stairs or elevator to floor 7, and go to room 703."
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

<!-- SLOT 4: The pain (Act 1 / MOTIVATE), zero jargon -->

# Two Developers, One Instruction, Two Different Apps

<div class="pain">

CampusNav's team writes down "find room X" as a spec: "Look around
until you find it, and ask someone if you're stuck." Both developers
say, honestly, that they implemented the spec - and ship completely
different builds for the same instruction.

</div>

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

<!-- _class: section -->

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

<!-- _class: section -->

# End of Session 1
<div class="driving-q">Short break. Next: where did this rulebook come from?</div>

---

<!-- SLOT 8: Origin -->

# Precision Is Not New

<div class="thread">You just felt the mess. Now: who fixed it, and how long ago?</div>

- **Euclid's algorithm** for the greatest common divisor (~300 BCE) is the oldest algorithm still taught today - a precise, step-by-step procedure, written down long before "computer" meant a machine.
- In 1936, **Alan Turing** and **Alonzo Church**, working independently, formalized exactly what "a step-by-step procedure a machine can follow" even means - the moment "algorithm" stopped being an informal word.
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

<div class="thread">This is the rulebook. Every algorithm this semester gets checked against all five.</div>

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

# Flowchart Conventions

<div class="thread">Same rules, drawn instead of written.</div>

<div class="chip-row">
<div class="chip">Oval = Start / End</div>
<div class="chip">Rectangle = Process step</div>
<div class="chip">Diamond = Decision (yes/no branch)</div>
<div class="chip">Arrow = Flow of control</div>
</div>

- Exactly **one** Start oval, and every path must reach an **End** oval - draw one and you're checking finiteness visually.
- Every Diamond must have exactly two labeled exits (e.g. "yes" / "no") - an unlabeled or missing branch is a definiteness violation, drawn.
- Pseudocode and flowcharts describe the *same* algorithm two ways; if you can't convert one into the other, one of them is still vague.

---

# Worked Example: Euclid's GCD

<div class="thread">A clean, classic case before we return to CampusNav's messier one.</div>

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

# Is GCD Finite? Prove It, Don't Assume It

<div class="thread">The property everyone assumes, and nobody checks.</div>

Trace `GCD(48, 18)`:

<div class="tracetable">
<div class="row"><div class="rowlabel">Start</div><div class="cell">a=48</div><div class="cell">b=18</div><div class="cell empty"></div></div>
<div class="row"><div class="rowlabel">Step 1</div><div class="cell">a=18</div><div class="cell">b=12</div><div class="cell hl">r=12</div></div>
<div class="row"><div class="rowlabel">Step 2</div><div class="cell">a=12</div><div class="cell">b=6</div><div class="cell hl">r=6</div></div>
<div class="row"><div class="rowlabel">Step 3</div><div class="cell">a=6</div><div class="cell hl2">b=0</div><div class="cell hl">r=0</div></div>
</div>

`b` hit 0, so `while b != 0` is false and the loop ends. But *why*
must this always happen? `r = a mod b` is always strictly smaller than
`b` and can't go below 0, so `b` strictly decreases toward 0 -
guaranteeing termination **for every valid pair `(a, b)`**, not just
this one. That argument, not the one successful run, is what
finiteness requires.

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

# CampusNav: "Find Room 성파703," Written as a Real Algorithm

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

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Confusing "an algorithm" with "a program."** An algorithm is the language-independent idea - the steps themselves; a program is one specific implementation of it, in one specific language. `FIND_ROOM` above could be written in Python, Java, or C and still be the *same* algorithm.
- **Assuming any loop that eventually stops is automatically finite.** It's tempting because, in casual testing, the loop *did* stop. But finiteness requires a proof that covers every valid input - like GCD's "`b` strictly decreases and can't go below 0" argument - not just the one run you happened to try. "Keep improving the guess until it feels right" might stop on your machine today and loop forever on a harder input tomorrow; you have no way to know without a bound.
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

<!-- _class: section -->

# End of Session 2
<div class="driving-q">Short break. Next: what this rulebook still can't tell us.</div>

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

<!-- SLOT N+3: Summary -->

# Summary

- Every real algorithm must satisfy **five properties**: finiteness, definiteness, input, output, effectiveness - fail one, and it's a suggestion, not an algorithm.
- Pseudocode and flowchart conventions let us write and *check* these properties precisely, instead of just describing intent.
- **Algorithm ≠ program:** the language-independent idea vs. one specific implementation of it.
- Finiteness needs a *proof* (like GCD's shrinking `b`), not just one successful run.
- **Reading:** CLRS, Chapter 2 (skim) - no exercises due, but read before Week 3.
- **Prepare:** think of two different, both-correct ways you could search CampusNav's directory, and which one you *guess* is faster. Bring your reasoning to Week 3.

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You
