import axios from "axios";

export default function AddMovie() {

  const handleAdd = e => {
    e.preventDefault();
    const form = e.target;

    const movie = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: form.releaseYear.value
    };

    axios.post("http://localhost:5000/movies", movie)
      .then(() => alert("Movie Added"));
  };

  return (
    <form onSubmit={handleAdd}>
      <input name="title" placeholder="Title" />
      <input name="genre" placeholder="Genre" />
      <input name="releaseYear" placeholder="Year" />
      <button type="submit">Add Movie</button>
    </form>
  );
}
