import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from "react-router-dom";
import Layout from "../components/Layout";

function Acceuil() {


    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">EduHub</Link>

    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown"> {/* Add justify-content-end class */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/login">Log In</Link> 
        </li>
        <li className="nav-item">
          <Link className="nav-link me-5" to="/register/"
                        style={{width:'100px',borderRadius:'50px',backgroundColor:"#11cdef",color :"#ffffff",textAlign:'center'}}
                        >Sign Up</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

      );
    }

export default Acceuil;
