import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-3xl font-extrabold mb-3 flex items-center gap-2">
            🎬 MovieMaster
          </h2>
          <p className="text-white/80 leading-relaxed">
            Discover, explore and manage your favorite movies. Your ultimate
            entertainment companion.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-white/90">
            <li>
              <Link to="/" className="hover:underline hover:text-indigo-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="hover:underline hover:text-indigo-200">
                All Movies
              </Link>
            </li>
            <li>
              <Link to="/movies/add" className="hover:underline hover:text-indigo-200">
                Add Movie
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline hover:text-indigo-200">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:scale-110 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <Twitter />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <Youtube />
            </a>
          </div>

          <p className="text-sm text-white/80 mb-3">
            Subscribe to get latest movie updates
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg w-full text-black outline-none"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} MovieMaster. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
