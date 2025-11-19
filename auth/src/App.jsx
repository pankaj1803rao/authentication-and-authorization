import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import Home from "./components/home/Home";
import Header from "./common/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/* <h1>Auth</h1> */}
    </>
  );
}

export default App;
