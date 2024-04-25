// reclamations.js
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

function Annulations({ captions, logo }) {
  const [ListeReclamation, setListeReclamation] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null); // State to store the selected student
  const [isOpen, setIsOpen] = useState(false); // State to control the modal in StudentView
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem('id');
  // Function to toggle the modal state and set the selected student
  const toggleModal = (reclamation) => {
    setSelectedReclamation(reclamation);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
      fetchListeReclamation();
  }, []);

  const fetchListeReclamation = () => {
      axios.get(`/reclamation/teacher/annulation/${ID}`)
          .then(function (response) {
              setListeReclamation(response.data);
              setIsLoaded(true);
          })
          .catch(function (error) {
              console.log(error);
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
      Annulations Table
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  </CardBody>
</Card>
      </Flex>
      </Grid>
    </>
  );
}

export default Annulations;
