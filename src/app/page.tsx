import CarMock from '@/assets/carMock.json'
import CarList from '@/components/car-list'
import dynamic from 'next/dynamic'
const Leaflet = dynamic(() => import('../components/leaflet'), {
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

  return (
    <main className='container'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <Leaflet coords={coords[0].geojson} carMock={CarMock} />
      </div>
      <CarList CarMock={CarMock} />
    </main>
  )
}
