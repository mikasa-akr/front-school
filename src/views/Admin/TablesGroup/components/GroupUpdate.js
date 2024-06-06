import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
  Flex,
  Heading,
} from '@chakra-ui/react';

function GroupUpdate() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [teachers, setTeachers] = useState([]); // Add teachers state

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('/crud/student/');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    async function fetchTeachers() {
      try {
        const response = await axios.get('/crud/teacher/'); // Adjust the endpoint based on your backend API
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    }

    fetchStudents();
    fetchTeachers(); // Fetch teachers data
  }, []);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`/group/group/${id}`);
        const group = response.data[0];
  
        const selectedTeacher = teachers.find((t) => t.id === parseInt(group.teacherId));
        
        const filteredStudents = students.filter((student) => {
          if (group.type === 'private' && group.teacherId && group.gender_id) {
            return (
              student.subscription === 'private' &&
              selectedTeacher &&
              student.course_types.some(course => course.trim().toLowerCase() === selectedTeacher.course_name.trim().toLowerCase()) &&
              student.gender_id === Number(group.gender_id)
            );
          } else if (group.type === 'public' && group.teacherId && group.gender_id) {
            return (
              student.subscription === 'public' &&
              selectedTeacher &&
              student.course_types.some(course => course.trim().toLowerCase() === selectedTeacher.course_name.trim().toLowerCase()) &&
              student.gender_id === Number(group.gender_id)
            );
          }
        });
        
  
        setFilteredStudents(filteredStudents);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };
  
    fetchGroupDetails();
  }, [id, students, teachers]);
  
  const handleSave = () => {
    setIsSaving(true);
    axios
      .put(`/group/${id}/edit`, {
        student_id: studentId,
      })
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Student added to group successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          text: 'Failed to add student to group.',
        });
        setIsSaving(false);
      });
  };

  return (
    <Flex>
      <Container mt="10%">
        <VStack spacing="6">
          <Heading as="h4" size="md" color="#ffffff">
            Add Student to Group
          </Heading>
          <FormControl>
            <FormLabel htmlFor="student">Select Student:</FormLabel>
            <Select
              id="student"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              placeholder="Select student"
              size="md"
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
            loadingText="Adding..."
          >
            Add Student to Group
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
