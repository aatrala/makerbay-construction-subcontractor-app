---
document_type: Product Specification Sheet
version: 1.0
date: September 11, 2026
status: Draft
author: Product Team
confidentiality: Internal
---

# Product Spec Sheet: Construction Accounting SaaS for Subcontractors

---

## Document Info Block

| Field | Detail |
|---|---|
| **Product Name** | **BuildBooks** (working title) |
| **Version** | 1.0 |
| **Date** | September 11, 2026 |
| **Status** | Draft |
| **Author** | Product Team |

---

## 1. Product Overview

| Attribute | Detail |
|---|---|
| **Product Name** | **BuildBooks** (working title) |
| **Positioning Statement** | Cloud accounting purpose-built for construction subcontractors -- job costing, prevailing wage payroll, AIA billing, and WIP reporting without fighting QuickBooks. |
| **Target User** | Specialty trade subcontractors (electrical, plumbing, HVAC, concrete, framing, roofing, drywall, painting, and similar trades) with $2M-$50M annual revenue. |
| **Market Size** | 750,000+ construction subcontracting firms in the US. |
| **Core Value Proposition** | Stop fighting QuickBooks for construction-specific accounting. Get job costing, prevailing wage payroll, AIA billing, and WIP reporting built for how subs actually work. |

### What Makes This Different

- **Job costing by phase** -- every dollar and hour tracked to a job, cost code, and phase in real time, not reconstructed in spreadsheets at month-end
- **Prevailing wage payroll** -- Davis-Bacon and state rates, certified payroll reports, and fringe calculations built into the payroll engine
- **AIA billing native** -- G702/G703 pay applications generated from the schedule of values, not hand-built in Word
- **WIP reporting** -- over/under billing and profit fade visible on demand, in formats bonding companies and banks accept

---

## 2. Problem Statement

### The Core Problem

Construction subcontractors in the $2M-$50M range are trapped between two unacceptable options:

1. **Status quo -- QuickBooks plus workarounds**: QuickBooks does not understand construction accounting. There is no native job costing by phase, no prevailing wage calculation, no AIA billing format, and no WIP schedule. Subs patch the gaps with spreadsheets for job costing, a separate payroll service for prevailing wage, and Word templates for AIA pay applications -- and nothing ever reconciles.
2. **Existing construction accounting software**: Foundation, Viewpoint/Spectrum, and Sage 300 CRE are built for general contractors ($50M+) and enterprises. They are overpriced, overly complex, Windows-centric, and carry 6-12 month implementations -- a $10M electrical contractor is too big for QuickBooks and too small for enterprise tools.

### Evidence of the Gap

- **Reddit -- "Best alternatives to QuickBooks" (98 upvotes, 146 comments)**: Construction business owners actively looking for something else; the comment thread is a running list of unmet needs.
- Month-end close takes **2-3 weeks** for a typical mid-size sub, and job cost reports are always behind -- profit problems are discovered at close-out, when nothing can be done.
- Certified payroll on public works projects is a recurring nightmare: manual WH-347 forms, classification tracking, and fringe calculations across jurisdictions and rate tables.
- Bonding companies and banks require WIP schedules that QuickBooks cannot produce; CPAs rebuild them manually each quarter at $2-5K/yr in additional fees.

### Key Pain Points (Ranked by Severity)

| Rank | Pain Point | Frequency | Current Workaround |
|---|---|---|---|
| 1 | Job cost reports always behind; losses discovered too late | Weekly / monthly | Spreadsheets rebuilt from QB exports |
| 2 | Certified payroll for public works (Davis-Bacon and state PW) | Every pay period on PW jobs | Separate payroll service or manual WH-347 |
| 3 | AIA pay applications required by GCs | Monthly | Word/Excel templates with manual math |
| 4 | Month-end close takes 2-3 weeks | Monthly | Manual reconciliation across 3+ systems |
| 5 | No WIP schedule for bonding companies and banks | Quarterly | CPA-built spreadsheet |
| 6 | Committed costs (POs, subcontracts) invisible until invoices arrive | Ongoing | Mental notes and inbox archaeology |

---

## 3. Target Users / Ideal Customer Profile (ICP)

### Primary ICP: The Mid-Size Specialty Sub

- **Electrical, plumbing, HVAC, and concrete subcontractors**
- $5M-$30M annual revenue, 20-100 employees
- Mix of private work and public works (prevailing wage) jobs
- Accounting run by owner/controller with 1-3 staff; no IT department

### Secondary ICP: Other Specialty Trades

- Roofing, drywall, painting, framing, and other specialty trade subcontractors
- $2M-$15M revenue, 5-50 employees
- Heavy AIA billing exposure working for commercial GCs

### Tertiary ICP: Self-Perform GCs

- General contractors with meaningful self-perform work who need sub-level job costing
- Run self-perform divisions on BuildBooks alongside existing GC project management tools

### User Persona

- **Role**: Owner/Controller or Operations Manager who handles accounting
- **Not a trained accountant**: knows construction, learns software fast, resents systems built for accountants
- **Decision style**: buys from peers and trusted advisors (CPA, surety agent, other subs), not from ads
- **Day-to-day**: juggles estimating, billing, payroll, and keeping the GC happy -- accounting happens at night

### Buying Triggers (Events That Drive Purchase)

| Trigger | Emotional State | Timing |
|---|---|---|
| Lost money on a job due to poor cost tracking | Angry, determined to fix it | Job close-out |
| Failed (or nearly failed) certified payroll audit | Fearful of penalties or debarment | After audit letter |
| GC requires AIA pay apps to keep getting paid | Urgent, transactional | Contract award |
| Growing too fast for spreadsheets | Overwhelmed | Hiring spree / revenue jump |
| Bonding company demands better WIP reporting | Anxious about bonding capacity | Bond renewal or line increase |
| CPA pushes back on messy books at tax time | Frustrated, motivated | Q1 / tax season |

### Current Spend and Willingness to Pay

- **$300-800/mo** on QuickBooks + payroll service + workaround tools
- **$2-5K/yr** in extra CPA fees cleaning up messy books and rebuilding WIP schedules
- **Willingness to pay**: $99-299/mo if the tool replaces the workarounds and catches even one cost overrun per year

---

## 4. Feature Specification

### 4.1 Core Features (MVP -- Month 1-3)

#### A. Job Costing

| Capability | Description |
|---|---|
| Project setup | Job name, number, GC/customer, contract amount, start/end dates |
| Cost codes | CSI MasterFormat or fully custom cost code structure |
| Phase tracking | Break jobs into phases (rough-in, trim, finish, etc.) |
| Cost types | Labor, material, equipment, subcontract, other |
| Budget vs. actual | Comparison per cost code and per phase |
| Real-time job cost reports | Costs post to jobs as entered -- not reconstructed at month-end |
| Change order tracking | Approval workflow; contract and budget update on approval |
| Committed costs | Purchase orders and subcontracts tracked against actual costs |
| Job profitability dashboard | Margin per job, per phase, per cost type |

#### B. Time Tracking & Labor Allocation

| Capability | Description |
|---|---|
| Mobile time entry | Crew-based or individual entry from the field |
| Job and phase assignment | Every hour allocated to a job and phase at entry time |
| GPS location verification | Clock in at the job site; location stamped on the entry |
| Overtime allocation | Overtime hours distributed across multiple jobs |
| Labor burden calculation | Taxes, insurance, and benefits computed per hour |
| Certified payroll data export | WH-347-compatible time data by classification |
| Field integrations | Raken, BusyBusy, ClockShark import (MVP) |

#### C. Prevailing Wage Payroll

| Capability | Description |
|---|---|
| Davis-Bacon Act compliance | Federal prevailing wage calculations for federally funded work |
| State prevailing wage rates | State rate tables, auto-updated as revisions publish |
| Fringe benefit credit calculations | Fringe paid as cash or credited to bona fide benefit plans |
| Certified payroll reports | WH-347 and state-equivalent form generation |
| Multi-rate payroll | Different rates for different job types and classifications |
| Prevailing wage audit trail | Rates used, hours by classification, fringes applied -- per pay period |
| Intent to Pay documents | Intent to Pay Certified Payroll generation for agencies |

#### D. AIA Billing (Pay Applications)

| Capability | Description |
|---|---|
| G702/G703 generation | Pay applications in standard AIA format with PDF output |
| Schedule of values management | Line items managed per contract; carry across applications |
| Stored materials billing | Billing for materials stored on site or in a warehouse |
| Retainage tracking | Accrued, released, and remaining retainage per job |
| Percentage-of-completion billing | Billing driven by cost-to-cost or manual percent complete |
| Previous applications | Prior application amounts auto-populated |
| GC/owner approval workflow | Review and approval status tracked per application |
| Lien waiver generation | Conditional and unconditional waivers tied to pay apps |

#### E. Financial Management

| Capability | Description |
|---|---|
| Accounts payable | Vendor bills, purchase orders, 3-way matching |
| Accounts receivable | Invoicing, payment tracking, aging reports |
| General ledger | Construction-specific chart of accounts |
| Bank reconciliation | Feed-connected matching and monthly reconciliation |
| Multi-entity support | Multiple companies/DBAs under one login |
| Financial statements | Balance sheet, P&L, cash flow in construction formats |

#### F. WIP (Work in Progress) Reporting

| Capability | Description |
|---|---|
| WIP schedule | Contract amount, billed to date, costs to date, percent complete, over/under billing |
| WIP aging | How long each job has been in progress |
| Earned vs. billed revenue | Analysis per job of revenue earned against amounts billed |
| Profit fade/gain tracking | Margin movement across the life of each job |
| Bonding-ready export | WIP report exportable in formats bonding companies and banks accept |

---

### 4.2 Phase 2 Features (Month 4-6)

#### G. Purchase Orders & Commitments

| Capability | Description |
|---|---|
| PO creation | Purchase orders created directly from job cost budgets |
| PO approval workflow | Configurable approval chains by amount |
| Receipt matching | PO -> receipt -> invoice, 3-way match |
| Commitment tracking | Open commitments visible in job cost reports |
| Subcontract management | Sub-subcontractors, insurance certificates, lien waivers |
| Material tracking | Order -> delivery -> job site chain |

#### H. Equipment Management

| Capability | Description |
|---|---|
| Equipment inventory | Asset register with depreciation schedules |
| Rate tracking | Internal charge rates for cost recovery |
| Equipment allocation | Allocation to jobs at daily/weekly rates |
| Maintenance | Scheduling and cost tracking per asset |
| Utilization reports | Charge-out revenue vs. ownership cost per machine |

#### I. Project Management Integration

| Capability | Description |
|---|---|
| Procore sync | Commitments, change orders, daily logs |
| PlanGrid/Buildertrend | Integration for schedules and billing status |
| Document management | Contracts, specs, RFIs, submittals stored per job |
| Photo documentation | Photos linked to job cost entries |
| Daily log integration | Field daily report data flows into job costing |

#### J. Mobile App Enhancements

| Capability | Description |
|---|---|
| Offline time entry | Time and expense capture without connectivity |
| Photo-to-expense workflow | Snap a receipt or material delivery; it becomes an expense entry |
| Daily reporting | Field crews submit daily reports from the job site |
| Foreman approval workflows | Foreman approves crew time before it hits payroll |
| Push notifications | Approval requests and over-budget alerts |

---

### 4.3 Phase 3 Features (Month 7-12)

#### K. Bonding & Banking Relationships

| Capability | Description |
|---|---|
| Bonding company portal | Read-only surety access to WIP, financials, job schedules |
| Bank covenant reporting | Automated financial package generation |
| Surety relationship management | Track surety contacts, capacity, and requirements |
| Construction-format statements | Financial statements in construction-specific formats |

#### L. Multi-State Compliance

| Capability | Description |
|---|---|
| Job-location withholding | State tax withholding by job location, not just residence |
| Reciprocity state handling | Automatic reciprocal state tax treatment |
| State PW tables and forms | State-specific prevailing wage tables and certified payroll forms |
| Multi-state SUTA | Multi-state unemployment tax calculations |
| Local tax jurisdictions | City/county occupational and local tax handling |

#### M. Estimating Integration

| Capability | Description |
|---|---|
| Estimate import | Sage Estimating, ProEst, STACK |
| Estimate-to-budget conversion | Awarded estimates become job budgets automatically |
| Bid-to-budget-to-actual | Comparison per cost code across the job lifecycle |
| Historical cost data | Actual costs feed future estimating |
| Bid tracking | Win rate and bid history by customer and job type |

#### N. Advanced Analytics

| Capability | Description |
|---|---|
| Job performance prediction | Flags jobs trending toward profit fade before it lands |
| Crew productivity analysis | Units installed vs. hours, by crew, over time |
| Vendor/subcontractor scoring | Performance scoring from actual delivery data |
| Cash flow forecasting | Forecast from WIP, AR, AP, and billing schedules |
| Benchmarking | Margin comparison across job types, sizes, and GCs |

---

## 5. Technical Architecture

### 5.1 Recommended Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend (Web)** | React (Next.js) | Dashboard for owners/controllers; server-side rendering for marketing pages |
| **Frontend (Mobile)** | React Native | Field time entry, approvals, and photo capture on iOS and Android |
| **Backend** | Node.js (NestJS) or .NET | .NET favored for complex payroll calculations and compliance math |
| **Database** | PostgreSQL | Primary store; partitioned tables for time entries and transactions |
| **Payroll Engine** | Dedicated microservice | Prevailing wage calculations isolated for testability and audit |
| **Caching/Queues** | Redis | Job queues for payroll runs, reports, and integrations |
| **File Storage** | AWS S3 | Pay apps, certified payroll PDFs, lien waivers, receipts |
| **Hosting** | AWS (US-only regions) | Compliance-sensitive payroll data requires US-only hosting |
| **Auth** | Auth0 or Azure AD | Enterprise SSO (SAML/OIDC), multi-tenant, role-based access |

### 5.2 Key Integrations

| Integration | Purpose | Provider | Phase |
|---|---|---|---|
| Procore | Project management sync | Procore API | Phase 2 |
| Raken/BusyBusy/ClockShark | Field time tracking import | Direct API | MVP |
| ADP/Paychex | Payroll processing export | File export or API | MVP |
| QuickBooks | Data migration from QB | QBO API | MVP |
| Sage Estimating/ProEst | Estimate import | File import or API | Phase 3 |
| Buildertrend | Project management sync | API | Phase 2 |
| IRS/State agencies | Certified payroll submission | E-file where available | Phase 2 |

### 5.3 Data Model (Core Entities)

```
Company (multi-entity support)
  |-- Project/Job (contract, GC, dates, location, type, status)
  |     |-- CostCode (CSI format, budget, committed, actual)
  |     |     |-- Phase (sub-level of cost code)
  |     |           |-- TimeEntry (employee, job, phase, hours, date, GPS, approved)
  |     |-- ChangeOrder (job, description, amount, status, approval)
  |     |-- PayApplication (AIA G702/703, schedule of values, billing period, retainage)
  |     |-- PurchaseOrder (vendor, job, items, amounts, status)
  |
  |-- Employee (classifications, rates, prevailing wage rates by jurisdiction)
  |-- PayrollRun (period, employees, gross, taxes, fringes, net, certified flag)
  |-- Vendor (subcontractors, material suppliers)
  |-- Equipment (asset, rate, depreciation, maintenance)
```

**Entity Relationships:**
- One Company has many Projects; one account may hold multiple Companies (multi-entity)
- One Project has many CostCodes; each CostCode has many Phases
- One TimeEntry belongs to one Employee, one Job, and one Phase
- One PayrollRun aggregates TimeEntries per period with certified (prevailing wage) flags
- One Project has many PayApplications, each referencing a Schedule of Values
- One Project has many ChangeOrders and PurchaseOrders
- Vendors supply PurchaseOrders; Equipment charges post to Jobs as costs

### 5.4 Security & Compliance

| Area | Approach |
|---|---|
| **SOC 2** | Type I at launch; Type II required for bonding company relationships |
| **SSO** | SAML/OIDC via Auth0 or Azure AD (enterprise SSO) |
| **Payroll data encryption** | AES-256 at rest; TLS 1.3 in transit |
| **Role-based access** | Owner, controller, PM, foreman, field worker |
| **Audit trail** | All financial transactions logged (who, what, when, before/after) |
| **Backups & DR** | Daily backups with tested disaster recovery -- payroll data is critical |
| **Data residency** | US-only hosting and data residency |

---

## 6. Pricing Strategy

### 6.1 Pricing Tiers

| Tier | Revenue Range | Monthly Price | Annual (Save 15%) | Features |
|---|---|---|---|---|
| **Starter** | $2M-$5M | $99/mo | $84/mo | Job costing, time tracking, basic financials, WIP reports, up to 25 employees |
| **Professional** | $5M-$15M | $199/mo | $169/mo | Everything in Starter + prevailing wage payroll, AIA billing, PO management, up to 75 employees |
| **Enterprise** | $15M-$50M | $299/mo | $254/mo | Everything in Professional + multi-entity, equipment management, Procore integration, bonding portal, unlimited employees |
| **Custom** | $50M+ | Custom | Custom | Multi-state compliance, estimating integration, dedicated support, custom integrations |

> **Note**: Free 30-day trial on all tiers with sample construction data pre-loaded.

### 6.2 Add-on Pricing

| Add-on | Price | Notes |
|---|---|---|
| Additional employees | $2/employee/mo | Beyond tier limits |
| Certified payroll processing | $49/mo | Full payroll processing (not just export) |
| Multi-entity | $79/entity/mo | Additional companies under the same account |
| Bonding portal access | $49/mo | Dedicated portal for surety/banker access |
| Historical data migration | $500-2,000 one-time | Professional services for QB data migration |

### 6.3 Pricing Rationale

| Factor | Analysis |
|---|---|
| **Enterprise alternative** | Foundation/Sage 300 CRE run $1,000-5,000/mo plus implementation -- out of reach for a $10M sub |
| **Status quo cost** | QuickBooks + workarounds cost $300-800/mo in tools plus $2-5K/yr in CPA clean-up |
| **Our wedge** | $99-299/mo is a clear upgrade from QB workarounds and dramatically cheaper than enterprise construction accounting |
| **Value anchor** | One job saved from cost overrun (caught early by job costing) pays for years of subscription |
| **Trial strategy** | Free 30-day trial with sample construction data |
| **Annual incentive** | 15% annual discount improves cash flow and reduces churn |

### 6.4 Revenue Model (Conservative)

| Month | Paying Customers | Avg Plan | MRR | ARR |
|---|---|---|---|---|
| 6 | 30 | $165 | $4,950 | $59,400 |
| 12 | 150 | $185 | $27,750 | $333,000 |
| 18 | 500 | $200 | $100,000 | $1,200,000 |
| 24 | 1,200 | $215 | $258,000 | $3,096,000 |

---

## 7. Go-to-Market Strategy

### 7.1 Launch Channels

| Channel | Approach | Priority |
|---|---|---|
| **Industry associations** | NECA, ASA, MCAA, ABC -- sponsorships, chapter demos, member discounts | High |
| **LinkedIn ads** | Targeted to construction controllers, owners, and operations managers | High |
| **Trade publications** | Construction Dive, ENR, Construction Executive | Medium |
| **QB user communities** | Facebook groups and forums for QuickBooks construction users | High |
| **Surety referrals** | Bonding companies want better financial reporting from their contractors | High |
| **Construction CPAs** | Referral partnerships with CPA firms specializing in construction | High |
| **Reddit** | r/Construction, r/electricians, r/Plumbing -- authentic participation, not ads | Medium |

### 7.2 Growth Loops

**Loop 1 -- GC Loop**
> GCs require subs to submit AIA pay apps and financial documentation -> subs adopt BuildBooks to produce them -> subs recommend it to other subs working for the same GC.

**Loop 2 -- Bonding Loop**
> Bonding companies require WIP reports -> contractors adopt BuildBooks for bonding-ready reporting -> surety agents recommend it across their book of contractors.

**Loop 3 -- CPA Loop**
> Construction CPAs receive clean books and WIP schedules -> they recommend BuildBooks to every messy-books client -> CPAs become a durable referral channel.

### 7.3 Key Metrics to Track

| Metric | Target (Month 6) | Target (Month 12) | Target (Month 18) |
|---|---|---|---|
| Paying customers | 30 | 150 | 500 |
| MRR | $4,950 | $27,750 | $100,000 |
| Monthly churn | <5% | <3% | <2.5% |
| NPS | >50 | >60 | >65 |
| QB migration success rate | 85% | 95% | 98% |

---

## 8. Competitive Landscape

### 8.1 Competitor Comparison

| Competitor | Target | Pricing | Strengths | Weaknesses |
|---|---|---|---|---|
| **Foundation Software** | GC/Sub $20M+ | $1,000-2,500/mo | Deep construction accounting, strong brand | Expensive, complex, Windows-centric, long implementation |
| **Sage 300 CRE** | GC/Large sub | $1,500-5,000/mo | Industry standard, comprehensive | Very expensive, requires IT staff, 6-12 month implementation |
| **Viewpoint Spectrum** | Enterprise | $2,000-5,000/mo | Full ERP, strong job costing | Enterprise pricing, complex |
| **QuickBooks + spreadsheets** | Everyone | $30-300/mo | Familiar, cheap | No job costing, no prevailing wage, no AIA billing, no WIP |
| **Knowify** | Small subs | $149-399/mo | Simple, some construction features | Limited accounting, no payroll, no WIP |
| **BuildBooks (Ours)** | **Subcontractors** | **$99-299/mo** | **Purpose-built for subs, prevailing wage, AIA billing, WIP, affordable** | **New entrant, no brand yet** |

### 8.2 Competitive Positioning Map

```
                    Simple                          Complex
                    ^                                 ^
                    |                                 |
   Low Price  ------|---- QuickBooks + spreadsheets --|------ BuildBooks (target)
                    |                                 |
                    |             Knowify              |
                    |                                 |
   High Price ------|                                 |------ Foundation
                    |                                 |       Sage 300 CRE
                    |                                 |       Viewpoint Spectrum
```

### 8.3 Competitive Wedge -- How We Win

| Advantage | Explanation |
|---|---|
| **Purpose-built for subcontractors** | Existing tools are built for general contractors. Subs have different workflows: AIA pay apps, sub-subcontractors, prevailing wage on public work. |
| **Prevailing wage payroll built-in** | A huge pain point with no good SaaS solution; certified payroll is table stakes for any sub doing public work. |
| **AIA billing native** | G702/G703 generation is a core object in the data model, not a bolt-on report template. |
| **Bonding-grade WIP reporting** | WIP reports formatted the way bonding companies and banks actually accept. |
| **Price point** | $99-299/mo makes sense for a $5M electrical contractor -- not $2,000/mo enterprise pricing. |

---

## 9. Risk Assessment

| # | Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|---|
| 1 | **Payroll compliance errors** | Medium | Very High | Partner with a payroll processing expert; extensive testing; compliance insurance |
| 2 | **QB migration complexity** | High | High | Professional migration service; automated import tools; 30-day parallel run |
| 3 | **Long sales cycles** (construction is relationship-based) | High | Medium | Industry partnerships; CPA/surety referral channel; free pilot program |
| 4 | **Prevailing wage rate table maintenance** | High | Medium | Data subscription with state/federal agencies; community-contributed rates with verification |
| 5 | **Multi-state tax complexity** | High | High | Phase state rollout; start with top 15 construction states; partner with multi-state tax specialists |
| 6 | **Competitor response** (Intuit adds construction features) | Low | Very High | Deep niche focus Intuit will not match; community lock-in; data gravity |

### Risk Severity Matrix

```
           Low Impact    Medium Impact      High Impact       Very High Impact
           ----------    -------------      -----------       -----------------
High                     #3 Sales Cycles    #2 QB Migration    #5 Multi-State Tax
Likelihood               #4 PW Rate Tables
Medium                                                        #1 Payroll Compliance
Likelihood
Low                                                           #6 Competitor Response
Likelihood
```

---

## 10. MVP Roadmap

### Month 1-3: Foundation + Core Accounting

| Deliverables | Success Criteria |
|---|---|
| Auth, company setup, construction chart of accounts | Company provisioned with an industry-standard COA in under 10 minutes |
| Job creation, cost codes (CSI format), phases, budgets | A real job with 40+ cost codes and phases fully budgeted |
| Time tracking (mobile + web) with job/phase allocation | Foreman enters time for a 10-person crew in under 5 minutes/day |
| Basic job cost reports (budget vs. actual) | Job cost report matches a manual spreadsheet within 0.5% |
| AP/AR, invoicing, bank reconciliation | A full test month closes in under 2 days |
| QuickBooks data import tool | 85% of a real QB file imports without manual repair |

### Month 3-5: Construction-Specific Features

| Deliverables | Success Criteria |
|---|---|
| Prevailing wage rate tables (federal + top 15 states) | Correct rate auto-applies by job location and classification |
| Certified payroll report generation (WH-347) | WH-347 output passes internal compliance review |
| AIA G702/G703 pay application generation | GC accepts the generated pay app without reformatting |
| Schedule of values management | SOV line items carry correctly across applications |
| Retainage tracking | Retainage balances tie out across all applications |
| WIP schedule/report generation | WIP ties to the GL and passes CPA review |
| Change order tracking with approval workflow | Approved change orders update contract and budget automatically |

### Month 5-6: Launch

| Deliverables | Success Criteria |
|---|---|
| Financial statements (P&L, balance sheet, cash flow) | Statements tie to the GL and pass CPA review |
| Job profitability dashboard | Owner sees per-job margin within two clicks |
| Onboarding wizard with sample data | New account usable in under 60 minutes |
| Landing page and pilot program | 10 pilot subs signed from the target ICP |
| CPA referral program launch | 5 construction CPA firms enrolled as referral partners |

### Month 7-12: Growth

| Deliverables | Success Criteria |
|---|---|
| Procore and Buildertrend integrations | Commitments and change orders sync within 1 hour |
| Equipment management | Equipment hours and charge rates post to job cost |
| Multi-entity support | Shared login across companies with consolidated reporting |
| PO and commitment tracking | Open commitments visible on every job cost report |
| Bonding company portal | Surety accesses WIP and financials read-only, no emailed spreadsheets |
| Mobile app (offline capable) | Foreman enters time with zero connectivity in the field |

---

## Appendix A: Assumptions & Open Questions

### Key Assumptions

1. Mid-size subs will pay $99-299/mo to replace $300-800/mo in fragmented workarounds
2. Prevailing wage payroll is painful enough to be a primary purchase driver, not a nice-to-have
3. QB migration can reach 95%+ automated success for typical sub files (jobs, COA, vendors, open AR/AP)
4. Bonding companies and CPAs will actively refer a tool that makes their contractor clients more organized
5. Federal Davis-Bacon plus the top 15 state prevailing wage programs covers the majority of public works demand at launch

### Open Questions to Validate

1. Build vs. partner for full-service certified payroll processing, given the compliance liability involved?
2. Which 15 states should be prioritized for prevailing wage and certified payroll at launch?
3. Will GCs accept system-generated AIA pay apps at the same rate as manually prepared ones?
4. What is the realistic QB migration failure rate, and what does manual repair cost us per customer?
5. Can surety/bonding referral channels deliver predictable pipeline, or are they opportunistic?

---

## Appendix B: Glossary

| Term | Definition |
|---|---|
| **AIA Billing** | Standardized construction progress billing using AIA G702 (application) and G703 (continuation sheet) documents |
| **G702/G703** | The AIA pay application form (G702) and its continuation sheet with schedule of values detail (G703) |
| **WIP** | Work in Progress -- schedule showing contract value, costs, billings, percent complete, and over/under billing per job |
| **Prevailing Wage** | Government-mandated wage rates (base + fringe) for work on publicly funded construction projects |
| **Davis-Bacon Act** | Federal law requiring prevailing wages on federally funded or assisted construction |
| **Certified Payroll** | Weekly payroll reports (WH-347 or state equivalent) proving wage compliance on public work |
| **WH-347** | The federal certified payroll form used for Davis-Bacon compliance reporting |
| **Cost Code** | A structured code (often CSI MasterFormat) that categorizes costs on a job, such as 26 05 19 low-voltage electrical |
| **Phase** | A subdivision of a job or cost code used for finer tracking (rough-in, trim, finish) |
| **Retainage** | A contract percentage (typically 5-10%) withheld from each payment until project completion |
| **Schedule of Values (SOV)** | The line-item breakdown of a contract that serves as the basis for progress billing |
| **Labor Burden** | The full cost of an hour of labor: wages plus taxes, insurance, and benefits |
| **Committed Costs** | Costs already obligated via purchase orders or subcontracts but not yet incurred |
| **Change Order** | A documented, approved modification to contract scope, price, or schedule |
| **CSI MasterFormat** | The standard classification system for construction specifications and cost codes |
| **GC** | General Contractor -- the firm holding the prime contract with the owner; subs work for GCs |
| **Subcontractor (Sub)** | A specialty trade firm contracted by the GC to perform part of the work |
| **Surety / Bonding** | Company providing bid, performance, and payment bonds; requires contractor financial reporting |
| **Over/Under Billing** | The difference between amounts billed and revenue earned (billings in excess / costs in excess) |
| **Profit Fade** | A decline in job margin over the life of a project -- a red flag bonding companies watch |
| **Percentage of Completion** | Revenue recognition method recognizing income as work progresses rather than at completion |
| **Fringe Benefits** | The benefit portion of a prevailing wage rate, payable in cash or via bona fide plans |
| **ICP** | Ideal Customer Profile -- the target customer segment most likely to buy and retain |
| **MRR / ARR** | Monthly / Annual Recurring Revenue |
| **NPS** | Net Promoter Score -- customer satisfaction metric from -100 to +100 |
| **SOC 2** | Service Organization Control 2 -- security and compliance certification |

---

*End of document. This is a living document and should be updated as market research, user interviews, and technical feasibility assessments provide new data.*
