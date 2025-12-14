import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useStatus = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: status, isLoading: isStatusLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['status', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/role/${user?.email}`)
      console.log(result)
      return result.data.status
    },
  })

  return [status, isStatusLoading]
}

export default useStatus