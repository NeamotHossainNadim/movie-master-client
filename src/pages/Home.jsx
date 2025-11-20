import { useEffect, useState } from 'react';
import axios from '../hooks/useAxios';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Discover Movies
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Explore trending and popular movies curated for you
          </p>
        </div>

        {movies.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No movies found.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map(movie => (
              <div
                key={movie._id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >

                <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                  <img
                    src={movie.posterUrl || "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 mb-1 truncate">
                    {movie.title}
                  </h2>

                  <p className="text-sm text-gray-500 flex-grow line-clamp-3">
                    {movie.description?.slice(0, 100) || "No description available."}
                  </p>

                  <button className="mt-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
