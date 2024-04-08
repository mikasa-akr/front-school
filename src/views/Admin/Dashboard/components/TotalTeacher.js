import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text,Box,useColorModeValue,Center } from "@chakra-ui/react";

function TotalTeacher() {
  const [totalTeachers, setTotalTeachers] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/crud/teacher/total"); // Make a GET request to the Symfony API endpoint
        setTotalTeachers(response.data); // Update state with the total number of students received from the API
      } catch (error) {
        console.error("Error fetching total teacher:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <Center>
    <Box
      bg={bgColor}
      p={6}
      borderRadius="20px"
      boxShadow="md"
      textAlign="center"
    >
      <Text fontSize="xl" fontWeight="bold">
        Total teacher/month:
      </Text>
      <Text fontSize="2xl">{totalTeachers}</Text>
    </Box>
  </Center>
  );
}

export default TotalTeacher;
