import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Container, FormControl, FormLabel, Input,Text, Select, VStack, Grid } from "@chakra-ui/react";
import Card from '../../../../components/Card/Card';

function TeacherUpdate() {
    const [id, setId] = useState(useParams().id)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedGenderId, setSelectedGenderId] = useState('');

    useEffect(() => {
        fetchCourses();
        fetchGender();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/course'); // Adjust the URL accordingly
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchGender = async () => {
        try {
            const response = await axios.get('/gender'); // Adjust the URL accordingly
            setGender(response.data);
        } catch (error) {
            console.error('Error fetching genders:', error);
        }
    };

    useEffect(() => {
        axios.put(`/crud/teacher/${id}/edit`)
        .then(function (response) {
            let student = response.data
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setEmail(student.email);
            setGender(student.gender);
            setNumber(student.number);
            setSelectedCourseId(student.course.id);
            setSelectedCourseId(student.gender.id);

        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
          
    }, [])
  
  
    const handleSave = () => {
        setIsSaving(true);
        axios.put(`/crud/teacher/${id}/edit`, {
            firstName: firstName,
            lastName: lastName,
            email:email,
            gender: selectedGenderId,
            number:number,
            course_id: selectedCourseId,

        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Teacher updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
        });
    }

    return (
        <Card>
            <Container mt="8%">
                <VStack spacing="5" align="center">
                    <h2 style={{ color: '#ffffff' }}>Edit Teacher</h2>
                    <Grid templateColumns="repeat(2, 1fr)" gap="4">
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </FormControl>
                    </Grid>
                    <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            name="email"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Number Phone:</FormLabel>
                        <Input
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            type="text"
                            name="number"
                        />
                    </FormControl>
                    <FormControl>
                    <FormLabel>Gender:</FormLabel>
  <Select
                            value={selectedGenderId}
                            onChange={(e) => setSelectedGenderId(e.target.value)}
                            name="genders"
                        >
                            {gender.length > 0 ? ( // Check if genders array has elements
                                gender.map((gend) => (
                                    <option key={gend.id} value={gend.id}>{gend.name}</option>
                                ))
                            ) : (
                                <option disabled>
                                    { // Handle loading or error states
                                        isSaving ? 'Fetching genders...' : 'Error fetching genders'
                                    }
                                </option>
                            )}
                        </Select>
</FormControl>
                    <FormControl>
                        <FormLabel>Select Course:</FormLabel>
                        <Select
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(e.target.value)}
                            name="course"
                        >
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.type}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        disabled={isSaving}
                        onClick={handleSave}
                        type="button"
                        colorScheme="teal"
                        borderRadius="25px"
                    >
                        {isSaving ? "Saving..." : "Update Teacher"}
                    </Button>
                    <Text color="gray.500" textAlign="center">
                        <Link to="/admin/table/teacher/*">View All Teachers</Link>
                    </Text>                
                </VStack>
            </Container>
        </Card>
    );
}

export default TeacherUpdate;
