import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import { Toaster } from 'react-hot-toast'
import HomePage from '../HomePage/HomePage'
import CommodityPage from '../CommodityPage/CommodityPage'
import DashboardPage from '../DashboardPage/DashboardPage'
import ComparePage from '../ComparePage/ComparePage'
import CommoditiesContext from '../../components/commoditiesContext'
import SettingsPage from '../SettingsPage/SettingsPage'
import ContactPage from '../ContactPage/ContactPage'
import PrivacyPage from '../PrivacyPage/PrivacyPage'
import FaqPage from '../FaqPage/FaqPage'
import TermsPage from '../TermsPage/TermsPage'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import RegisterPage from '../RegisterPage/RegisterPage';
import SigninPage from '../SigninPage/SigninPage';
import { set, get } from 'idb-keyval';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [commodities, setCommodities] = useState(null)

  useEffect(() => {
    async function fetchCommodities() {
      // Check cache
      const storedCommodities = await get('commodities');

      if (storedCommodities) {
        setCommodities(storedCommodities);
      }

      try {
        console.log('Getting commodities')  
        const response = await fetch('/api/commodities/index');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          let data = await response.json();

          const customOrder = ['LBMA/GOLD', 'LBMA/SILVER', 'OPEC/ORB'];

          let customOrderCommodities = data.filter(commodity => customOrder.includes(commodity._doc.apiParams));
          let otherCommodities = data.filter(commodity => !customOrder.includes(commodity._doc.apiParams));

          customOrderCommodities.sort((a, b) => customOrder.indexOf(a._doc.apiParams) - customOrder.indexOf(b._doc.apiParams));
          otherCommodities.sort((a, b) => a._doc.name.localeCompare(b._doc.name));

          data = [...customOrderCommodities, ...otherCommodities];
          setCommodities(data);
          set('commodities', data);
      } catch (error) {
          console.error('Fetching commodities failed:', error);
      }
    }
    fetchCommodities();
}, []);

  return (
    <CommoditiesContext.Provider value={commodities}> 
      <main className="App">
        <Toaster containerStyle={{
          top: 5,
          height: '30px'
        }}/>  
        <div className="d-flex flex-column align-items-center">
          <NavBar user={user} setUser={setUser}/>
          <Routes>
            <Route path="/" element={<HomePage commodities={commodities}/>}/>
            <Route path="/commodities/:params" element={<CommodityPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/compare" element={<ComparePage/>}/>
            <Route path="/settings" element={<SettingsPage user={user} setUser={setUser}/>}/>
            <Route path="/signin" element={<SigninPage user={user} setUser={setUser}/>}/>
            <Route path="/register" element={<RegisterPage user={user} setUser={setUser}/>}/>
            <Route path="/faq" element={<FaqPage/>}/>
            <Route path="/privacy" element={<PrivacyPage/>}/>
            <Route path="/ToS" element={<TermsPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
          </Routes>
          <div className="padding-div"></div>
          <Footer/>
        </div> 
      </main>
    </CommoditiesContext.Provider>   
  );
}
