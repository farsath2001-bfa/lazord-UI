import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Lazy-loaded via React.lazy() from PropertyDetail.jsx so Leaflet's JS
// only loads once the map actually renders.
const PropertyMap = ({ coords, title, location, priceLabel }) => {
  return (
    <MapContainer center={coords} zoom={14} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      {/* CARTO's free dark tiles now need an API key, so use standard OSM tiles
          and darken them with a CSS filter (see .osm-dark-tiles in PropertyDetail). */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="osm-dark-tiles"
        maxZoom={19}
      />
      <Marker position={coords}>
        <Popup>
          <strong>{title}</strong><br />
          📍 {location}<br />
          <span style={{ color: '#2d5fc4', fontWeight: '700' }}>{priceLabel}</span>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default PropertyMap