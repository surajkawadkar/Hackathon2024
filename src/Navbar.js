import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/upload-stock" activeClassName="active">Upload Stock</NavLink>
            <NavLink to="/submit-form" activeClassName="active">Submit Form</NavLink>
        </nav>
    );
}

export default Navbar;
