import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Card from './Card'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import Container from '../../../Components/Shared/Container'

const AllProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/products`)
      return result.data
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='bg-secondary/30'>
      <Container>
      <div className='text-center pt-12'>
        <h2>All Products</h2>
      </div>
      {products && products.length > 0 ? (
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : null}
    </Container>
    </div>
  )
}

export default AllProducts
