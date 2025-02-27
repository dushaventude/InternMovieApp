import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorListPage/ActorListPage";
import HomePage from "./pages/HomePage/HomePage";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Header from "./components/molecules/Header/Header";
import PwResetPage from "./pages/PwResetPage/PwResetPage";
import MovieListPage from "./pages/MovieListPage/MovieListPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ErrorBoundary from "./pages/ErrorBoundaryPage/ErrorBoundary";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Movies from "./components/templates/Movies";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "movies/:id", element: <MoviePage /> },
      { path: "actors", element: <ActorPage /> },
      { path: "movies", element: <MovieListPage /> },
      { path: "resetPw", element: <PwResetPage /> },
      {path : "ResetPassword", element : <ResetPassword />}
      {
        path: "dashboard",
        element: <AdminDashboard />,
        children: [
          { index: true, element: <Navigate to="movies" replace /> },
          { path: "movies", element: <Movies />, index: true },
          { path: "actors", element: <Actors /> },
        ],
      },

    ],
  },
]);

function App() {
  return (
    // <ErrorBoundary>
    <RouterProvider router={router} />
    // </ErrorBoundary>
  );
}

export default App;

function Actors() {
  return <div>Actors</div>;
}
