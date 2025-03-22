'use client'

import Link from 'next/link'
import Image from 'next/image'
import FadeIn from './FadeIn'

const News = () => {
  const newsItems = [
    {
      id: 1,
      date: '15.03.2024',
      title: 'Нове Шоу "Червона Спокуса"',
      description: 'Запрошуємо вас на прем\'єру нашого нового шоу, яке відбудеться цієї п\'ятниці. Неймовірні костюми та хореографія!',
      image: '/news/show.jpg'
    },
    {
      id: 2,
      date: '10.03.2024',
      title: 'Коктейльна Карта Оновлена',
      description: 'Спробуйте наші нові авторські коктейлі від найкращих міксологів міста. Особлива увага приділена локальним інгредієнтам.',
      image: '/news/cocktails.jpg'
    },
    {
      id: 3,
      date: '05.03.2024',
      title: 'Вечірка "Golden Night"',
      description: 'Щосуботи новий формат вечірок з золотим конфеті, розкішними призами та спеціальним меню.',
      image: '/news/party.jpg'
    },
    {
      id: 4,
      date: '01.03.2024',
      title: 'Міжнародні Гості',
      description: 'Цього місяця у нас виступають спеціальні гості з Парижу та Мілану. Не пропустіть їх неймовірні шоу!',
      image: '/news/guests.jpg'
    },
    {
      id: 5,
      date: '25.02.2024',
      title: 'VIP Зона Оновлена',
      description: 'Ми оновили наш VIP простір, додавши нові зручні дивани та покращивши систему обслуговування.',
      image: '/news/vip.jpg'
    },
    {
      id: 6,
      date: '20.02.2024',
      title: 'Crazy Menu Тиждень',
      description: 'Цілий тиждень спеціальні ціни на всі позиції з нашого Crazy Menu. Спробуйте щось новеньке!',
      image: '/news/menu.jpg'
    }
  ]

  return (
    <section id="news" className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-red-500 text-xl mb-4">ОСТАННІ НОВИНИ</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8">
              ПОДІЇ ТА ОНОВЛЕННЯ
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Будь у курсі всіх подій Cherry Lips. Нові шоу-програми, спеціальні вечори та ексклюзивні пропозиції — дізнавайся першим!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {newsItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-gradient-to-b from-red-950/50 to-black/50 rounded-lg overflow-hidden group hover:from-red-900/50 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-red-400 text-sm font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-medium mb-3 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    {item.description}
                  </p>
                  <Link 
                    href={`/news/${item.id}`}
                    className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
                  >
                    Детальніше
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </FadeIn>
      </div>
    </section>
  )
}

export default News 