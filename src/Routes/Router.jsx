import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/Common/DashboardHome";
import AllOrders from "../pages/Dashboard/Admin/AllOrders/AllOrders";
import AddProduct from "../pages/Dashboard/Manager/AddProduct/AddProduct";
import AllProducts from "../pages/Home/AllProducts/AllProducts";
import ProductDetails from "../pages/Dashboard/Common/ProductDetails";
import MyOrders from "../pages/Dashboard/Buyer/MyOrders";
import PaymentSuccess from "../pages/Dashboard/Buyer/PaymentSuccess";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts/ManageProducts";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders/PendingOrders";
import ApproveOrders from "../pages/Dashboard/Manager/ApprovedOrders/ApprovedOrders";
import MyProfile from "../pages/Dashboard/Common/MyProfile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import BuyerRoute from "./BuyerRoute";
import AllAdminProducts from "../pages/Dashboard/Admin/AllAdminProducts/AllAdminProducts";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import TrackOrder from "../pages/Dashboard/Buyer/TrackOrder";
import TrackOrderList from "../pages/Dashboard/Buyer/TrackOrderList";
import OrderDetails from "../pages/Dashboard/Admin/AllOrders/OrderDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Help from "../pages/Help/Help";
import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";

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
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'product/:id',
                element: <PrivateRoute>
                    <ProductDetails />
                </PrivateRoute>
            },
            {
                path: 'help',
                element: <Help />
            },
            {
                path: 'privacy',
                element: <Privacy />
            },
            {
                path: 'terms-conditions',
                element: <Terms />
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
                path: 'order-details/:orderId',
                element:
                    <PrivateRoute>
                        <AdminRoute>
                            <OrderDetails />
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
                        <PaymentSuccess />
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
                path: 'track-order',
                element:
                    <PrivateRoute>
                        <BuyerRoute>
                            <TrackOrderList />
                        </BuyerRoute>
                    </PrivateRoute>
            },
            {
                path: 'track-order/:orderId',
                element:
                    <PrivateRoute>
                        <BuyerRoute>
                            <TrackOrder />
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