import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'
import PropertyCard from './PropertyCard'

// Shared mobile card slider used by both Properties.jsx and FeaturedProperties.jsx.
// Lazy-loaded via React.lazy() so Swiper's JS only loads once this actually renders.
const PropertyCardSlider = ({ properties, animated = false }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={16}
      slidesPerView={1.2}
      centeredSlides={false}
      pagination={{ clickable: true, dynamicBullets: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      breakpoints={{
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2.1 },
      }}
      style={{ paddingBottom: '40px' }}
    >
      {properties.map((property, i) => (
        <SwiperSlide key={property._id}>
          {animated ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ) : (
            <PropertyCard property={property} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default PropertyCardSlider