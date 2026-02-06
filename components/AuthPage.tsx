
import React, { useState } from 'react';

type AuthView = 'login' | 'register' | 'forgot';
type LoginMode = 'password' | 'code';

interface AuthPageProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [view, setView] = useState<AuthView>('login');
  const [loginMode, setLoginMode] = useState<LoginMode>('password');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (!email) return;
    setIsSendingCode(true);
    // Simulate API call
    setTimeout(() => {
      setIsSendingCode(false);
      setCodeSent(true);
      alert("Demo: Verification code sent to " + email);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In demo, we just accept any valid-looking input
    if (email) onLogin(email);
  };

  return (
    <div className="min-h-screen bg-background-subtle flex items-center justify-center p-6 animate-fade-in relative">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest"
      >
        <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
        Back
      </button>

      <div className="w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl shadow-primary/5 p-10 flex flex-col gap-8 border border-gray-100">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined !text-[32px]">
              {view === 'login' ? 'login' : view === 'register' ? 'person_add' : 'lock_reset'}
            </span>
          </div>
          <h2 className="text-3xl font-black text-text-main tracking-tight">
            {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Create Account' : 'Reset Password'}
          </h2>
          <p className="text-sm text-text-secondary font-medium">
            {view === 'login' ? 'Enter your credentials to continue research' : view === 'register' ? 'Start your journey into ArXiv insights' : 'We will send a code to your email'}
          </p>
        </div>

        {view === 'login' && (
          <div className="flex bg-background-subtle p-1 rounded-2xl">
            <button 
              onClick={() => setLoginMode('password')}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${loginMode === 'password' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'}`}
            >
              Password
            </button>
            <button 
              onClick={() => setLoginMode('code')}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${loginMode === 'code' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'}`}
            >
              Email Code
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary px-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@pulse.edu"
                className="w-full h-12 pl-11 pr-4 bg-background-subtle border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary !text-[18px]">mail</span>
            </div>
          </div>

          {(view === 'register' || (view === 'login' && loginMode === 'code') || view === 'forgot') && (
            <div className="flex flex-col gap-1.5 animate-fade-in">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Verification Code</label>
                <button 
                  type="button"
                  onClick={handleSendCode}
                  disabled={isSendingCode || !email}
                  className="text-[10px] font-black uppercase text-primary hover:underline disabled:opacity-30"
                >
                  {isSendingCode ? 'Sending...' : codeSent ? 'Resend Code' : 'Send Code'}
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="6-digit code"
                  className="w-full h-12 pl-11 pr-4 bg-background-subtle border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all tracking-[0.2em]"
                />
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary !text-[18px]">verified_user</span>
              </div>
            </div>
          )}

          {(view === 'register' || (view === 'login' && loginMode === 'password') || view === 'forgot') && (
            <div className="flex flex-col gap-1.5 animate-fade-in">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">
                  {view === 'forgot' ? 'New Password' : 'Password'}
                </label>
                {view === 'login' && (
                  <button type="button" onClick={() => setView('forgot')} className="text-[10px] font-black uppercase text-primary hover:underline">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-4 bg-background-subtle border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary !text-[18px]">lock</span>
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 mt-2"
          >
            {view === 'login' ? 'Sign In' : view === 'register' ? 'Complete Registration' : 'Reset & Sign In'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-xs text-text-secondary font-medium">
            {view === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => { setView(view === 'login' ? 'register' : 'login'); setCodeSent(false); }}
              className="ml-2 text-primary font-black uppercase tracking-tighter hover:underline"
            >
              {view === 'login' ? 'Register Now' : 'Sign In instead'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
