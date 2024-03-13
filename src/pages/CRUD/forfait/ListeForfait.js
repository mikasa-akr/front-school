import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../../../components/Layout";
import crossI from "../../../Icons/cross.png";
import editI from "../../../Icons/edit.png";
import showI from "../../../Icons/research.png";


function ListeForfait() {
    const [ListeForfait, setListeForfait] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchListeForfait();
    }, []);

    const fetchListeForfait = () => {
        axios.get('/crud/forfait')
            .then(function (response) {
                setListeForfait(response.data);
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
                axios.delete(`/crud/forfait/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'forfait deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetchListeForfait();
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
                <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Liste Forfaits</h2>
               <div className='card' style={{ borderRadius: '20px' }}> 
                <div className="card-header">
                        <Link 
                        className="btn btn-outline-dark"
                            to="/crud/forfait/createF">[+] create new Forfait
                        </Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Number of hours per session</th>
                                    <th>Number of hours per lesson</th>
                                    <th>Subscription</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListeForfait.map((forfait,key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{forfait.id}</td>
                                            <td>{forfait.title}</td>
                                            <td>{forfait.price}</td>
                                            <td>{forfait.NbrHourSession}</td>
                                            <td>{forfait.NbrHourSeance}</td>
                                            <td>{forfait.subscription}</td>
                                            <td>
                                                
                                                <Link
                                                    to={`/crud/forfait/showF/${forfait.id}`}
                                                    >
                                                    <img src={showI} style={{width:'20px',marginRight: '10px'}}/>
                                                </Link>
                                                <Link
                                                    to={`/crud/forfait/upE/${forfait.id}/edit`}>
                                                    <img src={editI} style={{width:'20px',marginRight: '10px'}}/></Link>
                                                <a
                                                    onClick={() => handleDelete(forfait.id)}>
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

export default ListeForfait;
