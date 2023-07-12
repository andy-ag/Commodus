import { useEffect, useState } from 'react';
import CommodityPage from '../CommodityPage/CommodityPage';
import './DashboardPage.css';

export default function DashboardPage() {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  const [commodities, setCommodities] = useState(null);

  useEffect(() => {
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
    <div className="d-flex flex-column align-items-center">
        {commodities.map((commodity, index) => (
          <div key={index}>
            <CommodityPage
              params={commodity.apiParams}
              checkFav={false}
            />
          </div>
        ))}
    </div>
  );
}
