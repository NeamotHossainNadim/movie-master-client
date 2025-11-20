import { useEffect, useState } from "react";
import axios from "../hooks/useAxios";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading movies...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">🎬 All Movies</h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-xl mb-3"
              />
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <p className="text-gray-600">{movie.genre}</p>
              <p className="text-sm mt-1">⭐ {movie.rating}</p>
              <p className="text-sm mt-1">{movie.releaseYear}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
