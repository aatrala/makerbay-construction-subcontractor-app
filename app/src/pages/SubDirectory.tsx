import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { subcontractors, scheduleTasks } from '@/data/mock'
import { Search, Plus, Phone, Mail, Star, Shield, MapPin, Users, ExternalLink } from 'lucide-react'

const statusColors: Record<string, 'success' | 'danger' | 'warning' | 'outline' | 'blue' | 'violet'> = {
  'on-track': 'success', behind: 'danger', ahead: 'blue', 'not-started': 'outline', completed: 'violet', issue: 'danger',
}
const insuranceColors: Record<string, 'success' | 'warning' | 'danger' | 'outline'> = {
  current: 'success', 'expiring-soon': 'warning', expired: 'danger', 'not-submitted': 'outline',
}

export function SubDirectory() {
  const [search, setSearch] = useState('')
  const [tradeFilter, setTradeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const trades = [...new Set(subcontractors.map(s => s.trade))]

  const filtered = subcontractors.filter(s => {
    const matchSearch = s.companyName.toLowerCase().includes(search.toLowerCase()) ||
      s.trade.toLowerCase().includes(search.toLowerCase()) ||
      s.contactName.toLowerCase().includes(search.toLowerCase())
    const matchTrade = tradeFilter === 'all' || s.trade === tradeFilter
    const matchStatus = statusFilter === 'all' || s.status === statusFilter
    return matchSearch && matchTrade && matchStatus
  })

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subs..."
              className="h-9 w-56 rounded-lg border border-line bg-surface pl-9 pr-3 text-sm focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
          </div>
          <select value={tradeFilter} onChange={e => setTradeFilter(e.target.value)}
            className="h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-signal focus:outline-none">
            <option value="all">All Trades</option>
            {trades.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
            {['all', 'on-track', 'behind', 'issue', 'not-started', 'completed'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold cursor-pointer transition-colors ${
                  statusFilter === s ? 'bg-ink text-white' : 'text-muted hover:text-ink'
                }`}>
                {s === 'all' ? 'All' : s === 'on-track' ? 'On Track' : s === 'not-started' ? 'Not Started' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <Button variant="signal" size="sm"><Plus className="h-4 w-4" /> Add Subcontractor</Button>
      </div>

      {/* Sub cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((sub, i) => {
          const subTasks = scheduleTasks.filter(t => t.subcontractorId === sub.id && (t.status === 'in-progress' || t.status === 'delayed' || t.status === 'blocked'))
          return (
            <Card key={sub.id} className="hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ animationDelay: `${i * 40}ms` }}>
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-bold text-ink truncate">{sub.companyName}</h3>
                      <Badge variant={statusColors[sub.status]}>{sub.status}</Badge>
                    </div>
                    <p className="text-xs text-muted">{sub.trade} · {sub.licenseNumber}</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                    <span className="text-xs font-bold text-ink">{sub.rating}</span>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-1.5 mb-3">
                  <p className="flex items-center gap-2 text-xs text-muted">
                    <Users className="h-3.5 w-3.5" /> {sub.contactName}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-muted">
                    <Phone className="h-3.5 w-3.5" /> {sub.phone}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-muted truncate">
                    <Mail className="h-3.5 w-3.5" /> {sub.email}
                  </p>
                </div>

                {/* Insurance */}
                <div className="flex items-center justify-between rounded-lg bg-canvas p-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className={`h-4 w-4 ${sub.insuranceStatus === 'current' ? 'text-success' : sub.insuranceStatus === 'expiring-soon' ? 'text-warning' : 'text-danger'}`} />
                    <span className="text-[11px] text-muted">Insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted">{formatDate(sub.insuranceExpiry)}</span>
                    <Badge variant={insuranceColors[sub.insuranceStatus]}>{sub.insuranceStatus}</Badge>
                  </div>
                </div>

                {/* Active tasks */}
                {subTasks.length > 0 && (
                  <div className="space-y-1.5 mb-3">
                    <p className="text-[11px] font-bold text-muted uppercase tracking-wider">Active Tasks</p>
                    {subTasks.slice(0, 2).map(task => (
                      <div key={task.id} className="flex items-center justify-between text-xs">
                        <span className="text-ink truncate max-w-[180px]">{task.taskName}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="h-1.5 w-10 rounded-full bg-line overflow-hidden">
                            <div className={`h-full rounded-full ${task.status === 'delayed' || task.status === 'blocked' ? 'bg-danger' : 'bg-signal'}`}
                              style={{ width: `${task.percentComplete}%` }} />
                          </div>
                          <span className="font-semibold">{task.percentComplete}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Crew & Notes */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-line">
                  <span className="text-muted">{sub.crewSize} crew members</span>
                  <span className="text-muted">{sub.activeProjects.length} active project(s)</span>
                </div>
                {sub.notes && <p className="text-[11px] text-muted mt-2 italic line-clamp-2">{sub.notes}</p>}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
