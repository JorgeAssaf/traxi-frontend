'use client'
import CarMock from '@/assets/carMock.json'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

interface CarListProps {
  CarMock: typeof CarMock
}

const CarList = ({ CarMock }: CarListProps) => {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const [year, setYear] = useState('')
  const filteredCars = () => {

    if (query.length === 0)
      return CarMock.slice(currentPage, currentPage + 6);

    const filtered = CarMock.filter(car => car.MODEL.toLowerCase().includes(query) || car.BRAND.toLowerCase().includes(query))
    if (year.length > 0) return filtered.filter(car => car.YEAR.toString() === year).slice(currentPage, currentPage + 6);

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


  return (
    <div>
      <div className='flex justify-between space-x-8 mt-8'>
        <div className='flex space-x-4 items-center'>
          <Label>Buscar</Label>
          <Input placeholder='Modelo, Marca o Placa' onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div>
          <label htmlFor=''>Año</label>
          <select name='' id='' onChange={(e) => setYear(e.target.value)}>
            <option value=''>Selecciona un año</option>
            {CarMock.sort((a, b) => a.YEAR - b.YEAR).map((car) => (
              <option value={car.YEAR.toString()} key={car.placa}>
                {car.YEAR.toString()}
              </option>
            ))}
          </select>
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
            filteredCars().map((car) => (
              <div
                className=' w-full border  bg-foretext-foreground shadow-lg  rounded-lg overflow-hidden'
                key={car['segure numebr']}>
                <div className='px-4 py-2'>
                  <h2 className='text-foreground text-xl font-semibold'>
                    {car.BRAND} {car.MODEL}
                  </h2>
                  <p className='text-muted-foreground text-sm'>
                    {car.YEAR} - {car.COLOR}
                  </p>
                </div>
                <div className='px-4 py-2'>
                  <p className='text-foreground'>Placa: {car.placa}</p>
                  <p className='text-foreground'>
                    Número Económico: {car['numero economico']}
                  </p>
                  <p className='text-foreground'>VIM: {car.vim}</p>
                  <p className='text-foreground '>Asientos: {car.asientos}</p>
                  <p className='text-foreground'>Seguro: {car.seguro}</p>
                  <p className='text-foreground'>
                    Número de Seguro: {car['segure numebr']}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

    </div>

  )
}
export default CarList
