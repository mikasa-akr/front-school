import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../../components/Layout";
 
  
function ShowStudent() {
    const [id, setId] = useState(useParams().id)
    const [student, setStudent] = useState({firstName:'', lastName:'',email:'',number:'',age:'',gender:'',forfait_name:'',avatar:''})
 
    useEffect(() => {
        axios.get(`/crud/student/${id}`)
        .then(function (response) {
          setStudent(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
    return (
        <Layout>
           <div className="container" style={{ marginTop: '10%' }}>
            <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Show Student</h2>
                <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/student/"> View All Students
                        </Link>
                    </div>
                    <div className="card-body">
                        <p>{student.avatar}</p>
                        <b className="text-muted">First Name:</b>
                        <p>{student.firstName}</p>
                        <b className="text-muted">Last Name:</b>
                        <p>{student.lastName}</p>
                        <b className="text-muted">Email:</b>
                        <p>{student.email}</p>
                        <b className="text-muted">Number Phone:</b>
                        <p>{student.number}</p>
                        <b className="text-muted">Gender:</b>
                        <p>{student.gender}</p>
                        <b className="text-muted">Age:</b>
                        <p>{student.age}</p>
                        <b className="text-muted">Forfait:</b>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ShowStudent;