import { Navigate } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const BuyerRoute = ({ children }) => {
    const [role, isRoleLoading] = useRole()

    if (isRoleLoading) return <LoadingSpinner />
    if (role === 'buyer') return children
    return <Navigate to='/' replace='true' />
}

export default BuyerRoute