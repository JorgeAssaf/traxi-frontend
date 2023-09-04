import { ThemeToggle } from './theme-toggle'

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full bg-background'>
      <div className='container flex justify-between h-24 items-center'>
        <h1 className='text-lg md:text-2xl font-bold text-primary'>
          Traxi Frontend Challenge
        </h1>
        <ThemeToggle />
      </div>
    </header>
  )
}
