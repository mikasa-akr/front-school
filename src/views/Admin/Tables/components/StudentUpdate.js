import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Select, Button, VStack,Text } from "@chakra-ui/react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useParams } from "react-router-dom";

function StudentUpdate({ }) {
    const [id, setId] = useState(useParams().id)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [age, setAge] = useState('');
    const [genders, setGenders] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios.get(`/crud/student/${id}`)
        .then(function (response) {
            let student = response.data;
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setEmail(student.email);
            setGender(student.genders);
            setNumber(student.number);
            setAge(student.age);
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 1500
            });
        });

        // Fetch genders when component mounts
        fetchGender();
    }, [id]);

    const fetchGender = async () => {
        try {
            const response = await axios.get('/gender');
            if (Array.isArray(response.data)) {
                setGenders(response.data);
            } else {
                console.error('Error: response data is not an array:', response.data);
                setGenders([]); // Set genders to empty array if data is invalid
            }
        } catch (error) {
            console.error('Error fetching genders:', error);
            setGenders([]); // Set genders to empty array if there's an error
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        axios.put(`/crud/student/${id}/edit`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            number: number,
            age: age
                })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Student updated successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            setIsSaving(false);
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 1500
            });
            setIsSaving(false);
        });
    }

    return (
        <VStack spacing="5" w="80%" ml='10%' h="100%" mt={'10%'}>
                <FormControl>
                    <FormLabel>First Name:</FormLabel>
                    <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Last Name:</FormLabel>
                    <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormControl>
            <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Phone Number:</FormLabel>
                <Input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="tel"
                />
            </FormControl>
            <FormControl>
    <FormLabel>Gender:</FormLabel>
    {genders && (
        <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
        >
                <option value=''>Select Gender</option>
            {genders.map((genderOption, index) => (
                <option key={index} value={genderOption.id}>{genderOption.name}</option>
            ))}
        </Select>
    )}
</FormControl>
<FormControl>
    <FormLabel>Age:</FormLabel>
    <Input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="date"
    />
</FormControl>
            <Button
                onClick={handleSave}
                colorScheme="teal"
                borderRadius="25px"
            >
                Update Profile
            </Button>
            <Text color="gray.500" textAlign="center">
                        <Link to="/admin/tables/*">View All Students</Link>
                    </Text>  
        </VStack>
    );
}

export default StudentUpdate;
