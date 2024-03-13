import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ListeStudent() {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const ID = localStorage.getItem('id');

    useEffect(() => {
        axios.get(`/crud/teacher/Students/${ID}`)
            .then(function (response) {
                setSelectedGroups(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching selected students:', error);
            });
    }, [ID]);

    return (
        <div className="container" style={{marginTop:'10%'}}> 
                <div className="col-md-6">
                    <h2 style={{color:'#ffffff'}}>List of Selected Groups</h2>
                    <ul className="list-group">
                        {selectedGroups.map((group) => (
                            <li key={group.id} className="list-group-item">
                                First Name: {group.firstName} &nbsp; Last Name: {group.lastName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
}

export default ListeStudent;
