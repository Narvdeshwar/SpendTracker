import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, User, ArrowRight, Loader2, Apple, Github, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { cn } from '../../utils/cn';

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const { data, error: authError } = isLogin 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
    } else if (!isLogin && data.user && data.session === null) {
      // User signed up but needs to confirm email (standard Supabase setting)
      setSuccess('Verification email sent! Please check your inbox to activate your account.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col justify-center px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[150%] aspect-square bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[150%] aspect-square bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto w-full space-y-12 relative z-10"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-purple-600/10 text-purple-600 mb-4">
            <Zap size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-ink">PennyTrack</h1>
          <p className="meta-label opacity-40 uppercase tracking-[0.3em]">Capital Atelier</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] space-y-6 shadow-2xl shadow-black/5">
          <div className="flex gap-2 p-1 bg-black/5 rounded-2xl">
            <button 
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                isLogin ? "bg-white text-ink shadow-sm" : "text-ink/40"
              )}
            >
              Log In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                !isLogin ? "bg-white text-ink shadow-sm" : "text-ink/40"
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase opacity-40 ml-1 tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/30 group-focus-within:text-purple-600 transition-colors" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@nexus.com"
                  className="w-full glass py-4 pl-14 pr-4 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-ink placeholder:opacity-20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase opacity-40 ml-1 tracking-widest">Secret Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-ink/30 group-focus-within:text-purple-600 transition-colors" size={18} />
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full glass py-4 pl-14 pr-4 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-ink placeholder:opacity-20"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-rose-50 text-rose-500 rounded-2xl text-xs font-bold flex items-center gap-2 border border-rose-100"
              >
                <Zap size={14} />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold flex items-center gap-2 border border-emerald-100"
              >
                <Check size={14} />
                {success}
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-purple-600 text-white rounded-3xl font-bold uppercase tracking-[0.2em] shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all text-xs"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Establish Session' : 'Create Identity'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-black/5" />
            <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Or Securely Join With</span>
            <div className="h-px flex-1 bg-black/5" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="glass py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all text-ink/60 hover:text-ink">
              <Apple size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Apple</span>
            </button>
            <button className="glass py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all text-ink/60 hover:text-ink">
              <Github size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] font-bold text-ink/30 uppercase tracking-[0.25em]">
          End-to-End Encrypted Financial Data
        </p>
      </motion.div>
    </div>
  );
};
