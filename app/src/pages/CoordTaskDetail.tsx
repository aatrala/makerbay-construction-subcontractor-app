import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { scheduleTasks, subcontractors, scheduleConflicts } from '@/data/mock'
import type { PageRoute } from '@/types'
import {
  ArrowLeft, Calendar, Users, MapPin, Clock, CheckCircle2, Camera,
  AlertTriangle, ChevronRight, Play, XCircle, ThumbsUp, RotateCcw,
  Link2, Shield, Star,
} from 'lucide-react'

interface CoordTaskDetailProps {
  taskId: string
  onNavigate: (page: PageRoute) => void
}

const statusColors: Record<string, 'success' | 'danger' | 'warning' | 'outline' | 'signal' | 'blue' | 'violet'> = {
  upcoming: 'outline', 'in-progress': 'signal', completed: 'success', delayed: 'danger', blocked: 'danger',
}
const approvalColors: Record<string, 'success' | 'danger' | 'warning' | 'outline' | 'signal' | 'blue' | 'violet'> = {
  'not-started': 'outline', 'in-progress': 'signal', complete: 'blue', approved: 'success', 'rework-requested': 'danger',
}
const approvalLabels: Record<string, string> = {
  'not-started': 'Not Started', 'in-progress': 'In Progress', complete: 'Complete', approved: 'Approved', 'rework-requested': 'Rework Requested',
}

export function CoordTaskDetail({ taskId, onNavigate }: CoordTaskDetailProps) {
  const task = scheduleTasks.find(t => t.id === taskId)
  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-rise-in">
        <AlertTriangle className="h-12 w-12 text-muted/30 mb-3" />
        <p className="text-sm font-semibold text-ink">Task not found</p>
        <Button variant="outline" className="mt-4" onClick={() => onNavigate('schedule')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schedule
        </Button>
      </div>
    )
  }

  const sub = subcontractors.find(s => s.id === task.subcontractorId)
  const depTasks = task.dependencies.map(depId => scheduleTasks.find(t => t.id === depId)).filter(Boolean)
  const conflicts = scheduleConflicts.filter(c => c.taskIds.includes(task.id))
  const taskPhotos = task.photos ?? []

  const formatDateTime = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' +
      d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Back nav */}
      <button onClick={() => onNavigate('schedule')}
        className="flex items-center gap-2 text-xs font-semibold text-signal hover:underline cursor-pointer">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Schedule
      </button>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-extrabold text-ink">{task.taskName}</h2>
            {task.milestone && <Badge variant="signal">Milestone</Badge>}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{task.projectName}</span>
            <span>·</span>
            <span>{task.subcontractorName}</span>
            <span>·</span>
            <Badge variant="outline">{task.trade}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusColors[task.status]}>{task.status}</Badge>
          {task.approvalStatus && <Badge variant={approvalColors[task.approvalStatus]}>{approvalLabels[task.approvalStatus]}</Badge>}
        </div>
      </div>

      {/* Task Actions (simulating sub mobile app workflow) */}
      <Card>
        <CardContent className="p-4">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Task Workflow Actions</p>
          <div className="flex flex-wrap gap-2">
            {task.approvalStatus === 'not-started' || task.status === 'upcoming' ? (
              <Button variant="signal" size="sm"><Play className="h-4 w-4" /> Start Task</Button>
            ) : task.approvalStatus === 'in-progress' ? (
              <>
                <Button variant="default" size="sm"><CheckCircle2 className="h-4 w-4" /> Mark Complete</Button>
                <Button variant="outline" size="sm"><Camera className="h-4 w-4" /> Upload Photo</Button>
              </>
            ) : task.approvalStatus === 'complete' ? (
              <>
                <Button variant="default" size="sm"><ThumbsUp className="h-4 w-4" /> Approve</Button>
                <Button variant="outline" size="sm"><RotateCcw className="h-4 w-4" /> Request Rework</Button>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column — details */}
        <div className="space-y-4 lg:col-span-2">
          {/* Schedule Info */}
          <Card>
            <CardHeader><CardTitle>Schedule</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-canvas p-3">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Start Date</p>
                  <p className="text-sm font-semibold text-ink flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-signal" /> {formatDate(task.startDate)}
                  </p>
                </div>
                <div className="rounded-lg bg-canvas p-3">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">End Date</p>
                  <p className="text-sm font-semibold text-ink flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-signal" /> {formatDate(task.endDate)}
                  </p>
                </div>
                <div className="rounded-lg bg-canvas p-3">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Duration</p>
                  <p className="text-sm font-semibold text-ink flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-signal" /> {task.durationDays} days
                  </p>
                </div>
                <div className="rounded-lg bg-canvas p-3">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-line overflow-hidden">
                      <div className={`h-full rounded-full ${task.status === 'delayed' || task.status === 'blocked' ? 'bg-danger' : 'bg-signal'}`}
                        style={{ width: `${task.percentComplete}%` }} />
                    </div>
                    <span className="text-sm font-bold text-ink">{task.percentComplete}%</span>
                  </div>
                </div>
              </div>
              {task.location && (
                <div className="flex items-center gap-2 mt-3 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5" /> Location: {task.location}
                </div>
              )}
              {task.startedAt && (
                <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                  <Play className="h-3.5 w-3.5" /> Started: {formatDateTime(task.startedAt)}
                </div>
              )}
              {task.completedAt && (
                <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Completed: {formatDateTime(task.completedAt)}
                </div>
              )}
              {task.approvedAt && (
                <div className="flex items-center gap-2 mt-1 text-xs text-success">
                  <ThumbsUp className="h-3.5 w-3.5" /> Approved: {formatDateTime(task.approvedAt)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dependencies */}
          {depTasks.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Dependencies</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {depTasks.map(dep => dep && (
                    <button key={dep.id} onClick={() => onNavigate('task-detail')}
                      className="flex w-full items-center justify-between rounded-lg border border-line p-3 hover:bg-canvas transition-colors cursor-pointer text-left">
                      <div className="flex items-center gap-3">
                        <Link2 className="h-4 w-4 text-muted shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-ink">{dep.taskName}</p>
                          <p className="text-xs text-muted">{dep.subcontractorName} · {formatDate(dep.startDate)} → {formatDate(dep.endDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={statusColors[dep.status]}>{dep.status}</Badge>
                        <ChevronRight className="h-4 w-4 text-muted" />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Photos */}
          {taskPhotos.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Progress Photos ({taskPhotos.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {taskPhotos.map(photo => (
                    <div key={photo.id} className="rounded-lg border border-line overflow-hidden">
                      <div className="h-32 bg-gradient-to-br from-canvas to-line/30 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted/20" />
                      </div>
                      <div className="p-2.5">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-xs font-semibold text-ink line-clamp-2 flex-1">{photo.caption}</p>
                          <Badge variant={photo.verified ? 'success' : 'warning'}>
                            {photo.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-muted">
                          <MapPin className="h-2.5 w-2.5" /> {photo.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {task.notes && (
            <div className="rounded-lg border border-danger/20 bg-danger-soft p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-danger" />
                <p className="text-xs font-bold text-danger uppercase tracking-wider">Blockers / Notes</p>
              </div>
              <p className="text-sm text-ink">{task.notes}</p>
            </div>
          )}
        </div>

        {/* Right column — sub info + conflicts */}
        <div className="space-y-4">
          {/* Sub Info */}
          {sub && (
            <Card>
              <CardHeader><CardTitle>Subcontractor</CardTitle></CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-signal-soft text-signal text-lg font-extrabold mb-2">
                    {sub.companyName.charAt(0)}
                  </div>
                  <h3 className="text-sm font-bold text-ink">{sub.companyName}</h3>
                  <p className="text-xs text-muted">{sub.trade} · {sub.licenseNumber}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                    <span className="text-xs font-bold text-ink">{sub.rating}</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Contact</span>
                    <span className="font-semibold text-ink">{sub.contactName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Phone</span>
                    <span className="font-semibold text-ink">{sub.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Crew Size</span>
                    <span className="font-semibold text-ink">{sub.crewSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Insurance</span>
                    <Badge variant={sub.insuranceStatus === 'current' ? 'success' : sub.insuranceStatus === 'expiring-soon' ? 'warning' : 'danger'}>
                      {sub.insuranceStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conflicts */}
          {conflicts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-danger" /> Conflicts ({conflicts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {conflicts.map(c => (
                    <div key={c.id} className={`rounded-lg border p-3 ${c.resolutionStatus === 'resolved' ? 'border-success/20 bg-success-soft/30' : 'border-danger/20 bg-danger-soft/30'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={c.severity === 'high' ? 'danger' : 'warning'}>{c.severity}</Badge>
                        <Badge variant={c.resolutionStatus === 'resolved' ? 'success' : 'outline'}>{c.resolutionStatus}</Badge>
                      </div>
                      <p className="text-xs font-semibold text-ink mb-1">{c.conflictType} conflict</p>
                      <p className="text-[11px] text-muted mb-2">{c.description}</p>
                      {c.suggestedResolution && (
                        <div className="rounded bg-canvas p-2">
                          <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">Suggested Resolution</p>
                          <p className="text-[11px] text-ink">{c.suggestedResolution}</p>
                        </div>
                      )}
                      {c.resolutionStatus === 'detected' && (
                        <div className="flex gap-2 mt-2">
                          <Button variant="default" size="sm"><ThumbsUp className="h-3 w-3" /> Accept</Button>
                          <Button variant="outline" size="sm"><XCircle className="h-3 w-3" /> Dismiss</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Crew on site */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-signal" />
                <p className="text-xs font-bold text-muted uppercase tracking-wider">Crew On Site</p>
              </div>
              <p className="text-3xl font-extrabold text-ink">{task.crewOnSite}</p>
              <p className="text-xs text-muted mt-0.5">crew members currently active</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
