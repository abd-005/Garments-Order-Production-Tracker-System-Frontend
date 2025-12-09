import { createBrowserRouter } from "react-router";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout/MainLayout";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Register from "../Page/Auth/Register/Register";
import Login from "../Page/Auth/Login/Login";
import ErrorPage from "../Page/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home />
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
])