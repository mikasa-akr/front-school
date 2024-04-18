import React, { useState, useEffect } from 'react';
import { Link as RouterLink,Link } from 'react-router-dom';
import { Box, Flex, Text, Button, useColorModeValue,Icon } from '@chakra-ui/react';
import axios from 'axios';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import {FaPlus } from "react-icons/fa";

function Forfaits() {
  const [forfaits, setForfaits] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const bgColor = useColorModeValue("white", "gray.700");
  const bgC = useColorModeValue("beige", "gray.800");

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
            <Text fontSize="4xl" fontWeight="bold" color="teal.500" mt={2}>
              ${forfait.price}
            </Text>
            <Text mt={2} fontSize="2xl" >- Number of Hour per Session: {forfait.NbrHourSession}h</Text>
            <Text mt={2} fontSize="2xl" >- Number of Hour per lesson: {forfait.NbrHourSeance}h</Text>
            <Text mt={2} fontSize="2xl" >- Type: {forfait.subscription}</Text>
              <Button mt={5} colorScheme="teal" _hover={{ bg: 'teal.600' }} fontSize="l">Subscribe Now</Button>
          </Box>
        ))}
      </Flex>
      </CardBody>
      </Card>
    </Box>
  );
}

export default Forfaits;
