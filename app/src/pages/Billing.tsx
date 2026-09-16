import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, formatPercent } from '@/lib/utils'
import { payApplications } from '@/data/mock'
import { FileText, ChevronDown, ChevronUp, Download, Send, Plus, Eye } from 'lucide-react'

const statusColors: Record<string, 'success' | 'signal' | 'blue' | 'outline' | 'danger'> = {
  draft: 'outline',
  submitted: 'signal',
  approved: 'blue',
  paid: 'success',
  rejected: 'danger',
}

export function Billing() {
  const [expandedId, setExpandedId] = useState<string | null>(payApplications[0]?.id ?? null)

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Applications</p>
          <p className="text-2xl font-extrabold text-ink">{payApplications.length}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Billed (All Apps)</p>
          <p className="text-2xl font-extrabold text-ink">{formatCurrency(payApplications.reduce((s, pa) => s + pa.currentPaymentDue, 0))}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Awaiting Approval</p>
          <p className="text-2xl font-extrabold text-signal">{payApplications.filter(p => p.status === 'submitted').length}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Retainage Held</p>
          <p className="text-2xl font-extrabold text-violet">{formatCurrency(payApplications.reduce((s, pa) => s + pa.totalRetainage, 0))}</p>
        </CardContent></Card>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-ink">Pay Applications (AIA G702/G703)</h3>
        <Button variant="signal" size="sm"><Plus className="h-4 w-4" /> New Pay App</Button>
      </div>

      {/* Pay Applications */}
      <div className="space-y-4">
        {payApplications.map(pa => {
          const isExpanded = expandedId === pa.id
          return (
            <Card key={pa.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : pa.id)}
                className="w-full cursor-pointer"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-soft flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-ink">{pa.projectName}</p>
                          <Badge variant={statusColors[pa.status]}>{pa.status}</Badge>
                        </div>
                        <p className="text-xs text-muted">
                          App #{pa.applicationNumber} · Period ending {formatDate(pa.periodEnd)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-muted">Current Payment Due</p>
                        <p className="text-lg font-extrabold text-ink">{formatCurrency(pa.currentPaymentDue)}</p>
                      </div>
                      <div className="text-right hidden md:block">
                        <p className="text-xs text-muted">Total Earned (Less Retainage)</p>
                        <p className="text-sm font-bold text-ink">{formatCurrency(pa.totalEarned)}</p>
                      </div>
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-muted" /> : <ChevronDown className="h-5 w-5 text-muted" />}
                    </div>
                  </div>
                </CardContent>
              </button>

              {isExpanded && (
                <div className="animate-fade-in border-t border-line">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted">Contract Sum</p>
                          <p className="font-bold text-ink">{formatCurrency(pa.contractSum)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted">Completed & Stored</p>
                          <p className="font-bold text-ink">{formatCurrency(pa.totalCompletedStored)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted">Retainage</p>
                          <p className="font-bold text-ink">{formatCurrency(pa.totalRetainage)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted">Previous Apps</p>
                          <p className="font-bold text-ink">{formatCurrency(pa.lessPreviousApps)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Schedule of Values */}
                    <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Schedule of Values (G703)</h4>
                    <div className="overflow-x-auto rounded-lg border border-line">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-canvas">
                            <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">Line</th>
                            <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">Description</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Sched. Value</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Prev. Completed</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">This Period</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Total Completed</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Stored Mat.</th>
                            <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">% Comp.</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {pa.scheduleOfValues.map(sov => (
                            <tr key={sov.id} className="hover:bg-canvas/50">
                              <td className="px-3 py-2 text-xs font-semibold text-ink">{sov.lineItem}</td>
                              <td className="px-3 py-2 text-xs text-ink">{sov.description}</td>
                              <td className="px-3 py-2 text-right text-xs">{formatCurrency(sov.scheduledValue)}</td>
                              <td className="px-3 py-2 text-right text-xs">{formatCurrency(sov.previousCompleted)}</td>
                              <td className="px-3 py-2 text-right text-xs font-semibold text-signal">{formatCurrency(sov.thisPeriod)}</td>
                              <td className="px-3 py-2 text-right text-xs">{formatCurrency(sov.totalCompleted)}</td>
                              <td className="px-3 py-2 text-right text-xs">{sov.storedMaterials > 0 ? formatCurrency(sov.storedMaterials) : '—'}</td>
                              <td className="px-3 py-2 text-right text-xs font-semibold">{formatPercent(sov.percentComplete)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      {pa.status === 'draft' && (
                        <Button variant="signal" size="sm"><Send className="h-4 w-4" /> Submit to GC</Button>
                      )}
                      <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export PDF</Button>
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /> Preview G702/G703</Button>
                    </div>
                  </CardContent>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
