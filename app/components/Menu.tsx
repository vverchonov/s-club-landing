'use client'

import Link from 'next/link'
import Image from 'next/image'
import FadeIn from './FadeIn'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import LocalBarIcon from '@mui/icons-material/LocalBar'

const Menu = () => {

  return (
    <section id="menu" className="relative bg-black text-white py-24">
      <FadeIn>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Food Section */}
            <a 
              href="/menu.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group"
            >
              <div className="text-center space-y-4">
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <RestaurantMenuIcon 
                    className="w-full h-full text-red-500 group-hover:text-red-400 transition-colors"
                    sx={{ fontSize: 120 }}
                  />
                </div>
                <h3 className="text-3xl font-serif tracking-wider group-hover:text-red-500 transition-colors">МЕНЮ</h3>
              </div>
            </a>

            {/* Logo Section */}
            <div className="flex justify-center items-center">
              <div className="relative w-52 h-52">
                <Image
                  src="/logo.png"
                  alt="Cherry Lips Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Bar Section */}
            <Link href="/menu/bar" className="group">
              <div className="text-center space-y-4">
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <LocalBarIcon 
                    className="w-full h-full text-red-500 group-hover:text-red-400 transition-colors"
                    sx={{ fontSize: 120 }}
                  />
                </div>
                <h3 className="text-3xl font-serif tracking-wider group-hover:text-red-500 transition-colors">БАР</h3>
              </div>
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

export default Menu 