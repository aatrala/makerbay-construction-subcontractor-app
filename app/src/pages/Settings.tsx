import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Building2, Users, CreditCard, Shield, Bell, Database,
  Globe, FileText, Download, Upload, Check,
} from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-rise-in max-w-4xl">
      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted" /> Company Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-muted mb-1">Company Name</label>
              <input type="text" defaultValue="Spark Electric LLC" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted mb-1">DBA</label>
              <input type="text" defaultValue="" placeholder="Doing business as..." className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted mb-1">EIN</label>
              <input type="text" defaultValue="84-1234567" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted mb-1">Fiscal Year End</label>
              <select defaultValue="12" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20">
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map((m, i) => (
                  <option key={m} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-muted mb-1">Address</label>
              <input type="text" defaultValue="1234 Industrial Blvd, Suite 200, Austin, TX 78701" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted mb-1">Phone</label>
              <input type="text" defaultValue="(512) 555-0100" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted mb-1">Email</label>
              <input type="email" defaultValue="admin@sparkelectric.com" className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart of Accounts */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-muted" /> Chart of Accounts
          </CardTitle>
          <Badge variant="success">Industry Standard COA</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted mb-4">
            Your chart of accounts is pre-configured with construction-specific accounts including
            retainage receivable, billings in excess, CIP, and contract revenue accounts.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Customize Accounts</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export COA</Button>
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted" /> Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'QuickBooks Online', status: 'connected', desc: 'Last sync: 2 hours ago' },
              { name: 'ADP Payroll', status: 'connected', desc: 'Export configured for bi-weekly runs' },
              { name: 'Procore', status: 'available', desc: 'Connect to sync commitments and change orders' },
              { name: 'Raken', status: 'available', desc: 'Import field time tracking data' },
              { name: 'BusyBusy', status: 'available', desc: 'Import crew time entries' },
              { name: 'Sage Estimating', status: 'coming-soon', desc: 'Import estimates to create job budgets' },
            ].map(integration => (
              <div key={integration.name} className="flex items-center justify-between rounded-lg border border-line p-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink">{integration.name}</p>
                    {integration.status === 'connected' && <Badge variant="success">Connected</Badge>}
                    {integration.status === 'coming-soon' && <Badge variant="outline">Coming Soon</Badge>}
                  </div>
                  <p className="text-xs text-muted mt-0.5">{integration.desc}</p>
                </div>
                {integration.status === 'connected' && <Check className="h-5 w-5 text-success" />}
                {integration.status === 'available' && (
                  <Button variant="outline" size="sm">Connect</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Migration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-muted" /> Data Migration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted mb-4">
            Import data from QuickBooks or other accounting systems. Supports chart of accounts,
            vendor lists, open AR/AP, and historical job data.
          </p>
          <div className="flex gap-2">
            <Button variant="signal" size="sm"><Upload className="h-4 w-4" /> Import from QuickBooks</Button>
            <Button variant="outline" size="sm">Import CSV</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: 'Over-budget alerts', desc: 'When any cost code exceeds 90% of budget', enabled: true },
              { label: 'Overdue invoice reminders', desc: 'Automatic reminders for past-due invoices', enabled: true },
              { label: 'Payroll period reminders', desc: 'Reminder to approve time before payroll runs', enabled: true },
              { label: 'Pay application due dates', desc: 'Alert when GC pay app deadlines approach', enabled: false },
              { label: 'Weekly job cost summary', desc: 'Email summary of all active job costs each Friday', enabled: false },
            ].map(notif => (
              <div key={notif.label} className="flex items-center justify-between rounded-lg border border-line p-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{notif.label}</p>
                  <p className="text-xs text-muted">{notif.desc}</p>
                </div>
                <button
                  className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
                    notif.enabled ? 'bg-signal' : 'bg-line'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      notif.enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted" /> Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-lg font-extrabold text-ink">Professional Plan</p>
                <Badge variant="signal">$199/mo</Badge>
              </div>
              <p className="text-sm text-muted">Up to 75 employees · Prevailing wage payroll · AIA billing</p>
            </div>
            <Button variant="outline" size="sm">Manage Plan</Button>
          </div>
          <div className="rounded-lg bg-canvas p-4 text-xs text-muted">
            <p>Next billing date: <span className="font-semibold text-ink">October 1, 2026</span></p>
            <p className="mt-1">Payment method: <span className="font-semibold text-ink">Visa ending in 4242</span></p>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted" /> Security & Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-line p-3">
              <div>
                <p className="text-sm font-semibold text-ink">Two-Factor Authentication</p>
                <p className="text-xs text-muted">Require 2FA for all users</p>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-line p-3">
              <div>
                <p className="text-sm font-semibold text-ink">Role-Based Access</p>
                <p className="text-xs text-muted">Owner, Controller, PM, Foreman, Field Worker</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-line p-3">
              <div>
                <p className="text-sm font-semibold text-ink">Audit Trail</p>
                <p className="text-xs text-muted">All financial transactions logged with full history</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-line p-3">
              <div>
                <p className="text-sm font-semibold text-ink">Data Encryption</p>
                <p className="text-xs text-muted">AES-256 at rest, TLS 1.3 in transit</p>
              </div>
              <Badge variant="success">SOC 2 Ready</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex items-center justify-end gap-3 pb-8">
        <Button variant="outline">Cancel</Button>
        <Button variant="signal">Save Changes</Button>
      </div>
    </div>
  )
}
