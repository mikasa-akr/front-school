import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../../components/Layout"
 
function UpdateSession() {
    const [id, setId] = useState(useParams().id)
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

    useEffect(() => {
        axios.put(`/session/${id}/edit`)
        .then(function (response) {
            let session = response.data
            setStatus(session.status);
            setTimeStart(session.time_start);
            setTimeEnd(session.time_end);
            setVisibility(session.visibility);
            setGroupId(session.groupe_seance_id.id);
            setTeacherId(session.teacher_id.id);
            setCourseId(session.seance_course_id.id);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
          
    }, [])
  
  
    const handleSave = () => {
        setIsSaving(true);
        axios.put(`/session/${id}/edit`, {
            status: status,
            date_seance: date_seance,
            time_start: time_start,
            time_end: time_end,
            seance_course_id: courseId,
            teacher_id: teacherId,
            groupe_seance_id: groupId,
            visibility:visibility

        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'session updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
        });
    }
  
  
    return (
        <Layout>
            <div className="container" style={{ marginTop: '10%' }}>
                <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Edit session</h2>
                <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/session/">View All Sessions
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="mb-3">
                            <label htmlFor="visibility">Visibility:</label>
                            <select
                                onChange={(event) => { setVisibility(event.target.value) }}
                                value={visibility}
                                className="form-control"
                                id="visibility"
                                name="visibility"
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
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
                                        name="date_seance"
                                        placeholder={date_seance} />
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
  
export default UpdateSession;              