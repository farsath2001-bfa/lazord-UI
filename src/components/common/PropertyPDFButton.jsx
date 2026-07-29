import { useRef } from 'react'
import html2canvas from 'html2canvas'
import lazordLogo from '../../assets/image/lazordlogoo.png'

const PropertyPDFButton = ({ property }) => {
  const formatPrice = (price, type) => {
    if (type === 'Rent') return `AED ${price?.toLocaleString()} / year`
    if (price >= 1000000) return `AED ${(price / 1000000).toFixed(2)}M`
    return `AED ${price?.toLocaleString()}`
  }

  const generatePDF = async () => {
    // Create hidden div with PDF content
    const div = document.createElement('div')
    div.style.cssText = `
      position: fixed; top: -9999px; left: -9999px;
      width: 794px; background: white;
      font-family: 'Segoe UI', Arial, sans-serif;
    `
div.innerHTML = `
  <div style="width:794px; min-height:1123px; background:white; position:relative;">

    <!-- HEADER -->
    <div style="background:#0a1c50; padding:12px 20px; display:flex; justify-content:space-between; align-items:center;">
      
      <!-- Left: Logo + Name -->
      <div style="display:flex; align-items:center; gap:12px;">
        <img src="${lazordLogo}" style="height:75px; width:auto; object-fit:contain;" crossorigin="anonymous" />
        <div>
          <div style="font-size:18px; font-weight:800; color:white; line-height:1.2;">LAZORD</div>
          <div style="font-size:18px; font-weight:800; color:#4a90d9; line-height:1.2;">REAL ESTATE</div>
        </div>
      </div>

     

    </div>
    <!-- Gold divider -->
    <div style="height:3px; background:linear-gradient(to right, #c9a84c, #4a90d9);"></div>

    <!-- PROPERTY IMAGE -->
    ${property.image ? `
    <div style="position:relative; height:350px; overflow:hidden;">
      <img src="${property.image}" style="width:100%; height:100%; object-fit:cover;" crossorigin="anonymous" />
      <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);"></div>
      ${property.tag ? `<div style="position:absolute; top:14px; left:20px; background:#2d5fc4; color:white; padding:4px 12px; border-radius:20px; font-size:11px; font-weight:700;">${property.tag.toUpperCase()}</div>` : ''}
      <div style="position:absolute; bottom:16px; left:20px;">
        <div style="color:white; font-size:22px; font-weight:800; margin-bottom:4px;">${property.title || ''}</div>
        <div style="color:#c8d6ee; font-size:12px;">📍 ${property.location || ''}${property.community ? ' — ' + property.community : ''}, Dubai, UAE</div>
      </div>
    </div>` : ''}

    <div style="padding:20px 20px 100px;">

          <!-- PRICE ROW -->
          <div style="background:#f0f4ff; border-radius:10px; padding:14px 18px; display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div style="font-size:26px; font-weight:800; color:#0a1c50;">${formatPrice(property.price, property.type)}</div>
            <div style="display:flex; gap:8px;">
              <span style="background:${property.type === 'Buy' ? '#2d5fc4' : property.type === 'Rent' ? '#27ae60' : '#8e44ad'}; color:white; padding:6px 16px; border-radius:20px; font-size:12px; font-weight:700;">${property.type || ''}</span>
              <span style="background:transparent; color:#27ae60; border:1.5px solid #27ae60; padding:6px 16px; border-radius:20px; font-size:12px; font-weight:700;">${property.status || 'Available'}</span>
            </div>
          </div>

          <!-- SPECS -->
          <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:16px;">
            ${[
              { label: 'BEDROOMS',    value: property.bedrooms === 0 ? 'Studio' : String(property.bedrooms || '—'), icon: '🛏' },
              { label: 'BATHROOMS',   value: String(property.bathrooms || '—'), icon: '🚿' },
              { label: 'AREA (SQFT)', value: property.area ? property.area.toLocaleString() : '—', icon: '📐' },
              { label: 'COMPLETION',  value: property.completionYear ? String(property.completionYear) : 'Ready', icon: '🏗' },
            ].map(s => `
              <div style="background:#f8faff; border:1px solid #dde4f0; border-radius:10px; padding:14px; text-align:center;">
                <div style="font-size:20px; margin-bottom:6px;">${s.icon}</div>
                <div style="font-size:18px; font-weight:800; color:#0a1c50;">${s.value}</div>
                <div style="font-size:10px; color:#888; margin-top:4px; letter-spacing:0.5px;">${s.label}</div>
              </div>
            `).join('')}
          </div>

          <!-- ABOUT + DEVELOPER -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">

            <!-- About -->
            ${property.description ? `
            <div style="background:#f8faff; border-radius:10px; padding:16px;">
              <div style="font-size:11px; font-weight:700; color:#2d5fc4; letter-spacing:1px; margin-bottom:6px; padding-bottom:6px; border-bottom:1.5px solid #2d5fc4;">ABOUT THIS PROPERTY</div>
              <div style="font-size:12px; color:#444; line-height:1.7;">${property.description?.slice(0, 350)}${property.description?.length > 350 ? '...' : ''}</div>
            </div>` : '<div></div>'}

            <!-- Developer + ROI -->
            <div style="background:#f8faff; border-radius:10px; padding:16px;">
              <div style="font-size:11px; font-weight:700; color:#2d5fc4; letter-spacing:1px; margin-bottom:10px; padding-bottom:6px; border-bottom:1.5px solid #2d5fc4;">DEVELOPER</div>
              ${property.developer ? `
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                <div style="width:38px; height:38px; border-radius:8px; background:#dce8f5; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; color:#2d5fc4;">${property.developer.charAt(0).toUpperCase()}</div>
                <div>
                  <div style="font-size:13px; font-weight:700; color:#0a1c50;">${property.developer}</div>
                  <div style="font-size:10px; color:#888;">Licensed Developer · Dubai, UAE</div>
                </div>
              </div>` : ''}
              ${property.roi ? `
              <div style="background:#27ae60; border-radius:8px; padding:10px; text-align:center;">
                <div style="color:white; font-size:20px; font-weight:800;">${property.roi}</div>
                <div style="color:rgba(255,255,255,0.8); font-size:10px; margin-top:2px;">EXPECTED ROI</div>
              </div>` : ''}
            </div>
          </div>

          <!-- AMENITIES -->
          ${property.amenities?.length ? `
          <div style="margin-bottom:16px;">
            <div style="font-size:11px; font-weight:700; color:#2d5fc4; letter-spacing:1px; margin-bottom:8px; padding-bottom:6px; border-bottom:1.5px solid #2d5fc4;">AMENITIES & FEATURES</div>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${property.amenities.map(a => `
                <span style="background:#ebf0ff; border:1px solid #b4c8f0; color:#2d5fc4; padding:5px 12px; border-radius:20px; font-size:11px; font-weight:600;">✓ ${a}</span>
              `).join('')}
            </div>
          </div>` : ''}

        </div>

       <!-- FOOTER — fixed at bottom -->
<div style="position:absolute; bottom:0; left:0; right:0;">
  <div style="height:3px; background:linear-gradient(to right, #c9a84c, #4a90d9);"></div>
  <div style="background:#0a1c50; padding:20px 20px; display:flex; justify-content:space-between; align-items:center;">
    
    <!-- Left: Logo + Company Name -->
    <div style="display:flex; align-items:center; gap:12px;">
      <img src="${lazordLogo}" style="height:75px; width:auto; object-fit:contain;" crossorigin="anonymous" />
      <div>
        <div style="color:white; font-size:13px; font-weight:800; margin-bottom:4px;">Lazord Real Estate LLC</div>
        <div style="color:#8aafd4; font-size:10px; margin-bottom:2px;">📍 Office 803, Al Salemiyah Tower, Dubai</div>
        <div style="color:#8aafd4; font-size:10px; margin-bottom:2px;">✉️ info@lazordrealestate.ae</div>
        <div style="color:#8aafd4; font-size:10px; margin-bottom:2px;">📞 +971 42 999 088 · +971 56 111 9233</div>
        <div style="color:#8aafd4; font-size:10px;">🌐 www.lazordrealestate.ae</div>
      </div>
    </div>

    <!-- Right: Disclaimer + Date -->
    <div style="text-align:right; max-width:260px;">
      <div style="color:#6a80a0; font-size:10px; line-height:1.6; margin-bottom:6px;">
        This property sheet is for informational purposes only. All details are subject to change without notice. Lazord Real Estate LLC is fully RERA licensed and DED certified.
      </div>
      <div style="color:#4a5a70; font-size:10px;">
        Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
      </div>
    </div>

  </div>
</div>

</div>
`

document.body.appendChild(div)

    // Wait for images to load
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      const canvas = await html2canvas(div, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794,
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.95)

      // Create download link
      const { default: jsPDF } = await import('jspdf')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const W = 210
      const H = 297
      pdf.addImage(imgData, 'JPEG', 0, 0, W, H)

      const filename = `${(property.title || 'property').replace(/[^a-z0-9]/gi, '-').toLowerCase()}-lazord.pdf`
      pdf.save(filename)

    } catch (err) {
      console.error('PDF error:', err)
    } finally {
      document.body.removeChild(div)
    }
  }

  return (
    <button
      onClick={generatePDF}
      style={{
        backgroundColor: 'rgba(45,95,196,0.15)',
        color: '#4a90d9',
        border: '1px solid rgba(74,144,217,0.3)',
        borderRadius: '6px',
        padding: '6px 12px',
        fontSize: '0.78rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.3)'; e.currentTarget.style.borderColor = '#4a90d9' }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,95,196,0.15)'; e.currentTarget.style.borderColor = 'rgba(74,144,217,0.3)' }}
    >
      📄 PDF
    </button>
  )
}

export default PropertyPDFButton