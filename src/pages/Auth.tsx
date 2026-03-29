/**
 * Auth — 登录/注册/忘记密码页面
 * 设计风格：書卷氣與咖啡香 — 温暖的纸质感 + 简约表单
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';
import { useUserStore } from '../store/userStore';
import { ViewMode } from '../types';
import * as api from '../service/user';
import toast, { Toaster } from 'react-hot-toast';
import {
  Coffee,
  Languages,
  Mail,
  Lock,
  User,
  KeyRound,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader,
  Send,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register' | 'forgot';

const InputField = ({
  icon: Icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  showToggle,
  onToggle,
  showPwd,
  suffix,
}: {
  icon: any;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  showToggle?: boolean;
  onToggle?: () => void;
  showPwd?: boolean;
  suffix?: React.ReactNode;
}) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors duration-200">
      <Icon size={17} />
    </div>
    <input
      type={showToggle ? (showPwd ? 'text' : 'password') : type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-11 pr-4 py-3.5 bg-background-warm border border-border-light rounded-xl text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all duration-200"
      style={suffix ? { paddingRight: '7rem' } : showToggle ? { paddingRight: '3rem' } : {}}
    />
    {showToggle && (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
      >
        {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    )}
    {suffix && (
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {suffix}
      </div>
    )}
  </div>
);

const Auth: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {currentView,setView} = useAppStore();
  const {login} = useUserStore();

  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  // Grouped form states
  const [loginForm, setLoginForm] = useState({ account: '', password: '' });
  const [regForm, setRegForm] = useState({ email: '', username: '', password: '', confirmPwd: '', code: '' });
  const [forgotForm, setForgotForm] = useState({ email: '', code: '', newPwd: '', confirmPwd: '' });

  // Toggle states
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showForgotPwd, setShowForgotPwd] = useState(false);

  // Send code states
  const [codeSending, setCodeSending] = useState(false);
  const [codeCooldown, setCodeCooldown] = useState(0);
  const [forgotCodeSending, setForgotCodeSending] = useState(false);
  const [forgotCooldown, setForgotCooldown] = useState(0);

  const notify = (message: string, type: 'success' | 'error') => {
    toast((t) => (
      <div className="flex justify-between items-center gap-3 min-w-[200px]">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg">{type === 'success' ? '☕' : '💡'}</span>
          <span className="text-sm font-medium text-text-main">{message}</span>
        </div>
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          className="p-1 rounded-lg hover:bg-background-subtle text-text-muted transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    ), {
      position: 'top-center',
      duration: 3000,
      style: {
        borderRadius: '0.75rem',
        background: '#F7F6F3',
        color: '#2D2A26',
        padding: '12px 16px',
        boxShadow: '0 8px 30px -4px rgba(45, 42, 38, 0.12)',
        border: '1px solid #E8E4DC',
      }
    });
  };

  const notifySuccess = (msg: string) => notify(msg, 'success');
  const notifyError = (msg: string) => notify(msg, 'error');

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('en') ? 'zh' : 'en');

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
  };

  const startCooldown = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(60);
    const timer = setInterval(() => {
      setter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.account || !loginForm.password) {
      notifyError(t('authFillAllFields'));
      return;
    }
    setLoading(true);
    try {
      const res = await api.login(loginForm);
      login(res.data.user, res.data.token);
      setView(ViewMode.Home);
      navigate('/app');
    } catch (err: any) {
      notifyError(err.response?.data?.error || err.message || t('loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async (type: 'register' | 'reset') => {
    const email = type === 'register' ? regForm.email : forgotForm.email;
    if (!email) {
      notifyError(t('authEnterEmail'));
      return;
    }
    const setSending = type === 'register' ? setCodeSending : setForgotCodeSending;
    const cooldown = type === 'register' ? codeCooldown : forgotCooldown;
    const setCooldown = type === 'register' ? setCodeCooldown : setForgotCooldown;

    if (cooldown > 0) return;

    setSending(true);
    try {
      await api.sendVerificationCode({ email, type });
      notifySuccess(t('authCodeSent'));
      startCooldown(setCooldown);
    } catch (err: any) {
      notifyError(err.response?.data?.error || err.message || t('authCodeFailed'));
    } finally {
      setSending(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, username, password, confirmPwd, code } = regForm;
    if (!email || !username || !password || !confirmPwd || !code) {
      notifyError(t('authFillAllFields'));
      return;
    }
    if (password !== confirmPwd) {
      notifyError(t('authPasswordMismatch'));
      return;
    }
    if (password.length < 6) {
      notifyError(t('authPasswordTooShort'));
      return;
    }
    setLoading(true);
    try {
      const res = await api.register({ email, username, password, code });
      login(res.data.user, res.data.token);
      setView(ViewMode.Home);
      navigate('/app');
    } catch (err: any) {
      notifyError(err.response?.data?.error || err.message || t('authRegisterFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, code, newPwd, confirmPwd } = forgotForm;
    if (!email || !code || !newPwd || !confirmPwd) {
      notifyError(t('authFillAllFields'));
      return;
    }
    if (newPwd !== confirmPwd) {
      notifyError(t('authPasswordMismatch'));
      return;
    }
    if (newPwd.length < 6) {
      notifyError(t('authPasswordTooShort'));
      return;
    }
    setLoading(true);
    try {
      const res = await api.resetPassword({
        email,
        code,
        newPassword: newPwd,
      });
      login(res.data.user, res.data.token);
      navigate('/app');
    } catch (err: any) {
      notifyError(err.response?.data?.error || err.message || t('authResetFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background-light">
      <Toaster />

      {/* Left decorative panel — Desktop only */}
      <div className="hidden lg:flex w-[420px] flex-shrink-0 bg-background-dark relative overflow-hidden flex-col justify-between p-10">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-20 -left-16 w-48 h-48 rounded-full bg-cambridge/6 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-16">
            <Coffee className="text-primary" size={24} />
            <span className="text-lg italic font-serif font-semibold text-white/90">{t('appName')}</span>
          </div>
          <h2 className="font-serif text-3xl font-semibold text-white/90 leading-snug mb-4">
            {t('landingTitle')}
            <span className="text-primary italic"> {t('landingTitleHighlight')}</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            {t('landingDescription')}
          </p>
        </div>

        <div className="relative z-10 text-white/20 text-xs font-serif">
          © 2025 Daily Cup Paper
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 lg:px-10">
          <button
            onClick={() => navigate('/landing')}
            className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            {t('back')}
          </button>
          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
              <Languages size={15} />
              {t('switchLang')}
            </button>
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2">
              <Coffee className="text-primary" size={20} />
              <span className="text-base italic font-serif font-semibold text-text-main">{t('appName')}</span>
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 pb-10 lg:px-16">
          <div className="w-full max-w-md animate-fade-in">

            {/* ─── Login ─── */}
            {mode === 'login' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-serif font-semibold text-text-main tracking-tight">{t('loginTitle')}</h1>
                  <p className="text-text-secondary text-sm mt-2">{t('loginSubtitle')}</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <InputField
                    icon={User}
                    value={loginForm.account}
                    onChange={(v) => setLoginForm(p => ({ ...p, account: v }))}
                    placeholder={t('authAccountPlaceholder')}
                  />
                  <InputField
                    icon={Lock}
                    value={loginForm.password}
                    onChange={(v) => setLoginForm(p => ({ ...p, password: v }))}
                    placeholder={t('authPasswordPlaceholder')}
                    showToggle
                    onToggle={() => setShowLoginPwd(!showLoginPwd)}
                    showPwd={showLoginPwd}
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      {t('authForgotPassword')}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-sm tracking-wide shadow-warm-lg shadow-primary/20 hover:shadow-warm-xl hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                  >
                    {loading && <Loader size={16} className="animate-spin" />}
                    {t('loginBtn')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-text-secondary text-sm">
                    {t('authNoAccount')}{' '}
                    <button
                      onClick={() => switchMode('register')}
                      className="text-primary font-semibold hover:underline underline-offset-2"
                    >
                      {t('authGoRegister')}
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* ─── Register ─── */}
            {mode === 'register' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-serif font-semibold text-text-main tracking-tight">{t('authRegisterTitle')}</h1>
                  <p className="text-text-secondary text-sm mt-2">{t('authRegisterSubtitle')}</p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <InputField
                    icon={Mail}
                    type="email"
                    value={regForm.email}
                    onChange={(v) => setRegForm(p => ({ ...p, email: v }))}
                    placeholder={t('authEmailPlaceholder')}
                  />
                  <InputField
                    icon={User}
                    value={regForm.username}
                    onChange={(v) => setRegForm(p => ({ ...p, username: v }))}
                    placeholder={t('authUsernamePlaceholder')}
                  />
                  <InputField
                    icon={KeyRound}
                    value={regForm.code}
                    onChange={(v) => setRegForm(p => ({ ...p, code: v }))}
                    placeholder={t('authCodePlaceholder')}
                    suffix={
                      <button
                        type="button"
                        onClick={() => handleSendCode('register')}
                        disabled={codeSending || codeCooldown > 0}
                        className="px-3 py-1.5 bg-primary/8 hover:bg-primary/15 text-primary text-xs font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        {codeSending ? <Loader size={12} className="animate-spin" /> : <Send size={12} />}
                        {codeCooldown > 0 ? `${codeCooldown}s` : t('authSendCode')}
                      </button>
                    }
                  />
                  <InputField
                    icon={Lock}
                    value={regForm.password}
                    onChange={(v) => setRegForm(p => ({ ...p, password: v }))}
                    placeholder={t('authSetPassword')}
                    showToggle
                    onToggle={() => setShowRegPwd(!showRegPwd)}
                    showPwd={showRegPwd}
                  />
                  <InputField
                    icon={Lock}
                    value={regForm.confirmPwd}
                    onChange={(v) => setRegForm(p => ({ ...p, confirmPwd: v }))}
                    placeholder={t('authConfirmPassword')}
                    showToggle
                    onToggle={() => setShowRegPwd(!showRegPwd)}
                    showPwd={showRegPwd}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-sm tracking-wide shadow-warm-lg shadow-primary/20 hover:shadow-warm-xl hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                  >
                    {loading && <Loader size={16} className="animate-spin" />}
                    {t('authRegisterBtn')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-text-secondary text-sm">
                    {t('authHasAccount')}{' '}
                    <button
                      onClick={() => switchMode('login')}
                      className="text-primary font-semibold hover:underline underline-offset-2"
                    >
                      {t('authGoLogin')}
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* ─── Forgot Password ─── */}
            {mode === 'forgot' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-serif font-semibold text-text-main tracking-tight">{t('authForgotTitle')}</h1>
                  <p className="text-text-secondary text-sm mt-2">{t('authForgotSubtitle')}</p>
                </div>

                <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                  <InputField
                    icon={Mail}
                    type="email"
                    value={forgotForm.email}
                    onChange={(v) => setForgotForm(p => ({ ...p, email: v }))}
                    placeholder={t('authEmailPlaceholder')}
                  />
                  <InputField
                    icon={KeyRound}
                    value={forgotForm.code}
                    onChange={(v) => setForgotForm(p => ({ ...p, code: v }))}
                    placeholder={t('authCodePlaceholder')}
                    suffix={
                      <button
                        type="button"
                        onClick={() => handleSendCode('reset')}
                        disabled={forgotCodeSending || forgotCooldown > 0}
                        className="px-3 py-1.5 bg-primary/8 hover:bg-primary/15 text-primary text-xs font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        {forgotCodeSending ? <Loader size={12} className="animate-spin" /> : <Send size={12} />}
                        {forgotCooldown > 0 ? `${forgotCooldown}s` : t('authSendCode')}
                      </button>
                    }
                  />
                  <InputField
                    icon={Lock}
                    value={forgotForm.newPwd}
                    onChange={(v) => setForgotForm(p => ({ ...p, newPwd: v }))}
                    placeholder={t('authNewPassword')}
                    showToggle
                    onToggle={() => setShowForgotPwd(!showForgotPwd)}
                    showPwd={showForgotPwd}
                  />
                  <InputField
                    icon={Lock}
                    value={forgotForm.confirmPwd}
                    onChange={(v) => setForgotForm(p => ({ ...p, confirmPwd: v }))}
                    placeholder={t('authConfirmPassword')}
                    showToggle
                    onToggle={() => setShowForgotPwd(!showForgotPwd)}
                    showPwd={showForgotPwd}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-sm tracking-wide shadow-warm-lg shadow-primary/20 hover:shadow-warm-xl hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                  >
                    {loading && <Loader size={16} className="animate-spin" />}
                    {t('authResetBtn')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => switchMode('login')}
                    className="text-primary font-semibold text-sm hover:underline underline-offset-2 flex items-center justify-center gap-1"
                  >
                    <ArrowLeft size={14} />
                    {t('authBackToLogin')}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
