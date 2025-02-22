import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Header from "./components/molecules/Header/Header";
import PwResetPage from "./pages/PwResetPage/PwResetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "movies", element: <HomePage /> },
      { path: "actors", element: <HomePage /> },
      {path: "resetPw", element: <PwResetPage />},
    ],
  },
]);


function App() {
  return (
  <RouterProvider router={router} />
  );
}

export default App;
