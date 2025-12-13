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
import ProductDetails from "../Page/Dashboard/Common/ProductDetails";
import ManageUsers from "../Page/Dashboard/Admin/ManageUsers";
import MyOrders from "../Page/Dashboard/User/MyOrders";
import PaymentSuccess from "../Page/Dashboard/User/PaymentSuccess";
import ManageProducts from "../Page/Dashboard/Manager/ManageProducts/ManageProducts";
import PendingOrders from "../Page/Dashboard/Manager/PendingOrders/PendingOrders";
import ApproveOrders from "../Page/Dashboard/Manager/ApprovedOrders/ApprovedOrders";
import MyProfile from "../Page/Dashboard/Common/MyProfile";

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
                path: 'all-orders',
                element: <AllOrders />
            },
            {
                path: 'all-products',
                element: <AllProducts />
            },
            {
                path: 'add-product',
                element: <AddProduct />
            },
            {
                path: 'manage-products',
                element: <ManageProducts />,
            },
            {
                path: 'pending-orders',
                element: <PendingOrders />,
            },
            {
                path: 'approved-orders',
                element: <ApproveOrders />,
            },

            {
                path: 'payment-success',
                element: <PaymentSuccess />
            },
            {
                path: 'my-orders',
                element: <MyOrders />
            },
            {
                path: 'profile',
                element: <MyProfile />
            },
        ]
    }
])