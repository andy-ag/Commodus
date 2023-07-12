import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import { Toaster } from 'react-hot-toast'
import HomePage from '../HomePage/HomePage'
import AuthPage from '../AuthPage/AuthPage'
import CommodityPage from '../CommodityPage/CommodityPage'
import DashboardPage from '../DashboardPage/DashboardPage'
import CommoditiesContext from '../../components/commoditiesContext'
import SettingsPage from '../SettingsPage/SettingsPage'
import ContactPage from '../ContactPage/ContactPage'
import PrivacyPage from '../PrivacyPage/PrivacyPage'
import FaqPage from '../FaqPage/FaqPage'
import TermsPage from '../TermsPage/TermsPage'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function App() {
  const [user, setUser] = useState(getUser())
  const [commodities, setCommodities] = useState(null)

  useEffect(() => {
    async function fetchCommodities() {
      if (!commodities) {
        try {
            const response = await fetch('/api/commodities/index');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCommodities(data);
        } catch (error) {
            console.error('Fetching commodities failed:', error);
        }
      }
    };
    fetchCommodities();
}, [commodities]);

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
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/signin" element={<AuthPage user={user} setUser={setUser}/>}/>
            <Route path="/register" element={<AuthPage user={user} setUser={setUser}/>}/>
            <Route path="/faq" element={<FaqPage/>}/>
            <Route path="/privacy" element={<PrivacyPage/>}/>
            <Route path="/ToS" element={<TermsPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
          </Routes>
          <Footer/>
        </div> 
      </main>
    </CommoditiesContext.Provider>   
  );
}
