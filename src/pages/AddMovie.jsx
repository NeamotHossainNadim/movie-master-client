import { useContext, useState } from "react";
import axios from "../hooks/useAxios";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

export default function AddMovie() {
  const { user } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Please login first");
    }

    const data = {
      title: e.target.title.value,
      genre: e.target.genre.value,
      releaseYear: Number(e.target.releaseYear.value),
      director: e.target.director.value,
      cast: e.target.cast.value,
      rating: Number(e.target.rating.value) || 0,
      duration: Number(e.target.duration.value) || 0,
      plotSummary: e.target.plotSummary.value,
      posterUrl: e.target.posterUrl.value,
      language: e.target.language.value,
      country: e.target.country.value,
      addedBy: user.email,
    };

    try {
      setSaving(true);
      await axios.post("/movies", data);
      toast.success("Movie added");
      e.target.reset();
    } catch (err) {
      toast.error("Failed to add movie");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Movie</h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input name="title" className="w-full p-2 border rounded" placeholder="Title" required />
        <input name="genre" className="w-full p-2 border rounded" placeholder="Genre" required />

        <div className="grid grid-cols-2 gap-3">
          <input name="releaseYear" className="p-2 border rounded" placeholder="Year" required />
          <input name="rating" className="p-2 border rounded" placeholder="Rating" />
        </div>

        <input name="director" className="w-full p-2 border rounded" placeholder="Director" />
        <input name="cast" className="w-full p-2 border rounded" placeholder="Cast" />
        <input name="duration" className="w-full p-2 border rounded" placeholder="Duration (mins)" />
        <input name="posterUrl" className="w-full p-2 border rounded" placeholder="Poster URL" />

        <textarea name="plotSummary" className="w-full p-2 border rounded" placeholder="Plot summary" />

        <input name="language" className="w-full p-2 border rounded" placeholder="Language" />
        <input name="country" className="w-full p-2 border rounded" placeholder="Country" />

        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
}
