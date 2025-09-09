'use client'

import Image from 'next/image'
import FadeIn from './FadeIn'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { useTranslation } from '../../lib/context/TranslationContext'

const Menu = () => {
  const { t, locale } = useTranslation()

  // Generate menu URLs based on current language
  const menuUrl = locale === 'en' ? '/menu-eng.pdf' : '/menu.pdf'
  const crazyMenuUrl = locale === 'en' ? '/crazy-eng.pdf' : '/crazy.pdf'

  return (
    <section id="menu" className="relative bg-black text-white py-24">
      <FadeIn>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Food Section */}
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="text-center space-y-4">
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <RestaurantMenuIcon
                    className="w-full h-full transition-all duration-300"
                    sx={{
                      fontSize: 120,
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)',
                      '&:hover': {
                        filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(75%) contrast(97%)'
                      }
                    }}
                  />
                </div>
                <h3
                  className="text-3xl font-serif tracking-wider group-hover:text-red-500 transition-colors animate-pulse-glow"
                  style={{
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)',
                    animation: 'pulseGlow 2s ease-in-out infinite alternate'
                  }}
                >
                  {t.menu.title}
                </h3>
              </div>
            </a>

            {/* Logo Section */}
            <div className="flex justify-center items-center">
              <div className="relative w-52 h-52">
                <Image
                  src="/logo.png"
                  alt={t.menu.logoAlt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Bar Section */}
            <a
              href={crazyMenuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="text-center space-y-4">
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <Image
                    src="/sexy.svg"
                    alt={t.menu.menuIconAlt}
                    width={10}
                    height={10}
                    className="w-full h-full filter brightness-0 saturate-100 group-hover:brightness-75 transition-all duration-300"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)',
                    }}
                  />
                </div>
                <h3
                  className="text-3xl font-serif tracking-wider group-hover:text-red-500 transition-colors animate-pulse-glow"
                  style={{
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)',
                    animation: 'pulseGlow 2s ease-in-out infinite alternate'
                  }}
                >
                  {t.menu.crazyMenu}
                </h3>
              </div>
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

export default Menu 