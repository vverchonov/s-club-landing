'use client'

import Link from 'next/link'

const Hero = () => {
  return (
    <div id="home" className="relative h-[calc(100vh-7rem)] bg-gradient-to-br from-black via-red-900 to-black flex items-center justify-center text-center px-4">
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto -mt-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 tracking-wider">
        Cherry Lips
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 font-light leading-relaxed">
          Ексклюзивний Нічний клуб, Стриптиз клуб та Кабаре в Ужгороді для<br className="hidden md:block" />
          незабутніх вечорів з нашими дівчатами
        </p>
        <Link 
          href="/club" 
          className="inline-block px-8 py-3 text-lg font-medium text-white border-2 border-yellow-500 hover:bg-yellow-500 transition-colors duration-300 rounded-full tracking-wider"
        >
          ДІЗНАТИСЬ БІЛЬШЕ
        </Link>
      </div>

      {/* Contact Info Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white py-4 md:py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex flex-col items-center p-2">
              <svg className="w-5 h-5 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-red-500 font-medium mb-1 text-xs md:text-sm">АДРЕСА</h3>
              <p className="text-xs md:text-sm">вулиця Верховинська, 38</p>
              <p className="text-xs md:text-sm">Ужгород, Закарпатська область</p>
            </div>
            
            <div className="flex flex-col items-center p-2">
              <svg className="w-5 h-5 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-red-500 font-medium mb-1 text-xs md:text-sm">ГОДИНИ РОБОТИ</h3>
              <p className="text-xs md:text-sm">Відкриття незабаром</p>
            </div>
            
            <div className="flex flex-col items-center p-2">
              <svg className="w-5 h-5 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-red-500 font-medium mb-1 text-xs md:text-sm">ТЕЛЕФОН</h3>
              <p className="text-xs md:text-sm">+380990111999</p>
            </div>
            
            <div className="flex flex-col items-center p-2">
              <svg className="w-5 h-5 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-red-500 font-medium mb-1 text-xs md:text-sm">ПОШТА</h3>
              <p className="text-xs md:text-sm">cherrylips.club1@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero 