import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <AllMovies /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "test-api", element: <TestApi /> },   // ✅ API Test Route
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },

      {
        element: <PrivateRoute />,
        children: [
          { path: "movies/add", element: <AddMovie /> },
          { path: "movies/my-collection", element: <MyCollection /> },
          { path: "movies/update/:id", element: <UpdateMovie /> }
        ]
      }
    ]
  }
]);
