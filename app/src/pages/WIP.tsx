import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { wipData, projects } from '@/data/mock'
import { Download, TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from 'recharts'

export function WIP() {
  const totalContract = wipData.reduce((s, w) => s + w.revisedContract, 0)
  const totalCosts = wipData.reduce((s, w) => s + w.costsToDate, 0)
  const totalBilled = wipData.reduce((s, w) => s + w.billedToDate, 0)
  const totalEarned = wipData.reduce((s, w) => s + w.earnedRevenue, 0)
  const totalOverUnder = wipData.reduce((s, w) => s + w.overUnderBilling, 0)
  const totalProfit = wipData.reduce((s, w) => s + w.grossProfit, 0)

  const chartData = wipData.map(w => ({
    name: w.jobNumber,
    earned: w.earnedRevenue,
    billed: w.billedToDate,
    costs: w.costsToDate,
  }))

  const profitData = wipData.map(w => ({
    name: w.jobNumber,
    margin: w.grossProfitPercent,
    profit: w.grossProfit,
  }))

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Contract Value</p>
          <p className="text-xl font-extrabold text-ink">{formatCurrency(totalContract)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Costs</p>
          <p className="text-xl font-extrabold text-ink">{formatCurrency(totalCosts)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Billed</p>
          <p className="text-xl font-extrabold text-ink">{formatCurrency(totalBilled)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Over/Under Billing</p>
          <p className={`text-xl font-extrabold ${totalOverUnder < 0 ? 'text-danger' : 'text-success'}`}>{formatCurrency(totalOverUnder)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Gross Profit</p>
          <p className="text-xl font-extrabold text-success">{formatCurrency(totalProfit)}</p>
        </CardContent></Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Earned vs Billed vs Costs by Job</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => formatCurrency(Number(v))} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="earned" name="Earned Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="billed" name="Billed" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="costs" name="Costs" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gross Margin by Job</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={v => `${v}%`} />
                  <Tooltip
                    formatter={(v, name) => name === 'margin' ? `${Number(v).toFixed(1)}%` : formatCurrency(Number(v))}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="margin" name="Margin %" radius={[4, 4, 0, 0]}>
                    {profitData.map((entry, i) => (
                      <Cell key={i} fill={entry.margin > 18 ? '#10b981' : entry.margin > 12 ? '#f59e0b' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WIP Schedule Table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>WIP Schedule — Bonding-Ready Format</CardTitle>
          <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export for Surety</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Job</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Contract</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Costs to Date</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Billed to Date</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Earned Revenue</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">% Complete</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Over/Under</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Profit Fade</th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Gross Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {wipData.map(w => (
                  <tr key={w.projectId} className="hover:bg-canvas transition-colors">
                    <td className="px-3 py-2.5">
                      <p className="font-semibold text-ink">{w.projectName}</p>
                      <p className="text-[11px] text-muted">{w.jobNumber}</p>
                    </td>
                    <td className="px-3 py-2.5 text-right font-semibold">{formatCurrency(w.revisedContract)}</td>
                    <td className="px-3 py-2.5 text-right">{formatCurrency(w.costsToDate)}</td>
                    <td className="px-3 py-2.5 text-right">{formatCurrency(w.billedToDate)}</td>
                    <td className="px-3 py-2.5 text-right">{formatCurrency(w.earnedRevenue)}</td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-12 rounded-full bg-line overflow-hidden">
                          <div className="h-full rounded-full bg-signal" style={{ width: `${w.percentComplete}%` }} />
                        </div>
                        <span className="font-semibold">{w.percentComplete}%</span>
                      </div>
                    </td>
                    <td className={`px-3 py-2.5 text-right font-semibold ${w.overUnderBilling < 0 ? 'text-danger' : 'text-success'}`}>
                      {formatCurrency(w.overUnderBilling)}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {w.profitFade < 0 ? (
                          <><TrendingDown className="h-3 w-3 text-danger" /><span className="text-danger">{w.profitFade}%</span></>
                        ) : (
                          <><TrendingUp className="h-3 w-3 text-success" /><span className="text-success">+{w.profitFade}%</span></>
                        )}
                      </div>
                    </td>
                    <td className={`px-3 py-2.5 text-right font-bold ${w.grossProfitPercent > 18 ? 'text-success' : w.grossProfitPercent > 12 ? 'text-warning' : 'text-danger'}`}>
                      {formatPercent(w.grossProfitPercent)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-ink/10 bg-canvas">
                  <td className="px-3 py-2.5 font-bold text-ink">Total</td>
                  <td className="px-3 py-2.5 text-right font-bold text-ink">{formatCurrency(totalContract)}</td>
                  <td className="px-3 py-2.5 text-right font-bold text-ink">{formatCurrency(totalCosts)}</td>
                  <td className="px-3 py-2.5 text-right font-bold text-ink">{formatCurrency(totalBilled)}</td>
                  <td className="px-3 py-2.5 text-right font-bold text-ink">{formatCurrency(totalEarned)}</td>
                  <td className="px-3 py-2.5 text-right"></td>
                  <td className={`px-3 py-2.5 text-right font-bold ${totalOverUnder < 0 ? 'text-danger' : 'text-success'}`}>{formatCurrency(totalOverUnder)}</td>
                  <td className="px-3 py-2.5 text-right"></td>
                  <td className="px-3 py-2.5 text-right font-bold text-success">{formatPercent((totalProfit / totalEarned) * 100)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
