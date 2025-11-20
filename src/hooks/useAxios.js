import axios from 'axios';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://movie-master-server-sigma.vercel.app'
});
export default instance;
