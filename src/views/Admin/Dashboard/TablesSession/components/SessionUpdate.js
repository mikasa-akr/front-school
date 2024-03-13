import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Container, FormControl, FormLabel, Input, Select, Text,Grid,VStack, Flex, Heading,useColorModeValue } from "@chakra-ui/react";
import Card from '../../../../../components/Card/Card';

function SessionUpdate() {
  const [id, setId] = useState(useParams().id);
  const [status, setStatus] = useState('');
  const [date_seance, setDateSeance] = useState('');
  const [time_start, setTimeStart] = useState('');
  const [time_end, setTimeEnd] = useState('');
  const [visibility, setVisibility] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

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
    const fetchCourses = async () => {
      try {
        if (teacherId) {
          const response = await axios.get(`/crud/teacher/Courses/${teacherId}`);
          setCourses(Array.isArray(response.data) ? response.data : [response.data]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [teacherId]);

  useEffect(() => {
    async function fetchGroups() {
      try {
        if (teacherId) {
          const response = await axios.get(`/crud/teacher/Groupes/${teacherId}`);
          setGroups(response.data);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    }
    fetchGroups();
  }, [teacherId]);

  useEffect(() => {
    axios.put(`/session/${id}/edit`)
      .then(function (response) {
        let session = response.data;
        setStatus(session.status);
        setTimeStart(session.time_start);
        setTimeEnd(session.time_end);
        setVisibility(session.visibility);
        setGroupId(session.groupe_seance_id.id);
        setTeacherId(session.teacher_id.id);
        setCourseId(session.seance_course_id.id);
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    axios.put(`/session/${id}/edit`, {
      status: status,
      date_seance: date_seance,
      time_start: time_start,
      time_end: time_end,
      seance_course_id: courseId,
      teacher_id: teacherId,
      groupe_seance_id: groupId,
      visibility: visibility
    })
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Session updated successfully!',
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
    <Card>
      <Container mt="8%">
        <VStack spacing="5" align="center">
          <Heading as="h2" textAlign="center">Update Session</Heading>
          <Grid templateColumns="1fr 1fr" gap="6">
            <FormControl mb="3">
              <FormLabel htmlFor="visibility">Visibility:</FormLabel>
              <Input
                type="text"
                id="visibility"
                name="visibility"
                value={visibility}
                onChange={(event) => setVisibility(event.target.value)}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel htmlFor="status">Status:</FormLabel>
              <Input
                type="text"
                id="status"
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel htmlFor="dateSeance">Date Seance:</FormLabel>
              <Input
                type="date"
                id="dateSeance"
                name="dateSeance"
                value={date_seance}
                onChange={(event) => setDateSeance(event.target.value)}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel htmlFor="timeStart">Time Start:</FormLabel>
              <Input
                type="time"
                id="timeStart"
                name="timeStart"
                value={time_start}
                onChange={(event) => setTimeStart(event.target.value)}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel htmlFor="timeEnd">Time End:</FormLabel>
              <Input
                type="time"
                id="timeEnd"
                name="timeEnd"
                value={time_end}
                onChange={(event) => setTimeEnd(event.target.value)}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel htmlFor="teacherId">Teacher:</FormLabel>
              <Select
                id="teacherId"
                name="teacherId"
                value={teacherId}
                onChange={(event) => setTeacherId(event.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.lastName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb="3">
              <FormLabel htmlFor="courseId">Course:</FormLabel>
              <Select
                id="courseId"
                name="courseId"
                value={courseId}
                onChange={(event) => setCourseId(event.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.type}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb="3">
              <FormLabel htmlFor="groupId">Group:</FormLabel>
              <Select
                id="groupId"
                name="groupId"
                value={groupId}
                onChange={(event) => setGroupId(event.target.value)}
              >
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    Group {group.id}
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
                        Save Session
                    </Button>
                    <Text color="gray.500" textAlign="center">
                        <Link to="/admin/table/session/*">View All Sessions</Link>
                    </Text>
        </VStack>
      </Container>
    </Card>
  );
  
}

export default SessionUpdate;
