import { useEffect, useState, useReducer, useRef } from 'react';
import { useCallback } from 'react'
import CommodityPage from '../CommodityPage/CommodityPage';
import './DashboardPage.css';
import HeaderBox from '../../components/HeaderBox';
import { toast } from 'react-hot-toast'

export default function DashboardPage() {
  const token = localStorage.getItem('token');
  const [commodities, setCommodities] = useState(null);
  const [loading, setLoading] = useState(false);
  const toastIdRef = useRef(null);
  const [commoditiesLoaded, dispatch] = useReducer(commoditiesLoadedReducer, []);

  function commoditiesLoadedReducer(state, action) {
    switch (action.type) {
      case 'add':
        return [...state, action.commodity];
      case 'reset':
        return [];
      default:
        throw new Error();
    }
  };

  function removeFromFavourites(commodityToRemove) {
    setCommodities(oldCommodities => oldCommodities.filter(commodity => commodity.apiParams !== commodityToRemove));
  }
  
  const onCommodityLoaded = useCallback((commodity) => {
    dispatch({ type: 'add', commodity });
    if (commoditiesLoaded.length + 1 === commodities.length) {  // Note the "+ 1"
      setLoading(false);
      toast.dismiss(toastIdRef.current);
      dispatch({ type: 'reset' });
  }
  }, [commoditiesLoaded, commodities])

  useEffect(() => {
    if (!token) return
    setLoading(true);
    toastIdRef.current = toast.loading('Constructing dashboard', {
      iconTheme: {
        primary: 'var(--accent)',
        secondary: 'white',
      },
    })
    const fetchUserCommodities = async () => {
      try {
        const response = await fetch('/api/commodities/favourites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const userCommodities = await response.json();
        setCommodities(userCommodities);
      } catch (error) {
        console.error(`Error fetching user commodities: ${error.message}`);
        toast.dismiss(toastIdRef.current);
        toast.error('Error loading dashboard')
        dispatch({ type: 'reset' });
      }
    };

    fetchUserCommodities();
  }, [token]);

  if (!token) {
    return(
      <>
      <HeaderBox text={'Your dashboard'} add={false} fav={false} apiParams={null}/>
      <h2 className="mt-5 w-50">Create an account to construct your own commodity dashboard! You can then save any number of commodities for quick and convenient access.</h2>
      </>

    )
  }

  if (commodities === null) {
    return (
    <>
      <HeaderBox text={'Your dashboard'} add={false} fav={false} apiParams={null}/>
    </>
    )
  } else if (commodities.length === 0){
    return (
      <>
        <HeaderBox text={'Your dashboard'} add={false} fav={false} apiParams={null}/>
        <h2 className="mt-5 w-50">There's nothing here! You can save any number of commodities for quick and convenient access by clicking on the plus icon next to their name.</h2>
      </>
      )
  }

  return (
    <>
    <HeaderBox text={'Your dashboard'} add={false} fav={false} apiParams={null}/>
    <div className="container-fluid">
        {commodities.map((commodity, index) => (
          <div className="row justify-content-center" key={index}>
                <div className="commodityPage my-4">
                    <CommodityPage
                    params={commodity.apiParams}
                    checkFav={true}
                    index={index}
                    removeFromFavourites={removeFromFavourites}
                    loading={loading}
                    onCommodityLoaded={() => onCommodityLoaded(commodity)}
                    isStandalone={false}
                    />
                </div>
          </div>
        ))}
    </div>
    </>
  );
}
