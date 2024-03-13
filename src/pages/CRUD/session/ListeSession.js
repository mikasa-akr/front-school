import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../../../components/Layout";
import crossI from "../../../Icons/cross.png";
import editI from "../../../Icons/edit.png";
import showI from "../../../Icons/research.png";

function ListeSession() {
    const [ListeSession, setListeSession] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchListeSession();
    }, []);

    const fetchListeSession = () => {
        axios.get('/session')
            .then(function (response) {
                setListeSession(response.data);
                setIsLoaded(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/session/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Session deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetchListeSession();
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    }

    if (!isLoaded)
        return <div>Loading...</div>;

    return (
        <Layout>
            <div className="container" style={{ marginTop: '10%' }}>
                <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Liste Sessions</h2>
                <div className='card' style={{ borderRadius: '20px' }}>
                <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/session/create/session">[+] Create New Session
                        </Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Status</th>
                                    <th>Session Date</th>
                                    <th>Time Start</th>
                                    <th>Time End</th>
                                    <th>Visibility</th>
                                    <th>Group</th>
                                    <th>Teacher</th>
                                    <th>Course</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListeSession.map((session,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{session.id}</td>
                                            <td>{session.status}</td>
                                            <td>{session.date_seance}</td>
                                            <td>{session.time_start}</td>
                                            <td>{session.time_end}</td>
                                            <td>{session.visibility}</td>   
                                            <td>{session.groupe_seance_id ? session.groupe_seance_id.type : ''}</td>
                                            <td>{session.teacher_id ? session.teacher_id.firstName : ''}</td>
                                            <td>{session.seance_course_id ? session.seance_course_id.type : ''}</td>

                                            <td>
                                                <Link
                                                    to={`/crud/session/showSession/${session.id}`}
                                                   >
                                                    <img src={showI} style={{width:'20px',marginRight: '10px' }}/>
                                                </Link>
                                                <Link
                                                    to={`/crud/session/${session.id}/edit`}>
                                                    <img src={editI} style={{width:'20px',marginRight: '10px' }}/>
                                                </Link>
                                                <a
                                                    onClick={() => handleDelete(session.id)}
                                                    >
                                                    <img src={crossI} style={{width:'20px' }}/>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                </div>
                </div>
            </div>
            <Routes>
            </Routes>
        </Layout>
    );
}

export default ListeSession;
