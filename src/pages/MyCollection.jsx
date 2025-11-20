import { useContext, useEffect, useState } from "react";
import axios from "../hooks/useAxios";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyMovies = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(`/movies?email=${user.email}`);
        setMovies(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your collection");
      } finally {
        setLoading(false);
      }
    };

    fetchMyMovies();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading your movies...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">
          🎬 My Movie Collection
        </h2>

        {movies.length === 0 ? (
          <p className="text-gray-500 text-lg">
            You haven't added any movies yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-500">
                    {movie.genre} • {movie.releaseYear}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    {/* ✅ View Button - Correct */}
                    <Link
                      to={`/movies/${movie._id}`}
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      View
                    </Link>

                    {/* ✅ Edit Button - FIXED */}
                    <Link
                      to={`/update-movie/${movie._id}`}
                      className="text-sm bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
