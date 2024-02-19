import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../../components/Layout";
 
  
function ShowAdmin() {
    const [id, setId] = useState(useParams().id)
    const [admin, setAdmin] = useState({firstName:'', lastName:'',email:'',number:'',roles:'',gender:'',avatar:''})
 
    useEffect(() => {
        axios.get(`/crud/admin/${id}`)
        .then(function (response) {
          setAdmin(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Show Admin</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/admin/"> View All Admins
                        </Link>
                    </div>
                    <div className="card-body">
                        <p>{admin.avatar}</p>
                        <b className="text-muted">First Name:</b>
                        <p>{admin.firstName}</p>
                        <b className="text-muted">Last Name:</b>
                        <p>{admin.lastName}</p>
                        <b className="text-muted">Email:</b>
                        <p>{admin.email}</p>
                        <b className="text-muted">Role:</b>
                        <p>{admin.roles}</p>
                        <b className="text-muted">Number Phone:</b>
                        <p>{admin.number}</p>
                        <b className="text-muted">Gender:</b>
                        <p>{admin.gender}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ShowAdmin;