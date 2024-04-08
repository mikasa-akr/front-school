// Chakra imports
import {
  Flex,
  SimpleGrid,
  Text,useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import Card from "../../../components/Card/Card";
import TotalGroup from "./components/TotalGroup";
import TotalSession from "./components/TotalSession";
import TotalAnnulation from "./components/TotalAnnulation";

export default function Dashboard() {
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <>
    <Flex direction="column" mt={20}>
      <Flex >
        <Card p="4" borderRadius="20px">
        <Text fontSize='4xl' color={textColor}>Welcome back {firstName} {lastName}</Text>
        </Card>
      </Flex>
    </Flex>
    <Flex flexDirection="row" >
        <Flex >
          <TotalGroup />
        </Flex>
        <Flex >
          <TotalSession />
        </Flex>
        <Flex >
          <TotalAnnulation />
        </Flex>
    </Flex>
    </>
  );
}
