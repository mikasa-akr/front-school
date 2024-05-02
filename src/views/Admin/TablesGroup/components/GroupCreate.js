import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';

function GroupCreate() {
  const [type, setType] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [genders, setGenders] = useState([]);
  const [genderId, setGenderId] = useState('');
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]); // Define filteredStudents state

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
    async function fetchGender() {
      try {
        const response = await axios.get('/gender');
        setGenders(response.data);
      } catch (error) {
        console.error('Error fetching gender:', error);
      }
    }
    fetchGender();
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
  }, [teachers]); // Trigger the fetchStudents function when teachers state changes
  
  // Move the filtering logic inside the useEffect hook
  useEffect(() => {
    const filteredStudents = students.filter((student) => {
      const selectedTeacher = teachers.find((t) => t.id === parseInt(teacherId));
  
      if (type === 'private' && teacherId && genderId) {
        return (
          student.subscription === 'private' &&
          selectedTeacher && // Ensure selectedTeacher is defined
          student.course_types.some(course => course.trim().toLowerCase() === selectedTeacher.course_name.trim().toLowerCase()) &&
          student.gender_id === Number(genderId)
        );
      } else if (type === 'public' && teacherId && genderId) {
        return (
          student.subscription === 'public' &&
          selectedTeacher && // Ensure selectedTeacher is defined
          student.course_types.some(course => course.trim().toLowerCase() === selectedTeacher.course_name.trim().toLowerCase()) &&
          student.gender_id === Number(genderId)
        );
      }
    });
  
    setFilteredStudents(filteredStudents); // Set filteredStudents state
  }, [students, type, teacherId, genderId, teachers]); // Trigger the filtering logic when dependencies change
  
  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setStudentId(selectedOptions);
  };

  const filteredTeachers = teachers.filter(teacher => teacher.gender_id === Number(genderId));  

  const handleSave = () => {
    setIsSaving(true);
  
    // Create FormData object
    const formData = new FormData();
    formData.append('type', type);
    formData.append('genderId', genderId);
    formData.append('teacherId', teacherId);

    studentId.forEach(id => formData.append('studentId[]', id));
  
    axios
      .post('/group/signUp/group', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      })
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Group saved successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        setType('');
        setTeacherId('');
        setStudentId('');
        setGenderId('');
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
    <Flex>
      <Container mt="10%">
        <VStack spacing="6">
          <Heading as="h4" size="md" color="#ffffff">
            Create Group
          </Heading>
          <FormControl>
            <FormLabel htmlFor="gender">Select Gender:</FormLabel>
            <Select
              id="gender"
              value={genderId}
              onChange={(event) => setGenderId(event.target.value)}
              size="md"
            >
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.name}
                </option>
              ))}
            </Select>
          </FormControl>
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
            <FormLabel htmlFor="teacher">Select Teacher:</FormLabel>
            <Select
              id="teacher"
              value={teacherId}
              onChange={(event) => setTeacherId(event.target.value)}
              size="md"
            >
              {filteredTeachers.map((teacher) => (
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
              onChange={handleChange}
              size="md"
              multiple
            >
              {filteredStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
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

export default GroupCreate;
