/**
 * Auth — 认证页面
 * 支持三种子视图：登录（login）、注册（register）、忘记密码（forgot）
 * 登录支持密码和验证码两种方式
 * 成功登录后跳转到 Explore 页面
 */

import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ViewMode } from '../types';
import { useT } from '../i18n';
import { ArrowLeft, LogIn, UserPlus, KeyRound } from 'lucide-react';

type AuthView = 'login' | 'register' | 'forgot';
type LoginMode = 'password' | 'code';

const Auth: React.FC = () => {
  const { setUser, setView } = useStore();
  const { t } = useT();
  const [view, setViewInternal] = useState<AuthView>('login');
  const [loginMode, setLoginMode] = useState<LoginMode>('password');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (!email) return;
    setIsSendingCode(true);
    setTimeout(() => {
      setIsSendingCode(false);
      setCodeSent(true);
      alert("Code sent to " + email);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setUser({ email, name: email.split('@')[0] });
      setView(ViewMode.Explore);
    }
  };

  const getAuthIcon = () => {
    switch (view) {
      case 'login': return <LogIn size={32} />;
      case 'register': return <UserPlus size={32} />;
      case 'forgot': return <KeyRound size={32} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-subtle flex items-center justify-center p-6 animate-fade-in relative">
      <button 
        onClick={() => setView(ViewMode.Landing)}
        className="absolute top-8 left-8 flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest"
      >
        <ArrowLeft size={20} />
        {t('back')}
      </button>

      <div className="w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl shadow-primary/5 p-10 flex flex-col gap-8 border border-gray-100">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-2">
            {getAuthIcon()}
          </div>
          <h2 className="text-3xl font-black text-text-main tracking-tight">
            {view === 'login' ? t('welcomeBack') : view === 'register' ? t('createAccount') : t('resetPassword')}
          </h2>
        </div>

        {view === 'login' && (
          <div className="flex bg-background-subtle p-1 rounded-2xl">
            <button onClick={() => setLoginMode('password')} className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${loginMode === 'password' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'}`}>{t('password')}</button>
            <button onClick={() => setLoginMode('code')} className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${loginMode === 'code' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary'}`}>{t('code')}</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary px-1">{t('email')}</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="researcher@pulse.edu"
              className="w-full h-12 px-4 bg-background-subtle border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {(view === 'register' || (view === 'login' && loginMode === 'code') || view === 'forgot') && (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{t('code')}</label>
                <button type="button" onClick={handleSendCode} className="text-[10px] font-black uppercase text-primary hover:underline">{isSendingCode ? t('sendingCode') : t('getCode')}</button>
              </div>
              <input type="text" required value={code} onChange={(e) => setCode(e.target.value)} placeholder="000000" className="w-full h-12 px-4 bg-background-subtle border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          )}

          {(view === 'register' || (view === 'login' && loginMode === 'password') || view === 'forgot') && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{t('password')}</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 px-4 bg-background-subtle border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          )}

          <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 mt-2">
            {view === 'login' ? t('signIn') : view === 'register' ? t('register') : t('reset')}
          </button>
        </form>

        <div className="text-center">
          <button onClick={() => setViewInternal(view === 'login' ? 'register' : 'login')} className="text-xs text-primary font-black uppercase tracking-tighter hover:underline">
            {view === 'login' ? t('createAccount') : t('alreadyHaveAccount')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
