'use client'

import { useEffect, useState } from 'react';
import { useTranslation } from '../../lib/context/TranslationContext';
import { getUserTimezone, isLikelyUkrainianUser, detectBrowserLocale } from '../../lib/utils/localeDetection';

const LocaleDebugInfo = () => {
  const { locale } = useTranslation();
  const [debugInfo, setDebugInfo] = useState<{
    browserLocale: string;
    timezone: string;
    isUkrainianUser: boolean;
    browserLanguages: readonly string[];
  } | null>(null);

  useEffect(() => {
    setDebugInfo({
      browserLocale: detectBrowserLocale(),
      timezone: getUserTimezone(),
      isUkrainianUser: isLikelyUkrainianUser(),
      browserLanguages: navigator.languages || [navigator.language],
    });
  }, []);

  if (!debugInfo) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50 max-w-sm">
      <h4 className="font-bold mb-2">🌍 Locale Detection Debug</h4>
      <div className="space-y-1">
        <p><strong>Current:</strong> {locale}</p>
        <p><strong>Browser:</strong> {debugInfo.browserLocale}</p>
        <p><strong>Timezone:</strong> {debugInfo.timezone}</p>
        <p><strong>Ukrainian user:</strong> {debugInfo.isUkrainianUser ? '✅' : '❌'}</p>
        <p><strong>Languages:</strong> {debugInfo.browserLanguages.join(', ')}</p>
      </div>
    </div>
  );
};

export default LocaleDebugInfo;