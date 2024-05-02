import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT token
import { Link } from 'react-router-dom';
import { Modal, ModalOverlay,useColorModeValue,Box,Flex,Text,ModalCloseButton, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import logo from '../../assets/img/signnn.png';

function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false); // State to control modal visibility
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("#F8F9FA", "gray.800");
    const nameColor = useColorModeValue("gray.500", "white");
  
    const loginAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        axios
            .post('/login_check', { email, password })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                const dataID = response.data.data.id;
                localStorage.setItem('id', dataID);
                const datafirst = response.data.data.first_name;
                localStorage.setItem('first_name', datafirst);
                const datalast = response.data.data.last_name;
                localStorage.setItem('last_name', datalast);
                const dataavatar = response.data.data.avatar;
                localStorage.setItem('avatar', dataavatar);
                const datarole = response.data.data.roles;
                if (datarole && datarole.length > 0) {
                    const firstRole = datarole[0];
                    localStorage.setItem('roles', firstRole);
                } else {
                    // Handle the case where no roles are returned
                    localStorage.removeItem('roles');
                }

                // Decode the token and extract user roles
                const roles = jwtDecode(token).roles.filter(role => role !== 'ROLE_USER');
                console.log(roles);
                // Redirect based on user roles
                if (roles.includes('ROLE_ADMIN')) {
                    navigate('/admin/dashboard');
                } else if (roles.includes('ROLE_TEACHER')) {
                    navigate('/teacher/dashboard');
                } else if (roles.includes('ROLE_STUDENT')) {
                    // Assuming you have a payment status in the response data
                    const paymentStatus = response.data.data.status;

                    if (paymentStatus === 'payed') {
                        navigate('/student/dashboard');
                    } else if (paymentStatus === 'not payed') {
                        setShowPaymentModal(true); // Show the payment modal
                    } else {
                        navigate('/student/payment');
                    }
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
        <>
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

    <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Student Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
              <Flex justify="space-between" w="100%">
                <Flex direction="column" maxWidth="70%">

                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                  Your payment is currently unpaid. Please pay before accessing student dashboard.
                  </Text>
                </Flex>
                <Flex
                  direction={{ sm: "column", md: "row" }}
                  align="flex-start"
                  p={{ md: "24px" }}
                />
              </Flex>
            </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setShowPaymentModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
    );
}

export default Login;
