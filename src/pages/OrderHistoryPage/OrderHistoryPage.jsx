import './OrderHistoryPage.css';
import {checkToken} from '../../utilities/users-service'

export default function OrderHistoryPage() {
    async function handleCheckToken(){
        const expDate = await checkToken()
        console.log(expDate)
    }

    return(
        <div>  
            <h1>Order History</h1>
            <button onClick={handleCheckToken}>Check login expiry</button>
        </div>  
    ) 
}