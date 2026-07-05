import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LegalPage = () => {
  const [activeTab, setActiveTab] = useState('privacy')

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

  const sectionStyle = {
    marginBottom: '36px'
  }

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
    paddingLeft: '20px',
    marginBottom: '12px'
  }

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '50px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)' }} />
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ Legal</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: '700', marginBottom: '8px' }}>
            Privacy Policy & Terms
          </h1>
          <p style={{ color: '#8aafd4', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '540px' }}>
            Last updated: July 2026 · Lazord Real Estate LLC, Dubai, UAE
          </p>
        </Container>
      </div>

      <Container style={{ paddingTop: '48px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '40px', backgroundColor: '#0d1f4e', borderRadius: '12px', padding: '6px', width: 'fit-content', border: '1px solid rgba(45,95,196,0.25)' }}>
          <button style={tabStyle('privacy')} onClick={() => setActiveTab('privacy')}>🔒 Privacy Policy</button>
          <button style={tabStyle('terms')}   onClick={() => setActiveTab('terms')}>📋 Terms of Use</button>
        </div>

        <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '16px', padding: 'clamp(24px, 4vw, 48px)', maxWidth: '860px' }}>

          {/* ── PRIVACY POLICY ── */}
          {activeTab === 'privacy' && (
            <div>
              <h2 style={{ color: '#4a90d9', fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>Privacy Policy</h2>
              <p style={textStyle}>
                Lazord Real Estate LLC ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
              </p>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>1. Information We Collect</h3>
                <p style={textStyle}>We collect the following types of information:</p>
                <ul style={listStyle}>
                  <li><strong style={{ color: '#ffffff' }}>Personal Information:</strong> Name, email address, phone number when you submit an enquiry or contact form.</li>
                  <li><strong style={{ color: '#ffffff' }}>Property Preferences:</strong> Search queries, property types, budget ranges and location preferences.</li>
                  <li><strong style={{ color: '#ffffff' }}>Usage Data:</strong> Pages visited, time spent on site, browser type and device information.</li>
                  <li><strong style={{ color: '#ffffff' }}>Communication Data:</strong> Messages sent through our enquiry forms or WhatsApp.</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>2. How We Use Your Information</h3>
                <p style={textStyle}>We use your information to:</p>
                <ul style={listStyle}>
                  <li>Respond to your property enquiries and connect you with our agents</li>
                  <li>Send property listings and market updates (only if you have opted in)</li>
                  <li>Improve our website and services based on usage patterns</li>
                  <li>Comply with legal obligations under UAE law and RERA regulations</li>
                  <li>Prevent fraud and ensure the security of our platform</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>3. Data Sharing</h3>
                <p style={textStyle}>
                  We do not sell, trade, or rent your personal information to third parties. We may share your data with:
                </p>
                <ul style={listStyle}>
                  <li>Our licensed real estate agents to facilitate property transactions</li>
                  <li>Service providers who assist in operating our website (hosting, analytics)</li>
                  <li>Government or regulatory authorities when required by UAE law or RERA</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>4. Data Security</h3>
                <p style={textStyle}>
                  We implement industry-standard security measures to protect your personal data including encrypted connections (HTTPS), secure servers, and restricted access controls. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>5. Cookies</h3>
                <p style={textStyle}>
                  Our website uses essential cookies to ensure proper functionality. We do not use tracking cookies or sell your browsing data to advertisers. You can disable cookies in your browser settings, though this may affect some site features.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>6. Your Rights</h3>
                <p style={textStyle}>You have the right to:</p>
                <ul style={listStyle}>
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your data (subject to legal obligations)</li>
                  <li>Opt out of marketing communications at any time</li>
                </ul>
                <p style={textStyle}>
                  To exercise these rights, contact us at <a href="mailto:info@lazordrealestate.ae" style={{ color: '#4a90d9' }}>info@lazordrealestate.ae</a>
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>7. Third Party Links</h3>
                <p style={textStyle}>
                  Our website may contain links to third-party sites (Google Maps, WhatsApp, social media). We are not responsible for the privacy practices of these external platforms.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>8. Contact Us</h3>
                <p style={textStyle}>
                  For any privacy-related questions or concerns, please contact:<br />
                  <strong style={{ color: '#ffffff' }}>Lazord Real Estate LLC</strong><br />
                  Office 803, Al Salemiyah Tower, Rigga Al Butteen, Dubai, UAE<br />
                  📞 +971 42 999 088<br />
                  ✉️ <a href="mailto:info@lazordrealestate.ae" style={{ color: '#4a90d9' }}>info@lazordrealestate.ae</a>
                </p>
              </div>
            </div>
          )}

          {/* ── TERMS OF USE ── */}
          {activeTab === 'terms' && (
            <div>
              <h2 style={{ color: '#4a90d9', fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>Terms of Use</h2>
              <p style={textStyle}>
                By accessing and using the Lazord Real Estate website, you agree to be bound by these Terms of Use. Please read them carefully before using our services.
              </p>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>1. About Lazord Real Estate</h3>
                <p style={textStyle}>
                  Lazord Real Estate LLC is a fully licensed real estate brokerage registered with RERA (Real Estate Regulatory Agency) and the Dubai Department of Economic Development (DED). We operate in full compliance with UAE real estate laws and regulations.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>2. Use of Website</h3>
                <p style={textStyle}>You agree to use this website only for lawful purposes. You must not:</p>
                <ul style={listStyle}>
                  <li>Use the site in any way that violates UAE law or regulations</li>
                  <li>Submit false or misleading information in enquiry forms</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Copy, reproduce or distribute our property listings without permission</li>
                  <li>Use automated tools to scrape or harvest data from our website</li>
                </ul>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>3. Property Listings</h3>
                <p style={textStyle}>
                  All property listings on this website are for informational purposes only. While we strive to ensure accuracy, Lazord Real Estate does not guarantee the completeness or accuracy of listing information including prices, availability, and specifications. Property details are subject to change without notice.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>4. No Investment Advice</h3>
                <p style={textStyle}>
                  Information provided on this website, including ROI estimates and market insights, is for general informational purposes only and does not constitute financial or investment advice. You should seek independent professional advice before making any property investment decisions.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>5. Intellectual Property</h3>
                <p style={textStyle}>
                  All content on this website including text, images, logos, and design elements are the property of Lazord Real Estate LLC or used with permission. You may not reproduce, distribute or create derivative works without our express written consent.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>6. Limitation of Liability</h3>
                <p style={textStyle}>
                  Lazord Real Estate LLC shall not be liable for any direct, indirect, incidental or consequential damages arising from your use of this website or reliance on any information contained herein. We do not guarantee uninterrupted access to the website.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>7. RERA Compliance</h3>
                <p style={textStyle}>
                  All real estate transactions facilitated through Lazord Real Estate are conducted in full compliance with RERA regulations and UAE Federal Law No. 26 of 2007 regulating real estate brokers. Our RERA license number is available upon request.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>8. Governing Law</h3>
                <p style={textStyle}>
                  These Terms of Use are governed by the laws of the United Arab Emirates. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>9. Changes to Terms</h3>
                <p style={textStyle}>
                  We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the revised terms. The date of the last update is shown at the top of this page.
                </p>
              </div>

              <div style={sectionStyle}>
                <h3 style={headingStyle}>10. Contact</h3>
                <p style={textStyle}>
                  For any questions regarding these terms:<br />
                  <strong style={{ color: '#ffffff' }}>Lazord Real Estate LLC</strong><br />
                  Office 803, Al Salemiyah Tower, Rigga Al Butteen, Dubai, UAE<br />
                  📞 +971 42 999 088<br />
                  ✉️ <a href="mailto:info@lazordrealestate.ae" style={{ color: '#4a90d9' }}>info@lazordrealestate.ae</a>
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Back to Home */}
        <div style={{ marginTop: '32px', maxWidth: '860px' }}>
          <Link to="/" style={{ color: '#4a90d9', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
            ← Back to Home
          </Link>
          <span style={{ color: '#4a4a6a', margin: '0 12px' }}>|</span>
          <Link to="/contact" style={{ color: '#4a90d9', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
            Contact Us →
          </Link>
        </div>

      </Container>
    </div>
  )
}

export default LegalPage