import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          🎬 MiniTok
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
            Dashboard
          </Link>

          {token && role === "creator" && (
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Upload
            </Link>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
