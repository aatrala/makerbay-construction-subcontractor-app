import { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Jobs } from '@/pages/Jobs'
import { JobDetail } from '@/pages/JobDetail'
import { TimeTracking } from '@/pages/TimeTracking'
import { Billing } from '@/pages/Billing'
import { WIP } from '@/pages/WIP'
import { Payroll } from '@/pages/Payroll'
import { Financials } from '@/pages/Financials'
import { SettingsPage } from '@/pages/Settings'
import { Coordination } from '@/pages/Coordination'
import { SubDirectory } from '@/pages/SubDirectory'
import { Schedule } from '@/pages/Schedule'
import { Progress } from '@/pages/Progress'
import { DailyLogs } from '@/pages/DailyLogs'
import { ProjectWizard } from '@/pages/ProjectWizard'
import { CoordTaskDetail } from '@/pages/CoordTaskDetail'
import { NotificationCenter } from '@/pages/NotificationCenter'
import { ActivityFeed } from '@/pages/ActivityFeed'
import { OwnerDashboard } from '@/pages/OwnerDashboard'
import { EstimatingHub } from '@/pages/EstimatingHub'
import { CreateEstimate } from '@/pages/CreateEstimate'
import { EstimateReview } from '@/pages/EstimateReview'
import { BidPipeline } from '@/pages/BidPipeline'
import { HistoricalAnalytics } from '@/pages/HistoricalAnalytics'
import { MaterialPricing } from '@/pages/MaterialPricing'
import { EstimatingIntegrations } from '@/pages/EstimatingIntegrations'
import type { PageRoute } from '@/types'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { AuthScreen } from '@/pages/AuthScreen'

const pageConfig: Record<PageRoute, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Real-time construction accounting overview' },
  jobs: { title: 'Jobs & Costing', subtitle: 'Track budgets, costs, and profitability by job' },
  'job-detail': { title: 'Job Costing', subtitle: 'Detailed cost code and phase breakdown' },
  'time-tracking': { title: 'Time Tracking', subtitle: 'Crew hours, labor allocation, and approvals' },
  billing: { title: 'AIA Billing', subtitle: 'G702/G703 pay applications and schedule of values' },
  wip: { title: 'WIP Reports', subtitle: 'Work in Progress schedule for bonding and banking' },
  payroll: { title: 'Payroll', subtitle: 'Prevailing wage payroll and certified reports' },
  financials: { title: 'Financials', subtitle: 'General ledger, accounts receivable, and accounts payable' },
  coordination: { title: 'Coordination Hub', subtitle: 'Subcontractor coordination, scheduling, and progress tracking' },
  'sub-directory': { title: 'Subcontractor Directory', subtitle: 'Manage and track all subcontractors on your projects' },
  schedule: { title: 'Schedule Coordination', subtitle: 'Gantt timeline view of all sub schedules and dependencies' },
  progress: { title: 'Progress Photos', subtitle: 'Photo verification and progress documentation' },
  'daily-logs': { title: 'Daily Logs', subtitle: 'Daily field reports, weather, crew counts, and site photos' },
  'project-wizard': { title: 'Create Project', subtitle: 'Set up a new project, import schedule, and invite subcontractors' },
  'task-detail': { title: 'Task Detail', subtitle: 'Task progress, photos, dependencies, and approval workflow' },
  notifications: { title: 'Notifications', subtitle: 'Schedule alerts, delay warnings, and communication center' },
  activity: { title: 'Activity Feed', subtitle: 'Real-time timeline of all project events and updates' },
  'owner-view': { title: 'Owner Dashboard', subtitle: 'Read-only project progress and milestone tracking' },
  estimating: { title: 'BidAI Estimating', subtitle: 'AI-powered estimating, bid tracking, and material pricing' },
  'create-estimate': { title: 'Create Estimate', subtitle: 'Upload plans and let AI auto-generate your estimate' },
  'estimate-detail': { title: 'Estimate Review', subtitle: 'Review line items, AI flags, and adjustments' },
  'bid-pipeline': { title: 'Bid Pipeline', subtitle: 'Track all bids through your sales pipeline' },
  'historical-analytics': { title: 'Historical Analytics', subtitle: 'Win/loss trends, accuracy insights, and AI learnings' },
  'material-pricing': { title: 'Material Pricing', subtitle: 'Real-time supplier pricing and comparison' },
  integrations: { title: 'Integrations', subtitle: 'Connect accounting and project management systems' },
  settings: { title: 'Settings', subtitle: 'Company, integrations, and preferences' },
}

export function App() {
  return (
    <AuthProvider>
      <AppShell />
      <Toaster position="bottom-right" />
    </AuthProvider>
  )
}

function AppShell() {
  const { session, user, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState<PageRoute>('dashboard')
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [selectedTaskId, setSelectedTaskId] = useState<string>('st3')
  const [selectedEstimateId, setSelectedEstimateId] = useState<string>('be1')

  const handleNavigate = (page: PageRoute, projectId?: string) => {
    setCurrentPage(page)
    if (projectId) setSelectedProjectId(projectId)
    window.scrollTo(0, 0)
  }

  const handleTaskNavigate = (taskId: string) => {
    setSelectedTaskId(taskId)
    setCurrentPage('task-detail')
    window.scrollTo(0, 0)
  }

  const handleEstimateNavigate = (page: PageRoute, id?: string) => {
    if (id) setSelectedEstimateId(id)
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const config = pageConfig[currentPage]

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-signal" />
      </div>
    )
  }

  if (!session) {
    return <AuthScreen />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />
      case 'jobs':
        return <Jobs onNavigate={handleNavigate} />
      case 'job-detail':
        return <JobDetail projectId={selectedProjectId} onNavigate={handleNavigate} />
      case 'time-tracking':
        return <TimeTracking />
      case 'billing':
        return <Billing />
      case 'wip':
        return <WIP />
      case 'payroll':
        return <Payroll />
      case 'financials':
        return <Financials />
      case 'coordination':
        return <Coordination onNavigate={handleNavigate} />
      case 'sub-directory':
        return <SubDirectory />
      case 'schedule':
        return <Schedule onTaskClick={handleTaskNavigate} />
      case 'progress':
        return <Progress />
      case 'daily-logs':
        return <DailyLogs />
      case 'project-wizard':
        return <ProjectWizard onNavigate={handleNavigate} />
      case 'task-detail':
        return <CoordTaskDetail taskId={selectedTaskId} onNavigate={handleNavigate} />
      case 'notifications':
        return <NotificationCenter />
      case 'activity':
        return <ActivityFeed />
      case 'owner-view':
        return <OwnerDashboard onNavigate={handleNavigate} />
      case 'estimating':
        return <EstimatingHub onNavigate={handleEstimateNavigate} />
      case 'create-estimate':
        return <CreateEstimate onNavigate={handleEstimateNavigate} />
      case 'estimate-detail':
        return <EstimateReview estimateId={selectedEstimateId} onNavigate={handleEstimateNavigate} />
      case 'bid-pipeline':
        return <BidPipeline onNavigate={handleEstimateNavigate} />
      case 'historical-analytics':
        return <HistoricalAnalytics onNavigate={handleEstimateNavigate} />
      case 'material-pricing':
        return <MaterialPricing onNavigate={handleEstimateNavigate} />
      case 'integrations':
        return <EstimatingIntegrations onNavigate={handleEstimateNavigate} />
      case 'settings':
        return <SettingsPage />
      default:
        return <Dashboard onNavigate={handleNavigate} />
    }
  }

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        title={config.title}
        subtitle={config.subtitle}
      >
        {renderPage()}
      </Layout>
      <Toaster position="bottom-right" />
    </>
  )
}
