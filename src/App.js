import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Login from './pages/authentification/Login';
import MainAuthentification from './pages/authentification/MainAuthentification.js';
import Acceuil from './layouts/Acceuil.js';
import AdminLayout from './layouts/Admin.js';
import Student from './layouts/Student.js';
import Teacher from './layouts/Teacher.js';
import ChatTeacher from './pages/messagerieT/index.js';
import ChatStudent from './pages/messagerieS/index.js';
import ChatAdmin from './pages/messagerie/index.js';
import ForgetPassword from './pages/authentification/ForgetPassword.js';
import ResetPassword from './pages/authentification/ResetPassword.js';

const ProtectedRoute = ({ roles, children }) => {
  const isAuthenticated = localStorage.getItem('roles') === roles;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const stripePromise = loadStripe('pk_test_51OyasWBNWgwGqFvzzcG0jn80B1lHgihqrkhbRdcCvexIeAZcLur7KbRpipxkKC9DTkO1xhsLehILhrBNm8Wi9ep400Td1NEJiI');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register/*" element={<Elements stripe={stripePromise}><MainAuthentification /></Elements>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Acceuil />} />

        <Route path="/teacher/*" element={<ProtectedRoute roles="ROLE_TEACHER"><Teacher /></ProtectedRoute>} />
        <Route path="/admin/*" element={<ProtectedRoute roles="ROLE_ADMIN"><AdminLayout /></ProtectedRoute>} />
        <Route path="/student/*" element={<ProtectedRoute roles="ROLE_STUDENT"><Student /></ProtectedRoute>} />

        <Route path="/chat/teacher" element={<ProtectedRoute roles="ROLE_TEACHER"><ChatTeacher /></ProtectedRoute>} />
        <Route path="/chat/student" element={<ProtectedRoute roles="ROLE_STUDENT"><ChatStudent /></ProtectedRoute>} />
        <Route path="/chat/admin" element={<ProtectedRoute roles="ROLE_ADMIN"><ChatAdmin /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
