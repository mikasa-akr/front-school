import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Card from '../../../../components/Card/Card';

function ListeGroupe() {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    axios.get(`/crud/teacher/listeGroupe/${ID}`)
      .then(function (response) {
        setGroups(response.data);
      })
      .catch(function (error) {
        console.error('Error fetching groups:', error);
      });
  }, [ID]);

  useEffect(() => {
    axios.get(`/crud/teacher/Groupes/${ID}`)
      .then(function (response) {
        setSelectedGroups(response.data);
      })
      .catch(function (error) {
        console.error('Error fetching selected groups:', error);
      });
  }, [ID]);

  const handleAssociateTeacherWithGroup = (groupId) => {
    axios.post(`/crud/teacher/selectGroup/${ID}/${groupId}`)
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Group selected successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(function (error) {
        console.error('Error selecting group:', error);
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          text: 'Failed to select the group. Please try again.',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <Card mt="10%" bg={bgColor} borderRadius={'20px'}>
      <Flex justify="space-between" mb="4">
        <Heading>Select Group</Heading>
      </Flex>
      <Divider mb="4"/>
      <Flex>
        <Box w="100%">
        <List spacing={3}>
          {groups.map((group) => (
            <ListItem key={group.id}>
              <Flex justify="space-between" alignItems="center" width="100%">
                <Flex flexDirection="column">
                  <Text>Number: {group.number}</Text>
                  <Text>Type: {group.type}</Text>
                </Flex>
                <Button
                  variant="outline"
                  borderColor="teal.500"
                  color="teal.500"
                  onClick={() => handleAssociateTeacherWithGroup(group.id)}
                >
                  Select
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
          <Button colorScheme="teal" onClick={onOpen}>View Selected Groups</Button>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selected Groups</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {selectedGroups.map((group) => (
                <ListItem key={group.id}>
                  <Text>Number: {group.number}</Text>
                  <Text>Type: {group.type}</Text>
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default ListeGroupe;
