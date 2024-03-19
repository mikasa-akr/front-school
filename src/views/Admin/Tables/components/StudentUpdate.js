import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Container, FormControl, FormLabel,Text, Input, Select, VStack, Grid } from "@chakra-ui/react";
import Card from '../../../../components/Card/Card';

function StudentUpdate() {
    const [id, setId] = useState(useParams().id)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [age, setAge] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [forfaits, setForfait] = useState([]);
    const [forfaitId, setSelectedForfaitId] = useState('');

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
            setForfait(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        axios.put(`/crud/student/${id}/edit`)
        .then(function (response) {
            let student = response.data
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setEmail(student.email);
            setGender(student.gender);
            setNumber(student.number);
            setAge(student.age);
            setSelectedCourseId(student.course.id);
            setSelectedForfaitId(student.forfait.id);

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
        axios.put(`/crud/student/${id}/edit`, {
            firstName: firstName,
            lastName: lastName,
            email:email,
            gender:gender,
            number:number,
            age:age,
            course_id: selectedCourseId,
            forfait_id: forfaitId,

        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Student updated successfully!',
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
                    <h2 style={{ color: '#ffffff' }}>Edit Student</h2>
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
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            name="gender"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="children">Children</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Age:</FormLabel>
                        <Input
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            type="date"
                            name="age"
                        />
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
                    <FormControl>
                        <FormLabel>Select Forfait:</FormLabel>
                        <Select
                            value={forfaitId}
                            onChange={(e) => setSelectedForfaitId(e.target.value)}
                            name="forfait"
                        >
                            {forfaits.map(forfait => (
                                <option key={forfait.id} value={forfait.id}>{forfait.title}</option>
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
                        {isSaving ? "Saving..." : "Update student"}
                    </Button>
                    <Text color="gray.500" textAlign="center">
                        <Link to="/admin/tables/*">View All Students</Link>
                    </Text>            
                      </VStack>
            </Container>
        </Card>
    );
}

export default StudentUpdate;
