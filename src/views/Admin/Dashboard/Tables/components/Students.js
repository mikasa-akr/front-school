// Students.js
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
import Card from "../../../../../components/Card/Card.js";
import CardBody from "../../../../../components/Card/CardBody.js";
import CardHeader from "../../../../../components/Card/CardHeader.js";
import { FaPencilAlt, FaTrashAlt, FaEye, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import StudentView from './StudentView.js';

function Students({ captions, logo }) {
  const [listeStudent, setListeStudent] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
  const [isOpen, setIsOpen] = useState(false); // State to control the modal in StudentView

  // Function to toggle the modal state and set the selected student
  const toggleModal = (student) => {
    setSelectedStudent(student);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchListeStudent();
  }, []);

  const fetchListeStudent = async () => {
    try {
      const response = await axios.get("/crud/student/");
      setListeStudent(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/crud/student/${id}`)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "student deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchListeStudent();
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "An Error Occurred!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
    <Grid>
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" fontWeight="bold">
            Students Table
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
              <Th color="gray.400">Student</Th>
              <Th color="gray.400">Number</Th>
              <Th color="gray.400">Gender</Th>
              <Th color="gray.400">Status</Th>
              <Th color="gray.400">Age</Th>     
              <Th color="gray.400">Course</Th>     
            </Tr>
            </Thead>
            <Tbody>
              {listeStudent.map((student, key) => (
                <Tr key={key}>
                  <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
                      <Flex direction="column">
                        <Text fontSize="md" fontWeight="bold" minWidth="100%">
                          {student.firstName} {student.lastName}
                        </Text>
                        <Text fontSize="sm" fontWeight="normal">
                          {student.email}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontSize="md" fontWeight="bold">
                      {student.number}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="md" fontWeight="bold">
                      {student.gender}
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Text fontSize="md" fontWeight="bold" pb=".5rem">
                      {student.age}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="md" fontWeight="bold" pb=".5rem">
                      {student.course_name}
                    </Text>
                  </Td>
                  <Td>
                    <Flex direction={{ sm: "column", md: "row" }} align="flex-start">
                      <Button
                        onClick={() => toggleModal(student)}
                        colorScheme="blue"
                        mr={2}
                      >
                        <Icon as={FaEye} mr={1} />
                        View
                      </Button>
                      <Button
                        onClick={() => handleDelete(student.id)}
                        colorScheme="red"
                        mr={2}
                      >
                        <Icon as={FaTrashAlt} mr={1} />
                        Delete
                      </Button>
                        <Button as={RouterLink} to={`/admin/tables/update/${student.id}`} colorScheme="green" mr={2}>
                          <Icon as={FaPencilAlt} mr={1} />
                          Edit
                        </Button>
                      <Button as={RouterLink} to={`/admin/tables/create/`} colorScheme="green">
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
      <StudentView isOpen={isOpen} toggleModal={toggleModal} student={selectedStudent} />
      </Flex>
      </Grid>
    </>
  );
}

export default Students;
