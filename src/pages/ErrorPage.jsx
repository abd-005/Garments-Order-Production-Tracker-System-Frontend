import Button from '../components/Shared/Button/Button'
import { useNavigate } from 'react-router'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-gradient-to-b from-gray-50 to-gray-100'>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <div className='px-5 py-3 rounded-full bg-red-50'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-16 h-16 text-red-600'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          </div>
          <h1 className='mt-6 text-4xl font-bold text-gray-800 md:text-5xl'>
            404
          </h1>
          <p className='mt-2 text-xl font-semibold text-gray-700'>
            Page Not Found
          </p>
          <p className='mt-4 text-gray-500'>
            Sorry, the page you're looking for doesn't exist.
          </p>
          <div className='flex items-center w-full mt-8 gap-x-3 shrink-0 sm:w-auto'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center px-6 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>
              <span className='ml-2'>Go Back</span>
            </button>
            <Button label='Go Home' onClick={() => navigate('/')} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
