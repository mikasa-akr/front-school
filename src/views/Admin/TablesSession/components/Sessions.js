// Groups.js
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Icon,
  Text,
  Td,
  Tr,
  Grid,
  Button,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Th,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "../../../../components/Card/Card.js";
import CardBody from "../../../../components/Card/CardBody.js";
import CardHeader from "../../../../components/Card/CardHeader.js";
import { FaPencilAlt, FaTrashAlt, FaEye, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import GroupView from './SessionView.js';

function Sessions({ captions, logo }) {
  const [ListeSession, setListeSession] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null); // State to store the selected student
  const [isOpen, setIsOpen] = useState(false); // State to control the modal in StudentView
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  // Function to toggle the modal state and set the selected student
  const toggleModal = (session) => {
    setSelectedSession(session);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
      fetchListeSession();
  }, []);

  const fetchListeSession = () => {
      axios.get('/session')
          .then(function (response) {
              setListeSession(response.data);
              setIsLoaded(true);
          })
          .catch(function (error) {
              console.log(error);
          });
  }

  const handleDelete = (id) => {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
              axios.delete(`/session/${id}`)
                  .then(function (response) {
                      Swal.fire({
                          icon: 'success',
                          title: 'Session deleted successfully!',
                          showConfirmButton: false,
                          timer: 1500
                      });
                      fetchListeSession();
                  })
                  .catch(function (error) {
                      Swal.fire({
                          icon: 'error',
                          title: 'An Error Occured!',
                          showConfirmButton: false,
                          timer: 1500
                      });
                  });
          }
      });
  }

  if (!isLoaded)
      return <div>Loading...</div>;

  return (
    <>
    <Grid>
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
    <Card bg={bgColor} overflowX={{ sm: "scroll", xl: "hidden" }}>
  <CardHeader p="6px 0px 22px 0px">
    <Text fontSize="xl" fontWeight="bold">
      Sessions Table
    </Text>
  </CardHeader>
  <CardBody>
    <Table variant="simple">
      <Thead>
        <Tr my=".8rem" pl="0px" color="gray.400">
          <Th color="gray.400">Status</Th>
          <Th color="gray.400">Session Date</Th>
          <Th color="gray.400">Time Start</Th>
          <Th color="gray.400">Time End</Th>
          <Th color="gray.400">Visibility</Th>
          <Th color="gray.400">Group</Th>
          <Th color="gray.400">Teacher</Th>
          <Th color="gray.400">Course</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ListeSession.map((session, key) => (
          <Tr key={key}>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {session.status}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {session.date_seance}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {session.time_start}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {session.time_end}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {session.visibility}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {session.groupe_seance_id ? session.groupe_seance_id.type : ''}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
              {session.teacher_id ? session.teacher_id.firstName : ''}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
              {session.seance_course_id ? session.seance_course_id.type : ''}    
              </Text>
            </Td>
            <Td> 
              <Flex direction={{ sm: "column", md: "row" }} align="flex-start">
                <Button onClick={() => toggleModal(session)} colorScheme="blue" mr={2}>
                  <Icon as={FaEye} mr={1} />
                  View
                </Button>
                <Button onClick={() => handleDelete(session.id)} colorScheme="red" mr={2}>
                  <Icon as={FaTrashAlt} mr={1} />
                  Delete
                </Button>
                <Button as={RouterLink} to={`/admin/table/session/update/${session.id}`} colorScheme="green" mr={2}>
                  <Icon as={FaPencilAlt} mr={1} />
                  Edit
                </Button>
                <Button as={RouterLink} to={`/admin/table/session/create/`} colorScheme="green">
                  <Icon as={FaPlus} mr={1} />
                  Create
                </Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </CardBody>
</Card>

      <GroupView isOpen={isOpen} toggleModal={toggleModal} session={selectedSession} />
      </Flex>
      </Grid>
    </>
  );
}

export default Sessions;
