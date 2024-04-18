import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center,Divider } from "@chakra-ui/react";
import ann from "../../../../assets/img/le-navigateur.png";

function TotalAnnulated() {
  const [totalAnnulateds, setTotalTeachers] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

  useEffect(() => {
    const fetchTotalTeachers = async () => {
      try {
        const response = await axios.get(`/crud/teacher/total/annulation/${ID}`);
        setTotalTeachers(response.data);
      } catch (error) {
        console.error("Error fetching total teachers:", error);
      }
    };

    fetchTotalTeachers();
  }, [ID]);

  return (
        <Center>
        <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center" display="flex" alignItems="center">
          <img src={ann} alt="Group Icon" width={50} height={50} />
          <Divider orientation="vertical" mx={4} Color="teal.400" />
          <Text fontSize="2xl" color={textColor}>
          Total Annulated: 
          </Text>
          <Text fontSize="xl" ml={4}>
          {totalAnnulateds.totalAnnulatedReclamations}
          </Text>
        </Box>
      </Center>
  );
}

export default TotalAnnulated;
