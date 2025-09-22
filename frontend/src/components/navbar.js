import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          LiveBeats
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" to="/concerts">
                Concerts
              </Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link text-light" to="/bookings">
                Bookings
              </Link>
            </li>

            {/* Example: If user is logged in */}
            {localStorage.getItem("token") ? (
              <>
                <li className="nav-item mx-2">
                  <button
                    className="btn btn-outline-danger btn-sm shadow-sm rounded-3 px-3"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-light" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-light" to="/signup">
                    REGISTER
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
