import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <nav className="text-white flex justify-between w-full">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/projects'>Projects</NavLink>
            
        </nav>
    )
}

export default NavBar;