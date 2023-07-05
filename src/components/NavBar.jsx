import { Link } from 'react-router-dom'
import * as userService from '../utilities/users-service';

export default function NavBar({user, setUser}){
    function handleLogOut(){
        userService.logOut();
        setUser(null);
    }
    
    return(
        <nav>
            <Link to="/orders">Orders</Link>
            <Link to="/orders/new">New Order</Link>
            <h4>Hello, {user.name}</h4>
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}