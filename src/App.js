import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/authentification/Login';
import MainAuthentification from './pages/authentification/MainAuthentification.js';
import Acceuil from './layouts/Acceuil.js';
import StudentDashboard from './pages/StudentDash/StudentDashboard.js';
import TeacherDashboard from './pages/TeacherDash/TeacherDashboard.js';
import Admin from './layouts/Admin.js';

function App() {
    return (
      <Router>
        <Routes>
            <Route path="/register/*" element={<MainAuthentification />} />
            <Route exact path="/login"  element={<Login/>} />
            <Route path="/"  element={<Acceuil/>} />
            <Route path="/student/*" element={<StudentDashboard />} />
            <Route path="/teacher/*" element={<TeacherDashboard />} />
            <Route path="/admin/*" element={<Admin />} />
        </Routes> 
      </Router>
    );
  }
  export default App;