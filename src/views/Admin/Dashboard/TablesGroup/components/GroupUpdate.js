import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Container, FormControl, FormLabel, Input, Select,Text, VStack, Grid, Flex,Heading } from "@chakra-ui/react";
import Card from '../../../../../components/Card/Card';

function GroupUpdate() {
    const [id, setId] = useState(useParams().id)
    const [type, setType] = useState('');
    const [number, setNumber] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [teacherId, setTeacherId] = useState('');
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [isSaving, setIsSaving] = useState(false);


    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await axios.get('/crud/teacher/');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        }
        fetchTeachers();
    }, []);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await axios.get('/crud/student/');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
        fetchStudents();
    }, []);

    useEffect(() => {
        axios.put(`/group/${id}/edit`)
        .then(function (response) {
            let group = response.data
            setType(group.type);
            setNumber(group.number);
            setStudentId(group.student_id.id);
            setTeacherId(group.teacher_id.id);
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
        axios.put(`/group/${id}/edit`, {
            type: type,
            number: number,
            student_id: studentId,
            teacher_id: teacherId,

        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Group updated successfully!',
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
        <Flex>
          <Container mt="10%">
            <VStack spacing="6">
              <Heading as="h4" size="md" color="#ffffff">
                Update Group
              </Heading>
              <Grid templateColumns="1fr" gap="6">
                <FormControl>
                  <FormLabel htmlFor="type">Type:</FormLabel>
                  <Select
                    id="type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    placeholder="Select type"
                    size="md"
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="number">Number:</FormLabel>
                  <Input
                    id="number"
                    type="text"
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    placeholder="Enter number"
                    size="md"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="teacher">Select Teacher:</FormLabel>
                  <Select
                    id="teacher"
                    value={teacherId}
                    onChange={(event) => setTeacherId(event.target.value)}
                    placeholder="Select teacher"
                    size="md"
                  >
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.lastName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="student">Select Student:</FormLabel>
                  <Select
                    id="student"
                    value={studentId}
                    onChange={(event) => setStudentId(event.target.value)}
                    placeholder="Select student"
                    size="md"
                  >
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.firstName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Button
                onClick={handleSave}
                colorScheme="teal"
                borderRadius="xl"
                isLoading={isSaving}
                loadingText="Saving..."
              >
                Save Group
              </Button>
              <Text color="gray.500" textAlign="center">
                        <Link to="/admin/table/group/*">View All Groups</Link>
                    </Text>
            </VStack>
          </Container>
        </Flex>
      );
}

export default GroupUpdate;
