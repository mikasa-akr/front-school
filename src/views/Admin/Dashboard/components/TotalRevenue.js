import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center } from "@chakra-ui/react";

function TotalRevenue() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/crud/teacher/total/revenue");
        setTotalRevenue(response.data.total_revenue);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };

    fetchData();
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
          Revenue Total :
        </Text>
        <Text fontSize="2xl">{totalRevenue} $</Text>
      </Box>
    </Center>
  );
}

export default TotalRevenue;
