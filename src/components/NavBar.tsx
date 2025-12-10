import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  return (
    <nav className="text-white flex justify-between w-full bg-zinc-900">
      <NavLink to="/">Home</NavLink>
      
      <NavLink to="/projects">Projects</NavLink>
      {/* <NavLink to='/register'>Register</NavLink>*/}
     
      {isAuthenticated ? (
        <button className="px-4 py-2 bg-red-600 rounded" onClick={logout}>
          Logout
        </button>
      ) : (
        <NavLink to="/login" className="px-4 py-2 bg-blue-600 rounded">
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default NavBar;
