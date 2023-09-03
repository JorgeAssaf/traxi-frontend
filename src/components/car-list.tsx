'use client'
import CarMock from '@/assets/carMock.json'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { AlertOctagonIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

interface CarListProps {
  CarMock: typeof CarMock
  selectedCar: React.Dispatch<React.SetStateAction<typeof CarMock[0] | null>>
}

const CarList = ({ CarMock, selectedCar }: CarListProps) => {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)


  const filteredCars = () => {

    if (query.length === 0)
      return CarMock.slice(currentPage, currentPage + 6);

    const filtered = CarMock.filter(car => car.MODEL.toLowerCase().includes(query) || car.BRAND.toLowerCase().includes(query))

    return filtered.slice(currentPage, currentPage + 6);
  }


  const nextPage = () => {
    if (CarMock.filter(car => car.MODEL.toLowerCase().includes(query)).length > currentPage + 6)
      setCurrentPage(currentPage + 6);
  }

  const prevPage = () => {
    if (currentPage > 0)
      setCurrentPage(currentPage - 6);
  }

  const handleSelectedCar = (car: any) => {
    selectedCar({ ...car })
    console.log(car)
  }
  return (
    <div>
      <div className='flex justify-between space-x-8 mt-8'>
        <div className='flex space-x-4 items-center'>
          <Label>Buscar</Label>
          <Input placeholder='Modelo, Marca o Placa' onChange={(e) => setQuery(e.target.value)} />
        </div>

      </div>
      <div className='mt-8'>
        <div className='flex justify-between space-x-8 mt-8'>
          <Button onClick={prevPage} size='icon'>
            <ChevronLeft />
          </Button>
          <Button onClick={nextPage} size='icon'>
            <ChevronRight />
          </Button>
        </div>
        <div className='grid grid-cols-1 place-content-center md:grid-cols-2 gap-8 mt-8'>
          {
            filteredCars().length > 0 ?
              filteredCars().map((car) => (
                <div
                  className=' w-full border p-2 bg-foretext-foreground shadow-lg  rounded-lg overflow-hidden'
                  key={car['segure numebr']}
                >
                  <div className='px-4 py-2 cursor-pointer' onClick={() => handleSelectedCar(car)}>
                    <h2 className='text-foreground text-xl font-semibold'>
                      {car.BRAND} {car.MODEL}
                    </h2>
                    <p className='text-muted-foreground text-sm'>
                      {car.YEAR} - {car.COLOR}
                    </p>
                  </div>
                </div>
              ))
              :
              <div className='flex flex-col items-center space-y-4'>
                <AlertOctagonIcon size={64} />
                <p className='text-foreground'>No se encontraron resultados</p>

              </div>
          }
        </div>
      </div>

    </div >

  )
}
export default CarList
