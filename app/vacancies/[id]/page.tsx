'use client';
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import FadeIn from '../../components/FadeIn'

interface Vacancy {
  id: string
  title: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  responsibilities: string[]
}

type VacanciesType = {
  [key: string]: Vacancy
}

// This would typically come from a database
const vacancies: VacanciesType = {
  '375395': {
    id: '375395',
    title: "Танцівниця",
    salary: "від 100,000₴/міс",
    description: "Шукаємо харизматичних та талановитих танцівниць для виступів у нашому клубі. Досвід роботи від 1 року. Надаємо комфортні умови праці та гнучкий графік.",
    requirements: [
      "Досвід роботи від 1 року",
      "Хореографічна освіта",
      "Вік від 18 років",
      "Приємна зовнішність"
    ],
    benefits: [
      "Гнучкий графік роботи",
      "Висока заробітна плата",
      "Офіційне працевлаштування",
      "Дружній колектив",
      "Можливість професійного розвитку"
    ],
    responsibilities: [
      "Участь у шоу-програмах клубу",
      "Підготовка та репетиції нових номерів",
      "Підтримка фізичної форми",
      "Дотримання правил клубу"
    ]
  },
  '375396': {
    id: '375396',
    title: "Бармен",
    salary: "45,000₴ - 60,000₴/міс",
    description: "Досвідчений бармен для створення авторських коктейлів та роботи з преміальними напоями. Потрібне знання класичних коктейлів та вміння працювати в команді.",
    requirements: [
      "Досвід роботи від 2 років",
      "Знання англійської",
      "Вміння працювати в команді"
    ],
    benefits: [
      "Конкурентна заробітна плата",
      "Офіційне працевлаштування",
      "Можливість розвитку",
      "Дружній колектив",
      "Премії за виконання планів"
    ],
    responsibilities: [
      "Приготування коктейлів",
      "Обслуговування гостей на найвищому рівні",
      "Підтримка чистоти робочого місця",
      "Контроль наявності інгредієнтів"
    ]
  },
  '375397': {
    id: '375397',
    title: "Хостес",
    salary: "35,000₴ - 45,000₴/міс",
    description: "Шукаємо привітну та комунікабельну хостес для зустрічі та супроводу гостей клубу. Знання англійської мови обов'язкове.",
    requirements: [
      "Знання англійської",
      "Приємна зовнішність",
      "Комунікабельність"
    ],
    benefits: [
      "Стабільна заробітна плата",
      "Офіційне працевлаштування",
      "Безкоштовне харчування",
      "Дружній колектив",
      "Можливість кар'єрного росту"
    ],
    responsibilities: [
      "Зустріч та супровід гостей",
      "Ведення бронювань",
      "Комунікація з гостями",
      "Вирішення конфліктних ситуацій"
    ]
  },
  '375398': {
    id: '375398',
    title: "Офіціант/ка",
    salary: "40,000₴ - 55,000₴/міс",
    description: "Потрібні офіціанти з досвідом роботи в преміальних закладах. Забезпечуємо навчання та можливість кар'єрного росту.",
    requirements: [
      "Досвід роботи від 1 року",
      "Знання сервісу",
      "Вік від 18 років"
    ],
    benefits: [
      "Висока заробітна плата + чайові",
      "Офіційне працевлаштування",
      "Безкоштовне харчування",
      "Навчання та розвиток",
      "Дружній колектив"
    ],
    responsibilities: [
      "Обслуговування гостей",
      "Знання меню та напоїв",
      "Підтримка чистоти в залі",
      "Робота з касою"
    ]
  }
}

export default function VacancyPage() {
  const params = useParams();
  const id = params.id as string;

  // Handle the case when the page is initially loading
  if (!id) {
    return <div>Loading...</div>;
  }

  const vacancy = vacancies[id];

  if (!vacancy) {
    notFound()
  }

  return (
    <>
      <main className="bg-black text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <FadeIn>
            <div className="mb-8">
              <Link 
                href="/vacancies"
                className="text-red-500 hover:text-red-400 transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Назад до вакансій
              </Link>
            </div>

            <div className="bg-gradient-to-b from-red-950/30 to-black/30 rounded-lg p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl md:text-4xl font-serif">{vacancy.title}</h1>
                <span className="text-yellow-500 font-bold text-xl">{vacancy.salary}</span>
              </div>
              <p className="text-gray-300 text-lg mb-8">{vacancy.description}</p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl text-red-500 mb-4">Вимоги:</h2>
                  <ul className="space-y-2">
                    {vacancy.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl text-red-500 mb-4">Обов&apos;язки:</h2>
                  <ul className="space-y-2">
                    {vacancy.responsibilities.map((resp: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl text-red-500 mb-4">Ми пропонуємо:</h2>
                  <ul className="space-y-2">
                    {vacancy.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="mailto:career@sclub.kiev.ua"
                className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full tracking-wider transition-colors"
              >
                НАДІСЛАТИ РЕЗЮМЕ
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>
    </>
  )
} 