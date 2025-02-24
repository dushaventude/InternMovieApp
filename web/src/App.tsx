import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import HomePage from "./pages/HomePage/HomePage";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Header from "./components/molecules/Header/Header";
import PwResetPage from "./pages/PwResetPage/PwResetPage";
import MovieListPage from "./pages/MovieListPage/MovieListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "movies/:id", element: <MoviePage /> },
      { path: "actors", element: <ActorPage /> },
      { path: "movies", element: <MovieListPage /> },
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
