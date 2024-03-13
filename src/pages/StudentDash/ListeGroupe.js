import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ListeGroupe() {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage

    useEffect(() => {
        axios.get(`/crud/student/Groupes/${ID}`)
            .then(function (response) {
                setSelectedGroups(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching selected groups:', error);
            });
    }, [ID]);

    return (
        <div className="container" style={{marginTop:'10%'}}>
            <div className="row">
                <div className="col-md-6">
                    <h2 style={{color:'#ffffff'}}>List of Selected Groups</h2>
                    <ul className="list-group">
                        {selectedGroups.map((group) => (
                            <li key={group.id} className="list-group-item">
                                Number: {group.number} &nbsp; Type: {group.type}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ListeGroupe;
