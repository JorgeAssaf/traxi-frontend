'use client'
import { useState } from 'react'
import { Icon } from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import MarkerIcon from 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

import type { CarMockWithCoords, Coords } from '@/types/coords'
import CarList from './car-list'

interface LeafletProps {
  coords: Coords
  carMock: CarMockWithCoords[]
}

const Leaflet = ({ coords, carMock }: LeafletProps) => {
  const [selectedCar, setSelectedCar] = useState<CarMockWithCoords | null>(null)
  const purpleOptions = { color: 'lime' }
  return (
    <>
      <div className='w-full h-[500px] md:h-[700px]'>
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
          {coords.features.map((coord) => {
            if (coord.geometry.type === 'Point') {
              return (
                <>
                  {coord.properties.type === 'out' ? (
                    <Marker
                      key={coord.properties.name}
                      position={[
                        selectedCar?.coords.lat ?? 0,
                        selectedCar?.coords.lng ?? 0,
                      ]}
                      icon={
                        new Icon({
                          iconUrl:
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Car_with_Driver-Silhouette.svg/2442px-Car_with_Driver-Silhouette.svg.png',
                          iconSize: [30, 30],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                          shadowSize: [41, 41],
                        })
                      }>
                      <Popup>
                        <div>
                          <h2 className='text-primary text-xl font-semibold'>
                            {selectedCar?.BRAND} {selectedCar?.MODEL}
                          </h2>
                          <p className='text-muted-foreground text-sm'>
                            {selectedCar?.YEAR} - {selectedCar?.COLOR}
                          </p>
                        </div>
                        <div>
                          <p className='text-background'>
                            Placa: {selectedCar?.placa}
                          </p>
                          <p className='text-background'>
                            Número Económico:{' '}
                            {selectedCar !== null
                              ? selectedCar['numero economico']
                              : ''}
                          </p>
                          <p className='text-background'>
                            VIM: {selectedCar?.vim}
                          </p>
                          <p className='text-background '>
                            Asientos: {selectedCar?.asientos}
                          </p>
                          <p className='text-background'>
                            Seguro: {selectedCar?.seguro}
                          </p>
                          <p className='text-background'>
                            Número de Seguro: {selectedCar?.['segure numebr']}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ) : (
                    <Marker
                      key={coord.properties.name}
                      position={[
                        coord.geometry.coordinates[1] as number,
                        coord.geometry.coordinates[0] as number,
                      ]}
                      icon={
                        new Icon({
                          iconUrl: MarkerIcon.src,
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                          shadowSize: [41, 41],
                        })
                      }>
                      <Popup>
                        <p className='text-background '>
                          {coord.properties.name}
                        </p>
                      </Popup>
                    </Marker>
                  )}
                </>
              )
            }
            if (coord.geometry.type === 'LineString') {

              const latlngs = coord.geometry.coordinates.map((coord: any) => {
                return [coord[1], coord[0]]
              })


              return (
                <Polyline
                  key={coord.properties.name}
                  pathOptions={purpleOptions}
                  positions={
                    latlngs
                  }
                />
              )
            }
          })}
        </MapContainer>
      </div>
      <div className='w-full'>
        <CarList CarMock={carMock} selectedCar={setSelectedCar} />
      </div>
    </>
  )
}
export default Leaflet
