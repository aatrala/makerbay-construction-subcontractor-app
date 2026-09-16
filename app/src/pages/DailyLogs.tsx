import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { dailyLogs, projects } from '@/data/mock'
import {
  Calendar, Cloud, CloudRain, CloudSnow, Wind, Sun, CloudLightning,
  Users, HardHat, Camera, AlertTriangle, ClipboardList, ChevronDown,
  ChevronUp, Thermometer, FileText, ShieldAlert, Clock, MapPin,
} from 'lucide-react'

const weatherIcons: Record<string, React.ElementType> = {
  clear: Sun, cloudy: Cloud, rain: CloudRain, storm: CloudLightning, snow: CloudSnow, wind: Wind,
}
const weatherLabels: Record<string, string> = {
  clear: 'Clear', cloudy: 'Cloudy', rain: 'Rain', storm: 'Storm', snow: 'Snow', wind: 'Windy',
}

export function DailyLogs() {
  const [projectFilter, setProjectFilter] = useState<string>('all')
  const [expandedLog, setExpandedLog] = useState<string | null>(dailyLogs[0]?.id ?? null)

  const projectIds = [...new Set(dailyLogs.map(l => l.projectId))]
  const projectOptions = projectIds.map(id => ({
    id,
    name: projects.find(p => p.id === id)?.name ?? id,
  }))

  const filtered = dailyLogs
    .filter(l => projectFilter === 'all' || l.projectId === projectFilter)
    .sort((a, b) => b.date.localeCompare(a.date))

  const totalSubs = filtered.reduce((s, l) => s + l.subsOnSite.length, 0)
  const totalPhotos = filtered.reduce((s, l) => s + l.photos.length, 0)
  const totalCrew = filtered.reduce((s, l) => s + l.subsOnSite.reduce((cs, sub) => cs + sub.crewCount, 0), 0)
  const logsWithDelays = filtered.filter(l => l.delays).length

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Summary Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-signal" />
              <p className="text-xs text-muted">Daily Logs</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{filtered.length}</p>
            <p className="text-[11px] text-muted">Log entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue" />
              <p className="text-xs text-muted">Subs Documented</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{totalSubs}</p>
            <p className="text-[11px] text-muted">{totalCrew} total crew members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Camera className="h-4 w-4 text-teal" />
              <p className="text-xs text-muted">Photos Attached</p>
            </div>
            <p className="text-2xl font-extrabold text-ink">{totalPhotos}</p>
            <p className="text-[11px] text-muted">Progress & issue documentation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-danger" />
              <p className="text-xs text-muted">Delays Reported</p>
            </div>
            <p className="text-2xl font-extrabold text-danger">{logsWithDelays}</p>
            <p className="text-[11px] text-muted">Logs with delay notes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)}
            className="h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-signal focus:outline-none">
            <option value="all">All Projects</option>
            {projectOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <Button variant="signal" size="sm"><FileText className="h-4 w-4" /> New Daily Log</Button>
      </div>

      {/* Daily Log Entries */}
      <div className="space-y-4">
        {filtered.map((log, i) => {
          const WeatherIcon = weatherIcons[log.weather] ?? Sun
          const isExpanded = expandedLog === log.id
          const totalCrew = log.subsOnSite.reduce((s, sub) => s + sub.crewCount, 0)

          return (
            <Card key={log.id} className="overflow-hidden" style={{ animationDelay: `${i * 60}ms` }}>
              {/* Header — always visible */}
              <button
                onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                className="w-full cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Weather icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-canvas">
                        <WeatherIcon className="h-6 w-6 text-signal" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm font-bold text-ink">{log.projectName}</h3>
                          <Badge variant="outline">{formatDate(log.date)}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3" /> {log.tempHigh}° / {log.tempLow}°
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {log.subsOnSite.length} subs · {totalCrew} crew
                          </span>
                          <span className="flex items-center gap-1">
                            <Camera className="h-3 w-3" /> {log.photos.length} photos
                          </span>
                          <span>By {log.author}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {log.delays && <Badge variant="danger">Delay</Badge>}
                      {log.safetyNotes && <Badge variant="warning">Safety</Badge>}
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-muted" /> : <ChevronDown className="h-5 w-5 text-muted" />}
                    </div>
                  </div>
                </CardContent>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-line animate-fade-in">
                  {/* Notes */}
                  <div className="p-4 space-y-4">
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-2">
                        <ClipboardList className="h-3.5 w-3.5" /> Daily Summary
                      </h4>
                      <p className="text-sm text-ink leading-relaxed">{log.notes}</p>
                    </div>

                    {/* Safety Notes */}
                    {log.safetyNotes && (
                      <div className="rounded-lg border border-warning/20 bg-warning-soft p-3">
                        <h4 className="flex items-center gap-2 text-xs font-bold text-warning uppercase tracking-wider mb-1">
                          <ShieldAlert className="h-3.5 w-3.5" /> Safety Notes
                        </h4>
                        <p className="text-sm text-ink">{log.safetyNotes}</p>
                      </div>
                    )}

                    {/* Delays */}
                    {log.delays && (
                      <div className="rounded-lg border border-danger/20 bg-danger-soft p-3">
                        <h4 className="flex items-center gap-2 text-xs font-bold text-danger uppercase tracking-wider mb-1">
                          <AlertTriangle className="h-3.5 w-3.5" /> Delays
                        </h4>
                        <p className="text-sm text-ink">{log.delays}</p>
                      </div>
                    )}
                  </div>

                  {/* Subs on Site Table */}
                  <div className="border-t border-line">
                    <div className="p-4">
                      <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-3">
                        <HardHat className="h-3.5 w-3.5" /> Subcontractors On Site ({log.subsOnSite.length})
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-line">
                              <th className="pb-2 text-left text-[11px] font-bold text-muted uppercase tracking-wider">Subcontractor</th>
                              <th className="pb-2 text-left text-[11px] font-bold text-muted uppercase tracking-wider">Trade</th>
                              <th className="pb-2 text-center text-[11px] font-bold text-muted uppercase tracking-wider">Crew</th>
                              <th className="pb-2 text-left text-[11px] font-bold text-muted uppercase tracking-wider">Work Performed</th>
                            </tr>
                          </thead>
                          <tbody>
                            {log.subsOnSite.map((sub, idx) => (
                              <tr key={idx} className="border-b border-line/50 last:border-0">
                                <td className="py-2.5 pr-4 font-semibold text-ink whitespace-nowrap">{sub.subName}</td>
                                <td className="py-2.5 pr-4"><Badge variant="outline">{sub.trade}</Badge></td>
                                <td className="py-2.5 pr-4 text-center font-bold text-ink">{sub.crewCount}</td>
                                <td className="py-2.5 text-muted text-xs leading-relaxed">{sub.workPerformed}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Photos */}
                  {log.photos.length > 0 && (
                    <div className="border-t border-line p-4">
                      <h4 className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider mb-3">
                        <Camera className="h-3.5 w-3.5" /> Photos ({log.photos.length})
                      </h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {log.photos.map(photo => (
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
                              <div className="flex items-center gap-2 text-[10px] text-muted mt-0.5">
                                <span>{photo.takenBy}</span>
                                <span>·</span>
                                <span>{new Date(photo.takenAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Calendar className="h-12 w-12 text-muted/30 mb-3" />
          <p className="text-sm font-semibold text-ink">No daily logs found</p>
          <p className="text-xs text-muted mt-1">Try selecting a different project</p>
        </div>
      )}
    </div>
  )
}
