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
import PwResetPage from "./pages/PwResetPage/PwResetPage";
import MovieListPage from "./pages/MovieListPage/MovieListPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Movies from "./components/templates/Movies";
import Actors from "./components/templates/Actors";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute ";
import PrivateRoute from "./routes/PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [

	 { path: "", element: <HomePage /> },


      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "resetPw", element: <PwResetPage /> },
          { path: "resetPassword", element: <ResetPassword /> },
          { path: "movies/:id", element: <MoviePage /> },
          { path: "actors", element: <ActorPage /> },
          { path: "movies", element: <MovieListPage /> },
        ],
      },

      {
        element: <PrivateRoute />,
        children: [],
      },
	   {
        path: "dashboard",
		 element: <AdminRoute />,
        children: [
          { index: true, element: <Navigate to="movies" replace /> },
		            { path: "movies", element: <Movies /> },
          { path: "actors", element: <Actors /> },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
return <RouterProvider router={router} />;
}


export default App;

