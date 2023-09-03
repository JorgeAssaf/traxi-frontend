'use client'
import CarMock from '@/assets/carMock.json'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'

interface SearchInputProps {
  CarMock: typeof CarMock
}

const SearchInput = ({ CarMock }: SearchInputProps) => {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('')

  return (
    <div>
      <label htmlFor=''>Buscar</label>
      <input type='text' onChange={(e) => setQuery(e.target.value)} />
      <label htmlFor=''>Año</label>
      <select name='' id='' onChange={(e) => setYear(e.target.value)}>
        <option value=''>Selecciona un año</option>
        {CarMock.sort((a, b) => a.YEAR - b.YEAR).map((car) => (
          <option value={car.YEAR.toString()} key={car.placa}>
            {car.YEAR.toString()}
          </option>
        ))}
      </select>
      <PaginatedItems itemsPerPage={6} year={year} query={query} />
    </div>
  )
}
export default SearchInput
interface CarMockItemsProps {
  currentItems: typeof CarMock
  year: string
}
function CarMockItems({ currentItems, year }: CarMockItemsProps) {
  return (
    <>
      <div className='grid grid-cols-1 place-content-center md:grid-cols-2 gap-8 mt-8'>
        {currentItems.length > 0 ? (
          currentItems
            .filter((car) => (year ? car.YEAR.toString() === year : true))
            .map((car) => (
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
        ) : (
          <div className='text-foreground text-xl font-semibold'>
            No hay resultados
          </div>
        )}
      </div>
    </>
  )
}

interface PaginatedItemsProps {
  itemsPerPage: number
  year: string
  query: string
}

function PaginatedItems({ itemsPerPage, year, query }: PaginatedItemsProps) {

  const [itemOffset, setItemOffset] = useState(0)


  const endOffset = itemOffset + itemsPerPage
  const currentItems = CarMock.slice(itemOffset, endOffset).filter(
    (car) =>
      car.MODEL.toLowerCase().includes(query.toLowerCase().trim()) ||
      car.BRAND.toLowerCase().includes(query.toLowerCase().trim()) ||
      car.placa.toLowerCase().includes(query.toLowerCase().trim()),
  )
  const pageCount = Math.ceil(CarMock.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % CarMock.length
    setItemOffset(newOffset)
  }

  return (
    <>
      <CarMockItems currentItems={currentItems} year={year} />

      <ReactPaginate
        className='flex justify-center space-x-8'
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='<'
        activeClassName='text-primary'
        renderOnZeroPageCount={null}
      />

    </>
  )
}
