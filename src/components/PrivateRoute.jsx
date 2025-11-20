import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Loader from './Loader';

export default function PrivateRoute(){
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Loader />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
