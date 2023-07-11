import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import './HeaderBox.css'

export default function HeaderBox({ text, add, fav }) {
    return(
        <div className="header-box d-flex justify-content-between align-items-center mt-3">
            <h1>{text}</h1>
            {add && (
                fav ? <FontAwesomeIcon className="toggleSaveCommodity" icon={faSquareMinus} /> : <FontAwesomeIcon className="toggleSaveCommodity" icon={faSquarePlus} />
            )}
        </div>
    )
}
