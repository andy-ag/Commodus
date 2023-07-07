import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';
import HomePage from '../HomePage/HomePage'
import AuthPage from '../AuthPage/AuthPage'
import CommodityPage from '../CommodityPage/CommodityPage'
import CommodityListPage from '../CommodityListPage/CommodityListPage'
import SettingsPage from '../SettingsPage/SettingsPage'
import ContactPage from '../ContactPage/ContactPage'
import PrivacyPage from '../PrivacyPage/PrivacyPage'
import FaqPage from '../FaqPage/FaqPage'
import TermsPage from '../TermsPage/TermsPage'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main className="App">
      <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/commodity" element={<CommodityPage/>}/>
          <Route path="/dashboard" element={<CommodityListPage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/signin" element={<AuthPage user={user} setUser={setUser}/>}/>
          <Route path="/register" element={<AuthPage user={user} setUser={setUser}/>}/>
          <Route path="/faq" element={<FaqPage/>}/>
          <Route path="/privacy" element={<PrivacyPage/>}/>
          <Route path="/ToS" element={<TermsPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
        </Routes>
        <Footer/>
      </> 
    </main>
  );
}
