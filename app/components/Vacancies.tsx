'use client'

import Link from 'next/link'
import FadeIn from './FadeIn'

const Vacancies = () => {
  const positions = [
    {
      id: '375395',
      title: "Танцівниця",
      salary: "від 100,000₴/міс",
      description: "Шукаємо харизматичних та талановитих танцівниць для виступів у нашому клубі. Досвід роботи від 1 року. Надаємо комфортні умови праці та гнучкий графік.",
      requirements: ["Досвід роботи від 1 року", "Хореографічна освіта", "Вік від 18 років", "Приємна зовнішність"]
    },
    {
      id: '375396',
      title: "Бармен",
      salary: "45,000₴ - 60,000₴/міс",
      description: "Досвідчений бармен для створення авторських коктейлів та роботи з преміальними напоями. Потрібне знання класичних коктейлів та вміння працювати в команді.",
      requirements: ["Досвід роботи від 2 років", "Знання англійської", "Вміння працювати в команді"]
    },
    {
      id: '375398',
      title: "Офіціант/ка",
      salary: "40,000₴ - 55,000₴/міс",
      description: "Потрібні офіціанти з досвідом роботи в преміальних закладах. Забезпечуємо навчання та можливість кар'єрного росту.",
      requirements: ["Досвід роботи від 1 року", "Знання сервісу", "Вік від 18 років"]
    },
    {
      id: '375399',
      title: "Адміністратор",
      salary: "50,000₴ - 70,000₴/міс",
      description: "Шукаємо досвідченого адміністратора для управління роботою закладу та персоналом. Важливі лідерські якості та досвід у нічних клубах.",
      requirements: ["Досвід роботи від 3 років", "Знання англійської мови", "Організаторські здібності", "Стресостійкість"]
    },
    {
      id: '375397',
      title: "Хостес",
      salary: "35,000₴ - 45,000₴/міс",
      description: "Шукаємо привітну та комунікабельну хостес для зустрічі та супроводу гостей клубу. Знання англійської мови обов'язкове.",
      requirements: ["Знання англійської", "Приємна зовнішність", "Комунікабельність"]
    },
    {
      id: '375400',
      title: "Діджей",
      salary: "60,000₴ - 90,000₴/міс",
      description: "Шукаємо талановитого діджея з досвідом роботи в нічних клубах. Важливе вміння відчувати аудиторію та створювати атмосферу.",
      requirements: ["Досвід роботи від 2 років", "Власне обладнання", "Знання сучасної музики", "Вміння працювати з публікою"]
    },
    {
      id: '375401',
      title: "Охоронець",
      salary: "35,000₴ - 45,000₴/міс",
      description: "Потрібні відповідальні охоронці для забезпечення безпеки гостей та персоналу клубу. Перевага кандидатам з досвідом роботи в нічних закладах.",
      requirements: ["Досвід роботи від 1 року", "Фізична підготовка", "Стресостійкість", "Вміння працювати в команді"]
    },
    {
      id: '375402',
      title: "Прибиральниця",
      salary: "25,000₴ - 30,000₴/міс",
      description: "Шукаємо відповідальних працівників для підтримки чистоти в клубі. Графік роботи позмінний.",
      requirements: ["Відповідальність", "Уважність до деталей", "Досвід роботи вітається"]
    }
  ]

  return (
    <section id="vacancies" className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-red-500 text-xl mb-4 uppercase">КАР&apos;ЄРА В Cherry Lips showbar</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8">
              ПРИЄДНУЙТЕСЬ ДО НАШОЇ КОМАНДИ
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Хочеш стати частиною найяскравішого клубу міста? Cherry Lips запрошує до команди енергійних і професійних співробітників!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {positions.map((position) => (
              <Link 
                key={position.id}
                href={`/vacancies/${position.id}`}
                className="cursor-pointer"
              >
                <div 
                  className="bg-gradient-to-b from-red-950/30 to-black/30 rounded-lg p-8 hover:from-red-900/30 transition-all duration-300 group h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-medium group-hover:text-red-400 transition-colors">
                      {position.title}
                    </h4>
                    <span className="text-amber-300 font-bold">
                      {position.salary}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6">
                    {position.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {position.requirements.map((req, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-400">
                        <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {req}
                      </div>
                    ))}
                  </div>
                  <div 
                    className="inline-flex items-center text-red-500 group-hover:text-red-400 transition-colors group-hover:translate-x-2 duration-300"
                  >
                    Детальніше
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link 
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSciO3sIQLu4ZIhCA8bT5wQgJkvArH066JfmL2LoqI1WSvD9Bw/viewform"
              className="inline-block px-8 py-3 text-lg font-medium bg-[#8B0000] hover:bg-[#660000] text-white transition-colors duration-300 rounded-full tracking-wider shadow-lg"
            >
              НАДІСЛАТИ РЕЗЮМЕ
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Vacancies 