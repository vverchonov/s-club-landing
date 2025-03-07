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
            <h2 className="text-red-500 text-xl mb-4">ЛАСКАВО ПРОСИМО ДО S CLUB</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8">
              НІЧНИЙ КЛУБ & СТРИПТИЗ КЛУБ В САМОМУ СЕРЦІ КИЄВА
            </h3>
            <div className="space-y-6 text-gray-300">
              <p>
                Відчуйте незабутні вечори, сповнені елегантності, чуттєвості та розваг найвищого класу. 
                <span className="text-white"> S Club</span>, один з перших кабаре в Києві, запрошує вас у світ
                <Link href="/shows" className="text-white hover:text-red-500 transition-colors"> розкішних шоу</Link>,
                <Link href="/girls" className="text-white hover:text-red-500 transition-colors"> чарівних дівчат</Link> та вишуканих напоїв.
              </p>
              <p>
                Насолоджуйтесь захоплюючими
                <Link href="/shows" className="text-white hover:text-red-500 transition-colors"> стриптиз шоу</Link>, спокусливими приватними танцями та екзотичними танцівницями
                з усього світу. Наш вибір
                <Link href="/drinks" className="text-white hover:text-red-500 transition-colors"> напоїв</Link> не залишить байдужим - від шампанського
                до коктейлів та міцних напоїв. З нами ви відчуєте ідеальний симбіоз розкоші та розваг.
              </p>
              <p>
                Ласкаво просимо до <span className="text-white">S Club</span>, де ночі стають незабутніми!
              </p>
            </div>
            <Link 
              href="/club" 
              className="inline-block px-8 py-3 mt-8 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors rounded-full tracking-wider"
            >
              ВІДКРИТИ КЛУБ
            </Link>
          </div>

          {/* Image */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-red-900/50 to-black/50 rounded-lg overflow-hidden">
            <Image
              src="/club-interior.jpg"
              alt="S Club Interior"
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
              alt="S Club Show"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-red-500 text-xl mb-4">ЕКСКЛЮЗИВНІ ШОУ & КАБАРЕ</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8">
              НЕЗАБУТНІ СТРИПТИЗ ШОУ & КАБАРЕ
            </h3>
            <div className="space-y-6 text-gray-300">
              <p>
                Ми пропонуємо нашим гостям незабутній досвід з нашими
                <Link href="/girls" className="text-white hover:text-red-500 transition-colors"> прекрасними дівчатами</Link> та
                першокласними напоями в вишуканій атмосфері. Занурьтесь в інший світ та насолоджуйтесь гарячими
                <Link href="/shows" className="text-white hover:text-red-500 transition-colors"> стриптиз шоу</Link> та спокусливими
                <Link href="/lap-dance" className="text-white hover:text-red-500 transition-colors"> приватними танцями</Link> від наших міжнародних артисток.
              </p>
              <p>
                Незабутні враження чекають на вас у <span className="text-white">S Club</span>, які ви будете пам'ятати довгий час.
                Відвідайте нас сьогодні та дозвольте собі спокуситися нашою унікальною атмосферою!
              </p>
            </div>
            <Link 
              href="/services" 
              className="inline-block px-8 py-3 mt-8 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors rounded-full tracking-wider"
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