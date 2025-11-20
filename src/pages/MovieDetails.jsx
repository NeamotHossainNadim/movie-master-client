import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/movies/${id}`)
      .then(res => setMovie(res.data));
  }, [id]);

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.genre}</p>
      <p>{movie.releaseYear}</p>
    </div>
  );
}
