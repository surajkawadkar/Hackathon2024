import { NavLink } from 'react-router-dom';
import './Navbarcss.css';
function Navbar() {
    return (
        <nav className="navbar">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/upload-stock" activeClassName="active">Upload Stock</NavLink>
            <NavLink to="/submit-form" activeClassName="active">preApproval Form</NavLink>
        </nav>
    );
}

export default Navbar;
