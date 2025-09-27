import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <header className='py-5'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to='/' className='flex items-end'>
            <img src='../../public/logo.png' alt='Shopee Logo' className='h-8 lg:h-11' />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>Register</div>
        </nav>
      </div>
    </header>
  )
}
