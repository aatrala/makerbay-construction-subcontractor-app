import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { coordNotifications, projects } from '@/data/mock'
import type { NotificationType, NotificationPriority } from '@/types'
import {
  Bell, AlertTriangle, Camera, Calendar, CheckCircle2, HardHat,
  TrendingUp, Filter, CheckCheck, Eye, EyeOff, MessageSquare,
  Clock, Zap,
} from 'lucide-react'

const typeIcons: Record<string, React.ElementType> = {
  'delay-alert': AlertTriangle, rfi: HardHat, issue: AlertTriangle,
  'photo-submitted': Camera, inspection: CheckCircle2,
  'schedule-change': Calendar, milestone: TrendingUp,
}
const typeLabels: Record<string, string> = {
  'delay-alert': 'Delay Alerts', rfi: 'RFIs', issue: 'Issues',
  'photo-submitted': 'Photos', inspection: 'Inspections',
  'schedule-change': 'Schedule Changes', milestone: 'Milestones',
}
const priorityColors: Record<string, 'danger' | 'warning' | 'blue' | 'outline'> = {
  urgent: 'danger', high: 'warning', medium: 'blue', low: 'outline',
}

export function NotificationCenter() {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [projectFilter, setProjectFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [showRead, setShowRead] = useState(true)

  const projectIds = [...new Set(coordNotifications.map(n => n.projectId))]
  const projectOptions = projectIds.map(id => ({
    id,
    name: projects.find(p => p.id === id)?.name ?? id,
  }))

  const types: NotificationType[] = ['delay-alert', 'rfi', 'issue', 'photo-submitted', 'inspection', 'schedule-change', 'milestone']

  const filtered = coordNotifications
    .filter(n => {
      const matchType = typeFilter === 'all' || n.type === typeFilter
      const matchProject = projectFilter === 'all' || n.projectId === projectFilter
      const matchPriority = priorityFilter === 'all' || n.priority === priorityFilter
      const matchRead = showRead || !n.read
      return matchType && matchProject && matchPriority && matchRead
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const unreadCount = coordNotifications.filter(n => !n.read).length
  const urgentCount = coordNotifications.filter(n => n.priority === 'urgent' && !n.read).length

  const formatTime = (iso: string) => {
    const d = new Date(iso)
    const now = new Date('2026-09-13T12:00:00')
    const diffMs = now.getTime() - d.getTime()
    const diffHrs = diffMs / (1000 * 60 * 60)
    if (diffHrs < 1) return `${Math.round(diffMs / (1000 * 60))}m ago`
    if (diffHrs < 24) return `${Math.round(diffHrs)}h ago`
    if (diffHrs < 48) return 'Yesterday'
    return formatDate(iso)
  }

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-4 w-4 text-signal" />
              <p className="text-xs text-muted">Total Notifications</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{coordNotifications.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="h-4 w-4 text-violet" />
              <p className="text-xs text-muted">Unread</p>
            </div>
            <p className="text-2xl font-extrabold text-violet">{unreadCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-danger" />
              <p className="text-xs text-muted">Urgent Unread</p>
            </div>
            <p className="text-2xl font-extrabold text-danger">{urgentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCheck className="h-4 w-4 text-success" />
              <p className="text-xs text-muted">Read</p>
            </div>
            <p className="text-2xl font-extrabold text-success">{coordNotifications.length - unreadCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)}
            className="h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-signal focus:outline-none">
            <option value="all">All Projects</option>
            {projectOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
            className="h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-signal focus:outline-none">
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
            {['all', ...types].map(t => {
              const Icon = t === 'all' ? Filter : typeIcons[t] ?? Bell
              return (
                <button key={t} onClick={() => setTypeFilter(t)}
                  className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold cursor-pointer transition-colors ${
                    typeFilter === t ? 'bg-ink text-white' : 'text-muted hover:text-ink'
                  }`}>
                  <Icon className="h-3 w-3" />
                  {t === 'all' ? 'All' : typeLabels[t]}
                </button>
              )
            })}
          </div>
          <button onClick={() => setShowRead(!showRead)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
              showRead ? 'bg-canvas text-ink' : 'bg-signal-soft text-signal'
            }`}>
            {showRead ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            {showRead ? 'Show All' : 'Unread Only'}
          </button>
        </div>
        <Button variant="outline" size="sm"><CheckCheck className="h-4 w-4" /> Mark All Read</Button>
      </div>

      {/* Notification List */}
      <Card>
        <CardContent className="p-0 divide-y divide-line">
          {filtered.length > 0 ? filtered.map(notif => {
            const Icon = typeIcons[notif.type] ?? Bell
            return (
              <div key={notif.id}
                className={`flex items-start gap-4 p-4 transition-colors hover:bg-canvas/50 ${!notif.read ? 'bg-signal-soft/10' : ''}`}>
                <div className={`shrink-0 rounded-xl p-2.5 ${
                  notif.priority === 'urgent' ? 'bg-danger-soft text-danger' :
                  notif.priority === 'high' ? 'bg-warning-soft text-warning' :
                  notif.priority === 'medium' ? 'bg-blue-soft text-blue' :
                  'bg-canvas text-muted'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-sm ${!notif.read ? 'font-bold' : 'font-semibold'} text-ink`}>{notif.title}</p>
                    {!notif.read && <span className="h-2 w-2 rounded-full bg-signal shrink-0" />}
                  </div>
                  <p className="text-xs text-muted line-clamp-2 mb-1.5">{notif.message}</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatTime(notif.createdAt)}</span>
                    <span>{notif.projectName}</span>
                    {notif.fromSub && <span>From: {notif.fromSub}</span>}
                    {notif.toSub && <span>To: {notif.toSub}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge variant={priorityColors[notif.priority]}>{notif.priority}</Badge>
                  {!notif.read && (
                    <button className="text-[10px] font-semibold text-signal hover:underline cursor-pointer">
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            )
          }) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="h-12 w-12 text-muted/30 mb-3" />
              <p className="text-sm font-semibold text-ink">No notifications match your filters</p>
              <p className="text-xs text-muted mt-1">Try adjusting the filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
