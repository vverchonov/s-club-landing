'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div>
          <h3 className="text-red-500 text-xl mb-6">Cherry Lips showbar Ужгород</h3>
          <p className="mb-2">
            <Link href="https://www.google.com/maps/place/Verkhovyns'ka+St,+38,+Uzhhorod,+Zakarpats'ka+oblast,+Ukraine,+88000/@48.6454378,22.2722753,17z/data=!3m1!4b1!4m6!3m5!1s0x473918180c665683:0x7cb1ba0c90e95822!8m2!3d48.6454378!4d22.2748502!16s%2Fg%2F1vm_wnkz?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D" target="_blank" className="hover:text-red-500 transition-colors">
              вулиця Верховинська, 38, Ужгород, Закарпатська область
            </Link>
          </p>
          <p className="mb-4">
            <a href="tel:+38 (099) 011 1999" className="hover:text-red-500 transition-colors">
              +38 (099) 011 1999
            </a>
          </p>
          <p className="mb-6">
            <a href="mailto:cherrylips.showbar@gmail.com" className="hover:text-red-500 transition-colors">
              cherrylips.showbar@gmail.com
            </a>
          </p>
          <div className="flex">
            <Link
              href="https://www.google.com/maps/place/Verkhovyns'ka+St,+38,+Uzhhorod,+Zakarpats'ka+oblast,+Ukraine,+88000/@48.6454378,22.2722753,17z/data=!3m1!4b1!4m6!3m5!1s0x473918180c665683:0x7cb1ba0c90e95822!8m2!3d48.6454378!4d22.2748502!16s%2Fg%2F1vm_wnkz?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
              target="_blank"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium bg-[#8B0000] hover:bg-[#660000] text-white transition-colors duration-300 rounded-full tracking-wider shadow-lg"
            >
              ПРОКЛАСТИ МАРШРУТ
            </Link>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-red-500 text-xl mb-6">Години Роботи</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Відкриття незабаром</span>
            </div>
          </div>
        </div>

        {/* Our Services */}
        {/* <div>
          <h3 className="text-red-500 text-xl mb-6">Наші Послуги</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Приватні Танці
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Стриптиз Шоу
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Лаунж & Сепаре
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              VIP Кімната
            </li>
          </ul>
        </div> */}

        {/* Sitemap & Social */}
        <div>
          <h3 className="text-red-500 text-xl mb-6">Карта Сайту</h3>
          <ul className="space-y-2 mb-8">
            <li>
              <Link href="#home" className="hover:text-red-500 transition-colors">Головна</Link>
            </li>
            <li>
              <Link href="#club" className="hover:text-red-500 transition-colors">Клуб</Link>
            </li>
            <li>
              <Link href="#menu" className="hover:text-red-500 transition-colors">Послуги</Link>
            </li>
            <li>
              <Link href="/vacancies" className="hover:text-red-500 transition-colors">Вакансії</Link>
            </li>
            {/* <li>
              <Link href="#news" className="hover:text-red-500 transition-colors">Новини</Link>
            </li> */}
            <li>
              <Link href="/book" className="hover:text-red-500 transition-colors">Бронювання</Link>
            </li>
          </ul>

          <div className="flex space-x-4">
            <Link href="https://www.instagram.com/cherry.lips_show.bar_1" target="_blank" className="text-white hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
            <Link href="https://www.tiktok.com/@cherry.lips.showbar?_t=ZM-8uxKvvsVgvv&_r=1" target="_blank" className="text-white hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </Link>
            <Link href="https://t.me/Cherry_Lips_Club_1" target="_blank" className="text-white hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </Link>
            {/* <Link href="https://google.com" target="_blank" className="text-white hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            © 2024 Cherry Lips showbar Ужгород
          </div>
          <div className="flex space-x-4">
            <Link href="/imprint" className="hover:text-white transition-colors">
              Правова інформація
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Конфіденційність
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 