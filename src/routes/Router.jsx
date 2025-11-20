import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import MovieDetails from "../pages/MovieDetails";
import AddMovie from "../pages/AddMovie";
import MyCollection from "../pages/MyCollection";
import UpdateMovie from "../pages/UpdateMovie";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import TestApi from "../pages/TestApi";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      // ✅ Public Routes
      { path: "all-movies", element: <AllMovies /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "test-api", element: <TestApi /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // ✅ Protected Routes
      {
        element: <PrivateRoute />,
        children: [
          { path: "add-movie", element: <AddMovie /> },
          { path: "my-collection", element: <MyCollection /> },
          { path: "update-movie/:id", element: <UpdateMovie /> },
        ],
      },

      // ✅ Not Found
      { path: "*", element: <NotFound /> },
    ],
  },
]);
