'use client'

import Link from 'next/link'
import FadeIn from './FadeIn'
import { vacancies } from '@/app/data/vacanciesData'

export default function Vacancies() {
  return (
    <section id="vacancies" className="relative bg-black text-white py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
      </div>

      <FadeIn>
        <div className="relative max-w-6xl mx-auto px-4">
          <h2 className="text-red-500 text-xl mb-4 text-center uppercase">Вакансії</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-16 text-center">
            ПРИЄДНУЙТЕСЬ ДО НАШОЇ КОМАНДИ
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {vacancies.map((vacancy) => (
              <div key={vacancy.id} className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
                <h4 className="text-2xl font-serif mb-4">{vacancy.title}</h4>
                <p className="text-gray-300 mb-6">{vacancy.description}</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <h5 className="text-lg font-medium mb-2">Заробітна плата:</h5>
                    <p className="text-gray-300">{vacancy.salary}</p>
                  </div>
                </div>
                <Link
                  href={`/vacancies/${vacancy.id}`}
                  className="inline-block bg-[#8B0000] hover:bg-[#660000] text-white px-8 py-3 rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300"
                >
                  ДЕТАЛЬНІШЕ
                </Link>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
} 