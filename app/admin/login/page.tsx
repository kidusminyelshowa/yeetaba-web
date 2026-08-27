'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginAction } from '../actions';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectFrom = searchParams.get('from') || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAction(password);
      if (res.success) {
        router.push(redirectFrom);
        router.refresh();
      } else {
        setError(res.error || 'Authentication failed');
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-black border border-zinc-800 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <Image
            src="/ye-etaba-full-logo-white.svg"
            alt="Ye Etaba Icon"
            width={140}
            height={32}
            priority
          />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white mb-1">CMS Dashboard</h1>
        <p className="text-xs text-zinc-400">Enter your admin password to manage site content</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Admin Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••••••"
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#80c998] focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 bg-[#80c998] hover:bg-[#81db98] active:bg-[#82e0a0] text-black font-semibold rounded-xl transition-all shadow-lg hover:shadow-emerald-950/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span>Authenticating...</span>
          ) : (
            <span>Sign In to Dashboard</span>
          )}
        </button>
      </form>
    </div>
  );
}
