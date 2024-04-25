import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from '../../components/Layout';
import teacherImage from '../../assets/img/teachh.png'; // Path to your teacher image
import image from '../../assets/img/Snapshot_2024-04-23_15-26-04-removebg-preview.png'

function RegisterTeacher() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [courses, setCourses] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedGenderIds, setSelectedGenderIds] = useState([]);

    useEffect(() => {
        fetchCourses();
        fetchGenders();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/course');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchGenders = async () => {
        try {
            const response = await axios.get('/gender');
            setGender(response.data); // Assuming response.data.genders is an array
        } catch (error) {
            console.error('Error fetching genders:', error);
            setGender([]); // Set gender to an empty array in case of error
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('number', number);
            formData.append('gender_id', selectedGenderIds[0]); // Assuming only one gender is selected
            formData.append('course_id', selectedCourseId);
            formData.append('avatar', avatar); // Append the file directly
    
            const response = await axios.post('/signUp/teacher', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                },
            });
    
            Swal.fire({
                icon: 'success',
                title: 'Teacher saved successfully!',
                showConfirmButton: false,
                timer: 1500
            });
    
            setIsSaving(false);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setNumber('');
            setSelectedGenderIds([]);
            setAvatar('');
            setSelectedCourseId('');
        } catch (error) {
            console.error('Error saving teacher:', error);
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 1500
            });
            setIsSaving(false);
        }
    };
    

    return (
        <>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/" style={{ color: "#4fd1c5" }}><img src={image}  style={{color: '#4FD1C5',width:'150px'}} /></a>
                            <div className="d-flex ms-auto align-items-center">
                                <p className="me-3 mb-0">Are you a Student?</p>
                                <a className="navbar-brand" style={{ color: "#4fd1c5", fontSize: "16px" }} href='/register/forfait'>Apply as Student</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{width: '300%',
                                    borderRadius: '25px',
                                    transition: 'background-color 0.3s',}}>
                                <h2 className="text-center mt-5 mb-3">Sign Up as Teacher</h2>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <input
                                                onChange={(event) => { setFirstName(event.target.value); }}
                                                value={firstName}
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                onChange={(event) => { setLastName(event.target.value); }}
                                                value={lastName}
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            onChange={(event) => { setEmail(event.target.value); }}
                                            value={email}
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            onChange={(event) => { setPassword(event.target.value); }}
                                            value={password}
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            onChange={(event) => { setNumber(event.target.value); }}
                                            value={number}
                                            type="text"
                                            className="form-control"
                                            id="number"
                                            name="number"
                                            placeholder="Number Phone"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            className="form-control"
                                            id="genderSelect"
                                            value={selectedGenderIds} 
                                            onChange={(e) => setSelectedGenderIds([e.target.value])}

                                        >
                                            <option value="">Select Gender to teach</option>
                                            {gender.map(gender => (
                                                <option key={gender.id} value={gender.id}>
                                                    {gender.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <select
                                            className="form-control"
                                            id="courseSelect"
                                            value={selectedCourseId}
                                            onChange={(event) => { setSelectedCourseId(event.target.value); }}
                                        >
                                        <option value="">Select Course</option>
                                            {courses.map(course => (
                                                <option key={course.id} value={course.id}>
                                                    {course.type} ( Price : {course.price})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            onChange={(event) => { setAvatar(event.target.value); }}
                                            value={avatar}
                                            type="file"
                                            className="form-control"
                                            id="avatar"
                                            name="avatar"
                                            placeholder="Avatar"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <button
                                            disabled={isSaving}
                                            onClick={handleSave}
                                            type="button"
                                            className="btn"
                                            style={{ width: "120px", backgroundColor: "#4fd1c5", color: "#ffffff", borderRadius: '40px', marginLeft: '35%' }}
                                        >
                                            {isSaving ? 'Saving...' : 'Sign Up'}
                                        </button>
                                        <p className="text-center">
                                            Already have an account? <Link to="/login" style={{ color: "#4fd1c5" }}>Login here</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            <div>
                <img src={teacherImage} alt="Teacher Image" style={{ marginLeft: '26%', background: '#f7fafc' ,width:'100vh',height:'90vh' }} />
            </div>
           </div> 
        </>
    );
}

export default RegisterTeacher;
