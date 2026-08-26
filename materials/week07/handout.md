# Week 7 Handout - Searching Algorithms

Computer Algorithms (506994-002). Keep this handout. It has the full
glossary, the binary-search correctness proof spelled out in detail,
the classic off-by-one pitfalls explained, a fully worked midterm
practice set covering Weeks 1-7, and optional reading.

---

## Part 1: Glossary (all key terms, in plain words)

| Term | Plain definition |
|---|---|
| **Search** | Given a target value and a collection, decide whether it's present and, if so, where. |
| **Linear search** | Check items one at a time, in order, until found or exhausted. Cost grows proportionally with $n$: O(n). |
| **Binary search** | Repeatedly check the middle of the remaining range and discard the half that can't contain the target. Requires sorted input. Cost: O(log n). |
| **Precondition** | Something that must be true of the *input* for an algorithm to be correct - not a performance nicety, a hard requirement. |
| **`lo`, `hi`, `mid`** | The three index pointers binary search uses: `lo`/`hi` bound the current search range, `mid` is its midpoint. |
| **Loop invariant** | A statement true before, during, and after every pass of a loop - the tool used to *prove* an algorithm correct on every input, not just observed examples. |
| **Initialization / Maintenance / Termination** | The three parts of a loop-invariant proof: true at the start, stays true across every iteration, and tells you something useful when the loop ends. |
| **Off-by-one error** | A bug caused by an index boundary being one position too high or too low - often invisible until a specific edge-case input triggers it. |
| **Recurrence** | An equation defining a recursive algorithm's cost in terms of smaller instances of itself (Week 4). |
| **Growth-rate ordering** | Ranking functions by how fast they grow as $n \to \infty$ (Week 3) - e.g. $\log n < n < n\log n < n^2 < 2^n < n!$. |

---

## Part 2: The Loop-Invariant Proof, Spelled Out

This is the same pseudocode from the slides, with every step of the
proof written out in full prose.

```text
BINARY-SEARCH(A, target):
    lo = 0
    hi = length(A) - 1
    while lo <= hi:
        mid = floor((lo + hi) / 2)
        if A[mid] == target:
            return mid
        elif A[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return NOT-FOUND
```

**Claim:** if `A` is sorted (ascending), `BINARY-SEARCH(A, target)`
returns the index of `target` whenever it is present in `A`, and
returns `NOT-FOUND` whenever it is not.

**Loop invariant:** *if `target` is present anywhere in `A`, then it
is present within the subarray `A[lo..hi]`.*

### Initialization

Before the loop's first iteration, `lo = 0` and `hi = length(A) - 1`,
so `A[lo..hi]` is `A[0..length(A)-1]` - the entire array. If `target`
is present in `A` at all, it is trivially present somewhere within
the entire array. The invariant holds before the first iteration.

### Maintenance

Assume the invariant holds at the start of some iteration: `target`,
if present, lies within `A[lo..hi]`. Since the loop's `while lo <= hi`
condition held, `lo <= hi`, so `mid = floor((lo+hi)/2)` is a valid
index with `lo <= mid <= hi`. There are three cases:

1. **`A[mid] == target`.** The algorithm returns `mid` immediately.
   This is correct, because `A[mid]` literally *is* the target - no
   further invariant maintenance is needed, the loop has already
   produced the right answer.
2. **`A[mid] < target`.** Because `A` is sorted in ascending order,
   every index `i <= mid` satisfies `A[i] <= A[mid] < target`. So
   `target` cannot be located at any index `<= mid` - if it is
   present at all, it must be in `A[mid+1..hi]`. The code sets
   `lo = mid + 1`, so the new range `A[lo..hi]` is exactly
   `A[mid+1..hi]`, and the invariant is preserved for the next
   iteration.
3. **`A[mid] > target`.** Symmetric to case 2: every index `i >= mid`
   satisfies `A[i] >= A[mid] > target`, so `target`, if present, must
   be in `A[lo..mid-1]`. The code sets `hi = mid - 1`, matching this
   exactly, and the invariant is preserved.

In all three cases, if `target` was in `A[lo..hi]` at the start of the
iteration, it is in the (possibly updated) `A[lo..hi]` at the start of
the next one.

### Termination

Two things need proving here: that the loop *does* terminate, and
that when it does, the answer it gives is correct.

- **The loop terminates.** Each iteration either returns immediately
  (case 1 above), or replaces `[lo, hi]` with `[lo, mid-1]` or
  `[mid+1, hi]`. Both of those are strictly smaller than `[lo, hi]`,
  because `mid` is strictly between `lo - 1` and `hi + 1` (in fact
  `lo <= mid <= hi`), so `mid - 1 < hi` and `mid + 1 > lo`. Since the
  range's size roughly halves every iteration and starts finite, the
  loop cannot run forever without either returning or reaching the
  state `lo > hi`.
- **When the loop exits via `lo > hi` (not a `return` inside the
  loop):** the range `A[lo..hi]` is now empty. By the invariant, if
  `target` were present anywhere in `A`, it would have to be present
  within `A[lo..hi]` - but that range is empty, a contradiction. So
  `target` is not present in `A`, and the final `return NOT-FOUND` is
  correct.

Both possible exits from the loop - the early `return mid` and the
final `return NOT-FOUND` - are correct. **Binary search is provably
correct**, under the assumption that `A` is sorted. ∎

---

## Part 3: Off-by-One Pitfalls, Explained

### Pitfall 1 - mixing bound conventions

There are two internally-consistent ways to represent the search
range:

| Convention | `hi` starts at | `hi` after "too high" | Loop condition |
|---|---|---|---|
| **Closed** `[lo, hi]` | `length(A) - 1` | `hi = mid - 1` | `while lo <= hi` |
| **Half-open** `[lo, hi)` | `length(A)` | `hi = mid` | `while lo < hi` |

Either convention, used *consistently*, is correct. The bug appears
when code mixes them - most commonly, initializing `hi = length(A)`
(as if half-open) but keeping the closed convention's `hi = mid - 1`
update and `while lo <= hi` condition. Concretely, on an array of
length 4, searching for a target larger than every element:

```text
lo=0, hi=4, mid=2   A[2] < target  ->  lo = 3
lo=3, hi=4, mid=3   A[3] < target  ->  lo = 4
lo=4, hi=4: loop condition (lo <= hi) is still TRUE
mid = 4  ->  A[4] is read OUT OF BOUNDS (valid indices are 0..3)
```

**Fix:** pick one convention and use it everywhere. This handout and
the slides use the closed convention throughout: `hi = length(A) - 1`,
`hi = mid - 1`, `while lo <= hi`.

### Pitfall 2 - `lo = mid` instead of `lo = mid + 1`

On the "target is greater" branch, the new lower bound **must** be
`mid + 1`, not `mid`. Suppose `lo = 4`, `hi = 5`; then
`mid = floor((4+5)/2) = 4`, which equals `lo`. If `A[mid] < target`
and the (buggy) code sets `lo = mid`:

```text
lo=4, hi=5, mid=4   A[4] < target  ->  lo = mid = 4   (BUG: unchanged)
lo=4, hi=5, mid=4   A[4] < target  ->  lo = mid = 4   (identical state)
... forever ...
```

`lo` never advances, `hi` never changes, and the loop runs forever.
This bug is easy to miss in casual testing because it only manifests
when the search range has narrowed to exactly two adjacent elements
and the target is (or would be) the second one - a specific, easy to
overlook edge case, not something that shows up on a random large
array most of the time.

**Fix:** always `lo = mid + 1` on the "target is greater" branch. Its
mirror, `hi = mid - 1`, does not need the same fix, because `mid` can
equal `hi` too but `mid - 1` always strictly decreases `hi`.

### Why these two pitfalls matter more than they look

Both bugs are **silent**: they don't crash on most inputs, they crash
or hang only on specific edge cases (searching past the end, or a
2-element remaining range with the target as the second element).
That is precisely why "I tested it and it worked" is not proof -
Part 2's full invariant proof is what actually rules these bugs out,
because a correct proof cannot be written for code that violates the
invariant. If you *try* to write the maintenance proof for the buggy
`lo = mid` version, it fails exactly at the step that assumed the
range strictly shrinks - the proof itself points you at the bug.

---

## Part 4: Midterm Practice Set (Weeks 1-7)

The midterm (Week 8) covers Weeks 1-7 in full: algorithm properties,
Big-O and complexity analysis, recursion and recurrences, basic
sorting with loop invariants, advanced sorting, and searching with
loop invariants. Try each question yourself before reading the answer.

**1. Big-O proof.** Prove, using the formal definition, that
$3n^2 + 5n + 2 = O(n^2)$ - i.e. find constants $c > 0$, $n_0 \ge 1$
such that $3n^2 + 5n + 2 \le c \cdot n^2$ for all $n \ge n_0$.

> **Answer.** Take $n_0 = 1$. For all $n \ge 1$: $n \le n^2$ (so
> $5n \le 5n^2$), and $1 \le n^2$ (so $2 \le 2n^2$). Adding these to
> $3n^2 \le 3n^2$ gives $3n^2 + 5n + 2 \le 3n^2 + 5n^2 + 2n^2 = 10n^2$
> for every $n \ge 1$. So $c = 10$, $n_0 = 1$ works, proving
> $3n^2 + 5n + 2 = O(n^2)$. (Any larger $c$ also works - the
> definition only requires *some* valid constants.)

**2. Sorting trace.** Trace insertion sort on `[5, 2, 8, 1, 4]`,
showing the array after each pass, and state its worst-case Big-O.

> **Answer.** Pass 1 (insert 2): `[2, 5, 8, 1, 4]`. Pass 2 (insert 8,
> already in place): `[2, 5, 8, 1, 4]`. Pass 3 (insert 1, shifts
> everything): `[1, 2, 5, 8, 4]`. Pass 4 (insert 4): `[1, 2, 4, 5,
> 8]`. Worst case (reverse-sorted input, every insertion shifts the
> whole sorted prefix): $O(n^2)$.

**3. Recurrence.** Solve $T(n) = 2T(n/2) + n$, $T(1) = 1$, using the
recursion-tree method. State $T(n)$ in Big-O terms.

> **Answer.** Every level of the recursion tree does total work $n$:
> level 0 does $n$; level 1 splits into 2 subproblems of size $n/2$,
> each doing $n/2$ work, totaling $n$; level 2 similarly totals $n$;
> and so on. The tree has $\log_2 n$ levels (halving $n$ down to 1),
> so total work is $n \cdot \log_2 n$. **$T(n) = O(n \log n)$.**

**4. Loop invariant.** State the loop invariant maintained by
insertion sort's outer loop (indexed by $i$), and explain what it
tells you at loop termination.

> **Answer.** Invariant: at the start of each outer-loop iteration
> `i`, the subarray `A[0..i-1]` consists of exactly the elements
> originally there, now in sorted order. Initialization: at `i = 1`,
> `A[0..0]` is one element, trivially sorted. Maintenance: each
> iteration inserts `A[i]` into its correct place within the
> already-sorted `A[0..i-1]`, extending the sorted region by one.
> Termination: the loop ends at `i = n`, so the invariant now states
> that the *entire* array `A[0..n-1]` is sorted - exactly the claim
> we need for correctness.

**5. Growth-rate ordering.** Order these from slowest- to
fastest-growing as $n \to \infty$: $n!$, $n \log n$, $2^n$, $\log n$,
$n$, $n^2$.

> **Answer.** $\log n < n < n\log n < n^2 < 2^n < n!$. $\log n$ grows
> slower than any positive power of $n$; $n \log n$ sits strictly
> between linear and quadratic; $2^n$ eventually overtakes every
> polynomial (including $n^2$); and $n!$ eventually overtakes even
> $2^n$, making it the fastest-growing function on the list.

**6. Off-by-one bug hunt.** A binary search implementation initializes
`hi = length(A)` (not `length(A) - 1`), but keeps `hi = mid - 1` on
the "too high" branch and `while lo <= hi` as the loop condition. On
an array of length 4, searching for a target larger than every
element, identify the bug and state the fix.

> **Answer.** Trace: `lo=0, hi=4`, `mid=2`, `A[2] < target` → `lo=3`.
> `lo=3, hi=4`, `mid=3`, `A[3] < target` → `lo=4`. Now `lo=4, hi=4`
> still satisfies `lo <= hi`, so the loop runs once more: `mid=4`, and
> `A[4]` is read out of bounds (valid indices are `0..3`). **Bug:**
> `hi` was initialized under the half-open convention
> (`length(A)`) while the rest of the function uses the closed
> convention (`hi = mid - 1`, `lo <= hi`). **Fix:** initialize
> `hi = length(A) - 1` to match the closed convention used everywhere
> else.

---

## Part 5: Optional Reading

- **CLRS**, review Chapter 2 (loop invariants, using insertion sort as
  the running example) and work Exercise 2.3-5 (binary search) if you
  haven't already.
- **Sedgewick, *Algorithms***, §1.1 has a full correctness discussion
  of binary search, including a historical note on how often
  professional implementations get it wrong - a good second source if
  the proof in Part 2 didn't fully click on the first read.
- **Joshua Bloch, "Extra, Extra - Read All About It: Nearly All Binary
  Searches and Mergesorts Are Broken"** (Google AI Blog, 2006) - the
  real story behind the Java `mid = (lo + hi) / 2` overflow bug
  mentioned in class. Short, readable, and a good demonstration that
  "obviously correct" and "actually correct" are different claims,
  even for professionals.
- **Before Week 8:** re-derive, from memory and without looking at the
  slides, the loop-invariant proof for *one* sorting algorithm (Week
  5) and for binary search (this week). If you can write both from
  scratch, you are in good shape for the midterm.
