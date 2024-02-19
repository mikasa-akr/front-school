import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../../../components/Layout";
import crossI from "../../../Icons/cross.png";
import editI from "../../../Icons/edit.png";
import showI from "../../../Icons/research.png";

function ListeStudent() {
    const [ListeStudent, setListeStudent] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchListeStudent();
    }, []);

    const fetchListeStudent = () => {
        axios.get('/crud/student')
            .then(function (response) {
                setListeStudent(response.data);
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
                axios.delete(`/crud/student/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'student deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetchListeStudent();
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
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Liste Students</h2>
                <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/student/create">[+] Create New Student
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
                                    <th>Age</th>
                                    <th>Forfait</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListeStudent.map((student,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{student.id}</td>
                                            <td>{student.firstName}</td>
                                            <td>{student.lastName}</td>
                                            <td>{student.email}</td>
                                            <td>{student.number}</td>
                                            <td>{student.gender}</td>
                                            <td>{student.age}</td>
                                            <td>{student.forfait_id.type}</td>

                                            <td>
                                                <Link
                                                    to={`/crud/student/show/${student.id}`}
                                                   >
                                                    <img src={showI} style={{width:'20px',marginRight: '10px' }}/>
                                                </Link>
                                                <Link
                                                    to={`/crud/student/upS/${student.id}/edit`}>
                                                    <img src={editI} style={{width:'20px',marginRight: '10px' }}/>
                                                </Link>
                                                <a
                                                    onClick={() => handleDelete(student.id)}
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
            <Routes>
            </Routes>
        </Layout>
    );
}

export default ListeStudent;
