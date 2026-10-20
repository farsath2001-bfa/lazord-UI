import useScrollReveal from '../hooks/useScrollReveal'
import Hero from '../components/home/Hero'
import FeaturedProperties from '../components/home/FeaturedProperties'
import WhyChooseUs from '../components/home/WhyChooseUS'
import CTABanner from '../components/home/CtaBanner'
import ProcessSection from '../components/home/ProcessSection'
import WhyDubai from '../components/home/WhyDubai'
import FeaturedAreas from '../components/home/FeaturedAreas'
import ParallaxBanner from '../components/home/ParallaxBanner'
import MortgageTeaser from '../components/home/MortgageTeaser'
import SEO from '../components/SEO'

const Home = () => {
  const propertiesRef = useScrollReveal({ direction: 'up', delay: 0, duration: 700 })
  const processRef    = useScrollReveal({ direction: 'up', delay: 0, duration: 700 })
  const whyChooseRef  = useScrollReveal({ direction: 'up', delay: 0, duration: 700 })
  const ctaRef        = useScrollReveal({ direction: 'up', delay: 0, duration: 700 })

  return (
    <>
      <SEO
        title="Dubai Real Estate Agency"
        description="Lazord Real Estate — RERA & DED licensed agency in Dubai since 2007. Buy, rent and invest in off-plan and secondary market properties across the UAE."
        path="/"
      />

      <div data-cursor="hero">
        <Hero />
      </div>

      <div data-cursor="properties" ref={propertiesRef}>
        <FeaturedProperties />
      </div>

      <WhyDubai />

      <FeaturedAreas />

      <div data-cursor="process" ref={processRef}>
        <ProcessSection />
      </div>

      <ParallaxBanner />

      <MortgageTeaser />

      <div data-cursor="whychoose" ref={whyChooseRef}>
        <WhyChooseUs />
      </div>

      <div data-cursor="default" ref={ctaRef}>
        <CTABanner />
      </div>
    </>
  )
}

export default Home