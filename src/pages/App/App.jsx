import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';
import HomePage from '../HomePage/HomePage'
import AuthPage from '../AuthPage/AuthPage'
import NewItemPage from '../NewItemPage/NewItemPage'
import ItemListPage from '../ItemListPage/ItemListPage'
import SettingsPage from '../SettingsPage/SettingsPage'
import NavBar from '../../components/NavBar'

export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main className="App">
      <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/items/new" element={<NewItemPage/>}/>
          <Route path="/items" element={<ItemListPage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/signin" element={<AuthPage/>}/>
          <Route path="/register" element={<AuthPage/>}/>
        </Routes> 
      </> 
    </main>
  );
}
