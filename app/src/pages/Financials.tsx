import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { glAccounts, invoices, bills } from '@/data/mock'
import {
  BookOpen, ArrowDownRight, ArrowUpRight, Plus, FileText,
  AlertCircle, Check, Clock,
} from 'lucide-react'

export function Financials() {
  const [tab, setTab] = useState<'gl' | 'ar' | 'ap'>('gl')

  const assets = glAccounts.filter(a => a.type === 'asset')
  const liabilities = glAccounts.filter(a => a.type === 'liability')
  const equity = glAccounts.filter(a => a.type === 'equity')
  const revenue = glAccounts.filter(a => a.type === 'revenue')
  const expenses = glAccounts.filter(a => a.type === 'expense')

  const totalAssets = assets.reduce((s, a) => s + a.balance, 0)
  const totalLiabilities = liabilities.reduce((s, a) => s + a.balance, 0)
  const totalRevenue = revenue.reduce((s, a) => s + a.balance, 0)
  const totalExpenses = expenses.reduce((s, a) => s + a.balance, 0)
  const openAR = invoices.filter(i => i.status !== 'paid' && i.status !== 'void')
  const openAP = bills.filter(b => b.status !== 'paid' && b.status !== 'void')
  const overdueAR = invoices.filter(i => i.status === 'overdue')

  const statusIcon = (status: string) => {
    if (status === 'paid') return <Check className="h-3.5 w-3.5 text-success" />
    if (status === 'overdue') return <AlertCircle className="h-3.5 w-3.5 text-danger" />
    return <Clock className="h-3.5 w-3.5 text-warning" />
  }

  const statusBadge = (status: string) => {
    const colors: Record<string, 'success' | 'warning' | 'danger' | 'outline' | 'blue'> = {
      paid: 'success', sent: 'blue', overdue: 'danger', draft: 'outline', void: 'outline',
      unpaid: 'warning', partial: 'blue',
    }
    return <Badge variant={colors[status] ?? 'outline'}>{status}</Badge>
  }

  return (
    <div className="space-y-6 animate-rise-in">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Assets</p>
          <p className="text-xl font-extrabold text-ink">{formatCurrency(totalAssets)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Total Liabilities</p>
          <p className="text-xl font-extrabold text-ink">{formatCurrency(totalLiabilities)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Revenue (YTD)</p>
          <p className="text-xl font-extrabold text-success">{formatCurrency(totalRevenue)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Expenses (YTD)</p>
          <p className="text-xl font-extrabold text-ink">{formatCurrency(totalExpenses)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs text-muted">Net Income</p>
          <p className="text-xl font-extrabold text-success">{formatCurrency(totalRevenue - totalExpenses)}</p>
        </CardContent></Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-line bg-surface p-1 w-fit">
        {[
          { key: 'gl', label: 'General Ledger' },
          { key: 'ar', label: `Accounts Receivable (${openAR.length})` },
          { key: 'ap', label: `Accounts Payable (${openAP.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as 'gl' | 'ar' | 'ap')}
            className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              tab === t.key ? 'bg-ink text-white' : 'text-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* GL View */}
      {tab === 'gl' && (
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Chart of Accounts</CardTitle>
            <Button variant="outline" size="sm"><Plus className="h-4 w-4" /> Add Account</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: 'Assets', accounts: assets, color: 'text-blue' },
                { label: 'Liabilities', accounts: liabilities, color: 'text-danger' },
                { label: 'Equity', accounts: equity, color: 'text-violet' },
                { label: 'Revenue', accounts: revenue, color: 'text-success' },
                { label: 'Expenses', accounts: expenses, color: 'text-signal' },
              ].map(group => (
                <div key={group.label}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${group.color}`}>{group.label}</h4>
                  <div className="overflow-x-auto rounded-lg border border-line">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-canvas">
                          <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">Account #</th>
                          <th className="px-3 py-2 text-left text-[11px] font-bold text-muted uppercase">Name</th>
                          <th className="px-3 py-2 text-right text-[11px] font-bold text-muted uppercase">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {group.accounts.map(acc => (
                          <tr key={acc.id} className="hover:bg-canvas/50 transition-colors">
                            <td className="px-3 py-2 text-xs font-mono font-semibold text-ink">{acc.accountNumber}</td>
                            <td className="px-3 py-2 text-xs text-ink">{acc.name}</td>
                            <td className={`px-3 py-2 text-right text-xs font-bold ${acc.type === 'expense' ? 'text-signal' : acc.type === 'revenue' ? 'text-success' : 'text-ink'}`}>
                              {formatCurrency(acc.balance)}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-canvas">
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2 text-xs font-bold text-ink">Total {group.label}</td>
                          <td className="px-3 py-2 text-right text-xs font-bold text-ink">
                            {formatCurrency(group.accounts.reduce((s, a) => s + a.balance, 0))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AR View */}
      {tab === 'ar' && (
        <div className="space-y-4">
          {overdueAR.length > 0 && (
            <Card className="border-danger/30 bg-danger-soft">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-danger" />
                <div>
                  <p className="text-sm font-semibold text-ink">{overdueAR.length} overdue invoice(s)</p>
                  <p className="text-xs text-muted">
                    {formatCurrency(overdueAR.reduce((s, i) => s + (i.amount - i.paidAmount), 0))} past due — follow up immediately
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Accounts Receivable</CardTitle>
              <Button variant="signal" size="sm"><Plus className="h-4 w-4" /> New Invoice</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Invoice</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Project</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Customer</th>
                      <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Amount</th>
                      <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Open</th>
                      <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Due Date</th>
                      <th className="px-3 py-2.5 text-center text-[11px] font-bold text-muted uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {invoices.map(inv => (
                      <tr key={inv.id} className="hover:bg-canvas transition-colors">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            {statusIcon(inv.status)}
                            <span className="font-semibold text-ink">{inv.invoiceNumber}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-muted">{inv.projectName}</td>
                        <td className="px-3 py-2.5 text-muted">{inv.customer}</td>
                        <td className="px-3 py-2.5 text-right font-semibold">{formatCurrency(inv.amount)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-ink">{formatCurrency(inv.amount - inv.paidAmount)}</td>
                        <td className="px-3 py-2.5 text-muted">{formatDate(inv.dueDate)}</td>
                        <td className="px-3 py-2.5 text-center">{statusBadge(inv.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AP View */}
      {tab === 'ap' && (
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Accounts Payable</CardTitle>
            <Button variant="signal" size="sm"><Plus className="h-4 w-4" /> Enter Bill</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Bill</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Vendor</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Project</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Category</th>
                    <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Amount</th>
                    <th className="px-3 py-2.5 text-right text-[11px] font-bold text-muted uppercase">Open</th>
                    <th className="px-3 py-2.5 text-left text-[11px] font-bold text-muted uppercase">Due Date</th>
                    <th className="px-3 py-2.5 text-center text-[11px] font-bold text-muted uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {bills.map(bill => (
                    <tr key={bill.id} className="hover:bg-canvas transition-colors">
                      <td className="px-3 py-2.5 font-semibold text-ink">{bill.billNumber}</td>
                      <td className="px-3 py-2.5 text-muted">{bill.vendorName}</td>
                      <td className="px-3 py-2.5 text-muted">{bill.projectName}</td>
                      <td className="px-3 py-2.5"><Badge variant="outline">{bill.category}</Badge></td>
                      <td className="px-3 py-2.5 text-right font-semibold">{formatCurrency(bill.amount)}</td>
                      <td className="px-3 py-2.5 text-right font-bold text-ink">{formatCurrency(bill.amount - bill.paidAmount)}</td>
                      <td className="px-3 py-2.5 text-muted">{formatDate(bill.dueDate)}</td>
                      <td className="px-3 py-2.5 text-center">{statusBadge(bill.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
