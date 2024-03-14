// MainCrud.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarDom from './CalendarDom';
import SideBarS from '../../components/SideBarS';
import ListeGroupe from './ListeGroupe';


function StudentDashboard() {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ backgroundColor: '#f8f9fe', display: 'flex', height: '100vh' }}>
      <SideBarS />
      <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto' }}>
        <div style={{ background: 'linear-gradient(87deg,#11cdef,#1171ef)', height: '35vh' }}>
          <Layout>
            <div style={{ marginLeft: '15%' }}>
              <NavBar/>
              <Routes>
              <Route exact path="/calendar/:id"  element={<CalendarDom/>}/>
              <Route exact path="/listeGroup/:id"  element={<ListeGroupe/>}/>
              </Routes>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
