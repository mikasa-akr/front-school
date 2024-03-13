// MainCrud.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarDom from './CalendarDom';
import SideBarT from '../../components/SideBarT';
import ListeGroupe from './ListeGroupe';
import ListeStudent from './ListeStudent';


function TeacherDashboard() {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ backgroundColor: '#f8f9fe', display: 'flex', height: '100vh' }}>
      <SideBarT />
      <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto' }}>
        <div style={{ background: 'linear-gradient(87deg,#11cdef,#1171ef)', height: '35vh' }}>
          <Layout>
            <div style={{ marginLeft: '15%' }}>
              <NavBar/>
              <div>
              </div>
              <Routes>
              <Route exact path="/calendar/:id"  element={<CalendarDom/>} />
              <Route exact path="/listeGroup/:id"  element={<ListeGroupe/>} />
              <Route exact path="/listeStudent/:id"  element={<ListeStudent/>} />

              </Routes>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
