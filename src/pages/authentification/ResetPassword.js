import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const email = searchParams.get('email');

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationError('');

        if (password !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        setIsSubmitting(true);

        axios
            .post('/reset-password', { email, password })
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Password reset successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/login'); // Redirect to login page after success
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
                            <h1 className="text-center" style={{ color: "#4fd1c5" }}>Reset Password</h1>
                            <p style={{ color: "#a0aec0" }} className="text-center">Enter your new password</p>
                            <form onSubmit={handleSubmit}>
                                {validationError && (
                                    <p className="text-center">
                                        <small className="text-danger">{validationError}</small>
                                    </p>
                                )}
                                <div className="mb-3">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        placeholder="New Password"
                                        style={{ borderRadius: '10px' }}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        placeholder="Confirm Password"
                                        style={{ borderRadius: '10px' }}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
