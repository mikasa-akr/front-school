import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, FormControl, FormLabel, Text, Input, Select } from '@chakra-ui/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img/signnn.png';

const RegisterStudent = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const forfait_id = queryParams.get('forfait_id');
    const amount = queryParams.get('forfait_price');

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [method, setMethod] = useState('stripeCard');
    const [fileTransaction, setFileTransaction] = useState(null);
    const [studentId, setStudentId] = useState(null); // State to store student ID

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/course');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleRegisterAndPay = async () => {
        setIsSaving(true);
    
        if (!selectedCourseIds.length) {
            setError('Please select at least one course.');
            setIsSaving(false);
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('number', number);
            formData.append('gender', gender);
            formData.append('age', age);
            formData.append('avatar', avatar);
            const courseIdsAsNumbers = selectedCourseIds.map(id => Number(id));
            formData.append('course_ids', JSON.stringify(courseIdsAsNumbers));
            formData.append('forfait_id', forfait_id);
            formData.append('method', method);
            formData.append('amount', amount);
            formData.append('fileTransaction', fileTransaction);
    
            const response = await axios.post('/signUp/student', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log('Response data:', response.data); // Log the response data
            
            const { clientSecret, studentId } = response.data;
            console.log('Student ID:', studentId); // Log the student ID
            
            setStudentId(studentId);
    
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });
    
            if (paymentResult.error) {
                setIsSaving(false);
                setError(`Payment failed: ${paymentResult.error.message}`);
            } else {
                setSuccess(true);
                setIsSaving(false);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setNumber('');
                setGender('');
                setAge('');
                setAvatar(null);
                setSelectedCourseIds([]);
    
                Swal.fire({
                    icon: 'success',
                    title: 'Registration and payment successful!',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    // Call saveData only if studentId is available
                    if (studentId) {
                        saveData(studentId, formData);
                    }
                });
            }
        } catch (error) {
            setIsSaving(false);
            setError('An error occurred during registration and payment.');
            console.error('Error registering and paying:', error);
        }
    };
    
    
    const saveData = async (studentId) => {
        console.log('Student ID in saveData:', studentId); // Log the student ID
        if (!studentId) {
            console.warn('studentId not available yet. Skipping saveData');
            return;
        }
    
        try {
            const formData = new FormData();
    
            await axios.post(`/save/${studentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
        setFileTransaction(e.target.files[0]);
    };
    return (
        <>
        <div className="row justify-content-md-center">
            <div className="col-12">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/" style={{ color: "#4fd1c5" }}>Edu School</a>
                        <div className="d-flex ms-auto align-items-center">
                            <p className="me-3 mb-0">Are you a Teacher?</p>
                            <a className="navbar-brand" style={{ color: "#4fd1c5", fontSize: "16px" }} href='/register/teacher'>Apply as Teacher</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <div style={{ width: '50%', }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div style={{width: '200%',
                                    borderRadius: '25px',
                                    transition: 'background-color 0.3s',}}>
                                <h1 className="text-center" style={{ color: "#4fd1c5" }}>Sign Up As Student</h1>
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
                                        <select
    multiple={true}
    className="form-control multi-select"
    id="courseSelect"
    value={selectedCourseIds}
    onChange={(e) => setSelectedCourseIds(Array.from(e.target.selectedOptions, (option) => option.value))}
>
    {courses.map(course => (
        <option key={course.id} value={course.id}>
            {course.type}
        </option>
    ))}
</select>
                                    </div>
                                    <Input type="file" onChange={handleFileChange} />
                                    <Text>Payment</Text>
                                    <FormControl mb={4}>
                <FormLabel>Payment Method</FormLabel>
                <Select value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="stripeCard">Stripe Card</option>
                    <option value="transaction">File Transaction</option>
                </Select>
            </FormControl>
            {method === 'stripeCard' && (
                <FormControl mb={4}>
                    <FormLabel>Card Details</FormLabel>
                    <CardElement options={{ hidePostalCode: true }} />
                </FormControl>
            )}
            {method === 'transaction' && (
                <FormControl mb={4}>
                    <FormLabel>Upload Transaction File</FormLabel>
                    <Input type="file" onChange={handleFileChange} />
                </FormControl>
            )}
            {error && <Text color="red.500">{error}</Text>}
            {success && <Text color="green.500">Payment successful!</Text>}
                                        <Button colorScheme="teal" onClick={handleRegisterAndPay} disabled={!stripe || isSaving}>
                                            {isSaving ? 'Processing...' : 'Register & Pay'}
                                        </Button>
                                    <p className="text-center">
                                        Already have an account? <Link to="/login" style={{ color: "#4fd1c5" }}>Login here</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={logo} alt="Logo" style={{ marginLeft: '28%', background: '#f7fafc' }} />
            </div>
        </div>
        </>
    );
}

export default RegisterStudent;
