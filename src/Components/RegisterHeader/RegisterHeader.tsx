import { Link } from 'react-router-dom'

export default function RegisterHeader() {
  return (
    <header className='py-5'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link className='flex space-around' to='/'>
            <img
              src='../../../public/logo.png'
              alt='Shopee Logo'
              className='h-10'
            />
            <p className='m-auto'>ABaBaNa</p>
          </Link>
          <div className='ml-auto flex items-center space-x-5'>
            <Link to='/register' className='ml-10 text-xl lg:text-2xl'>Đăng ký</Link>
            <div>|</div>
            <Link to='/login' className='ml-10 text-xl lg:text-2xl'>Đăng Nhập</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
