// Chakra imports
import {
    Flex,
    Grid,
    Image,
    SimpleGrid,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
  import ListeGroupe from "./components/ListeGroupe"
  export default function Groups() {
    return (
      <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
        <ListeGroupe columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        </ListeGroupe>
      </Flex>
    );
  }
  