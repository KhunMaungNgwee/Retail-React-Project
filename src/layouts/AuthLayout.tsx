import  useAuth  from "@/hooks/useAuth"
import { Navigate, Outlet, redirect, useLocation, useNavigate } from "react-router-dom"

const AuthLayout = () => {
	const { isAuthenticated } = useAuth()
	// const  navigate = useNavigate()
	// const route = useLocation()
	// const userRoutes = ['/dashboard', '/add']
	 
	// const isUserRoute = userRoutes.includes(route.pathname)


	return isAuthenticated ? <Navigate to={"/"} replace /> : <Outlet />
}

export default AuthLayout
