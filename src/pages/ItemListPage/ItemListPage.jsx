import './ItemListPage.css';
import {checkToken} from '../../utilities/users-service'

export default function ItemListPage() {
    async function handleCheckToken(){
        const expDate = await checkToken()
        if (expDate.error) {
            console.log("Error fetching token expiration date:", expDate.error);
        } else {
            console.log(expDate);
        }
    }

    return(
        <div>  
            <h1>Item List</h1>
            <button onClick={handleCheckToken}>Check login expiry</button>
        </div>  
    ) 
}