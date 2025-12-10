import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="w-full bg-zinc-900 text-white px-6 py-10 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left side — Logo */}
        <div className="text-xl font-bold tracking-wide">
          <NavLink to="/" className="hover:text-sky-400 transition">
            MyApp
          </NavLink>
        </div>

        {/* Middle links */}
        <div className="flex gap-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-sky-400 transition ${
                isActive ? "text-sky-400 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `hover:text-sky-400 transition ${
                isActive ? "text-sky-400 font-semibold" : ""
              }`
            }
          >
            Projects
          </NavLink>
        </div>

        {/* Right side — Login/Logout */}
        <div>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 transition rounded"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
