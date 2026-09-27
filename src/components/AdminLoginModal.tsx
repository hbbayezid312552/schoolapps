import React, { useState } from 'react';
import { SchoolLogo } from './SchoolLogo';
import { Shield, KeyRound, Mail, X, AlertCircle, Lock } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../supabase/client';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('admin@moslemganj.edu.bd');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: password,
        });
        if (error) throw error;
      } else {
        throw new Error('Supabase কনফিগার করা হয়নি। .env ফাইলে VITE_SUPABASE_URL এবং VITE_SUPABASE_ANON_KEY সেট করুন।');
      }

      onLoginSuccess();
      onClose();
    } catch (error: any) {
      setError(error?.message || 'লগইন করা যায়নি। Supabase Auth-এর ইমেইল ও পাসওয়ার্ড যাচাই করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1 rounded-full hover:bg-emerald-900"
          >
            <X className="w-5 h-5" />
          </button>
          <SchoolLogo size={52} className="mx-auto mb-2" />
          <h3 className="text-lg font-bold font-bengali">প্রশাসনিক লগইন</h3>
          <p className="text-xs text-emerald-300">মোসলেমগঞ্জ উচ্চ বিদ্যালয় ম্যানেজমেন্ট প্যানেল</p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
            {isSupabaseConfigured
              ? 'Supabase Auth-এ তৈরি করা Admin User-এর ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন।'
              : 'Supabase এখনো কনফিগার করা হয়নি। ডেমো মোডে স্থানীয় লগইন সক্রিয় আছে।'}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                অ্যাডমিন ইমেইল / ইউজারনেম
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@moslemganj.edu.bd"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <KeyRound className="w-4 h-4 text-amber-300" />
              <span>{isLoading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
