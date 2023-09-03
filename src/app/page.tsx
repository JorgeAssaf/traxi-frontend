import CarMock from '@/assets/carMock.json'
import dynamic from 'next/dynamic'
const MapView = dynamic(() => import('../components/mapView'), {
  loading: () => <p>loading...</p>,
  ssr: false,
})

const getCoords = async () => {
  try {
    const res = await fetch(process.env.TRAXI_API ?? '')
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const coords = await getCoords()

  const carMockWithCoords = CarMock.map((car) => {
    const coords = {
      lat: Math.random() * (19.5 - 19.4) + 19.4,
      lng: Math.random() * (-99.2 - -99.3) + -99.3,
    }
    return {
      ...car,
      coords,
    }
  })

  return (
    <main className='container'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <MapView coords={coords[0].geojson} carMock={carMockWithCoords} />
      </div>
    </main>
  )
}
