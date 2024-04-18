// Chakra imports
import {
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import VoteRattrapage from "./components/VoteRattrapage";
import Card from '../../../components/Card/Card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalSession from "./components/TotalSession";
import CountSession from "./components/CountSession";

export default function Dashboard() {
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const textColor = useColorModeValue("gray.700", "white");
  const [closestSession, setclosestSession] = useState(null);
  const id = localStorage.getItem('id');
  useEffect(() => {
      const fetchclosestSessions = async () => {
          try {
              const response = await axios.get(`/crud/student/total/session/next/${id}`);
              setclosestSession(response.data);
          } catch (error) {
              console.error('Error fetching remaining hours:', error);
              setclosestSession(null); // Set closestSession to null in case of error to handle loading state
          }
      };

      fetchclosestSessions();
  }, [id]);
  return (
    <>
    <Flex direction="column" mt={20}>
      <Flex >
        
        <Card p="4" borderRadius="20px">
        {closestSession !== null ? (
                    <>
                              <Text fontSize='5xl' color={textColor}>Welcome back {firstName} {lastName}</Text>
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>Next Session in {closestSession.closestSession}</Text>
                    </>
                ) : (
                    <Text fontSize="lg">Loading...</Text>
                )}
        </Card>
      </Flex>
      <SimpleGrid columns={2} spacing={10} width="100%">
        <Flex justifyContent="center">
          <TotalSession />
        </Flex>
        <Flex>
          <CountSession />
        </Flex>
      </SimpleGrid>
      <SimpleGrid spacing="24px" mt={10}>
        <VoteRattrapage />
      </SimpleGrid>
    </Flex>
    </>
  );
}
