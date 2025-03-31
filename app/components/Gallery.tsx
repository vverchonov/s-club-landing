'use client'

import Image from 'next/image'
import FadeIn from './FadeIn'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

const Gallery = () => {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const allImages = [
    '/gallery/1.jpg',
    '/gallery/2.jpg',
    '/gallery/3.jpg',
    '/gallery/4.jpg',
    '/gallery_new/5.jpg',
    '/gallery_new/6.jpg',
    '/gallery_new/7.jpg',
    '/gallery_new/16.HEIC',
    '/gallery_new/8.jpg',
    '/gallery_new/11.jpg',
    '/gallery_new/9.jpg',
    '/gallery_new/10.jpg',
    '/gallery_new/12.jpg',
    '/gallery_new/13.jpg',
    '/gallery_new/14.jpg',
    '/gallery_new/15.JPG',

  ]

  const images = isMobile ? allImages.slice(0, 4) : allImages

  return (
    <section id="gallery" className="relative bg-black text-white py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.2)_0%,transparent_70%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-[100%] bg-[#8B0000]/5 blur-[160px]"></div>
      </div>

      <FadeIn>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-red-500 text-xl mb-4 text-center uppercase">АТМОСФЕРА Cherry Lips showbar</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-16 text-center">
            ЕКСКЛЮЗИВНА АТМОСФЕРА <br />
            ЕЛЕГАНТНОСТІ & ЕРОТИКИ
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="aspect-[3/4] relative overflow-hidden group">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Reserve Table Button */}
          <div className="text-center mt-12">
            <Link 
              href="#contact" 
              className="inline-block px-12 py-4 text-xl font-medium bg-[#8B0000] hover:bg-[#660000] text-white transition-colors duration-300 rounded-full tracking-wider shadow-lg"
            >
              РЕЗЕРВУВАТИ СТОЛИК
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

export default Gallery 