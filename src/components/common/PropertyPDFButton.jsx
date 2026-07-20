const PropertyPDFButton = ({ property }) => {

  const generatePDF = () => {
    const formatPrice = (price, type) => {
      if (type === 'Rent') return `AED ${price?.toLocaleString()} / year`
      if (price >= 1000000) return `AED ${(price / 1000000).toFixed(2)}M`
      return `AED ${price?.toLocaleString()}`
    }

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${property.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    /* ── Remove all browser print headers/footers ── */
    @page {
      size: A4;
      margin: 0mm;
    }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      * { -webkit-print-color-adjust: exact !important; }
    }

    html, body {
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #1a1a2e;
      background: #fff;
      width: 210mm;
      min-height: 297mm;
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #0d1f4e 0%, #1a3a7c 100%);
      color: white;
      padding: 20px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo h1 { font-size: 1.6rem; font-weight: 800; letter-spacing: 1px; }
    .logo h1 span { color: #4a90d9; }
    .logo p { color: rgba(255,255,255,0.6); font-size: 0.72rem; margin-top: 2px; letter-spacing: 1px; }
    .header-contact { text-align: right; }
    .header-contact p { color: rgba(255,255,255,0.85); font-size: 0.75rem; margin-bottom: 3px; }

    /* Hero */
    .hero { position: relative; }
    .hero img { width: 100%; height: 260px; object-fit: cover; display: block; }
    .hero-overlay {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
      padding: 20px 28px;
    }
    .tag {
      background: #2d5fc4; color: white;
      padding: 3px 10px; border-radius: 20px;
      font-size: 0.7rem; font-weight: 700;
      display: inline-block; margin-bottom: 6px;
      letter-spacing: 0.5px; text-transform: uppercase;
    }
    .hero-overlay h2 { color: white; font-size: 1.5rem; font-weight: 700; }
    .hero-overlay .loc { color: rgba(255,255,255,0.8); font-size: 0.82rem; margin-top: 3px; }

    /* Content */
    .content { padding: 20px 32px; }

    /* Price bar */
    .price-bar {
      background: #f0f4ff;
      border: 2px solid #2d5fc4;
      border-radius: 10px;
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }
    .price { font-size: 1.7rem; font-weight: 800; color: #0d1f4e; }
    .badges { display: flex; gap: 8px; align-items: center; }
    .badge-type { background: #2d5fc4; color: white; padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }
    .badge-status { background: #e8f8f0; color: #27ae60; border: 1px solid #27ae60; padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }
    .roi-tag { background: #fff8e8; color: #e67e22; border: 1px solid #e67e22; padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }

    /* Stats grid */
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px; }
    .stat {
      background: #f8f9ff; border: 1px solid #e0e8ff;
      border-radius: 8px; padding: 12px 10px; text-align: center;
    }
    .stat-icon { font-size: 1.2rem; margin-bottom: 4px; }
    .stat-value { font-size: 1rem; font-weight: 800; color: #0d1f4e; }
    .stat-label { font-size: 0.65rem; color: #666; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px; }

    /* Two column layout */
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px; }

    /* Sections */
    .section { margin-bottom: 16px; }
    .section h3 {
      font-size: 0.88rem; font-weight: 700; color: #0d1f4e;
      margin-bottom: 8px; padding-bottom: 6px;
      border-bottom: 2px solid #2d5fc4;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .section p { color: #444; font-size: 0.82rem; line-height: 1.6; }

    /* Amenities */
    .amenities { display: flex; flex-wrap: wrap; gap: 6px; }
    .amenity {
      background: #f0f4ff; border: 1px solid #2d5fc4;
      border-radius: 5px; padding: 4px 10px;
      font-size: 0.75rem; color: #0d1f4e; font-weight: 600;
    }

    /* Developer */
    .dev-box {
      background: #f8f9ff; border: 1px solid #e0e8ff;
      border-radius: 8px; padding: 12px 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .dev-icon {
      width: 38px; height: 38px; background: #2d5fc4;
      border-radius: 8px; display: flex; align-items: center;
      justify-content: center; color: white; font-size: 1.1rem; flex-shrink: 0;
    }
    .dev-name { font-weight: 700; color: #0d1f4e; font-size: 0.9rem; }
    .dev-sub { color: #666; font-size: 0.75rem; margin-top: 1px; }

    /* Gallery strip */
    .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 16px; }
    .gallery img { width: 100%; height: 80px; object-fit: cover; border-radius: 6px; }

    /* Footer */
    .footer {
      background: #0d1f4e; color: white;
      padding: 16px 32px;
      display: flex; justify-content: space-between; align-items: center;
      margin-top: auto;
    }
    .footer-left p { font-size: 0.75rem; color: rgba(255,255,255,0.8); margin-bottom: 2px; }
    .footer-left strong { font-size: 0.88rem; }
    .footer-right { max-width: 280px; font-size: 0.65rem; color: rgba(255,255,255,0.5); text-align: right; line-height: 1.5; }

    /* Divider */
    .divider { height: 1px; background: #e0e8ff; margin: 0 0 16px; }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <div class="logo">
      <h1>LAZORD <span>RE</span></h1>
      <p>لازورد للعقارات · DUBAI REAL ESTATE</p>
    </div>
    <div class="header-contact">
      <p>📞 +971 42 999 088 · +971 56 111 9233</p>
      <p>✉️ info@lazordrealestate.ae</p>
      <p>📍 Office 803, Al Salemiyah Tower, Dubai</p>
    </div>
  </div>

  <!-- Hero -->
  ${property.image ? `
  <div class="hero">
    <img src="${property.image}" alt="${property.title}" />
    <div class="hero-overlay">
      <span class="tag">${property.tag || property.type}</span>
      <h2>${property.title}</h2>
      <p class="loc">📍 ${property.location}${property.community ? ` — ${property.community}` : ''}, Dubai, UAE</p>
    </div>
  </div>` : `
  <div style="background:#0d1f4e;padding:28px 32px;">
    <span class="tag" style="margin-bottom:8px;display:inline-block;">${property.tag || property.type}</span>
    <h2 style="color:#fff;font-size:1.5rem;font-weight:700;">${property.title}</h2>
    <p style="color:rgba(255,255,255,0.7);font-size:0.82rem;margin-top:4px;">📍 ${property.location}${property.community ? ` — ${property.community}` : ''}, Dubai, UAE</p>
  </div>`}

  <div class="content">

    <!-- Price -->
    <div class="price-bar">
      <div class="price">${formatPrice(property.price, property.type)}</div>
      <div class="badges">
        ${property.roi ? `<span class="roi-tag">📈 ROI ${property.roi}</span>` : ''}
        <span class="badge-type">${property.type}</span>
        <span class="badge-status">${property.status}</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div class="stat">
        <div class="stat-icon">🛏</div>
        <div class="stat-value">${property.bedrooms === 0 ? 'Studio' : property.bedrooms}</div>
        <div class="stat-label">Bedrooms</div>
      </div>
      <div class="stat">
        <div class="stat-icon">🚿</div>
        <div class="stat-value">${property.bathrooms}</div>
        <div class="stat-label">Bathrooms</div>
      </div>
      <div class="stat">
        <div class="stat-icon">📐</div>
        <div class="stat-value">${property.area?.toLocaleString()}</div>
        <div class="stat-label">Area (sqft)</div>
      </div>
      <div class="stat">
        <div class="stat-icon">🏗️</div>
        <div class="stat-value">${property.completionYear || 'Ready'}</div>
        <div class="stat-label">Completion</div>
      </div>
    </div>

    <!-- Two column: Description + Developer -->
    <div class="two-col">
      ${property.description ? `
      <div class="section">
        <h3>About This Property</h3>
        <p>${property.description}</p>
      </div>` : '<div></div>'}

      ${property.developer ? `
      <div class="section">
        <h3>Developer</h3>
        <div class="dev-box">
          <div class="dev-icon">🏗️</div>
          <div>
            <div class="dev-name">${property.developer}</div>
            <div class="dev-sub">Licensed Developer · Dubai, UAE</div>
          </div>
        </div>
      </div>` : '<div></div>'}
    </div>

    <!-- Amenities -->
    ${property.amenities?.length > 0 ? `
    <div class="section">
      <h3>Amenities & Features</h3>
      <div class="amenities">
        ${property.amenities.map(a => `<span class="amenity">✓ ${a}</span>`).join('')}
      </div>
    </div>` : ''}

    <!-- Gallery strip -->
    ${property.gallery?.length > 1 ? `
    <div class="section">
      <h3>Gallery</h3>
      <div class="gallery">
        ${property.gallery.slice(0, 3).map(img => `<img src="${img}" alt="gallery" />`).join('')}
      </div>
    </div>` : ''}

  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-left">
      <strong>Lazord Real Estate LLC</strong>
      <p>📞 +971 42 999 088 · +971 56 111 9233</p>
      <p>✉️ info@lazordrealestate.ae</p>
      <p>🌐 lazordrealestate.ae</p>
    </div>
    <div class="footer-right">
      This property sheet is for informational purposes only. All details are subject to change without notice. Lazord Real Estate LLC is fully RERA licensed and DED certified.<br/>
      Generated ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
    </div>
  </div>

</body>
</html>`

    const win = window.open('', '_blank')
    win.document.write(html)
    win.document.close()
    win.onload = () => {
      // Small delay to ensure images load
      setTimeout(() => win.print(), 800)
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