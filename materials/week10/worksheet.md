# Week 10 Worksheet - Greedy Algorithms

Computer Algorithms (506994-002). Work with your neighbor (pair work).
Write your names here:

Name 1: _______________________  Name 2: _______________________

---

## Worksheet Part A (~15 minutes): Break a Different Greedy Rule

A classmate proposes a different rule for CampusNav's room-booking
scheduler: **"always grant whichever remaining request starts
earliest"** (earliest start time first, instead of earliest finish
time first). Your job: build a small instance where this rule grants
**fewer** bookings than the correct earliest-finish-time rule.

**A1. Set up the trap.** Request X below is already filled in - it
starts earliest of all (09:00) and runs the entire day. Invent three
more requests, **a**, **b**, and **c**, each with its own start and
end time, such that:

- each of a, b, c fits somewhere between 09:00 and 17:00 (so each
  conflicts with X), and
- a, b, and c do **not** conflict with each other.

| Request | Club (your choice) | Start | End |
|---|---|---|---|
| X | Marathon Planning Meeting | 09:00 | 17:00 |
| a | ___________________ | _______ | _______ |
| b | ___________________ | _______ | _______ |
| c | ___________________ | _______ | _______ |

**A2. Run the flawed rule.** Using "earliest start time first" on your
four requests: which request gets grabbed first? Which others does it
conflict with? How many total requests end up granted?

First grabbed: _______   Total granted under this rule: _______

**A3. Run the correct rule.** Using earliest-finish-time first (this
week's proven-safe rule) on the *same* four requests: which requests
get granted, and how many total?

Requests granted: _______________________   Total granted: _______

**A4. Short answer.** In your own words (2-3 sentences), explain *why*
"earliest start time first" is not safe in general - what does it get
wrong that earliest-finish-time gets right?

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

## Worksheet Part B (~20 minutes): Run the Real Scheduler by Hand

Below is CampusNav's actual Friday queue for the shared seminar room -
an **8-request instance**. This is the same instance referenced by
**Assignment 3, Task 1(d)** - keep this page.

| # | Club | Start | End |
|---|---|---|---|
| 1 | Coding Club | 09:00 | 10:00 |
| 2 | Dance Crew | 09:30 | 11:00 |
| 3 | Debate Society | 10:00 | 10:30 |
| 4 | Robotics Team | 10:15 | 12:00 |
| 5 | Chess Club | 10:30 | 11:30 |
| 6 | Photography Club | 11:00 | 13:00 |
| 7 | Book Club | 11:30 | 12:30 |
| 8 | Volunteer Corps | 12:30 | 14:00 |

**B1. Sort by end time.** Write the request numbers (1-8) in order of
increasing end time.

Sorted order (by #): _______________________________________________

**B2. Run the greedy rule.** For each request in your sorted order,
mark **GRANT** or **SKIP**, and track `lastEnd` after every grant.
(Use the blank rows below, in your sorted order.)

| # | Club | GRANT or SKIP | lastEnd after this step |
|---|---|---|---|
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

**B3. Final answer.** Which requests are granted the room, and how
many total bookings is that out of 8?

Granted: _______________________________   Total granted: _______

**B4. One more request arrives.** A "Guest Lecture" request comes in
for 12:00-13:30. Using your trace from B2, does it get granted under
the greedy rule? Why or why not - name the specific request that
blocks it, if any.

_____________________________________________________________
_____________________________________________________________

---

<!-- ============================================================ -->
<!-- Instructor Answer Key - do not hand out this section -->
<!-- ============================================================ -->

## Instructor Answer Key - do not hand out this section

### Part A

- **A1.** Accept any valid construction. Canonical example: a =
  Coding Club, 09:15-10:00; b = Debate Society, 10:15-11:30; c = Chess
  Club, 13:00-14:00. All three fit inside 09:00-17:00 (so each
  conflicts with X) and are pairwise non-overlapping.
- **A2.** "Earliest start time first" grabs X first (starts 09:00,
  earliest of all four). X spans 09:00-17:00, so it conflicts with a,
  b, and c - all three are skipped. **Total granted: 1.**
- **A3.** Sorted by end time: a (10:00), b (11:30), c (14:00), X
  (17:00). Grant a (lastEnd 10:00); b starts 10:15 ≥ 10:00, grant
  (lastEnd 11:30); c starts 13:00 ≥ 11:30, grant (lastEnd 14:00); X
  starts 09:00 < 14:00, skip. **Requests granted: a, b, c. Total: 3.**
- **A4.** Accept any answer that identifies: starting earliest says
  nothing about how *long* a request holds the room, so "earliest
  start time first" can lock in one long request that blocks many
  short, otherwise-compatible ones - exactly the failure mode
  earliest-finish-time is designed to avoid, since finishing soonest
  is what actually leaves the most room open for what comes next.

### Part B

- **B1.** Sorted by end time: **1** (10:00), **3** (10:30), **2**
  (11:00), **5** (11:30), **4** (12:00), **7** (12:30), **6** (13:00),
  **8** (14:00).
- **B2 / B3.** Full trace, in sorted order:

  | # | Club | GRANT or SKIP | lastEnd after this step |
  |---|---|---|---|
  | 1 | Coding Club (09:00-10:00) | GRANT | 10:00 |
  | 3 | Debate Society (10:00-10:30) | GRANT (10:00 ≥ 10:00) | 10:30 |
  | 2 | Dance Crew (09:30-11:00) | SKIP (09:30 < 10:30) | 10:30 |
  | 5 | Chess Club (10:30-11:30) | GRANT (10:30 ≥ 10:30) | 11:30 |
  | 4 | Robotics Team (10:15-12:00) | SKIP (10:15 < 11:30) | 11:30 |
  | 7 | Book Club (11:30-12:30) | GRANT (11:30 ≥ 11:30) | 12:30 |
  | 6 | Photography Club (11:00-13:00) | SKIP (11:00 < 12:30) | 12:30 |
  | 8 | Volunteer Corps (12:30-14:00) | GRANT (12:30 ≥ 12:30) | 14:00 |

  **Granted: Coding Club, Debate Society, Chess Club, Book Club,
  Volunteer Corps. Total granted: 5 of 8.**

- **B4.** Sorted position for Guest Lecture (12:00-13:30, end 13:30)
  falls between Photography Club (13:00) and Volunteer Corps (14:00).
  At that point `lastEnd = 12:30` (set by Book Club, the last request
  granted before it). Guest Lecture starts at 12:00, which is **before**
  12:30 - **it is SKIPPED.** It is blocked by **Book Club**
  (11:30-12:30), the most recently granted booking at the time Guest
  Lecture is considered.
