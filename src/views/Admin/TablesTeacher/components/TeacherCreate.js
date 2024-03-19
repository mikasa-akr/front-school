import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Container, FormControl, FormLabel, Input, Select, VStack, Heading, Text, Grid, Box } from "@chakra-ui/react";
import Card from '../../../../components/Card/Card';

function TeacherCreate() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/course'); // Adjust the URL accordingly
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        axios.post('/signUp/teacher', {
            firstName,
            lastName,
            email,
            password,
            number,
            gender,
            avatar,
            course_id: selectedCourseId,
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Teacher saved successfully!',
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
            setAvatar('');
            setSelectedCourseId('');
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
        <Card>
            <Container mt="8%">
                <VStack spacing="5" align="center">
                    <Heading as="h2" textAlign="center">Create Teacher</Heading>
                    <Grid templateColumns="1fr 1fr" gap="6">
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter first name"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter last name"
                            />
                        </FormControl>
                    </Grid>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter email address"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter password"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Number Phone</FormLabel>
                        <Input
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Enter phone number"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Select gender"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="children">Children</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Select Course</FormLabel>
                        <Select
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(e.target.value)}
                        >
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.type}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        onClick={handleSave}
                        colorScheme="teal"
                        borderRadius="xl"
                        isLoading={isSaving}
                        loadingText="Saving..."
                    >
                        Save Teacher
                    </Button>
                    <Text color="gray.500" textAlign="center">
                        <Link to="/admin/table/teacher/*">View All Teachers</Link>
                    </Text>
                </VStack>
            </Container>
        </Card>
    );
    
}

export default TeacherCreate;
