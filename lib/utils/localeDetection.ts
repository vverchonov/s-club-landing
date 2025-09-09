import { Locale, locales, defaultLocale } from '../translations';

/**
 * Detects the user's preferred locale based on browser settings
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  // Get browser languages in order of preference
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const lang of browserLanguages) {
    // Check exact match first (e.g., 'uk', 'en')
    if (locales.includes(lang as Locale)) {
      return lang as Locale;
    }
    
    // Check language code only (e.g., 'uk-UA' -> 'uk', 'en-US' -> 'en')
    const langCode = lang.split('-')[0] as Locale;
    if (locales.includes(langCode)) {
      return langCode;
    }
  }
  
  return defaultLocale;
}

/**
 * Gets the user's timezone
 */
export function getUserTimezone(): string {
  if (typeof window === 'undefined') {
    return 'UTC';
  }
  
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

/**
 * Detects if user is likely in Ukraine based on timezone
 */
export function isLikelyUkrainianUser(): boolean {
  const timezone = getUserTimezone();
  const ukrainianTimezones = [
    'Europe/Kiev',
    'Europe/Kyiv', 
    'Europe/Uzhgorod',
    'Europe/Zaporozhye',
    'Europe/Simferopol'
  ];
  
  return ukrainianTimezones.includes(timezone);
}

/**
 * Gets the best locale for the user combining browser language and timezone
 */
export function getBestLocaleForUser(): Locale {
  const browserLocale = detectBrowserLocale();
  
  // If browser already suggests Ukrainian, use it
  if (browserLocale === 'uk') {
    return 'uk';
  }
  
  // If user is in Ukraine timezone but browser is not Ukrainian, still prefer Ukrainian
  if (isLikelyUkrainianUser()) {
    return 'uk';
  }
  
  // Otherwise use the detected browser locale or fallback to default
  return browserLocale;
}