import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import ListeAdmin from './admin/ListeAdmin';
import ListeForfait from './forfait/ListeForfait';
import ListeStudent from './student/ListeStudent';
import ListeTeacher from './teacher/ListeTeacher';
import ShowAdmin from './admin/ShowAdmin';
import UpdateAdmin from './admin/UpdateAdmin';
import ShowForfait from './forfait/ShowForfait';
import AddForfait from './forfait/AddForfait';
import UpdateForfait from './forfait/UpdateForfait';
import ShowStudent from './student/ShowStudent';
import UpdateStudent from './student/UpdateStudent';
import AddStudent from './student/AddStudent';
import ShowTeacher from './teacher/ShowTeacher';
import AddTeacher from './teacher/AddTeacher';
import UpdateTeacher from './teacher/UpdateTeacher';

function MainCrud() {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
    
      <NavBar />
      <div style={{ display: 'flex' }}>
          <SideBar />
            <Layout>
              <Routes>
                <Route path="/admin/*" element={<ListeAdmin />} />
                <Route path="/forfait/*" element={<ListeForfait />} />
                <Route path="/student/*" element={<ListeStudent />} />
                <Route path="/teacher/*" element={<ListeTeacher />} />
                <Route path="/admin/showA/:id" element={<ShowAdmin />} />
                <Route path="/admin/upA/:id/edit" element={<UpdateAdmin />} />
                <Route path="/forfait/showF/:id" element={<ShowForfait />} />
                <Route path="/forfait/createF" element={<AddForfait />} />
                <Route path="/forfait/upE/:id/edit" element={<UpdateForfait />} />
                <Route path="/student/show/:id" element={<ShowStudent />} />
                <Route path="/student/upS/:id/edit" element={<UpdateStudent />} />
                <Route path="/student/create" element={<AddStudent />} />
                <Route path="/teacher/showT/:id" element={<ShowTeacher />} />
                <Route path="/teacher/createT" element={<AddTeacher />} />
                <Route path="/teacher/upT/:id/edit" element={<UpdateTeacher />} />
              </Routes>
            </Layout>
            </div>

    </>
  );
}

export default MainCrud;
