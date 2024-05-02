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
import GroupView from './GroupView.js';

function Groups({ captions, logo }) {
  const [ListeGroup, setListeGroup] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null); // State to store the selected student
  const [isOpen, setIsOpen] = useState(false); // State to control the modal in StudentView
  const bgColor = useColorModeValue("white", "gray.700");

  // Function to toggle the modal state and set the selected student
  const toggleModal = (group) => {
    setSelectedGroup(group);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
      fetchListeGroup();
  }, []);

  const fetchListeGroup = () => {
      axios.get('/group/')
          .then(function (response) {
              setListeGroup(response.data);
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
                          title: 'group deleted successfully!',
                          showConfirmButton: false,
                          timer: 1500
                      });
                      fetchListeGroup();
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
    <Card bg={bgColor} overflowX={{ sm: "scroll", xl: "hidden" }} borderRadius={'20px'}>
  <CardHeader p="6px 0px 22px 0px">
    <Text fontSize="xl" fontWeight="bold">
      Groups Table
    </Text>
  </CardHeader>
  <CardBody>
    <Table variant="simple">
      <Thead>
        <Tr my=".8rem" pl="0px" color="gray.400">
          <Th color="gray.400">Group</Th>
          <Th color="gray.400">Type</Th>
          <Th color="gray.400">Student</Th>
          <Th color="gray.400">Teacher</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ListeGroup.map((group, key) => (
          <Tr key={key}>
            <Td minWidth={{ sm: "250px" }} pl="0px">
              <Flex
                align="center"
                py=".8rem"
                minWidth="100%"
                flexWrap="nowrap"
              >
                <Avatar src={require(`../../../../assets/${group.avatar}`)} w="50px" borderRadius="12px" me="18px" />
                <Flex direction="column">
                  <Text fontSize="md" fontWeight="bold" minWidth="100%">
                    {group.name}
                  </Text>
                </Flex>
              </Flex>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">{group.type}</Text>
            </Td>
            <Td>
            <Text fontSize="md" fontWeight="bold">
            {group.student_id && group.student_id.length > 0
              ? group.student_id.map((student) => `${student.firstName} ${student.lastName}`).join(" , ")
              : "None"}
          </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold" pb=".5rem">
                {group.teacher_first} {group.teacher_last}
              </Text>
            </Td>
            <Td>
              <Flex direction={{ sm: "column", md: "row" }} align="flex-start">
                <Button onClick={() => toggleModal(group)} colorScheme="blue" mr={2}>
                  <Icon as={FaEye} mr={1} />
                  View
                </Button>
                <Button onClick={() => handleDelete(group.id)} colorScheme="red" mr={2}>
                  <Icon as={FaTrashAlt} mr={1} />
                  Delete
                </Button>
                <Button as={RouterLink} to={`/admin/table/group/update/${group.id}`} colorScheme="green" mr={2}>
                  <Icon as={FaPlus} mr={1} />
                  student
                </Button>
                <Button as={RouterLink} to={`/admin/table/group/create/`} colorScheme="green">
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

      <GroupView isOpen={isOpen} toggleModal={toggleModal} group={selectedGroup} />
      </Flex>
      </Grid>
    </>
  );
}

export default Groups;
