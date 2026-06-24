import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/image/lazordlogo.png'

const Footer = () => {
  const { t } = useTranslation()

  const quickLinks = [
    { label: t('footer.links.home'),       path: '/' },
    { label: t('footer.links.properties'), path: '/properties' },
    { label: t('footer.links.about'),      path: '/about' },
    { label: t('footer.links.contact'),    path: '/contact' },
  ]

  return (
    <footer style={{ backgroundColor: '#0a1630', borderTop: '2px solid #2d5fc4', color: '#ffffff' }}>
      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <img src={logo} alt="Lazord Real Estate" style={{ height: '70px', marginBottom: '15px' }} />
            <p style={{ color: '#aab4cc', fontSize: '0.9rem' }}>{t('footer.tagline')}</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" style={{ color: '#2d5fc4', fontSize: '1.3rem' }}>📘</a>
              <a href="#" style={{ color: '#2d5fc4', fontSize: '1.3rem' }}>📸</a>
              <a href="#" style={{ color: '#2d5fc4', fontSize: '1.3rem' }}>💼</a>
            </div>
          </Col>

          <Col md={4}>
            <h6 style={{ color: '#2d5fc4', marginBottom: '15px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {t('footer.quickLinks')}
            </h6>
            <ul className="list-unstyled">
              {quickLinks.map((item) => (
                <li key={item.path} className="mb-2">
                  <Link to={item.path} style={{ color: '#aab4cc', textDecoration: 'none', fontSize: '0.9rem' }}>
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={4}>
            <h6 style={{ color: '#2d5fc4', marginBottom: '15px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {t('footer.contactUs')}
            </h6>
            <ul className="list-unstyled" style={{ color: '#aab4cc', fontSize: '0.9rem' }}>
              <li className="mb-2">📍 Rigga Al Butteen, Dubai, UAE</li>
              <li className="mb-2">📞 +971 42 981 077</li>
              <li className="mb-2">✉️ info@lazordrealestate.com</li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: '#1a3a7c', marginTop: '30px' }} />
        <p className="text-center mb-0" style={{ color: '#555f7a', fontSize: '0.85rem' }}>
          {t('footer.rights')}
        </p>
      </Container>
    </footer>
  )
}

export default Footer