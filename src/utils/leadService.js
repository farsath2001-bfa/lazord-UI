// Map a property type / listing criteria to the lead "service" the admin Leads page already uses.
export const serviceForType = (type) => {
  switch (type) {
    case 'Rent': return 'Rent a Property'
    case 'Off Plan': return 'Off Plan Investment'
    case 'Commercial': return 'Commercial Property'
    default: return 'Buy a Property'
  }
}

// Plain-English summary of search filters (used in lead messages; admins read English).
export const criteriaSummary = (c = {}) => {
  const parts = []
  if (c.type && c.type !== 'All') parts.push(c.type)
  if (c.category && c.category !== 'All') parts.push(c.category)
  if (c.search) parts.push(`"${c.search}"`)
  if (c.beds && c.beds !== 'All') parts.push(c.beds === 'Studio' ? 'Studio' : `${c.beds} beds`)
  if (c.maxPrice) parts.push(`max AED ${Number(c.maxPrice).toLocaleString('en-US')}`)
  return parts.join(' · ')
}

export const hasCriteria = (c = {}) => Boolean(
  (c.type && c.type !== 'All') || (c.category && c.category !== 'All') || c.search || (c.beds && c.beds !== 'All') || c.maxPrice
)
