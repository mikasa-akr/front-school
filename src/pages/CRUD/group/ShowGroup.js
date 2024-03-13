import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../../components/Layout";
 
  
function ShowGroup() {
    const [id, setId] = useState(useParams().id)
    const [group, setGroup] = useState([])
 
    useEffect(() => {
        axios.get(`/group/${id}`)
        .then(function (response) {
          setGroup(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container" style={{ marginTop: '10%' }}>
            <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Show Group</h2>
                <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/group/"> View All Groups
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Type:</b>
                        <p>{group.type}</p>
                        <b className="text-muted">Number:</b>
                        <p>{group.number}</p>
                        <b className="text-muted">Student:</b>
                        <p>{group.student_id && group.student_id.length > 0 ? group.student_id.map(student => student.firstName).join(', ') : 'None'}</p>
                        <b className="text-muted">Teacher:</b>
                        <p>{group.teacher_id && group.teacher_id.length > 0 ? group.teacher_id.map(teacher => teacher.firstName).join(', ') : 'None'}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ShowGroup;