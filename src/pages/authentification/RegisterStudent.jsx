import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, FormControl, FormLabel, Text, Input, Select, Checkbox, Stack,Box } from '@chakra-ui/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import logo from '../../assets/img/signnn.png';
import image from '../../assets/img/Snapshot_2024-04-23_15-26-04-removebg-preview.png';
import { css } from '@emotion/react';
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
    const [studentId, setStudentId] = useState(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState([]);    
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const [selectedGenderId, setSelectedGenderId] = useState(''); // Single gender ID
    const navigate = useNavigate();

    const CustomCardElement = css`
  padding: 10px;
  border: 1px solid #CBD5E0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

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
            setGender(response.data); // Assuming response.data is an array of genders
        } catch (error) {
            console.error('Error fetching genders:', error);
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
            formData.append('gender_id', selectedGenderId);
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
    
            console.log('Response data:', response.data);
            
            const { clientSecret, studentId } = response.data;
            console.log('Student ID:', studentId);
            
            setStudentId(studentId);
    
            if (method === 'stripeCard') {
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
                    setAge('');
                    setAvatar(null);
                    setSelectedCourseIds([]);
                    setSelectedGenderId('');
    
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration and payment successful!',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        navigate('/login');
                    });
                }
            } else {
                // Handle non-Stripe payment methods
                setSuccess(true);
                setIsSaving(false);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setNumber('');
                setAge('');
                setAvatar(null);
                setSelectedCourseIds([]);
                setSelectedGenderId('');
    
                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful!',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    navigate('/login');
                });
            }
        } catch (error) {
            setIsSaving(false);
            setError('An error occurred during registration and payment.');
            console.error('Error registering and paying:', error);
        }
    };
    

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
        setFileTransaction(e.target.files[0]);
    };

    const handleCourseCheckboxChange = (courseId) => {
        if (selectedCourseIds.includes(courseId)) {
            setSelectedCourseIds(selectedCourseIds.filter(id => id !== courseId));
        } else {
            setSelectedCourseIds([...selectedCourseIds, courseId]);
        }
    };

    return (
        <>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/" style={{ color: "#4fd1c5" }}>
                                <img src={image} style={{ color: '#4FD1C5', width: '150px' }} />
                            </a>
                            <div className="d-flex ms-auto align-items-center">
                                <p className="me-3 mb-0">Are you a Teacher?</p>
                                <a className="navbar-brand" style={{ color: "#4fd1c5", fontSize: "16px" }} href='/register/teacher'>Apply as Teacher</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '50%' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div style={{
                                    width: '200%',
                                    borderRadius: '25px',
                                    transition: 'background-color 0.3s',
                                }}>
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
                                                id="genderSelect"
                                                value={selectedGenderId} // Use selectedGenderId directly for single selection
                                                onChange={(e) => setSelectedGenderId(e.target.value)} // Update the selected gender ID
                                            >
                                                <option value="">Select Gender</option> {/* Default option */}
                                                {gender.map(gender => (
                                                    <option key={gender.id} value={gender.id}>
                                                        {gender.name}
                                                    </option>
                                                ))}
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
                                            <Stack spacing={2}>
                                                {courses.map(course => (
                                                    <Checkbox
                                                        key={course.id}
                                                        value={course.id}
                                                        isChecked={selectedCourseIds.includes(course.id)}
                                                        onChange={() => handleCourseCheckboxChange(course.id)}
                                                    >
                                                        {course.type}
                                                    </Checkbox>
                                                ))}
                                            </Stack>
                                        </div>
                                        <Box maxW="500px" mx="auto" p={4} boxShadow="md" borderRadius="md" bg="white">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Avatar</Text>
      <Input type="file" onChange={handleFileChange} mb={4} p={2} border="1px solid #CBD5E0" borderRadius="md" />

      <Text fontSize="2xl" color="#4fd1c5" mb={4}>Payment</Text>
      <FormControl mb={4}>
        <FormLabel>Payment Method</FormLabel>
        <Select value={method} onChange={(e) => setMethod(e.target.value)} p={2} border="1px solid #CBD5E0" borderRadius="md">
          <option value="stripeCard">Stripe Card</option>
          <option value="transaction">File Transaction</option>
        </Select>
      </FormControl>

      {method === 'stripeCard' && (
        <FormControl mb={4}>
          <FormLabel>Card Details</FormLabel>
          <Box css={CustomCardElement}>
            <CardElement options={{ hidePostalCode: true }} />
          </Box>
        </FormControl>
      )}

      {method === 'transaction' && (
        <FormControl mb={4}>
          <FormLabel>Upload Transaction File</FormLabel>
          <Input type="file" onChange={handleFileChange} p={2} border="1px solid #CBD5E0" borderRadius="md" />
        </FormControl>
      )}
    </Box>
                                        {error && <Text color="red.500">{error}</Text>}
                                        {success && <Text color="green.500">Payment successful!</Text>}
                                        <button
                                            disabled={isSaving}
                                            onClick={handleRegisterAndPay}
                                            type="button"
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
                </div>
                <div>
                    <img src={logo} alt="Logo" style={{ marginLeft: '28%', background: '#f7fafc' }} />
                </div>
            </div>
        </>
    );
}

export default RegisterStudent;
