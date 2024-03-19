// Chakra imports
import {
    Flex,
    Grid,
    Image,
    SimpleGrid,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
import Annulation from "./components/Annulation";
  export default function Calendar() {
    return (
      <Flex direction='column' pt={{ base: "120px", md: "75px" }}>    
        <Annulation>
        </Annulation>
        </Flex>
    );
  }
  