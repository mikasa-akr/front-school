import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout';
import MultiSelect from "react-multi-select-component";


function RegisterStudent() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const forfait_id = queryParams.get('forfait_id');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);
    const handleCourseChange = (event) => {
        try {
          const newSelectedIds = [...event.target.options]
            .filter(option => option.selected)
            .map(option => option.value);
          setSelectedCourseIds(newSelectedIds);
        } catch (error) {
          console.error('Error selecting courses:', error);
        }
      };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/course');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleSave = () => {
        setIsSaving(true);

        axios
            .post('/signUp/student', {
                firstName,
                lastName,
                email,
                password,
                number,
                gender,
                age,
                avatar,
                course_id: selectedCourseIds,
                forfait_id,
            })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Student saved successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setIsSaving(false);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setNumber('');
                setGender('');
                setAge('');
                setAvatar('');
                setSelectedCourseIds([]);
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
        <>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/" style={{ color: "#4fd1c5" }}>school</a>
                            <div className="d-flex ms-auto align-items-center">
                                <p className="me-3 mb-0">Are you a Teacher?</p>
                                <a className="navbar-brand" style={{ color: "#4fd1c5", fontSize: "16px" }} href='/register/teacher'>Apply as Teacher</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div style={{ margin: 'auto', padding: '40px' }}>
                            <h2 className="text-center" style={{ padding: '20px' }}>Sign Up As student</h2>
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            value={firstName}
                                            placeholder="First Name"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            value={lastName}
                                            placeholder="Last Name"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="number"
                                        name="number"
                                        value={number}
                                        placeholder="Number Phone"
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <select
                                        className="form-control"
                                        id="gender"
                                        name="gender"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="children">Children</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                <label htmlFor="courseSelect">Select Courses:</label>
                                <select multiple={true} className="form-control multi-select" id="courseSelect" value={selectedCourseIds} onChange={handleCourseChange}>
                                {courses.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.type}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="submit"
                                    className="btn"
                                    style={{ width: "120px", backgroundColor: "#4fd1c5", color: "#ffffff", borderRadius: '40px', marginLeft: '35%' }}
                                >
                                    {isSaving ? 'Saving...' : 'Sign Up'}
                                </button>
                                <p className="text-center">
                                    Already have an account? <Link to="/login" style={{ color: "#4fd1c5" }}>Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterStudent;
