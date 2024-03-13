import React from 'react';
import { BrowserRouter as Router, Routes, Route,HashRouter } from "react-router-dom"
import MainCrud from './pages/CRUD/MainCrud';
import Login from './pages/authentification/Login';
import MainAuthentification from './pages/authentification/MainAuthentification.js';
import Acceuil from './pages/Acceuil.js';
import StudentDashboard from './pages/StudentDash/StudentDashboard.js';
import TeacherDashboard from './pages/TeacherDash/TeacherDashboard.js';
import Admin from './layouts/Admin.js'

function App() {
    return (
      <HashRouter>
        <Routes>
            <Route path="/crud/*" element={<MainCrud />} />
            <Route path="/register/*" element={<MainAuthentification />} />
            <Route exact path="/login"  element={<Login/>} />
            <Route exact path="/"  element={<Acceuil/>} />
            <Route path="/student/*" element={<StudentDashboard />} />
            <Route path="/teacher/*" element={<TeacherDashboard />} />
            <Route path="/admin/*" element={<Admin/>} />
        </Routes> 
      </HashRouter>
    );
  }
  export default App;