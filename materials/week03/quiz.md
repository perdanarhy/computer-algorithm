# Week 3 Self-Check Quiz - Complexity Analysis

Computer Algorithms (506994-002). This quiz is **ungraded**. It is
only to help you see what you remember. Answer alone, about 10
minutes. Check your answers at the end.

Name: _______________________

---

**1.** Big-O notation is best described as:

A. The exact number of milliseconds an algorithm takes to run
B. An asymptotic upper bound on how an algorithm's cost grows as input size grows
C. A guarantee that an algorithm is correct
D. A ranking of which programming language is fastest

**2.** For $f(n) = O(g(n))$ to hold, the formal definition requires:

A. $f(n) = g(n)$ for all $n$
B. $f(n) \le g(n)$ for every value of $n$, with no exceptions
C. Constants $c, n_0 > 0$ exist such that $0 \le f(n) \le c \cdot g(n)$ for all $n \ge n_0$
D. $f(n)$ must be a polynomial

**3.** Which statement about $n^2 + n\log n$ is correct?

A. It is $O(n \log n)$, since $n \log n$ is the newer term
B. It is $O(n^2)$, since $n^2$ is the fastest-growing term present
C. It is $O(n)$, since both terms are eventually small
D. It cannot be bounded by Big-O at all

**4.** Order these from slowest- to fastest-growing:
$n^2,\ \log n,\ n,\ 2^n$.

A. $2^n \prec n^2 \prec n \prec \log n$
B. $\log n \prec n \prec n^2 \prec 2^n$
C. $n \prec \log n \prec n^2 \prec 2^n$
D. $\log n \prec n^2 \prec n \prec 2^n$

**5.** An algorithm is $O(2^n)$. It runs comfortably at $n=10$. What
happens at $n=100$?

A. It also runs comfortably, just a bit slower
B. It becomes computationally infeasible - the number of steps vastly exceeds what any computer could execute
C. Big-O guarantees it stays proportional to $n=10$'s running time
D. Nothing changes, since Big-O ignores input size

**6.** True or False: if two algorithms both have running time
$O(n^2)$, they must take exactly the same amount of time on the same
input.

A. True
B. False

**7.** Space complexity measures:

A. How many lines of code an algorithm has
B. The extra memory an algorithm uses, as a function of input size $n$
C. How fast an algorithm compiles
D. The number of variables named in the pseudocode

**8. Short answer.** In your own words, explain why "my algorithm ran
in 2 seconds on my test input" is not the same claim as "my algorithm
is $O(n)$." Give a short, concrete reason.

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Answer Key -->
<!-- ============================================================ -->

## Answer Key

1. **B** - Big-O is an asymptotic upper bound on growth rate, not a
   measured running time.
2. **C** - the formal definition requires *some* constants $c, n_0 >
   0$ to exist satisfying $0 \le f(n) \le c \cdot g(n)$ for all $n \ge
   n_0$; it does not require $f(n) \le g(n)$ everywhere, nor equality.
3. **B** - the bound must come from the fastest-growing term present;
   $n^2$ dominates $n\log n$ for large $n$, so it cannot be dropped.
4. **B** - $\log n \prec n \prec n^2 \prec 2^n$, the standard
   growth-rate hierarchy order for these four.
5. **B** - exponential growth means a comfortable running time at
   small $n$ says nothing about larger $n$; $2^{100}$ is astronomically
   larger than $2^{10}$, not just "a bit more."
6. **B - False.** Both being $O(n^2)$ only bounds their *growth
   rate*; their constant factors, and therefore actual running times,
   can differ enormously even on the same input.
7. **B** - space complexity is extra memory used, as a function of
   $n$, not a code-style or compile-time measure.
8. Open-ended. Accept any answer that correctly identifies: a single
   timed run says nothing about how cost *grows* as $n$ increases -
   Big-O is a claim about the shape of the cost curve across all
   large enough $n$, not a report of one measured number. A strong
   answer may note the run's specific machine, input, and constant
   factors are also invisible in a Big-O claim.
