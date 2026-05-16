# Deep-Dive Research Report: Scoro's Unified Capacity Planning & Resource Grid

This report analyzes how **Scoro** executes capacity planning and resource management through its integrated timeline grid. By consolidating high-level portfolio forecasting and granular task scheduling into a single visual ecosystem, Scoro enables professional service firms (such as agencies, consultancies, and engineering teams) to manage team utilization, prevent burnout, and protect project margins smoothly.

---

## 1. Architectural Concept: The Unified Grid Ecosystem
Unlike fragmented platforms where capacity forecasting lives in a separate spreadsheet from day-to-day task management, Scoro marries these two worlds. The architecture is driven by a single source of truth across two primary views that interact dynamically:

* **The Portfolio Bookings Grid (High-Level Capacity):** A macro-level heatmap that visualizes your team's reality across weeks, months, or a rolling 6-month window. It shows confirmed bookings alongside pipeline projects, mapping broad role demands and individual availability.
* **The Workload Planner (Granular Execution):** A calendar-like interactive timeline grid where managers drag and drop unassigned project tasks directly into individual team members' daily or weekly schedules to resolve conflicts in real time.

Because your project delivery, resource availability, and financials reside in the same system, every hour scheduled or modified instantly reflects across quote-to-cash forecasting, utilization metrics, and project margin tracking.

---

## 2. The Visual Language of the Heatmap Grid
To make capacity management intuitive and frictionless, Scoro uses a strict, color-coded visual hierarchy within its timeline cells. This grid indicates how much of a team member's or role's total contracted working hours are already committed:

* 🟩 **Green Cells (Available Capacity):** Clear bandwidth; indicates the user or role has remaining unallocated hours within their standard availability rule.
* 🟥 **Red Cells (Overbooked / Burnout Risk):** Instant visual warning that the allocated hours exceed 100% of the resource’s capacity for that day or week, signaling immediate rescheduling needs.
* 🟪 **Purple Cells (Committed Tasks):** Indicates time that is completely utilized and solidified with active, assigned project tasks or events.
* 🏁 **Diagonal/Striped Blocks (Tentative Bookings):** Used for soft-booking placeholder roles or individual staff on unconfirmed pipeline deals, keeping upcoming work on the radar without locking down hard hours.
* 🟨 **Yellow Striped Blocks (Time-Off & Absences):** Globally tracks vacations, sick leave, and public holidays. A dedicated time-off icon under the user's name can be clicked to view detailed leave logs, instantly showing managers why a resource is blocked out.

---

## 3. Mechanics of Smooth Resource Scheduling
Scoro replaces the "chaos" of manual resource rebalancing with highly flexible, fluid interface mechanics designed to adjust timelines on the fly:

### A. Role-Based & Placeholder Planning
When a project is in the pipeline or an early phase, managers often do not know exactly which engineer, designer, or consultant will execute the work. Scoro solves this by allowing bookings against a **"Placeholder Role"** (e.g., *Senior C++ Developer*). This reserves the organizational capacity needed for the project. When the project solidifies, managers reallocate the block to a specific team member based on their real-time availability.

### B. Smooth Drag-and-Drop Reallocation
If a client delays a milestone or a team member calls in sick, the schedule can be restructured directly within the grid:
* **Resizing Blocks:** Hovering over a booking block allows users to expand or shrink its duration, dynamically recalculating the hour distribution across that timeline range.
* **Shifting Bookings:** Dragging a block from one resource's lane to another or moving it across the calendar instantly shifts the workload.
* **Automatic Dependency Updates:** If tasks have locked relationships (e.g., Task B depends on Task A), shifting the primary block automatically cascades down the timeline, preventing downstream bottlenecks.

### C. The Visual Waiting List
When unexpected work or a priority shift creates a scheduling conflict that cannot be immediately resolved, bookings can be parked in a visual **Waiting List**. This acts as an interactive holding area, keeping unassigned hours on the dashboard until a manager can clear up schedule space or clear the bottleneck.

---

## 4. Intelligent Allocation Rules & Controls
When a manager attempts to schedule a chunk of time or assign a task within the grid, Scoro provides programmatic automation to avoid manual hour-crunching.

### A. Smart Task-Planning Box
When dragging a task onto a resource's timeline, a "Plan Time" window presents three structural distribution strategies:
1.  **Fill:** Programmatically fits the entire task allocation into a single day on the team member's existing schedule.
2.  **Distribute:** Spreads the total task hours evenly across a specified span of multiple days (e.g., distributing a 10-hour task across 5 days at 2 hours/day).
3.  **Squeeze:** Forces the task into an already packed schedule, automatically pushing other lower-priority tasks back in the timeline to favor the new assignment.

### B. Individual Time Allocation, Buffers, and Deficits
Instead of uniformly splitting a task's duration across multiple assignees, Scoro allows managers to divide tasks into explicit, individual hour chunks per team member. 
* If a manager overrides a user's hours, the system maintains the total planned task duration but flags the discrepancy visually.
* It displays a **Buffer indicator** if there is unassigned time remaining, or a **Deficit indicator** if hours have been over-assigned. Managers can click this indicator to automatically synchronize and lock the planned task duration with the sum of individual allocations.

---

## 5. Real-Time Visibility & Pre-Assignment Guardrails
To prevent managers from having to jump between tabs to verify availability, Scoro injects real-time indicators directly into the task modification and assignment windows:

* **Avatar Availability Rings:** When selecting an assignee from a dropdown or inside the Gantt chart, a colored visual ring wraps around each user's profile picture. 
    * A **blue circle progress bar** represents how full their current schedule is.
    * A **percentage rate** displays their exact booked capacity.
    * A **gray hour metric** explicitly lists their remaining free hours for that target timeframe.
* **Contextual Member Grouping:** Team members who are already linked to the active project are dynamically grouped and pinned to the top of the assignment list. This allows managers to identify the best, most project-knowledgeable resource who also possesses the free bandwidth to execute the task.

---

## 6. End-to-End Business & Financial Context
The definitive strength of Scoro's grid planning lies in its multi-layered financial integration. It moves beyond standard calendar tools by tying every cell to the company's financial health:

* **Quote-to-Project Automated Pipeline (RAMP Framework):** During the initial sales cycle, estimated hours and roles are outlined in Scoro's Quote Builder. The moment a deal is signed and converted into an active project, Scoro automatically pulls those role placeholders, work breakdown structures (WBS), and budgeted hours directly into the resource plan, avoiding manual data re-entry.
* **Target Utilization Zones:** Financial and operational managers can track team members against specific billable targets (e.g., aiming for a steady 70% to 80% billable utilization zone). Non-billable admin time or excessive internal meetings are surfaced cleanly in reports to prevent margin erosion.
* **Financial Capacity Forecasting:** Managers can look forward across future months to see how upcoming retainer contracts, active projects, and late-stage sales deals map against aggregate team capacity. This provides executive clarity on exactly when to make strategic hiring decisions or scale up contractor usage before a capacity shortage impacts project delivery.
