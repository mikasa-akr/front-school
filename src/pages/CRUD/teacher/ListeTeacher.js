import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../../../components/Layout";
import crossI from "../../../Icons/cross.png";
import editI from "../../../Icons/edit.png";
import showI from "../../../Icons/research.png";

function ListeTeacher() {
    const [ListeTeacher, setListeTeacher] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchListeTeacher();
    }, []);

    const fetchListeTeacher = () => {
        axios.get('/crud/teacher/')
            .then(function (response) {
                setListeTeacher(response.data);
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
                axios.delete(`/crud/teacher/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Teacher deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetchListeTeacher();
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
            <h2 className="text-center mt-2 mb-3" style={{color:'#ffffff'}} >Liste Teachers</h2>
                <div className='card' style={{ borderRadius: '20px' }}>
                <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/teacher/createT">[+] Create New Teacher
                        </Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Gender</th>
                                    <th>Course</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListeTeacher.map((teacher,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{teacher.id}</td>
                                            <td>{teacher.firstName}</td>
                                            <td>{teacher.lastName}</td>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.number}</td>
                                            <td>{teacher.gender}</td>
                                            <td>{teacher.course_name}</td>
                                            <td>
                                                <Link
                                                    to={`/crud/teacher/showT/${teacher.id}`}
                                                   >
                                                    <img src={showI} style={{width:'20px',marginRight: '10px' }}/>
                                                </Link>
                                                <Link
                                                    to={`/crud/teacher/upT/${teacher.id}/edit`}>
                                                    <img src={editI} style={{width:'20px',marginRight: '10px' }}/>
                                                </Link>
                                                <a
                                                    onClick={() => handleDelete(teacher.id)}
                                                >
                                                    <img src={crossI} style={{width:'20px'}}/>
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
        </Layout>
    );
}

export default ListeTeacher;
