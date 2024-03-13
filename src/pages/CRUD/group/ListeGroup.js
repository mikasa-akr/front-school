import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../../../components/Layout";
import crossI from "../../../Icons/cross.png";
import editI from "../../../Icons/edit.png";
import showI from "../../../Icons/research.png";


function ListeGroup() {
    const [ListeGroup, setListeGroup] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchListeGroup();
    }, []);

    const fetchListeGroup = () => {
        axios.get('/group/')
            .then(function (response) {
                setListeGroup(response.data);
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
                axios.delete(`/group/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'group deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetchListeGroup();
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
                <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Liste Groups</h2>
               <div className='card' style={{ borderRadius: '20px' }}> 
                <div className="card-header">
                        <Link 
                        className="btn btn-outline-dark"
                            to="/crud/group/create/group">[+] create new Group
                        </Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Type</th>
                                    <th>Number</th>
                                    <th>Student</th>
                                    <th>Teacher</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListeGroup.map((group,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{group.id}</td>
                                            <td>{group.type}</td>
                                            <td>{group.number}</td>
                                            <td>{group.student_id && group.student_id.length > 0 ? group.student_id.map(student => student.firstName).join(', ') : 'None'}</td>
                                            <td>{group.teacher_id && group.teacher_id.length > 0 ? group.teacher_id.map(teacher => teacher.firstName).join(', ') : 'None'}</td>
                                            <td>
                                                <Link
                                                    to={`/crud/group/showGroup/${group.id}`}>
                                                    <img src={showI} style={{width:'20px',marginRight: '10px'}}/>
                                                </Link>
                                                <Link
                                                    to={`/crud/group/${group.id}/edit`}>
                                                    <img src={editI} style={{width:'20px',marginRight: '10px'}}/></Link>
                                                <a
                                                    onClick={() => handleDelete(group.id)}>
                                                <img src={crossI} style={{width:'20px'}}/></a>
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

export default ListeGroup;
