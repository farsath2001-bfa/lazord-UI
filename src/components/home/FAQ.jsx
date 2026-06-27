import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const faqs = [
  {
    category: 'Buying',
    color: '#2d5fc4',
    questions: [
      {
        q: 'Can foreigners buy property in Dubai?',
        a: 'Yes! Dubai allows foreigners to buy freehold properties in designated areas such as Downtown Dubai, Dubai Marina, Palm Jumeirah, Business Bay, and more. There are no restrictions on nationality.'
      },
      {
        q: 'What are the costs involved in buying a property?',
        a: 'Typical costs include: Dubai Land Department (DLD) fee of 4%, agent commission of 2%, mortgage registration fee (if applicable) of 0.25%, and admin/service fees. We guide you through every cost upfront.'
      },
      {
        q: 'How long does the buying process take?',
        a: 'For cash transactions, the process typically takes 2-4 weeks. For mortgage transactions, it can take 4-8 weeks depending on bank approvals and documentation.'
      },
    ]
  },
  {
    category: 'Renting',
    color: '#27ae60',
    questions: [
      {
        q: 'What documents do I need to rent a property?',
        a: 'You will need a valid passport copy, UAE residence visa (or tourist visa for short-term), Emirates ID (for residents), and proof of income or employment letter.'
      },
      {
        q: 'How are rent payments made in Dubai?',
        a: 'Rent is typically paid by post-dated cheques in Dubai. Common arrangements are 1, 2, 4, or 12 cheques per year. Some landlords accept bank transfers. RERA regulates rent increases through the Rent Index.'
      },
      {
        q: 'Can the landlord increase my rent?',
        a: 'Rent increases are regulated by RERA\'s Rent Index. Landlords must give 90 days notice before any increase, and the increase must comply with the official RERA rental calculator.'
      },
    ]
  },
  {
    category: 'Selling',
    color: '#e67e22',
    questions: [
      {
        q: 'How do I get the best price for my property?',
        a: 'Our expert agents conduct a free market valuation, analyze comparable sales, and create a professional marketing campaign including professional photography, online listings, and targeted outreach to qualified buyers.'
      },
      {
        q: 'How long does it take to sell a property in Dubai?',
        a: 'On average, properties sell within 30-90 days depending on pricing, location and market conditions. Well-priced properties in prime locations often receive offers within days.'
      },
    ]
  },
  {
    category: 'Off Plan',
    color: '#8e44ad',
    questions: [
      {
        q: 'Is it safe to buy off-plan properties in Dubai?',
        a: 'Yes, Dubai has strong regulations for off-plan properties. Developers must register with RERA and payments go into an escrow account protected by law. Always buy from RERA-registered developers.'
      },
      {
        q: 'What are the payment plans for off-plan properties?',
        a: 'Most developers offer flexible plans such as 20/80 (20% during construction, 80% on handover) or 50/50 plans. Some offer post-handover payment plans extending 2-5 years after completion.'
      },
      {
        q: 'What is the expected ROI on off-plan properties in Dubai?',
        a: 'Dubai off-plan properties typically offer 6-10% rental yield ROI, with some areas like JVC, Business Bay and Dubai Marina consistently delivering strong returns. Capital appreciation is also significant.'
      },
    ]
  },
]

const FAQItem = ({ question, answer, isOpen, onClick, color }) => (
  <div style={{
    backgroundColor: isOpen ? 'rgba(45,95,196,0.08)' : '#0d1f4e',
    border: `1px solid ${isOpen ? color : 'rgba(45,95,196,0.2)'}`,
    borderRadius: '12px', marginBottom: '10px',
    transition: 'all 0.3s ease', overflow: 'hidden'
  }}>
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 22px', cursor: 'pointer', gap: '16px'
      }}
    >
      <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: '600', margin: 0, lineHeight: '1.4' }}>
        {question}
      </h4>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
        backgroundColor: isOpen ? color : 'rgba(45,95,196,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
      }}>
        <span style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1', marginTop: '-1px' }}>+</span>
      </div>
    </div>
    {isOpen && (
      <div style={{ padding: '0 22px 18px', borderTop: '1px solid rgba(45,95,196,0.15)' }}>
        <p style={{ color: '#8aafd4', fontSize: '0.9rem', lineHeight: '1.8', margin: '14px 0 0' }}>
          {answer}
        </p>
      </div>
    )}
  </div>
)

const FAQ = () => {
  const [openItem, setOpenItem] = useState('0-0')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...faqs.map(f => f.category)]

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === activeCategory)

  return (
    <section style={{ backgroundColor: '#060f26', padding: '90px 0' }}>
      <Container>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,95,196,0.15)', border: '1px solid rgba(74,144,217,0.3)', borderRadius: '30px', padding: '5px 14px', marginBottom: '16px' }}>
            <span style={{ color: '#4a90d9', fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>✦ FAQ</span>
          </div>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', marginBottom: '6px' }}>
            Frequently Asked
          </h2>
          <h2 style={{ color: '#4a90d9', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '16px' }}>
            Questions
          </h2>
          <p style={{ color: '#8aafd4', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
            Everything you need to know about buying, renting, selling and investing in Dubai real estate.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '8px 22px', borderRadius: '30px', border: activeCategory === cat ? '1.5px solid #4a90d9' : '1.5px solid rgba(45,95,196,0.3)',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', transition: 'all 0.2s ease',
              backgroundColor: activeCategory === cat ? '#2d5fc4' : 'transparent',
              color: activeCategory === cat ? '#ffffff' : '#8aafd4',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <Row className="justify-content-center">
          <Col lg={9}>
            {filteredFaqs.map((section, si) => (
              <div key={si} style={{ marginBottom: '32px' }}>
                {/* Category Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: section.color }} />
                  <h3 style={{ color: section.color, fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>
                    {section.category}
                  </h3>
                  <div style={{ flex: 1, height: '1px', backgroundColor: `${section.color}30` }} />
                </div>

                {section.questions.map((item, qi) => (
                  <FAQItem
                    key={qi}
                    question={item.q}
                    answer={item.a}
                    color={section.color}
                    isOpen={openItem === `${si}-${qi}`}
                    onClick={() => setOpenItem(openItem === `${si}-${qi}` ? null : `${si}-${qi}`)}
                  />
                ))}
              </div>
            ))}
          </Col>
        </Row>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: '#8aafd4', marginBottom: '20px', fontSize: '0.95rem' }}>
            Still have questions? Our experts are here to help.
          </p>
          <Link to="/contact" style={{
            display: 'inline-block', backgroundColor: '#2d5fc4', color: '#fff',
            padding: '13px 32px', borderRadius: '10px', textDecoration: 'none',
            fontWeight: '700', fontSize: '0.92rem', transition: 'background 0.2s ease'
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a3a7c'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d5fc4'}
          >
            Contact Our Team →
          </Link>
        </div>

      </Container>
    </section>
  )
}

export default FAQ