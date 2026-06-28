import Hero from '../components/home/Hero'
import FeaturedProperties from '../components/home/FeaturedProperties'
import WhyChooseUs from '../components/home/WhyChooseUS'
import FeaturedAreas from '../components/home/FeaturedAreas'
import Services from '../components/home/Services'
import Testimonials from '../components/home/Testimonials'
import CTABanner from '../components/home/CtaBanner'
import TrustBar from '../components/home/TrustBar'
import FAQ from '../components/home/FAQ'
import Newsletter from '../components/home/NewsLetter'

const Home = () => {
  return (
    <>
      <div data-cursor="hero"><Hero /></div>
      <div data-cursor="properties"><TrustBar /></div>
      <div data-cursor="properties"><FeaturedProperties /></div>
      <div data-cursor="whychoose"><WhyChooseUs /></div>
      <div data-cursor="areas"><FeaturedAreas /></div>
      <div data-cursor="services"><Services /></div>
      <div data-cursor="testimonials"><Testimonials /></div>
      <div data-cursor="contact"><FAQ /></div>
      <div data-cursor="contact"><Newsletter /></div>
      <div data-cursor="default"><CTABanner /></div>
    </>
  )
}

export default Home