import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          CarRental
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/cars">Cars</Link>
          <Link className="nav-link" to="/my-bookings">My Bookings</Link>
          <Link className="nav-link" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;