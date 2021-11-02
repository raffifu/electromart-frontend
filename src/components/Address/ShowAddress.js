import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function ShowAddress ({ latitude, longitude, text, height, width }) {
  const position = [latitude, longitude]
  return (
    <MapContainer
      style={{ height, width }}
      center={position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{text}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default ShowAddress
