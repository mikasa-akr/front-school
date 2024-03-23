// rattrapages.js
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
import RattrapageView from './RattrapageView.js';

function Rattrapages({ captions, logo }) {
  const [ListeRattrapage, setListeRattrapage] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedRattrapage, setSelectedRattrapage] = useState(null); // State to store the selected student
  const [isOpen, setIsOpen] = useState(false); // State to control the modal in StudentView
  const bgColor = useColorModeValue("white", "gray.700");

  // Function to toggle the modal state and set the selected student
  const toggleModal = (rattrapage) => {
    setSelectedRattrapage(rattrapage);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
      fetchListeRattrapage();
  }, []);

  const fetchListeRattrapage = () => {
      axios.get('/rattrapage/')
          .then(function (response) {
              setListeRattrapage(response.data);
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
              axios.delete(`/rattrapage/${id}`)
                  .then(function (response) {
                      Swal.fire({
                          icon: 'success',
                          title: 'Rattrapage deleted successfully!',
                          showConfirmButton: false,
                          timer: 1500
                      });
                      fetchListeRattrapage();
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
      Rattrapages Table
    </Text>
  </CardHeader>
  <CardBody>
    <Table variant="simple">
      <Thead>
        <Tr my=".8rem" pl="0px" color="gray.400">
          <Th color="gray.400">Status</Th>
          <Th color="gray.400">Date</Th>
          <Th color="gray.400">Time</Th>
          <Th color="gray.400">Session</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ListeRattrapage.map((rattrapage, key) => (
          <Tr key={key}>
            <Td>
                  <Text fontSize="md" fontWeight="bold">
                    {rattrapage.status}
                  </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {rattrapage.date}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {rattrapage.time}
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" fontWeight="bold">
                {rattrapage.session}
              </Text>
            </Td>
            <Td>
              <Flex direction={{ sm: "column", md: "row" }} align="flex-start">
                <Button onClick={() => toggleModal(rattrapage)} colorScheme="blue" mr={2}>
                  <Icon as={FaEye} mr={1} />
                  View
                </Button>
                <Button onClick={() => handleDelete(rattrapage.id)} colorScheme="red" mr={2}>
                  <Icon as={FaTrashAlt} mr={1} />
                  Delete
                </Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </CardBody>
</Card>

      <RattrapageView isOpen={isOpen} toggleModal={toggleModal} rattrapage={selectedRattrapage} />
      </Flex>
      </Grid>
    </>
  );
}

export default Rattrapages;
