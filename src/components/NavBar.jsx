import { Link } from 'react-router-dom'
import * as userService from '../utilities/users-service';
import './NavBar.css'
import { toast } from 'react-hot-toast'

export default function NavBar({user, setUser}){
    function handleLogOut(){
        userService.logOut();
        setUser(null);
        toast.success('You have been signed out', {
          iconTheme: {
            primary: 'var(--accent)',
            secondary: 'white',
          },
        });
    }

    return (
      <nav className="navbar navbar-expand-md px-3">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Commodus</span>
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
            <ul className="navbar-nav me-auto d-flex justify-content-around nav-links">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {user ? (
                <>
                <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link" to="" onClick={handleLogOut}>
                    Sign out
                  </Link>
                </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
}