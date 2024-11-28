import Sidebar from "@/components/sidebar/Sidebar"
import  useAuth  from "@/hooks/useAuth"
import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

const AdminLayout = () => {
	const [isAdmin, setIsAdmin] = useState(false)

	return !isAdmin ? <Navigate to={"/auth/login"} replace /> : <div className="flex h-screen bg-gray-200 overflow-hidden">
	<aside className="w-3/12 bg-gray-800 text-white h-screen fixed lg:static lg:flex">
	  <Sidebar />
	</aside>

	<div className="flex flex-col lg:w-9/12 w-full ml-auto">
	  <main className="flex-1 bg-white rounded-lg shadow-lg p-6 m-6 overflow-y-auto">
		<Outlet />
	  </main>
	</div>
  </div>
}

export default AdminLayout
