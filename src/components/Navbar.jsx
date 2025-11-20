import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-300 font-semibold"
      : "hover:text-indigo-200 transition";

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        
        <Link to="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          🎬 MovieMaster
        </Link>

        
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/all-movies" className={navLinkClass}>All Movies</NavLink>

          {user ? (
            <>
              <NavLink to="/add-movie" className={navLinkClass}>
                Add Movie
              </NavLink>

              <NavLink to="/my-collection" className={navLinkClass}>
                My Collection
              </NavLink>

             
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt="user"
                  className="w-9 h-9 rounded-full border-2 border-white"
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              <NavLink
                to="/register"
                className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-indigo-700">
          <NavLink onClick={() => setOpen(false)} to="/" className={navLinkClass}>Home</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/all-movies" className={navLinkClass}>All Movies</NavLink>

          {user ? (
            <>
              <NavLink onClick={() => setOpen(false)} to="/add-movie" className={navLinkClass}>
                Add Movie
              </NavLink>

              <NavLink onClick={() => setOpen(false)} to="/my-collection" className={navLinkClass}>
                My Collection
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink onClick={() => setOpen(false)} to="/login" className={navLinkClass}>Login</NavLink>
              <NavLink
                onClick={() => setOpen(false)}
                to="/register"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium w-fit"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
