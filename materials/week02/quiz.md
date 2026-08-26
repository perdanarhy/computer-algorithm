# Week 2 Self-Check Quiz - Algorithm Concepts

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** Which of these is **not** one of the five required properties
of an algorithm?

A. Finiteness
B. Definiteness
C. Efficiency
D. Effectiveness

**2.** "While true: print the next prime number." This fails to be a
real algorithm because it violates:

A. Definiteness
B. Finiteness
C. Input
D. Effectiveness

**3.** "Divide the budget fairly among the clubs." This instruction is
most clearly a violation of:

A. Finiteness - it never stops
B. Definiteness - "fairly" has no single fixed meaning
C. Effectiveness - division isn't a basic operation
D. Output - there is no output at all

**4.** A loop's body updates a value `b` such that `b` is always
strictly smaller than it was before, and can never go below 0. What
does this argument prove?

A. That the algorithm is efficient
B. That the algorithm is definite
C. That the loop is finite - it must terminate within a bounded number of steps
D. That the algorithm has well-defined output

**5.** A student says: "My loop stopped every time I tested it, so
it's finite." Is this a valid proof of finiteness?

A. Yes - repeated successful runs are proof
B. No - finiteness requires a guarantee (a bound, or a shrinking-and-bounded argument) that holds for every valid input, not just the ones tested
C. Yes, but only if tested at least 10 times
D. No such thing as proving finiteness exists

**6.** `FIND_ROOM` written in Python and the same `FIND_ROOM` written
in Java, with identical steps and logic, are:

A. Two different algorithms, because the languages differ
B. The same algorithm, implemented as two different programs
C. Neither an algorithm nor a program
D. Only a program if written in Python

**7.** A flowchart's decision (diamond) shape should have:

A. Exactly one exit arrow, regardless of the answer
B. No exit arrows - decisions are dead ends
C. Exactly two labeled exit arrows (e.g. "yes"/"no")
D. As many exit arrows as the author feels like drawing

**8. Short answer.** Pick one of the five properties (finiteness,
definiteness, input, output, effectiveness) and, in your own words,
describe an everyday instruction (not from class) that violates it.
Explain why it violates that specific property.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **C** - efficiency is not one of the five required properties; it
   is a separate concern, formalized starting Week 3.
2. **B** - there is always a next prime, so this procedure is
   designed to never stop and never produce a final output.
3. **B** - "fairly" has no single fixed meaning; different readers
   would execute different procedures and each could claim to have
   followed the instruction.
4. **C** - a value that strictly decreases and is bounded below
   cannot decrease forever, which is exactly the argument that proves
   a loop must terminate.
5. **B** - testing shows the loop stopped on the inputs tried; it
   says nothing about inputs that weren't tried. Finiteness needs a
   bound or a shrinking-and-bounded argument that covers every valid
   input.
6. **B** - the algorithm is the language-independent idea; the
   program is one specific implementation of it. Same steps, same
   logic, different syntax, is the same algorithm.
7. **C** - a decision needs exactly two labeled exits so that every
   possible outcome of the check leads somewhere definite.
8. Open-ended. Accept any answer that names a real property correctly
   and pairs it with a genuinely matching, non-class example, in the
   student's own words.
