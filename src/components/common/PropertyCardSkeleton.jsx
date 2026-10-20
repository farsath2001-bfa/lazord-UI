// Shimmering placeholder shown while property data loads, instead of a bare spinner.
// Usage: render a grid/row of these matching your normal card layout, e.g.:
//   {loading && Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
const PropertyCardSkeleton = () => {
  return (
    <div style={{
      backgroundColor: '#0d1f4e',
      border: '1px solid rgba(45,95,196,0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      height: '100%',
    }}>
      <div className="skeleton-shimmer" style={{ width: '100%', height: '200px', backgroundColor: 'rgba(45,95,196,0.12)' }} />
      <div style={{ padding: '16px' }}>
        <div className="skeleton-shimmer" style={{ width: '70%', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(45,95,196,0.15)', marginBottom: '10px' }} />
        <div className="skeleton-shimmer" style={{ width: '45%', height: '12px', borderRadius: '4px', backgroundColor: 'rgba(45,95,196,0.1)', marginBottom: '14px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="skeleton-shimmer" style={{ width: '30%', height: '12px', borderRadius: '4px', backgroundColor: 'rgba(45,95,196,0.1)' }} />
          <div className="skeleton-shimmer" style={{ width: '30%', height: '12px', borderRadius: '4px', backgroundColor: 'rgba(45,95,196,0.1)' }} />
          <div className="skeleton-shimmer" style={{ width: '30%', height: '12px', borderRadius: '4px', backgroundColor: 'rgba(45,95,196,0.1)' }} />
        </div>
      </div>

      <style>{`
        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
        }
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -150%;
          width: 150%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          animation: skeletonSweep 1.6s ease-in-out infinite;
        }
        @keyframes skeletonSweep {
          0%   { left: -150%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  )
}

export default PropertyCardSkeleton