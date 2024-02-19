import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../../../components/Layout";
import crossI from "../../../Icons/cross.png";
import editI from "../../../Icons/edit.png";
import showI from "../../../Icons/research.png";
import { hover } from '@testing-library/user-event/dist/hover';


function ListeAdmin() {
    const [ListeAdmin, setListeAdmin] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchListeAdmin();
    }, []);

    const fetchListeAdmin = () => {
        axios.get('/crud/admin')
            .then(function (response) {
                setListeAdmin(response.data);
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
                axios.delete(`/crud/admin/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'admin deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetchListeAdmin();
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
                <h2 className="text-center mt-5 mb-3">Liste Admins</h2>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col" width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListeAdmin.map((admin,key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{admin.id}</th>
                                            <td>{admin.firstName}</td>
                                            <td>{admin.lastName}</td>
                                            <td>{admin.email}</td>
                                            <td>{admin.number}</td>
                                            <td>{admin.gender}</td>
                                            <td>
                                                <Link
                                                    to={`/crud/admin/showA/${admin.id}`}><img src={showI} style={{width:'20px',marginRight: '10px'}}/>
                                                </Link>
                                                
                                                <Link to={`/crud/admin/upA/${admin.id}/edit`}><img src={editI} style={{width:'20px',marginRight: '10px'}}/>

                                                </Link>
                                                <a
                                                    onClick={() => handleDelete(admin.id)}>
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
        </Layout>
    );
}

export default ListeAdmin;
