# Week 10 Self-Check Quiz - Greedy Algorithms

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** A greedy algorithm is best described as:

A. An algorithm that tries every possible combination and picks the best one
B. An algorithm that builds a solution one locally-best choice at a time, and never revisits that choice
C. Any algorithm that runs in polynomial time
D. An algorithm that always produces the optimal solution

**2.** For a greedy algorithm to be safe to use on a problem, that
problem generally needs:

A. Only optimal substructure
B. Only the greedy-choice property
C. Both the greedy-choice property and optimal substructure
D. Neither - greedy is always safe on any problem

**3.** In CampusNav's room-booking scheduler, why does the algorithm
sort requests by **end time** rather than start time or duration?

A. Because end time is the easiest field to compute
B. Because granting the request that frees the room soonest leaves the most room open for everything still to come
C. Because start time cannot be measured reliably
D. Because sorting by duration would take longer to code

**4.** In the exchange-argument proof for the room-booking scheduler,
what does the "swap" step actually show?

A. That greedy is always faster than brute force
B. That any optimal solution can have its first pick replaced by greedy's pick without losing any bookings
C. That optimal solutions don't exist for this problem
D. That the greedy algorithm never needs to sort its input

**5.** With denominations {1, 3, 4} and a target of 6, greedy
change-making (always take the largest denomination that still fits)
produces:

A. 3 + 3 = 2 tokens
B. 4 + 1 + 1 = 3 tokens
C. 1 + 1 + 1 + 3 = 4 tokens
D. It cannot make exact change for 6

**6.** What does the {1, 3, 4} / target-6 example actually prove?

A. Greedy never works for any change-making problem
B. Greedy always works as long as you sort the denominations first
C. "Greedy always finds the optimal solution" is false - one counterexample is enough to disprove a universal claim
D. Huffman coding is incorrect

**7.** Huffman coding's greedy rule is:

A. Always split the alphabet into two equal halves
B. Repeatedly merge the two least-frequent remaining symbols/nodes into one
C. Assign the shortest code to the most frequent symbol, with no merging step
D. Sort symbols alphabetically, then assign codes in that order

**8.** True or False: a greedy scheduler that is provably optimal at
maximizing the number of bookings granted is therefore also the
fairest possible way to allocate the room.

A. True
B. False

**9. Short answer.** In your own words, explain why having *optimal
substructure* is not, by itself, enough to guarantee a greedy
algorithm works - use the campus-points {1, 3, 4} example to support
your answer.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - a greedy algorithm builds a solution one locally-best
   choice at a time and never revisits that choice.
2. **C** - a problem needs *both* the greedy-choice property and
   optimal substructure before a greedy algorithm on it can be trusted.
3. **B** - finishing soonest leaves the most room open for whatever
   comes next; this is the intuition the exchange argument makes rigorous.
4. **B** - the swap step shows any optimal solution's first pick can
   be replaced by greedy's pick without decreasing the number of
   bookings, which is the core move of the exchange argument.
5. **B** - greedy takes 4, then 1, then 1: 4 + 1 + 1 = 3 tokens (the
   optimal answer, 3 + 3, uses only 2).
6. **C** - one counterexample is sufficient to disprove "greedy always
   finds the optimal solution"; it does not matter that greedy
   succeeds on other targets.
7. **B** - Huffman coding repeatedly merges the two least-frequent
   remaining symbols/nodes until one node remains.
8. **B - False.** Being provably optimal at one measurable goal
   (throughput) does not guarantee fairness across different kinds of
   requests - see the fairness sidebar: earliest-finish-time
   systematically favors short requests over long, complex ones.
9. Open-ended. Accept any answer that captures: optimal substructure
   only guarantees an optimal solution is built from optimal solutions
   to smaller pieces - it says nothing about whether the *locally*
   best-looking choice is part of one of those optimal solutions. The
   campus-points problem has optimal substructure (the optimal answer
   for 6 does contain the optimal answer for some smaller remainder)
   but not the greedy-choice property (greedily taking a 4 first is
   never part of the optimal 2-token answer for 6).
