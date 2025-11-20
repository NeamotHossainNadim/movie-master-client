import { useEffect, useState } from "react";
import axios from "axios";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/movies")
      .then(res => setMovies(res.data));
  }, []);

  return (
    <div>
      <h2>All Movies</h2>
      {movies.map(movie => (
        <div key={movie._id}>
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
        </div>
      ))}
    </div>
  );
}
