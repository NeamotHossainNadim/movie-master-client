import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthProvider";

const UpdateMovie = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/movies/${id}`);
        setMovie(res.data);
      } catch {
        toast.error("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedMovie = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: Number(form.releaseYear.value),
      posterUrl: form.posterUrl.value,
      description: form.description.value,
      userEmail: user?.email,
    };

    try {
      await axios.put(`/movies/${id}`, updatedMovie);
      toast.success("Movie updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Update Movie
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            name="title"
            defaultValue={movie.title}
            placeholder="Movie Title"
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="genre"
            defaultValue={movie.genre}
            placeholder="Genre"
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="releaseYear"
            type="number"
            defaultValue={movie.releaseYear}
            placeholder="Release Year"
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="posterUrl"
            defaultValue={movie.posterUrl}
            placeholder="Poster URL"
            className="w-full p-3 border rounded-lg"
            required
          />

          <textarea
            name="description"
            defaultValue={movie.description}
            placeholder="Description"
            rows="4"
            className="w-full p-3 border rounded-lg"
            required
          ></textarea>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Update Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
