import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/login";
import DashboardUser from "../pages/dashboard/dashboardUser/dashboardUser";
import NotFound from "../pages/404notfound";
import AddUser from "../pages/dashboard/dashboardUser/addUser";
import Register from "@/pages/register";
import DetailUser from "@/pages/dashboard/dashboardUser/detailUser";

export default function Route() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "*", element: <NotFound /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard/user", element: <DashboardUser /> },
    { path: "/dashboard/user/add", element: <AddUser /> },
    { path: "/dashboard/user/:id", element: <DetailUser /> },
    // { path: "/dashboard/product", element: <DashboardProduct /> },
  ]);
  return <RouterProvider router={router} />;
}
