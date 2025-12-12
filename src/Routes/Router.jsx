import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout/MainLayout";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Register from "../Page/Auth/Register/Register";
import Login from "../Page/Auth/Login/Login";
import ErrorPage from "../Page/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import DashboardHome from "../Page/Dashboard/Common/DashboardHome";
import AllOrders from "../Page/Dashboard/Admin/AllOrders";
import AddProduct from "../Page/Dashboard/Manager/AddProduct/AddProduct";
import AllProducts from "../Page/Home/AllProducts/AllProducts";
import ProductDetails from "../Page/Dashboard/Buyer/ProductDetails";
import ManageUsers from "../Page/Dashboard/Admin/ManageUsers";
import MyOrders from "../Page/Dashboard/User/MyOrders";

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
                path: 'products',
                element: <AllProducts />
            },
            {
                path: 'product/:id',
                element: <ProductDetails />,
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
            {
                path: 'all-products',
                element: <AllProducts />
            },
            {
                path: 'my-orders',
                element: <MyOrders/>
            },
        ]
    }
])