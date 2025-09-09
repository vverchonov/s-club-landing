'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Locale, defaultLocale, TranslationSchema } from '../translations';
import { getBestLocaleForUser } from '../utils/localeDetection';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationSchema;
  isInitialized: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Track when component has mounted to avoid hydration mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    // Load locale from localStorage first, fallback to auto-detection
    const savedLocale = localStorage.getItem('locale') as Locale;
    
    if (savedLocale && translations[savedLocale]) {
      // User has previously selected a language
      setLocaleState(savedLocale);
    } else {
      // Auto-detect best locale for user
      const detectedLocale = getBestLocaleForUser();
      setLocaleState(detectedLocale);
      // Don't save to localStorage yet - let user choice override detection
    }
    
    // Mark as initialized after locale is set
    setIsInitialized(true);
  }, [hasMounted]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    // Update document language
    document.documentElement.lang = newLocale;
  };

  const value: TranslationContextType = {
    locale,
    setLocale,
    t: translations[locale],
    isInitialized,
  };

  // Show loading screen until component has mounted and locale is initialized
  // This prevents hydration mismatch by ensuring server and client render the same initial state
  if (!hasMounted || !isInitialized) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg">Cherry Lips</p>
        </div>
      </div>
    );
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}