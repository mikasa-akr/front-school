import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Container, FormControl, FormLabel, Input, Select, VStack, Heading, Text, Grid, Box } from "@chakra-ui/react";
import Card from '../../../../../components/Card/Card';

function StudentCreate() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [forfaits, setForfaits] = useState([]);
    const [selectedForfaitId, setSelectedForfaitId] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchCourses();
        fetchForfait();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/course'); // Adjust the URL accordingly
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchForfait = async () => {
        try {
            const response = await axios.get('/crud/forfait'); // Adjust the URL accordingly
            setForfaits(response.data);
        } catch (error) {
            console.error('Error fetching forfaits:', error);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        axios.post('/signUp/student', {
            firstName,
            lastName,
            email,
            password,
            number,
            gender,
            age,
            avatar,
            course_id: selectedCourseId,
            forfait_id: selectedForfaitId,
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
            setSelectedCourseId('');
            setSelectedForfaitId('');
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
        <Card >
            <Container mt="8%">
                <VStack spacing="5" align="center">
                    <Heading as="h2" textAlign="center">Create Student</Heading>
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
                        <FormLabel>Age</FormLabel>
                        <Input
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            type="date"
                            placeholder="Enter age"
                        />
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
                    <FormControl>
                        <FormLabel>Select Forfait</FormLabel>
                        <Select
                            value={selectedForfaitId}
                            onChange={(e) => setSelectedForfaitId(e.target.value)}
                        >
                            {forfaits.map(forfait => (
                                <option key={forfait.id} value={forfait.id}>{forfait.title}</option>
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
                        Save Student
                    </Button>
                    <Text color="gray.500" textAlign="center">
                        <Link to="/admin/tables/*">View All Students</Link>
                    </Text>
                    
                </VStack>
            </Container>
        </Card>
    );
    
}

export default StudentCreate;
