// MainCrud.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListeForfait from './forfait/ListeForfait';
import ListeStudent from './student/ListeStudent';
import ListeTeacher from './teacher/ListeTeacher';
import ShowForfait from './forfait/ShowForfait';
import AddForfait from './forfait/AddForfait';
import UpdateForfait from './forfait/UpdateForfait';
import ShowStudent from './student/ShowStudent';
import UpdateStudent from './student/UpdateStudent';
import AddStudent from './student/AddStudent';
import ShowTeacher from './teacher/ShowTeacher';
import AddTeacher from './teacher/AddTeacher';
import UpdateTeacher from './teacher/UpdateTeacher';
import AddSession from './session/AddSession';
import ListeSession from './session/ListeSession';
import UpdateSession from './session/UpdateSession';
import ShowSession from './session/ShowSession';
import UpdateGroup from './group/UpdateGroup';
import ShowGroup from './group/ShowGroup';
import AddGroup from './group/AddGroup';
import ListeGroup from './group/ListeGroup';

function MainCrud() {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ backgroundColor: '#f8f9fe', display: 'flex', height: '100vh' }}>
      <SideBar />
      <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto' }}>
        <div style={{ background: 'linear-gradient(87deg,#11cdef,#1171ef)', height: '35vh' }}>
          <Layout>
            <div style={{ marginLeft: '150px' }}>
              <NavBar/>
              <Routes>
              <Route path="/forfait/*" element={<ListeForfait />} />
              <Route path="/student/*" element={<ListeStudent />} />
              <Route path="/teacher/*" element={<ListeTeacher />} />
              <Route path="/session/*" element={<ListeSession />} />
              <Route path="/group/*" element={<ListeGroup />} />
              <Route path="/forfait/showF/:id" element={<ShowForfait />} />
              <Route path="/forfait/createF" element={<AddForfait />} />
              <Route path="/forfait/upE/:id/edit" element={<UpdateForfait />} />
              <Route path="/student/show/:id" element={<ShowStudent />} />
              <Route path="/student/upS/:id/edit" element={<UpdateStudent />} />
              <Route path="/student/create" element={<AddStudent />} />
              <Route path="/teacher/showT/:id" element={<ShowTeacher />} />
              <Route path="/teacher/createT" element={<AddTeacher />} />
              <Route path="/teacher/upT/:id/edit" element={<UpdateTeacher />} />
              <Route path="/session/:id/edit" element={<UpdateSession />} />
              <Route path="/session/showSession/:id" element={<ShowSession />} />
              <Route path="/session/create/session" element={<AddSession />} />
              <Route path="/group/:id/edit" element={<UpdateGroup />} />
              <Route path="/group/showGroup/:id" element={<ShowGroup />} />
              <Route path="/group/create/group" element={<AddGroup />} />
              </Routes>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
}

export default MainCrud;
