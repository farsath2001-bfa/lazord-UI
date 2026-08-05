import FAQ from '../components/home/FAQ'
import SEO from '../components/SEO'

const FAQPage = () => {
  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about buying, renting and investing in Dubai property with Lazord Real Estate."
        path="/faq"
      />
      <FAQ />
    </>
  )
}

export default FAQPage