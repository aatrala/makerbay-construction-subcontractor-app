# PRD: AI-Powered Estimating for Specialty Trades

## 1. Summary

**Product Name**: BidAI (working title)

**One-liner**: AI-powered estimating platform purpose-built for specialty trade contractors that learns from historical bid data, auto-generates line items from plans/specs, pulls real-time material pricing, and reduces estimating time by 75% while boosting accuracy to 97%.

**Target Users**:
- **Primary**: Estimators and project managers at specialty trade contractors (electrical, plumbing, HVAC, fire protection) with $2M-$50M revenue
- **Secondary**: Trade contractors preparing bids for projects ranging from $50K to $5M
- **Tertiary**: Trade contractors transitioning from spreadsheets to modern estimating software

**Core Value Proposition**:
- **For Estimators**: Reduce estimating time from 15-25 hours to 4-6 hours per bid; eliminate 40% of manual data entry; improve accuracy from 85% to 97%
- **For Trade Contractors**: Win more bids with faster, more accurate estimates; reduce bid preparation costs by $750+ per estimate; integrate with accounting for seamless project handoff
- **For Business Owners**: Increase win rate by 15-20%; reduce estimating overhead; scale estimating capacity without hiring additional estimators

**Pricing**:
- **Starter**: $199/month (up to 10 estimates/month)
- **Professional**: $399/month (up to 50 estimates/month)
- **Enterprise**: $499/month (unlimited estimates) + custom training
- **Usage-based**: $15 per estimate over plan limit

**Success Metrics**:
- 75% reduction in estimating time (from 15-25 hours to 4-6 hours per bid)
- 97% estimating accuracy (validated against actual project costs)
- 15-20% improvement in bid win rate
- 80% of customers actively using platform at 6 months
- 85% month-over-month retention at 12 months

---

## 2. Background and Evidence

### Market Context
- **Construction SaaS Market**: $14.94B by 2033 (~12% CAGR)
- **Specialty Trade Contractors**: 700,000+ businesses in US (NAICS 238)
- **AI in Construction**: AI reduces preconstruction time by 75%, boosts estimate accuracy to 97%, reduces MEP clashes by 85%
- **Cloud-based solutions**: 67.7% of deployments

### Pain Points (Evidence from Research)
1. **Estimating takes 15-25 hours per bid**: Estimators spend 40%+ of time on manual data entry and lookups (material quantities, labor rates, equipment costs)
2. **Margins won or lost in estimating accuracy**: Underestimating by 5-10% can eliminate profit margin; overestimating loses bids
3. **75% still use spreadsheets**: Dodge Report confirms majority of specialty trades still estimate using spreadsheets or paper
4. **Material pricing volatility**: Post-pandemic, post-tariff material costs fluctuate weekly; estimators manually call/email suppliers for pricing
5. **Historical bid data not leveraged**: Estimators don't systematically learn from past bids (win/loss, actual vs. estimated costs)

### Competitive Landscape
| Competitor | Pricing | Target | Strengths | Weaknesses |
|------------|---------|--------|-----------|------------|
| **PlanSwift** | $1,500-$3,000 one-time + $500/yr support | General contractors, estimators | Desktop-based, good takeoff features | Aging technology, not cloud-native, not trade-specific, no AI |
| **Bluebeam Revu** | $29-$59/user/mo | AEC professionals | Strong PDF markup, collaboration | PDF-focused, not trade-specific, limited estimating features |
| **ConWize** | Early-stage startup | Subcontractors | Cloud-based, collaborative | Early stage, limited features, not AI-native |
| **McCormick Systems** | $2,000-$5,000 one-time | Mechanical, electrical contractors | Trade-specific templates | Desktop-based, aging technology, no AI |
| **Accubid** | $3,000-$7,000 one-time | Electrical contractors | Deep electrical estimating features | Desktop-based, expensive, no AI |
| **FastEst** | $500-$1,500 one-time | General contractors | Simple interface | Limited features, not trade-specific, no AI |

**Gap**: No AI-native solution purpose-built for specialty trades. Existing tools are desktop-based, aging, not trade-specific, and don't leverage AI to learn from historical data or auto-generate line items from plans.

---

## 3. Goal and Success Criteria

### Product Goals
1. **Reduce estimating time by 75%**: AI auto-generates line items from plans/specs, pulls real-time material pricing, learns from historical bid data
2. **Boost estimating accuracy to 97%**: AI validates quantities, identifies missing items, flags unrealistic labor rates
3. **Leverage historical bid data**: AI learns from past bids (win/loss, actual vs. estimated) to improve future estimates
4. **Integrate with accounting**: Seamless handoff from estimate to project budget to actual costs

### Success Criteria (12-month targets)
- **Time savings**: 75% reduction in estimating time (from 15-25 hours to 4-6 hours per bid)
- **Accuracy**: 97% estimating accuracy (validated against actual project costs)
- **Win rate**: 15-20% improvement in bid win rate
- **Adoption**: 80% of customers actively using platform at 6 months
- **Retention**: 85% month-over-month retention at 12 months

### Business Goals
- **ARR**: $3M within 12 months (500 customers at $6K avg/year)
- **Gross margin**: 85%+ (SaaS model, minimal COGS)
- **CAC payback**: <9 months
- **LTV:CAC ratio**: >4:1

---

## 4. Users and Scenarios

### User Personas

#### Persona 1: Tom — Electrical Estimator
- **Role**: Estimator at electrical contractor ($10M annual revenue), preparing 3-5 bids per week
- **Pain**: Estimating takes 20+ hours per bid; 40% of time spent on manual data entry (counting outlets, measuring conduit, looking up material pricing); margins won or lost in estimating accuracy; uses spreadsheets and PlanSwift
- **Goal**: Reduce estimating time to 5-6 hours per bid; improve accuracy; leverage historical bid data; integrate with accounting
- **Current workflow**:
  1. Receive bid invitation with plans/specs (PDF)
  2. Print plans or open in Bluebeam
  3. Manually count symbols (outlets, switches, panels)
  4. Manually measure lengths (conduit, wire)
  5. Look up material pricing in catalogs or call suppliers
  6. Calculate labor hours based on experience
  7. Build estimate in Excel or PlanSwift
  8. Add overhead, profit, contingencies
  9. Submit bid
  10. If won, manually transfer estimate to project budget

#### Persona 2: Maria — Plumbing Contractor Owner
- **Role**: Owner of plumbing contractor ($5M annual revenue), preparing 2-3 bids per week
- **Pain**: Estimating is bottleneck; can't scale estimating capacity without hiring additional estimators; material pricing changes weekly; historical bid data not leveraged; uses spreadsheets
- **Goal**: Scale estimating capacity without hiring; reduce estimating time; improve accuracy; leverage historical data
- **Current workflow**:
  1. Receive bid invitation with plans/specs
  2. Open plans in PDF viewer
  3. Manually count fixtures (sinks, toilets, water heaters)
  4. Manually measure pipe lengths
  5. Call suppliers for material pricing
  6. Calculate labor hours based on experience
  7. Build estimate in Excel
  8. Add overhead, profit, contingencies
  9. Submit bid
  10. If won, manually transfer estimate to project budget

#### Persona 3: Dave — HVAC Estimator
- **Role**: Estimator at HVAC contractor ($20M annual revenue), preparing 5-7 bids per week
- **Pain**: Estimating takes 15-20 hours per bid; material pricing volatile; historical bid data not leveraged; uses PlanSwift and spreadsheets; wants AI to help
- **Goal**: Reduce estimating time to 4-5 hours per bid; improve accuracy; leverage AI to learn from historical data
- **Current workflow**:
  1. Receive bid invitation with plans/specs
  2. Open plans in PlanSwift
  3. Perform takeoff (count equipment, measure duct lengths)
  4. Look up material pricing in catalogs
  5. Calculate labor hours based on experience
  6. Build estimate in PlanSwift
  7. Export to Excel for final adjustments
  8. Add overhead, profit, contingencies
  9. Submit bid
  10. If won, manually transfer estimate to project budget

### Key Scenarios

#### Scenario 1: Estimator Uploads Plans and AI Auto-Generates Estimate (Happy Path)
1. Tom (electrical estimator) receives bid invitation with plans/specs (PDF)
2. Tom logs into BidAI web dashboard
3. Clicks "Create New Estimate"
4. Enters project details (name, address, bid deadline)
5. Uploads plans/specs (PDF)
6. AI analyzes plans:
   - Identifies electrical symbols (outlets, switches, panels, lighting)
   - Counts symbols automatically
   - Measures conduit/wire lengths from plans
   - Identifies specifications (wire gauge, conduit type, panel capacity)
7. AI auto-generates line items:
   - Materials: 150 duplex outlets, 50 switches, 200' of 12/2 wire, 500' of 3/4" EMT conduit, etc.
   - Labor: 8 hours per floor for rough-in, 4 hours per floor for trim, etc.
   - Equipment: conduit bender, wire puller, etc.
8. AI pulls real-time material pricing from integrated suppliers
9. AI calculates labor costs based on historical data (actual labor hours from past projects)
10. AI generates estimate with:
    - Line items (materials, labor, equipment)
    - Quantities (auto-calculated from plans)
    - Unit costs (real-time material pricing, historical labor rates)
    - Total costs (materials, labor, equipment, overhead, profit)
11. Tom reviews estimate, makes adjustments (if needed)
12. Tom submits bid
13. If won, system transfers estimate to project budget automatically

#### Scenario 2: AI Learns from Historical Bid Data (Happy Path)
1. Maria (plumbing contractor) has completed 50 projects in past year
2. BidAI has historical data:
   - Estimated vs. actual material costs
   - Estimated vs. actual labor hours
   - Win/loss history
   - Project types (new construction, renovation, tenant improvement)
3. Maria creates new estimate for similar project type
4. AI analyzes historical data:
   - "For similar projects, actual material costs were 8% higher than estimated"
   - "For similar projects, actual labor hours were 12% higher than estimated"
   - "You win 60% of bids when profit margin is 12-15%"
5. AI adjusts new estimate:
   - Increases material quantities by 8% (based on historical variance)
   - Increases labor hours by 12% (based on historical variance)
   - Suggests profit margin of 14% (based on historical win rate)
6. Maria reviews adjusted estimate, submits bid
7. Maria wins bid
8. System tracks actual costs during project
9. After project complete, system compares estimated vs. actual
10. AI learns from variance, improves future estimates

#### Scenario 3: Real-Time Material Pricing Integration (Happy Path)
1. Tom (electrical estimator) creates estimate
2. AI auto-generates line items with materials
3. AI pulls real-time material pricing from integrated suppliers:
   - 150 duplex outlets @ $3.50 each = $525 (from Supplier A)
   - 500' of 3/4" EMT conduit @ $2.80/ft = $1,400 (from Supplier B)
   - 200' of 12/2 wire @ $0.65/ft = $130 (from Supplier C)
4. System shows material costs with supplier names and prices
5. Tom can click on material to:
   - View alternative suppliers
   - Compare prices
   - Select preferred supplier
6. System updates total estimate with selected supplier prices
7. Tom submits bid with current material pricing
8. If won, system generates purchase orders for selected suppliers

#### Scenario 4: AI Flags Missing Items (Happy Path)
1. Tom (electrical estimator) creates estimate
2. AI analyzes plans and specifications
3. AI flags missing items:
   - "Plans show 3-panel schedules, but estimate only includes 2 panels"
   - "Specifications require AFCI breakers, but estimate includes standard breakers"
   - "Plans show emergency lighting, but estimate doesn't include battery backup"
4. System highlights missing items in red
5. Tom reviews flags, adds missing items to estimate
6. System recalculates total estimate
7. Tom submits bid with complete scope

#### Scenario 5: Estimator Adjusts AI-Generated Estimate (Error Path)
1. Tom (electrical estimator) reviews AI-generated estimate
2. Tom notices AI overestimated conduit length (AI measured 600', but Tom knows actual is 500')
3. Tom adjusts conduit length from 600' to 500'
4. System recalculates material cost
5. Tom notices AI underestimated labor hours (AI estimated 20 hours, but Tom knows actual is 30 hours based on experience)
6. Tom adjusts labor hours from 20 to 30
7. System recalculates labor cost
8. Tom submits adjusted bid
9. System learns from Tom's adjustments:
   - "Tom reduced conduit length by 17%"
   - "Tom increased labor hours by 50%"
10. AI applies learnings to future estimates for similar projects

#### Scenario 6: Cold Start — No Historical Data (Error Path)
1. Maria (plumbing contractor) is new to BidAI
2. Maria has no historical bid data in system
3. Maria creates first estimate
4. AI generates estimate based on:
   - Industry-standard labor rates
   - Average material quantities for similar project types
   - Real-time material pricing from suppliers
5. AI shows warning: "This estimate is based on industry averages. As you complete projects, BidAI will learn from your actual costs and improve accuracy."
6. Maria submits bid
7. If won, system tracks actual costs during project
8. After project complete, system compares estimated vs. actual
9. AI learns from first project, improves second estimate
10. After 10 projects, AI has sufficient historical data to provide accurate estimates

---

## 5. Scope

### In Scope (MVP)
1. **Plan Upload and Analysis**
   - Upload plans/specs (PDF, DWG)
   - AI analyzes plans (symbol recognition, quantity takeoff)
   - AI identifies electrical/plumbing/HVAC symbols
   - AI measures lengths (conduit, pipe, duct, wire)

2. **AI-Powered Estimate Generation**
   - Auto-generate line items from plans (materials, labor, equipment)
   - Auto-calculate quantities from plans
   - Pull real-time material pricing from integrated suppliers
   - Calculate labor costs based on historical data
   - Generate estimate with line items, quantities, unit costs, total costs

3. **Historical Bid Data Learning**
   - Track estimated vs. actual costs for completed projects
   - Track win/loss history
   - AI learns from historical data to improve future estimates
   - AI adjusts estimates based on historical variances

4. **Real-Time Material Pricing Integration**
   - Integrate with supplier APIs (Grainger, Ferguson, CED, etc.)
   - Pull real-time material pricing
   - Compare prices across suppliers
   - Generate purchase orders for selected suppliers

5. **Estimate Review and Adjustment**
   - Review AI-generated estimate
   - Adjust quantities, unit costs, labor hours
   - Add/remove line items
   - AI flags missing items based on plans/specs

6. **Bid Submission and Tracking**
   - Generate bid document (PDF)
   - Submit bid via email
   - Track bid status (submitted, won, lost)
   - If won, transfer estimate to project budget

7. **Accounting Integration**
   - Integrate with QuickBooks, Sage
   - Transfer estimate to project budget
   - Track actual costs vs. budget
   - Generate variance reports

8. **Trade-Specific Templates**
   - Electrical estimating templates
   - Plumbing estimating templates
   - HVAC estimating templates
   - Fire protection estimating templates

### Out of Scope (MVP)
- Project management (scheduling, submittals, RFIs)
- Document management (drawings, specs, versions)
- Collaboration tools (multi-user editing, comments)
- Mobile app (web-only for MVP)
- Custom report builder
- API for third-party integrations
- Multi-language support

### Non-Goals
- **Not replacing accounting systems**: We integrate with QuickBooks/Sage, not replace them
- **Not a project management tool**: We focus on estimating, not project execution
- **Not a takeoff-only tool**: We go beyond takeoff to generate complete estimates
- **Not serving general contractors**: We focus on specialty trade contractors (electrical, plumbing, HVAC, fire protection)
- **Not providing legal/contractual advice**: We help with estimating, not contract review

### Dependencies
- **Supplier APIs**: For real-time material pricing (Grainger, Ferguson, CED, etc.)
- **Accounting APIs**: For integration (QuickBooks, Sage)
- **AI/ML platform**: For plan analysis and estimate generation (OpenAI, Anthropic, or custom model)
- **Cloud hosting**: AWS or GCP for infrastructure

### Assumptions
1. **AI can accurately recognize trade symbols**: AI can identify electrical/plumbing/HVAC symbols in plans with 95%+ accuracy
2. **AI can accurately measure quantities**: AI can measure lengths (conduit, pipe, duct, wire) from plans with 90%+ accuracy
3. **Supplier APIs provide reliable pricing**: Supplier APIs provide real-time material pricing with 95%+ uptime
4. **Historical data improves accuracy**: AI learns from historical bid data to improve estimate accuracy over time
5. **Trade contractors will adopt AI**: Trade contractors will trust AI-generated estimates and adopt the platform

---

## 6. Non-Goals

### What We're NOT Building
1. **Not a project management tool**: We don't handle scheduling, submittals, RFIs, or project execution
2. **Not a takeoff-only tool**: We go beyond takeoff to generate complete estimates with labor, equipment, overhead, profit
3. **Not an accounting system**: We integrate with QuickBooks/Sage, not replace them
4. **Not a document management system**: We don't handle drawing versions, spec books, or document collaboration
5. **Not a collaboration platform**: We don't support multi-user editing or real-time collaboration
6. **Not serving general contractors**: We focus on specialty trade contractors (electrical, plumbing, HVAC, fire protection)

### What We're NOT Doing in MVP
1. **No mobile app**: MVP is web-only. Mobile app comes in v2
2. **No custom report builder**: MVP uses pre-built templates. Custom reports come in v2
3. **No API for third-party integrations**: MVP has native integrations. API comes in v2
4. **No multi-language support**: MVP is English-only. Multi-language comes in v2
5. **No offline mode**: MVP requires internet connection. Offline mode comes in v2

---

## 7. User Flow

### Flow 1: Estimator Creates AI-Powered Estimate

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Estimator Logs Into Web Dashboard                         │
│    - Sees estimate list (empty for new user)                  │
│    - Clicks "Create New Estimate"                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Estimator Enters Project Details                          │
│    - Project name: "123 Main St Office Building"              │
│    - Address: "123 Main St, Austin, TX"                       │
│    - Bid deadline: "Oct 30, 2026"                             │
│    - Project type: "New Construction"                         │
│    - Trade: "Electrical"                                      │
│    - Clicks "Next"                                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Estimator Uploads Plans/Specs                             │
│    - Uploads plans (PDF)                                      │
│    - Uploads specifications (PDF)                             │
│    - System validates files (format, size)                    │
│    - Clicks "Analyze Plans"                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. AI Analyzes Plans                                         │
│    - AI identifies electrical symbols (outlets, switches, panels)│
│    - AI counts symbols (150 outlets, 50 switches, 10 panels)  │
│    - AI measures lengths (500' conduit, 2,000' wire)          │
│    - AI identifies specifications (wire gauge, conduit type)  │
│    - Processing time: 2-5 minutes                             │
│    - System shows progress bar                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. AI Auto-Generates Estimate                                │
│    - AI generates line items:                                 │
│      - Materials: 150 outlets, 50 switches, 500' conduit, etc.│
│      - Labor: 8 hours/floor rough-in, 4 hours/floor trim, etc.│
│      - Equipment: conduit bender, wire puller, etc.           │
│    - AI pulls real-time material pricing from suppliers       │
│    - AI calculates labor costs based on historical data       │
│    - AI generates estimate with line items, quantities, costs │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Estimator Reviews Estimate                                │
│    - Sees line items with quantities, unit costs, total costs │
│    - Sees material costs with supplier names and prices       │
│    - Sees labor costs with hours and rates                    │
│    - Sees total estimate (materials, labor, equipment, overhead, profit)│
│    - AI flags missing items (if any)                          │
│    - Estimator adjusts quantities, unit costs, labor hours    │
│    - Estimator adds/removes line items                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. Estimator Submits Bid                                     │
│    - Clicks "Generate Bid Document"                           │
│    - System generates PDF bid document                        │
│    - Estimator reviews bid document                           │
│    - Clicks "Submit Bid"                                      │
│    - System sends bid via email to GC/owner                   │
│    - System tracks bid status (submitted, won, lost)          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. If Won, System Transfers to Project Budget                │
│    - Estimator marks bid as "Won"                             │
│    - System transfers estimate to project budget              │
│    - System integrates with accounting (QuickBooks, Sage)     │
│    - System tracks actual costs vs. budget                    │
│    - System generates variance reports                        │
└─────────────────────────────────────────────────────────────┘
```

### Flow 2: AI Learns from Historical Data

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Estimator Has Completed 50 Projects                       │
│    - System has historical data:                              │
│      - Estimated vs. actual material costs                    │
│      - Estimated vs. actual labor hours                       │
│      - Win/loss history                                       │
│      - Project types                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Estimator Creates New Estimate                            │
│    - Estimator enters project details                         │
│    - System identifies project type (similar to past projects)│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. AI Analyzes Historical Data                               │
│    - AI analyzes historical data for similar projects:        │
│      - "Actual material costs were 8% higher than estimated"  │
│      - "Actual labor hours were 12% higher than estimated"    │
│      - "You win 60% of bids when profit margin is 12-15%"     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. AI Adjusts Estimate                                       │
│    - AI increases material quantities by 8%                   │
│    - AI increases labor hours by 12%                          │
│    - AI suggests profit margin of 14%                         │
│    - System shows adjustment rationale                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Estimator Reviews Adjusted Estimate                       │
│    - Estimator sees adjusted quantities, labor hours, profit  │
│    - Estimator reviews adjustment rationale                   │
│    - Estimator accepts or modifies adjustments                │
│    - Estimator submits bid                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. System Tracks Actual Costs                                │
│    - If won, system tracks actual costs during project        │
│    - System compares estimated vs. actual                     │
│    - System learns from variance                              │
│    - AI improves future estimates                             │
└─────────────────────────────────────────────────────────────┘
```

### Empty States
- **No estimates yet**: "Welcome! Create your first estimate to get started."
- **No historical data**: "No historical data yet. As you complete projects, BidAI will learn from your actual costs and improve accuracy."
- **No plans uploaded**: "Upload plans/specs to get started."
- **No supplier integrations**: "Connect suppliers to pull real-time material pricing."

### Loading States
- **Dashboard loading**: Skeleton loader with estimate cards
- **Plan analysis**: "Analyzing plans... This may take 2-5 minutes."
- **Estimate generation**: "Generating estimate... This may take 30-60 seconds."
- **Material pricing**: "Pulling real-time material pricing... This may take 10-20 seconds."

### Permission Levels
| Role | Permissions |
|------|-------------|
| **Admin** | Full access: create/edit estimates, manage users, view all data, configure settings |
| **Estimator** | Create/edit estimates, view own estimates, submit bids |
| **Viewer** | View estimates (read-only) |
| **Project Manager** | View estimates, transfer to project budget, track actual costs |

---

## 8. Functional Requirements

### Requirement R1: Plan Upload and AI Analysis

**User Story**: As an estimator, I want to upload plans/specs and have AI automatically analyze them so that I don't have to manually count symbols and measure lengths.

**Scenario**: Estimator uploads electrical plans. AI identifies symbols, counts quantities, measures lengths.

**Functional Behavior**:
- Estimator uploads plans/specs (PDF, DWG)
- System validates files (format, size)
- AI analyzes plans:
  - Identifies electrical symbols (outlets, switches, panels, lighting)
  - Counts symbols (150 outlets, 50 switches, 10 panels)
  - Measures lengths (500' conduit, 2,000' wire)
  - Identifies specifications (wire gauge, conduit type, panel capacity)
- System displays analysis results:
  - Symbol counts with locations on plans
  - Length measurements with paths on plans
  - Specifications extracted from spec book
- Estimator reviews analysis, makes adjustments (if needed)

**Data/Field Changes**:
- Estimate record: plan_analysis_status (enum: pending, in_progress, completed, failed), plan_analysis_data (JSON)
- Symbol record: estimate_id, symbol_type (enum: outlet, switch, panel, lighting, etc.), quantity (number), location (JSON)
- Length record: estimate_id, length_type (enum: conduit, wire, duct, pipe), length (number), path (JSON)

**Edge Cases**:
- Plans not readable (poor quality scan): System rejects submission, requests clearer plans
- AI uncertain about symbol identification: System flags for manual review with "uncertain" tag
- Plans in unsupported format: System shows error, lists supported formats
- AI analysis takes too long (>10 minutes): System notifies admin, allows manual takeoff

**Acceptance Criteria**:
- ✅ System uploads plans/specs (PDF, DWG)
- ✅ AI identifies electrical/plumbing/HVAC symbols with 95%+ accuracy
- ✅ AI counts symbols with 90%+ accuracy
- ✅ AI measures lengths with 90%+ accuracy
- ✅ AI identifies specifications from spec book
- ✅ System displays analysis results with locations on plans
- ✅ Estimator can review and adjust analysis results
- ✅ Analysis completes within 5 minutes for typical project

**Priority**: P0 (Must have for MVP)

---

### Requirement R2: AI-Powered Estimate Generation

**User Story**: As an estimator, I want AI to auto-generate line items from plans so that I don't have to manually build estimates.

**Scenario**: AI analyzes plans, generates line items with quantities, unit costs, total costs.

**Functional Behavior**:
- System receives plan analysis results
- AI generates line items:
  - Materials: outlets, switches, conduit, wire, panels, etc.
  - Labor: rough-in, trim, testing, etc.
  - Equipment: conduit bender, wire puller, etc.
- AI calculates quantities based on plan analysis
- AI pulls real-time material pricing from integrated suppliers
- AI calculates labor costs based on historical data (or industry averages if no historical data)
- AI generates estimate with:
  - Line items (materials, labor, equipment)
  - Quantities (auto-calculated from plans)
  - Unit costs (real-time material pricing, historical labor rates)
  - Total costs (materials, labor, equipment, overhead, profit)

**Data/Field Changes**:
- Estimate record: estimate_status (enum: draft, submitted, won, lost), total_cost (number), generated_at (timestamp)
- Line item record: estimate_id, item_type (enum: material, labor, equipment), description (string), quantity (number), unit_cost (number), total_cost (number)

**Edge Cases**:
- AI can't identify all symbols: System flags missing items, allows manual entry
- Real-time material pricing unavailable: System uses cached pricing (with timestamp), shows warning
- No historical data for labor costs: System uses industry averages, shows warning
- Estimate generation fails: System shows error, allows manual estimate creation

**Acceptance Criteria**:
- ✅ AI generates line items from plan analysis
- ✅ AI calculates quantities based on plan analysis
- ✅ AI pulls real-time material pricing from suppliers
- ✅ AI calculates labor costs based on historical data
- ✅ AI generates estimate with line items, quantities, unit costs, total costs
- ✅ Estimate generation completes within 60 seconds
- ✅ Estimator can review and adjust AI-generated estimate

**Priority**: P0 (Must have for MVP)

---

### Requirement R3: Historical Bid Data Learning

**User Story**: As an estimator, I want AI to learn from my historical bid data so that estimates improve over time.

**Scenario**: Estimator has completed 50 projects. AI learns from historical data, adjusts new estimates.

**Functional Behavior**:
- System tracks historical data:
  - Estimated vs. actual material costs
  - Estimated vs. actual labor hours
  - Win/loss history
  - Project types
- Estimator creates new estimate for similar project type
- AI analyzes historical data:
  - "For similar projects, actual material costs were 8% higher than estimated"
  - "For similar projects, actual labor hours were 12% higher than estimated"
  - "You win 60% of bids when profit margin is 12-15%"
- AI adjusts new estimate:
  - Increases material quantities by 8% (based on historical variance)
  - Increases labor hours by 12% (based on historical variance)
  - Suggests profit margin of 14% (based on historical win rate)
- System shows adjustment rationale
- Estimator reviews adjusted estimate, accepts or modifies

**Data/Field Changes**:
- Historical data record: project_id, estimated_material_cost (number), actual_material_cost (number), estimated_labor_hours (number), actual_labor_hours (number), bid_status (enum: won, lost), project_type (string)
- Adjustment record: estimate_id, adjustment_type (enum: material, labor, profit), adjustment_pct (number), rationale (string)

**Edge Cases**:
- No historical data: System uses industry averages, shows warning
- Insufficient historical data (<10 projects): System uses limited adjustments, shows warning
- Historical data inconsistent (high variance): System flags for manual review
- Estimator rejects AI adjustments: System learns from rejection, adjusts future recommendations

**Acceptance Criteria**:
- ✅ System tracks historical data (estimated vs. actual costs, win/loss)
- ✅ AI analyzes historical data for similar projects
- ✅ AI adjusts estimates based on historical variances
- ✅ System shows adjustment rationale
- ✅ Estimator can review and accept/modify adjustments
- ✅ AI learns from estimator's adjustments
- ✅ Estimate accuracy improves over time (validated after 50+ projects)

**Priority**: P0 (Must have for MVP)

---

### Requirement R4: Real-Time Material Pricing Integration

**User Story**: As an estimator, I want to pull real-time material pricing from suppliers so that my estimates reflect current market prices.

**Scenario**: AI generates estimate with materials. System pulls real-time pricing from integrated suppliers.

**Functional Behavior**:
- AI generates line items with materials
- System pulls real-time material pricing from integrated suppliers:
  - Grainger
  - Ferguson
  - CED (Consolidated Electrical Distributors)
  - Other suppliers (configurable)
- System displays material costs with supplier names and prices
- Estimator can click on material to:
  - View alternative suppliers
  - Compare prices
  - Select preferred supplier
- System updates total estimate with selected supplier prices
- If won, system generates purchase orders for selected suppliers

**Data/Field Changes**:
- Material record: estimate_id, material_type (string), quantity (number), supplier_id (UUID, FK), unit_cost (number), total_cost (number), price_updated_at (timestamp)
- Supplier record: name (string), api_endpoint (string), api_key (encrypted), last_sync (timestamp)

**Edge Cases**:
- Supplier API unavailable: System uses cached pricing (with timestamp), shows warning
- Material not found in supplier catalog: System allows manual price entry
- Price significantly different from cached price: System shows warning, allows estimator to verify
- Supplier API rate limit exceeded: System queues request, retries later

**Acceptance Criteria**:
- ✅ System integrates with supplier APIs (Grainger, Ferguson, CED)
- ✅ System pulls real-time material pricing
- ✅ System displays material costs with supplier names and prices
- ✅ Estimator can view alternative suppliers
- ✅ Estimator can compare prices
- ✅ Estimator can select preferred supplier
- ✅ System updates total estimate with selected supplier prices
- ✅ System generates purchase orders for selected suppliers (if won)

**Priority**: P0 (Must have for MVP)

---

### Requirement R5: Estimate Review and Adjustment

**User Story**: As an estimator, I want to review and adjust AI-generated estimates so that I can ensure accuracy before submitting bids.

**Scenario**: Estimator reviews AI-generated estimate, adjusts quantities, unit costs, labor hours.

**Functional Behavior**:
- Estimator opens AI-generated estimate
- Estimator sees line items with quantities, unit costs, total costs
- Estimator can:
  - Adjust quantities (increase/decrease)
  - Adjust unit costs (increase/decrease)
  - Adjust labor hours (increase/decrease)
  - Add line items
  - Remove line items
  - Add comments/notes
- System recalculates total estimate after each adjustment
- AI flags missing items based on plans/specs:
  - "Plans show 3 panel schedules, but estimate only includes 2 panels"
  - "Specifications require AFCI breakers, but estimate includes standard breakers"
- Estimator reviews flags, adds missing items (if needed)
- Estimator approves estimate, submits bid

**Data/Field Changes**:
- Line item record: quantity (number), unit_cost (number), total_cost (number), adjusted_by (UUID, FK), adjusted_at (timestamp), notes (text)
- Flag record: estimate_id, flag_type (enum: missing_item, inconsistent_quantity, unrealistic_cost), description (string), resolved (boolean), resolved_at (timestamp)

**Edge Cases**:
- Estimator makes significant adjustments (>20% change): System shows warning, asks for confirmation
- Estimator removes critical item: System shows warning, asks for confirmation
- Estimate total changes significantly: System shows comparison (AI-generated vs. adjusted)
- Estimator doesn't resolve all flags: System allows submission, but shows unresolved flags

**Acceptance Criteria**:
- ✅ Estimator can review AI-generated estimate
- ✅ Estimator can adjust quantities, unit costs, labor hours
- ✅ Estimator can add/remove line items
- ✅ Estimator can add comments/notes
- ✅ System recalculates total estimate after each adjustment
- ✅ AI flags missing items based on plans/specs
- ✅ Estimator can resolve flags
- ✅ Estimator can approve estimate, submit bid

**Priority**: P0 (Must have for MVP)

---

### Requirement R6: Bid Submission and Tracking

**User Story**: As an estimator, I want to generate bid documents and track bid status so that I can manage my bid pipeline.

**Scenario**: Estimator generates bid document, submits bid, tracks status.

**Functional Behavior**:
- Estimator clicks "Generate Bid Document"
- System generates PDF bid document with:
  - Company information
  - Project information
  - Scope of work
  - Line items (materials, labor, equipment)
  - Total cost
  - Terms and conditions
- Estimator reviews bid document
- Estimator clicks "Submit Bid"
- System sends bid via email to GC/owner
- System tracks bid status (submitted, won, lost)
- Estimator updates bid status (won/lost)
- If won, system transfers estimate to project budget

**Data/Field Changes**:
- Bid record: estimate_id, bid_document_url (string), submitted_at (timestamp), submitted_to (string), status (enum: submitted, won, lost), updated_at (timestamp)

**Edge Cases**:
- Bid document generation fails: System shows error, allows retry
- Email delivery fails: System retries 3 times, logs error
- Estimator doesn't update bid status: System sends reminder after bid deadline
- Bid status updated after project started: System shows warning, allows update

**Acceptance Criteria**:
- ✅ System generates PDF bid document
- ✅ Bid document includes all required information
- ✅ Estimator can review bid document
- ✅ System sends bid via email to GC/owner
- ✅ System tracks bid status (submitted, won, lost)
- ✅ Estimator can update bid status
- ✅ If won, system transfers estimate to project budget

**Priority**: P1 (Should have for MVP, but can be manual if needed)

---

### Requirement R7: Accounting Integration

**User Story**: As a contractor, I want to transfer estimates to project budgets in my accounting system so that I can track actual costs vs. budget.

**Scenario**: Estimator wins bid. System transfers estimate to QuickBooks project budget.

**Functional Behavior**:
- Estimator marks bid as "Won"
- System transfers estimate to project budget in accounting system:
  - QuickBooks
  - Sage
- System creates project in accounting system
- System creates budget lines (materials, labor, equipment)
- System tracks actual costs vs. budget during project
- System generates variance reports (estimated vs. actual)

**Data/Field Changes**:
- Project record: estimate_id, accounting_project_id (string), budget_transferred (boolean), transferred_at (timestamp)
- Variance record: project_id, line_item_id, estimated_cost (number), actual_cost (number), variance_pct (number), updated_at (timestamp)

**Edge Cases**:
- Accounting integration not configured: System shows error, guides user through setup
- Project already exists in accounting system: System links to existing project
- Budget transfer fails: System shows error, allows manual entry
- Actual costs not tracked in accounting system: System shows warning, allows manual entry

**Acceptance Criteria**:
- ✅ System integrates with QuickBooks, Sage
- ✅ System transfers estimate to project budget
- ✅ System creates project in accounting system
- ✅ System creates budget lines (materials, labor, equipment)
- ✅ System tracks actual costs vs. budget
- ✅ System generates variance reports
- ✅ Variance reports show estimated vs. actual costs

**Priority**: P1 (Should have for MVP, but can be manual if needed)

---

## 9. Data and Permission Requirements

### Data Model

#### Company
- id (UUID)
- name (string)
- trade (enum: electrical, plumbing, hvac, fire_protection, other)
- address (string)
- phone (string)
- email (string)
- quickbooks_connected (boolean)
- sage_connected (boolean)
- created_at (timestamp)

#### User
- id (UUID)
- company_id (UUID, FK)
- email (string, unique)
- name (string)
- role (enum: admin, estimator, viewer, project_manager)
- created_at (timestamp)
- last_login (timestamp)

#### Estimate
- id (UUID)
- company_id (UUID, FK)
- project_name (string)
- project_address (string)
- bid_deadline (date)
- project_type (enum: new_construction, renovation, tenant_improvement, other)
- trade (enum: electrical, plumbing, hvac, fire_protection)
- plan_analysis_status (enum: pending, in_progress, completed, failed)
- plan_analysis_data (JSON)
- estimate_status (enum: draft, submitted, won, lost)
- total_cost (number)
- generated_at (timestamp)
- submitted_at (timestamp)
- won_at (timestamp)
- lost_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)

#### Line Item
- id (UUID)
- estimate_id (UUID, FK)
- item_type (enum: material, labor, equipment)
- description (string)
- quantity (number)
- unit_cost (number)
- total_cost (number)
- supplier_id (UUID, FK, nullable)
- adjusted_by (UUID, FK, nullable)
- adjusted_at (timestamp, nullable)
- notes (text)
- created_at (timestamp)

#### Symbol
- id (UUID)
- estimate_id (UUID, FK)
- symbol_type (enum: outlet, switch, panel, lighting, fixture, etc.)
- quantity (number)
- location (JSON)
- confidence (number)
- created_at (timestamp)

#### Length
- id (UUID)
- estimate_id (UUID, FK)
- length_type (enum: conduit, wire, duct, pipe)
- length (number)
- path (JSON)
- confidence (number)
- created_at (timestamp)

#### Historical Data
- id (UUID)
- company_id (UUID, FK)
- project_id (UUID, FK)
- project_type (string)
- estimated_material_cost (number)
- actual_material_cost (number)
- estimated_labor_hours (number)
- actual_labor_hours (number)
- bid_status (enum: won, lost)
- completed_at (timestamp)
- created_at (timestamp)

#### Supplier
- id (UUID)
- name (string)
- api_endpoint (string)
- api_key (encrypted string)
- last_sync (timestamp)
- created_at (timestamp)

#### Bid
- id (UUID)
- estimate_id (UUID, FK)
- bid_document_url (string)
- submitted_at (timestamp)
- submitted_to (string)
- status (enum: submitted, won, lost)
- updated_at (timestamp)

#### Project
- id (UUID)
- estimate_id (UUID, FK)
- accounting_project_id (string)
- budget_transferred (boolean)
- transferred_at (timestamp)
- created_at (timestamp)

#### Variance
- id (UUID)
- project_id (UUID, FK)
- line_item_id (UUID, FK)
- estimated_cost (number)
- actual_cost (number)
- variance_pct (number)
- updated_at (timestamp)

### Permission Matrix

| Action | Admin | Estimator | Viewer | Project Manager |
|--------|-------|-----------|--------|-----------------|
| Create/edit estimates | ✅ | ✅ | ❌ | ❌ |
| View all estimates | ✅ | ❌ (own only) | ✅ (read-only) | ✅ |
| Submit bids | ✅ | ✅ | ❌ | ❌ |
| Update bid status | ✅ | ✅ | ❌ | ✅ |
| Transfer to accounting | ✅ | ❌ | ❌ | ✅ |
| View variance reports | ✅ | ❌ | ❌ | ✅ |
| Manage users | ✅ | ❌ | ❌ | ❌ |
| Configure settings | ✅ | ❌ | ❌ | ❌ |

### Data Security
- **Encryption at rest**: All data encrypted at rest (AES-256)
- **Encryption in transit**: All data encrypted in transit (TLS 1.3)
- **Access control**: Role-based access control (RBAC) enforced at API level
- **Audit trail**: All actions logged with user_id, timestamp, action_type
- **Data retention**: Data retained for 7 years (construction industry standard)
- **Backup**: Daily backups, 30-day retention

---

## 10. Acceptance Criteria

### Happy Path
- ✅ Estimator uploads plans, AI analyzes plans (symbol recognition, quantity takeoff)
- ✅ AI auto-generates estimate with line items, quantities, unit costs, total costs
- ✅ AI pulls real-time material pricing from suppliers
- ✅ AI calculates labor costs based on historical data
- ✅ Estimator reviews estimate, makes adjustments
- ✅ AI flags missing items, estimator adds missing items
- ✅ Estimator submits bid, system tracks status
- ✅ If won, system transfers estimate to project budget
- ✅ System tracks actual costs vs. budget, generates variance reports

### Primary Error Path
- ✅ Plans not readable: System rejects submission, requests clearer plans
- ✅ AI uncertain about symbol identification: System flags for manual review
- ✅ Real-time material pricing unavailable: System uses cached pricing, shows warning
- ✅ No historical data: System uses industry averages, shows warning
- ✅ Estimate generation fails: System shows error, allows manual estimate creation
- ✅ Accounting integration not configured: System shows error, guides user through setup

### Permission/Edge Path
- ✅ Estimator tries to view another estimator's estimate → Access denied
- ✅ Viewer tries to edit estimate → Read-only access enforced
- ✅ Project manager tries to create estimate → Access denied
- ✅ User tries to submit bid with missing required fields → Validation error shown

### Data Consistency Path
- ✅ AI analysis fails: System shows error, allows manual takeoff
- ✅ Material pricing sync fails: System uses cached pricing, logs error
- ✅ Budget transfer fails: System shows error, allows manual entry
- ✅ Variance calculation fails: System shows warning, allows manual entry

### Observability/Audit Requirement
- ✅ All user actions logged with user_id, timestamp, action_type
- ✅ All data changes logged with before/after values
- ✅ Audit trail accessible to admins
- ✅ System metrics monitored (uptime, response time, error rate)
- ✅ AI accuracy tracked (symbol recognition, quantity takeoff, estimate accuracy)

---

## 11. Rollout and Changelog Notes

### Rollout Strategy

#### Phase 1: Beta (Months 1-3)
- **Target**: 20 beta customers (electrical, plumbing, HVAC contractors)
- **Features**: Core plan analysis, estimate generation, material pricing integration
- **Goal**: Validate AI accuracy, gather feedback, iterate
- **Success criteria**: 90% AI accuracy (symbol recognition, quantity takeoff), 70% customer satisfaction

#### Phase 2: General Availability (Months 4-6)
- **Target**: 100 customers
- **Features**: Add historical data learning, accounting integration
- **Goal**: Scale customer base, refine onboarding
- **Success criteria**: 95% AI accuracy, 80% customer satisfaction

#### Phase 3: Growth (Months 7-12)
- **Target**: 500 customers
- **Features**: Add mobile app, custom report builder, API
- **Goal**: Expand feature set, increase ARPU
- **Success criteria**: $3M ARR at 12 months

### Changelog

#### v1.0 (Beta)
- Plan upload and AI analysis (symbol recognition, quantity takeoff)
- AI-powered estimate generation
- Real-time material pricing integration (Grainger, Ferguson, CED)
- Estimate review and adjustment
- Bid submission and tracking

#### v1.1
- Historical bid data learning
- Accounting integration (QuickBooks, Sage)
- Variance reporting
- Trade-specific templates (electrical, plumbing, HVAC, fire protection)

#### v2.0
- Mobile app (iOS, Android)
- Custom report builder
- API for third-party integrations
- Multi-language support (Spanish)
- Offline mode

---

## 12. Risks and Open Questions

### Risks

#### User Experience Risk
- **Risk**: Estimators may not trust AI-generated estimates; may resist adopting AI
- **Mitigation**: Position AI as "assistant" not "replacement"; allow full manual control; demonstrate accuracy with beta customers
- **Owner**: Product Manager

#### Technical Feasibility Risk
- **Risk**: AI accuracy may not reach 95% target for symbol recognition and quantity takeoff
- **Mitigation**: Start with simple symbols (outlets, switches); expand gradually; human-in-the-loop for complex cases
- **Owner**: Engineering Lead

#### Data/Privacy/Security Risk
- **Risk**: Bid data is sensitive (pricing, margins); breach could damage trust
- **Mitigation**: SOC 2 compliance, encryption at rest and in transit, regular security audits
- **Owner**: Security Lead

#### Cold Start Risk
- **Risk**: New customers have no historical data; AI can't learn from their past bids
- **Mitigation**: Use industry averages for new customers; learn from first 10 projects; demonstrate value after 50+ projects
- **Owner**: Product Manager

#### Supplier Integration Risk
- **Risk**: Supplier APIs may be unreliable, rate-limited, or unavailable
- **Mitigation**: Cache pricing data; provide manual entry fallback; build relationships with supplier API teams
- **Owner**: Engineering Lead

### Open Questions

1. **AI accuracy target**: Can AI achieve 95% accuracy for symbol recognition and quantity takeoff? What's the acceptable error rate?
   - **Decision needed**: Engineering Lead to conduct feasibility study with sample plans
   - **Deadline**: Before beta launch

2. **Supplier API reliability**: How reliable are supplier APIs (Grainger, Ferguson, CED)? What's the uptime?
   - **Decision needed**: Engineering Lead to test supplier APIs
   - **Deadline**: Before beta launch

3. **Historical data requirements**: How much historical data does AI need to provide accurate estimates? 10 projects? 50 projects?
   - **Decision needed**: Product Manager to research with beta customers
   - **Deadline**: During beta (Months 1-3)

4. **Pricing validation**: Is $199-$499/month the right pricing? Will trade contractors pay this?
   - **Decision needed**: Product Manager to conduct pricing research with 20 contractors
   - **Deadline**: Before GA launch

5. **Trade-specific accuracy**: Does AI accuracy vary by trade (electrical vs. plumbing vs. HVAC)?
   - **Decision needed**: Engineering Lead to test AI accuracy across trades
   - **Deadline**: During beta (Months 1-3)

---

## Appendix

### Competitive Analysis (Detailed)

#### PlanSwift
- **Pricing**: $1,500-$3,000 one-time + $500/yr support
- **Target**: General contractors, estimators
- **Strengths**: Desktop-based, good takeoff features
- **Weaknesses**: Aging technology, not cloud-native, not trade-specific, no AI
- **Our advantage**: AI-powered, cloud-native, trade-specific, learns from historical data

#### Bluebeam Revu
- **Pricing**: $29-$59/user/mo
- **Target**: AEC professionals
- **Strengths**: Strong PDF markup, collaboration
- **Weaknesses**: PDF-focused, not trade-specific, limited estimating features
- **Our advantage**: Focused on estimating, not just PDF markup; trade-specific; AI-powered

#### ConWize
- **Pricing**: Early-stage startup
- **Target**: Subcontractors
- **Strengths**: Cloud-based, collaborative
- **Weaknesses**: Early stage, limited features, not AI-native
- **Our advantage**: AI-powered, learns from historical data, more comprehensive

#### McCormick Systems
- **Pricing**: $2,000-$5,000 one-time
- **Target**: Mechanical, electrical contractors
- **Strengths**: Trade-specific templates
- **Weaknesses**: Desktop-based, aging technology, no AI
- **Our advantage**: AI-powered, cloud-native, learns from historical data

#### Accubid
- **Pricing**: $3,000-$7,000 one-time
- **Target**: Electrical contractors
- **Strengths**: Deep electrical estimating features
- **Weaknesses**: Desktop-based, expensive, no AI
- **Our advantage**: AI-powered, cloud-native, learns from historical data, cheaper

### Market Sizing

#### TAM (Total Addressable Market)
- **US specialty trade contractors**: 700,000+ businesses (NAICS 238)
- **Target segment**: $2M-$50M revenue = 200,000 businesses
- **Avg. revenue per customer**: $6K/year
- **TAM**: 200,000 × $6K = **$1.2B/year**

#### SAM (Serviceable Addressable Market)
- **Contractors with 5+ estimators**: 50,000 businesses
- **SAM**: 50,000 × $6K = **$300M/year**

#### SOM (Serviceable Obtainable Market)
- **Target**: 1% of SAM in 3 years = 500 customers
- **SOM**: 500 × $6K = **$3M/year**

### User Research Quotes

> "Estimating takes me 20 hours per bid. 40% of that is just manual data entry — counting outlets, measuring conduit, looking up material pricing. If AI could automate that, I'd save 8 hours per bid." — Electrical Estimator, $10M annual revenue

> "I'm still using spreadsheets. I know there are better tools out there, but they're expensive and complicated. If there was something simple that could learn from my past bids, I'd switch." — Plumbing Contractor Owner, $5M annual revenue

> "Material pricing changes every week. I'm constantly calling suppliers for updated pricing. If I had a tool that pulled real-time pricing automatically, that would be huge." — HVAC Estimator, $20M annual revenue

> "I've been estimating for 20 years. I know my numbers. But if AI could learn from my past bids and help me improve, I'm open to it." — Electrical Estimator, $15M annual revenue

> "The problem with existing tools is they're not trade-specific. They're built for general contractors. I need something that understands electrical/plumbing/HVAC." — Mechanical Contractor Owner, $8M annual revenue

---

**Document Version**: 1.0  
**Last Updated**: September 12, 2026  
**Author**: pm-bajaji  
**Status**: Draft for Review
