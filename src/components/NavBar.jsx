import { Link } from 'react-router-dom'
import * as userService from '../utilities/users-service';

export default function NavBar({user, setUser}){
    function handleLogOut(){
        userService.logOut();
        setUser(null);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <span className="navbar-brand mb-0 h1 mr-3">Name</span>
              <div className="border-right pr-3 mr-3"></div>
              <div className="navbar-nav">
                <Link className="nav-link" to="/">
                    Home
                </Link>
                <Link className="nav-link" to="/items">
                    Items
                </Link>
                <Link className="nav-link" to="/items/new">
                    New Item
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="navbar-nav">
                {user && (
                  <div className="d-flex align-items-center mr-5">Hello, {user.name}</div>
                )}
                <Link className="nav-link" to="/settings">
                    Settings
                </Link>
                {user ? (
                  <Link className="nav-link" to="" onClick={handleLogOut}>
                        Sign Out
                  </Link>
                ) : (
                  <>
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                    <Link className="nav-link" to="/signin">
                        Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      );
}