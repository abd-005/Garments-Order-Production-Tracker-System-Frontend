import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'
import toast from 'react-hot-toast'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${user.accessToken}`
          return config
        }
      )

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        res => res,
        err => {
          const status = err?.response?.status
          const errorData = err?.response?.data
          if (status === 403 && errorData?.isDemoBlock) {
            toast.error(errorData?.message || 'Action disabled for demo profiles.')
            return Promise.reject(err)
          }

          if (status === 401 || status === 403) {
            logOut()
              .then(() => {
                console.log('Logged out successfully.')
              })
              .catch(console.error)
            navigate('/auth/login')
          }
          return Promise.reject(err)
        }
      )

      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor)
        axiosInstance.interceptors.response.eject(responseInterceptor)
      }
    }
  }, [user, loading, logOut, navigate])

  return axiosInstance
}
export default useAxiosSecure