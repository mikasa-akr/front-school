// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import VoteRattrapage from "./components/VoteRattrapage";
export default function Dashboard() {
  return (
    <>
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid spacing='24px'>
        <VoteRattrapage>
        </VoteRattrapage>
      </SimpleGrid>
    </Flex>
    </>
  );
}
