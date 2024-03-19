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
import ReclamationView from './ReclamationView.js';

function Reclamations({ captions, logo }) {
  const [ListeReclamation, setListeReclamation] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null); // State to store the selected student
  const [isOpen, setIsOpen] = useState(false); // State to control the modal in StudentView
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");

  // Function to toggle the modal state and set the selected student
  const toggleModal = (group) => {
    setSelectedReclamation(group);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
      fetchListeReclamation();
  }, []);

  const fetchListeReclamation = () => {
      axios.get('/reclamation/')
          .then(function (response) {
              setListeReclamation(response.data);
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
              axios.delete(`/group/${id}`)
                  .then(function (response) {
                      Swal.fire({
                          icon: 'success',
                          title: 'reclamation deleted successfully!',
                          showConfirmButton: false,
                          timer: 1500
                      });
                      fetchListeReclamation();
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
      Reclamations Table
    </Text>
  </CardHeader>
  <CardBody>
    <Table variant="simple">
      <Thead>
        <Tr my=".8rem" pl="0px" color="gray.400">
          <Th color="gray.400">Type</Th>
          <Th color="gray.400">Reason</Th>
          <Th color="gray.400">Time</Th>
          <Th color="gray.400">Status</Th>
          <Th color="gray.400">Student</Th>
          <Th color="gray.400">Teacher</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ListeReclamation.map((reclamation, key) => (
          <Tr key={key}>
            <Td>
                  <Text fontSize="md" fontWeight="bold">
                    {reclamation.type}
                  </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {reclamation.reason}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {reclamation.time}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {reclamation.status}
              </Text>
            </Td>
            <Td>
            <Text fontSize="md" fontWeight="bold">
              {reclamation.student_id}
            </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold" pb=".5rem">
                {reclamation.teacher_id}
              </Text>
            </Td>
            <Td>
              <Flex direction={{ sm: "column", md: "row" }} align="flex-start">
                <Button onClick={() => toggleModal(reclamation)} colorScheme="blue" mr={2}>
                  <Icon as={FaEye} mr={1} />
                  View
                </Button>
                <Button onClick={() => handleDelete(reclamation.id)} colorScheme="red" mr={2}>
                  <Icon as={FaTrashAlt} mr={1} />
                  Delete
                </Button>
                <Button as={RouterLink} to={`/admin/table/reclamation/update/${reclamation.id}`} colorScheme="green" mr={2}>
                  <Icon as={FaPencilAlt} mr={1} />
                  Edit
                </Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </CardBody>
</Card>

      <ReclamationView isOpen={isOpen} toggleModal={toggleModal} reclamation={selectedReclamation} />
      </Flex>
      </Grid>
    </>
  );
}

export default Reclamations;
