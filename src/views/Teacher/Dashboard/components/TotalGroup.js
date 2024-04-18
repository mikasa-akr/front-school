import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center, Icon, Divider } from "@chakra-ui/react";
import gens from "../../../../assets/img/gens.png";

function TotalGroup() {
  const [totalGroups, setTotalGroups] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

  useEffect(() => {
    const fetchTotalGroups = async () => {
      try {
        const response = await axios.get(`/crud/teacher/total/group/${ID}`);
        setTotalGroups(response.data);
      } catch (error) {
        console.error("Error fetching total groups:", error);
      }
    };

    fetchTotalGroups();
  }, [ID]);

  return (
    <Center>
      <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center" display="flex" alignItems="center">
        <img src={gens} alt="Group Icon" width={50} height={50} />
        <Divider orientation="vertical" mx={4} Color="teal.400" />
        <Text fontSize="2xl" color={textColor}>
          Total Group :
        </Text>
        <Text fontSize="xl" ml={4}>
          {totalGroups.totalGroups}
        </Text>
      </Box>
    </Center>
  );
}

export default TotalGroup;
