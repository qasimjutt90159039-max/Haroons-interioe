import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    const token = localStorage.getItem('haroons_admin_token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.login(email, password);
      if (res.success && res.token) {
        localStorage.setItem('haroons_admin_token', res.token);
        localStorage.setItem('haroons_admin_user', JSON.stringify(res.user));
        navigate('/admin');
      } else {
        setError(res.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.message || 'Invalid email or password credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@haroonsinteriors.com');
    setPassword('Haroon@Admin2026!');
  };

  return (
    <div className="min-h-screen bg-studio-black text-studio-soft pt-32 pb-24 flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-studio-borderSubtle bg-studio-deep p-8 sm:p-10 relative">
        {/* Top Minimal Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-studio-gold" />

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full border border-studio-borderSubtle bg-studio-charcoal flex items-center justify-center mx-auto mb-4 text-studio-gold">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-studio-gold block mb-1">
            STAFF PORTAL
          </span>
          <h1 className="text-2xl font-editorial text-white uppercase">
            Studio Management
          </h1>
          <p className="text-xs text-studio-medium mt-1 font-light">
            Haroon's Interiors • Administrative Access
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@haroonsinteriors.com"
                className="w-full pl-10 pr-4 py-2.5 bg-studio-black border border-studio-borderSubtle text-xs text-white focus:outline-none focus:border-studio-gold transition-colors"
                required
              />
              <Mail className="w-4 h-4 text-studio-medium absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-studio-black border border-studio-borderSubtle text-xs text-white focus:outline-none focus:border-studio-gold transition-colors"
                required
              />
              <Lock className="w-4 h-4 text-studio-medium absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-studio-gold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'ENTER DASHBOARD'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Quick Fill Box */}
        <div className="mt-8 pt-6 border-t border-studio-borderSubtle/60 text-center">
          <p className="text-[11px] text-studio-medium mb-2 font-mono">
            Default Administrator Credentials:
          </p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs font-mono text-studio-gold hover:underline"
          >
            admin@haroonsinteriors.com • (Click to autofill)
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-studio-medium hover:text-white transition-colors"
          >
            ← Return to Haroon's Interiors Website
          </Link>
        </div>
      </div>
    </div>
  );
}
