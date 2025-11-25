import { useEffect, useState } from "react";
import axios from "../hooks/useAxios";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    axios.get("/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await axios.delete(`/movies/${id}`);

      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch {
      alert("Failed to delete movie. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

      <section className="relative w-full h-[65vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
          alt="Cinema Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Discover Movies Like Never Before
          </h1>
          <p className="mt-4 text-gray-300 text-sm sm:text-base">
            Explore trending, top-rated and hand-picked movies curated just for you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/all-movies">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-lg hover:scale-105 transition">
                Browse Movies
              </button>
            </Link>

            <Link to="/add-movie">
              <button className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-sm backdrop-blur hover:bg-white/20 transition">
                Add Your Movie
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Trending Movies
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Handpicked popular movies
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading movies...</p>
          ) : movies.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No movies found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {movies.map((movie) => (
                <div
                  key={movie._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={movie.posterUrl || "https://media.istockphoto.com/id/2200533576/photo/illuminated-street-at-night.jpg"}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute top-2 left-2 bg-white/90 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                     {movie.rating || "N/A"}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">
                      {movie.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                      {movie.description || "No description available."}
                    </p>

                    <div className="flex justify-between text-[11px] text-gray-400 mb-3">
                      <span>{movie.genre || "Unknown"}</span>
                      <span>{movie.releaseYear || "N/A"}</span>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Link to={`/movies/${movie._id}`} className="flex-1">
                        <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white py-2 rounded-lg font-medium text-xs transition active:scale-[0.98]">
                          View
                        </button>
                      </Link>

                      <Link to={`/update-movie/${movie._id}`} className="flex-1">
                        <button className="w-full bg-white border border-indigo-600 text-indigo-600 py-2 rounded-lg font-medium text-xs hover:bg-indigo-600 hover:text-white transition">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(movie._id)}
                        disabled={deletingId === movie._id}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium text-xs transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === movie._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;
