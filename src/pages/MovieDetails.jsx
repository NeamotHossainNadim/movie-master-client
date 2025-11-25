import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../hooks/useAxios";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading movie...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="relative h-[400px] w-full bg-gray-200">
          <img
            src={movie.posterUrl || "/placeholder.jpg"}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-end p-8">
            <h1 className="text-4xl font-extrabold text-white">
              {movie.title}
            </h1>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Plot Summary
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {movie.plotSummary || "No description available."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
              <p><span className="font-semibold text-gray-800">Genre:</span> {movie.genre}</p>
              <p><span className="font-semibold text-gray-800">Release Year:</span> {movie.releaseYear}</p>
              <p><span className="font-semibold text-gray-800">Director:</span> {movie.director}</p>
              <p><span className="font-semibold text-gray-800">Cast:</span> {movie.cast}</p>
              <p><span className="font-semibold text-gray-800">Duration:</span> {movie.duration} mins</p>
              <p><span className="font-semibold text-gray-800">Rating:</span> {movie.rating}/10</p>
              <p><span className="font-semibold text-gray-800">Language:</span> {movie.language}</p>
              <p><span className="font-semibold text-gray-800">Country:</span> {movie.country}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Movie Info
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><span className="font-medium">Genre:</span> {movie.genre}</li>
                <li><span className="font-medium">Year:</span> {movie.releaseYear}</li>
                <li><span className="font-medium">Rating:</span> {movie.rating}/10</li>
              </ul>
            </div>

            <Link
              to="/all-movies"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition shadow-lg"
            >
              ← Back to Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
