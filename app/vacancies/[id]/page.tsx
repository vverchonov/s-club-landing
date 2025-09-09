'use client';
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import FadeIn from '@/app/components/FadeIn'
import { useTranslation } from '../../../lib/context/TranslationContext'

export default function VacancyPage() {
  const { t, isInitialized } = useTranslation()
  const [hasMounted, setHasMounted] = useState(false)
  const params = useParams()
  const jobId = params.id as string
  const vacancy = jobId && t.vacancies.jobs ? t.vacancies.jobs[jobId as keyof typeof t.vacancies.jobs] : null

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Show loading screen until component has mounted and translations are loaded
  if (!hasMounted || !isInitialized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg">Cherry Lips</p>
        </div>
      </div>
    )
  }

  if (!vacancy) {
    return (
      <div className="min-h-screen bg-black text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif mb-8">{t.vacancies.notFound}</h1>
          <Link
            href="/vacancies"
            className="inline-block bg-[#8B0000] hover:bg-[#660000] text-white px-8 py-3 rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300"
          >
            {t.vacancies.backToVacanciesButton}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-black text-white py-24 relative ${params.id === 'dancer' || params.id === 'gogo-dancer' ? 'before:content-[""] before:absolute before:inset-0 before:bg-[url("/back.jpg")] before:bg-cover before:bg-center before:opacity-30 before:z-0' : ''}`}>
      <div className={`absolute inset-0 overflow-hidden ${params.id === 'dancer' ||params.id === 'gogo-dancer' ? 'hidden' : ''}`}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
      </div>

      <FadeIn>
        <div className="relative max-w-4xl mx-auto px-4 z-10">
          <Link
            href="/vacancies"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.vacancies.backToVacancies}
          </Link>

          <h1 className="text-4xl md:text-5xl font-serif mb-8">{vacancy.title}</h1>
          <p className="text-xl text-gray-300 mb-12">{vacancy.description}</p>

          <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm mb-12">
            <h2 className="text-2xl font-serif mb-6">{t.vacancies.weOffer}</h2>
            <ul className="space-y-4 mb-8">
              {vacancy.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="col-span-2">
                <h3 className="text-lg font-medium mb-2">{t.vacancies.salary}</h3>
                <p className="text-gray-300">{vacancy.salary}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-serif mb-6">{t.vacancies.requirements}</h2>
              <ul className="space-y-4">
                {vacancy.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <h2 className="text-2xl font-serif mb-6">{t.vacancies.duties}</h2>
              <ul className="space-y-4">
                {vacancy.duties.map((duty, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{duty}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSciO3sIQLu4ZIhCA8bT5wQgJkvArH066JfmL2LoqI1WSvD9Bw/viewform"
              className="inline-block bg-[#8B0000] hover:bg-[#660000] text-white px-8 py-3 rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300"
            >
              {t.vacancies.sendResume}
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  )
} 