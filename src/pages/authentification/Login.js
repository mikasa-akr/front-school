import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT token
import { Link } from 'react-router-dom';
import logo from '../../assets/img/signnn.png';

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const loginAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        axios
            .post('/login_check', { email, password, id })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                const dataID = response.data.data.id;
                localStorage.setItem('id', dataID);

                // Decode the token and extract user roles
                const roles = jwtDecode(token).roles.filter(role => role !== 'ROLE_USER');
                console.log(roles);
                // Redirect based on user roles
                if (roles.includes('ROLE_ADMIN')) {
                    navigate('/admin/dashboard');
                } else if (roles.includes('ROLE_TEACHER')) {
                    navigate('/teacher/dashboard');
                } else if (roles.includes('ROLE_STUDENT')) {
                    navigate('/student/dashboard');
                } else {
                    navigate('/');
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                if (error.response && error.response.data && error.response.data.error) {
                    setValidationError(error.response.data.error);
                } else {
                    setValidationError('An error occurred. Please try again later.');
                }
            });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '50%' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div
                                style={{
                                    width: '100%',
                                    marginLeft: '18%',
                                    borderRadius: '25px',
                                    padding: '50px',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <h1 className="text-center" style={{ color: "#4fd1c5" }}>Log in</h1>
                                <p style={{ color: "#a0aec0" }} class="chakra-text css-vapw0r">Enter your email and password to sign in</p>
                                <form onSubmit={loginAction}>
                                    {validationError && (
                                        <p className="text-center">
                                            <small className="text-danger">{validationError}</small>
                                        </p>
                                    )}
                                    <div className="mb-3">
                                        <label>Email </label>
                                        <input
                                            type="email"
                                            className="form-control input-shadow"
                                            id="email"
                                            name="email"
                                            value={email}
                                            placeholder="Email"
                                            style={{ borderRadius: '10px' }}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Password </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={password}
                                            placeholder="Password"
                                            style={{ borderRadius: '10px' }}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            style={{ borderRadius: '9px', backgroundColor: "#4fd1c5", color: "#ffffff" }}
                                            className="btn btn-block"
                                        >
                                            {isSubmitting ? 'Logging in...' : 'Login'}
                                        </button>
                                        <p className="text-center">
                                            Don't have an account? </p>
                                        <Link to="/register" className="btn btn-outline" style={{ borderRadius: '9px', border: "2px solid #4fd1c5", color: "#4fd1c5" }}>Sign Up</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={logo} alt="Logo" style={{ marginLeft: '10%', background: '#f7fafc' }} />
            </div>
        </div>
    );
}

export default Login;
