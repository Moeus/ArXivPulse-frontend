import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/appStore';
import { useUserStore } from '../store/userStore';
import { ViewMode } from '../types';
import * as api from '../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import {
  FlaskConical,
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
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors">
      <Icon size={18} />
    </div>
    <input
      type={showToggle ? (showPwd ? 'text' : 'password') : type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-11 pr-4 py-3.5 bg-background-subtle border border-gray-200 rounded-2xl text-sm text-text-main placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
      style={suffix ? { paddingRight: '7rem' } : showToggle ? { paddingRight: '3rem' } : {}}
    />
    {showToggle && (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
      >
        {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
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
  const setView = useAppStore(state => state.setView);
  const authLogin = useUserStore(state => state.login);

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
          <span className="text-lg">{type === 'success' ? '✨' : '💡'}</span>
          <span className="text-sm font-bold text-text-main">{message}</span>
        </div>
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          className="p-1 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    ), {
      position: 'top-center',
      duration: 3000,
      style: {
        borderRadius: '1rem',
        background: '#fff',
        color: '#1a1a1a',
        padding: '12px 16px',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        border: '1px solid #f3f4f6',
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
      authLogin(res.data.user, res.data.token);
      setView(ViewMode.Home);
    } catch (err: any) {
      notifyError(err.response?.data?.error || err.message || t('authLoginFailed'));
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
      authLogin(res.data.user, res.data.token);
      setView(ViewMode.Home);
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
      authLogin(res.data.user, res.data.token);
      setView(ViewMode.Home);
    } catch (err: any) {
      notifyError(err.response?.data?.error || err.message || t('authResetFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Toaster />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 lg:px-10">
          <button
            onClick={() => setView(ViewMode.Landing)}
            className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
            {t('back')}
          </button>
          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm font-bold text-text-secondary hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
              <Languages size={18} />
              {t('switchLang')}
            </button>
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2">
              <FlaskConical className="text-primary" size={24} />
              <span className="text-lg font-black text-text-main tracking-tighter">{t('appName')}</span>
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
                  <h1 className="text-3xl font-black text-text-main tracking-tight">{t('authLoginTitle')}</h1>
                  <p className="text-text-secondary text-sm mt-2">{t('authLoginSubtitle')}</p>
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
                      className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      {t('authForgotPassword')}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {loading && <Loader size={16} className="animate-spin" />}
                    {t('authLoginBtn')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-text-secondary text-sm">
                    {t('authNoAccount')}{' '}
                    <button
                      onClick={() => switchMode('register')}
                      className="text-primary font-bold hover:underline"
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
                  <h1 className="text-3xl font-black text-text-main tracking-tight">{t('authRegisterTitle')}</h1>
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
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
                    className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
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
                      className="text-primary font-bold hover:underline"
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
                  <h1 className="text-3xl font-black text-text-main tracking-tight">{t('authForgotTitle')}</h1>
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
                        className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
                    className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {loading && <Loader size={16} className="animate-spin" />}
                    {t('authResetBtn')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => switchMode('login')}
                    className="text-primary font-bold text-sm hover:underline flex items-center justify-center gap-1"
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
