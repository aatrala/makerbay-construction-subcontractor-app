import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { payrollRuns, employees } from '@/data/mock'
import { Wallet, ChevronDown, ChevronUp, FileText, Download, Play, Users } from 'lucide-react'

export function Payroll() {
  const [expandedRun, setExpandedRun] = useState<string | null>(payrollRuns[0]?.id ?? null)

  const totalGross = payrollRuns.filter(r => r.status === 'completed').reduce((s, r) => s + r.totalGross, 0)
  const totalNet = payrollRuns.filter(r => r.status === 'completed').reduce((s, r) => s + r.totalNet, 0)
  const certifiedRuns = payrollRuns.filter(r => r.isCertified).length

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Gross (Completed)</p>
          <p className="text-2xl font-extrabold text-ink">{formatCurrency(totalGross)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Net Pay</p>
          <p className="text-2xl font-extrabold text-ink">{formatCurrency(totalNet)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Certified Payroll Runs</p>
          <p className="text-2xl font-extrabold text-violet">{certifiedRuns}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Active Employees</p>
          <p className="text-2xl font-extrabold text-ink">{employees.filter(e => e.isActive).length}</p>
        </CardContent></Card>
      </div>

      {/* Current period CTA */}
      {payrollRuns.some(r => r.status === 'draft') && (
        <Card className="border-signal/30 bg-signal-soft">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-signal flex items-center justify-center">
                <Play className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">Current Pay Period: Sep 8 — Sep 14</p>
                <p className="text-xs text-muted">Draft — review time entries and run payroll when ready</p>
              </div>
            </div>
            <Button variant="signal" size="sm">Run Payroll</Button>
          </CardContent>
        </Card>
      )}

      {/* Payroll Runs */}
      <div className="space-y-4">
        {payrollRuns.map(run => {
          const isExpanded = expandedRun === run.id
          const statusColor = run.status === 'completed' ? 'success' : run.status === 'processing' ? 'signal' : 'outline'
          return (
            <Card key={run.id}>
              <button
                onClick={() => setExpandedRun(isExpanded ? null : run.id)}
                className="w-full cursor-pointer"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${run.status === 'completed' ? 'bg-success-soft' : 'bg-canvas'}`}>
                        <Wallet className={`h-5 w-5 ${run.status === 'completed' ? 'text-success' : 'text-muted'}`} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-ink">
                            {formatDate(run.periodStart)} — {formatDate(run.periodEnd)}
                          </p>
                          <Badge variant={statusColor}>{run.status}</Badge>
                          {run.isCertified && <Badge variant="violet">Certified</Badge>}
                        </div>
                        <p className="text-xs text-muted">Pay date: {formatDate(run.payDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      {run.status === 'completed' && (
                        <div className="hidden sm:flex items-center gap-6 text-right">
                          <div>
                            <p className="text-xs text-muted">Gross</p>
                            <p className="text-sm font-bold text-ink">{formatCurrency(run.totalGross)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted">Net</p>
                            <p className="text-sm font-bold text-ink">{formatCurrency(run.totalNet)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted">Employees</p>
                            <p className="text-sm font-bold text-ink">{run.employeeCount}</p>
                          </div>
                        </div>
                      )}
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-muted" /> : <ChevronDown className="h-5 w-5 text-muted" />}
                    </div>
                  </div>
                </CardContent>
              </button>

              {isExpanded && run.entries.length > 0 && (
                <div className="animate-fade-in border-t border-line">
                  <CardContent className="p-5">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-line">
                            <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">Employee</th>
                            <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">Project</th>
                            <th className="px-3 py-2 text-center text-[11px] font-bold text-muted uppercase">Classification</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Reg. Hrs</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">OT Hrs</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Gross</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Taxes</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Fringes</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Net</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {run.entries.map(entry => (
                            <tr key={entry.employeeId} className="hover:bg-canvas transition-colors">
                              <td className="px-3 py-2 font-semibold text-ink">{entry.employeeName}</td>
                              <td className="px-3 py-2 text-muted">{entry.projectName}</td>
                              <td className="px-3 py-2 text-center">
                                <Badge variant="outline">{entry.classification}</Badge>
                              </td>
                              <td className="px-3 py-2 text-right">{entry.regularHours}</td>
                              <td className="px-3 py-2 text-right">{entry.overtimeHours > 0 ? entry.overtimeHours : '—'}</td>
                              <td className="px-3 py-2 text-right font-semibold">{formatCurrency(entry.grossPay)}</td>
                              <td className="px-3 py-2 text-right">{formatCurrency(entry.taxes)}</td>
                              <td className="px-3 py-2 text-right text-violet">{formatCurrency(entry.fringes)}</td>
                              <td className="px-3 py-2 text-right font-bold text-ink">{formatCurrency(entry.netPay)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      {run.isCertified && (
                        <Button variant="outline" size="sm"><FileText className="h-4 w-4" /> WH-347 Report</Button>
                      )}
                      <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export Payroll</Button>
                    </div>
                  </CardContent>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>Employees & Classifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">Name</th>
                  <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">Classification</th>
                  <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Rate</th>
                  <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Burden</th>
                  <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">PW Classifications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-canvas transition-colors">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-canvas flex items-center justify-center text-[10px] font-bold text-ink">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-ink">{emp.name}</p>
                          <p className="text-[11px] text-muted">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2"><Badge variant="outline">{emp.classification}</Badge></td>
                    <td className="px-3 py-2 text-right font-semibold">${emp.hourlyRate}/hr</td>
                    <td className="px-3 py-2 text-right text-muted">${emp.burdenRate}/hr</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {emp.pwClassifications.map(pw => (
                          <Badge key={pw} variant="violet">{pw}</Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
