import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddSession() {
    const [status, setStatus] = useState('');
    const [date_seance, setDateSeance] = useState('');
    const [time_start, setTimeStart] = useState('');
    const [time_end, setTimeEnd] = useState('');
    const [visibility, setVisibility] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [teacherId, setTeacherId] = useState('');
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState('');
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
        const fetchCourses = async () => {
            try {
                if (teacherId) {
                    const response = await axios.get(`/crud/teacher/Courses/${teacherId}`);
                    if (Array.isArray(response.data)) {
                        setCourses(response.data);
                    } else if (typeof response.data === 'object') {
                        // If response is a single course object, wrap it in an array
                        setCourses([response.data]);
                    } else {
                        console.error('Invalid response for courses:', response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
      }, [teacherId]);

    useEffect(() => {
        async function fetchGroups() {
            try {
                if (teacherId) {
                    const response = await axios.get(`/crud/teacher/Groupes/${teacherId}`);
                    setGroups(response.data);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }
        fetchGroups();
    }, [teacherId]);

    const handleSave = () => {
        setIsSaving(true);

        axios
            .post('/session/signUp/session', {
                status: status,
                date_seance: date_seance,
                time_start: time_start,
                time_end: time_end,
                course_id: courseId,
                teacher_id: teacherId,
                groupe_id: groupId,
                visibility:visibility
            })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Session saved successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsSaving(false);
                setStatus('');
                setDateSeance('');
                setTimeStart('');
                setTimeEnd('');
                setVisibility('');
                setTeacherId('');
                setCourseId('');
                setGroupId('');
                setCourses([]);
                setGroups([]);
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
                <h4 className="text-center mt-2 mb-3" style={{ color: '#ffffff' }}>Create Session</h4>
                <div className="card" style={{ borderRadius: '20px' }}>
                <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/session/">[+] View all Sessions
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                    <label htmlFor="visibility">visibility:</label>
                                    <input
                                        onChange={(event) => { setVisibility(event.target.value) }}
                                        value={visibility}
                                        type="text"
                                        className="form-control"
                                        id="visibility"
                                        name="visibility" />
                                </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="status">Status:</label>
                                    <input
                                        onChange={(event) => { setStatus(event.target.value) }}
                                        value={status}
                                        type="text"
                                        className="form-control"
                                        id="status"
                                        name="status" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="date_seance">Date Seance:</label>
                                    <input
                                        onChange={(event) => { setDateSeance(event.target.value) }}
                                        value={date_seance}
                                        type="date"
                                        className="form-control"
                                        id="date_seance"
                                        name="date_seance" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="time_start">Time Start:</label>
                                    <input
                                        onChange={(event) => { setTimeStart(event.target.value) }}
                                        value={time_start}
                                        type="time"
                                        className="form-control"
                                        id="time_start"
                                        name="time_start" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="time_end">Time End:</label>
                                    <input
                                        onChange={(event) => { setTimeEnd(event.target.value) }}
                                        value={time_end}
                                        type="time"
                                        className="form-control"
                                        id="time_end"
                                        name="time_end" />
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
                                <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="form-control">
                                    <option value="">Select Course</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                             {course.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <select value={groupId} onChange={(e) => setGroupId(e.target.value)} className="form-control">
                                    <option value="">Select Group</option>
                                    {groups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            Group {group.id}
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
                                Save Session
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AddSession;
