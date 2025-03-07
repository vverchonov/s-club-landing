'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  return (
    <section id="contact" className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-red-500 text-xl mb-4">ОРГАНІЗАЦІЯ ЗАХОДІВ</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8">
              ПРИВАТНІ ВЕЧІРКИ & КОРПОРАТИВИ
            </h3>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-300 mb-4">
                Ми з радістю організуємо для вас незабутній вечір у форматі закритої вечірки, корпоративу або іншого приватного заходу. 
                Наш простір ідеально підходить для проведення особливих подій у вишуканій атмосфері.
              </p>
              <p className="text-lg text-gray-300">
                Зв'яжіться з нами за телефоном, або заповніть форму зворотного зв'язку, і ми обговоримо всі деталі вашого майбутнього заходу.
                Наша команда допоможе створити ідеальний сценарій вечора саме для вас.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info - Left Side */}
            <div>
              <h2 className="text-red-500 text-xl mb-4">КОНТАКТНА ІНФОРМАЦІЯ</h2>
              <h3 className="text-4xl md:text-5xl font-serif mb-12">
                ЗАВЖДИ НА ЗВ'ЯЗКУ
              </h3>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Адреса</h4>
                    <p className="text-gray-300">вул. Хрещатик 22</p>
                    <p className="text-gray-300">01001 Київ</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Години роботи</h4>
                    <p className="text-gray-300">Пн-Чт: 20:00 - 04:00</p>
                    <p className="text-gray-300">Пт-Сб: 20:00 - 06:00</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Телефон</h4>
                    <p className="text-gray-300">+380 44 123 45 67</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Email</h4>
                    <p className="text-gray-300">info@sclub.kiev.ua</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="bg-red-900/20 p-8 rounded-lg">
              <h3 className="text-2xl font-serif mb-6">Напишіть нам</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Ім'я
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-red-900/50 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-red-900/50 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-red-900/50 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Повідомлення
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/50 border border-red-900/50 rounded-lg focus:outline-none focus:border-red-500 transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-colors font-medium"
                >
                  Надіслати
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Contact 