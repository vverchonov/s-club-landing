import type { Metadata } from 'next'
import Vacancies from '../components/Vacancies'
import { translations } from '../../lib/translations'
import { getBestLocaleForUser } from '../../lib/utils/localeDetection'

// Generate dynamic metadata based on user locale
export async function generateMetadata(): Promise<Metadata> {
  const locale = getBestLocaleForUser();
  const t = translations[locale];
  
  return {
    title: t.meta.vacanciesTitle,
    description: t.meta.vacanciesDescription,
    openGraph: {
      title: t.meta.vacanciesTitle,
      description: t.meta.vacanciesDescription,
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
    },
    twitter: {
      title: t.meta.vacanciesTitle,
      description: t.meta.vacanciesDescription,
    },
  };
}

export default function VacanciesPage() {
  return (
    <>
    
      <main className="">
        <Vacancies />
      </main>
 
    </>
  )
} 