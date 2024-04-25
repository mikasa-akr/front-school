import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center,Divider } from "@chakra-ui/react";
import gens from "../../../../assets/img/complete.png";

function CountSession() {
  const [CountSessions, setCountSession] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

  useEffect(() => {
    const fetchCountSession = async () => {
      try {
        const response = await axios.get(`/crud/student/total/session/count/${ID}`);
        setCountSession(response.data);
      } catch (error) {
        console.error("Error fetching total sessions:", error);
      }
    };

    fetchCountSession();
  }, [ID]);

  return (
        <Center>
        <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center" display="flex" alignItems="center">
          <img src={gens} alt="Group Icon" width={50} height={50} />
          <Divider orientation="vertical" mx={4} Color="teal.400" />
          <Text fontSize="2xl" color={textColor}>
          Session Complete :
          </Text>
          <Text fontSize="xl" ml={4}>
          {CountSessions.totalsessionsDone}
          </Text>
        </Box>
      </Center>
  );
}

export default CountSession;
