import Hero from '../components/home/Hero'
import FeaturedProperties from '../components/home/FeaturedProperties'
import WhyChooseUs from '../components/home/WhyChooseUS'
import FeaturedAreas from '../components/home/FeaturedAreas'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'
import CTABanner from '../components/home/CtaBanner'
import Footer from '../components/common/Footer'
import TrustBar from '../components/home/TrustBar'

const Home = () => {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProperties />
      <WhyChooseUs />
      <FeaturedAreas />
      <Services />
      <Testimonials />
      <CTABanner />
    </>
  )
}

export default Home