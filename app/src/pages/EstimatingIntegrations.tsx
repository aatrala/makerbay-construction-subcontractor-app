import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft, CheckCircle2, XCircle, Link2, RefreshCw,
  Shield, ArrowRightLeft, FileText, BarChart3, Settings,
  Clock, AlertTriangle, Zap, ExternalLink,
} from 'lucide-react'
import { bidEstimates, historicalBids } from '@/data/mock'
import type { PageRoute } from '@/types'

interface EstimatingIntegrationsProps {
  onNavigate: (page: PageRoute) => void
}

const integrations = [
  {
    id: 'quickbooks',
    name: 'QuickBooks Online',
    description: 'Sync estimates to project budgets, track actual costs vs budget, generate variance reports.',
    status: 'connected' as const,
    lastSync: '2026-09-12T10:30:00',
    features: ['Project budget sync', 'Cost tracking', 'Variance reports', 'Invoice generation'],
    logo: 'QB',
    color: 'text-success',
    bg: 'bg-success-soft',
  },
  {
    id: 'sage',
    name: 'Sage 300 CRE',
    description: 'Enterprise construction accounting integration for job costing, payroll, and financial reporting.',
    status: 'disconnected' as const,
    lastSync: null,
    features: ['Job costing', 'Payroll integration', 'Financial reporting', 'AIA billing'],
    logo: 'SAGE',
    color: 'text-muted',
    bg: 'bg-canvas',
  },
  {
    id: 'procore',
    name: 'Procore',
    description: 'Project management integration for bid opportunities, document management, and sub coordination.',
    status: 'connected' as const,
    lastSync: '2026-09-12T08:15:00',
    features: ['Bid opportunities', 'Document sync', 'Sub directory', 'RFI tracking'],
    logo: 'PC',
    color: 'text-success',
    bg: 'bg-success-soft',
  },
  {
    id: 'planswift',
    name: 'PlanSwift',
    description: 'Import existing takeoffs from PlanSwift into BidAI for AI-enhanced estimating.',
    status: 'disconnected' as const,
    lastSync: null,
    features: ['Takeoff import', 'Symbol mapping', 'Quantity sync'],
    logo: 'PS',
    color: 'text-muted',
    bg: 'bg-canvas',
  },
]

const varianceData = [
  { project: 'Greenfield Data Center', budget: 761200, actual: 742000, variance: -2.5 },
  { project: 'Lakewood Apts Phase I', budget: 280000, actual: 305000, variance: 8.9 },
  { project: 'Tech Ridge Office Bldg A', budget: 225000, actual: 235000, variance: 4.4 },
  { project: 'Oakwood Office Park', budget: 185000, actual: 198500, variance: 7.3 },
  { project: 'Domain Central Plaza', budget: 165000, actual: 162000, variance: -1.8 },
]

export function EstimatingIntegrations({ onNavigate }: EstimatingIntegrationsProps) {
  const connectedCount = integrations.filter(i => i.status === 'connected').length
  const wonEstimates = bidEstimates.filter(e => e.estimateStatus === 'won')
  const transferredCount = wonEstimates.length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <button onClick={() => onNavigate('estimating')} className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-signal transition-colors cursor-pointer mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Estimates
          </button>
          <h2 className="text-xl font-extrabold text-ink">Integrations</h2>
          <p className="text-sm text-muted">Connect accounting and project management systems</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Connected', value: `${connectedCount}/${integrations.length}`, icon: Link2, color: 'text-success', bg: 'bg-success-soft' },
          { label: 'Estimates Transferred', value: String(transferredCount), icon: ArrowRightLeft, color: 'text-blue', bg: 'bg-blue-soft' },
          { label: 'Data Syncs Today', value: '3', icon: RefreshCw, color: 'text-signal', bg: 'bg-signal-soft' },
          { label: 'Last Sync', value: '10m ago', icon: Clock, color: 'text-violet', bg: 'bg-violet-soft' },
        ].map(stat => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted">{stat.label}</p>
                  <p className="text-xl font-extrabold text-ink">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map(integration => (
          <Card key={integration.id} className={integration.status === 'connected' ? 'border-success/20' : ''}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${integration.bg} text-sm font-extrabold ${integration.color}`}>
                    {integration.logo}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{integration.name}</p>
                    <Badge variant={integration.status === 'connected' ? 'success' : 'outline'}>
                      {integration.status === 'connected' ? (
                        <><CheckCircle2 className="h-3 w-3 mr-1" /> Connected</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" /> Not Connected</>
                      )}
                    </Badge>
                  </div>
                </div>
                {integration.status === 'connected' ? (
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="signal" size="sm">
                    <Link2 className="h-4 w-4" /> Connect
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted mb-3">{integration.description}</p>

              {integration.status === 'connected' && integration.lastSync && (
                <div className="flex items-center gap-1 text-[11px] text-muted mb-3">
                  <Clock className="h-3 w-3" />
                  Last synced: {new Date(integration.lastSync).toLocaleString()}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {integration.features.map(f => (
                  <span key={f} className="rounded-md bg-canvas px-2 py-1 text-[10px] font-medium text-muted">
                    {f}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Budget Transfer Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-signal" />
              <p className="text-sm font-bold text-ink">Estimate-to-Budget Transfers</p>
            </div>
            <Badge variant="success">{transferredCount} transferred</Badge>
          </div>
          <div className="space-y-2">
            {wonEstimates.map(est => (
              <div key={est.id} className="flex items-center justify-between rounded-xl border border-line p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-ink">{est.projectName}</p>
                    <p className="text-[11px] text-muted">Transferred to QuickBooks · {est.wonAt?.slice(0, 10)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink">${est.totalCost.toLocaleString()}</p>
                  <Badge variant="success">Synced</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Variance Reports */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-signal" />
              <p className="text-sm font-bold text-ink">Variance Reports (Budget vs Actual)</p>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4" /> Export
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Project</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Budget</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Actual</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Variance</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {varianceData.map(row => (
                  <tr key={row.project} className="border-b border-line/50">
                    <td className="py-2.5 font-medium text-ink">{row.project}</td>
                    <td className="py-2.5 text-right font-mono text-ink">${(row.budget / 1000).toFixed(0)}K</td>
                    <td className="py-2.5 text-right font-mono text-ink">${(row.actual / 1000).toFixed(0)}K</td>
                    <td className="py-2.5 text-right">
                      <span className={`font-mono text-xs font-bold ${row.variance > 0 ? 'text-danger' : 'text-success'}`}>
                        {row.variance > 0 ? '+' : ''}{row.variance}%
                      </span>
                    </td>
                    <td className="py-2.5">
                      {Math.abs(row.variance) <= 3 ? (
                        <Badge variant="success">On Track</Badge>
                      ) : row.variance > 0 ? (
                        <Badge variant="danger">Over Budget</Badge>
                      ) : (
                        <Badge variant="blue">Under Budget</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Data Security */}
      <Card className="border-violet/20 bg-violet-soft/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-violet" />
            <p className="text-sm font-bold text-ink">Data Security</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Encryption at Rest', desc: 'AES-256 encryption for all stored data' },
              { label: 'Encryption in Transit', desc: 'TLS 1.3 for all API communications' },
              { label: 'Audit Trail', desc: 'All actions logged with user, timestamp, and details' },
            ].map(item => (
              <div key={item.label} className="rounded-xl bg-white/60 p-3">
                <p className="text-xs font-bold text-ink">{item.label}</p>
                <p className="text-[11px] text-muted mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
