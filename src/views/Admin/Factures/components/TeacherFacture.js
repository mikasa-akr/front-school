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
  Badge,
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
function TeacherFacture
({ captions, logo }) {
  const [listeFacture, setListeFacture] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
  const [isOpen, setIsOpen] = useState(false); // State to control the modal in StudentView
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const bgColor = useColorModeValue("white", "gray.700");

  const toggleModal = (student) => {
    setSelectedStudent(student);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchListeFacture();
  }, []);

  const fetchListeFacture = async () => {
    try {
      const response = await axios.get("/facture/teacher");
      setListeFacture(response.data);
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
          .delete(`/facture/teacher/${id}`)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Facture deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchListeFacture();
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

  if (!isLoaded) return <Flex>Loading...</Flex>;

  return (
    <>
    <Grid >
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} bg={bgColor} borderRadius={'20px'}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" fontWeight="bold">
            Facture
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
              <Th color="gray.400">Teacher</Th>
              <Th color="gray.400">Amount</Th>
              <Th color="gray.400">Date</Th>
              <Th color="gray.400">Status</Th>  
            </Tr>
            </Thead>
            <Tbody> 
              {listeFacture.map((fature, key) => (
                <Tr key={key}>
                  <Td>
                    <Text fontSize="md" fontWeight="bold">
                      {fature.teacher_id}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="md" fontWeight="bold">
                      {fature.amount}
                    </Text>
                  </Td>
                  <Td>
                  <Text fontSize="md" fontWeight="bold">
                      {fature.dateAt}
                    </Text>
                  </Td>          
                  <Td>
                    <Text fontSize="md" fontWeight="bold" pb=".5rem">
                      {fature.status}
                    </Text>
                  </Td>
                  <Td>
                    <Flex direction={{ sm: "column", md: "row" }} align="flex-start">
                      <Button
                        onClick={() => handleDelete(fature.id)}
                        colorScheme="red"
                        mr={2}>
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
      </Flex>
      </Grid>
    </>
  );
}

export default TeacherFacture
;
