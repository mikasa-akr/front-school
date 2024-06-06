import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Select, Button, VStack,Text } from "@chakra-ui/react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useParams } from "react-router-dom";

function TeacherUpdate() {
    const [id, setId] = useState(useParams().id)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        axios.get(`/crud/teacher/${id}`)
            .then(function (response) {
                let teacher = response.data;
                setFirstName(teacher.firstName);
                setLastName(teacher.lastName);
                setEmail(teacher.email);
                setNumber(teacher.number);
                setGender(teacher.genders);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
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
        axios.put(`/crud/teacher/${id}/edit`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            number: number
                })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Teacher updated successfully!',
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
    };

    return (
        <VStack spacing="5" w="80%" ml='10%' h="100%" as="form" mt={'10%'}>
            <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="CredentialUsr"
                    autoComplete="off"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="tel"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Gender</FormLabel>
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
            <Button
                onClick={handleSave}
                colorScheme="teal"
                borderRadius="25px"
                isLoading={isSaving}
            >
                Update Profile
            </Button>
            <Text color="gray.500" textAlign="center">
                        <Link to="/admin/table/teacher/*">View All Teachers</Link>
                    </Text>  
        </VStack>
    );
}

export default TeacherUpdate;
