import  useAuth  from "@/hooks/useAuth"
import { Outlet, useNavigate } from "react-router-dom"

const RouteGuard = ({allowedRoles, children}: {allowedRoles: string[], children: React.ReactNode}) => {
	const navigate = useNavigate()
	const { isAuthenticated, userRole } = useAuth()


	if(!isAuthenticated) {
		navigate('/auth', {replace: true})
	}

	if(allowedRoles.includes(userRole || 'user')) {
		return <div>{children}<Outlet /></div>
	} else {
		navigate('/', {replace: true})
	}

	return <div>{children}</div>


}

export default RouteGuard