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
  Grid,
  Text,
  Flex,
} from '@chakra-ui/react';
import Card from '../../../../components/Card/Card';

function SessionCreate() {
  const [time_start, setTimeStart] = useState('');
  const [visibility, setVisibility] = useState('');
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  useEffect(() => {
    async function fetchGroups() {
      try {
          const response = await axios.get(`/group/`);
          setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    }
    fetchGroups();
  });

  const handleSave = () => {
    setIsSaving(true);

    axios
      .post('/session/signUp/session', {
        time_start: time_start,
        groupe_id: groupId,
        visibility: visibility
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
        setVisibility('');
        setGroupId('');
        setGroups([]);
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
    <Card>
      <Container mt="8%">
        <VStack spacing="5" align="center">
          <Heading as="h2" textAlign="center">Create Session</Heading>
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
              <FormLabel htmlFor="groupId">Group:</FormLabel>
              <Select
                id="groupId"
                name="groupId"
                value={groupId}
                onChange={(event) => setGroupId(event.target.value)}
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    Group {group.id}
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
        </VStack>
      </Container>
    </Card>
  );
}

export default SessionCreate;
