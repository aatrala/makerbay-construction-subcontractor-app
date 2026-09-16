import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft, TrendingUp, TrendingDown, Target, Award,
  XCircle, BarChart3, Info, Sparkles, Minus,
} from 'lucide-react'
import { historicalBids } from '@/data/mock'
import type { PageRoute, ProjectType } from '@/types'

interface HistoricalAnalyticsProps {
  onNavigate: (page: PageRoute) => void
}

export function HistoricalAnalytics({ onNavigate }: HistoricalAnalyticsProps) {
  const [projectTypeFilter, setProjectTypeFilter] = useState<ProjectType | 'all'>('all')

  const filtered = projectTypeFilter === 'all'
    ? historicalBids
    : historicalBids.filter(b => b.projectType === projectTypeFilter)

  const wonBids = filtered.filter(b => b.bidStatus === 'won')
  const lostBids = filtered.filter(b => b.bidStatus === 'lost')
  const winRate = filtered.length > 0 ? Math.round((wonBids.length / filtered.length) * 100) : 0
  const completedWon = wonBids.filter(b => b.actualCost > 0)

  const avgMaterialVariance = completedWon.length > 0
    ? (completedWon.reduce((s, b) => s + b.varianceMaterialPct, 0) / completedWon.length).toFixed(1)
    : '0'
  const avgLaborVariance = completedWon.length > 0
    ? (completedWon.reduce((s, b) => s + b.varianceLaborPct, 0) / completedWon.length).toFixed(1)
    : '0'
  const avgWinMargin = wonBids.length > 0
    ? Math.round(wonBids.reduce((s, b) => s + b.profitMargin, 0) / wonBids.length)
    : 0
  const totalWonValue = wonBids.reduce((s, b) => s + b.estimatedCost, 0)
  const accuracy = completedWon.length > 0
    ? Math.round(100 - Math.abs(completedWon.reduce((s, b) => s + b.varianceMaterialPct, 0) / completedWon.length))
    : 0

  // Win rate by margin range
  const marginBuckets = [
    { label: '12-13%', bids: filtered.filter(b => b.profitMargin >= 12 && b.profitMargin <= 13) },
    { label: '14-15%', bids: filtered.filter(b => b.profitMargin >= 14 && b.profitMargin <= 15) },
    { label: '16%+', bids: filtered.filter(b => b.profitMargin >= 16) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <button onClick={() => onNavigate('estimating')} className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-signal transition-colors cursor-pointer mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Estimates
          </button>
          <h2 className="text-xl font-extrabold text-ink">Historical Analytics</h2>
          <p className="text-sm text-muted">AI learns from your bid history to improve future estimates</p>
        </div>
        <div className="flex gap-1">
          {(['all', 'new-construction', 'renovation', 'tenant-improvement'] as const).map(pt => (
            <button
              key={pt}
              onClick={() => setProjectTypeFilter(pt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                projectTypeFilter === pt ? 'bg-signal text-white' : 'text-muted hover:bg-canvas'
              }`}
            >
              {pt === 'all' ? 'All' : pt === 'new-construction' ? 'New' : pt === 'tenant-improvement' ? 'TI' : pt.charAt(0).toUpperCase() + pt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Bids', value: String(filtered.length), icon: BarChart3, color: 'text-blue', bg: 'bg-blue-soft' },
          { label: 'Win Rate', value: `${winRate}%`, icon: Target, color: winRate >= 60 ? 'text-success' : 'text-warning', bg: winRate >= 60 ? 'bg-success-soft' : 'bg-warning-soft' },
          { label: 'Won Value', value: `$${(totalWonValue / 1000).toFixed(0)}K`, icon: Award, color: 'text-signal', bg: 'bg-signal-soft' },
          { label: 'Avg Win Margin', value: `${avgWinMargin}%`, icon: TrendingUp, color: 'text-violet', bg: 'bg-violet-soft' },
          { label: 'Material Accuracy', value: `${accuracy}%`, icon: Sparkles, color: 'text-success', bg: 'bg-success-soft' },
          { label: 'Completed Projects', value: String(completedWon.length), icon: Minus, color: 'text-muted', bg: 'bg-canvas' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Variance Analysis */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-signal" />
              <p className="text-sm font-bold text-ink">Cost Variance (Est vs Actual)</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-xl bg-blue-soft/30 p-4 text-center">
                <p className="text-2xl font-extrabold text-ink">{avgMaterialVariance}%</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Avg Material Variance</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {Number(avgMaterialVariance) > 0 ? (
                    <><TrendingUp className="h-3 w-3 text-danger" /><span className="text-[11px] text-danger">Over estimate</span></>
                  ) : (
                    <><TrendingDown className="h-3 w-3 text-success" /><span className="text-[11px] text-success">Under estimate</span></>
                  )}
                </div>
              </div>
              <div className="rounded-xl bg-violet-soft/30 p-4 text-center">
                <p className="text-2xl font-extrabold text-ink">{avgLaborVariance}%</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Avg Labor Variance</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {Number(avgLaborVariance) > 0 ? (
                    <><TrendingUp className="h-3 w-3 text-danger" /><span className="text-[11px] text-danger">Over estimate</span></>
                  ) : (
                    <><TrendingDown className="h-3 w-3 text-success" /><span className="text-[11px] text-success">Under estimate</span></>
                  )}
                </div>
              </div>
            </div>

            {/* Per-project variance bars */}
            <div className="space-y-2">
              {completedWon.slice(0, 5).map(bid => (
                <div key={bid.id} className="flex items-center gap-3">
                  <span className="text-xs text-ink font-medium truncate w-36">{bid.projectName}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-3 rounded-full bg-line overflow-hidden relative">
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/20 z-10" />
                      <div
                        className={`h-full rounded-full ${bid.varianceMaterialPct > 0 ? 'bg-danger/60' : 'bg-success/60'}`}
                        style={{ width: `${Math.min(Math.abs(bid.varianceMaterialPct) * 5, 100)}%`, marginLeft: bid.varianceMaterialPct > 0 ? '50%' : `${50 - Math.min(Math.abs(bid.varianceMaterialPct) * 5, 50)}%` }}
                      />
                    </div>
                    <span className={`text-[11px] font-bold w-12 text-right ${bid.varianceMaterialPct > 0 ? 'text-danger' : 'text-success'}`}>
                      {bid.varianceMaterialPct > 0 ? '+' : ''}{bid.varianceMaterialPct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Win Rate by Margin */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-4 w-4 text-signal" />
              <p className="text-sm font-bold text-ink">Win Rate by Profit Margin</p>
            </div>
            <div className="space-y-4">
              {marginBuckets.map(bucket => {
                const won = bucket.bids.filter(b => b.bidStatus === 'won').length
                const rate = bucket.bids.length > 0 ? Math.round((won / bucket.bids.length) * 100) : 0
                return (
                  <div key={bucket.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-ink">{bucket.label} margin</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted">{won}/{bucket.bids.length} won</span>
                        <span className="text-sm font-extrabold text-ink">{rate}%</span>
                      </div>
                    </div>
                    <div className="h-4 rounded-full bg-line overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${rate >= 60 ? 'bg-success' : rate >= 40 ? 'bg-warning' : 'bg-danger'}`}
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-xl bg-signal-soft/30 p-3 mt-4">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-ink">AI Recommendation</p>
                  <p className="text-[11px] text-ink mt-0.5">
                    Based on your historical data, you win {winRate >= 60 ? 'a strong' : 'a moderate'} {winRate}% of bids.
                    Your sweet spot is <strong>14-15% profit margin</strong> where you win the most bids.
                    Consider targeting this range for new estimates.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Historical Bids Table */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-bold text-ink mb-3">All Historical Bids ({filtered.length})</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Project</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Type</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Estimated</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Actual</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Material Var</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider text-right">Labor Var</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Margin</th>
                  <th className="pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">Result</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(bid => (
                  <tr key={bid.id} className="border-b border-line/50 hover:bg-canvas/30 transition-colors">
                    <td className="py-2.5 font-medium text-ink">{bid.projectName}</td>
                    <td className="py-2.5"><Badge variant="outline">{bid.projectType}</Badge></td>
                    <td className="py-2.5 text-right font-mono text-ink">${(bid.estimatedCost / 1000).toFixed(0)}K</td>
                    <td className="py-2.5 text-right font-mono text-ink">
                      {bid.actualCost > 0 ? `$${(bid.actualCost / 1000).toFixed(0)}K` : '—'}
                    </td>
                    <td className="py-2.5 text-right">
                      {bid.actualCost > 0 ? (
                        <span className={`font-mono text-xs font-bold ${bid.varianceMaterialPct > 0 ? 'text-danger' : 'text-success'}`}>
                          {bid.varianceMaterialPct > 0 ? '+' : ''}{bid.varianceMaterialPct}%
                        </span>
                      ) : <span className="text-muted">—</span>}
                    </td>
                    <td className="py-2.5 text-right">
                      {bid.actualCost > 0 ? (
                        <span className={`font-mono text-xs font-bold ${bid.varianceLaborPct > 0 ? 'text-danger' : 'text-success'}`}>
                          {bid.varianceLaborPct > 0 ? '+' : ''}{bid.varianceLaborPct}%
                        </span>
                      ) : <span className="text-muted">—</span>}
                    </td>
                    <td className="py-2.5"><Badge variant="outline">{bid.profitMargin}%</Badge></td>
                    <td className="py-2.5">
                      {bid.bidStatus === 'won' ? (
                        <Badge variant="success"><Award className="h-3 w-3" /> Won</Badge>
                      ) : (
                        <Badge variant="danger"><XCircle className="h-3 w-3" /> Lost</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Learning Insights */}
      <Card className="border-signal/20 bg-signal-soft/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-signal" />
            <p className="text-sm font-bold text-ink">AI Learning Insights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white p-4 border border-line">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue" />
                <p className="text-xs font-bold text-ink">Material Correction</p>
              </div>
              <p className="text-xs text-muted">
                Based on {completedWon.length} completed projects, AI is applying a <strong>+{avgMaterialVariance}% correction</strong> to material estimates for {projectTypeFilter === 'all' ? 'all project types' : projectTypeFilter} projects.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-line">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-violet" />
                <p className="text-xs font-bold text-ink">Labor Adjustment</p>
              </div>
              <p className="text-xs text-muted">
                Historical labor variance averages <strong>+{avgLaborVariance}%</strong>. AI adds this buffer to labor hours on new estimates to improve accuracy.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 border border-line">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-success" />
                <p className="text-xs font-bold text-ink">Margin Optimization</p>
              </div>
              <p className="text-xs text-muted">
                Your win rate peaks at <strong>14-15% profit margin</strong>. AI recommends targeting this range for competitive yet profitable bids.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
