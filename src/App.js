import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Login from './pages/authentification/Login';
import MainAuthentification from './pages/authentification/MainAuthentification.js';
import Acceuil from './layouts/Acceuil.js';
import Admin from './layouts/Admin.js';
import Student from './layouts/Student.js';
import Teacher from './layouts/Teacher.js';

const stripePromise = loadStripe('pk_test_51OyasWBNWgwGqFvzzcG0jn80B1lHgihqrkhbRdcCvexIeAZcLur7KbRpipxkKC9DTkO1xhsLehILhrBNm8Wi9ep400Td1NEJiI');

function App() {
  
    return (
      <Router>
        <Routes>
            <Route path="/register/*" element={
              <Elements stripe={stripePromise}>
                <MainAuthentification />
              </Elements>} />
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
