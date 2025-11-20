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
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Add New Movie
      </h2>
      <p className="text-gray-500 mb-6">
        Fill in the details below to add a new movie.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Movie Title</label>
            <input
              name="title"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter movie title"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Genre</label>
            <input
              name="genre"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Action, Drama, Sci-Fi..."
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Release Year</label>
            <input
              name="releaseYear"
              type="number"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="2024"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Rating</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="8.5"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Director</label>
            <input
              name="director"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Director name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Cast</label>
            <input
              name="cast"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Main actors"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Duration (minutes)</label>
            <input
              name="duration"
              type="number"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="120"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Poster Image URL</label>
            <input
              name="posterUrl"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="https://image-url.com"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Plot Summary</label>
          <textarea
            name="plotSummary"
            rows="4"
            className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Write short plot summary..."
          ></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Language</label>
            <input
              name="language"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="English, Hindi, Korean..."
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Country</label>
            <input
              name="country"
              className="w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="USA, Korea, India..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          {saving ? "Saving..." : "Add Movie"}
        </button>
      </form>
    </div>
  </div>
);

}
