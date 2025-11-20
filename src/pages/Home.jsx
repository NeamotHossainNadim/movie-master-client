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
    <div>
      <h1>Movies</h1>
      {movies.map(movie => (
        <p key={movie._id}>{movie.title}</p>
      ))}
    </div>
  );
};

export default Home;
