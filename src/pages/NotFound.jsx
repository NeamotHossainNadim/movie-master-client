import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4">
      <div className="text-8xl mb-6 animate-bounce"></div>
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-indigo-100 mb-8 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-semibold text-lg shadow-lg hover:bg-gray-100 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
