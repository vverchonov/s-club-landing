'use client'

import Link from 'next/link'
import Image from 'next/image'
import FadeIn from './FadeIn'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Welcome = () => {
  const firstImageRef = useRef(null)
  const secondImageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: firstImageRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <section id="club" className="relative bg-black text-white py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.15)_0%,transparent_70%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8B0000]/20 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* First Row */}
        <FadeIn>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
            {/* Text Content */}
            <div>
              <h2 className="text-red-500 text-xl mb-4 uppercase md:text-left text-center">Cherry Lips showbar</h2>
              <h3 className="text-4xl md:text-5xl font-serif mb-8 uppercase md:text-left text-center">
                В САМОМУ СЕРЦІ Ужгорода
              </h3>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  Cherry Lips - це місце, де панує особлива, збудлива і загадкова атмосфера. У повітрі відчувається суміш адреналіну, азарту і передчуття. Гучна музика з глибокими басами, м&apos;яка напівтемрява, підсвічена неоновими вогнями, і запах дорогого алкоголю створюють обстановку, що розслабляє і збуджує одночасно.
                </p>
              </div>
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block px-8 py-3 mt-8 text-lg font-medium bg-[#8B0000] hover:bg-[#660000] text-white transition-colors duration-300 rounded-full tracking-wider shadow-lg"
                >
                  ЗАРЕЗЕРВУВАТИ
                </Link>
              </div>
            </div>

            {/* Image */}
            <motion.div
              ref={firstImageRef}
              style={{ y: y1 }}
              className="relative aspect-[4/4] bg-gradient-to-br from-red-900/50 to-black/50 rounded-lg overflow-hidden"
            >
              <Image
                src="/main.jpg"
                alt="Cherry Lips showbar Interior"
                fill
                className="object-cover mix-blend-overlay"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </motion.div>
          </div>
        </FadeIn>

        {/* Second Row */}
        <FadeIn>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              ref={secondImageRef}
              style={{ y: y2 }}
              className="relative aspect-[3/4] bg-gradient-to-br from-red-900/50 to-black/50 rounded-lg overflow-hidden"
            >
              <Image
                src="/main2.jpg"
                alt="Cherry Lips Show"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </motion.div>

            {/* Text Content */}
            <div>
              {/* <h2 className="text-red-500 text-xl mb-4 uppercase"></h2> */}
              <h3 className="text-4xl md:text-5xl font-serif mb-8 uppercase">
                Чому обирають нас?
              </h3>
              <div className="space-y-6 text-gray-300">
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Захопливі шоу - це поєднання пластики, пристрасті і мистецтво спокушання. Граціозні рухи, ефектні трюки на пілоні - все це заворожує і приковує погляд.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Приватні зони для відпочинку - незабутні емоції від розслаблення і насолоди до збудження.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Ексклюзивний бар - це завжди більше, ніж просто напої. Це емоції, люди, історії та настрій ночі.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Димні кальяни - це особливий настрій розслаблення, легка ейфорія, неспішні бесіди. Можна забути про час, насолоджуючись димними клубами і неповторним шоу.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Запальне караоке - це місце, де зливаються музика, емоції та енергія. У репертуарі сотні пісень: від класики до сучасних хітів.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-red-500 mr-4 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Танцівниці - це поєднання краси, витонченості, грації та артистизму. З витонченими лініями тіла, плавними рухами наповнюють атмосферу клубу енергією спокушання.</span>
                  </li>
                </ul>

              </div>
              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-block px-8 py-3 mt-8 text-lg font-medium bg-[#8B0000] hover:bg-[#660000] text-white transition-colors duration-300 rounded-full tracking-wider shadow-lg"
                >
                  ЗАРЕЗЕРВУВАТИ
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Welcome 