'use client'

import Link from 'next/link'
import FadeIn from './FadeIn'

const Menu = () => {
  const regularMenu = [
    {
      name: "Джек Деніелс",
      description: "Преміальний американський віскі",
      price: "150₴"
    },
    {
      name: "Мохіто",
      description: "Освіжаючий коктейль з м'ятою та лаймом",
      price: "180₴"
    },
    {
      name: "Маргарита",
      description: "Класичний коктейль з текілою",
      price: "190₴"
    },
    {
      name: "Мартіні Рояль",
      description: "Ігристе вино з мартіні",
      price: "210₴"
    }
  ]

  const crazyMenu = [
    {
      name: "🔥 Cherry Lips Special",
      description: "Фірмовий коктейль з секретним інгредієнтом",
      price: "350₴",
      highlight: true
    },
    {
      name: "💫 Зоряна Ніч",
      description: "Коктейль з шампанським та золотими блискітками",
      price: "420₴",
      highlight: true
    },
    {
      name: "🌋 Вогняний Вулкан",
      description: "Гарячий шот з піротехнічним шоу",
      price: "280₴",
      highlight: true
    }
  ]

  return (
    <section id="menu" className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-red-500 text-xl mb-4">МЕНЮ НАПОЇВ</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8">
              ПРЕМІАЛЬНІ НАПОЇ & КОКТЕЙЛІ
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Насолоджуйтесь нашою колекцією вишуканих напоїв та фірмових коктейлів,
              створених нашими майстрами-барменами для незабутнього вечора
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Regular Menu */}
            <div className="space-y-8">
              <h4 className="text-2xl font-serif mb-6">Класичне Меню</h4>
              <div className="space-y-6">
                {regularMenu.map((item, index) => (
                  <div key={index} className="flex justify-between items-start border-b border-gray-800 pb-4">
                    <div>
                      <h5 className="text-xl mb-2">{item.name}</h5>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                    <span className="text-amber-300 font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Crazy Menu */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-red-900 to-red-950 rounded-lg p-8 shadow-lg shadow-red-900/30">
                <h4 className="text-3xl font-serif mb-6 flex items-center">
                  <span className="text-red-400 font-bold">Crazy Menu</span>
                  <span className="ml-2 animate-pulse">🔥</span>
                </h4>
                <div className="space-y-6">
                  {crazyMenu.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-start border-b border-red-800/50 pb-4 hover:bg-red-800/20 transition-all duration-300 rounded-lg p-4 group"
                    >
                      <div>
                        <h5 className="text-2xl mb-2 text-red-300 group-hover:text-red-200 transition-colors">{item.name}</h5>
                        <p className="text-red-200/80 text-sm">{item.description}</p>
                      </div>
                      <span className=" text-amber-300 font-bold text-xl group-hover:scale-110 transition-transform">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              target='_blank'
              href=""
              className="inline-block px-8 py-3 border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black transition-colors rounded-full tracking-wider shadow-lg hover:shadow-amber-500/50"
            >
              ПОВНЕ МЕНЮ
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Menu 