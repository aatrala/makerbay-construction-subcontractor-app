import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { activityEvents, projects } from '@/data/mock'
import type { ActivityEventType } from '@/types'
import {
  Play, CheckCircle2, ThumbsUp, Camera, Calendar, AlertTriangle,
  Users, TrendingUp, Filter, Clock, Activity,
} from 'lucide-react'

const typeIcons: Record<string, React.ElementType> = {
  'task-started': Play, 'task-completed': CheckCircle2, 'task-approved': ThumbsUp,
  'photo-uploaded': Camera, 'schedule-changed': Calendar, 'conflict-detected': AlertTriangle,
  'sub-joined': Users, 'milestone-reached': TrendingUp,
}
const typeColors: Record<string, string> = {
  'task-started': 'bg-signal-soft text-signal',
  'task-completed': 'bg-success-soft text-success',
  'task-approved': 'bg-blue-soft text-blue',
  'photo-uploaded': 'bg-teal-soft text-teal',
  'schedule-changed': 'bg-warning-soft text-warning',
  'conflict-detected': 'bg-danger-soft text-danger',
  'sub-joined': 'bg-violet-soft text-violet',
  'milestone-reached': 'bg-emerald-soft text-emerald',
}
const typeLabels: Record<string, string> = {
  'task-started': 'Task Started', 'task-completed': 'Completed', 'task-approved': 'Approved',
  'photo-uploaded': 'Photo', 'schedule-changed': 'Schedule', 'conflict-detected': 'Conflict',
  'sub-joined': 'Sub Joined', 'milestone-reached': 'Milestone',
}
const roleColors: Record<string, 'signal' | 'blue' | 'outline' | 'violet'> = {
  gc: 'signal', sub: 'blue', system: 'outline', owner: 'violet',
}

export function ActivityFeed() {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [projectFilter, setProjectFilter] = useState<string>('all')

  const projectIds = [...new Set(activityEvents.map(e => e.projectId))]
  const projectOptions = projectIds.map(id => ({
    id,
    name: projects.find(p => p.id === id)?.name ?? id,
  }))

  const types: ActivityEventType[] = ['task-started', 'task-completed', 'task-approved', 'photo-uploaded', 'schedule-changed', 'conflict-detected', 'sub-joined', 'milestone-reached']

  const filtered = activityEvents
    .filter(e => {
      const matchType = typeFilter === 'all' || e.type === typeFilter
      const matchProject = projectFilter === 'all' || e.projectId === projectFilter
      return matchType && matchProject
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  // Group by date
  const grouped: Record<string, typeof filtered> = {}
  filtered.forEach(e => {
    const dateKey = new Date(e.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    if (!grouped[dateKey]) grouped[dateKey] = []
    grouped[dateKey].push(e)
  })

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-signal" />
              <p className="text-xs text-muted">Total Events</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{activityEvents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-danger" />
              <p className="text-xs text-muted">Conflicts</p>
            </div>
            <p className="text-2xl font-extrabold text-danger">
              {activityEvents.filter(e => e.type === 'conflict-detected').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <p className="text-xs text-muted">Completions</p>
            </div>
            <p className="text-2xl font-extrabold text-success">
              {activityEvents.filter(e => e.type === 'task-completed' || e.type === 'task-approved').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Camera className="h-4 w-4 text-teal" />
              <p className="text-xs text-muted">Photos Uploaded</p>
            </div>
            <p className="text-2xl font-extrabold text-teal">
              {activityEvents.filter(e => e.type === 'photo-uploaded').length}
            </p>
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
          <div className="flex gap-1 rounded-lg border border-line bg-surface p-1 flex-wrap">
            <button onClick={() => setTypeFilter('all')}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold cursor-pointer transition-colors ${typeFilter === 'all' ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}>
              All
            </button>
            {types.map(t => {
              const Icon = typeIcons[t] ?? Activity
              return (
                <button key={t} onClick={() => setTypeFilter(t)}
                  className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold cursor-pointer transition-colors ${
                    typeFilter === t ? 'bg-ink text-white' : 'text-muted hover:text-ink'
                  }`}>
                  <Icon className="h-3 w-3" />
                  {typeLabels[t]}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(grouped).map(([dateKey, events]) => (
          <div key={dateKey}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-line" />
              <span className="text-xs font-bold text-muted uppercase tracking-wider">{dateKey}</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <div className="relative ml-6 space-y-4">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-line" />
              {events.map((event, i) => {
                const Icon = typeIcons[event.type] ?? Activity
                const colorClass = typeColors[event.type] ?? 'bg-canvas text-muted'
                return (
                  <div key={event.id} className="relative pl-8" style={{ animationDelay: `${i * 40}ms` }}>
                    {/* Timeline dot */}
                    <div className={`absolute -left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full ${colorClass}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <Card className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-ink">{event.title}</p>
                            <Badge variant={roleColors[event.actorRole]}>{event.actorRole.toUpperCase()}</Badge>
                          </div>
                          <span className="text-[11px] text-muted flex items-center gap-1 shrink-0">
                            <Clock className="h-3 w-3" /> {formatTime(event.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-muted mb-2">{event.description}</p>
                        <div className="flex items-center gap-3 text-[11px] text-muted">
                          <span className="font-semibold text-ink">{event.actorName}</span>
                          <span>{event.projectName}</span>
                          {event.taskName && (
                            <span className="flex items-center gap-1 text-signal font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-signal" /> {event.taskName}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Activity className="h-12 w-12 text-muted/30 mb-3" />
          <p className="text-sm font-semibold text-ink">No activity events found</p>
          <p className="text-xs text-muted mt-1">Try adjusting the filter criteria</p>
        </div>
      )}
    </div>
  )
}
