import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useLocalize } from '../utils/useLocalize'
import { legalContent } from '../data/legalContent'

const EMAIL = 'info@lazordrealestate.ae'

const LegalPage = () => {
  const { isAr } = useLocalize()
  const [activeTab, setActiveTab] = useState('privacy')
  const c = legalContent[isAr ? 'ar' : 'en']
  const doc = c[activeTab]

  const tabStyle = (key) => ({
    padding: '10px 28px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    backgroundColor: activeTab === key ? '#2d5fc4' : 'transparent',
    color: activeTab === key ? '#ffffff' : '#8aafd4',
  })

  const sectionStyle = { marginBottom: '36px' }

  const headingStyle = {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(45,95,196,0.2)'
  }

  const textStyle = {
    color: '#8aafd4',
    fontSize: '0.92rem',
    lineHeight: '1.9',
    marginBottom: '12px'
  }

  const listStyle = {
    color: '#8aafd4',
    fontSize: '0.92rem',
    lineHeight: '1.9',
    paddingInlineStart: '20px',
    marginBottom: '12px'
  }

  const mail = <a href={`mailto:${EMAIL}`} style={{ color: '#4a90d9' }}>{EMAIL}</a>

  return (
    <>
      <SEO
        title={c.ui.seoTitle}
        description={c.ui.seoDesc}
        path="/legal"
        noindex
      />
      <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '50px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', insetInlineEnd: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)' }} />
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>{c.ui.badge}</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: '700', marginBottom: '8px' }}>
            {c.ui.title}
          </h1>
          <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '540px' }}>
            {c.ui.updated}
          </p>
        </Container>
      </div>

      <Container style={{ paddingTop: '48px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '40px', backgroundColor: '#0d1f4e', borderRadius: '12px', padding: '6px', width: 'fit-content', border: '1px solid rgba(45,95,196,0.25)' }}>
          <button style={tabStyle('privacy')} onClick={() => setActiveTab('privacy')}>{c.ui.tabPrivacy}</button>
          <button style={tabStyle('terms')}   onClick={() => setActiveTab('terms')}>{c.ui.tabTerms}</button>
        </div>

        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: 'clamp(24px, 4vw, 48px)', maxWidth: '860px' }}>
          <div>
            <h2 style={{ color: '#4a90d9', fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>{doc.title}</h2>
            <p style={textStyle}>{doc.intro}</p>

            {doc.sections.map((sec) => (
              <div key={sec.h} style={sectionStyle}>
                <h3 style={headingStyle}>{sec.h}</h3>
                <p style={textStyle}>
                  {sec.p}
                  {sec.contact && (
                    <>
                      <br />
                      <strong style={{ color: '#ffffff' }}>{c.ui.company}</strong><br />
                      {c.ui.address}<br />
                      📞 <span dir="ltr">+971 42 999 088</span><br />
                      ✉️ {mail}
                    </>
                  )}
                </p>
                {sec.list && (
                  <ul style={listStyle}>
                    {sec.list.map((li) => <li key={li}>{li}</li>)}
                  </ul>
                )}
                {sec.listBold && (
                  <ul style={listStyle}>
                    {sec.listBold.map(([b, rest]) => (
                      <li key={b}><strong style={{ color: '#ffffff' }}>{b}</strong>{rest}</li>
                    ))}
                  </ul>
                )}
                {sec.emailLine && <p style={textStyle}>{sec.emailLine}{mail}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ marginTop: '32px', maxWidth: '860px' }}>
          <Link to="/" style={{ color: '#4a90d9', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
            {c.ui.back}
          </Link>
          <span style={{ color: '#4a4a6a', margin: '0 12px' }}>|</span>
          <Link to="/contact" style={{ color: '#4a90d9', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
            {c.ui.contactLink}
          </Link>
        </div>

      </Container>
      </div>
    </>
  )
}

export default LegalPage
