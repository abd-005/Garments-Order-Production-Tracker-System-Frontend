import { Navigate } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'
import useStatus from '../hooks/useStatus'

const BuyerRoute = ({ children }) => {
    const [role, isRoleLoading] = useRole()
    const [status, isStatusLoading] = useStatus()
    

    if (isRoleLoading) return <LoadingSpinner />
    if (role === 'buyer' && status === "approved") return children
    return <Navigate to='/' replace='true' />
}

export default BuyerRoute