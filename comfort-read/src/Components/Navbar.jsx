
import "../App.css";
import {Link} from "react-router-dom"

function Navbar() {
    return (
        <div className="Navbar">
            <div><Link className = "NavbarItem" to = "/">Home</Link></div>
            <div><Link className = "NavbarItem" to = "/login">Log In</Link></div>
        </div>
    );
}

export default Navbar;