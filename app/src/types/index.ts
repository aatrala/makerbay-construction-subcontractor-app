export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'pending'
export type CostType = 'labor' | 'material' | 'equipment' | 'subcontract' | 'other'
export type ChangeOrderStatus = 'draft' | 'pending' | 'approved' | 'rejected'
export type PayAppStatus = 'draft' | 'submitted' | 'approved' | 'paid' | 'rejected'
export type TimeEntryStatus = 'pending' | 'approved' | 'rejected'
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void'
export type BillStatus = 'unpaid' | 'partial' | 'paid' | 'void'
export type EmployeeClassification = 'electrician' | 'plumber' | 'hvac-tech' | 'laborer' | 'operator' | 'carpenter' | 'ironworker' | 'foreman' | 'supervisor'

export interface Company {
  id: string
  name: string
  dba?: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  ein: string
  fiscalYearEnd: string
}

export interface Project {
  id: string
  companyId: string
  name: string
  jobNumber: string
  customer: string
  gcContact: string
  contractAmount: number
  revisedContract: number
  startDate: string
  endDate: string
  status: ProjectStatus
  location: string
  state: string
  isPrevailingWage: boolean
  retainagePercent: number
  percentComplete: number
  costCodes: CostCode[]
  description: string
}

export interface CostCode {
  id: string
  projectId: string
  code: string
  name: string
  category: CostType
  budget: number
  actualCost: number
  committedCost: number
  phases: Phase[]
}

export interface Phase {
  id: string
  costCodeId: string
  name: string
  budget: number
  actualCost: number
}

export interface TimeEntry {
  id: string
  employeeId: string
  employeeName: string
  projectId: string
  projectName: string
  costCodeId: string
  phaseId: string
  phaseName: string
  date: string
  regularHours: number
  overtimeHours: number
  totalHours: number
  classification: EmployeeClassification
  rate: number
  laborBurden: number
  status: TimeEntryStatus
  gpsLat?: number
  gpsLng?: number
  notes?: string
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  classification: EmployeeClassification
  hourlyRate: number
  burdenRate: number
  hireDate: string
  isActive: boolean
  pwClassifications: string[]
}

export interface PayrollRun {
  id: string
  periodStart: string
  periodEnd: string
  payDate: string
  status: 'draft' | 'processing' | 'completed'
  totalGross: number
  totalTaxes: number
  totalFringes: number
  totalNet: number
  employeeCount: number
  isCertified: boolean
  entries: PayrollEntry[]
}

export interface PayrollEntry {
  employeeId: string
  employeeName: string
  classification: EmployeeClassification
  regularHours: number
  overtimeHours: number
  grossPay: number
  taxes: number
  fringes: number
  netPay: number
  projectId: string
  projectName: string
}

export interface PayApplication {
  id: string
  projectId: string
  projectName: string
  applicationNumber: number
  periodEnd: string
  contractSum: number
  totalCompletedStored: number
  totalRetainage: number
  totalEarned: number
  lessPreviousApps: number
  currentPaymentDue: number
  status: PayAppStatus
  scheduleOfValues: ScheduleOfValueItem[]
  submittedDate?: string
  approvedDate?: string
}

export interface ScheduleOfValueItem {
  id: string
  lineItem: number
  description: string
  scheduledValue: number
  previousCompleted: number
  thisPeriod: number
  totalCompleted: number
  storedMaterials: number
  totalEarned: number
  percentComplete: number
}

export interface ChangeOrder {
  id: string
  projectId: string
  projectName: string
  number: string
  description: string
  amount: number
  status: ChangeOrderStatus
  requestDate: string
  approvalDate?: string
  approvedBy?: string
}

export interface WIPEntity {
  projectId: string
  projectName: string
  jobNumber: string
  contractAmount: number
  revisedContract: number
  costsToDate: number
  billedToDate: number
  earnedRevenue: number
  percentComplete: number
  overUnderBilling: number
  profitFade: number
  startDate: string
  estimatedCompletion: string
  grossProfit: number
  grossProfitPercent: number
}

export interface GLAccount {
  id: string
  accountNumber: string
  name: string
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
  balance: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  projectId: string
  projectName: string
  customer: string
  amount: number
  paidAmount: number
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  description: string
}

export interface Bill {
  id: string
  billNumber: string
  vendorName: string
  projectId: string
  projectName: string
  amount: number
  paidAmount: number
  dueDate: string
  status: BillStatus
  category: string
  description: string
}

export interface Vendor {
  id: string
  name: string
  type: 'subcontractor' | 'material-supplier' | 'equipment-rental' | 'other'
  contactName: string
  email: string
  phone: string
  totalBilled: number
  totalPaid: number
}

export interface DashboardKPI {
  label: string
  value: string
  change: number
  changeLabel: string
}

// ─── Coordination Platform Types ────────────────────────────────────────────

export type SubStatus = 'on-track' | 'behind' | 'ahead' | 'not-started' | 'completed' | 'issue'
export type ScheduleTaskStatus = 'upcoming' | 'in-progress' | 'completed' | 'delayed' | 'blocked'
export type TaskApprovalStatus = 'not-started' | 'in-progress' | 'complete' | 'approved' | 'rework-requested'
export type DailyLogWeather = 'clear' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'wind'
export type PhotoCategory = 'progress' | 'issue' | 'safety' | 'material-delivery' | 'inspection' | 'punch-list'
export type NotificationType = 'schedule-change' | 'rfi' | 'issue' | 'photo-submitted' | 'inspection' | 'delay-alert' | 'milestone'
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent'
export type InsuranceStatus = 'current' | 'expiring-soon' | 'expired' | 'not-submitted'
export type ConflictType = 'space' | 'equipment' | 'dependency'
export type ConflictResolutionStatus = 'detected' | 'accepted' | 'rejected' | 'resolved'
export type ActivityEventType = 'task-started' | 'task-completed' | 'task-approved' | 'photo-uploaded' | 'schedule-changed' | 'conflict-detected' | 'sub-joined' | 'milestone-reached'

export interface Subcontractor {
  id: string
  companyName: string
  trade: string
  contactName: string
  email: string
  phone: string
  crewSize: number
  status: SubStatus
  insuranceExpiry: string
  insuranceStatus: InsuranceStatus
  licenseNumber: string
  rating: number
  activeProjects: string[]
  notes?: string
}

export interface ScheduleTask {
  id: string
  projectId: string
  projectName: string
  subcontractorId: string
  subcontractorName: string
  trade: string
  taskName: string
  startDate: string
  endDate: string
  durationDays: number
  status: ScheduleTaskStatus
  percentComplete: number
  dependencies: string[]
  crewOnSite: number
  notes?: string
  milestone?: boolean
  approvalStatus?: TaskApprovalStatus
  location?: string
  startedAt?: string
  completedAt?: string
  approvedAt?: string
  photos?: ProgressPhoto[]
}

export interface DailyLog {
  id: string
  projectId: string
  projectName: string
  date: string
  weather: DailyLogWeather
  tempHigh: number
  tempLow: number
  author: string
  subsOnSite: { subName: string; trade: string; crewCount: number; workPerformed: string }[]
  notes: string
  safetyNotes?: string
  delays?: string
  photos: ProgressPhoto[]
}

export interface ProgressPhoto {
  id: string
  url: string
  caption: string
  category: PhotoCategory
  takenBy: string
  takenAt: string
  location: string
  verified: boolean
}

export interface CoordNotification {
  id: string
  projectId: string
  projectName: string
  type: NotificationType
  priority: NotificationPriority
  title: string
  message: string
  createdAt: string
  read: boolean
  fromSub?: string
  toSub?: string
  actionUrl?: string
}

export interface ScheduleConflict {
  id: string
  projectId: string
  projectName: string
  taskIds: string[]
  taskNames: string[]
  conflictType: ConflictType
  description: string
  suggestedResolution: string
  resolutionStatus: ConflictResolutionStatus
  detectedAt: string
  resolvedAt?: string
  severity: 'low' | 'medium' | 'high'
}

export interface ActivityEvent {
  id: string
  projectId: string
  projectName: string
  type: ActivityEventType
  title: string
  description: string
  actorName: string
  actorRole: 'gc' | 'sub' | 'system' | 'owner'
  createdAt: string
  taskId?: string
  taskName?: string
  photoUrl?: string
}

// ─── BidAI Estimating Types ─────────────────────────────────────────────────

export type Trade = 'electrical' | 'plumbing' | 'hvac' | 'fire-protection'
export type ProjectType = 'new-construction' | 'renovation' | 'tenant-improvement' | 'other'
export type EstimateStatus = 'draft' | 'submitted' | 'won' | 'lost'
export type PlanAnalysisStatus = 'pending' | 'in-progress' | 'completed' | 'failed'
export type LineItemType = 'material' | 'labor' | 'equipment'
export type FlagType = 'missing-item' | 'inconsistent-quantity' | 'unrealistic-cost'
export type SymbolType = 'outlet' | 'switch' | 'panel' | 'lighting' | 'fixture' | 'breaker' | 'transformer' | 'junction-box'
export type LengthType = 'conduit' | 'wire' | 'duct' | 'pipe'

export interface BidEstimate {
  id: string
  projectName: string
  projectAddress: string
  bidDeadline: string
  projectType: ProjectType
  trade: Trade
  planAnalysisStatus: PlanAnalysisStatus
  estimateStatus: EstimateStatus
  totalMaterialCost: number
  totalLaborCost: number
  totalEquipmentCost: number
  overheadPercent: number
  profitPercent: number
  totalCost: number
  aiConfidence: number
  createdAt: string
  submittedAt?: string
  wonAt?: string
  lostAt?: string
  customerName: string
  gcContact: string
  planFiles: string[]
  aiFlags: EstimateFlag[]
  adjustments: EstimateAdjustment[]
}

export interface EstimateLineItem {
  id: string
  estimateId: string
  itemType: LineItemType
  description: string
  quantity: number
  unit: string
  unitCost: number
  totalCost: number
  supplierId?: string
  supplierName?: string
  adjustedBy?: string
  adjustedAt?: string
  notes?: string
  aiGenerated: boolean
  confidence: number
}

export interface SymbolResult {
  id: string
  estimateId: string
  symbolType: SymbolType
  quantity: number
  location: string
  confidence: number
  floor: string
}

export interface LengthResult {
  id: string
  estimateId: string
  lengthType: LengthType
  length: number
  path: string
  confidence: number
  floor: string
}

export interface MaterialSupplier {
  id: string
  name: string
  logo: string
  apiStatus: 'connected' | 'disconnected' | 'rate-limited'
  lastSync: string
  materialPrices: MaterialPrice[]
}

export interface MaterialPrice {
  materialId: string
  description: string
  unitCost: number
  lastUpdated: string
  supplierId: string
  supplierName: string
  inStock: boolean
}

export interface HistoricalBid {
  id: string
  projectName: string
  projectType: ProjectType
  trade: Trade
  estimatedCost: number
  actualCost: number
  estimatedLaborHours: number
  actualLaborHours: number
  bidStatus: 'won' | 'lost'
  profitMargin: number
  completedAt: string
  varianceMaterialPct: number
  varianceLaborPct: number
}

export interface EstimateFlag {
  id: string
  estimateId: string
  flagType: FlagType
  description: string
  severity: 'low' | 'medium' | 'high'
  resolved: boolean
  resolvedAt?: string
}

export interface EstimateAdjustment {
  id: string
  estimateId: string
  adjustmentType: 'material' | 'labor' | 'profit' | 'overhead'
  adjustmentPct: number
  rationale: string
  source: 'ai-historical' | 'ai-plan-analysis' | 'manual'
  accepted: boolean
}

export type PageRoute =
  | 'dashboard'
  | 'jobs'
  | 'job-detail'
  | 'time-tracking'
  | 'billing'
  | 'wip'
  | 'payroll'
  | 'financials'
  | 'coordination'
  | 'sub-directory'
  | 'schedule'
  | 'progress'
  | 'daily-logs'
  | 'project-wizard'
  | 'task-detail'
  | 'notifications'
  | 'activity'
  | 'owner-view'
  | 'estimating'
  | 'create-estimate'
  | 'estimate-detail'
  | 'bid-pipeline'
  | 'historical-analytics'
  | 'material-pricing'
  | 'integrations'
  | 'settings'
