import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../../components/Layout";
 
  
function ShowSession() {
    const [id, setId] = useState(useParams().id)
    const [session, setSession] = useState([])
 
    useEffect(() => {
        axios.get(`/session/${id}`)
        .then(function (response) {
          setSession(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
    return (
        <Layout>
           <div className="container" style={{ marginTop: '10%' }}>
            <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Show session</h2>
                <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/session/"> View All sessions
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Status:</b>
                        <p>{session.status}</p>
                        <b className="text-muted">Date Seance:</b>
                        <p>{session.date_seance}</p>
                        <b className="text-muted">Time Start:</b>
                        <p>{session.time_start}</p>
                        <b className="text-muted">Time End:</b>
                        <p>{session.time_end}</p>
                        <b className="text-muted">Visibility:</b>
                        <p>{session.visibility}</p>
                        <b className="text-muted">Teacher:</b>
                        <p>{session.teacher_id ? session.teacher_id.firstName : ''}</p>
                        <b className="text-muted">Group:</b>
                        <p>{session.groupe_seance_id ? session.groupe_seance_id.type : ''}</p>
                        <b className="text-muted">Course:</b>
                        <p>{session.seance_course_id ? session.seance_course_id.type : ''}</p>
                        </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ShowSession;