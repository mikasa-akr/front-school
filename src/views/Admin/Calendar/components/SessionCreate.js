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
  Input,
  useColorModeValue,
  VStack,
  Heading,
} from '@chakra-ui/react';
import Card from '../../../../components/Card/Card';

function SessionCreate() {
  const [time_start, setTimeStart] = useState('');
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState('');
  const [genders, setGenders] = useState([]);
  const [selectedGenderId, setSelectedGenderId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  useEffect(() => {
    async function fetchData() {
      try {
        const genderResponse = await axios.get('/gender');
        setGenders(genderResponse.data);

        const groupResponse = await axios.get(`/group/session`);
        setGroups(groupResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleSave = () => {
    setIsSaving(true);
  
    console.log("Group ID:", groupId); 
    console.log("Group:", groups);

  
    axios
      .post('/session/signUp/session', {
        time_start: time_start,
        groupe_id: groupId,
      })
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Session saved successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        setTimeStart('');
        setGroupId('');
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
  
  const handleAutoSave = () => {
    setIsAutoSaving(true);
  
    console.log("Group ID:", groupId); 
    console.log("Group:", groups);

    axios
      .post('/session/autoRegisterSessions', {
        time_start: time_start,
        groupe_id: groupId,
      })
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Session saved successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsAutoSaving(false);
        setTimeStart('');
        setGroupId('');
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsAutoSaving(false);
      });
  };

  // Filter groups based on selected gender ID
  const filteredGroups = selectedGenderId ? groups.filter(group => group.gender_id === Number(selectedGenderId)) : [];

  return (
    <Card>
      <Container mt="8%">
        <VStack spacing="5" align="center">
          <Heading as="h2" textAlign="center">Create Session</Heading>
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
            <FormLabel htmlFor="gender">Select Gender:</FormLabel>
            <Select
              id="gender"
              name="gender"
              value={selectedGenderId}
              onChange={(event) => setSelectedGenderId(event.target.value)}
            >
              <option  value=''>Select Gender</option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.name}
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
              <option  value=''>Select Group</option>
              {filteredGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  Group {group.id} (Teacher: {group.teacher_first} {group.teacher_last  })
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
            Save Session
          </Button>
          <Button
            onClick={handleAutoSave}
            colorScheme="teal"
            borderRadius="xl"
            isLoading={isAutoSaving}
            loadingText="Creating..."
            mt="3"
          >
            Create Automatic Sessions
          </Button>
        </VStack>
      </Container>
    </Card>
  );
}

export default SessionCreate;
