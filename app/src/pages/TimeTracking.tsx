import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrencyDetailed, formatDate } from '@/lib/utils'
import { timeEntries, employees, projects } from '@/data/mock'
import { Clock, Check, X, MapPin, Plus, Filter, User, Calendar } from 'lucide-react'

export function TimeTracking() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [entries, setEntries] = useState(timeEntries)

  const filtered = entries.filter(e => statusFilter === 'all' || e.status === statusFilter)
  const totalHours = filtered.reduce((s, e) => s + e.totalHours, 0)
  const totalLaborCost = filtered.reduce((s, e) => s + (e.rate + e.laborBurden) * e.totalHours, 0)
  const pendingCount = entries.filter(e => e.status === 'pending').length
  const approvedCount = entries.filter(e => e.status === 'approved').length

  const handleApprove = (id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status: 'approved' as const } : e))
  }
  const handleReject = (id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status: 'rejected' as const } : e))
  }
  const handleApproveAll = () => {
    setEntries(prev => prev.map(e => e.status === 'pending' ? { ...e, status: 'approved' as const } : e))
  }

  // Group by date
  const grouped: Record<string, typeof entries> = {}
  filtered.forEach(entry => {
    if (!grouped[entry.date]) grouped[entry.date] = []
    grouped[entry.date].push(entry)
  })

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Hours (Filtered)</p>
          <p className="text-2xl font-extrabold text-ink">{totalHours.toFixed(1)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Labor Cost</p>
          <p className="text-2xl font-extrabold text-ink">{formatCurrencyDetailed(totalLaborCost)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Pending Approval</p>
          <p className="text-2xl font-extrabold text-warning">{pendingCount}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Approved</p>
          <p className="text-2xl font-extrabold text-success">{approvedCount}</p>
        </CardContent></Card>
      </div>

      {/* Actions bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  statusFilter === s ? 'bg-ink text-white' : 'text-muted hover:text-ink'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleApproveAll}>
              <Check className="h-4 w-4" /> Approve All Pending
            </Button>
          )}
          <Button variant="signal" size="sm">
            <Plus className="h-4 w-4" /> Add Time Entry
          </Button>
        </div>
      </div>

      {/* Entries grouped by date */}
      <div className="space-y-6">
        {Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a)).map(([date, dayEntries]) => {
          const dayHours = dayEntries.reduce((s, e) => s + e.totalHours, 0)
          const dayCost = dayEntries.reduce((s, e) => s + (e.rate + e.laborBurden) * e.totalHours, 0)
          return (
            <Card key={date}>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted" />
                    {formatDate(date)}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span>{dayHours.toFixed(1)} hours</span>
                  <span>{formatCurrencyDetailed(dayCost)}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-line">
                  {dayEntries.map(entry => (
                    <div key={entry.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="h-9 w-9 shrink-0 rounded-full bg-canvas flex items-center justify-center text-xs font-bold text-ink">
                          {entry.employeeName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-ink">{entry.employeeName}</p>
                            <Badge variant="outline">{entry.classification}</Badge>
                          </div>
                          <p className="text-xs text-muted truncate">
                            {entry.projectName} — {entry.phaseName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <div className="text-right">
                          <p className="text-sm font-bold text-ink">
                            {entry.regularHours}h
                            {entry.overtimeHours > 0 && <span className="text-signal ml-1">+{entry.overtimeHours}h OT</span>}
                          </p>
                          <p className="text-[11px] text-muted">${entry.rate}/hr + ${entry.laborBurden} burden</p>
                        </div>

                        {entry.status === 'pending' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleApprove(entry.id)}
                              className="rounded-lg p-1.5 text-success hover:bg-success-soft transition-colors cursor-pointer"
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(entry.id)}
                              className="rounded-lg p-1.5 text-danger hover:bg-danger-soft transition-colors cursor-pointer"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        <Badge variant={entry.status === 'approved' ? 'success' : entry.status === 'pending' ? 'warning' : 'danger'}>
                          {entry.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
