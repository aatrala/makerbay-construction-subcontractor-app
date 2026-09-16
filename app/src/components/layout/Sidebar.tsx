import { cn } from '@/lib/utils'
import {
  LayoutDashboard, HardHat, Clock, FileText, BarChart3,
  Wallet, BookOpen, Settings, ChevronLeft, Zap,
  Users, Calendar, Camera, ClipboardList, Network,
  Bell, Activity, Plus, Eye,
  Sparkles, GitBranch, TrendingUp, DollarSign, Plug,
} from 'lucide-react'
import type { PageRoute } from '@/types'

interface SidebarProps {
  currentPage: PageRoute
  onNavigate: (page: PageRoute) => void
  collapsed: boolean
  onToggle: () => void
}

type NavItem = { route: PageRoute; label: string; icon: React.ElementType; badge?: string }

const accountingNav: NavItem[] = [
  { route: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { route: 'jobs', label: 'Jobs & Costing', icon: HardHat },
  { route: 'time-tracking', label: 'Time Tracking', icon: Clock },
  { route: 'billing', label: 'AIA Billing', icon: FileText },
  { route: 'wip', label: 'WIP Reports', icon: BarChart3 },
  { route: 'payroll', label: 'Payroll', icon: Wallet, badge: 'PW' },
  { route: 'financials', label: 'Financials', icon: BookOpen },
]

const coordNav: NavItem[] = [
  { route: 'coordination', label: 'Dashboard', icon: Network },
  { route: 'sub-directory', label: 'Sub Directory', icon: Users },
  { route: 'schedule', label: 'Schedule', icon: Calendar },
  { route: 'progress', label: 'Progress Photos', icon: Camera },
  { route: 'daily-logs', label: 'Daily Logs', icon: ClipboardList },
  { route: 'notifications', label: 'Notifications', icon: Bell, badge: '4' },
  { route: 'activity', label: 'Activity Feed', icon: Activity },
  { route: 'owner-view', label: 'Owner View', icon: Eye },
]

const estimNav: NavItem[] = [
  { route: 'estimating', label: 'Dashboard', icon: Sparkles },
  { route: 'create-estimate', label: 'New Estimate', icon: Plus },
  { route: 'bid-pipeline', label: 'Bid Pipeline', icon: GitBranch },
  { route: 'historical-analytics', label: 'Analytics', icon: TrendingUp },
  { route: 'material-pricing', label: 'Material Pricing', icon: DollarSign },
  { route: 'integrations', label: 'Integrations', icon: Plug },
]

const navItems: NavItem[] = [
  ...accountingNav,
  ...coordNav,
  ...estimNav,
  { route: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ currentPage, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-line bg-surface transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-line px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-signal text-white">
          <Zap className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <h1 className="text-base font-extrabold tracking-tight text-ink">BuildBooks</h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted">Construction Acct</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Accounting Section */}
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted/60">Accounting</p>
        )}
        <div className="space-y-1">
          {accountingNav.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.route ||
              (item.route === 'jobs' && currentPage === 'job-detail')
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-signal-soft text-signal'
                    : 'text-muted hover:bg-canvas hover:text-ink'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-signal')} />
                {!collapsed && (
                  <span className="animate-fade-in truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="ml-auto rounded bg-violet-soft px-1.5 py-0.5 text-[10px] font-bold text-violet">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Coordination Section */}
        {!collapsed && (
          <p className="px-3 mt-5 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted/60">Coordination</p>
        )}
        {collapsed && <div className="my-3 mx-2 border-t border-line" />}
        <div className="space-y-1">
          {coordNav.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.route ||
              (item.route === 'schedule' && currentPage === 'task-detail')
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-signal-soft text-signal'
                    : 'text-muted hover:bg-canvas hover:text-ink'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-signal')} />
                {!collapsed && (
                  <span className="animate-fade-in truncate">{item.label}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Estimating Section */}
        {!collapsed && (
          <p className="px-3 mt-5 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted/60">Estimating (BidAI)</p>
        )}
        {collapsed && <div className="my-3 mx-2 border-t border-line" />}
        <div className="space-y-1">
          {estimNav.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.route ||
              (item.route === 'estimating' && currentPage === 'estimate-detail')
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-signal-soft text-signal'
                    : 'text-muted hover:bg-canvas hover:text-ink'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-signal')} />
                {!collapsed && (
                  <span className="animate-fade-in truncate">{item.label}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Settings */}
        {!collapsed && <div className="my-3 mx-2 border-t border-line" />}
        <div className="space-y-1">
          {(() => {
            const item = { route: 'settings' as PageRoute, label: 'Settings', icon: Settings }
            const Icon = item.icon
            const isActive = currentPage === item.route
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-signal-soft text-signal'
                    : 'text-muted hover:bg-canvas hover:text-ink'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-signal')} />
                {!collapsed && (
                  <span className="animate-fade-in truncate">{item.label}</span>
                )}
              </button>
            )
          })()}
        </div>
      </nav>

      {/* Company info */}
      {!collapsed && (
        <div className="animate-fade-in border-t border-line px-4 py-3">
          <p className="text-xs font-bold text-ink">Spark Electric LLC</p>
          <p className="text-[11px] text-muted">Austin, TX</p>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex h-10 items-center justify-center border-t border-line text-muted hover:bg-canvas hover:text-ink transition-colors cursor-pointer"
      >
        <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
      </button>
    </aside>
  )
}
