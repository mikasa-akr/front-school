import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center } from "@chakra-ui/react";

function TotalAnnulated() {
  const [totalAnnulateds, setTotalTeachers] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage

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
      <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          Total Annulated: {totalAnnulateds.totalAnnulatedReclamations}
        </Text>
      </Box>
    </Center>
  );
}

export default TotalAnnulated;
