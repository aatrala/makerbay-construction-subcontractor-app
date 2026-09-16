import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { projects, wipData, invoices, timeEntries, changeOrders } from '@/data/mock'
import type { PageRoute } from '@/types'
import {
  TrendingUp, TrendingDown, DollarSign, HardHat, Users, Clock,
  AlertTriangle, ArrowRight, FileText,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'

interface DashboardProps {
  onNavigate: (page: PageRoute) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const activeProjects = projects.filter(p => p.status === 'active')
  const totalContractValue = activeProjects.reduce((sum, p) => sum + p.revisedContract, 0)
  const totalBilled = wipData.filter(w => projects.find(p => p.id === w.projectId && p.status === 'active'))
    .reduce((sum, w) => sum + w.billedToDate, 0)
  const totalCosts = wipData.filter(w => projects.find(p => p.id === w.projectId && p.status === 'active'))
    .reduce((sum, w) => sum + w.costsToDate, 0)
  const openAR = invoices.filter(i => i.status === 'sent' || i.status === 'overdue')
    .reduce((sum, i) => sum + (i.amount - i.paidAmount), 0)
  const pendingTimeEntries = timeEntries.filter(t => t.status === 'pending').length
  const pendingCOs = changeOrders.filter(co => co.status === 'pending' || co.status === 'draft').length

  const kpis = [
    { label: 'Active Jobs', value: activeProjects.length.toString(), change: 12.5, icon: HardHat, color: 'bg-blue-soft text-blue' },
    { label: 'Total Contract Value', value: formatCurrency(totalContractValue), change: 8.2, icon: DollarSign, color: 'bg-success-soft text-success' },
    { label: 'Open AR', value: formatCurrency(openAR), change: -5.3, icon: FileText, color: 'bg-signal-soft text-signal' },
    { label: 'Crew Hours This Week', value: '342', change: 3.1, icon: Users, color: 'bg-violet-soft text-violet' },
  ]

  const jobCostData = activeProjects.map(p => {
    const wip = wipData.find(w => w.projectId === p.id)
    return {
      name: p.jobNumber,
      budget: p.revisedContract,
      actual: wip?.costsToDate ?? 0,
      billed: wip?.billedToDate ?? 0,
    }
  })

  const costTypeData = [
    { name: 'Labor', value: 1842600, color: '#f97316' },
    { name: 'Materials', value: 684300, color: '#0ea5e9' },
    { name: 'Equipment', value: 156800, color: '#7c3aed' },
    { name: 'Subcontracts', value: 224500, color: '#10b981' },
  ]

  return (
    <div className="space-y-6 animate-rise-in">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const isPositive = kpi.change >= 0
          return (
            <Card key={kpi.label} className="hover:border-line/80 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`rounded-lg p-2.5 ${kpi.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(kpi.change)}%
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-extrabold tracking-tight text-ink">{kpi.value}</p>
                  <p className="text-xs text-muted mt-0.5">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Job Cost Comparison */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Job Cost vs Budget vs Billed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobCostData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  />
                  <Bar dataKey="budget" name="Contract" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Actual Cost" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="billed" name="Billed" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {costTypeData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-2">
              {costTypeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted">{item.name}</span>
                  </div>
                  <span className="font-semibold text-ink">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Jobs Summary */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Active Jobs</CardTitle>
            <button onClick={() => onNavigate('jobs')} className="flex items-center gap-1 text-xs font-semibold text-signal hover:underline cursor-pointer">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeProjects.map((project) => {
                const wip = wipData.find(w => w.projectId === project.id)
                return (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-lg border border-line p-3 hover:bg-canvas transition-colors cursor-pointer"
                    onClick={() => onNavigate('jobs')}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-ink truncate">{project.name}</p>
                        {project.isPrevailingWage && <Badge variant="violet">PW</Badge>}
                      </div>
                      <p className="text-xs text-muted mt-0.5">{project.customer} · {project.jobNumber}</p>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <p className="text-sm font-bold text-ink">{formatCurrency(project.revisedContract)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-1.5 w-16 rounded-full bg-line overflow-hidden">
                          <div
                            className="h-full rounded-full bg-signal transition-all"
                            style={{ width: `${project.percentComplete}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-muted">{project.percentComplete}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Actions Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTimeEntries > 0 && (
                <div className="flex items-start gap-3 rounded-lg border border-warning/20 bg-warning-soft p-3">
                  <Clock className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{pendingTimeEntries} time entries pending approval</p>
                    <p className="text-xs text-muted mt-0.5">Review crew hours before payroll runs</p>
                  </div>
                </div>
              )}
              {pendingCOs > 0 && (
                <div className="flex items-start gap-3 rounded-lg border border-signal/20 bg-signal-soft p-3">
                  <FileText className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{pendingCOs} change orders need attention</p>
                    <p className="text-xs text-muted mt-0.5">Draft or pending change orders require review</p>
                  </div>
                </div>
              )}
              {invoices.some(i => i.status === 'overdue') && (
                <div className="flex items-start gap-3 rounded-lg border border-danger/20 bg-danger-soft p-3">
                  <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {invoices.filter(i => i.status === 'overdue').length} overdue invoice(s)
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {formatCurrency(invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + (i.amount - i.paidAmount), 0))} past due — follow up with GC
                    </p>
                  </div>
                </div>
              )}
              {wipData.some(w => w.overUnderBilling < -100000) && (
                <div className="flex items-start gap-3 rounded-lg border border-violet/20 bg-violet-soft p-3">
                  <TrendingDown className="h-5 w-5 text-violet shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Under-billing detected on active jobs</p>
                    <p className="text-xs text-muted mt-0.5">Consider submitting pay applications for work completed</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 rounded-lg border border-line bg-canvas p-3">
                <DollarSign className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-ink">Payroll period closes Friday</p>
                  <p className="text-xs text-muted mt-0.5">Approve all time entries before running payroll</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
