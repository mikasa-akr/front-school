import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center,Divider } from "@chakra-ui/react";
import gens from "../../../../assets/img/revenu.png";

function TotalRevenue() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

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
    <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center" display="flex" alignItems="center">
      <img src={gens} alt="Group Icon" width={50} height={50} />
      <Divider orientation="vertical" mx={4} Color="teal.400" />
      <Text fontSize="2xl" color={textColor}>
        revenue Total:
      </Text>
      <Text fontSize="xl" ml={4}>
      {totalRevenue} $
      </Text>
    </Box>
  </Center>
  );
}

export default TotalRevenue;
