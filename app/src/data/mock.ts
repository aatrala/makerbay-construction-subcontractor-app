import type {
  Project, TimeEntry, Employee, PayrollRun, PayApplication,
  ChangeOrder, WIPEntity, GLAccount, Invoice, Bill, Vendor,
  Subcontractor, ScheduleTask, DailyLog, CoordNotification,
  ScheduleConflict, ActivityEvent,
  BidEstimate, EstimateLineItem, SymbolResult, LengthResult,
  MaterialSupplier, HistoricalBid,
} from '@/types'

export const projects: Project[] = [
  {
    id: 'p1', companyId: 'c1', name: 'Riverside Medical Center - Electrical',
    jobNumber: '2026-014', customer: 'Turner Construction', gcContact: 'Mike Reynolds',
    contractAmount: 2450000, revisedContract: 2585000, startDate: '2026-02-15',
    endDate: '2026-11-30', status: 'active', location: 'Austin, TX', state: 'TX',
    isPrevailingWage: false, retainagePercent: 10, percentComplete: 42,
    description: 'Full electrical scope for 120,000 SF medical office building including lighting, power, fire alarm, and low-voltage systems.',
    costCodes: [
      { id: 'cc1', projectId: 'p1', code: '26 05 19', name: 'Low-Voltage Electrical Conductors', category: 'labor', budget: 185000, actualCost: 78400, committedCost: 42000, phases: [
        { id: 'ph1', costCodeId: 'cc1', name: 'Rough-In', budget: 95000, actualCost: 42000 },
        { id: 'ph2', costCodeId: 'cc1', name: 'Trim', budget: 55000, actualCost: 24400 },
        { id: 'ph3', costCodeId: 'cc1', name: 'Finish', budget: 35000, actualCost: 12000 },
      ]},
      { id: 'cc2', projectId: 'p1', code: '26 05 26', name: 'Grounding and Bonding', category: 'material', budget: 65000, actualCost: 31200, committedCost: 18500, phases: [
        { id: 'ph4', costCodeId: 'cc2', name: 'Rough-In', budget: 65000, actualCost: 31200 },
      ]},
      { id: 'cc3', projectId: 'p1', code: '26 27 26', name: 'Wiring Devices', category: 'material', budget: 120000, actualCost: 44800, committedCost: 67000, phases: [
        { id: 'ph5', costCodeId: 'cc3', name: 'Trim', budget: 72000, actualCost: 28000 },
        { id: 'ph6', costCodeId: 'cc3', name: 'Finish', budget: 48000, actualCost: 16800 },
      ]},
      { id: 'cc4', projectId: 'p1', code: '26 51 00', name: 'Interior Lighting', category: 'material', budget: 340000, actualCost: 156000, committedCost: 98000, phases: [
        { id: 'ph7', costCodeId: 'cc4', name: 'Rough-In', budget: 180000, actualCost: 84000 },
        { id: 'ph8', costCodeId: 'cc4', name: 'Finish', budget: 160000, actualCost: 72000 },
      ]},
    ],
  },
  {
    id: 'p2', companyId: 'c1', name: 'Hillcrest Elementary School - Electrical',
    jobNumber: '2026-018', customer: 'Balfour Beatty', gcContact: 'Sarah Chen',
    contractAmount: 890000, revisedContract: 890000, startDate: '2026-04-01',
    endDate: '2026-09-15', status: 'active', location: 'San Antonio, TX', state: 'TX',
    isPrevailingWage: true, retainagePercent: 5, percentComplete: 65,
    description: 'Electrical renovation and new construction for K-5 elementary school. Prevailing wage project under state requirements.',
    costCodes: [
      { id: 'cc5', projectId: 'p2', code: '26 05 19', name: 'Low-Voltage Electrical', category: 'labor', budget: 95000, actualCost: 62400, committedCost: 12000, phases: [
        { id: 'ph9', costCodeId: 'cc5', name: 'Rough-In', budget: 55000, actualCost: 38000 },
        { id: 'ph10', costCodeId: 'cc5', name: 'Finish', budget: 40000, actualCost: 24400 },
      ]},
      { id: 'cc6', projectId: 'p2', code: '26 51 00', name: 'Interior Lighting', category: 'material', budget: 145000, actualCost: 98700, committedCost: 22000, phases: [
        { id: 'ph11', costCodeId: 'cc6', name: 'Install', budget: 145000, actualCost: 98700 },
      ]},
    ],
  },
  {
    id: 'p3', companyId: 'c1', name: 'Metro Transit Hub - Fire Alarm & Low Voltage',
    jobNumber: '2025-042', customer: 'Hensel Phelps', gcContact: 'David Martinez',
    contractAmount: 1250000, revisedContract: 1340000, startDate: '2025-08-01',
    endDate: '2026-06-30', status: 'active', location: 'Dallas, TX', state: 'TX',
    isPrevailingWage: true, retainagePercent: 10, percentComplete: 82,
    description: 'Fire alarm, security low-voltage, and building automation wiring for multimodal transit station.',
    costCodes: [
      { id: 'cc7', projectId: 'p3', code: '27 05 00', name: 'Common Work Results - Communications', category: 'labor', budget: 210000, actualCost: 178500, committedCost: 5000, phases: [
        { id: 'ph12', costCodeId: 'cc7', name: 'Rough-In', budget: 130000, actualCost: 118000 },
        { id: 'ph13', costCodeId: 'cc7', name: 'Trim & Test', budget: 80000, actualCost: 60500 },
      ]},
    ],
  },
  {
    id: 'p4', companyId: 'c1', name: 'Lakewood Office Park - Tenant Finish',
    jobNumber: '2026-021', customer: 'Weitz Company', gcContact: 'Jennifer Walsh',
    contractAmount: 425000, revisedContract: 445000, startDate: '2026-06-01',
    endDate: '2026-10-15', status: 'active', location: 'Houston, TX', state: 'TX',
    isPrevailingWage: false, retainagePercent: 10, percentComplete: 18,
    description: 'Electrical tenant finish for 35,000 SF Class A office space including lighting controls and AV infrastructure.',
    costCodes: [
      { id: 'cc8', projectId: 'p4', code: '26 05 19', name: 'Electrical - General', category: 'labor', budget: 68000, actualCost: 12400, committedCost: 8000, phases: [
        { id: 'ph14', costCodeId: 'cc8', name: 'Rough-In', budget: 68000, actualCost: 12400 },
      ]},
    ],
  },
  {
    id: 'p5', companyId: 'c1', name: 'Cedar Park Library - Complete Electrical',
    jobNumber: '2025-038', customer: 'City of Cedar Park', gcContact: 'Tom Bradley',
    contractAmount: 680000, revisedContract: 712000, startDate: '2025-05-01',
    endDate: '2026-01-31', status: 'completed', location: 'Cedar Park, TX', state: 'TX',
    isPrevailingWage: true, retainagePercent: 5, percentComplete: 100,
    description: 'Complete electrical scope for new 18,000 SF public library. Prevailing wage project.',
    costCodes: [
      { id: 'cc9', projectId: 'p5', code: '26 05 00', name: 'Electrical - All Phases', category: 'labor', budget: 245000, actualCost: 238400, committedCost: 0, phases: [
        { id: 'ph15', costCodeId: 'cc9', name: 'Complete', budget: 245000, actualCost: 238400 },
      ]},
    ],
  },
]

export const employees: Employee[] = [
  { id: 'e1', name: 'Marcus Johnson', email: 'marcus@sparky.com', phone: '(512) 555-0142', classification: 'foreman', hourlyRate: 42, burdenRate: 18.50, hireDate: '2022-03-15', isActive: true, pwClassifications: ['Electrician Journeyman', 'Foreman'] },
  { id: 'e2', name: 'Carlos Rivera', email: 'carlos@sparky.com', phone: '(512) 555-0198', classification: 'electrician', hourlyRate: 36, burdenRate: 15.80, hireDate: '2023-01-10', isActive: true, pwClassifications: ['Electrician Journeyman'] },
  { id: 'e3', name: 'Jake Thompson', email: 'jake@sparky.com', phone: '(512) 555-0167', classification: 'electrician', hourlyRate: 34, burdenRate: 14.90, hireDate: '2023-06-22', isActive: true, pwClassifications: ['Electrician Apprentice'] },
  { id: 'e4', name: 'DeShawn Williams', email: 'deshawn@sparky.com', phone: '(512) 555-0183', classification: 'electrician', hourlyRate: 38, burdenRate: 16.60, hireDate: '2022-09-05', isActive: true, pwClassifications: ['Electrician Journeyman'] },
  { id: 'e5', name: 'Ryan O\'Brien', email: 'ryan@sparky.com', phone: '(512) 555-0124', classification: 'laborer', hourlyRate: 24, burdenRate: 10.50, hireDate: '2024-02-12', isActive: true, pwClassifications: ['Laborer'] },
  { id: 'e6', name: 'Miguel Santos', email: 'miguel@sparky.com', phone: '(512) 555-0156', classification: 'electrician', hourlyRate: 35, burdenRate: 15.30, hireDate: '2023-11-01', isActive: true, pwClassifications: ['Electrician Apprentice'] },
  { id: 'e7', name: 'Trevor Collins', email: 'trevor@sparky.com', phone: '(512) 555-0139', classification: 'supervisor', hourlyRate: 48, burdenRate: 21.00, hireDate: '2021-08-20', isActive: true, pwClassifications: ['Supervisor', 'Electrician Journeyman'] },
  { id: 'e8', name: 'Andre Washington', email: 'andre@sparky.com', phone: '(512) 555-0171', classification: 'electrician', hourlyRate: 33, burdenRate: 14.40, hireDate: '2024-05-15', isActive: true, pwClassifications: ['Electrician Apprentice'] },
]

export const timeEntries: TimeEntry[] = [
  { id: 't1', employeeId: 'e1', employeeName: 'Marcus Johnson', projectId: 'p1', projectName: 'Riverside Medical Center', costCodeId: 'cc1', phaseId: 'ph1', phaseName: 'Rough-In', date: '2026-09-08', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'foreman', rate: 42, laborBurden: 18.50, status: 'approved' },
  { id: 't2', employeeId: 'e2', employeeName: 'Carlos Rivera', projectId: 'p1', projectName: 'Riverside Medical Center', costCodeId: 'cc1', phaseId: 'ph1', phaseName: 'Rough-In', date: '2026-09-08', regularHours: 8, overtimeHours: 1.5, totalHours: 9.5, classification: 'electrician', rate: 36, laborBurden: 15.80, status: 'approved' },
  { id: 't3', employeeId: 'e3', employeeName: 'Jake Thompson', projectId: 'p1', projectName: 'Riverside Medical Center', costCodeId: 'cc3', phaseId: 'ph5', phaseName: 'Trim', date: '2026-09-08', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'electrician', rate: 34, laborBurden: 14.90, status: 'pending' },
  { id: 't4', employeeId: 'e4', employeeName: 'DeShawn Williams', projectId: 'p2', projectName: 'Hillcrest Elementary', costCodeId: 'cc5', phaseId: 'ph9', phaseName: 'Rough-In', date: '2026-09-08', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'electrician', rate: 38, laborBurden: 16.60, status: 'approved' },
  { id: 't5', employeeId: 'e5', employeeName: "Ryan O'Brien", projectId: 'p2', projectName: 'Hillcrest Elementary', costCodeId: 'cc5', phaseId: 'ph10', phaseName: 'Finish', date: '2026-09-08', regularHours: 8, overtimeHours: 2, totalHours: 10, classification: 'laborer', rate: 24, laborBurden: 10.50, status: 'pending' },
  { id: 't6', employeeId: 'e6', employeeName: 'Miguel Santos', projectId: 'p3', projectName: 'Metro Transit Hub', costCodeId: 'cc7', phaseId: 'ph13', phaseName: 'Trim & Test', date: '2026-09-08', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'electrician', rate: 35, laborBurden: 15.30, status: 'approved' },
  { id: 't7', employeeId: 'e7', employeeName: 'Trevor Collins', projectId: 'p1', projectName: 'Riverside Medical Center', costCodeId: 'cc4', phaseId: 'ph8', phaseName: 'Finish', date: '2026-09-08', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'supervisor', rate: 48, laborBurden: 21.00, status: 'approved' },
  { id: 't8', employeeId: 'e8', employeeName: 'Andre Washington', projectId: 'p4', projectName: 'Lakewood Office Park', costCodeId: 'cc8', phaseId: 'ph14', phaseName: 'Rough-In', date: '2026-09-08', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'electrician', rate: 33, laborBurden: 14.40, status: 'pending' },
  { id: 't9', employeeId: 'e1', employeeName: 'Marcus Johnson', projectId: 'p1', projectName: 'Riverside Medical Center', costCodeId: 'cc1', phaseId: 'ph2', phaseName: 'Trim', date: '2026-09-09', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'foreman', rate: 42, laborBurden: 18.50, status: 'pending' },
  { id: 't10', employeeId: 'e2', employeeName: 'Carlos Rivera', projectId: 'p1', projectName: 'Riverside Medical Center', costCodeId: 'cc1', phaseId: 'ph2', phaseName: 'Trim', date: '2026-09-09', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'electrician', rate: 36, laborBurden: 15.80, status: 'pending' },
  { id: 't11', employeeId: 'e4', employeeName: 'DeShawn Williams', projectId: 'p2', projectName: 'Hillcrest Elementary', costCodeId: 'cc6', phaseId: 'ph11', phaseName: 'Install', date: '2026-09-09', regularHours: 8, overtimeHours: 1, totalHours: 9, classification: 'electrician', rate: 38, laborBurden: 16.60, status: 'pending' },
  { id: 't12', employeeId: 'e6', employeeName: 'Miguel Santos', projectId: 'p3', projectName: 'Metro Transit Hub', costCodeId: 'cc7', phaseId: 'ph13', phaseName: 'Trim & Test', date: '2026-09-09', regularHours: 8, overtimeHours: 0, totalHours: 8, classification: 'electrician', rate: 35, laborBurden: 15.30, status: 'approved' },
]

export const payrollRuns: PayrollRun[] = [
  {
    id: 'pr1', periodStart: '2026-09-01', periodEnd: '2026-09-07', payDate: '2026-09-12',
    status: 'completed', totalGross: 28450, totalTaxes: 6542, totalFringes: 4280, totalNet: 17628,
    employeeCount: 8, isCertified: false,
    entries: [
      { employeeId: 'e1', employeeName: 'Marcus Johnson', classification: 'foreman', regularHours: 40, overtimeHours: 4, grossPay: 4200, taxes: 966, fringes: 740, netPay: 2494, projectId: 'p1', projectName: 'Riverside Medical Center' },
      { employeeId: 'e2', employeeName: 'Carlos Rivera', classification: 'electrician', regularHours: 40, overtimeHours: 6, grossPay: 3960, taxes: 911, fringes: 632, netPay: 2417, projectId: 'p1', projectName: 'Riverside Medical Center' },
      { employeeId: 'e3', employeeName: 'Jake Thompson', classification: 'electrician', regularHours: 40, overtimeHours: 0, grossPay: 2720, taxes: 626, fringes: 596, netPay: 1498, projectId: 'p1', projectName: 'Riverside Medical Center' },
      { employeeId: 'e4', employeeName: 'DeShawn Williams', classification: 'electrician', regularHours: 40, overtimeHours: 2, grossPay: 3230, taxes: 743, fringes: 664, netPay: 1823, projectId: 'p2', projectName: 'Hillcrest Elementary' },
    ],
  },
  {
    id: 'pr2', periodStart: '2026-08-25', periodEnd: '2026-08-31', payDate: '2026-09-05',
    status: 'completed', totalGross: 26890, totalTaxes: 6185, totalFringes: 4020, totalNet: 16685,
    employeeCount: 8, isCertified: true,
    entries: [
      { employeeId: 'e1', employeeName: 'Marcus Johnson', classification: 'foreman', regularHours: 40, overtimeHours: 0, grossPay: 3360, taxes: 773, fringes: 740, netPay: 1847, projectId: 'p1', projectName: 'Riverside Medical Center' },
      { employeeId: 'e4', employeeName: 'DeShawn Williams', classification: 'electrician', regularHours: 40, overtimeHours: 4, grossPay: 3420, taxes: 787, fringes: 664, netPay: 1969, projectId: 'p2', projectName: 'Hillcrest Elementary' },
    ],
  },
  {
    id: 'pr3', periodStart: '2026-09-08', periodEnd: '2026-09-14', payDate: '2026-09-19',
    status: 'draft', totalGross: 0, totalTaxes: 0, totalFringes: 0, totalNet: 0,
    employeeCount: 0, isCertified: false,
    entries: [],
  },
]

export const payApplications: PayApplication[] = [
  {
    id: 'pa1', projectId: 'p1', projectName: 'Riverside Medical Center - Electrical',
    applicationNumber: 4, periodEnd: '2026-08-31', contractSum: 2585000,
    totalCompletedStored: 1085700, totalRetainage: 108570, totalEarned: 977130,
    lessPreviousApps: 812400, currentPaymentDue: 164730, status: 'approved',
    submittedDate: '2026-09-02', approvedDate: '2026-09-08',
    scheduleOfValues: [
      { id: 'sov1', lineItem: 1, description: '26 05 19 - Low-Voltage Conductors', scheduledValue: 185000, previousCompleted: 62000, thisPeriod: 16400, totalCompleted: 78400, storedMaterials: 0, totalEarned: 78400, percentComplete: 42.4 },
      { id: 'sov2', lineItem: 2, description: '26 05 26 - Grounding & Bonding', scheduledValue: 65000, previousCompleted: 18000, thisPeriod: 13200, totalCompleted: 31200, storedMaterials: 0, totalEarned: 31200, percentComplete: 48.0 },
      { id: 'sov3', lineItem: 3, description: '26 27 26 - Wiring Devices', scheduledValue: 120000, previousCompleted: 28000, thisPeriod: 16800, totalCompleted: 44800, storedMaterials: 12000, totalEarned: 56800, percentComplete: 37.3 },
      { id: 'sov4', lineItem: 4, description: '26 51 00 - Interior Lighting', scheduledValue: 340000, previousCompleted: 108000, thisPeriod: 48000, totalCompleted: 156000, storedMaterials: 25000, totalEarned: 181000, percentComplete: 45.9 },
    ],
  },
  {
    id: 'pa2', projectId: 'p2', projectName: 'Hillcrest Elementary School - Electrical',
    applicationNumber: 3, periodEnd: '2026-08-31', contractSum: 890000,
    totalCompletedStored: 578500, totalRetainage: 28925, totalEarned: 549575,
    lessPreviousApps: 392000, currentPaymentDue: 157575, status: 'submitted',
    submittedDate: '2026-09-03',
    scheduleOfValues: [
      { id: 'sov5', lineItem: 1, description: '26 05 19 - Low-Voltage Electrical', scheduledValue: 95000, previousCompleted: 42000, thisPeriod: 20400, totalCompleted: 62400, storedMaterials: 0, totalEarned: 62400, percentComplete: 65.7 },
      { id: 'sov6', lineItem: 2, description: '26 51 00 - Interior Lighting', scheduledValue: 145000, previousCompleted: 68000, thisPeriod: 30700, totalCompleted: 98700, storedMaterials: 0, totalEarned: 98700, percentComplete: 68.1 },
    ],
  },
  {
    id: 'pa3', projectId: 'p3', projectName: 'Metro Transit Hub - Fire Alarm & LV',
    applicationNumber: 8, periodEnd: '2026-08-31', contractSum: 1340000,
    totalCompletedStored: 1098800, totalRetainage: 109880, totalEarned: 988920,
    lessPreviousApps: 876000, currentPaymentDue: 112920, status: 'paid',
    submittedDate: '2026-09-01', approvedDate: '2026-09-05',
    scheduleOfValues: [
      { id: 'sov7', lineItem: 1, description: '27 05 00 - Communications', scheduledValue: 210000, previousCompleted: 142000, thisPeriod: 36500, totalCompleted: 178500, storedMaterials: 0, totalEarned: 178500, percentComplete: 85.0 },
    ],
  },
]

export const changeOrders: ChangeOrder[] = [
  { id: 'co1', projectId: 'p1', projectName: 'Riverside Medical Center', number: 'CO-004', description: 'Additional emergency lighting per AHJ requirement', amount: 45000, status: 'approved', requestDate: '2026-07-15', approvalDate: '2026-07-22', approvedBy: 'Mike Reynolds' },
  { id: 'co2', projectId: 'p1', projectName: 'Riverside Medical Center', number: 'CO-005', description: 'Relocate panel PP-3 per field conditions', amount: 12500, status: 'approved', requestDate: '2026-08-01', approvalDate: '2026-08-10', approvedBy: 'Mike Reynolds' },
  { id: 'co3', projectId: 'p1', projectName: 'Riverside Medical Center', number: 'CO-006', description: 'Add EV charging infrastructure - 4 stations', amount: 78000, status: 'pending', requestDate: '2026-09-01' },
  { id: 'co4', projectId: 'p2', projectName: 'Hillcrest Elementary', number: 'CO-002', description: 'Upgrade classroom lighting to tunable white', amount: 0, status: 'draft', requestDate: '2026-09-10' },
  { id: 'co5', projectId: 'p3', projectName: 'Metro Transit Hub', number: 'CO-007', description: 'Additional security camera wiring - platform level', amount: 28000, status: 'approved', requestDate: '2026-06-20', approvalDate: '2026-07-01', approvedBy: 'David Martinez' },
  { id: 'co6', projectId: 'p4', projectName: 'Lakewood Office Park', number: 'CO-001', description: 'Additional data outlets per tenant request', amount: 20000, status: 'approved', requestDate: '2026-07-28', approvalDate: '2026-08-05', approvedBy: 'Jennifer Walsh' },
]

export const wipData: WIPEntity[] = [
  { projectId: 'p1', projectName: 'Riverside Medical Center', jobNumber: '2026-014', contractAmount: 2585000, revisedContract: 2585000, costsToDate: 1025200, billedToDate: 1085700, earnedRevenue: 1085700, percentComplete: 42, overUnderBilling: -60500, profitFade: -1.2, startDate: '2026-02-15', estimatedCompletion: '2026-11-30', grossProfit: 248500, grossProfitPercent: 22.9 },
  { projectId: 'p2', projectName: 'Hillcrest Elementary', jobNumber: '2026-018', contractAmount: 890000, revisedContract: 890000, costsToDate: 398100, billedToDate: 578500, earnedRevenue: 578500, percentComplete: 65, overUnderBilling: -180400, profitFade: 0.8, startDate: '2026-04-01', estimatedCompletion: '2026-09-15', grossProfit: 92400, grossProfitPercent: 16.0 },
  { projectId: 'p3', projectName: 'Metro Transit Hub', jobNumber: '2025-042', contractAmount: 1340000, revisedContract: 1340000, costsToDate: 845200, billedToDate: 1098800, earnedRevenue: 1098800, percentComplete: 82, overUnderBilling: -253600, profitFade: -2.1, startDate: '2025-08-01', estimatedCompletion: '2026-06-30', grossProfit: 187600, grossProfitPercent: 17.1 },
  { projectId: 'p4', projectName: 'Lakewood Office Park', jobNumber: '2026-021', contractAmount: 445000, revisedContract: 445000, costsToDate: 72400, billedToDate: 82000, earnedRevenue: 80100, percentComplete: 18, overUnderBilling: 1900, profitFade: 0.4, startDate: '2026-06-01', estimatedCompletion: '2026-10-15', grossProfit: 18200, grossProfitPercent: 22.7 },
  { projectId: 'p5', projectName: 'Cedar Park Library', jobNumber: '2025-038', contractAmount: 712000, revisedContract: 712000, costsToDate: 524800, billedToDate: 712000, earnedRevenue: 712000, percentComplete: 100, overUnderBilling: 0, profitFade: 1.5, startDate: '2025-05-01', estimatedCompletion: '2026-01-31', grossProfit: 112000, grossProfitPercent: 15.7 },
]

export const glAccounts: GLAccount[] = [
  { id: 'gl1', accountNumber: '1000', name: 'Cash - Operating', type: 'asset', balance: 485320 },
  { id: 'gl2', accountNumber: '1100', name: 'Accounts Receivable', type: 'asset', balance: 628400 },
  { id: 'gl3', accountNumber: '1200', name: 'Retainage Receivable', type: 'asset', balance: 247375 },
  { id: 'gl4', accountNumber: '1300', name: 'Inventory - Materials', type: 'asset', balance: 42800 },
  { id: 'gl5', accountNumber: '1500', name: 'Equipment - Net', type: 'asset', balance: 318000 },
  { id: 'gl6', accountNumber: '2000', name: 'Accounts Payable', type: 'liability', balance: 186500 },
  { id: 'gl7', accountNumber: '2100', name: 'Accrued Payroll', type: 'liability', balance: 28450 },
  { id: 'gl8', accountNumber: '2200', name: 'Payroll Taxes Payable', type: 'liability', balance: 14820 },
  { id: 'gl9', accountNumber: '2300', name: 'Billings in Excess of Costs', type: 'liability', balance: 98400 },
  { id: 'gl10', accountNumber: '3000', name: 'Retained Earnings', type: 'equity', balance: 1250000 },
  { id: 'gl11', accountNumber: '4000', name: 'Contract Revenue', type: 'revenue', balance: 3847200 },
  { id: 'gl12', accountNumber: '5000', name: 'Cost of Goods Sold - Labor', type: 'expense', balance: 1842600 },
  { id: 'gl13', accountNumber: '5100', name: 'Cost of Goods Sold - Materials', type: 'expense', balance: 684300 },
  { id: 'gl14', accountNumber: '5200', name: 'Cost of Goods Sold - Equipment', type: 'expense', balance: 156800 },
  { id: 'gl15', accountNumber: '5300', name: 'Cost of Goods Sold - Subcontracts', type: 'expense', balance: 224500 },
  { id: 'gl16', accountNumber: '6000', name: 'General & Administrative', type: 'expense', balance: 342600 },
  { id: 'gl17', accountNumber: '6100', name: 'Insurance', type: 'expense', balance: 86400 },
  { id: 'gl18', accountNumber: '6200', name: 'Depreciation', type: 'expense', balance: 48000 },
]

export const invoices: Invoice[] = [
  { id: 'inv1', invoiceNumber: 'INV-2026-042', projectId: 'p1', projectName: 'Riverside Medical Center', customer: 'Turner Construction', amount: 164730, paidAmount: 0, issueDate: '2026-09-05', dueDate: '2026-10-05', status: 'sent', description: 'Pay Application #4' },
  { id: 'inv2', invoiceNumber: 'INV-2026-041', projectId: 'p2', projectName: 'Hillcrest Elementary', customer: 'Balfour Beatty', amount: 157575, paidAmount: 0, issueDate: '2026-09-04', dueDate: '2026-10-04', status: 'sent', description: 'Pay Application #3' },
  { id: 'inv3', invoiceNumber: 'INV-2026-040', projectId: 'p3', projectName: 'Metro Transit Hub', customer: 'Hensel Phelps', amount: 112920, paidAmount: 112920, issueDate: '2026-09-02', dueDate: '2026-10-02', status: 'paid', description: 'Pay Application #8' },
  { id: 'inv4', invoiceNumber: 'INV-2026-038', projectId: 'p1', projectName: 'Riverside Medical Center', customer: 'Turner Construction', amount: 148200, paidAmount: 148200, issueDate: '2026-08-05', dueDate: '2026-09-05', status: 'paid', description: 'Pay Application #3' },
  { id: 'inv5', invoiceNumber: 'INV-2026-035', projectId: 'p4', projectName: 'Lakewood Office Park', customer: 'Weitz Company', amount: 82000, paidAmount: 42000, issueDate: '2026-08-01', dueDate: '2026-09-01', status: 'overdue', description: 'Initial billing - rough-in complete' },
]

export const bills: Bill[] = [
  { id: 'b1', billNumber: 'BILL-089', vendorName: 'Graybar Electric', projectId: 'p1', projectName: 'Riverside Medical Center', amount: 42800, paidAmount: 0, dueDate: '2026-09-25', status: 'unpaid', category: 'Materials', description: 'Lighting fixtures - floors 2-4' },
  { id: 'b2', billNumber: 'BILL-088', vendorName: 'CED Inc.', projectId: 'p1', projectName: 'Riverside Medical Center', amount: 18500, paidAmount: 18500, dueDate: '2026-09-15', status: 'paid', category: 'Materials', description: 'Conduit and fittings' },
  { id: 'b3', billNumber: 'BILL-087', vendorName: 'Sunbelt Rentals', projectId: 'p2', projectName: 'Hillcrest Elementary', amount: 8400, paidAmount: 0, dueDate: '2026-09-20', status: 'unpaid', category: 'Equipment', description: 'Scissor lift rental - August' },
  { id: 'b4', billNumber: 'BILL-086', vendorName: 'Wesco Distribution', projectId: 'p3', projectName: 'Metro Transit Hub', amount: 24600, paidAmount: 24600, dueDate: '2026-09-10', status: 'paid', category: 'Materials', description: 'Fire alarm devices and panels' },
  { id: 'b5', billNumber: 'BILL-085', vendorName: 'ABC Supply Co.', projectId: 'p4', projectName: 'Lakewood Office Park', amount: 12200, paidAmount: 0, dueDate: '2026-09-28', status: 'unpaid', category: 'Materials', description: 'Rough-in materials' },
]

export const vendors: Vendor[] = [
  { id: 'v1', name: 'Graybar Electric', type: 'material-supplier', contactName: 'Lisa Park', email: 'lpark@graybar.com', phone: '(512) 555-0300', totalBilled: 186400, totalPaid: 143600 },
  { id: 'v2', name: 'CED Inc.', type: 'material-supplier', contactName: 'Bob Franklin', email: 'bfranklin@ced.com', phone: '(512) 555-0312', totalBilled: 92800, totalPaid: 74300 },
  { id: 'v3', name: 'Sunbelt Rentals', type: 'equipment-rental', contactName: 'Amanda Torres', email: 'atorres@sunbelt.com', phone: '(512) 555-0328', totalBilled: 34200, totalPaid: 25800 },
  { id: 'v4', name: 'Wesco Distribution', type: 'material-supplier', contactName: 'James Huang', email: 'jhuang@wesco.com', phone: '(214) 555-0145', totalBilled: 124600, totalPaid: 100000 },
  { id: 'v5', name: 'ABC Supply Co.', type: 'material-supplier', contactName: 'Rachel Kim', email: 'rkim@abcsupply.com', phone: '(713) 555-0267', totalBilled: 28400, totalPaid: 16200 },
  { id: 'v6', name: 'Apex Fire Protection', type: 'subcontractor', contactName: 'Steve Morris', email: 'smorris@apexfire.com', phone: '(512) 555-0341', totalBilled: 68000, totalPaid: 42000 },
]

// ─── Coordination Platform Mock Data ────────────────────────────────────────

export const subcontractors: Subcontractor[] = [
  { id: 's1', companyName: 'Spark Electric LLC', trade: 'Electrical', contactName: 'Jim Walker', email: 'jim@sparkelectric.com', phone: '(512) 555-0100', crewSize: 8, status: 'on-track', insuranceExpiry: '2027-03-15', insuranceStatus: 'current', licenseNumber: 'TX-EC-2024-08812', rating: 4.8, activeProjects: ['p1', 'p2'], notes: 'Preferred electrical sub. Always on time.' },
  { id: 's2', companyName: 'Precision Plumbing Inc.', trade: 'Plumbing', contactName: 'Maria Gonzalez', email: 'maria@precisionplumb.com', phone: '(512) 555-0210', crewSize: 6, status: 'behind', insuranceExpiry: '2026-10-01', insuranceStatus: 'expiring-soon', licenseNumber: 'TX-PL-2023-05541', rating: 4.2, activeProjects: ['p1'], notes: 'Running 3 days behind on rough-in. Need to follow up.' },
  { id: 's3', companyName: 'CoolAir Systems', trade: 'HVAC', contactName: 'David Park', email: 'dpark@coolair.com', phone: '(512) 555-0315', crewSize: 5, status: 'on-track', insuranceExpiry: '2027-06-30', insuranceStatus: 'current', licenseNumber: 'TX-HV-2024-03329', rating: 4.6, activeProjects: ['p1', 'p4'] },
  { id: 's4', companyName: 'Concrete Masters', trade: 'Concrete', contactName: 'Tony Russo', email: 'tony@concretemasters.com', phone: '(512) 555-0422', crewSize: 12, status: 'completed', insuranceExpiry: '2027-01-15', insuranceStatus: 'current', licenseNumber: 'TX-CC-2022-11087', rating: 4.5, activeProjects: ['p1'] },
  { id: 's5', companyName: 'DryTech Interiors', trade: 'Drywall', contactName: 'Chris Nguyen', email: 'chris@drytech.com', phone: '(512) 555-0533', crewSize: 10, status: 'not-started', insuranceExpiry: '2027-04-20', insuranceStatus: 'current', licenseNumber: 'TX-DW-2024-06654', rating: 4.3, activeProjects: ['p1'] },
  { id: 's6', companyName: 'Apex Fire Protection', trade: 'Fire Protection', contactName: 'Steve Morris', email: 'steve@apexfire.com', phone: '(512) 555-0341', crewSize: 4, status: 'on-track', insuranceExpiry: '2027-02-28', insuranceStatus: 'current', licenseNumber: 'TX-FP-2023-09981', rating: 4.7, activeProjects: ['p1', 'p3'] },
  { id: 's7', companyName: 'Rooftop Solutions', trade: 'Roofing', contactName: 'Alan Cooper', email: 'alan@rooftopsol.com', phone: '(512) 555-0645', crewSize: 8, status: 'ahead', insuranceExpiry: '2026-09-20', insuranceStatus: 'expired', licenseNumber: 'TX-RF-2024-04412', rating: 4.1, activeProjects: ['p2'], notes: 'Insurance certificate expired — need updated COI immediately.' },
  { id: 's8', companyName: 'ProFrame Carpentry', trade: 'Framing', contactName: 'Mike Sullivan', email: 'mike@proframe.com', phone: '(512) 555-0756', crewSize: 14, status: 'completed', insuranceExpiry: '2027-05-10', insuranceStatus: 'current', licenseNumber: 'TX-FR-2023-07723', rating: 4.9, activeProjects: ['p1'] },
  { id: 's9', companyName: 'GreenScape Landscaping', trade: 'Landscaping', contactName: 'Laura Chen', email: 'laura@greenscape.com', phone: '(512) 555-0867', crewSize: 6, status: 'not-started', insuranceExpiry: '2027-07-15', insuranceStatus: 'current', licenseNumber: 'TX-LS-2024-02298', rating: 4.0, activeProjects: ['p4'] },
  { id: 's10', companyName: 'SteelWorks Iron', trade: 'Structural Steel', contactName: 'Jake Morrison', email: 'jake@steelworks.com', phone: '(214) 555-0978', crewSize: 10, status: 'issue', insuranceExpiry: '2027-08-01', insuranceStatus: 'current', licenseNumber: 'TX-ST-2023-13345', rating: 3.8, activeProjects: ['p3'], notes: 'RFI #12 outstanding — steel detail conflict at grid line C-4. Holding up HVAC duct routing.' },
]

export const scheduleTasks: ScheduleTask[] = [
  // Riverside Medical Center
  { id: 'st1', projectId: 'p1', projectName: 'Riverside Medical Center', subcontractorId: 's4', subcontractorName: 'Concrete Masters', trade: 'Concrete', taskName: 'Foundation pour — west wing', startDate: '2026-02-20', endDate: '2026-03-15', durationDays: 18, status: 'completed', percentComplete: 100, dependencies: [], crewOnSite: 12, approvalStatus: 'approved', location: 'West Wing', completedAt: '2026-03-14T16:00:00', approvedAt: '2026-03-15T09:00:00' },
  { id: 'st2', projectId: 'p1', projectName: 'Riverside Medical Center', subcontractorId: 's8', subcontractorName: 'ProFrame Carpentry', trade: 'Framing', taskName: 'Interior framing — floors 1-2', startDate: '2026-04-01', endDate: '2026-05-20', durationDays: 35, status: 'completed', percentComplete: 100, dependencies: ['st1'], crewOnSite: 14 },
  { id: 'st3', projectId: 'p1', projectName: 'Riverside Medical Center', subcontractorId: 's1', subcontractorName: 'Spark Electric LLC', trade: 'Electrical', taskName: 'Rough-in electrical — floors 1-4', startDate: '2026-06-01', endDate: '2026-08-15', durationDays: 55, status: 'in-progress', percentComplete: 65, dependencies: ['st2'], crewOnSite: 6, milestone: true, approvalStatus: 'in-progress', location: 'Floors 1-4', startedAt: '2026-06-01T07:00:00', photos: [{ id: 'ph1', url: '/placeholder.jpg', caption: 'Floor 3 north wing — electrical rough-in progress', category: 'progress', takenBy: 'Marcus Johnson', takenAt: '2026-09-12T10:30:00', location: 'Floor 3 North', verified: true }] },
  { id: 'st4', projectId: 'p1', projectName: 'Riverside Medical Center', subcontractorId: 's2', subcontractorName: 'Precision Plumbing Inc.', trade: 'Plumbing', taskName: 'Plumbing rough-in — all floors', startDate: '2026-06-10', endDate: '2026-08-30', durationDays: 60, status: 'delayed', percentComplete: 52, dependencies: ['st2'], crewOnSite: 4, notes: '3 days behind schedule. Material delay on copper fittings.', approvalStatus: 'in-progress', location: 'All Floors', startedAt: '2026-06-12T07:30:00' },
  { id: 'st5', projectId: 'p1', projectName: 'Riverside Medical Center', subcontractorId: 's3', subcontractorName: 'CoolAir Systems', trade: 'HVAC', taskName: 'Ductwork installation — floors 1-3', startDate: '2026-07-01', endDate: '2026-09-15', durationDays: 55, status: 'in-progress', percentComplete: 48, dependencies: ['st2'], crewOnSite: 5 },
  { id: 'st6', projectId: 'p1', projectName: 'Riverside Medical Center', subcontractorId: 's6', subcontractorName: 'Apex Fire Protection', trade: 'Fire Protection', taskName: 'Fire sprinkler rough-in', startDate: '2026-07-15', endDate: '2026-09-20', durationDays: 50, status: 'in-progress', percentComplete: 40, dependencies: ['st2'], crewOnSite: 3 },
  { id: 'st7', projectId: 'p1', projectName: 'Riverside Medical Center', subcontractorId: 's5', subcontractorName: 'DryTech Interiors', trade: 'Drywall', taskName: 'Drywall hang & finish', startDate: '2026-09-25', endDate: '2026-11-01', durationDays: 27, status: 'upcoming', percentComplete: 0, dependencies: ['st3', 'st4', 'st5', 'st6'], crewOnSite: 0 },
  { id: 'st8', projectId: 'p1', projectName: 'Riverside Medical Center', subcontractorId: 's1', subcontractorName: 'Spark Electric LLC', trade: 'Electrical', taskName: 'Trim & finish electrical', startDate: '2026-11-05', endDate: '2026-11-28', durationDays: 18, status: 'upcoming', percentComplete: 0, dependencies: ['st7'], crewOnSite: 0 },
  // Hillcrest Elementary
  { id: 'st9', projectId: 'p2', projectName: 'Hillcrest Elementary', subcontractorId: 's1', subcontractorName: 'Spark Electric LLC', trade: 'Electrical', taskName: 'Electrical renovation — classrooms', startDate: '2026-05-01', endDate: '2026-08-30', durationDays: 90, status: 'in-progress', percentComplete: 72, dependencies: [], crewOnSite: 4 },
  { id: 'st10', projectId: 'p2', projectName: 'Hillcrest Elementary', subcontractorId: 's7', subcontractorName: 'Rooftop Solutions', trade: 'Roofing', taskName: 'Roof replacement — main building', startDate: '2026-06-15', endDate: '2026-08-01', durationDays: 35, status: 'completed', percentComplete: 100, dependencies: [], crewOnSite: 0 },
  // Metro Transit Hub
  { id: 'st11', projectId: 'p3', projectName: 'Metro Transit Hub', subcontractorId: 's6', subcontractorName: 'Apex Fire Protection', trade: 'Fire Protection', taskName: 'Fire alarm system — platform level', startDate: '2026-03-01', endDate: '2026-06-15', durationDays: 75, status: 'in-progress', percentComplete: 82, dependencies: [], crewOnSite: 4 },
  { id: 'st12', projectId: 'p3', projectName: 'Metro Transit Hub', subcontractorId: 's10', subcontractorName: 'SteelWorks Iron', trade: 'Structural Steel', taskName: 'Canopy steel erection', startDate: '2026-05-01', endDate: '2026-07-30', durationDays: 65, status: 'blocked', percentComplete: 38, dependencies: [], crewOnSite: 0, notes: 'Blocked by RFI #12 — steel detail conflict at grid C-4.' },
]

export const dailyLogs: DailyLog[] = [
  {
    id: 'dl1', projectId: 'p1', projectName: 'Riverside Medical Center', date: '2026-09-12',
    weather: 'clear', tempHigh: 94, tempLow: 72, author: 'Trevor Collins',
    subsOnSite: [
      { subName: 'Spark Electric LLC', trade: 'Electrical', crewCount: 6, workPerformed: 'Continued rough-in on floor 3 north wing. Pulled wire for emergency lighting circuits.' },
      { subName: 'Precision Plumbing Inc.', trade: 'Plumbing', crewCount: 4, workPerformed: 'Installed copper risers on floors 2-3. Waiting on fittings delivery for floor 4.' },
      { subName: 'CoolAir Systems', trade: 'HVAC', crewCount: 5, workPerformed: 'Ductwork installation floor 2 east wing. Dropped main trunk line in corridor.' },
      { subName: 'Apex Fire Protection', trade: 'Fire Protection', crewCount: 3, workPerformed: 'Sprinkler head placement floor 1 lobby area.' },
    ],
    notes: 'Good progress on all trades. Plumbing sub still waiting on copper fittings — delivery expected Monday. Electrical ahead of schedule on floor 3.',
    safetyNotes: 'Heat advisory in effect. Mandatory water breaks every 30 minutes. One near-miss with ladder on floor 2 — toolbox talk scheduled for Monday AM.',
    photos: [
      { id: 'ph1', url: '/placeholder.jpg', caption: 'Floor 3 north wing — electrical rough-in progress', category: 'progress', takenBy: 'Marcus Johnson', takenAt: '2026-09-12T10:30:00', location: 'Floor 3 North', verified: true },
      { id: 'ph2', url: '/placeholder.jpg', caption: 'HVAC trunk line — floor 2 corridor', category: 'progress', takenBy: 'Trevor Collins', takenAt: '2026-09-12T14:15:00', location: 'Floor 2 East Corridor', verified: true },
      { id: 'ph3', url: '/placeholder.jpg', caption: 'Ladder placement issue — needs correction', category: 'safety', takenBy: 'Trevor Collins', takenAt: '2026-09-12T11:00:00', location: 'Floor 2 South', verified: true },
    ],
  },
  {
    id: 'dl2', projectId: 'p1', projectName: 'Riverside Medical Center', date: '2026-09-11',
    weather: 'cloudy', tempHigh: 88, tempLow: 70, author: 'Trevor Collins',
    subsOnSite: [
      { subName: 'Spark Electric LLC', trade: 'Electrical', crewCount: 6, workPerformed: 'Rough-in floor 3 south wing. Conduit runs for power distribution.' },
      { subName: 'Precision Plumbing Inc.', trade: 'Plumbing', crewCount: 3, workPerformed: 'Storm drain connections. One crew member absent.' },
      { subName: 'CoolAir Systems', trade: 'HVAC', crewCount: 5, workPerformed: 'Ductwork floor 2 west wing completed. Started east wing.' },
    ],
    notes: 'Plumbing sub short-handed today. Need to discuss crew levels with Maria. HVAC making good progress.',
    delays: 'Plumbing sub running 1 crew member short — impacts rough-in timeline.',
    photos: [
      { id: 'ph4', url: '/placeholder.jpg', caption: 'Conduit runs floor 3 south', category: 'progress', takenBy: 'Marcus Johnson', takenAt: '2026-09-11T09:45:00', location: 'Floor 3 South', verified: true },
    ],
  },
  {
    id: 'dl3', projectId: 'p2', projectName: 'Hillcrest Elementary', date: '2026-09-12',
    weather: 'clear', tempHigh: 92, tempLow: 71, author: 'Mike Reynolds',
    subsOnSite: [
      { subName: 'Spark Electric LLC', trade: 'Electrical', crewCount: 4, workPerformed: 'Classroom lighting fixture installation — Building B. 8 of 12 classrooms complete.' },
    ],
    notes: 'Electrical sub progressing well on classroom lighting. School in session — coordinating noise-sensitive work around class schedules.',
    photos: [
      { id: 'ph5', url: '/placeholder.jpg', caption: 'LED panel install — Classroom B204', category: 'progress', takenBy: 'DeShawn Williams', takenAt: '2026-09-12T13:00:00', location: 'Building B, Room 204', verified: true },
      { id: 'ph6', url: '/placeholder.jpg', caption: 'Damaged ceiling tile from previous trade', category: 'issue', takenBy: 'DeShawn Williams', takenAt: '2026-09-12T11:30:00', location: 'Building B, Corridor', verified: false },
    ],
  },
]

export const coordNotifications: CoordNotification[] = [
  { id: 'cn1', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'delay-alert', priority: 'high', title: 'Plumbing rough-in delayed', message: 'Precision Plumbing is 3 days behind schedule. Copper fitting delivery expected Monday. May impact drywall start date.', createdAt: '2026-09-12T08:30:00', read: false, fromSub: 'Precision Plumbing Inc.' },
  { id: 'cn2', projectId: 'p3', projectName: 'Metro Transit Hub', type: 'rfi', priority: 'urgent', title: 'RFI #12 — Steel detail conflict', message: 'SteelWorks Iron reports conflict at grid line C-4. Canopy steel erection blocked until resolved. HVAC duct routing also affected.', createdAt: '2026-09-11T16:45:00', read: false, fromSub: 'SteelWorks Iron' },
  { id: 'cn3', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'photo-submitted', priority: 'low', title: 'New progress photos', message: 'Spark Electric submitted 2 progress photos for Floor 3 North rough-in.', createdAt: '2026-09-12T10:35:00', read: true, fromSub: 'Spark Electric LLC' },
  { id: 'cn4', projectId: 'p2', projectName: 'Hillcrest Elementary', type: 'issue', priority: 'medium', title: 'Damaged ceiling tile reported', message: 'Spark Electric reported damaged ceiling tile in Building B corridor — possibly from previous trade.', createdAt: '2026-09-12T11:35:00', read: false, fromSub: 'Spark Electric LLC' },
  { id: 'cn5', projectId: 'p2', projectName: 'Hillcrest Elementary', type: 'inspection', priority: 'high', title: 'Electrical inspection scheduled', message: 'City electrical inspection for Building B classrooms scheduled for Sep 18 at 9:00 AM.', createdAt: '2026-09-10T14:00:00', read: true },
  { id: 'cn6', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'schedule-change', priority: 'medium', title: 'Drywall start date pushed', message: 'DryTech Interiors start date moved from Sep 22 to Sep 25 due to plumbing delay. 10 crew members confirmed.', createdAt: '2026-09-11T09:00:00', read: true, toSub: 'DryTech Interiors' },
  { id: 'cn7', projectId: 'p2', projectName: 'Hillcrest Elementary', type: 'milestone', priority: 'low', title: 'Roof replacement complete', message: 'Rooftop Solutions completed roof replacement on main building. 35-day task finished on schedule.', createdAt: '2026-08-01T17:00:00', read: true, fromSub: 'Rooftop Solutions' },
  { id: 'cn8', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'delay-alert', priority: 'high', title: 'Insurance certificate expired', message: 'Rooftop Solutions insurance certificate expired Sep 20. Updated COI required before any further work.', createdAt: '2026-09-12T07:00:00', read: false, fromSub: 'Rooftop Solutions' },
]

export const scheduleConflicts: ScheduleConflict[] = [
  {
    id: 'sc1', projectId: 'p1', projectName: 'Riverside Medical Center',
    taskIds: ['st3', 'st4'], taskNames: ['Rough-in electrical — floors 1-4', 'Plumbing rough-in — all floors'],
    conflictType: 'space', description: 'Electrical and plumbing rough-in both scheduled for Floor 3 corridor during same week. Limited access space.',
    suggestedResolution: 'Stagger plumbing Floor 3 to start Sep 15 (after electrical Floor 3 completion expected Sep 13). No impact to overall timeline.',
    resolutionStatus: 'detected', detectedAt: '2026-09-10T08:00:00', severity: 'high',
  },
  {
    id: 'sc2', projectId: 'p1', projectName: 'Riverside Medical Center',
    taskIds: ['st5', 'st6'], taskNames: ['Ductwork installation — floors 1-3', 'Fire sprinkler rough-in'],
    conflictType: 'space', description: 'HVAC ductwork and fire sprinkler rough-in both require ceiling space on Floor 2 during overlapping period.',
    suggestedResolution: 'HVAC to complete Floor 2 east wing first (by Sep 14), then sprinkler sub can start Floor 2 east wing Sep 15.',
    resolutionStatus: 'resolved', detectedAt: '2026-08-20T10:00:00', resolvedAt: '2026-08-22T14:00:00', severity: 'medium',
  },
  {
    id: 'sc3', projectId: 'p3', projectName: 'Metro Transit Hub',
    taskIds: ['st11', 'st12'], taskNames: ['Fire alarm system — platform level', 'Canopy steel erection'],
    conflictType: 'dependency', description: 'Canopy steel erection (blocked by RFI #12) must complete before fire alarm wiring at platform level can proceed. Steel delay cascading to fire alarm timeline.',
    suggestedResolution: 'Reroute fire alarm wiring to start at east platform section (unaffected by steel conflict). Estimated 5-day head start possible.',
    resolutionStatus: 'detected', detectedAt: '2026-09-11T17:00:00', severity: 'high',
  },
  {
    id: 'sc4', projectId: 'p1', projectName: 'Riverside Medical Center',
    taskIds: ['st6', 'st7'], taskNames: ['Fire sprinkler rough-in', 'Drywall hang & finish'],
    conflictType: 'dependency', description: 'Drywall scheduled to start Sep 25 depends on fire sprinkler completion (currently 40% done, ends Sep 20). Only 5-day buffer — tight given current pace.',
    suggestedResolution: 'Confirm sprinkler crew can maintain current pace. If behind by Sep 18, push drywall start to Sep 28 (3-day slip acceptable).',
    resolutionStatus: 'detected', detectedAt: '2026-09-12T09:00:00', severity: 'medium',
  },
]

export const activityEvents: ActivityEvent[] = [
  { id: 'ae1', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'photo-uploaded', title: 'Progress photos submitted', description: 'Marcus Johnson uploaded 2 progress photos for electrical rough-in Floor 3 North.', actorName: 'Marcus Johnson', actorRole: 'sub', createdAt: '2026-09-12T10:35:00', taskId: 'st3', taskName: 'Rough-in electrical — floors 1-4' },
  { id: 'ae2', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'schedule-changed', title: 'Drywall start date adjusted', description: 'DryTech Interiors start date moved from Sep 22 to Sep 25 due to plumbing delay.', actorName: 'Mike Reynolds', actorRole: 'gc', createdAt: '2026-09-11T09:00:00', taskId: 'st7', taskName: 'Drywall hang & finish' },
  { id: 'ae3', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'conflict-detected', title: 'Schedule conflict detected', description: 'Electrical and plumbing rough-in overlap on Floor 3 corridor. Suggested staggered schedule.', actorName: 'System', actorRole: 'system', createdAt: '2026-09-10T08:00:00', taskId: 'st3', taskName: 'Rough-in electrical — floors 1-4' },
  { id: 'ae4', projectId: 'p2', projectName: 'Hillcrest Elementary', type: 'task-completed', title: 'Task marked complete', description: 'Rooftop Solutions completed roof replacement on main building. 35-day task finished on schedule.', actorName: 'Alan Cooper', actorRole: 'sub', createdAt: '2026-08-01T17:00:00', taskId: 'st10', taskName: 'Roof replacement — main building' },
  { id: 'ae5', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'task-approved', title: 'Task approved by GC', description: 'Foundation pour west wing approved by Mike Reynolds after inspection.', actorName: 'Mike Reynolds', actorRole: 'gc', createdAt: '2026-03-15T09:00:00', taskId: 'st1', taskName: 'Foundation pour — west wing' },
  { id: 'ae6', projectId: 'p3', projectName: 'Metro Transit Hub', type: 'conflict-detected', title: 'Dependency conflict — steel delay', description: 'Canopy steel erection blocked by RFI #12, cascading delay to fire alarm wiring at platform level.', actorName: 'System', actorRole: 'system', createdAt: '2026-09-11T17:00:00', taskId: 'st12', taskName: 'Canopy steel erection' },
  { id: 'ae7', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'task-started', title: 'Task started on site', description: 'CoolAir Systems started ductwork installation on Floor 1. 5 crew members on site.', actorName: 'David Park', actorRole: 'sub', createdAt: '2026-07-01T07:30:00', taskId: 'st5', taskName: 'Ductwork installation — floors 1-3' },
  { id: 'ae8', projectId: 'p2', projectName: 'Hillcrest Elementary', type: 'milestone-reached', title: 'Milestone reached', description: 'Electrical renovation for Building B classrooms reached 70% completion — ahead of schedule.', actorName: 'System', actorRole: 'system', createdAt: '2026-09-08T16:00:00', taskId: 'st9', taskName: 'Electrical renovation — classrooms' },
  { id: 'ae9', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'sub-joined', title: 'Subcontractor joined project', description: 'DryTech Interiors accepted invitation and joined the Riverside Medical Center project.', actorName: 'Chris Nguyen', actorRole: 'sub', createdAt: '2026-09-05T11:00:00' },
  { id: 'ae10', projectId: 'p2', projectName: 'Hillcrest Elementary', type: 'photo-uploaded', title: 'Issue photo submitted', description: 'DeShawn Williams reported damaged ceiling tile in Building B corridor — photo uploaded for GC review.', actorName: 'DeShawn Williams', actorRole: 'sub', createdAt: '2026-09-12T11:30:00', taskId: 'st9', taskName: 'Electrical renovation — classrooms' },
  { id: 'ae11', projectId: 'p3', projectName: 'Metro Transit Hub', type: 'task-started', title: 'Fire alarm work resumed', description: 'Apex Fire Protection resumed fire alarm system work at platform level after safety inspection cleared.', actorName: 'Steve Morris', actorRole: 'sub', createdAt: '2026-09-09T07:00:00', taskId: 'st11', taskName: 'Fire alarm system — platform level' },
  { id: 'ae12', projectId: 'p1', projectName: 'Riverside Medical Center', type: 'schedule-changed', title: 'Inspection date confirmed', description: 'City electrical inspection for Building B classrooms scheduled for Sep 18 at 9:00 AM.', actorName: 'Sarah Chen', actorRole: 'gc', createdAt: '2026-09-10T14:00:00' },
]

// ─── BidAI Estimating Data ──────────────────────────────────────────────────

export const bidEstimates: BidEstimate[] = [
  {
    id: 'be1', projectName: '123 Main St Office Building', projectAddress: '123 Main St, Austin, TX 78701',
    bidDeadline: '2026-10-30', projectType: 'new-construction', trade: 'electrical',
    planAnalysisStatus: 'completed', estimateStatus: 'draft',
    totalMaterialCost: 87450, totalLaborCost: 64200, totalEquipmentCost: 8500,
    overheadPercent: 12, profitPercent: 14, totalCost: 190328,
    aiConfidence: 94, createdAt: '2026-09-10T08:00:00',
    customerName: 'Hensel Phelps Construction', gcContact: 'Tom Bradley',
    planFiles: ['E-101_Floor_Plans.pdf', 'E-201_Power_Plans.pdf', 'Specs_Div26.pdf'],
    aiFlags: [
      { id: 'ef1', estimateId: 'be1', flagType: 'missing-item', description: 'Plans show 3 panel schedules, but estimate only includes 2 panels. Missing Panel C (200A, 277/480V).', severity: 'high', resolved: false },
      { id: 'ef2', estimateId: 'be1', flagType: 'missing-item', description: 'Specifications require AFCI breakers for all bedroom circuits. Estimate includes standard breakers.', severity: 'medium', resolved: false },
      { id: 'ef3', estimateId: 'be1', flagType: 'inconsistent-quantity', description: 'AI measured 600\' of 3/4" EMT conduit. Typical range for similar projects: 450-520\'. Consider reviewing.', severity: 'low', resolved: false },
    ],
    adjustments: [
      { id: 'ea1', estimateId: 'be1', adjustmentType: 'material', adjustmentPct: 8, rationale: 'For similar new-construction projects, actual material costs were 8% higher than estimated.', source: 'ai-historical', accepted: true },
      { id: 'ea2', estimateId: 'be1', adjustmentType: 'labor', adjustmentPct: 12, rationale: 'Historical data shows actual labor hours 12% higher than estimated for office buildings.', source: 'ai-historical', accepted: true },
      { id: 'ea3', estimateId: 'be1', adjustmentType: 'profit', adjustmentPct: 14, rationale: 'You win 62% of bids when profit margin is 12-15%. Recommended: 14%.', source: 'ai-historical', accepted: false },
    ],
  },
  {
    id: 'be2', projectName: 'Lakewood Apartments Phase II', projectAddress: '4500 Lakeview Dr, San Antonio, TX 78229',
    bidDeadline: '2026-10-15', projectType: 'new-construction', trade: 'electrical',
    planAnalysisStatus: 'completed', estimateStatus: 'submitted',
    totalMaterialCost: 142800, totalLaborCost: 98500, totalEquipmentCost: 12200,
    overheadPercent: 12, profitPercent: 15, totalCost: 298065,
    aiConfidence: 91, createdAt: '2026-09-01T10:00:00', submittedAt: '2026-09-08T14:30:00',
    customerName: 'DPR Construction', gcContact: 'Jessica Wu',
    planFiles: ['Lakewood_E-Plans.pdf', 'Lakewood_Specs.pdf'],
    aiFlags: [],
    adjustments: [
      { id: 'ea4', estimateId: 'be2', adjustmentType: 'material', adjustmentPct: 5, rationale: 'Multi-family residential material costs typically run 5% higher than base estimates.', source: 'ai-historical', accepted: true },
    ],
  },
  {
    id: 'be3', projectName: 'Greenfield Data Center - UPS & Generator', projectAddress: '8800 Tech Way, Round Rock, TX 78681',
    bidDeadline: '2026-09-25', projectType: 'new-construction', trade: 'electrical',
    planAnalysisStatus: 'completed', estimateStatus: 'won',
    totalMaterialCost: 385000, totalLaborCost: 215000, totalEquipmentCost: 45000,
    overheadPercent: 10, profitPercent: 18, totalCost: 761200,
    aiConfidence: 96, createdAt: '2026-08-15T08:00:00', submittedAt: '2026-08-22T16:00:00', wonAt: '2026-09-02T10:00:00',
    customerName: 'Clark Construction Group', gcContact: 'Robert Kim',
    planFiles: ['DC_Electrical_Full_Set.pdf', 'DC_Specs_Div26-28.pdf', 'UPS_Schedules.pdf'],
    aiFlags: [],
    adjustments: [],
  },
  {
    id: 'be4', projectName: 'Sunset Plaza Renovation', projectAddress: '220 Sunset Blvd, Austin, TX 78704',
    bidDeadline: '2026-10-05', projectType: 'renovation', trade: 'electrical',
    planAnalysisStatus: 'in-progress', estimateStatus: 'draft',
    totalMaterialCost: 0, totalLaborCost: 0, totalEquipmentCost: 0,
    overheadPercent: 12, profitPercent: 14, totalCost: 0,
    aiConfidence: 0, createdAt: '2026-09-12T14:00:00',
    customerName: 'Harvey Building Group', gcContact: 'Maria Santos',
    planFiles: ['Sunset_Reno_Plans.pdf'],
    aiFlags: [],
    adjustments: [],
  },
  {
    id: 'be5', projectName: 'Metro Line 3 Station B', projectAddress: '1200 Congress Ave, Austin, TX 78701',
    bidDeadline: '2026-11-15', projectType: 'new-construction', trade: 'electrical',
    planAnalysisStatus: 'completed', estimateStatus: 'lost',
    totalMaterialCost: 265000, totalLaborCost: 178000, totalEquipmentCost: 28000,
    overheadPercent: 10, profitPercent: 16, totalCost: 555480,
    aiConfidence: 88, createdAt: '2026-07-20T08:00:00', submittedAt: '2026-08-10T12:00:00', lostAt: '2026-09-01T09:00:00',
    customerName: 'Capital Metro Authority', gcContact: 'James Chen',
    planFiles: ['Metro3_Electrical.pdf', 'Metro3_Specs.pdf'],
    aiFlags: [],
    adjustments: [],
  },
  {
    id: 'be6', projectName: 'Cedar Park Fire Station #4', projectAddress: '300 FM 1431, Cedar Park, TX 78613',
    bidDeadline: '2026-10-20', projectType: 'new-construction', trade: 'fire-protection',
    planAnalysisStatus: 'completed', estimateStatus: 'submitted',
    totalMaterialCost: 52000, totalLaborCost: 34000, totalEquipmentCost: 6500,
    overheadPercent: 12, profitPercent: 15, totalCost: 107685,
    aiConfidence: 92, createdAt: '2026-09-05T08:00:00', submittedAt: '2026-09-11T15:00:00',
    customerName: 'City of Cedar Park', gcContact: 'Lt. Dan Murphy',
    planFiles: ['FP4_Plans.pdf', 'FP4_Specs.pdf'],
    aiFlags: [],
    adjustments: [],
  },
]

export const estimateLineItems: EstimateLineItem[] = [
  // Materials for be1
  { id: 'li1', estimateId: 'be1', itemType: 'material', description: 'Duplex receptacle, 20A, 125V', quantity: 150, unit: 'ea', unitCost: 3.50, totalCost: 525, supplierId: 's1', supplierName: 'CED', aiGenerated: true, confidence: 97 },
  { id: 'li2', estimateId: 'be1', itemType: 'material', description: 'Single-pole switch, 20A, 120/277V', quantity: 50, unit: 'ea', unitCost: 4.25, totalCost: 212.50, supplierId: 's1', supplierName: 'CED', aiGenerated: true, confidence: 95 },
  { id: 'li3', estimateId: 'be1', itemType: 'material', description: '3/4" EMT conduit', quantity: 500, unit: 'ft', unitCost: 2.80, totalCost: 1400, supplierId: 's2', supplierName: 'Grainger', aiGenerated: true, confidence: 89 },
  { id: 'li4', estimateId: 'be1', itemType: 'material', description: '12/2 NM-B wire', quantity: 200, unit: 'ft', unitCost: 0.65, totalCost: 130, supplierId: 's3', supplierName: 'Ferguson', aiGenerated: true, confidence: 96 },
  { id: 'li5', estimateId: 'be1', itemType: 'material', description: '200A Panel board, 42-circuit', quantity: 2, unit: 'ea', unitCost: 2850, totalCost: 5700, supplierId: 's1', supplierName: 'CED', aiGenerated: true, confidence: 94 },
  { id: 'li6', estimateId: 'be1', itemType: 'material', description: '4" LED recessed downlight, 2700K', quantity: 85, unit: 'ea', unitCost: 42.00, totalCost: 3570, supplierId: 's4', supplierName: 'Wesco', aiGenerated: true, confidence: 93 },
  { id: 'li7', estimateId: 'be1', itemType: 'material', description: '2x4 LED troffer, 35W, 4000K', quantity: 120, unit: 'ea', unitCost: 68.00, totalCost: 8160, supplierId: 's4', supplierName: 'Wesco', aiGenerated: true, confidence: 91 },
  { id: 'li8', estimateId: 'be1', itemType: 'material', description: 'Emergency lighting unit, LED, 90-min battery', quantity: 24, unit: 'ea', unitCost: 125.00, totalCost: 3000, supplierId: 's2', supplierName: 'Grainger', aiGenerated: true, confidence: 90 },
  { id: 'li9', estimateId: 'be1', itemType: 'material', description: 'Fire alarm control panel, addressable', quantity: 1, unit: 'ea', unitCost: 4200, totalCost: 4200, supplierId: 's2', supplierName: 'Grainger', aiGenerated: true, confidence: 92 },
  { id: 'li10', estimateId: 'be1', itemType: 'material', description: 'Smoke detector, photoelectric', quantity: 45, unit: 'ea', unitCost: 38.00, totalCost: 1710, supplierId: 's2', supplierName: 'Grainger', aiGenerated: true, confidence: 95 },
  // Labor for be1
  { id: 'li11', estimateId: 'be1', itemType: 'labor', description: 'Rough-in electrical — Floor 1', quantity: 48, unit: 'hr', unitCost: 85, totalCost: 4080, aiGenerated: true, confidence: 88 },
  { id: 'li12', estimateId: 'be1', itemType: 'labor', description: 'Rough-in electrical — Floor 2', quantity: 48, unit: 'hr', unitCost: 85, totalCost: 4080, aiGenerated: true, confidence: 88 },
  { id: 'li13', estimateId: 'be1', itemType: 'labor', description: 'Trim-out — Floor 1', quantity: 24, unit: 'hr', unitCost: 85, totalCost: 2040, aiGenerated: true, confidence: 90 },
  { id: 'li14', estimateId: 'be1', itemType: 'labor', description: 'Trim-out — Floor 2', quantity: 24, unit: 'hr', unitCost: 85, totalCost: 2040, aiGenerated: true, confidence: 90 },
  { id: 'li15', estimateId: 'be1', itemType: 'labor', description: 'Fire alarm installation', quantity: 32, unit: 'hr', unitCost: 95, totalCost: 3040, aiGenerated: true, confidence: 85 },
  { id: 'li16', estimateId: 'be1', itemType: 'labor', description: 'Testing and commissioning', quantity: 16, unit: 'hr', unitCost: 95, totalCost: 1520, aiGenerated: true, confidence: 92 },
  // Equipment for be1
  { id: 'li17', estimateId: 'be1', itemType: 'equipment', description: 'Conduit bender set (1/2" - 2")', quantity: 1, unit: 'set', unitCost: 2800, totalCost: 2800, aiGenerated: true, confidence: 94 },
  { id: 'li18', estimateId: 'be1', itemType: 'equipment', description: 'Wire puller, 1/2 HP', quantity: 1, unit: 'ea', unitCost: 1500, totalCost: 1500, aiGenerated: true, confidence: 96 },
  { id: 'li19', estimateId: 'be1', itemType: 'equipment', description: 'Scissor lift rental (weekly)', quantity: 4, unit: 'wk', unitCost: 1050, totalCost: 4200, aiGenerated: true, confidence: 90 },
]

export const symbolResults: SymbolResult[] = [
  { id: 'sr1', estimateId: 'be1', symbolType: 'outlet', quantity: 150, location: 'Floors 1-2, all rooms', confidence: 97, floor: '1-2' },
  { id: 'sr2', estimateId: 'be1', symbolType: 'switch', quantity: 50, location: 'Floors 1-2, corridors & rooms', confidence: 95, floor: '1-2' },
  { id: 'sr3', estimateId: 'be1', symbolType: 'panel', quantity: 2, location: 'Electrical rooms 101 & 201', confidence: 94, floor: '1, 2' },
  { id: 'sr4', estimateId: 'be1', symbolType: 'lighting', quantity: 85, location: 'All floors, recessed downlights', confidence: 93, floor: '1-2' },
  { id: 'sr5', estimateId: 'be1', symbolType: 'lighting', quantity: 120, location: 'All floors, 2x4 troffers', confidence: 91, floor: '1-2' },
  { id: 'sr6', estimateId: 'be1', symbolType: 'breaker', quantity: 84, location: 'Panels A & B', confidence: 96, floor: '1, 2' },
  { id: 'sr7', estimateId: 'be1', symbolType: 'junction-box', quantity: 35, location: 'Ceiling plenum, all floors', confidence: 89, floor: '1-2' },
  { id: 'sr8', estimateId: 'be1', symbolType: 'fixture', quantity: 24, location: 'Emergency exits, stairwells', confidence: 90, floor: '1-2' },
  { id: 'sr9', estimateId: 'be1', symbolType: 'transformer', quantity: 2, location: 'Electrical rooms 101 & 201', confidence: 92, floor: '1, 2' },
]

export const lengthResults: LengthResult[] = [
  { id: 'lr1', estimateId: 'be1', lengthType: 'conduit', length: 500, path: '3/4" EMT — main runs, floors 1-2', confidence: 89, floor: '1-2' },
  { id: 'lr2', estimateId: 'be1', lengthType: 'wire', length: 2400, path: '12/2 NM-B — branch circuits', confidence: 93, floor: '1-2' },
  { id: 'lr3', estimateId: 'be1', lengthType: 'wire', length: 800, path: '10/3 NM-B — 30A circuits', confidence: 91, floor: '1-2' },
  { id: 'lr4', estimateId: 'be1', lengthType: 'conduit', length: 120, path: '2" EMT — service entrance', confidence: 95, floor: '1' },
  { id: 'lr5', estimateId: 'be1', lengthType: 'wire', length: 350, path: '#2 AWG THHN — feeder to panels', confidence: 88, floor: '1-2' },
]

export const materialSuppliers: MaterialSupplier[] = [
  {
    id: 's1', name: 'CED', logo: 'CED', apiStatus: 'connected', lastSync: '2026-09-12T08:00:00',
    materialPrices: [
      { materialId: 'm1', description: 'Duplex receptacle, 20A, 125V', unitCost: 3.50, lastUpdated: '2026-09-12', supplierId: 's1', supplierName: 'CED', inStock: true },
      { materialId: 'm2', description: 'Single-pole switch, 20A', unitCost: 4.25, lastUpdated: '2026-09-12', supplierId: 's1', supplierName: 'CED', inStock: true },
      { materialId: 'm5', description: '200A Panel board, 42-circuit', unitCost: 2850, lastUpdated: '2026-09-10', supplierId: 's1', supplierName: 'CED', inStock: true },
      { materialId: 'm11', description: '20A AFCI breaker', unitCost: 42.00, lastUpdated: '2026-09-12', supplierId: 's1', supplierName: 'CED', inStock: true },
    ],
  },
  {
    id: 's2', name: 'Grainger', logo: 'GRA', apiStatus: 'connected', lastSync: '2026-09-12T06:00:00',
    materialPrices: [
      { materialId: 'm3', description: '3/4" EMT conduit (per ft)', unitCost: 2.80, lastUpdated: '2026-09-12', supplierId: 's2', supplierName: 'Grainger', inStock: true },
      { materialId: 'm8', description: 'Emergency lighting unit, LED', unitCost: 125.00, lastUpdated: '2026-09-11', supplierId: 's2', supplierName: 'Grainger', inStock: true },
      { materialId: 'm9', description: 'Fire alarm control panel', unitCost: 4200, lastUpdated: '2026-09-10', supplierId: 's2', supplierName: 'Grainger', inStock: false },
      { materialId: 'm10', description: 'Smoke detector, photoelectric', unitCost: 38.00, lastUpdated: '2026-09-12', supplierId: 's2', supplierName: 'Grainger', inStock: true },
    ],
  },
  {
    id: 's3', name: 'Ferguson', logo: 'FER', apiStatus: 'connected', lastSync: '2026-09-11T22:00:00',
    materialPrices: [
      { materialId: 'm4', description: '12/2 NM-B wire (per ft)', unitCost: 0.65, lastUpdated: '2026-09-11', supplierId: 's3', supplierName: 'Ferguson', inStock: true },
      { materialId: 'm3b', description: '3/4" EMT conduit (per ft)', unitCost: 2.95, lastUpdated: '2026-09-11', supplierId: 's3', supplierName: 'Ferguson', inStock: true },
      { materialId: 'm4b', description: '10/3 NM-B wire (per ft)', unitCost: 1.15, lastUpdated: '2026-09-11', supplierId: 's3', supplierName: 'Ferguson', inStock: true },
    ],
  },
  {
    id: 's4', name: 'Wesco', logo: 'WES', apiStatus: 'rate-limited', lastSync: '2026-09-10T14:00:00',
    materialPrices: [
      { materialId: 'm6', description: '4" LED recessed downlight', unitCost: 42.00, lastUpdated: '2026-09-10', supplierId: 's4', supplierName: 'Wesco', inStock: true },
      { materialId: 'm7', description: '2x4 LED troffer, 35W', unitCost: 68.00, lastUpdated: '2026-09-10', supplierId: 's4', supplierName: 'Wesco', inStock: true },
      { materialId: 'm5b', description: '200A Panel board, 42-circuit', unitCost: 2920, lastUpdated: '2026-09-10', supplierId: 's4', supplierName: 'Wesco', inStock: true },
    ],
  },
  {
    id: 's5', name: 'City Electric Supply', logo: 'CES', apiStatus: 'disconnected', lastSync: '2026-09-01T12:00:00',
    materialPrices: [],
  },
]

export const historicalBids: HistoricalBid[] = [
  { id: 'hb1', projectName: 'Oakwood Office Park', projectType: 'new-construction', trade: 'electrical', estimatedCost: 185000, actualCost: 198500, estimatedLaborHours: 720, actualLaborHours: 810, bidStatus: 'won', profitMargin: 14, completedAt: '2026-02-15', varianceMaterialPct: 7.3, varianceLaborPct: 12.5 },
  { id: 'hb2', projectName: 'Pecan Springs Elementary', projectType: 'new-construction', trade: 'electrical', estimatedCost: 320000, actualCost: 338000, estimatedLaborHours: 1200, actualLaborHours: 1380, bidStatus: 'won', profitMargin: 12, completedAt: '2026-03-20', varianceMaterialPct: 5.6, varianceLaborPct: 15.0 },
  { id: 'hb3', projectName: 'Barton Creek Retail', projectType: 'tenant-improvement', trade: 'electrical', estimatedCost: 95000, actualCost: 92000, estimatedLaborHours: 380, actualLaborHours: 365, bidStatus: 'won', profitMargin: 15, completedAt: '2026-04-10', varianceMaterialPct: -3.2, varianceLaborPct: -3.9 },
  { id: 'hb4', projectName: 'Mueller Townhomes Phase I', projectType: 'new-construction', trade: 'electrical', estimatedCost: 410000, actualCost: 445000, estimatedLaborHours: 1500, actualLaborHours: 1720, bidStatus: 'won', profitMargin: 13, completedAt: '2026-05-30', varianceMaterialPct: 8.5, varianceLaborPct: 14.7 },
  { id: 'hb5', projectName: 'Downtown Hotel Renovation', projectType: 'renovation', trade: 'electrical', estimatedCost: 275000, actualCost: 302000, estimatedLaborHours: 980, actualLaborHours: 1150, bidStatus: 'lost', profitMargin: 16, completedAt: '2026-03-15', varianceMaterialPct: 9.8, varianceLaborPct: 17.3 },
  { id: 'hb6', projectName: 'Southpark Industrial', projectType: 'new-construction', trade: 'electrical', estimatedCost: 145000, actualCost: 148000, estimatedLaborHours: 560, actualLaborHours: 585, bidStatus: 'won', profitMargin: 14, completedAt: '2026-06-20', varianceMaterialPct: 2.1, varianceLaborPct: 4.5 },
  { id: 'hb7', projectName: 'Riverside Church', projectType: 'renovation', trade: 'electrical', estimatedCost: 88000, actualCost: 96000, estimatedLaborHours: 340, actualLaborHours: 395, bidStatus: 'lost', profitMargin: 18, completedAt: '2026-04-25', varianceMaterialPct: 9.1, varianceLaborPct: 16.2 },
  { id: 'hb8', projectName: 'Tech Ridge Office Bldg A', projectType: 'new-construction', trade: 'electrical', estimatedCost: 225000, actualCost: 235000, estimatedLaborHours: 880, actualLaborHours: 940, bidStatus: 'won', profitMargin: 13, completedAt: '2026-07-15', varianceMaterialPct: 4.4, varianceLaborPct: 6.8 },
  { id: 'hb9', projectName: 'Domain Central Plaza', projectType: 'tenant-improvement', trade: 'electrical', estimatedCost: 165000, actualCost: 162000, estimatedLaborHours: 640, actualLaborHours: 620, bidStatus: 'won', profitMargin: 15, completedAt: '2026-08-05', varianceMaterialPct: -1.8, varianceLaborPct: -3.1 },
  { id: 'hb10', projectName: 'Lakewood Apartments Phase I', projectType: 'new-construction', trade: 'electrical', estimatedCost: 280000, actualCost: 305000, estimatedLaborHours: 1100, actualLaborHours: 1280, bidStatus: 'won', profitMargin: 14, completedAt: '2026-08-28', varianceMaterialPct: 8.9, varianceLaborPct: 16.4 },
  { id: 'hb11', projectName: 'Westgate Medical Office', projectType: 'new-construction', trade: 'electrical', estimatedCost: 195000, actualCost: 0, estimatedLaborHours: 760, actualLaborHours: 0, bidStatus: 'lost', profitMargin: 16, completedAt: '2026-07-01', varianceMaterialPct: 0, varianceLaborPct: 0 },
  { id: 'hb12', projectName: 'Springdale Retail Center', projectType: 'new-construction', trade: 'electrical', estimatedCost: 125000, actualCost: 128000, estimatedLaborHours: 480, actualLaborHours: 500, bidStatus: 'won', profitMargin: 14, completedAt: '2026-09-01', varianceMaterialPct: 2.4, varianceLaborPct: 4.2 },
]
