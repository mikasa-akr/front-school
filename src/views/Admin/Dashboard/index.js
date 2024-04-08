// Chakra imports
import React from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import TotalStudent from "./components/TotalStudent";
import TotalTeacher from "./components/TotalTeacher";
import TotalRevenue from "./components/TotalRevenue";
import PaymentStudent from "./components/PaymentStudent";
import PaymentTeacher from "./components/PaymentTeacher";

export default function Dashboard() {
  return (
    <>
    <Flex flexDirection="row" pt={{ base: "120px" }}>
      <SimpleGrid columns={3} spacing={10} width="100%">
        <Flex justifyContent="center">
          <TotalStudent />
        </Flex>
        <Flex justifyContent="center">
          <TotalTeacher />
        </Flex>
        <Flex justifyContent="center">
          <TotalRevenue />
        </Flex>
      </SimpleGrid>
    </Flex>
    <Flex flexDirection="row" pt={{ base: "120px" }} mt={'5%'}>
    <SimpleGrid columns={2} spacing={20} width="100%">
        <Flex justifyContent="center">
          <PaymentStudent />
        </Flex>
        <Flex justifyContent="center">
          <PaymentTeacher />
        </Flex>
    </SimpleGrid>
    </Flex>
    </>
  );
}
