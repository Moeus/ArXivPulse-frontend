/**
 * i18n - Internationalization Module
 * 
 * Lightweight i18n using Zustand store for locale state.
 */

import en from './en';
import zh from './zh';
import { useStore } from '../store/useStore';

export type Locale = 'en' | 'zh';

export type TranslationKeys = keyof typeof en;

const translations: Record<Locale, Record<string, string>> = { en, zh };

/**
 * Hook that returns a translation function `t(key)` based on current locale.
 */
export function useT() {
  const locale = useStore((s) => s.locale);
  const dict = translations[locale] || translations.en;

  function t(key: TranslationKeys): string {
    return dict[key] || translations.en[key] || key;
  }

  return { t, locale };
}

export { translations };
