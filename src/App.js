import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainCrud from './pages/CRUD/MainCrud';
import Login from './pages/authentification/Login';
import Dashboard from './pages/authentification/dashboard';
import MainAuthentification from './pages/authentification/MainAuthentification.js';
import Acceuil from './pages/Acceuil.js';



function App() {
    return (
      <Router>
        <Routes>
            <Route path="/crud/*" element={<MainCrud />} />
            <Route path="/register/*" element={<MainAuthentification />} />
            <Route exact path="/login"  element={<Login/>} />
            <Route exact path="/dashboard"  element={<Dashboard/>} />
            <Route exact path="/"  element={<Acceuil/>} />


        </Routes> 
      </Router>
    );
  }
  export default App;