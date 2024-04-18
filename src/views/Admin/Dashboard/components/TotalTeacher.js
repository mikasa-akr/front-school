import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text,Box,useColorModeValue,Center,Divider } from "@chakra-ui/react";
import gens from "../../../../assets/img/les-salaires.png";

function TotalTeacher() {
  const [totalTeachers, setTotalTeachers] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/total"); // Make a GET request to the Symfony API endpoint
        setTotalTeachers(response.data); // Update state with the total number of students received from the API
      } catch (error) {
        console.error("Error fetching total teacher:", error);
      }
    };

    fetchData();
  }, []);

  return (
      <Center>
      <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center" display="flex" alignItems="center">
        <img src={gens} alt="Group Icon" width={50} height={50} />
        <Divider orientation="vertical" mx={4} Color="teal.400" />
        <Text fontSize="2xl" color={textColor}>
          Teacher/month:
        </Text>
        <Text fontSize="xl" ml={4}>
        {totalTeachers}
        </Text>
      </Box>
    </Center>
  );
}

export default TotalTeacher;
