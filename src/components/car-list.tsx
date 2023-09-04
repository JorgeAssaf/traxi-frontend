'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { AlertOctagonIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import type { CarMockWithCoords } from '@/types/coords'

interface CarListProps {
  CarMock: CarMockWithCoords[]
  selectedCar: React.Dispatch<React.SetStateAction<CarMockWithCoords | null>>
}

const CarList = ({ CarMock, selectedCar }: CarListProps) => {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const filteredCars = () => {
    if (query.length === 0) return CarMock.slice(currentPage, currentPage + 7)

    const filtered = CarMock.filter(
      (car) =>
        car.MODEL.toLowerCase().includes(query) ||
        car.BRAND.toLowerCase().includes(query) ||
        car.placa.toLowerCase().includes(query),
    )

    return filtered.slice(currentPage, currentPage + 7)
  }

  const nextPage = () => {
    if (
      CarMock.filter(
        (car) =>
          car.MODEL.toLowerCase().includes(query) ||
          car.BRAND.toLowerCase().includes(query) ||
          car.placa.toLowerCase().includes(query),
      ).length >
      currentPage + 7
    )
      setCurrentPage(currentPage + 7)
  }

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 7)
  }

  const handleSelectedCar = (car: CarMockWithCoords) => {
    selectedCar({ ...car })
  }
  return (
    <>
      <div className='flex  space-x-8 mt-8'>
        <div className='flex space-x-4 items-center'>
          <Label>Buscar</Label>
          <Input
            placeholder='Modelo, Marca o Placa'
            onChange={(e) => setQuery(e.target.value)}
          />
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
          {filteredCars().length > 0 ? (
            filteredCars().map((car) => (
              <div
                className=' w-full border  bg-foretext-foreground shadow-lg  rounded-lg overflow-hidden'
                key={car['segure numebr']}>
                <div
                  className='px-4 py-2'
                  onClick={() => handleSelectedCar(car)}>
                  <h2 className='text-foreground text-xl font-semibold'>
                    {car.BRAND} {car.MODEL}
                  </h2>
                  <p className='text-muted-foreground text-sm my-2'>
                    {car.YEAR} - {car.COLOR}
                  </p>
                  <p>
                    Placa: <span className='text-foreground'>{car.placa}</span>
                  </p>
                </div>

              </div>
            ))
          ) : (
            <div className='flex flex-col items-center space-y-4'>
              <AlertOctagonIcon size={74} />
              <p className='text-foreground'>No se encontraron resultados</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default CarList
