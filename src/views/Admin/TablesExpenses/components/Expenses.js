import React, { useState, useEffect } from 'react';
import { Link as RouterLink,Link } from 'react-router-dom';
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
} from "@chakra-ui/react";import axios from 'axios';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import {FaPlus,FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const bgColor = useColorModeValue("white", "gray.700");
  const bgC = useColorModeValue("gray.100", "gray.800");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/crud/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching Expenses:', error);
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
          .delete(`/crud/expenses/${id}`)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Expenses deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchExpenses();
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

  return (
    <>
    <Grid mt={'8%'}>
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} bg={bgColor} borderRadius={'20px'}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" fontWeight="bold">
            Expenses Table
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
              <Th color="gray.400">Category</Th>
              <Th color="gray.400">Amount</Th>
              <Th color="gray.400">Date</Th>  
            </Tr>
            </Thead>
            <Tbody>
              {expenses.map((expens, key) => (
                <Tr key={key}>
                  <Td>
                    <Text fontSize="md" fontWeight="bold">
                      {expens.category}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="md" fontWeight="bold">
                      {expens.amount} $
                    </Text>
                  </Td>        
                  <Td>
                    <Text fontSize="md" fontWeight="bold" pb=".5rem">
                      {expens.date}
                    </Text>
                  </Td>
                  <Td>
                    <Flex direction={{ sm: "column", md: "row" }} align="flex-start">
                      <Button
                        onClick={() => handleDelete(expens.id)}
                        colorScheme="red"
                        mr={2}
                      >
                        <Icon as={FaTrashAlt} mr={1} />
                        Delete
                      </Button>
                      <Button as={RouterLink} to={`/admin/table/expenses/create/`} colorScheme="green">
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
      </Flex>
      </Grid>
    </>
  );
}

export default Expenses;
