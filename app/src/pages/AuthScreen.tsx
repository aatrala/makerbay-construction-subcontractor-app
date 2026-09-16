import { useState, type FormEvent } from 'react'
import { HardHat, Loader2, Mail, Lock, User as UserIcon, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

type Mode = 'sign-in' | 'sign-up'

export function AuthScreen() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<Mode>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setBusy(true)

    if (mode === 'sign-up') {
      const { error: err } = await signUp(email, password, fullName)
      setBusy(false)
      if (err) {
        setError(err)
      } else {
        setSuccess('Account created! You are signed in.')
      }
    } else {
      const { error: err } = await signIn(email, password)
      setBusy(false)
      if (err) setError(err)
    }
  }

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-signal flex items-center justify-center mb-4 shadow-lg shadow-signal/20">
            <HardHat className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">BuildBooks</h1>
          <p className="text-sm text-muted mt-1">Construction accounting, coordination, and AI estimating</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface shadow-sm p-8">
          <h2 className="text-lg font-bold text-ink mb-1">
            {mode === 'sign-in' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-muted mb-6">
            {mode === 'sign-in' ? 'Sign in to your workspace' : 'Start your 14-day free trial'}
          </p>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-green-700">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'sign-up' && (
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Full name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Miller"
                    className="h-10 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-10 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="h-10 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted/60 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="h-10 w-full rounded-lg bg-signal text-white text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {mode === 'sign-in' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => switchMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
              className="font-semibold text-signal hover:underline cursor-pointer"
            >
              {mode === 'sign-in' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          By continuing, you agree to the Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
