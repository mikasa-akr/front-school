import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT token
import { Link } from 'react-router-dom';
import teacher from '../../Icons/teacher.png';
import student from '../../Icons/student.png';

function ChooseRes() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsButtonDisabled(false);
    };

    return (
        <>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light ">
                        <div className="container-fluid">
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/">Edu School</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '45px' }}>
                <h1>Join as a Student or Teacher</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        onClick={() => handleOptionSelect('student')}
                        style={{ cursor: 'pointer', marginRight: '20px', border: selectedOption === 'student' ? '2px solid #4fd1c5' : '2px solid #ada9a9', padding: '15px', borderRadius: '20px' }}
                    >
                        <img src={student} style={{ width: '40px' }} alt="Student" />
                        <p>I'm a student, <tr></tr>looking for courses</p>
                    </div>
                    <div
                        onClick={() => handleOptionSelect('teacher')}
                        style={{ cursor: 'pointer', border: selectedOption === 'teacher' ? '2px solid #4fd1c5' : '2px solid #ada9a9', padding: '22px', borderRadius: '20px' }}
                    >
                        <img src={teacher} style={{ width: '40px' }} alt="Teacher" />
                        <p>I'm a teacher,<tr></tr> looking for work</p>
                    </div>
                </div>
                <Link to={isButtonDisabled ? '#' : (selectedOption === 'student' ? '/register/forfait' : '/register/teacher')}>
                    <button style={{ marginTop: '20px', borderRadius: '25px', backgroundColor: "#4fd1c5", color: "#ffffff", padding: '10px 20px', border: 'none', cursor: isButtonDisabled ? 'not-allowed' : 'pointer', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} disabled={isButtonDisabled}>Sign Up as {selectedOption === 'student' ? 'Student' : 'Teacher'}</button>
                </Link>

                <p className="text-center" style={{ marginTop: '10px' }} >
                    Already have an account? <Link to="/login" style={{ color: "#4fd1c5" }}>Log in</Link>
                </p>
            </div>
        </>
    );
}

export default ChooseRes;
