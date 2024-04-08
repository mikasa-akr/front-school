import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

function RattrapageView({ isOpen, toggleModal, rattrapage }) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rattrapage Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {rattrapage && (
            <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
              <Flex justify="space-between" w="100%">
                <Flex direction="column" maxWidth="70%">
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Status:{" "}
                    <Text as="span" color="gray.500">
                      {rattrapage.status}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Date:{" "}
                    <Text as="span" color="gray.500">
                      {rattrapage.date}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Time:{" "}
                    <Text as="span" color="gray.500">
                      {rattrapage.time}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Session:{" "}
                    <Text as="span" color="gray.500">
                      {rattrapage.session}
                    </Text>
                  </Text>
                </Flex>
                <Flex
                  direction={{ sm: "column", md: "row" }}
                  align="flex-start"
                  p={{ md: "24px" }}
                />
              </Flex>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RattrapageView;
