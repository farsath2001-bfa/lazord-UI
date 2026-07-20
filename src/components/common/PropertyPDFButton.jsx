// PropertyPDF.jsx — add this button to your property detail page or admin properties table
// Usage: <PropertyPDFButton property={p} />

const PropertyPDFButton = ({ property }) => {

  const generatePDF = () => {
    const formatPrice = (price, type) => {
      if (type === 'Rent') return `AED ${price?.toLocaleString()} / year`
      if (price >= 1000000) return `AED ${(price / 1000000).toFixed(2)}M`
      return `AED ${price?.toLocaleString()}`
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${property.title} - Lazord Real Estate</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: #fff; }

    .header { background: linear-gradient(135deg, #0d1f4e, #2d5fc4); color: white; padding: 32px 40px; display: flex; justify-content: space-between; align-items: center; }
    .logo-area h1 { font-size: 1.8rem; font-weight: 800; letter-spacing: 1px; }
    .logo-area h1 span { color: #4a90d9; }
    .logo-area p { color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-top: 4px; }
    .header-right { text-align: right; }
    .header-right p { color: rgba(255,255,255,0.8); font-size: 0.82rem; margin-bottom: 4px; }

    .hero { position: relative; }
    .hero img { width: 100%; height: 320px; object-fit: cover; display: block; }
    .hero-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); padding: 24px 40px; }
    .hero-overlay .tag { background: #2d5fc4; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; display: inline-block; margin-bottom: 8px; }
    .hero-overlay h2 { color: white; font-size: 1.8rem; font-weight: 700; }
    .hero-overlay .location { color: rgba(255,255,255,0.8); font-size: 0.92rem; margin-top: 4px; }

    .content { padding: 32px 40px; }

    .price-bar { background: #f0f4ff; border: 2px solid #2d5fc4; border-radius: 12px; padding: 20px 28px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
    .price-bar .price { font-size: 2rem; font-weight: 800; color: #0d1f4e; }
    .price-bar .type-badge { background: #2d5fc4; color: white; padding: 6px 16px; border-radius: 20px; font-size: 0.88rem; font-weight: 700; }
    .price-bar .status { background: #e8f8f0; color: #27ae60; border: 1px solid #27ae60; padding: 6px 16px; border-radius: 20px; font-size: 0.88rem; font-weight: 700; }

    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
    .stat-box { background: #f8f9ff; border: 1px solid #e0e8ff; border-radius: 10px; padding: 16px; text-align: center; }
    .stat-box .stat-icon { font-size: 1.4rem; margin-bottom: 6px; }
    .stat-box .stat-value { font-size: 1.1rem; font-weight: 800; color: #0d1f4e; }
    .stat-box .stat-label { font-size: 0.72rem; color: #666; margin-top: 3px; text-transform: uppercase; letter-spacing: 0.5px; }

    .section { margin-bottom: 24px; }
    .section h3 { font-size: 1rem; font-weight: 700; color: #0d1f4e; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #2d5fc4; }
    .section p { color: #444; font-size: 0.9rem; line-height: 1.7; }

    .amenities { display: flex; flex-wrap: wrap; gap: 8px; }
    .amenity { background: #f0f4ff; border: 1px solid #2d5fc4; border-radius: 6px; padding: 6px 12px; font-size: 0.82rem; color: #0d1f4e; font-weight: 600; }

    .developer-box { background: #f8f9ff; border: 1px solid #e0e8ff; border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; gap: 14px; }
    .developer-box .dev-icon { width: 44px; height: 44px; background: #2d5fc4; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; }
    .developer-box .dev-name { font-weight: 700; color: #0d1f4e; font-size: 1rem; }
    .developer-box .dev-sub { color: #666; font-size: 0.82rem; margin-top: 2px; }

    .footer { background: #0d1f4e; color: white; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; margin-top: 32px; }
    .footer .contact p { font-size: 0.82rem; color: rgba(255,255,255,0.8); margin-bottom: 3px; }
    .footer .disclaimer { max-width: 340px; font-size: 0.72rem; color: rgba(255,255,255,0.5); text-align: right; line-height: 1.5; }

    .roi-badge { background: #e8f8f0; border: 1px solid #27ae60; border-radius: 8px; padding: 8px 16px; display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; }
    .roi-badge span { color: #27ae60; font-weight: 700; font-size: 0.9rem; }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <div class="logo-area">
      <h1>LAZORD <span>RE</span></h1>
      <p>لازورد للعقارات · Dubai Real Estate</p>
    </div>
    <div class="header-right">
      <p>📞 +971 42 999 088</p>
      <p>✉️ info@lazordrealestate.ae</p>
      <p>Office 803, Al Salemiyah Tower, Dubai</p>
    </div>
  </div>

  <!-- Hero Image -->
  ${property.image ? `
  <div class="hero">
    <img src="${property.image}" alt="${property.title}" />
    <div class="hero-overlay">
      <span class="tag">${property.tag || 'Property'}</span>
      <h2>${property.title}</h2>
      <p class="location">📍 ${property.location}${property.community ? ` — ${property.community}` : ''}, Dubai, UAE</p>
    </div>
  </div>` : ''}

  <div class="content">

    <!-- Price Bar -->
    <div class="price-bar">
      <div>
        <div class="price">${formatPrice(property.price, property.type)}</div>
        ${property.roi ? `<div class="roi-badge"><span>📈 Expected ROI: ${property.roi}</span></div>` : ''}
      </div>
      <div style="display:flex;gap:8px;">
        <span class="type-badge">${property.type}</span>
        <span class="status">${property.status}</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-icon">🛏</div>
        <div class="stat-value">${property.bedrooms === 0 ? 'Studio' : property.bedrooms}</div>
        <div class="stat-label">Bedrooms</div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">🚿</div>
        <div class="stat-value">${property.bathrooms}</div>
        <div class="stat-label">Bathrooms</div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">📐</div>
        <div class="stat-value">${property.area?.toLocaleString()}</div>
        <div class="stat-label">Area (sqft)</div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">🏗️</div>
        <div class="stat-value">${property.completionYear || 'Ready'}</div>
        <div class="stat-label">Completion</div>
      </div>
    </div>

    <!-- Description -->
    ${property.description ? `
    <div class="section">
      <h3>About This Property</h3>
      <p>${property.description}</p>
    </div>` : ''}

    <!-- Amenities -->
    ${property.amenities?.length > 0 ? `
    <div class="section">
      <h3>Amenities & Features</h3>
      <div class="amenities">
        ${property.amenities.map(a => `<span class="amenity">✓ ${a}</span>`).join('')}
      </div>
    </div>` : ''}

    <!-- Developer -->
    ${property.developer ? `
    <div class="section">
      <h3>Developer</h3>
      <div class="developer-box">
        <div class="dev-icon">🏗️</div>
        <div>
          <div class="dev-name">${property.developer}</div>
          <div class="dev-sub">Licensed Developer · Dubai, UAE</div>
        </div>
      </div>
    </div>` : ''}

  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="contact">
      <p><strong>Lazord Real Estate LLC</strong></p>
      <p>📞 +971 42 999 088 · +971 56 111 9233</p>
      <p>✉️ info@lazordrealestate.ae</p>
      <p>🌐 lazord-ui.vercel.app</p>
    </div>
    <div class="disclaimer">
      This property sheet is for informational purposes only. All details are subject to change without notice. Lazord Real Estate LLC is fully RERA licensed and DED certified. Generated ${new Date().toLocaleDateString('en-GB')}.
    </div>
  </div>

</body>
</html>`

    // Open in new window and print
    const win = window.open('', '_blank')
    win.document.write(html)
    win.document.close()
    win.onload = () => {
      win.print()
    }
  }

  return (
    <button onClick={generatePDF}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        backgroundColor: 'rgba(230,126,34,0.15)',
        color: '#e67e22',
        border: '1px solid rgba(230,126,34,0.3)',
        borderRadius: '6px', padding: '6px 14px',
        fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(230,126,34,0.3)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(230,126,34,0.15)'}
      title="Generate PDF property sheet"
    >
      📄 PDF
    </button>
  )
}

export default PropertyPDFButton