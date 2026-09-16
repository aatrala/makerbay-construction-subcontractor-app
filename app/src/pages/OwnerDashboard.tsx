import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { projects, scheduleTasks, subcontractors, dailyLogs, activityEvents, scheduleConflicts } from '@/data/mock'
import type { PageRoute } from '@/types'
import {
  Building2, Calendar, CheckCircle2, Clock, Users, Camera,
  TrendingUp, AlertTriangle, MapPin, BarChart3, Share2, Eye,
  ArrowRight, Flag, Shield,
} from 'lucide-react'

interface OwnerDashboardProps {
  onNavigate: (page: PageRoute) => void
}

export function OwnerDashboard({ onNavigate }: OwnerDashboardProps) {
  const activeProjects = projects.filter(p => p.status === 'active')
  const totalSubs = subcontractors.length
  const activeConflicts = scheduleConflicts.filter(c => c.resolutionStatus === 'detected').length
  const allPhotos = dailyLogs.flatMap(l => l.photos)
  const totalCrew = scheduleTasks.filter(t => t.status === 'in-progress').reduce((s, t) => s + t.crewOnSite, 0)

  const statusColor = (status: string) => {
    const map: Record<string, 'success' | 'danger' | 'warning' | 'outline' | 'signal' | 'blue'> = {
      active: 'signal', completed: 'success', 'on-hold': 'warning', pending: 'outline',
    }
    return map[status] ?? 'outline'
  }

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Read-only banner */}
      <div className="flex items-center gap-3 rounded-xl border border-blue/20 bg-blue-soft/30 p-4">
        <Eye className="h-5 w-5 text-blue shrink-0" />
        <div>
          <p className="text-sm font-bold text-ink">Owner View — Read Only</p>
          <p className="text-xs text-muted">You're viewing project progress as a project owner/developer. Contact your GC for any changes.</p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto shrink-0">
          <Share2 className="h-3.5 w-3.5" /> Share Dashboard
        </Button>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {activeProjects.map(project => {
          const projectTasks = scheduleTasks.filter(t => t.projectId === project.id)
          const completedTasks = projectTasks.filter(t => t.status === 'completed').length
          const inProgressTasks = projectTasks.filter(t => t.status === 'in-progress').length
          const delayedTasks = projectTasks.filter(t => t.status === 'delayed' || t.status === 'blocked').length
          const projectPhotos = dailyLogs.filter(l => l.projectId === project.id).flatMap(l => l.photos)
          const projectEvents = activityEvents.filter(e => e.projectId === project.id).slice(0, 3)
          const projectConflicts = scheduleConflicts.filter(c => c.projectId === project.id && c.resolutionStatus === 'detected')

          // Milestones
          const milestones = projectTasks.filter(t => t.milestone)

          return (
            <Card key={project.id} className="lg:col-span-1 overflow-hidden">
              {/* Project Header */}
              <div className="bg-deep text-white p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold">{project.name}</h3>
                    <p className="text-xs text-white/60 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> {project.location}
                    </p>
                  </div>
                  <Badge variant={statusColor(project.status)}>{project.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Job #{project.jobNumber}</span>
                  <span>{formatDate(project.startDate)} → {formatDate(project.endDate)}</span>
                </div>
              </div>

              <CardContent className="p-4 space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider">Overall Progress</span>
                    <span className="text-lg font-extrabold text-ink">{project.percentComplete}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-line overflow-hidden">
                    <div className="h-full rounded-full bg-signal transition-all" style={{ width: `${project.percentComplete}%` }} />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-canvas p-2 text-center">
                    <p className="text-lg font-extrabold text-ink">{projectTasks.length}</p>
                    <p className="text-[10px] text-muted">Tasks</p>
                  </div>
                  <div className="rounded-lg bg-canvas p-2 text-center">
                    <p className="text-lg font-extrabold text-success">{completedTasks}</p>
                    <p className="text-[10px] text-muted">Done</p>
                  </div>
                  <div className="rounded-lg bg-canvas p-2 text-center">
                    <p className={`text-lg font-extrabold ${delayedTasks > 0 ? 'text-danger' : 'text-ink'}`}>{delayedTasks}</p>
                    <p className="text-[10px] text-muted">Delayed</p>
                  </div>
                </div>

                {/* Schedule Status */}
                <div className="flex items-center gap-2 rounded-lg bg-canvas p-2.5">
                  <Calendar className="h-4 w-4 text-signal" />
                  <span className="text-xs text-muted">Schedule:</span>
                  <span className="text-xs font-bold text-ink">
                    {delayedTasks > 0 ? `${delayedTasks} task(s) behind` : inProgressTasks > 0 ? 'On Track' : 'Planning'}
                  </span>
                </div>

                {/* Milestones */}
                {milestones.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Flag className="h-3.5 w-3.5" /> Milestones
                    </p>
                    <div className="space-y-1.5">
                      {milestones.map(m => (
                        <div key={m.id} className="flex items-center gap-2 text-xs">
                          {m.status === 'completed' ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                          ) : m.status === 'in-progress' ? (
                            <Clock className="h-3.5 w-3.5 text-signal shrink-0" />
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full border border-line shrink-0" />
                          )}
                          <span className={`${m.status === 'completed' ? 'text-muted line-through' : 'text-ink font-semibold'}`}>
                            {m.taskName}
                          </span>
                          <span className="ml-auto text-[10px] text-muted">{m.percentComplete}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Conflicts */}
                {projectConflicts.length > 0 && (
                  <div className="rounded-lg border border-danger/20 bg-danger-soft/30 p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-danger" />
                      <p className="text-[11px] font-bold text-danger">{projectConflicts.length} Active Conflict(s)</p>
                    </div>
                    {projectConflicts.map(c => (
                      <p key={c.id} className="text-[11px] text-ink ml-5">{c.description.slice(0, 80)}...</p>
                    ))}
                  </div>
                )}

                {/* Recent Activity */}
                {projectEvents.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Recent Activity</p>
                    <div className="space-y-1.5">
                      {projectEvents.map(e => (
                        <div key={e.id} className="text-xs text-muted">
                          <span className="text-ink font-medium">{e.title}</span>
                          <span className="ml-1">· {e.actorName}</span>
                          <span className="ml-1 text-muted/60">{formatDate(e.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photos */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-line">
                  <span className="flex items-center gap-1 text-muted">
                    <Camera className="h-3.5 w-3.5" /> {projectPhotos.length} progress photos
                  </span>
                  <span className="text-muted">{project.customer}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader><CardTitle>Portfolio Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
            <div className="rounded-lg bg-canvas p-3 text-center">
              <Building2 className="h-5 w-5 text-signal mx-auto mb-1" />
              <p className="text-xl font-extrabold text-ink">{activeProjects.length}</p>
              <p className="text-[11px] text-muted">Active Projects</p>
            </div>
            <div className="rounded-lg bg-canvas p-3 text-center">
              <Users className="h-5 w-5 text-blue mx-auto mb-1" />
              <p className="text-xl font-extrabold text-ink">{totalSubs}</p>
              <p className="text-[11px] text-muted">Subcontractors</p>
            </div>
            <div className="rounded-lg bg-canvas p-3 text-center">
              <HardHatIcon className="h-5 w-5 text-signal mx-auto mb-1" />
              <p className="text-xl font-extrabold text-ink">{totalCrew}</p>
              <p className="text-[11px] text-muted">Crew On Site</p>
            </div>
            <div className="rounded-lg bg-canvas p-3 text-center">
              <Camera className="h-5 w-5 text-teal mx-auto mb-1" />
              <p className="text-xl font-extrabold text-ink">{allPhotos.length}</p>
              <p className="text-[11px] text-muted">Photos</p>
            </div>
            <div className="rounded-lg bg-canvas p-3 text-center">
              <AlertTriangle className="h-5 w-5 text-danger mx-auto mb-1" />
              <p className="text-xl font-extrabold text-danger">{activeConflicts}</p>
              <p className="text-[11px] text-muted">Open Conflicts</p>
            </div>
            <div className="rounded-lg bg-canvas p-3 text-center">
              <BarChart3 className="h-5 w-5 text-violet mx-auto mb-1" />
              <p className="text-xl font-extrabold text-ink">
                {Math.round(activeProjects.reduce((s, p) => s + p.percentComplete, 0) / activeProjects.length)}%
              </p>
              <p className="text-[11px] text-muted">Avg. Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Small helper for the hardhat icon (reusing Shield as substitute)
function HardHatIcon({ className }: { className?: string }) {
  return <Shield className={className} />
}
