'use client'

import Image from 'next/image'

const Gallery = () => {
  return (
    <section id="gallery" className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-red-500 text-xl mb-4 uppercase">АТМОСФЕРА Cherry Lips showbar</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-8">
            ЕКСКЛЮЗИВНА АТМОСФЕРА ДЛЯ<br />
            ЕЛЕГАНТНОСТІ & ЕРОТИКИ
          </h3>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Row 1 */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/bar-1.jpg"
              alt="Bar Area"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/stage-1.jpg"
              alt="Stage Area"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/bar-2.jpg"
              alt="Bar Interior"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Row 2 */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/bottles.jpg"
              alt="Premium Drinks"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/drinks.jpg"
              alt="Champagne Service"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/seating.jpg"
              alt="VIP Seating"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Row 3 */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/lights.jpg"
              alt="Ambient Lighting"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/interior.jpg"
              alt="Club Interior"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 group">
            <Image
              src="/gallery/bar-2.jpg"
              alt="Bar Interior"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery 