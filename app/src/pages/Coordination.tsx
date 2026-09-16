import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { subcontractors, scheduleTasks, dailyLogs, coordNotifications, projects } from '@/data/mock'
import type { PageRoute } from '@/types'
import {
  Users, Clock, AlertTriangle, CheckCircle2, Camera, ArrowRight,
  Calendar, HardHat, Bell, ChevronRight, ShieldAlert, TrendingUp, TrendingDown, Plus,
} from 'lucide-react'

interface CoordinationProps {
  onNavigate: (page: PageRoute) => void
}

export function Coordination({ onNavigate }: CoordinationProps) {
  const activeSubs = subcontractors.filter(s => s.status !== 'completed' && s.status !== 'not-started')
  const behindSubs = subcontractors.filter(s => s.status === 'behind' || s.status === 'issue')
  const activeTasks = scheduleTasks.filter(t => t.status === 'in-progress' || t.status === 'delayed' || t.status === 'blocked')
  const delayedTasks = scheduleTasks.filter(t => t.status === 'delayed' || t.status === 'blocked')
  const unreadNotifs = coordNotifications.filter(n => !n.read)
  const todayLogs = dailyLogs.filter(d => d.date === '2026-09-12')
  const totalCrewOnSite = activeTasks.reduce((s, t) => s + t.crewOnSite, 0)
  const expiredInsurance = subcontractors.filter(s => s.insuranceStatus === 'expired')

  const statusColor = (status: string) => {
    const map: Record<string, 'success' | 'danger' | 'warning' | 'outline' | 'blue' | 'violet' | 'signal'> = {
      'on-track': 'success', behind: 'danger', ahead: 'blue', 'not-started': 'outline', completed: 'violet', issue: 'danger',
      'in-progress': 'signal', delayed: 'danger', blocked: 'danger', upcoming: 'outline',
    }
    return map[status] ?? 'outline'
  }

  const priorityColor = (priority: string) => {
    const map: Record<string, 'danger' | 'warning' | 'blue' | 'outline'> = {
      urgent: 'danger', high: 'warning', medium: 'blue', low: 'outline',
    }
    return map[priority] ?? 'outline'
  }

  const notifIcon = (type: string) => {
    const map: Record<string, React.ElementType> = {
      'delay-alert': AlertTriangle, rfi: HardHat, issue: AlertTriangle,
      'photo-submitted': Camera, inspection: CheckCircle2,
      'schedule-change': Calendar, milestone: TrendingUp,
    }
    return map[type] ?? Bell
  }

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Quick Actions */}
      <div className="flex items-center gap-3">
        <Button variant="signal" size="sm" onClick={() => onNavigate('project-wizard')}>
          <Plus className="h-4 w-4" /> New Project
        </Button>
        <Button variant="outline" size="sm" onClick={() => onNavigate('activity')}>
          <ChevronRight className="h-4 w-4" /> Activity Feed
        </Button>
      </div>
      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('sub-directory')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue" />
              <p className="text-xs text-muted">Active Subs</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{activeSubs.length}</p>
            <p className="text-[11px] text-muted">{subcontractors.length} total on platform</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('schedule')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-signal" />
              <p className="text-xs text-muted">Crew On Site Today</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{totalCrewOnSite}</p>
            <p className="text-[11px] text-muted">{activeTasks.length} active tasks</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('schedule')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-danger" />
              <p className="text-xs text-muted">Delayed / Blocked</p>
            </div>
            <p className="text-2xl font-extrabold text-danger">{delayedTasks.length}</p>
            <p className="text-[11px] text-muted">Tasks need attention</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-4 w-4 text-violet" />
              <p className="text-xs text-muted">Unread Alerts</p>
            </div>
            <p className="text-2xl font-extrabold text-violet">{unreadNotifs.length}</p>
            <p className="text-[11px] text-muted">{coordNotifications.length} total notifications</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('daily-logs')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Camera className="h-4 w-4 text-teal" />
              <p className="text-xs text-muted">Daily Logs Today</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{todayLogs.length}</p>
            <p className="text-[11px] text-muted">{todayLogs.reduce((s, l) => s + l.photos.length, 0)} photos submitted</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Banner */}
      {(behindSubs.length > 0 || expiredInsurance.length > 0) && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {behindSubs.map(sub => (
            <div key={sub.id} className="flex items-start gap-3 rounded-xl border border-danger/20 bg-danger-soft p-4">
              <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{sub.companyName} — {sub.status === 'behind' ? 'Behind Schedule' : 'Issue Reported'}</p>
                <p className="text-xs text-muted mt-0.5">{sub.notes}</p>
              </div>
              <Badge variant="danger">{sub.trade}</Badge>
            </div>
          ))}
          {expiredInsurance.map(sub => (
            <div key={sub.id} className="flex items-start gap-3 rounded-xl border border-warning/20 bg-warning-soft p-4">
              <ShieldAlert className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{sub.companyName} — Insurance Expired</p>
                <p className="text-xs text-muted mt-0.5">Certificate expired {formatDate(sub.insuranceExpiry)}. Updated COI required before further work.</p>
              </div>
              <Badge variant="warning">{sub.trade}</Badge>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Schedule Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Active Schedule Tasks</CardTitle>
            <button onClick={() => onNavigate('schedule')} className="flex items-center gap-1 text-xs font-semibold text-signal hover:underline cursor-pointer">
              Full schedule <ArrowRight className="h-3 w-3" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeTasks.map(task => (
                <div key={task.id} className="rounded-lg border border-line p-3 hover:bg-canvas transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-ink">{task.taskName}</p>
                        {task.milestone && <Badge variant="signal">Milestone</Badge>}
                      </div>
                      <p className="text-xs text-muted">{task.subcontractorName} · {task.projectName}</p>
                    </div>
                    <Badge variant={statusColor(task.status)}>{task.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted">Progress</span>
                        <span className="font-bold text-ink">{task.percentComplete}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-line overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${task.status === 'delayed' || task.status === 'blocked' ? 'bg-danger' : 'bg-signal'}`}
                          style={{ width: `${task.percentComplete}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-muted">{task.crewOnSite} crew</span>
                    </div>
                  </div>
                  {task.notes && <p className="text-[11px] text-danger mt-1.5 font-medium">{task.notes}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[480px] overflow-y-auto">
              {coordNotifications.slice(0, 8).map(notif => {
                const Icon = notifIcon(notif.type)
                return (
                  <div
                    key={notif.id}
                    className={`rounded-lg border p-3 transition-colors ${!notif.read ? 'border-signal/30 bg-signal-soft/30' : 'border-line'}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`shrink-0 rounded-lg p-1.5 ${
                        notif.priority === 'urgent' ? 'bg-danger-soft text-danger' :
                        notif.priority === 'high' ? 'bg-warning-soft text-warning' :
                        'bg-canvas text-muted'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-xs font-bold text-ink truncate">{notif.title}</p>
                          {!notif.read && <span className="h-2 w-2 rounded-full bg-signal shrink-0" />}
                        </div>
                        <p className="text-[11px] text-muted line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-muted/60 mt-1">{notif.projectName} · {formatDate(notif.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Subs On Site */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Subs On Site Today</CardTitle>
          <button onClick={() => onNavigate('daily-logs')} className="flex items-center gap-1 text-xs font-semibold text-signal hover:underline cursor-pointer">
            View daily logs <ChevronRight className="h-3 w-3" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {todayLogs.flatMap(log =>
              log.subsOnSite.map((sub, i) => (
                <div key={`${log.id}-${i}`} className="rounded-lg border border-line p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-ink">{sub.subName}</p>
                    <Badge variant="outline">{sub.trade}</Badge>
                  </div>
                  <p className="text-[11px] text-muted mb-2">{log.projectName}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-muted">
                      <Users className="h-3 w-3" /> {sub.crewCount} crew
                    </span>
                  </div>
                  <p className="text-[11px] text-muted mt-1.5 line-clamp-2">{sub.workPerformed}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
