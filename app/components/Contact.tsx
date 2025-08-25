'use client'

import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import FadeIn from './FadeIn'

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Повідомлення успішно надіслано', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        (e.target as HTMLFormElement).reset()
      } else {
        toast.error(data.error || 'Помилка при відправці повідомлення', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    } catch {
      toast.error('Помилка при відправці повідомлення', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="relative bg-black text-white py-24 overflow-hidden">
      <ToastContainer />
      {/* Red glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]" />
      </div>

      <FadeIn>
        <div className="relative max-w-6xl mx-auto px-4">
          <h2 className="text-red-500 text-xl mb-4 text-center uppercase">contact us</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-16 text-center">
            Звя&apos;жіться з нами
          </h3>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-serif mb-4">Контактна Інформація</h4>
                <p className="text-gray-400 mb-8">
                  Зв&apos;яжіться з нами для бронювання або якщо у вас є запитання. Наш менеджер передзвонить вам найближчим часом для підтвердження бронювання.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h5 className="text-xl mb-2">Адреса</h5>
                    <Link target='_blank' href="https://www.google.com/maps/place/Verkhovyns'ka+St,+38,+Uzhhorod,+Zakarpats'ka+oblast,+Ukraine,+88000/@48.6483487,22.2682014,13.67z/data=!4m6!3m5!1s0x473918180c665683:0x7cb1ba0c90e95822!8m2!3d48.6454378!4d22.2748502!16s%2Fg%2F1vm_wnkz?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D" className="text-gray-400 hover:text-red-500 transition-colors">вулиця Верховинська, 38, Ужгород, Закарпатська область</Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h5 className="text-xl mb-2">Години Роботи</h5>
                    <p className="text-gray-400">Відкриття незабаром</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h5 className="text-xl mb-2">Телефон</h5>
                    <Link href="tel:+380990111999" className="text-gray-400 hover:text-red-500 transition-colors">+380990111999</Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h5 className="text-xl mb-2">Email</h5>
                    <Link href="mailto:cherrylips.showbar@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors">cherrylips.showbar@gmail.com</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Ім&apos;я
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                    placeholder="Ваше ім'я"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white"
                    placeholder="+380"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Додаткова інформація
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-white resize-none"
                    placeholder="Ваше повідомлення"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-8 py-3 bg-[#8B0000] hover:bg-[#660000] text-white rounded-full text-lg font-medium tracking-wider shadow-lg transition-colors duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                  >
                    {isLoading ? 'Надсилання...' : 'НАДІСЛАТИ'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Group Discounts & Private Events
          // <div className="mt-24 grid md:grid-cols-2 gap-8">
          //   <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm shadow-xl">
          //     <div className="flex items-center space-x-4 mb-6">
          //       <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          //       </svg>
          //       <h4 className="text-2xl font-serif">Групові Знижки</h4>
          //     </div>
          //     <p className="text-gray-400 mb-4">
          //       Для компаній від 5 осіб ми пропонуємо спеціальні знижки на меню та напої. Зробіть ваш вечір ще приємнішим разом з друзями!
          //     </p>
          //     <ul className="text-gray-400 space-y-2">
          //       <li className="flex items-center">
          //         <span className="text-red-500 mr-2">•</span>
          //         Знижка 10% для груп від 5 осіб
          //       </li>
          //       <li className="flex items-center">
          //         <span className="text-red-500 mr-2">•</span>
          //         Спеціальні комбо-меню для компаній
          //       </li>
          //       <li className="flex items-center">
          //         <span className="text-red-500 mr-2">•</span>
          //         Безкоштовний welcome drink
          //       </li>
          //     </ul>
          //   </div>

          //   <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm shadow-xl">
          //     <div className="flex items-center space-x-4 mb-6">
          //       <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
          //       </svg>
          //       <h4 className="text-2xl font-serif">Приватні Події</h4>
          //     </div>
          //     <p className="text-gray-400 mb-4">
          //       Організуйте незабутню подію в Cherry Lips! Ми допоможемо створити особливу атмосферу для вашого свята.
          //     </p>
          //     <ul className="text-gray-400 space-y-2">
          //       <li className="flex items-center">
          //         <span className="text-red-500 mr-2">•</span>
          //         Повна оренда закладу для приватних подій
          //       </li>
          //       <li className="flex items-center">
          //         <span className="text-red-500 mr-2">•</span>
          //         Індивідуальне меню під ваш бюджет
          //       </li>
          //       <li className="flex items-center">
          //         <span className="text-red-500 mr-2">•</span>
          //         Професійне обслуговування та декор
          //       </li>
          //       <li className="flex items-center">
          //         <span className="text-red-500 mr-2">•</span>
          //         Спеціальні умови для корпоративів
          //       </li>
          //     </ul>
          //   </div>
          // </div> */}
        </div>
      </FadeIn>
    </section>
  )
} 