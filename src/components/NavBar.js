import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid"> {/* Wrap navbar content in container-fluid */}
        <Link className="navbar-brand" to="/">School ™</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto"> {/* Use ms-auto to push items to the right */}
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
