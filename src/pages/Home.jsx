import useScrollReveal from '../hooks/useScrollReveal'
import Hero from '../components/home/Hero'
import FeaturedProperties from '../components/home/FeaturedProperties'
import WhyChooseUs from '../components/home/WhyChooseUS'
import FeaturedAreas from '../components/home/FeaturedAreas'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'
import CTABanner from '../components/home/CtaBanner'
import Newsletter from '../components/home/NewsLetter'

const Home = () => {
  const propertiesRef  = useScrollReveal({ direction: 'up', delay: 0,   duration: 700 })
  const whyChooseRef   = useScrollReveal({ direction: 'up', delay: 0,   duration: 700 })
  const areasRef       = useScrollReveal({ direction: 'up', delay: 0,   duration: 700 })
  const servicesRef    = useScrollReveal({ direction: 'up', delay: 0,   duration: 700 })
  const testimonialsRef = useScrollReveal({ direction: 'up', delay: 0,  duration: 700 })
  const newsletterRef  = useScrollReveal({ direction: 'up', delay: 0,   duration: 700 })
  const ctaRef         = useScrollReveal({ direction: 'up', delay: 0,   duration: 700 })

  return (
    <>
      {/* Hero — no reveal, shows immediately */}
      <div data-cursor="hero">
        <Hero />
      </div>

      <div data-cursor="properties" ref={propertiesRef}>
        <FeaturedProperties />
      </div>

      <div data-cursor="whychoose" ref={whyChooseRef}>
        <WhyChooseUs />
      </div>

      <div data-cursor="areas" ref={areasRef}>
        <FeaturedAreas />
      </div>

      <div data-cursor="services" ref={servicesRef}>
        <Services />
      </div>

      <div data-cursor="testimonials" ref={testimonialsRef}>
        <Testimonials />
      </div>

      <div data-cursor="contact" ref={newsletterRef}>
        <Newsletter />
      </div>

      <div data-cursor="default" ref={ctaRef}>
        <CTABanner />
      </div>
    </>
  )
}

export default Home