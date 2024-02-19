import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../../components/Layout";
 
  
function ShowTeacher() {
    const [id] = useState(useParams().id)
    const [teacher, setTeacher] = useState({firstName:'', lastName:'',email:'',number:'',age:'',gender:'',forfait_name:'',avatar:''})
 
    useEffect(() => {
        axios.get(`/crud/teacher/${id}`)
        .then(function (response) {
          setTeacher(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Show Teacher</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/teacher"> View All Teachers
                        </Link>
                    </div>
                    <div className="card-body">
                    <b className="text-muted">Avatar:</b>
                        <p>{teacher.avatar}</p>
                        <b className="text-muted">First Name:</b>
                        <p>{teacher.firstName}</p>
                        <b className="text-muted">Last Name:</b>
                        <p>{teacher.lastName}</p>
                        <b className="text-muted">Email:</b>
                        <p>{teacher.email}</p>
                        <b className="text-muted">Number Phone:</b>
                        <p>{teacher.number}</p>
                        <b className="text-muted">Gender:</b>
                        <p>{teacher.gender}</p>
                        <b className="text-muted">Course:</b>
                        <p>{teacher.course_name}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ShowTeacher;