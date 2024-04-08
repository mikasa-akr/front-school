// Chakra imports
import {
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import VoteRattrapage from "./components/VoteRattrapage";
import SessionWeekPage from "./components/SessionWeekPage";
import CalendarPage from "./components/CalendarPage";
import Welcome from "./components/RemainingHours";
import Card from '../../../components/Card/Card';

export default function Dashboard() {
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" mt={20}>
      <Flex >
        <Card p="4" borderRadius="20px">
          <Text fontSize='5xl' color={textColor}>Welcome back {firstName} {lastName}</Text>
        </Card>
      </Flex>
      <Flex>
        <Welcome />
      </Flex>
      <Flex direction="row" mt={50}>
        <Flex ml={'46%'}>
          <SessionWeekPage />
        </Flex>
        <Flex ml={5}>
          <CalendarPage width="500px" />
        </Flex>
      </Flex>

      <SimpleGrid spacing="24px" mt={5}>
        <VoteRattrapage />
      </SimpleGrid>
    </Flex>
  );
}
