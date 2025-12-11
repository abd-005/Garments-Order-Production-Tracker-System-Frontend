import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout/MainLayout";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Register from "../Page/Auth/Register/Register";
import Login from "../Page/Auth/Login/Login";
import ErrorPage from "../Page/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import DashboardHome from "../Page/Dashboard/Common/DashboardHome";
import ManageUsers from "../Page/Dashboard/ManageUsers";
import AllOrders from "../Page/Dashboard/Admin/AllOrders";
import AddProduct from "../Page/Dashboard/Manager/AddProduct/AddProduct";
import AllProducts from "../Page/Home/AllProducts/AllProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'all-products',
                element: <AllProducts />
            },
        ]
    },
    {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "register",
                element:
                    <div className="bg-secondary">
                        <Register></Register>
                    </div>,
            },
            {
                path: "login",
                element:
                    <div className="bg-secondary">
                        <Login></Login>
                    </div>,
            },
            
        ]
    }
    ,
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: 'manage-users',
                element: <ManageUsers />
            },
            {
                path: 'add-product',
                element: <AddProduct />
            },
            
            {
                path: 'all-orders',
                element: <AllOrders />
            },
        ]
    }
])