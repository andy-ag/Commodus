import { useEffect, useState } from 'react';
import CommodityPage from '../CommodityPage/CommodityPage';
import './DashboardPage.css';
import HeaderBox from '../../components/HeaderBox';

export default function DashboardPage() {
  const token = localStorage.getItem('token');
  const [commodities, setCommodities] = useState(null);

  function removeFromFavourites(commodityToRemove) {
    setCommodities(commodities.filter(commodity => commodity !== commodityToRemove));
  }

  useEffect(() => {
    if (!token) return
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
      }
    };

    fetchUserCommodities();
  }, [token]);

  if (commodities === null) {
    return <div>Loading...</div>;
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
                    removeFromFavourites={() => removeFromFavourites(commodity.apiParams)}
                    />
                </div>
          </div>
        ))}
    </div>
    </>
  );
}
