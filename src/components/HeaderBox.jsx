import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import './HeaderBox.css'
import InfoBox from './InfoBox'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function HeaderBox({ text, add, fav, apiParams, removeFromFavourites=null, isStandalone, info=false}) {
    const [isFav, setFav] = useState(fav)
    const token = localStorage.getItem('token')
    async function handleFav() {
        try {
            const response = await fetch(`/api/commodities/${encodeURIComponent(apiParams)}/favourite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({apiParams: apiParams})
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const res = await response.json();
            // Update the state based on the server response
            if (res === 'added') {
                setFav(true);
                toast.success('Added to dashboard', {
                    iconTheme: {
                      primary: 'var(--accent)',
                      secondary: 'white',
                    },
                  });
            } else if (res === 'removed') {
                setFav(false);
                toast.error('Removed from dashboard', {
                    iconTheme: {
                        primary: '#CE2D4F',
                        secondary: 'white',
                    },
                });
                if (removeFromFavourites) removeFromFavourites(apiParams)
            }
        } catch (error) {
            console.error(`Error adding commodity to dashboard: ${error.message}`);
            toast.error('Error adding commodity to dashboard', {
                iconTheme: {
                    primary: '#CE2D4F',
                    secondary: 'white',
                },
            });
        }
    }
    
    return(
        <div className="header-box d-flex justify-content-between align-items-center mt-3">
            <h1>{text}</h1>
            {add && (
                isStandalone ? (isFav ? <FontAwesomeIcon className="toggleSaveCommodity" icon={faSquareMinus} onClick={handleFav}/> : <FontAwesomeIcon className="toggleSaveCommodity" icon={faSquarePlus} onClick={handleFav}/>) : <FontAwesomeIcon className="toggleSaveCommodity" icon={faSquareMinus} onClick={handleFav}/>
            )}
            {info && <div className="info-box-container"><InfoBox selectedAnalysis={text} /></div>}
        </div>
    )
}
