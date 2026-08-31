# Week 9 Worksheet - Answer Key (Instructor Only)

Computer Algorithms (506994-002). Do not hand out this page - it is
never built into the deployed course site.

## Part A

- **A1.** Values in order: $B[3]=1, B[2]=4, B[1]=-1, B[0]=3$. Running
  sums: $1,\ 5,\ 4,\ 7$. Best-left sum = **7**, achieved starting at
  **index 0** (the running sum keeps climbing after a dip, and the max
  over the sequence is the last value, 7).
- **A2.** Values in order: $B[4]=-5, B[5]=9, B[6]=2, B[7]=-6$. Running
  sums: $-5,\ 4,\ 6,\ 0$. Best-right sum = **6**, achieved ending at
  **index 6** (the running sum peaks at 6 after adding index 6, then
  drops when index 7 is added).
- **A3.** Crossing sum $= 7 + 6 = \mathbf{13}$, spanning indices
  **[0, 6]**.
- **A4.** Left half `[3,-1,4,1]`: best subarray by inspection is the
  whole thing, sum $= 3-1+4+1 = 7$. Right half `[-5,9,2,-6]`: best
  subarray by inspection is `[9,2]`, sum $= 11$. Comparing left-only
  (7), right-only (11), and crossing (13): **crossing wins**. Overall
  maximum sum for all of `B` = **13**, range **[0, 6]** (the subarray
  `[3,-1,4,1,-5,9,2]`).
- **A5.** Accept any answer capturing: each of the two scans (best-left,
  best-right) visits every element in its half exactly once, doing a
  constant amount of work per element, so together they touch every
  element of the array once - $\Theta(n)$ total - even though they
  correctly find the single best crossing run out of the many possible
  (start, end) pairs, because tracking a running sum implicitly checks
  all of them without enumerating each pair separately.

## Part B

- **B1.** $a=2,\ b=2,\ f(n)=n$. Watershed $= n^{\log_2 2} = n^1 = n$.
  $f(n) = \Theta(n)$ matches the watershed exactly → **Case 2**.
  $T(n) = \Theta(n\log n)$.
- **B2.** $a=8,\ b=2,\ f(n)=n^2$. Watershed $= n^{\log_2 8} = n^3$.
  $f(n) = n^2 = O(n^{3-1})$, polynomially slower than the watershed →
  **Case 1**. $T(n) = \Theta(n^3)$.
- **B3.** $a=3,\ b=4,\ f(n)=n\log n$. Watershed $= n^{\log_4 3} \approx
  n^{0.7925}$. $f(n) = n\log n$ grows polynomially faster than the
  watershed (for any small $\varepsilon > 0$, $n\log n$ eventually
  dominates $n^{0.7925+\varepsilon}$, since the extra $\log n$ factor
  keeps growing) → candidate **Case 3**. Regularity check: $a\,f(n/b) =
  3\cdot \frac{n}{4}\log\frac{n}{4} \approx \frac{3}{4} n\log n \le c\,
  n\log n$ for $c = 3/4 < 1$ and large $n$ - holds. So **Case 3**
  applies: $T(n) = \Theta(f(n)) = \Theta(n\log n)$.
- **B4.** Accept any answer capturing: the Master theorem gives a
  direct classification from $a$, $b$, and $f(n)$ in a few lines,
  instead of drawing out every level of the recursion tree and summing
  the cost per level. You still need to trace the tree by hand whenever
  the recurrence doesn't fit the $T(n)=aT(n/b)+f(n)$ shape at all, or
  when $f(n)$ falls in the gap between two cases, or a Case-3
  regularity check fails.
