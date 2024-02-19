import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, []);

    return (
        <Layout>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <div className="d-flex">
                            <button onClick={()=>{localStorage.removeItem('token')}}>logout</button>
                            </div>
                        </div>
                    </nav>
                    <h2 className="text-center mt-5">Welcome</h2>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
