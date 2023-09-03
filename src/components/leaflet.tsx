'use client'
import { Icon } from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import MarkerClusterGroup from 'leaflet/dist/images/marker-icon.png'
const Leaflet = ({ coords }: { coords: any }) => {

  const purpleOptions = { color: 'lime' }

  return (
    <div className='w-full h-[700px] rounded-md '>
      <MapContainer
        center={[19.50003, -99.21323]}
        zoom={12}
        scrollWheelZoom={false}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 'calc(var(--radius) - 2px)',
        }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {coords.features.map((coord: any, index: number) => {
          if (coord.geometry.type === 'Point') {
            return (
              <>
                {coord.properties.type === 'out' ? (
                  <Marker
                    key={index}
                    position={[
                      coord.geometry.coordinates[1],
                      coord.geometry.coordinates[0],
                    ]}
                    icon={
                      new Icon({
                        iconUrl: 'https://i.imgur.com/8JWbq3F.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41],
                      })
                    }>
                    <Popup>
                      <p className='text-foreground'>{coord.properties.name}</p>
                    </Popup>
                  </Marker>
                ) : (
                  <Marker
                    key={index}
                    position={[
                      coord.geometry.coordinates[1],
                      coord.geometry.coordinates[0],
                    ]}
                    icon={
                      new Icon({
                        iconUrl: MarkerClusterGroup.src,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41],
                      })
                    }>
                    <Popup>
                      <p className='text-foreground '>
                        {coord.properties.name}
                      </p>
                    </Popup>
                  </Marker>
                )}
              </>
            )
          }
          if (coord.geometry.type === 'LineString') {
            return (
              <Polyline
                key={index}
                pathOptions={purpleOptions}
                positions={coord.geometry.coordinates.map((coord: any) => [
                  coord[1],
                  coord[0],
                ])}
              />
            )
          }
        })}
      </MapContainer>
    </div>
  )
}
export default Leaflet
