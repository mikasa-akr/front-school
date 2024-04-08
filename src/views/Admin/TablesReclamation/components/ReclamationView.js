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

function ReclamationView({ isOpen, toggleModal, reclamation }) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>reclamation Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {reclamation && (
            <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
              <Flex justify="space-between" w="100%">
                <Flex direction="column" maxWidth="70%">
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Type:{" "}
                    <Text as="span" color="gray.500">
                      {reclamation.type}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Reason:{" "}
                    <Text as="span" color="gray.500">
                      {reclamation.reason}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Time:{" "}
                    <Text as="span" color="gray.500">
                      {reclamation.time}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Status:{" "}
                    <Text as="span" color="gray.500">
                      {reclamation.status}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Student:{" "}
                    <Text as="span" color="gray.500">
                    {reclamation.student_id}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Teacher:{" "}
                    <Text as="span" color="gray.500">
                    {reclamation.teacher_id}
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

export default ReclamationView;
