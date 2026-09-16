import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus, FileText, TrendingUp, DollarSign, Target, Clock,
  ArrowRight, Zap, BarChart3, Filter,
} from 'lucide-react'
import { bidEstimates, historicalBids } from '@/data/mock'
import type { PageRoute, EstimateStatus } from '@/types'

interface EstimatingHubProps {
  onNavigate: (page: PageRoute, id?: string) => void
}

const statusColor: Record<EstimateStatus, 'success' | 'danger' | 'warning' | 'outline' | 'blue' | 'violet' | 'signal'> = {
  draft: 'outline',
  submitted: 'blue',
  won: 'success',
  lost: 'danger',
}

const statusLabel: Record<EstimateStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  won: 'Won',
  lost: 'Lost',
}

export function EstimatingHub({ onNavigate }: EstimatingHubProps) {
  const [filter, setFilter] = useState<EstimateStatus | 'all'>('all')

  const filtered = filter === 'all' ? bidEstimates : bidEstimates.filter(e => e.estimateStatus === filter)

  const wonBids = historicalBids.filter(b => b.bidStatus === 'won')
  const winRate = Math.round((wonBids.length / historicalBids.length) * 100)
  const totalBidValue = bidEstimates.reduce((s, e) => s + e.totalCost, 0)
  const activeEstimates = bidEstimates.filter(e => e.estimateStatus === 'draft' || e.estimateStatus === 'submitted').length
  const avgEstimate = Math.round(totalBidValue / bidEstimates.filter(e => e.totalCost > 0).length)

  const deadlineUrgent = bidEstimates.filter(e => {
    const days = Math.ceil((new Date(e.bidDeadline).getTime() - Date.now()) / 86400000)
    return days <= 14 && e.estimateStatus !== 'won' && e.estimateStatus !== 'lost'
  })

  return (
    <div className="space-y-6">
      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Estimates', value: String(activeEstimates), icon: FileText, color: 'text-blue', bg: 'bg-blue-soft' },
          { label: 'Total Bid Value', value: `$${(totalBidValue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-signal', bg: 'bg-signal-soft' },
          { label: 'Win Rate', value: `${winRate}%`, icon: Target, color: 'text-success', bg: 'bg-success-soft' },
          { label: 'Avg Estimate', value: `$${(avgEstimate / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-violet', bg: 'bg-violet-soft' },
        ].map((stat) => {
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

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="signal" onClick={() => onNavigate('create-estimate')}>
          <Plus className="h-4 w-4" /> New Estimate
        </Button>
        <Button variant="outline" onClick={() => onNavigate('bid-pipeline')}>
          <BarChart3 className="h-4 w-4" /> Bid Pipeline
        </Button>
        <Button variant="outline" onClick={() => onNavigate('historical-analytics')}>
          <TrendingUp className="h-4 w-4" /> Historical Analytics
        </Button>
        <Button variant="outline" onClick={() => onNavigate('material-pricing')}>
          <DollarSign className="h-4 w-4" /> Material Pricing
        </Button>
        <Button variant="outline" onClick={() => onNavigate('integrations')}>
          <Zap className="h-4 w-4" /> Integrations
        </Button>
      </div>

      {/* Upcoming Deadlines */}
      {deadlineUrgent.length > 0 && (
        <Card className="border-warning/30 bg-warning-soft/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-warning" />
              <p className="text-sm font-bold text-ink">Upcoming Deadlines</p>
            </div>
            <div className="space-y-2">
              {deadlineUrgent.map(e => {
                const days = Math.ceil((new Date(e.bidDeadline).getTime() - Date.now()) / 86400000)
                return (
                  <button
                    key={e.id}
                    onClick={() => onNavigate('estimate-detail', e.id)}
                    className="flex w-full items-center justify-between rounded-lg bg-white/60 p-3 text-left hover:bg-white transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-bold text-ink">{e.projectName}</p>
                      <p className="text-xs text-muted">{e.customerName} · {e.trade}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={days <= 7 ? 'danger' : 'warning'}>{days}d left</Badge>
                      <Badge variant={statusColor[e.estimateStatus]}>{statusLabel[e.estimateStatus]}</Badge>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estimate List */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted" />
              <p className="text-sm font-bold text-ink">All Estimates</p>
            </div>
            <div className="flex gap-1">
              {(['all', 'draft', 'submitted', 'won', 'lost'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filter === s ? 'bg-signal text-white' : 'text-muted hover:bg-canvas hover:text-ink'
                  }`}
                >
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filtered.map(estimate => (
              <button
                key={estimate.id}
                onClick={() => onNavigate('estimate-detail', estimate.id)}
                className="flex w-full items-center justify-between rounded-xl border border-line p-4 text-left hover:border-signal/30 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    estimate.estimateStatus === 'won' ? 'bg-success-soft' :
                    estimate.estimateStatus === 'lost' ? 'bg-danger-soft' :
                    estimate.estimateStatus === 'submitted' ? 'bg-blue-soft' : 'bg-canvas'
                  }`}>
                    <FileText className={`h-5 w-5 ${
                      estimate.estimateStatus === 'won' ? 'text-success' :
                      estimate.estimateStatus === 'lost' ? 'text-danger' :
                      estimate.estimateStatus === 'submitted' ? 'text-blue' : 'text-muted'
                    }`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink truncate">{estimate.projectName}</p>
                    <p className="text-xs text-muted truncate">{estimate.customerName} · {estimate.projectAddress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-ink">
                      {estimate.totalCost > 0 ? `$${(estimate.totalCost / 1000).toFixed(0)}K` : '—'}
                    </p>
                    <p className="text-[11px] text-muted">{estimate.trade} · {estimate.projectType}</p>
                  </div>
                  {estimate.aiConfidence > 0 && (
                    <div className="text-right hidden md:block">
                      <p className="text-[11px] text-muted">AI Confidence</p>
                      <p className={`text-xs font-bold ${estimate.aiConfidence >= 93 ? 'text-success' : estimate.aiConfidence >= 85 ? 'text-warning' : 'text-danger'}`}>
                        {estimate.aiConfidence}%
                      </p>
                    </div>
                  )}
                  <Badge variant={statusColor[estimate.estimateStatus]}>{statusLabel[estimate.estimateStatus]}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-signal transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
