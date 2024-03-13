import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddGroup() {
    const [type, setType] = useState('');
    const [number, setNumber] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [teacherId, setTeacherId] = useState('');
    const [students,setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [isSaving, setIsSaving] = useState(false);    

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await axios.get('/crud/teacher/');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        }
        fetchTeachers();
    }, []);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await axios.get('/crud/student/');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
        fetchStudents();
    }, []);

    const handleSave = () => {
        setIsSaving(true);

        axios
            .post('/group/signUp/group', {
                type:type,
                number:number,
                teacher_id: teacherId,
                student_id: studentId,
            })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Group saved successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsSaving(false);
                setType('');
                setNumber('');
                setTeacherId('');
                setStudentId('')
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsSaving(false);
            });
    };

    return (
        <Layout>
            <div className="container" style={{ marginTop: '10%' }}>
                <h4 className="text-center mt-2 mb-3" style={{ color: '#ffffff' }}>Create Group</h4>
                <div className="card" style={{ borderRadius: '20px' }}>
                <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/group/">View all Groups
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="row">
                        <div className="col-mb-6 mb-3">
                                    <label htmlFor="type">Type:</label>
                                    <select
                                        className="form-control"
                                        id="type"
                                        value={type}
                                        onChange={(event)=>{setType(event.target.value)}}
                                    >
                                          <option value='private'>Private</option>
                                          <option value='public'>Public</option>
                                    </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                    <label htmlFor="number">Number:</label>
                                    <input
                                        onChange={(event) => { setNumber(event.target.value) }}
                                        value={number}
                                        type="text"
                                        className="form-control"
                                        id="number"
                                        name="number" />
                            </div>
                        </div>
                        <div className="row">
                            <div  className="col-md-4 mb-3">
                                <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="form-control">
                                    <option value="">Select Teacher</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div  className="col-md-4 mb-3">
                                <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="form-control">
                                    <option value="">Select Student</option>
                                    {students.map((student) => (
                                        <option key={student.id} value={student.id}>
                                             {student.firstName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline" style={{ borderRadius: '25px', background: "#11cdef", color: '#ffffff', marginLeft: '40%' }}
                            >
                                Save Group
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AddGroup;
