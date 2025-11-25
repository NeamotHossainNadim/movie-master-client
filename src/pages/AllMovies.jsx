import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";

export default function AllMovies() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    axios
      .get("/movies")
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

    if (!user?.email) {
      alert("You must be logged in to delete movies.");
      return;
    }

    try {
      setDeletingId(id);

      await axios.delete(`/movies/${id}`, {
        headers: {
          "user-email": user.email
        }
      });

      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "Failed to delete movie.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100">
        <div className="animate-pulse text-xl font-semibold text-zinc-500">
          Loading movies...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-14 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Movie Collection
        </h2>

        {movies.length === 0 ? (
          <p className="text-center text-lg text-zinc-500">
            No movies available right now.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="group relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 text-[10px] font-semibold bg-white/90 text-indigo-700 rounded-full">
                      {movie.genre}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                      {movie.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-zinc-600 font-medium">
                    <span>{movie.rating || "N/A"}</span>
                    <span>{movie.releaseYear}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/movies/${movie._id}`}
                      className="text-center py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02] transition-all"
                    >
                      View Details
                    </Link>

                    <div className="flex gap-2">
                      <Link
                        to={`/update-movie/${movie._id}`}
                        className="flex-1 text-center py-2 rounded-lg text-sm font-semibold bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(movie._id)}
                        disabled={deletingId === movie._id}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === movie._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
