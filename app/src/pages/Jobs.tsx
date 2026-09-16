import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { projects, wipData, changeOrders } from '@/data/mock'
import type { PageRoute } from '@/types'
import {
  MapPin, Calendar, Users, DollarSign, Plus, Search,
  ArrowUpDown, TrendingUp, TrendingDown,
} from 'lucide-react'

interface JobsProps {
  onNavigate: (page: PageRoute, projectId?: string) => void
}

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'blue' | 'outline'> = {
  active: 'success',
  completed: 'blue',
  'on-hold': 'warning',
  pending: 'outline',
}

export function Jobs({ onNavigate }: JobsProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [view, setView] = useState<'cards' | 'table'>('cards')

  const filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.jobNumber.includes(search) || p.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="h-9 w-64 rounded-lg border border-line bg-surface pl-9 pr-3 text-sm focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
            />
          </div>
          <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
            {['all', 'active', 'completed', 'on-hold'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  statusFilter === s ? 'bg-ink text-white' : 'text-muted hover:text-ink'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-lg border border-line bg-surface p-1">
            <button onClick={() => setView('cards')} className={`rounded-md px-2 py-1 text-xs font-semibold cursor-pointer ${view === 'cards' ? 'bg-ink text-white' : 'text-muted'}`}>Cards</button>
            <button onClick={() => setView('table')} className={`rounded-md px-2 py-1 text-xs font-semibold cursor-pointer ${view === 'table' ? 'bg-ink text-white' : 'text-muted'}`}>Table</button>
          </div>
          <Button variant="signal" size="sm">
            <Plus className="h-4 w-4" /> New Job
          </Button>
        </div>
      </div>

      {/* Card View */}
      {view === 'cards' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, i) => {
            const wip = wipData.find(w => w.projectId === project.id)
            const totalBudget = project.costCodes.reduce((s, cc) => s + cc.budget, 0)
            const totalActual = project.costCodes.reduce((s, cc) => s + cc.actualCost, 0)
            const cos = changeOrders.filter(c => c.projectId === project.id)
            return (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-md hover:border-line/80 transition-all hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => onNavigate('job-detail', project.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-muted">{project.jobNumber}</span>
                        <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                        {project.isPrevailingWage && <Badge variant="violet">PW</Badge>}
                      </div>
                      <h3 className="text-sm font-bold text-ink truncate">{project.name}</h3>
                      <p className="text-xs text-muted mt-0.5">{project.customer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted mb-4">
                    <MapPin className="h-3 w-3" />
                    <span>{project.location}</span>
                    <span className="text-line">|</span>
                    <Calendar className="h-3 w-3" />
                    <span>Ends {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">Percent Complete</span>
                      <span className="font-bold text-ink">{project.percentComplete}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-line overflow-hidden">
                      <div className="h-full rounded-full bg-signal transition-all" style={{ width: `${project.percentComplete}%` }} />
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-canvas p-2">
                      <p className="text-muted">Contract</p>
                      <p className="font-bold text-ink">{formatCurrency(project.revisedContract)}</p>
                    </div>
                    <div className="rounded-lg bg-canvas p-2">
                      <p className="text-muted">Cost to Date</p>
                      <p className="font-bold text-ink">{formatCurrency(totalActual)}</p>
                    </div>
                    <div className="rounded-lg bg-canvas p-2">
                      <p className="text-muted">Billed</p>
                      <p className="font-bold text-ink">{formatCurrency(wip?.billedToDate ?? 0)}</p>
                    </div>
                    <div className="rounded-lg bg-canvas p-2">
                      <p className="text-muted">Margin</p>
                      <p className={`font-bold ${wip && wip.grossProfitPercent > 15 ? 'text-success' : 'text-warning'}`}>
                        {wip ? formatPercent(wip.grossProfitPercent) : '—'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        /* Table View */
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Job</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-muted uppercase tracking-wider">Contract</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-muted uppercase tracking-wider">Cost to Date</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-muted uppercase tracking-wider">Billed</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-muted uppercase tracking-wider">% Complete</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map(project => {
                  const wip = wipData.find(w => w.projectId === project.id)
                  const totalActual = project.costCodes.reduce((s, cc) => s + cc.actualCost, 0)
                  return (
                    <tr key={project.id} className="hover:bg-canvas transition-colors cursor-pointer" onClick={() => onNavigate('job-detail', project.id)}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-ink">{project.name}</p>
                        <p className="text-xs text-muted">{project.jobNumber}</p>
                      </td>
                      <td className="px-4 py-3 text-muted">{project.customer}</td>
                      <td className="px-4 py-3 text-right font-semibold">{formatCurrency(project.revisedContract)}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(totalActual)}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(wip?.billedToDate ?? 0)}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-line overflow-hidden">
                            <div className="h-full rounded-full bg-signal" style={{ width: `${project.percentComplete}%` }} />
                          </div>
                          <span className="text-xs font-semibold">{project.percentComplete}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={statusColors[project.status]}>{project.status}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
