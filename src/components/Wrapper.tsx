import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import DefaultLayout from '@/layouts/common/DefaultLayout'
import StockView from "@/modules/stock/StockView";
import CartView from "@/modules/cart/CartView";
import ManagerView from "@/modules/manager/ManagerView";
import NotFoundView from "@/modules/not-found/NotFoundView";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./views/Loader";
import { store } from "@/store";
import { Toaster } from "./ui/toaster";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/modules/auth/login/LoginView";
import Register from "@/modules/auth/register/Register";
import AdminStockView from "@/modules/admin/AdminStockView";


const router = createBrowserRouter([
	{
		path:"/",
		element:<DefaultLayout/>,
		children:[
			{
				path:'',
				element:<StockView/>
			},
			{
				path:'/stock-page',
				element: <StockView/>
			},
			{
				path:'/cart-page',
				element: <CartView/>
			},
			{
				path:'manager-page',
				element: <ManagerView/>
			},
			{
				path:'register',
				element:<Register />
			},
			{
				path:'admin',
				element:<AdminStockView />
			},
			
			
		],
	},
	{
		path:"auth",
		element:<AuthLayout/>,
		children:[
			{
				path:"",
				element:<Navigate to="login" replace />
			},
			{
				path:"login",
				element:<LoginView />
			}
		]
	},
	{
		path: "*",
		element: <NotFoundView />,
	},
	
	
	
]);
const Wrapper = () => {
	const queryClient = new QueryClient();

	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Loader />
					<Toaster />
					<RouterProvider router={router}></RouterProvider>
				</QueryClientProvider>
			</Provider>
		</>
	);
};

export default Wrapper
