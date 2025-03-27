import Hero from './components/Hero'
import Welcome from './components/Welcome'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'

import Contact from './components/Contact'
import FadeIn from './components/FadeIn'
// import News from './components/News'

export default function Home() {
  return (
    <main>
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn>
        <Welcome />
      </FadeIn>
      <FadeIn>
        <Menu />
      </FadeIn>
      <FadeIn>
        <Gallery />
      </FadeIn>
      <FadeIn>
        <Testimonials />
      </FadeIn>
      {/* <FadeIn>
        <News />
      </FadeIn> */}
      <Contact />
    </main>
  )
}
