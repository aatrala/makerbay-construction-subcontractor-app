import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { scheduleTasks, projects, scheduleConflicts } from '@/data/mock'
import { Calendar, ChevronLeft, ChevronRight, Filter, Plus, AlertTriangle, ThumbsUp, XCircle } from 'lucide-react'

const statusColors: Record<string, 'success' | 'danger' | 'warning' | 'outline' | 'signal' | 'blue'> = {
  upcoming: 'outline', 'in-progress': 'signal', completed: 'success', delayed: 'danger', blocked: 'danger',
}
const statusBarColors: Record<string, string> = {
  upcoming: 'bg-line', 'in-progress': 'bg-signal', completed: 'bg-success', delayed: 'bg-danger', blocked: 'bg-danger',
}

export function Schedule({ onTaskClick }: { onTaskClick?: (taskId: string) => void }) {
  const [projectFilter, setProjectFilter] = useState<string>('all')
  const [showConflicts, setShowConflicts] = useState(true)

  const activeConflicts = scheduleConflicts.filter(c => c.resolutionStatus === 'detected')

  const projectIds = [...new Set(scheduleTasks.map(t => t.projectId))]
  const projectOptions = projectIds.map(id => ({
    id,
    name: projects.find(p => p.id === id)?.name ?? id,
  }))

  const filtered = scheduleTasks.filter(t => projectFilter === 'all' || t.projectId === projectFilter)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))

  // Compute timeline range
  const allDates = filtered.flatMap(t => [t.startDate, t.endDate])
  const minDate = allDates.length > 0 ? new Date(allDates.sort()[0]) : new Date('2026-01-01')
  const maxDate = allDates.length > 0 ? new Date(allDates.sort().pop()!) : new Date('2026-12-31')
  const totalDays = Math.max((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24), 1)

  const getBarStyle = (start: string, end: string) => {
    const startOffset = (new Date(start).getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    const duration = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${Math.max((duration / totalDays) * 100, 1)}%`,
    }
  }

  // Generate month markers
  const months: { label: string; offset: number }[] = []
  const cursor = new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  while (cursor <= maxDate) {
    const offset = (cursor.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    months.push({ label: cursor.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }), offset: (offset / totalDays) * 100 })
    cursor.setMonth(cursor.getMonth() + 1)
  }

  // Today marker
  const todayOffset = (new Date('2026-09-12').getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
  const todayPosition = (todayOffset / totalDays) * 100

  // Group tasks by project
  const groupedTasks: Record<string, typeof filtered> = {}
  filtered.forEach(t => {
    if (!groupedTasks[t.projectName]) groupedTasks[t.projectName] = []
    groupedTasks[t.projectName].push(t)
  })

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Conflict Detection Banner */}
      {showConflicts && activeConflicts.length > 0 && (
        <div className="space-y-2">
          {activeConflicts.map(conflict => (
            <div key={conflict.id} className="flex items-start gap-3 rounded-xl border border-danger/20 bg-danger-soft p-4 animate-fade-in">
              <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-ink">{conflict.conflictType.charAt(0).toUpperCase() + conflict.conflictType.slice(1)} Conflict Detected</p>
                  <Badge variant={conflict.severity === 'high' ? 'danger' : 'warning'}>{conflict.severity}</Badge>
                  <span className="text-xs text-muted">{conflict.projectName}</span>
                </div>
                <p className="text-xs text-muted mb-1">{conflict.description}</p>
                <div className="rounded-lg bg-white/50 p-2 mt-2">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Suggested Resolution</p>
                  <p className="text-xs text-ink">{conflict.suggestedResolution}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="default" size="sm"><ThumbsUp className="h-3 w-3" /> Accept</Button>
                  <Button variant="outline" size="sm"><XCircle className="h-3 w-3" /> Dismiss</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)}
            className="h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-signal focus:outline-none">
            <option value="all">All Projects</option>
            {projectOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div className="flex gap-2 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-signal" /> In Progress</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-success" /> Completed</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-danger" /> Delayed/Blocked</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-line" /> Upcoming</span>
          </div>
        </div>
        <Button variant="signal" size="sm"><Plus className="h-4 w-4" /> Add Task</Button>
      </div>

      {/* Gantt Chart */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Month headers */}
            <div className="relative h-8 border-b border-line bg-canvas">
              {months.map(m => (
                <div key={m.label} className="absolute top-0 h-full flex items-center border-l border-line/50 px-2"
                  style={{ left: `${m.offset}%` }}>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider">{m.label}</span>
                </div>
              ))}
              {/* Today marker */}
              <div className="absolute top-0 h-full w-px bg-signal z-10" style={{ left: `${todayPosition}%` }}>
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded bg-signal px-1.5 py-0.5 text-[9px] font-bold text-white whitespace-nowrap">
                  Today
                </div>
              </div>
            </div>

            {/* Task rows */}
            {Object.entries(groupedTasks).map(([projectName, tasks]) => (
              <div key={projectName}>
                <div className="px-4 py-2 bg-deep text-white text-xs font-bold uppercase tracking-wider">{projectName}</div>
                {tasks.map(task => {
                  const barStyle = getBarStyle(task.startDate, task.endDate)
                  return (
                    <div key={task.id} className="relative flex items-center h-14 border-b border-line hover:bg-canvas/50 transition-colors cursor-pointer"
                      onClick={() => onTaskClick?.(task.id)}>
                      {/* Left info */}
                      <div className="w-64 shrink-0 px-4 border-r border-line">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-xs font-bold text-ink truncate">{task.taskName}</p>
                          {task.milestone && <span className="text-signal text-[10px]">★</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={statusColors[task.status]}>{task.status}</Badge>
                          <span className="text-[10px] text-muted">{task.subcontractorName}</span>
                        </div>
                      </div>

                      {/* Gantt bar area */}
                      <div className="flex-1 relative h-full">
                        {/* Progress bar */}
                        <div className="absolute top-1/2 -translate-y-1/2 h-6 rounded-md opacity-90"
                          style={{ ...barStyle, background: task.status === 'completed' ? '#10b981' : task.status === 'delayed' || task.status === 'blocked' ? '#ef4444' : task.status === 'upcoming' ? '#e2e8f0' : '#f97316' }}>
                          <div className="h-full rounded-md bg-white/20" style={{ width: `${task.percentComplete}%` }} />
                        </div>
                        {/* Percentage label */}
                        <div className="absolute top-1/2 -translate-y-1/2 text-[10px] font-bold text-white px-2 z-10"
                          style={{ left: `calc(${barStyle.left} + 4px)` }}>
                          {task.percentComplete}%
                        </div>
                        {/* Crew badge */}
                        {task.crewOnSite > 0 && (
                          <div className="absolute top-1/2 -translate-y-1/2 right-2 text-[10px] font-bold text-muted bg-white rounded px-1.5 py-0.5 border border-line">
                            {task.crewOnSite} crew
                          </div>
                        )}
                        {/* Today line */}
                        <div className="absolute top-0 h-full w-px bg-signal/40" style={{ left: `${todayPosition}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dependency / Notes */}
      {filtered.some(t => t.notes) && (
        <Card>
          <CardHeader><CardTitle>Task Notes & Blockers</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filtered.filter(t => t.notes).map(task => (
                <div key={task.id} className="flex items-start gap-3 rounded-lg border border-danger/20 bg-danger-soft p-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-ink">{task.taskName}</p>
                      <Badge variant={statusColors[task.status]}>{task.status}</Badge>
                    </div>
                    <p className="text-xs text-muted">{task.subcontractorName} · {task.projectName}</p>
                    <p className="text-xs text-ink mt-1">{task.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
