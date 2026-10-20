import FAQ from '../components/home/FAQ'
import SEO from '../components/SEO'
import { useTranslation } from 'react-i18next'

const FAQPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <SEO
        title={t('faq.seoTitle')}
        description={t('faq.seoDesc')}
        path="/faq"
      />
      <FAQ />
    </>
  )
}

export default FAQPage