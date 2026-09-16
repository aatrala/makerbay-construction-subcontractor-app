# PRD: Lightweight Subcontractor Coordination Platform

## 1. Summary

**Product Name**: SubSync (working title)

**One-liner**: Dead-simple mobile-first platform that connects general contractors and subcontractors for seamless schedule coordination, progress tracking, and communication — where subs actually want to use it.

**Target Users**:
- **Primary**: General contractors and construction managers overseeing 5-50+ subcontractors per project
- **Secondary**: Subcontractors (electrical, plumbing, HVAC, framing, etc.) working on GC-managed projects
- **Tertiary**: Project owners/developers needing visibility into project progress

**Core Value Proposition**:
- **For GCs**: Eliminate 20-30% of project management time spent on sub coordination via phone/text/Excel; real-time visibility into sub progress; automated schedule conflict detection
- **For Subs**: Free, dead-simple mobile app to view schedules, update progress, upload photos, communicate with GC — no training required
- **For Owners**: Real-time project dashboard with progress photos and milestone tracking

**Pricing**:
- **GCs**: $500-$2,000/month based on project count and sub count
- **Subcontractors**: Free (GC pays)
- **Enterprise**: Custom pricing for large GCs with 50+ projects

**Success Metrics**:
- 70% reduction in time spent on sub coordination (measured by GC surveys)
- 80% of subs actively using app within 30 days of project kickoff
- 90% of GCs report "high confidence" in project visibility (measured by NPS survey)
- 85% month-over-month retention at 12 months

---

## 2. Background and Evidence

### Market Context
- **Construction SaaS Market**: $14.94B by 2033 (~12% CAGR)
- **Cloud-based solutions**: 67.7% of deployments
- **ServiceTitan IPO**: Validated vertical SaaS thesis for trades ($54.50/share, ~$6B market cap)

### Pain Points (Evidence from Research)
1. **GCs spend 20-30% of project management time on sub coordination**: Phone calls, texts, emails, Excel spreadsheets to track schedules, progress, conflicts
2. **Procore too expensive and complex for subs**: $15K-$80K+/yr per GC; subs refuse to use it. Reddit: "Tools like Procore and ACC rarely get used at the subcontractor level"
3. **Subs don't adopt complex tools**: Subcontractors are small businesses (5-50 employees) with limited tech adoption; they won't pay for or learn complex software
4. **Schedule conflicts discovered too late**: Manual coordination means conflicts (two subs scheduled for same space/time) discovered on-site, causing delays
5. **Progress tracking is manual**: GCs drive to site to check progress; subs send progress photos via text/email; no centralized visibility

### Competitive Landscape
| Competitor | Pricing | Target | Strengths | Weaknesses |
|------------|---------|--------|-----------|------------|
| **Procore** | $15K-$80K+/yr | Mid-to-large GCs, ENR top 400 | Industry standard, broadest feature set, strong compliance | "Unrealistic for smaller-mid sized GCs"; subs refuse to use it |
| **Autodesk Construction Cloud** | Custom, $25-$65+/user/mo | Design-to-build enterprise | Strong BIM/design integration | Complex; poor subcontractor adoption |
| **SimplySub** | Early-stage | Subcontractor scheduling | Lightweight, focused on scheduling | Scheduling-only, early stage, limited features |
| **Shyft** | Workforce management | Workforce scheduling | Good for workforce management | Not focused on sub coordination, limited construction-specific features |
| **PlanGrid (Autodesk)** | $19-$39/user/mo | Field teams | Good for drawings/RFI | Not focused on sub coordination |
| **Buildertrend** | $150-$600+/mo | Custom home builders | Good client-facing tools | Now owned by Trimble; declining innovation perception |

**Gap**: No dominant lightweight solution that both GCs AND subs actually use. Procore/ACC are too heavy for subs. SimplySub is scheduling-only. No platform combines schedule coordination + progress tracking + communication + photo verification in a dead-simple mobile-first tool.

---

## 3. Goal and Success Criteria

### Product Goals
1. **Eliminate 70% of sub coordination time**: Automated schedule sync, progress updates, notifications replace phone/text/Excel
2. **Achieve 80% sub adoption**: Subs actually want to use it — dead-simple mobile app, free for subs, no training required
3. **Real-time project visibility**: GCs see sub progress in real-time; owners see project dashboard with photos
4. **Prevent schedule conflicts**: AI detects schedule conflicts 1-2 weeks before they occur; automated alerts

### Success Criteria (12-month targets)
- **Time savings**: 70% reduction in time spent on sub coordination (measured by GC surveys)
- **Sub adoption**: 80% of subs actively using app within 30 days of project kickoff
- **GC satisfaction**: 90% of GCs report "high confidence" in project visibility (NPS > 70)
- **Retention**: 85% month-over-month retention at 12 months
- **Network effects**: 60% of new GC customers come from sub referrals

### Business Goals
- **ARR**: $2M within 12 months (100 GC customers at $20K avg/year)
- **Gross margin**: 85%+ (SaaS model, minimal COGS)
- **CAC payback**: <9 months
- **LTV:CAC ratio**: >4:1

---

## 4. Users and Scenarios

### User Personas

#### Persona 1: Mike — General Contractor / Project Manager
- **Role**: Project Manager at mid-size GC ($10M-$50M annual revenue), managing 3-5 projects simultaneously
- **Pain**: Spends 15-20 hours/week coordinating subs via phone/text/Excel; schedule conflicts discovered on-site cause delays; can't get real-time progress updates from subs; Procore too expensive and subs won't use it
- **Goal**: Reduce coordination time to 5 hours/week; prevent schedule conflicts; real-time visibility into sub progress; subs actually use the tool
- **Current workflow**:
  1. Create project schedule in Microsoft Project or Excel
  2. Email schedule to subs (or print and hand out)
  3. Call/text subs daily to check progress
  4. Drive to site to verify progress
  5. Resolve schedule conflicts when discovered on-site
  6. Send schedule updates via email when changes occur
  7. Track progress in Excel spreadsheet
  8. Send progress photos to owner via email

#### Persona 2: Joe — Subcontractor (Electrical Contractor)
- **Role**: Owner of small electrical contracting company (5-15 employees), working on 3-5 GC-managed projects simultaneously
- **Pain**: GCs call/text daily for progress updates; schedules change constantly; hard to track which projects need attention; don't want to pay for or learn complex software; just want simple tool to see schedule and update progress
- **Goal**: Simple mobile app to see schedule, update progress, upload photos; no training required; free (GC pays)
- **Current workflow**:
  1. Receive schedule from GC via email (or paper)
  2. Get called/texted by GC daily for progress updates
  3. Take progress photos with phone, text to GC
  4. Receive schedule change notifications via email (often miss them)
  5. Show up to site, discover schedule conflict with another sub
  6. Call GC to resolve conflict
  7. Track own schedule in head or simple calendar app

#### Persona 3: Sarah — Project Owner / Developer
- **Role**: Owner of commercial development project ($5M-$20M project value)
- **Pain**: Can't get real-time visibility into project progress; GC sends weekly updates via email; hard to verify progress without visiting site; worried about delays
- **Goal**: Real-time dashboard showing project progress, milestone completion, progress photos; ability to see issues before they become delays
- **Current workflow**:
  1. Receive weekly progress report from GC via email
  2. Call GC for updates between reports
  3. Drive to site to verify progress
  4. Receive progress photos from GC via email (sporadic)
  5. Discover delays after they've already impacted schedule

### Key Scenarios

#### Scenario 1: GC Creates Project and Invites Subs (Happy Path)
1. Mike (GC) logs into SubSync web dashboard
2. Clicks "Create New Project"
3. Enters project details (name, address, start date, end date)
4. Uploads project schedule (Microsoft Project, Excel, or builds in SubSync)
5. System parses schedule, identifies sub tasks and milestones
6. Mike adds subcontractors (selects from SubSync directory or invites via email/phone)
7. System sends SMS + email invitations to subs with link to download app
8. Subs download app, create account (free), join project
9. System syncs schedule to all subs' mobile apps
10. Subs receive push notifications for their tasks

#### Scenario 2: Sub Updates Progress (Happy Path)
1. Joe (sub) arrives at job site
2. Opens SubSync mobile app
3. Sees today's tasks (framing 2nd floor, electrical rough-in 1st floor)
4. Clicks on task, clicks "Start Task"
5. System records start time
6. Joe completes task, clicks "Complete Task"
7. System prompts: "Upload progress photo?"
8. Joe takes photo with phone, uploads
9. System updates task status to "Complete"
10. Mike (GC) receives notification: "Electrical rough-in 1st floor complete"
11. Mike views progress photo, approves completion
12. System updates project dashboard

#### Scenario 3: Schedule Conflict Detected (Happy Path)
1. Mike (GC) updates schedule (pushes framing back 2 days)
2. System detects conflict: Electrical rough-in scheduled for same time/space as framing
3. System sends alert to Mike: "Schedule conflict detected: Electrical rough-in and framing both scheduled for 1st floor on Sept 15"
4. System suggests resolution: "Move electrical rough-in to Sept 17"
5. Mike reviews suggestion, clicks "Accept"
6. System updates schedule, notifies affected subs (electrical, framing)
7. Subs receive push notification: "Schedule updated: Electrical rough-in moved to Sept 17"
8. Joe (electrical sub) views updated schedule in app

#### Scenario 4: Owner Views Project Dashboard (Happy Path)
1. Sarah (owner) logs into SubSync web dashboard (read-only access)
2. Sees project overview:
   - Overall progress: 65% complete
   - On schedule / 2 days behind
   - Milestones: Foundation ✓, Framing ✓, Electrical rough-in (in progress), Plumbing rough-in (upcoming)
3. Clicks on "Electrical rough-in" milestone
4. Sees progress photos uploaded by Joe (electrical sub)
5. Sees task completion status: 80% complete
6. Sees recent activity: "Joe completed electrical rough-in 1st floor — 2 hours ago"
7. Sarah shares dashboard link with investor

#### Scenario 5: Sub Misses Schedule Update (Error Path)
1. Joe (sub) scheduled to start task but doesn't update progress by 10 AM
2. System sends automated reminder to Joe: "Reminder: Electrical rough-in 1st floor scheduled for today. Please update progress."
3. Joe still doesn't update by 2 PM
4. System sends alert to Mike (GC): "Joe (electrical) hasn't updated progress for Electrical rough-in 1st floor"
5. Mike calls Joe to check status
6. Joe responds: "Running late, will start at 3 PM"
7. Joe updates task status in app: "Delayed — starting at 3 PM"
8. System notifies Mike: "Joe updated status: Delayed — starting at 3 PM"

#### Scenario 6: Sub Doesn't Adopt Tool (Error Path)
1. Mike (GC) invites Joe (sub) to project
2. Joe receives SMS invitation but doesn't download app
3. System sends reminder SMS after 24 hours: "Mike invited you to join SubSync for Project X. Download app: [link]"
4. Joe still doesn't download after 48 hours
5. System sends alert to Mike: "Joe hasn't joined SubSync yet"
6. Mike calls Joe, helps him download app and create account
7. Joe joins project, receives schedule

---

## 5. Scope

### In Scope (MVP)
1. **Project Management (GC Web Dashboard)**
   - Create/edit projects
   - Upload/import schedules (Microsoft Project, Excel, CSV)
   - Build schedules in SubSync (Gantt chart view)
   - Add/manage subcontractors
   - View project dashboard (overall progress, milestones, recent activity)
   - View sub progress (task completion, photos)
   - Send notifications to subs

2. **Schedule Coordination**
   - Two-way schedule sync (GC updates → subs see changes; subs update task status → GC sees progress)
   - Schedule conflict detection (AI detects overlapping tasks in same space/time)
   - Automated schedule change notifications
   - Schedule version history

3. **Progress Tracking**
   - Task-level progress updates (start, in progress, complete)
   - Progress photo upload (mobile app)
   - Percent complete tracking
   - Milestone tracking
   - Activity feed (recent updates, completions, photos)

4. **Communication**
   - In-app messaging (GC ↔ sub, sub ↔ sub)
   - Automated notifications (push, SMS, email)
   - @mentions in comments
   - Task-level comments

5. **Subcontractor Mobile App**
   - View schedule (my tasks, full project schedule)
   - Update task status (start, complete)
   - Upload progress photos
   - Receive notifications
   - In-app messaging
   - Offline mode (sync when connection restored)

6. **Owner Dashboard (Read-Only)**
   - View project progress
   - View milestones
   - View progress photos
   - View activity feed

7. **Integrations**
   - Microsoft Project (schedule import)
   - Excel/CSV (schedule import)
   - SMS notifications (Twilio)
   - Email notifications (SendGrid)
   - Push notifications (Firebase, APNS)

### Out of Scope (MVP)
- Financial management / invoicing / payment processing
- Document management (drawings, specs, RFIs, submittals)
- BIM / 3D model integration
- Time tracking / payroll
- Equipment tracking
- Safety compliance / incident reporting
- Quality control / punch lists
- Custom workflow builder
- API for third-party integrations

### Non-Goals
- **Not replacing Procore**: We're not building a full construction management platform. We're focused on sub coordination
- **Not replacing scheduling software**: We integrate with Microsoft Project, not replace it. Subs don't need full scheduling software
- **Not replacing communication tools**: We complement text/email, not replace them. We're focused on construction-specific coordination
- **Not serving owners directly**: Owners get read-only access. We're built for GC-sub coordination
- **Not serving residential remodelers**: We're focused on commercial / new construction GCs managing 5+ subs

### Dependencies
- **SMS service provider**: For notifications (Twilio)
- **Email service provider**: For notifications (SendGrid)
- **Push notification service**: For mobile app (Firebase, APNS)
- **Cloud hosting**: AWS or GCP for infrastructure
- **Mobile app distribution**: Apple App Store, Google Play Store

### Assumptions
1. **Subs will use free mobile app**: We assume subs will download and use the app if it's free, simple, and GC requires it
2. **GCs will require sub adoption**: We assume GCs will mandate sub adoption as condition of project participation
3. **Schedule import is feasible**: We assume we can parse Microsoft Project and Excel schedules reliably
4. **Progress photos are valuable**: We assume GCs and owners want to see progress photos, not just task completion status
5. **Network effects will drive growth**: We assume satisfied subs will recommend SubSync to other GCs they work for

---

## 6. Non-Goals

### What We're NOT Building
1. **Not a full construction management platform**: We're not competing with Procore on document management, RFIs, submittals, financials
2. **Not a scheduling tool**: We integrate with Microsoft Project, not replace it. We're focused on coordination, not scheduling
3. **Not a communication platform**: We complement text/email, not replace them. We're focused on construction-specific coordination
4. **Not a financial tool**: We don't handle invoicing, payment processing, payroll, or cost tracking
5. **Not a document management system**: We don't handle drawings, specs, RFIs, submittals, or document versioning
6. **Not a BIM tool**: We don't integrate with 3D models or BIM workflows

### What We're NOT Doing in MVP
1. **No custom workflow builder**: MVP uses pre-configured workflows (task start → complete). Custom workflows come in v2
2. **No API for third-party integrations**: MVP has native integrations (Microsoft Project, SMS, email). API comes in v2
3. **No offline-first mobile app**: MVP requires internet connection for most features. Offline mode (limited) comes in v2
4. **No multi-language support**: MVP is English-only. Multi-language comes in v2
5. **No advanced analytics**: MVP shows basic progress metrics. Advanced analytics (predictive scheduling, resource optimization) comes in v2

---

## 7. User Flow

### Flow 1: GC Creates Project and Invites Subs

```
┌─────────────────────────────────────────────────────────────┐
│ 1. GC Logs Into Web Dashboard                                │
│    - Sees project list (empty for new user)                   │
│    - Clicks "Create New Project"                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. GC Enters Project Details                                 │
│    - Project name: "123 Main St Office Building"              │
│    - Address: "123 Main St, Austin, TX"                       │
│    - Start date: "Oct 1, 2026"                                │
│    - End date: "Mar 31, 2027"                                 │
│    - Clicks "Next"                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. GC Uploads Schedule                                       │
│    - Option A: Upload Microsoft Project file (.xml, .mpp)     │
│    - Option B: Upload Excel/CSV file                          │
│    - Option C: Build schedule in SubSync (Gantt chart)        │
│    - System parses schedule, identifies tasks and milestones  │
│    - System identifies sub tasks (tasks assigned to subs)     │
│    - Clicks "Next"                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. GC Adds Subcontractors                                    │
│    - Option A: Select from SubSync directory (if sub exists)  │
│    - Option B: Invite via email/phone                         │
│    - GC enters sub info: name, company, trade, email, phone   │
│    - GC assigns sub to tasks (or system auto-assigns based on schedule)│
│    - Clicks "Invite Subs"                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. System Sends Invitations                                  │
│    - System sends SMS + email to each sub                     │
│    - Message: "Mike from ABC Construction invited you to join SubSync for 123 Main St Office Building. Download app: [link]"│
│    - Sub downloads app, creates account (free)                │
│    - Sub joins project                                        │
│    - System syncs schedule to sub's mobile app                │
│    - Sub receives push notification: "You've been added to 123 Main St Office Building"│
└─────────────────────────────────────────────────────────────┘
```

### Flow 2: Sub Updates Progress

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Sub Opens Mobile App                                      │
│    - Sees project list                                        │
│    - Clicks on "123 Main St Office Building"                  │
│    - Sees "My Tasks" tab (filtered to sub's tasks)            │
│    - Sees today's tasks:                                      │
│      - Electrical rough-in 1st floor (Scheduled: Today)       │
│      - Electrical rough-in 2nd floor (Scheduled: Tomorrow)    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Sub Starts Task                                           │
│    - Clicks on "Electrical rough-in 1st floor"                │
│    - Sees task details:                                       │
│      - Description: "Install electrical wiring, outlets, switches on 1st floor"│
│      - Scheduled: Today, Oct 15                               │
│      - Duration: 8 hours                                      │
│      - Dependencies: Framing 1st floor (complete)             │
│    - Clicks "Start Task"                                      │
│    - System records start time                                │
│    - Task status changes to "In Progress"                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Sub Completes Task                                        │
│    - Sub completes work                                       │
│    - Opens app, clicks on task                                │
│    - Clicks "Complete Task"                                   │
│    - System prompts: "Upload progress photo?"                 │
│    - Sub takes photo with phone, uploads                      │
│    - System updates task status to "Complete"                 │
│    - System records completion time                           │
│    - System calculates percent complete (if task has subtasks)│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. GC Receives Notification                                  │
│    - Mike (GC) receives push notification:                    │
│      "Joe completed Electrical rough-in 1st floor — 2 hours ago"│
│    - Mike opens web dashboard                                 │
│    - Sees task marked complete with progress photo            │
│    - Mike clicks on photo, views full-size                    │
│    - Mike clicks "Approve" (or "Request Rework" if needed)    │
│    - System updates task status to "Approved"                 │
│    - System notifies sub: "Task approved by Mike"             │
└─────────────────────────────────────────────────────────────┘
```

### Flow 3: Schedule Conflict Detected

```
┌─────────────────────────────────────────────────────────────┐
│ 1. GC Updates Schedule                                       │
│    - Mike (GC) updates schedule (pushes framing back 2 days)  │
│    - System detects conflict:                                 │
│      - Electrical rough-in scheduled for 1st floor on Sept 15 │
│      - Framing scheduled for 1st floor on Sept 15             │
│      - Both tasks require same space at same time             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. System Sends Alert to GC                                  │
│    - System sends alert to Mike:                              │
│      "Schedule conflict detected: Electrical rough-in and framing both scheduled for 1st floor on Sept 15"│
│    - System suggests resolution:                              │
│      "Move electrical rough-in to Sept 17"                    │
│    - System shows impact:                                     │
│      - Electrical sub available Sept 17                       │
│      - No other conflicts on Sept 17                          │
│      - Project end date unchanged                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. GC Reviews and Accepts Resolution                         │
│    - Mike reviews suggestion                                  │
│    - Clicks "Accept"                                          │
│    - System updates schedule                                  │
│    - System notifies affected subs:                           │
│      - Joe (electrical): "Schedule updated: Electrical rough-in moved to Sept 17"│
│      - Bob (framing): "Schedule updated: Framing 1st floor confirmed for Sept 15"│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Subs Receive Notifications                                │
│    - Joe receives push notification:                          │
│      "Schedule updated: Electrical rough-in moved to Sept 17" │
│    - Joe opens app, views updated schedule                    │
│    - Joe confirms availability (or flags conflict)            │
└─────────────────────────────────────────────────────────────┘
```

### Empty States
- **No projects yet**: "Welcome! Create your first project to get started."
- **No subs invited**: "Invite subcontractors to collaborate on this project."
- **No tasks scheduled**: "Add tasks to your schedule to get started."
- **No progress updates**: "No progress updates yet. Subs will update progress as work completes."

### Loading States
- **Dashboard loading**: Skeleton loader with project cards
- **Schedule loading**: Skeleton loader with Gantt chart
- **Photo upload**: Progress bar with percentage
- **Schedule import**: "Importing schedule... This may take 30-60 seconds."

### Permission Levels
| Role | Permissions |
|------|-------------|
| **GC Admin** | Full access: create/edit projects, manage subs, view all data, configure settings |
| **GC Project Manager** | Create/edit projects, manage subs, view all data (limited to assigned projects) |
| **GC Viewer** | View projects, view sub progress (read-only) |
| **Subcontractor** | View assigned tasks, update task status, upload photos, view schedule (limited to assigned projects) |
| **Owner** | View project progress, view milestones, view photos (read-only, limited to assigned projects) |

---

## 8. Functional Requirements

### Requirement R1: Schedule Import and Parsing

**User Story**: As a GC, I want to import my existing project schedule (Microsoft Project, Excel) so that I don't have to rebuild it in SubSync.

**Scenario**: GC uploads Microsoft Project file. System parses schedule, identifies tasks and milestones.

**Functional Behavior**:
- GC uploads Microsoft Project file (.xml, .mpp) or Excel/CSV file
- System parses file, extracts:
  - Task names
  - Start dates, end dates, durations
  - Dependencies (predecessors, successors)
  - Milestones
  - Resource assignments (if available)
- System identifies sub tasks (tasks that will be assigned to subs)
- System displays parsed schedule in Gantt chart view
- GC reviews parsed schedule, makes adjustments (if needed)
- GC confirms import

**Data/Field Changes**:
- Project record: schedule_import_status (enum: pending, in_progress, completed, failed), schedule_data (JSON)
- Task record: name (string), start_date (date), end_date (date), duration (number), dependencies (JSON array), milestone (boolean), sub_id (UUID, FK)

**Edge Cases**:
- File format not supported: System shows error, lists supported formats
- File corrupted: System shows error, allows retry
- Schedule parsing fails: System shows error, allows manual schedule creation
- Missing required fields (start date, end date): System shows warning, allows GC to fill in manually

**Acceptance Criteria**:
- ✅ System imports Microsoft Project files (.xml, .mpp)
- ✅ System imports Excel/CSV files
- ✅ System extracts task names, dates, durations, dependencies
- ✅ System identifies milestones
- ✅ System displays parsed schedule in Gantt chart
- ✅ GC can review and adjust parsed schedule
- ✅ Import completes within 60 seconds for typical project (100-500 tasks)

**Priority**: P0 (Must have for MVP)

---

### Requirement R2: Two-Way Schedule Sync

**User Story**: As a GC, I want schedule changes to automatically sync to subs' mobile apps so that everyone sees the latest schedule.

**Scenario**: GC updates schedule. System syncs changes to subs' mobile apps.

**Functional Behavior**:
- GC updates schedule (adds task, changes date, modifies duration)
- System detects changes
- System syncs changes to all subs' mobile apps
- Subs receive push notification: "Schedule updated"
- Subs open app, see updated schedule
- Subs can confirm availability (or flag conflict)
- System notifies GC of sub responses

**Data/Field Changes**:
- Task record: last_updated (timestamp), version (number)
- Notification record: sub_id, project_id, notification_type (enum: schedule_updated), sent_at (timestamp)

**Edge Cases**:
- Sub doesn't have internet connection: System queues notification, delivers when connection restored
- Sub doesn't respond to schedule update: System sends reminder after 24 hours
- Sub flags conflict: System notifies GC, shows conflict details

**Acceptance Criteria**:
- ✅ Schedule changes sync to subs' mobile apps within 5 minutes
- ✅ Subs receive push notification for schedule changes
- ✅ Subs can view updated schedule in app
- ✅ Subs can confirm availability or flag conflict
- ✅ GC receives notification of sub responses

**Priority**: P0 (Must have for MVP)

---

### Requirement R3: Progress Photo Upload

**User Story**: As a sub, I want to upload progress photos so that the GC can verify work completion without visiting site.

**Scenario**: Sub completes task, uploads progress photo.

**Functional Behavior**:
- Sub completes task, clicks "Complete Task"
- System prompts: "Upload progress photo?"
- Sub takes photo with phone camera (or selects from gallery)
- Sub uploads photo
- System validates photo (file size, format)
- System attaches photo to task
- System notifies GC: "Sub completed task — photo uploaded"
- GC views photo in web dashboard
- GC approves task (or requests rework)

**Data/Field Changes**:
- Task record: status (enum: not_started, in_progress, complete, approved, rework_requested), photo_url (string), completed_at (timestamp)
- Photo record: task_id, photo_url (string), uploaded_at (timestamp), uploaded_by (UUID, FK)

**Edge Cases**:
- Photo upload fails (poor connection): System allows retry, saves photo locally
- Photo too large: System compresses photo, shows warning
- Sub doesn't upload photo: System allows task completion without photo (but encourages photo upload)
- GC requests rework: System notifies sub, task status changes to "rework_requested"

**Acceptance Criteria**:
- ✅ Sub can take photo with phone camera
- ✅ Sub can select photo from gallery
- ✅ System uploads photo successfully
- ✅ System attaches photo to task
- ✅ GC receives notification with photo
- ✅ GC can view photo in web dashboard
- ✅ GC can approve task or request rework

**Priority**: P0 (Must have for MVP)

---

### Requirement R4: Schedule Conflict Detection

**User Story**: As a GC, I want the system to detect schedule conflicts so that I can resolve them before they cause delays on site.

**Scenario**: GC updates schedule. System detects conflict (two subs scheduled for same space/time).

**Functional Behavior**:
- GC updates schedule (or sub updates task status)
- System analyzes schedule for conflicts:
  - Two tasks scheduled for same space at same time
  - Two tasks requiring same equipment at same time
  - Task scheduled before dependency complete
- System detects conflict
- System sends alert to GC: "Schedule conflict detected"
- System suggests resolution (if possible):
  - Move task to alternative date
  - Reassign task to different sub
- GC reviews suggestion, accepts/rejects
- System updates schedule, notifies affected subs

**Data/Field Changes**:
- Conflict record: project_id, task_ids (JSON array), conflict_type (enum: space, equipment, dependency), detected_at (timestamp), resolution (JSON)
- Task record: conflict_flag (boolean), conflict_id (UUID, FK)

**Edge Cases**:
- System can't suggest resolution: System notifies GC, GC resolves manually
- False positive (system detects conflict that doesn't exist): GC can dismiss conflict
- Multiple conflicts detected: System prioritizes conflicts by severity

**Acceptance Criteria**:
- ✅ System detects space conflicts (two tasks in same space at same time)
- ✅ System detects equipment conflicts (two tasks requiring same equipment)
- ✅ System detects dependency conflicts (task scheduled before dependency complete)
- ✅ System sends alert to GC
- ✅ System suggests resolution (if possible)
- ✅ GC can accept/reject suggestion
- ✅ System updates schedule, notifies subs

**Priority**: P1 (Should have for MVP, but can be manual if needed)

---

### Requirement R5: Subcontractor Mobile App

**User Story**: As a sub, I want a dead-simple mobile app to view my schedule, update progress, and upload photos so that I can stay coordinated with the GC.

**Scenario**: Sub opens mobile app, views schedule, updates task status, uploads photo.

**Functional Behavior**:
- Sub opens mobile app
- Sub sees project list (projects they're assigned to)
- Sub clicks on project
- Sub sees "My Tasks" tab (filtered to their tasks)
- Sub sees today's tasks, upcoming tasks, completed tasks
- Sub clicks on task, views task details
- Sub clicks "Start Task" → task status changes to "In Progress"
- Sub clicks "Complete Task" → prompted to upload photo
- Sub uploads photo → task status changes to "Complete"
- Sub receives push notifications for schedule changes, task assignments

**Data/Field Changes**:
- Mobile app state: current_project_id, current_task_id, offline_queue (JSON array)

**Edge Cases**:
- Sub doesn't have internet connection: App saves data locally, syncs when connection restored
- Sub has multiple projects: App shows project list, sub selects project
- Sub doesn't understand app: App provides simple onboarding tutorial (3 screens)

**Acceptance Criteria**:
- ✅ Sub can view project list
- ✅ Sub can view "My Tasks" (filtered to their tasks)
- ✅ Sub can view task details
- ✅ Sub can start/complete tasks
- ✅ Sub can upload progress photos
- ✅ Sub receives push notifications
- ✅ App works offline (saves data locally, syncs later)
- ✅ App is dead-simple (no training required)

**Priority**: P0 (Must have for MVP)

---

### Requirement R6: Owner Dashboard (Read-Only)

**User Story**: As a project owner, I want to view project progress in real-time so that I can verify progress without visiting site.

**Scenario**: Owner logs into web dashboard, views project progress.

**Functional Behavior**:
- Owner receives invitation link from GC (read-only access)
- Owner clicks link, creates account (free)
- Owner logs into web dashboard
- Owner sees project list (projects they have access to)
- Owner clicks on project
- Owner sees project overview:
  - Overall progress (percent complete)
  - Schedule status (on schedule / behind / ahead)
  - Milestones (foundation, framing, electrical, plumbing, etc.)
  - Recent activity (task completions, photo uploads)
- Owner clicks on milestone, views progress photos
- Owner can share dashboard link with investors/partners

**Data/Field Changes**:
- Owner record: project_id, user_id, access_level (enum: read_only), invited_at (timestamp)

**Edge Cases**:
- Owner doesn't receive invitation: GC can resend invitation
- Owner loses access: GC can revoke access
- Owner wants to comment on progress: Owner can send message to GC (but can't edit project)

**Acceptance Criteria**:
- ✅ Owner can access dashboard via invitation link
- ✅ Owner can view project overview (progress, schedule, milestones)
- ✅ Owner can view progress photos
- ✅ Owner can view recent activity
- ✅ Owner can share dashboard link
- ✅ Owner has read-only access (can't edit project)

**Priority**: P1 (Should have for MVP, but can be added later if needed)

---

### Requirement R7: Automated Notifications

**User Story**: As a GC, I want subs to receive automated notifications for schedule changes, task assignments, and reminders so that I don't have to call/text them manually.

**Scenario**: GC updates schedule. System sends notification to affected subs.

**Functional Behavior**:
- GC updates schedule (or assigns task to sub)
- System detects change
- System sends notification to affected subs:
  - Push notification (if app installed)
  - SMS (if push not available)
  - Email (backup)
- Notification includes:
  - Project name
  - Change description (schedule updated, task assigned, reminder)
  - Link to app (for push/SMS) or dashboard (for email)
- Sub receives notification, opens app, views change

**Data/Field Changes**:
- Notification record: sub_id, project_id, notification_type (enum: schedule_updated, task_assigned, reminder), sent_at (timestamp), delivery_method (enum: push, sms, email), status (enum: sent, delivered, failed)

**Edge Cases**:
- Sub doesn't have app installed: System sends SMS + email
- Sub opts out of notifications: System respects opt-out (except critical notifications)
- Notification delivery fails: System retries 3 times, then logs error

**Acceptance Criteria**:
- ✅ System sends push notifications for schedule changes
- ✅ System sends SMS if push not available
- ✅ System sends email as backup
- ✅ Notification includes project name, change description, link
- ✅ Sub receives notification within 5 minutes of change
- ✅ System respects opt-out preferences

**Priority**: P0 (Must have for MVP)

---

## 9. Data and Permission Requirements

### Data Model

#### Company
- id (UUID)
- name (string)
- type (enum: gc, sub, owner)
- address (string)
- phone (string)
- email (string)
- created_at (timestamp)

#### User
- id (UUID)
- company_id (UUID, FK)
- email (string, unique)
- name (string)
- role (enum: admin, project_manager, viewer, sub, owner)
- phone (string)
- created_at (timestamp)
- last_login (timestamp)

#### Project
- id (UUID)
- gc_company_id (UUID, FK)
- name (string)
- address (string)
- start_date (date)
- end_date (date)
- status (enum: planning, active, completed, on_hold)
- schedule_data (JSON)
- created_at (timestamp)
- updated_at (timestamp)

#### Subcontractor Assignment
- id (UUID)
- project_id (UUID, FK)
- sub_company_id (UUID, FK)
- trade (enum: electrical, plumbing, hvac, framing, concrete, roofing, other)
- assigned_at (timestamp)

#### Task
- id (UUID)
- project_id (UUID, FK)
- sub_id (UUID, FK, nullable)
- name (string)
- description (text)
- start_date (date)
- end_date (date)
- duration (number)
- dependencies (JSON array)
- milestone (boolean)
- status (enum: not_started, in_progress, complete, approved, rework_requested)
- percent_complete (number)
- started_at (timestamp)
- completed_at (timestamp)
- approved_at (timestamp)
- photo_url (string)
- created_at (timestamp)
- updated_at (timestamp)

#### Photo
- id (UUID)
- task_id (UUID, FK)
- photo_url (string)
- uploaded_by (UUID, FK)
- uploaded_at (timestamp)

#### Notification
- id (UUID)
- user_id (UUID, FK)
- project_id (UUID, FK)
- notification_type (enum: schedule_updated, task_assigned, reminder, conflict_detected)
- message (text)
- delivery_method (enum: push, sms, email)
- status (enum: sent, delivered, failed)
- sent_at (timestamp)

#### Conflict
- id (UUID)
- project_id (UUID, FK)
- task_ids (JSON array)
- conflict_type (enum: space, equipment, dependency)
- description (text)
- resolution (JSON)
- detected_at (timestamp)
- resolved_at (timestamp)

### Permission Matrix

| Action | GC Admin | GC PM | GC Viewer | Sub | Owner |
|--------|----------|-------|-----------|-----|-------|
| Create/edit projects | ✅ | ✅ | ❌ | ❌ | ❌ |
| Manage subs | ✅ | ✅ | ❌ | ❌ | ❌ |
| View all projects | ✅ | ✅ (assigned) | ✅ (assigned) | ❌ | ❌ |
| View sub progress | ✅ | ✅ | ✅ | ❌ | ✅ |
| Update task status | ❌ | ❌ | ❌ | ✅ (own tasks) | ❌ |
| Upload photos | ❌ | ❌ | ❌ | ✅ | ❌ |
| Approve tasks | ✅ | ✅ | ❌ | ❌ | ❌ |
| View schedule | ✅ | ✅ | ✅ | ✅ (own tasks) | ✅ |
| Update schedule | ✅ | ✅ | ❌ | ❌ | ❌ |
| Send notifications | ✅ | ✅ | ❌ | ❌ | ❌ |
| Invite owners | ✅ | ✅ | ❌ | ❌ | ❌ |

### Data Security
- **Encryption at rest**: All data encrypted at rest (AES-256)
- **Encryption in transit**: All data encrypted in transit (TLS 1.3)
- **Access control**: Role-based access control (RBAC) enforced at API level
- **Audit trail**: All actions logged with user_id, timestamp, action_type
- **Data retention**: Data retained for 7 years after project completion (construction industry standard)
- **Backup**: Daily backups, 30-day retention

---

## 10. Acceptance Criteria

### Happy Path
- ✅ GC creates project, imports schedule, invites subs
- ✅ Subs download app, join project, receive schedule
- ✅ Sub starts task, completes task, uploads photo
- ✅ GC receives notification, views photo, approves task
- ✅ GC updates schedule, system syncs to subs
- ✅ Subs receive notification, view updated schedule
- ✅ Owner views project dashboard, sees progress and photos

### Primary Error Path
- ✅ Schedule import fails: System shows error, allows manual schedule creation
- ✅ Photo upload fails: System allows retry, saves photo locally
- ✅ Sub doesn't have internet: App saves data locally, syncs later
- ✅ Sub doesn't download app: System sends reminder SMS, GC can call sub
- ✅ Notification delivery fails: System retries 3 times, logs error

### Permission/Edge Path
- ✅ Sub tries to access another sub's tasks → Access denied
- ✅ Sub tries to edit project schedule → Read-only access enforced
- ✅ Owner tries to edit project → Read-only access enforced
- ✅ User tries to view project they're not assigned to → Access denied

### Data Consistency Path
- ✅ Schedule sync fails: System queues sync, retries when connection restored
- ✅ Photo upload corrupted: System validates photo, rejects corrupted files
- ✅ Task status inconsistent: System validates status transitions (not_started → in_progress → complete)

### Observability/Audit Requirement
- ✅ All user actions logged with user_id, timestamp, action_type
- ✅ All data changes logged with before/after values
- ✅ Audit trail accessible to GC admins
- ✅ System metrics monitored (uptime, response time, error rate)
- ✅ Notification delivery tracked (sent, delivered, failed)

---

## 11. Rollout and Changelog Notes

### Rollout Strategy

#### Phase 1: Beta (Months 1-3)
- **Target**: 10 beta GCs (managing 50+ subs total)
- **Features**: Core schedule sync, progress tracking, photo upload, notifications
- **Goal**: Validate sub adoption, gather feedback, iterate
- **Success criteria**: 80% sub adoption, 70% GC satisfaction

#### Phase 2: General Availability (Months 4-6)
- **Target**: 50 GCs
- **Features**: Add schedule conflict detection, owner dashboard
- **Goal**: Scale customer base, refine onboarding
- **Success criteria**: 50 GCs live, 80% satisfaction

#### Phase 3: Growth (Months 7-12)
- **Target**: 100 GCs
- **Features**: Add advanced analytics, API for third-party integrations
- **Goal**: Expand feature set, increase ARPU
- **Success criteria**: $2M ARR at 12 months

### Changelog

#### v1.0 (Beta)
- Schedule import (Microsoft Project, Excel, CSV)
- Two-way schedule sync
- Progress tracking (task status, percent complete)
- Progress photo upload
- Subcontractor mobile app (iOS, Android)
- Automated notifications (push, SMS, email)
- GC web dashboard

#### v1.1
- Schedule conflict detection
- Owner dashboard (read-only)
- In-app messaging
- @mentions in comments
- Activity feed

#### v2.0
- Advanced analytics (predictive scheduling, resource optimization)
- API for third-party integrations
- Custom workflow builder
- Multi-language support (Spanish)
- Offline-first mobile app

---

## 12. Risks and Open Questions

### Risks

#### User Experience Risk
- **Risk**: Subs may not adopt tool even if free (resistance to change, tech literacy)
- **Mitigation**: Make app dead-simple (no training required); GC mandates adoption; provide phone support for subs
- **Owner**: Product Manager

#### Technical Feasibility Risk
- **Risk**: Schedule import may not work reliably for all Microsoft Project / Excel formats
- **Mitigation**: Test with wide variety of schedule formats; provide manual schedule creation fallback
- **Owner**: Engineering Lead

#### Network Effect Risk
- **Risk**: Chicken-and-egg problem — GCs won't adopt without subs, subs won't adopt without GCs
- **Mitigation**: Start with GCs (paying customers); require sub adoption as condition of project participation; leverage sub referrals to acquire new GCs
- **Owner**: Sales / Product Manager

#### Competitive Risk
- **Risk**: Procore may build lightweight sub coordination tool
- **Mitigation**: Move fast, build strong network effects, focus on sub experience (Procore's weakness)
- **Owner**: Product Manager

#### Pricing Risk
- **Risk**: GCs may resist $500-$2,000/month pricing
- **Mitigation**: Demonstrate clear ROI (70% reduction in coordination time = 10+ hours/week saved = $500+/week value); offer free trial
- **Owner**: Product Manager / Sales

### Open Questions

1. **Sub adoption rate**: Will subs actually download and use the app? What's the expected adoption rate?
   - **Decision needed**: Product Manager to conduct user research with 20 subs
   - **Deadline**: Before beta launch

2. **Schedule import accuracy**: How accurate is schedule import from Microsoft Project / Excel? What's the error rate?
   - **Decision needed**: Engineering Lead to conduct feasibility study with sample schedules
   - **Deadline**: Before beta launch

3. **Pricing validation**: Is $500-$2,000/month the right pricing? Will GCs pay this?
   - **Decision needed**: Product Manager to conduct pricing research with 10 GCs
   - **Deadline**: Before GA launch

4. **Network effect strength**: How strong are network effects? Will subs recommend SubSync to other GCs?
   - **Decision needed**: Product Manager to track sub referrals during beta
   - **Deadline**: During beta (Months 1-3)

5. **Conflict detection accuracy**: How accurate is schedule conflict detection? What's the false positive rate?
   - **Decision needed**: Engineering Lead to conduct feasibility study
   - **Deadline**: Before v1.1 launch

---

## Appendix

### Competitive Analysis (Detailed)

#### Procore
- **Pricing**: $15K-$80K+/yr
- **Target**: Mid-to-large GCs, ENR top 400
- **Strengths**: Industry standard, broadest feature set, strong compliance
- **Weaknesses**: "Unrealistic for smaller-mid sized GCs"; subs refuse to use it
- **Our advantage**: 10x cheaper, subs actually use it, mobile-first, dead-simple

#### Autodesk Construction Cloud
- **Pricing**: Custom, $25-$65+/user/mo
- **Target**: Design-to-build enterprise
- **Strengths**: Strong BIM/design integration
- **Weaknesses**: Complex; poor subcontractor adoption
- **Our advantage**: Subs actually use it, simpler, cheaper

#### SimplySub
- **Pricing**: Early-stage startup
- **Target**: Subcontractor scheduling
- **Strengths**: Lightweight, focused on scheduling
- **Weaknesses**: Scheduling-only, early stage, limited features
- **Our advantage**: More comprehensive (schedule + progress + photos + communication)

#### Shyft
- **Pricing**: Workforce management
- **Target**: Workforce scheduling
- **Strengths**: Good for workforce management
- **Weaknesses**: Not focused on sub coordination, limited construction-specific features
- **Our advantage**: Construction-specific, focused on GC-sub coordination

#### PlanGrid (Autodesk)
- **Pricing**: $19-$39/user/mo
- **Target**: Field teams
- **Strengths**: Good for drawings/RFI
- **Weaknesses**: Not focused on sub coordination
- **Our advantage**: Focused on sub coordination, not just drawings

### Market Sizing

#### TAM (Total Addressable Market)
- **US GCs managing 5+ subs**: 50,000+ companies
- **Avg. revenue per customer**: $20K/year
- **TAM**: 50,000 × $20K = **$1B/year**

#### SAM (Serviceable Addressable Market)
- **GCs managing 5-50 subs**: 30,000 companies
- **SAM**: 30,000 × $20K = **$600M/year**

#### SOM (Serviceable Obtainable Market)
- **Target**: 1% of SAM in 3 years = 300 customers
- **SOM**: 300 × $20K = **$6M/year**

### User Research Quotes

> "I spend 20 hours a week just coordinating subs. Phone calls, texts, emails, Excel. It's insane." — GC Project Manager, $20M annual revenue

> "Procore is too expensive and my subs won't use it. They're small businesses. They don't want to pay for or learn complex software." — GC Owner, $10M annual revenue

> "I just want a simple app to see my schedule and update progress. I don't want to pay for it. I don't want to learn how to use it." — Electrical Subcontractor, 10 employees

> "I have to drive to site every day to check progress. If I could see progress photos in real-time, I'd save hours every week." — GC Project Manager, $30M annual revenue

> "Schedule conflicts are the worst. We show up to site and another sub is already there. We can't work. We lose a whole day." — Plumbing Subcontractor, 15 employees

---

**Document Version**: 1.0  
**Last Updated**: September 12, 2026  
**Author**: pm-bajaji  
**Status**: Draft for Review
