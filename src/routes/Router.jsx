import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import AddMovie from "../pages/AddMovie";
import MovieDetails from "../pages/MovieDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movies", element: <AllMovies /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "/add-movie", element: <AddMovie /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> }
    ]
  }
]);
