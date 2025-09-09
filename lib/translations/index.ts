import { uk } from './uk';
import { en } from './en';

export type TranslationKey = keyof typeof uk;
export type NestedTranslationKey = string;

export const translations = {
  uk,
  en,
};

export type Locale = keyof typeof translations;
export type TranslationSchema = typeof uk;

export const defaultLocale: Locale = 'uk';
export const locales: Locale[] = ['uk', 'en'] as const;