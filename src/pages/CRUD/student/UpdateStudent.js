import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../../components/Layout"
 
function UpdateStudent() {
    const [id, setId] = useState(useParams().id)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [age, setAge] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [forfaits, setForfait] = useState([]);
    const [forfaitId, setSelectedForfaitId] = useState('');

    useEffect(() => {
        fetchCourses();
        fetchForfait();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/course'); // Adjust the URL accordingly
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const fetchForfait = async () => {
        try {
            const response = await axios.get('/crud/forfait'); // Adjust the URL accordingly
            setForfait(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        axios.put(`/crud/student/${id}/edit`)
        .then(function (response) {
            let student = response.data
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setEmail(student.email);
            setGender(student.gender);
            setNumber(student.number);
            setAge(student.age);
            setSelectedCourseId(student.course.id);
            setSelectedForfaitId(student.forfait.id);

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
        axios.put(`/crud/student/${id}/edit`, {
            firstName: firstName,
            lastName: lastName,
            email:email,
            gender:gender,
            number:number,
            age:age,
            course_id: selectedCourseId,
            forfait_id: forfaitId,

        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Student updated successfully!',
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
                <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Edit Student</h2>
                <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/student/">View All students
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name">First Name:</label>
                                <input 
                                    onChange={(event)=>{setFirstName(event.target.value)}}
                                    value={firstName}
                                    type="text"
                                    className="form-control"
                                    id="firsName"
                                    name="firstName"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="description">Last Name:</label>
                                <input 
                                    value={lastName}
                                    onChange={(event)=>{setLastName(event.target.value)}}
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"></input>
                            </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Email:</label>
                                <input 
                                    onChange={(event)=>{setEmail(event.target.value)}}
                                    value={email}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Number Phone:</label>
                                <input 
                                    onChange={(event)=>{setNumber(event.target.value)}}
                                    value={number}
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    name="number"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender">Gender:</label>
                                <select
                                    className="form-control"
                                    id="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={(event)=>{setGender(event.target.value)}}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="children">Children</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Age:</label>
                                <input 
                                    onChange={(event)=>{setAge(event.target.value)}}
                                    value={age}
                                    type="date"
                                    className="form-control"
                                    id="age"
                                    name="age"/>
                            </div>
                            <div className="mb-3">
                                    <label htmlFor="courseSelect">Select Course:</label>
                                    <select
                                        className="form-control"
                                        id="courseSelect"
                                        value={selectedCourseId}
                                        onChange={(event)=>{setSelectedCourseId(event.target.value)}}
                                    >
                                        <option value="">Select a course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>
                                                {course.type}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                            <div className="mb-3">
                                    <label htmlFor="forfaitId">Select Forfait:</label>
                                    <select
                                        className="form-control"
                                        id="forfaitId"
                                        value={forfaitId}
                                        onChange={(event)=>{setSelectedForfaitId(event.target.value)}}
                                    >
                                        {forfaits.map(forfait => (
                                            <option key={forfait.id} value={forfait.id}>
                                                {forfait.title}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline" style={{borderRadius:'25px',background :"#11cdef",color:'#ffffff',marginLeft:'30px'}}
                                >
                                Update student
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default UpdateStudent;              