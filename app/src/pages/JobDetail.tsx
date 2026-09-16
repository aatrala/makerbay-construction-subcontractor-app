import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatPercent, formatDate } from '@/lib/utils'
import { projects, wipData, changeOrders, timeEntries } from '@/data/mock'
import type { PageRoute } from '@/types'
import {
  ArrowLeft, MapPin, Calendar, User, DollarSign, FileText,
  TrendingUp, TrendingDown, Clock, ChevronRight,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

interface JobDetailProps {
  projectId: string
  onNavigate: (page: PageRoute) => void
}

export function JobDetail({ projectId, onNavigate }: JobDetailProps) {
  const project = projects.find(p => p.id === projectId) ?? projects[0]
  const wip = wipData.find(w => w.projectId === project.id)
  const cos = changeOrders.filter(c => c.projectId === project.id)
  const entries = timeEntries.filter(t => t.projectId === project.id)

  const totalBudget = project.costCodes.reduce((s, cc) => s + cc.budget, 0)
  const totalActual = project.costCodes.reduce((s, cc) => s + cc.actualCost, 0)
  const totalCommitted = project.costCodes.reduce((s, cc) => s + cc.committedCost, 0)

  const costCodeChartData = project.costCodes.map(cc => ({
    name: cc.code,
    budget: cc.budget,
    actual: cc.actualCost,
    committed: cc.committedCost,
  }))

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Back nav + Job header */}
      <div>
        <button onClick={() => onNavigate('jobs')} className="flex items-center gap-1 text-sm text-muted hover:text-ink mb-3 cursor-pointer">
          <ArrowLeft className="h-4 w-4" /> Back to Jobs
        </button>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-xl font-extrabold tracking-tight text-ink">{project.name}</h1>
                  <Badge variant={project.status === 'active' ? 'success' : 'blue'}>{project.status}</Badge>
                  {project.isPrevailingWage && <Badge variant="violet">Prevailing Wage</Badge>}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1"><User className="h-4 w-4" /> {project.customer}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {project.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(project.startDate)} — {formatDate(project.endDate)}</span>
                </div>
                <p className="mt-2 text-sm text-muted max-w-2xl">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit Job</Button>
                <Button variant="signal" size="sm">New Pay App</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {[
          { label: 'Revised Contract', value: formatCurrency(project.revisedContract), sub: `Original: ${formatCurrency(project.contractAmount)}` },
          { label: 'Cost to Date', value: formatCurrency(totalActual), sub: `${formatPercent((totalActual / totalBudget) * 100)} of budget` },
          { label: 'Billed to Date', value: formatCurrency(wip?.billedToDate ?? 0), sub: `${project.retainagePercent}% retainage` },
          { label: 'Gross Margin', value: wip ? formatPercent(wip.grossProfitPercent) : '—', sub: wip ? formatCurrency(wip.grossProfit) : '' },
          { label: 'Open Commitments', value: formatCurrency(totalCommitted), sub: 'POs & subcontracts' },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted mb-1">{item.label}</p>
              <p className="text-lg font-extrabold text-ink">{item.value}</p>
              <p className="text-[11px] text-muted mt-0.5">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost Code Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Cost Codes — Budget vs Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costCodeChartData} layout="vertical" barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} width={80} />
                  <Tooltip formatter={(v) => formatCurrency(Number(v))} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="budget" name="Budget" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="actual" name="Actual" fill="#f97316" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="committed" name="Committed" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Phase Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Phases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {project.costCodes.flatMap(cc =>
                cc.phases.map(ph => ({
                  ...ph,
                  costCodeName: `${cc.code} — ${cc.name}`,
                  pct: ph.budget > 0 ? (ph.actualCost / ph.budget) * 100 : 0,
                }))
              ).map(phase => (
                <div key={phase.id} className="rounded-lg border border-line p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-ink">{phase.name}</p>
                    <span className={`text-xs font-bold ${phase.pct > 90 ? 'text-danger' : phase.pct > 70 ? 'text-warning' : 'text-success'}`}>
                      {phase.pct.toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-[11px] text-muted mb-1.5">{phase.costCodeName}</p>
                  <div className="h-1.5 rounded-full bg-line overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${phase.pct > 90 ? 'bg-danger' : phase.pct > 70 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${Math.min(phase.pct, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted mt-1">
                    <span>{formatCurrency(phase.actualCost)}</span>
                    <span>{formatCurrency(phase.budget)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Orders + Recent Time */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Change Orders</CardTitle>
            <Button variant="outline" size="sm">New CO</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cos.length === 0 && <p className="text-sm text-muted py-4 text-center">No change orders</p>}
              {cos.map(co => (
                <div key={co.id} className="flex items-center justify-between rounded-lg border border-line p-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink">{co.number}</span>
                      <Badge variant={
                        co.status === 'approved' ? 'success' :
                        co.status === 'pending' ? 'signal' :
                        co.status === 'rejected' ? 'danger' : 'outline'
                      }>
                        {co.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted mt-0.5">{co.description}</p>
                  </div>
                  <p className="text-sm font-bold text-ink shrink-0 ml-4">
                    {co.amount > 0 ? formatCurrency(co.amount) : 'TBD'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Time Entries</CardTitle>
            <Button variant="outline" size="sm" onClick={() => onNavigate('time-tracking')}>
              View All <ChevronRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {entries.slice(0, 5).map(entry => (
                <div key={entry.id} className="flex items-center justify-between rounded-lg border border-line p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-canvas flex items-center justify-center text-xs font-bold text-ink">
                      {entry.employeeName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-ink">{entry.employeeName}</p>
                      <p className="text-[11px] text-muted">{entry.phaseName} · {formatDate(entry.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-ink">{entry.totalHours}h</p>
                    <Badge variant={entry.status === 'approved' ? 'success' : entry.status === 'pending' ? 'warning' : 'danger'}>
                      {entry.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {entries.length === 0 && <p className="text-sm text-muted py-4 text-center">No time entries yet</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
