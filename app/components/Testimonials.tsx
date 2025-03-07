'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    text: "Неймовірна атмосфера та чарівні дівчата! Провів незабутній вечір у приємній компанії.",
    author: "Богдан З."
  },
  {
    text: "Найкраща атмосфера в місті! Професійний персонал та чудовий сервіс. Рекомендую всім.",
    author: "Михайло К."
  },
  {
    text: "Вишуканий відпочинок та преміальні напої. Ідеальне місце для особливого вечора.",
    author: "Олександр М."
  },
  {
    text: "Неперевершений відпочинок та розкішна атмосфера. Обов'язково повернусь знову!",
    author: "Олена В."
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false) // Start fade out
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setIsVisible(true) // Start fade in
      }, 500) // Wait for fade out to complete
      
    }, 5000) // Change every 5 seconds

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section id="testimonials" className="bg-black text-white py-24 w-full">
      <div className="max-w-[2500px] mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-[2000px] mx-auto">
          {/* Left side - Dark image */}
          <div className="relative h-[400px] md:h-[500px] xl:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/gallery/bar-interior-dark.jpg"
              alt="Інтер'єр бару"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/google-logo.png"
                  alt="Google"
                  width={24}
                  height={24}
                />
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif mb-2">
                ВІДГУКИ НАШИХ<br />ГОСТЕЙ
              </h2>
            </div>
          </div>

          {/* Right side - Testimonial */}
          <div className="flex flex-col items-start justify-center h-full bg-red-900 p-12 rounded-lg min-h-[400px] md:min-h-[500px] xl:min-h-[600px]">
            <div 
              className={`transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-6xl md:text-7xl xl:text-8xl font-serif mb-8">{"&apos;&apos;"}</div>
              <p className="text-2xl md:text-3xl xl:text-4xl font-serif mb-8">
                {testimonials[currentIndex].text}
              </p>
              <p className="text-xl md:text-2xl xl:text-3xl text-red-200">
                {testimonials[currentIndex].author}
              </p>
            </div>
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${
                    currentIndex === index ? 'bg-white' : 'bg-white/30'
                  }`}
                  onClick={() => {
                    setIsVisible(false)
                    setTimeout(() => {
                      setCurrentIndex(index)
                      setIsVisible(true)
                    }, 500)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials 