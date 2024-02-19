import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterStudent from './RegisterStudent';
import RegisterTeacher from './RegisterTeacher';
import RegisterForfait from './RegisteForfait';
import ChooseRes from './ChooseRes';

function MainAuthentification() {
  
  return (
    <Layout>
      <>

          <Routes>
          <Route exact path="/"  element={<ChooseRes/>} />
            <Route exact path="/student"  element={<RegisterStudent/>} />
            <Route exact path="/teacher"  element={<RegisterTeacher/>} />
            <Route exact path="/forfait"  element={<RegisterForfait/>} />
            </Routes>
      </>
    </Layout>
  );
}

export default MainAuthentification;
