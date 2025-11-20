import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../hooks/useAxios";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
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

    const updated = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: Number(form.releaseYear.value),
    };

    try {
      await axios.put(`/movies/${id}`, updated);
      toast.success("Movie updated ✅");
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Update Movie</h2>

      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          name="title"
          defaultValue={movie.title}
          className="w-full p-3 border rounded"
        />
        <input
          name="genre"
          defaultValue={movie.genre}
          className="w-full p-3 border rounded"
        />
        <input
          name="releaseYear"
          defaultValue={movie.releaseYear}
          className="w-full p-3 border rounded"
          type="number"
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
