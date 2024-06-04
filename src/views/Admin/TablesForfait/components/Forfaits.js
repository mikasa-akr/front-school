import React, { useState, useEffect } from 'react';
import { Link as RouterLink,Link } from 'react-router-dom';
import { Box, Flex, Text, Button, useColorModeValue,Icon } from '@chakra-ui/react';
import axios from 'axios';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import {FaPlus,FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
function Forfaits() {
  const [forfaits, setForfaits] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const bgColor = useColorModeValue("white", "gray.700");
  const bgC = useColorModeValue("blue.50", "blue.800");

  useEffect(() => {
    fetchForfaits();
  }, []);

  const fetchForfaits = async () => {
    try {
      const response = await axios.get('/crud/forfait');
      setForfaits(response.data);
    } catch (error) {
      console.error('Error fetching forfaits:', error);
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
          .delete(`/crud/forfait/${id}`)
          .then(function (response) {
            Swal.fire({
              icon: "success",
              title: "Forfait deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchForfaits();
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

    <Box mt={20} textAlign="center">
      <Card bg={bgColor} textAlign="center" borderRadius="20px">
      <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" fontWeight="bold">Forfait Table</Text>
          <Button as={RouterLink} to={`/admin/table/forfait/create`} colorScheme="teal" ml={'80%'}>
            <Icon as={FaPlus} mr={1} />
            Create
          </Button>
      </CardHeader> 
      <CardBody justifyContent="center">
      <Flex justifyContent="center">
        {forfaits.map((forfait, index) => (
          <Box
            key={forfait.id}
            bg={bgC}
            width="400px"
            height="500px"
            borderWidth="1px"
            borderRadius="20px"
            overflow="hidden"
            m={2}
            p={4}
          >
            <Text fontSize="2xl" fontWeight="semibold" mb={4} mt={2}>
              {forfait.title}
            </Text>
            <Text fontSize="4xl" fontWeight="bold" color="teal.300" mt={2}>
              ${forfait.price}
            </Text>
            <Text mt={2} fontSize="2xl" >- Number of Hour per Session: {forfait.NbrHourSession}h</Text>
            <Text mt={2} fontSize="2xl" >- Number of Hour per lesson: {forfait.NbrHourSeance}h</Text>
            <Text mt={2} fontSize="2xl" >- Type: {forfait.subscription}</Text>
            <Flex flexDirection={'column'}>
  <Button 
    mt={5} 
    colorScheme="teal" 
    _hover={{ bg: 'teal.600' }} 
    fontSize="sm" 
    p={2}
  >
    Subscribe Now
  </Button>
  <Button 
    onClick={() => handleDelete(forfait.id)} 
    colorScheme="red" 
    mt={2} 
    fontSize="sm" 
    p={2}
  >
    <Icon as={FaTrashAlt} mr={1} />
    Delete
  </Button>
</Flex>

          </Box>
        ))}
      </Flex>
      </CardBody>
      </Card>
    </Box>
  );
}

export default Forfaits;
