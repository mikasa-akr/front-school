import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Select, Button, VStack, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function ProfileUpdateForm({ profileData }) {
    const id = localStorage.getItem("id");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [age, setAge] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        axios.get(`/crud/student/${id}`)
        .then(function (response) {
            let student = response.data;
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setEmail(student.email);
            setGender(student.gender);
            setNumber(student.number);
            setAge(student.age);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            });
        });
    }, [id]);

    const handleSave = () => {
        setIsSaving(true);
        axios.put(`/crud/student/${id}/edit`, {
            firstName: firstName,
            lastName: lastName,
            email:email,
            gender:gender,
            number:number,
            age:age,
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
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            });
            setIsSaving(false);
        });
    }

    return (
        <VStack spacing="5" align="center">
            <h2>Edit Profile</h2>
            <Grid templateColumns="repeat(2, 1fr)" gap="4">
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
            </Grid>
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
                <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel>Age:</FormLabel>
                <Input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                />
            </FormControl>
            <Button
                onClick={handleSave}
                colorScheme="teal"
                borderRadius="25px"
            >
                Update Profile
            </Button>
        </VStack>
    );
}

export default ProfileUpdateForm;
