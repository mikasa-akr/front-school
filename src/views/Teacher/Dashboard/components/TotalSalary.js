import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center,Divider } from "@chakra-ui/react";
import gens from "../../../../assets/img/les-salaires.png";

function TotalSalary() {
  const [totalSalarys, setTotalTeachers] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

  useEffect(() => {
    const fetchTotalTeachers = async () => {
      try {
        const response = await axios.get(`/crud/teacher/total/salary/${ID}`);
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
          <img src={gens} alt="Group Icon" width={50} height={50} />
          <Divider orientation="vertical" mx={4} Color="teal.400" />
          <Text fontSize="2xl" color={textColor}>
          Salary/month:
          </Text>
          <Text fontSize="xl" ml={4}>
          {totalSalarys.salary}$
          </Text>
        </Box>
      </Center>
  );
}

export default TotalSalary;
