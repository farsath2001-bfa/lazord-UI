import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Lazord Real Estate'
const SITE_URL = 'https://lazord-ui.vercel.app' // swap to real domain once connected
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg` // 1200x630 social share image, add to /public

const SEO = ({
  title,
  description,
  path = '',       // e.g. '/properties'
  image = DEFAULT_IMAGE,
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Dubai Real Estate`
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph — controls WhatsApp / Facebook / LinkedIn share cards */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter/X card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO