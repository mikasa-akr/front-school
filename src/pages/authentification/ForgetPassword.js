import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        axios
            .post('/password', { email})
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Email sended successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
        
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div style={{ borderRadius: '25px', padding: '50px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
                            <h1 className="text-center" style={{ color: "#4fd1c5" }}>Forget Password</h1>
                            <p style={{ color: "#a0aec0" }} className="text-center">Enter your email</p>
                            <form onSubmit={handleSubmit}>
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
                                <div className="d-grid gap-2">
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ borderRadius: '9px', backgroundColor: "#4fd1c5", color: "#ffffff" }}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                    <p className="text-center" style={{ marginTop: '10px' }} >
                                     <Link to="/login" style={{ color: "#4fd1c5" }}>Log in </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
