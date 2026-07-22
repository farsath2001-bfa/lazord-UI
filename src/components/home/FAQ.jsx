import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const faqs = [
  {
    category: 'Buying Property',
    icon: '🏠',
    color: '#2d5fc4',
    questions: [
      {
        q: 'Can foreigners buy property in Dubai?',
        a: 'Yes! Dubai allows foreigners to purchase freehold properties in designated areas such as Downtown Dubai, Dubai Marina, Palm Jumeirah, Business Bay, and many more. There are no restrictions on nationality for buying in these zones.'
      },
      {
        q: 'What are the costs involved in buying a property in Dubai?',
        a: 'Besides the property price, buyers typically pay: 4% Dubai Land Department (DLD) transfer fee, 2% real estate agent commission, AED 4,000–5,000 in admin fees, mortgage registration fee (if applicable), and property registration trustee fees.'
      },
      {
        q: 'Do I need to be a UAE resident to buy property?',
        a: 'No. Non-residents can purchase property in Dubai\'s freehold zones without needing a UAE residency visa. However, owning property worth AED 750,000+ may make you eligible for a residence visa.'
      },
      {
        q: 'Can I get a mortgage as a foreigner in Dubai?',
        a: 'Yes, most UAE banks offer mortgages to non-residents, though terms may differ. Typically, non-residents can finance up to 50% of the property value, while UAE residents can finance up to 80%. Lazord can connect you with trusted mortgage advisors.'
      },
    ]
  },
  {
    category: 'Renting Property',
    icon: '🔑',
    color: '#27ae60',
    questions: [
      {
        q: 'How does renting work in Dubai?',
        a: 'Rental agreements in Dubai are typically 1-year contracts registered with Ejari (Dubai\'s official rental registration system). Rent is usually paid via post-dated cheques (1–4 cheques per year). Our agents handle the entire process for you.'
      },
      {
        q: 'What is Ejari and is it mandatory?',
        a: 'Ejari is Dubai\'s online rental registration system managed by RERA. It is mandatory for all rental contracts. It protects both tenant and landlord rights and is required for DEWA connection and visa applications.'
      },
      {
        q: 'What additional costs should I expect when renting?',
        a: 'Besides rent, expect: 5% agency commission, AED 220 Ejari registration, security deposit (usually 5% of annual rent for unfurnished, 10% for furnished), DEWA connection fees, and chiller fees if applicable.'
      },
    ]
  },
  {
    category: 'Off Plan Properties',
    icon: '🏗️',
    color: '#e67e22',
    questions: [
      {
        q: 'What is an off-plan property?',
        a: 'Off-plan properties are developments that are under construction or not yet built. Buyers purchase directly from the developer at pre-launch or launch prices, often with flexible payment plans (e.g., 30/70 or 60/40 structures).'
      },
      {
        q: 'Is buying off-plan risky in Dubai?',
        a: 'Dubai has strong regulations protecting off-plan buyers. RERA requires developers to hold buyer funds in escrow accounts and only release them as construction milestones are reached. Always verify the project is RERA-registered before purchasing.'
      },
      {
        q: 'What payment plans are available for off-plan?',
        a: 'Common payment plans include: 10% down payment + 90% on completion, 30/70 (30% during construction, 70% on handover), 50/50, and post-handover payment plans. Some developers offer 1% monthly payment structures.'
      },
    ]
  },
  {
    category: 'Investment & ROI',
    icon: '📈',
    color: '#8e44ad',
    questions: [
      {
        q: 'What is the average rental yield in Dubai?',
        a: 'Dubai offers some of the world\'s best rental yields, averaging 6–9% gross annually depending on location. Areas like Dubai Silicon Oasis, Jumeirah Village Circle, and Discovery Gardens typically yield 7–9%, while premium areas like Downtown and Marina yield 5–7%.'
      },
      {
        q: 'Is there property tax in Dubai?',
        a: 'Dubai has no annual property tax, no capital gains tax, and no inheritance tax. This makes it extremely attractive for investors. The only taxes are the one-time DLD transfer fee (4%) and annual service charges.'
      },
      {
        q: 'Can I get a UAE Residency Visa by investing in property?',
        a: 'Yes. Dubai offers a 2-year renewable residency visa for property investments of AED 750,000+, and a 10-year Golden Visa for investments of AED 2 million or more in real estate.'
      },
    ]
  },
  {
    category: 'Working with Lazord',
    icon: '🤝',
    color: '#4a90d9',
    questions: [
      {
        q: 'Is Lazord Real Estate RERA licensed?',
        a: 'Yes. Lazord Real Estate LLC is fully licensed by RERA (Real Estate Regulatory Agency) and registered with the Dubai Department of Economic Development (DED). All our agents are RERA certified.'
      },
      {
        q: 'How much does it cost to use Lazord\'s services?',
        a: 'For buyers: our commission is 2% of the property value (standard Dubai market rate), paid upon successful purchase. For tenants: 5% of annual rent. For sellers: we charge 2% commission upon successful sale. Initial consultation and property search is completely free.'
      },
      {
        q: 'Can Lazord help with property management after purchase?',
        a: 'Yes. We provide post-sale support including connecting you with property management companies, assisting with tenant sourcing, and advising on maintenance and service charges. We aim to be your long-term real estate partner.'
      },
    ]
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const toggle = (key) => setOpenIndex(openIndex === key ? null : key)

  const categories = ['All', ...faqs.map(f => f.category)]
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory)

  return (
    <div style={{ backgroundColor: '#060f26', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0d1f4e', borderBottom: '1px solid rgba(45,95,196,0.3)', padding: '48px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#2d5fc4', opacity: 0.06, filter: 'blur(100px)' }} />
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ FAQ</span>
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '6px' }}>Frequently Asked</h1>
          <h1 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '16px' }}>Questions</h1>
          <p style={{ color: '#8aafd4', fontSize: '1rem', lineHeight: '1.7', maxWidth: '560px', margin: '0 0 24px' }}>
            Everything you need to know about buying, renting, and investing in Dubai real estate.
          </p>
          {/* Quick stats */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[['5', 'Categories'], ['15+', 'Questions'], ['18+', 'Years Experience']].map(([num, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#4a90d9', fontWeight: '800', fontSize: '1.1rem' }}>{num}</span>
                <span style={{ color: '#8aafd4', fontSize: '0.82rem' }}>{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container style={{ paddingTop: '40px' }}>
        <Row className="g-4">

          {/* Category Filter — left sidebar on desktop */}
          <Col lg={3}>
            <div style={{ position: 'sticky', top: '80px' }}>
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                <h3 style={{ color: '#8aafd4', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', fontWeight: '600' }}>Browse by Category</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {categories.map(cat => {
                    const faqItem = faqs.find(f => f.category === cat)
                    const isActive = activeCategory === cat
                    return (
                      <button key={cat} onClick={() => setActiveCategory(cat)}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: isActive ? '#2d5fc4' : 'transparent', color: isActive ? '#ffffff' : '#8aafd4', border: isActive ? 'none' : '1px solid transparent', borderRadius: '8px', padding: '10px 12px', fontSize: '0.85rem', fontWeight: isActive ? '700' : '400', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.15)' }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}>
                        <span>{faqItem?.icon || '📋'}</span>
                        <span style={{ flex: 1 }}>{cat}</span>
                        {cat !== 'All' && <span style={{ fontSize: '0.72rem', color: isActive ? 'rgba(255,255,255,0.7)' : '#4a4a6a' }}>{faqItem?.questions.length}</span>}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Still have questions */}
              <div style={{ backgroundColor: '#0d1f4e', border: '1px solid rgba(45,95,196,0.25)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>💬</div>
                <h3 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>Still have questions?</h3>
                <p style={{ color: '#8aafd4', fontSize: '0.82rem', lineHeight: '1.6', marginBottom: '14px' }}>Our team is happy to answer any specific questions about Dubai real estate.</p>
                <Link to="/contact"
                  style={{ display: 'block', textAlign: 'center', backgroundColor: '#2d5fc4', color: '#ffffff', borderRadius: '8px', padding: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}>
                  Contact Us →
                </Link>
                <a href="https://wa.me/971561119233" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', textAlign: 'center', backgroundColor: 'rgba(37,211,102,0.15)', color: '#25d366', border: '1px solid rgba(37,211,102,0.3)', borderRadius: '8px', padding: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem', transition: 'all 0.2s', marginTop: '8px' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.15)'}>
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </Col>

          {/* FAQ Accordion — right */}
          <Col lg={9}>
            {filtered.map((section, si) => (
              <div key={si} style={{ marginBottom: '28px' }}>
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '12px', borderBottom: `2px solid ${section.color}40` }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${section.color}20`, border: `1px solid ${section.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    {section.icon}
                  </div>
                  <h2 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>{section.category}</h2>
                  <span style={{ color: section.color, fontSize: '0.75rem', fontWeight: '700', backgroundColor: `${section.color}15`, border: `1px solid ${section.color}30`, borderRadius: '20px', padding: '2px 10px' }}>
                    {section.questions.length} questions
                  </span>
                </div>

                {/* Questions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {section.questions.map((item, qi) => {
                    const key = `${si}-${qi}`
                    const isOpen = openIndex === key
                    return (
                      <div key={qi} style={{ backgroundColor: '#0d1f4e', border: `1px solid ${isOpen ? section.color + '50' : 'rgba(45,95,196,0.2)'}`, borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s ease' }}>
                        <button onClick={() => toggle(key)}
                          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '18px 20px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                          <span style={{ color: isOpen ? '#ffffff' : '#c0d4f0', fontSize: '0.92rem', fontWeight: isOpen ? '700' : '500', lineHeight: '1.4', flex: 1 }}>
                            {item.q}
                          </span>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: isOpen ? section.color : 'rgba(45,95,196,0.2)', border: `1px solid ${isOpen ? section.color : 'rgba(45,95,196,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            <span style={{ color: '#ffffff', fontSize: '0.85rem', lineHeight: 1, display: 'block' }}>▼</span>
                          </div>
                        </button>
                        {isOpen && (
                          <div style={{ padding: '0 20px 18px', borderTop: `1px solid ${section.color}20` }}>
                            <p style={{ color: '#8aafd4', fontSize: '0.9rem', lineHeight: '1.8', margin: '14px 0 0' }}>{item.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FAQ