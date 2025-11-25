import { useEffect, useState } from "react";
import axios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import { Trash2 } from "lucide-react";

export default function MyCollection() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`/my-movies?email=${user.email}`)
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this movie?");
    if (!confirm) return;

    try {
      await axios.delete(`/movies/${id}`);
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (err) {
      alert("Failed to delete movie");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
        Loading your collection...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">
          My Movie Collection
        </h1>

        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4221/4221419.png"
              alt="empty"
              className="w-40 mb-6 opacity-80"
            />
            <p className="text-gray-500 text-lg">
              You haven't added any movies yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-4 flex flex-col"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-2xl"
                />

                <div className="flex-1 py-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {movie.genre} • {movie.duration} mins
                  </p>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {movie.description}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(movie._id)}
                  className="mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
