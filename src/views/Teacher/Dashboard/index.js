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
import CountSession from "./components/CountSession";
import TotalSalary from "./components/TotalSalary";
import CountFacture from "./components/CountFacture";

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
    <Flex flexDirection="row" pt={{ base: "120px" }}>
     <SimpleGrid columns={4} spacing={8} width="100%">
    <Flex justifyContent="center">
      <TotalSalary />
    </Flex>
    <Flex justifyContent="center">
      <TotalGroup />
    </Flex>
    <Flex justifyContent="center">
      <TotalAnnulation />
    </Flex>
    <Flex justifyContent="center">
      <TotalSession />
    </Flex>
    </SimpleGrid>
  </Flex>
  <Flex flexDirection="row" pt={{ base: "120px" }} mt={'5%'}>
  <SimpleGrid columns={2} spacing={10} width="100%">
      <Flex justifyContent="center">
      <CountSession />
    </Flex>
    <Flex justifyContent="center">
      <CountFacture />
    </Flex>
  </SimpleGrid>
  </Flex>
    </>
  );
}
