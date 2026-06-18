import { useState } from 'react';
import { adminSignIn, adminSignUp } from '../../lib/supabase';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await adminSignIn(email, password);
      } else {
        await adminSignUp(email, password);
      }
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      {/* Abstract BG */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-10"
        style={{ background: 'radial-gradient(ellipse at top right, #7B4E3D, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-tr-full opacity-10"
        style={{ background: 'radial-gradient(ellipse at bottom left, #C4A097, transparent 70%)' }} />

      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border border-brown-100">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/Untitled_Project.jpg" alt="Rokomari Bostro" className="w-16 h-16 rounded-full object-cover mb-3 shadow-md" />
          <p className="text-xs tracking-widest text-brown-400 uppercase" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Admin Panel</p>
          <h1 className="text-2xl font-semibold text-brown-900 mt-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {mode === 'login' ? 'Sign In' : 'Create Admin Account'}
          </h1>
          <p className="text-xs text-brown-400 mt-1 text-center" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
            {mode === 'login' ? 'Rokomari Bostro Store Management' : 'পণ্য পরিচালনার জন্য অ্যাকাউন্ট তৈরি করুন'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brown-800 mb-1.5" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="rokomaribostro@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 placeholder-brown-300 text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-800 mb-1.5" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-brown-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brown-400 text-brown-900 placeholder-brown-300 text-sm"
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-700">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-rose-500 text-sm text-center" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="text-sm text-brown-500 hover:text-brown-800 transition-colors"
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          >
            {mode === 'login'
              ? "First time? Create admin account"
              : "Already have an account? Sign In"}
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-brown-100">
          <a href="/" className="flex items-center justify-center gap-2 text-xs text-brown-400 hover:text-brown-600 transition-colors"
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}
