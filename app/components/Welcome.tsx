'use client'

import Link from 'next/link'
import Image from 'next/image'
import FadeIn from './FadeIn'

const Welcome = () => {
  return (
    <section id="club" className="bg-black text-white py-24">
      {/* First Row */}
      <FadeIn>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
          {/* Text Content */}
          <div>
            <h2 className="text-red-500 text-xl mb-4 uppercase">Cherry Lips showbar</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8 uppercase">
              НІЧНИЙ КЛУБ & СТРИПТИЗ КЛУБ В САМОМУ СЕРЦІ Ужгорода
            </h3>
            <div className="space-y-6 text-gray-300">
              <p>
              Cherry Lips — це більше, ніж клуб. Це вишуканий інтер&apos;єр, приватні зони для відпочинку, ексклюзивний бар та найкраще шоу в місті.
              </p>
              
            </div>
          
          </div>

          {/* Image */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-red-900/50 to-black/50 rounded-lg overflow-hidden">
            <Image
              src="/club-interior.jpg"
              alt="Cherry Lips showbar Interior"
              fill
              className="object-cover mix-blend-overlay"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </FadeIn>

      {/* Second Row */}
      <FadeIn>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-red-900/50 to-black/50 rounded-lg overflow-hidden">
            <Image
              src="/club-show.jpg"
              alt="Cherry Lips Show"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-red-500 text-xl mb-4 uppercase">Чому обирають нас?</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8">
              НЕЗАБУТНІ СТРИПТИЗ ШОУ & АТМОСФЕРА
            </h3>
            <div className="space-y-6 text-gray-300">
              <ul className="list-disc list-inside space-y-4">
                <li>Захопливі шоу – кожна ніч неповторна.</li>
                <li>Найкрасивіші дівчата – витонченість, харизма та справжня пристрасть.</li>
                <li>Шикарний інтер&apos;єр – затишок і розкіш у кожній деталі.</li>
                <li>Картка лояльності – спеціальні привілеї для наших гостей.</li>
              </ul>
            </div>
            <Link 
              href="#menu" 
              className="inline-block px-8 py-3 mt-8 border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black transition-colors rounded-full tracking-wider shadow-lg hover:shadow-amber-500/50"
            >
              ДІЗНАТИСЬ ПРО ПОСЛУГИ
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

export default Welcome 