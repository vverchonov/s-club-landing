import Hero from './components/Hero'
import Welcome from './components/Welcome'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import FadeIn from './components/FadeIn'

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
        <Gallery />
      </FadeIn>
      <FadeIn>
        <Testimonials />
      </FadeIn>
      <Contact />
    </main>
  )
}
