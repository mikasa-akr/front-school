import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ListeGroupe() {
    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage

    useEffect(() => {
        axios.get(`/crud/teacher/listeGroupe/${ID}`)
            .then(function (response) {
                setGroups(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching groups:', error);
            });
    }, [ID]);

    useEffect(() => {
        axios.get(`/crud/teacher/Groupes/${ID}`)
            .then(function (response) {
                setSelectedGroups(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching selected groups:', error);
            });
    }, [ID]);

    const handleAssociateTeacherWithGroup = (groupId) => {
        axios.post(`/crud/teacher/selectGroup/${ID}/${groupId}`)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Group selected successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(function (error) {
                console.error('Error selecting group:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    text: 'Failed to select the group. Please try again.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    return (
        <div className="container" style={{marginTop:'10%'}}>
            <div className="row">
                <div className="col-md-6">
                    <h2 style={{color:'#ffffff'}}>Select Group</h2>
                    <ul className="list-group">
                        {groups.map((group) => (
                            <li key={group.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    Number: {group.number} &nbsp; Type: {group.type}
                                </div>
                                <button
                                className="btn btn-outline" style={{border:"2px solid #11cdef",color :"#11cdef"}}                                    onClick={() => handleAssociateTeacherWithGroup(group.id)}
                                >
                                    Select
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
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
