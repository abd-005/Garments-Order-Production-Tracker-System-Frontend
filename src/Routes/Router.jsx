import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout/MainLayout";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Register from "../Page/Auth/Register/Register";
import Login from "../Page/Auth/Login/Login";
import ErrorPage from "../Page/ErrorPage";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import DashboardHome from "../Page/Dashboard/Common/DashboardHome";
import AllOrders from "../Page/Dashboard/Admin/AllOrders/AllOrders";
import AddProduct from "../Page/Dashboard/Manager/AddProduct/AddProduct";
import AllProducts from "../Page/Home/AllProducts/AllProducts";
import ProductDetails from "../Page/Dashboard/Common/ProductDetails";
import MyOrders from "../Page/Dashboard/User/MyOrders";
import PaymentSuccess from "../Page/Dashboard/User/PaymentSuccess";
import ManageProducts from "../Page/Dashboard/Manager/ManageProducts/ManageProducts";
import PendingOrders from "../Page/Dashboard/Manager/PendingOrders/PendingOrders";
import ApproveOrders from "../Page/Dashboard/Manager/ApprovedOrders/ApprovedOrders";
import MyProfile from "../Page/Dashboard/Common/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import BuyerRoute from "./BuyerRoute";
import AllAdminProducts from "../Page/Dashboard/Admin/AllAdminProducts/AllAdminProducts";
import ManageUsers from "../Page/Dashboard/Admin/ManageUsers/ManageUsers";

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
                element: <PrivateRoute>
                    <ProductDetails />
                </PrivateRoute>
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
        element:
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>,
        children: [
            {
                index: true,
                element: <PrivateRoute>
                    <DashboardHome />
                </PrivateRoute>
            },
            {
                path: 'manage-users',
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <ManageUsers />
                        </AdminRoute>
                    </PrivateRoute>
            },
            {
                path: 'all-orders',
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AllOrders />
                        </AdminRoute>
                    </PrivateRoute>
            },
            {
                path: 'all-products',
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <AllAdminProducts />
                        </AdminRoute>
                    </PrivateRoute>
            },
            {
                path: 'add-product',
                element:
                    <PrivateRoute>
                        <ManagerRoute>
                            <AddProduct />
                        </ManagerRoute>
                    </PrivateRoute>
            },
            {
                path: 'manage-products',
                element:
                    <PrivateRoute>
                        <ManagerRoute>
                            <ManageProducts />
                        </ManagerRoute>
                    </PrivateRoute>
            },
            {
                path: 'pending-orders',
                element:
                    <PrivateRoute>
                        <ManagerRoute>
                            <PendingOrders />
                        </ManagerRoute>
                    </PrivateRoute>
            },
            {
                path: 'approved-orders',
                element:
                    <PrivateRoute>
                        <ManagerRoute>
                            <ApproveOrders />
                        </ManagerRoute>
                    </PrivateRoute>
            },

            {
                path: 'payment-success',
                element:
                    <PrivateRoute>
                        <BuyerRoute>
                            <PaymentSuccess />
                        </BuyerRoute>
                    </PrivateRoute>
            },
            {
                path: 'my-orders',
                element:
                    <PrivateRoute>
                        <BuyerRoute>
                            <MyOrders />
                        </BuyerRoute>
                    </PrivateRoute>
            },
            {
                path: 'profile',
                element:
                    <PrivateRoute>
                        <MyProfile />
                    </PrivateRoute>
            },
        ]
    }
])