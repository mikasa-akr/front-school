import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/authentification/Login';
import MainAuthentification from './pages/authentification/MainAuthentification.js';
import Acceuil from './layouts/Acceuil.js';
import Admin from './layouts/Admin.js';
import Student from './layouts/Student.js';
import Teacher from './layouts/Teacher.js';


function App() {
    return (
      <Router>
        <Routes>
            <Route path="/register/*" element={<MainAuthentification />} />
            <Route exact path="/login"  element={<Login/>} />
            <Route path="/"  element={<Acceuil/>} />
            <Route path="/teacher/*" element={<Teacher />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/student/*" element={<Student />} />
        </Routes>
      </Router>
    );
  }
  export default App;