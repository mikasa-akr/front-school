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

function TeacherView({ isOpen, toggleModal, teacher }) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Teacher Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {teacher && (
            <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
              <Flex justify="space-between" w="100%">
                <Flex direction="column" maxWidth="70%">
                  <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
                    {teacher.firstName} {teacher.lastName}
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Email Address:{" "}
                    <Text as="span" color="gray.500">
                      {teacher.email}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Number Phone:{" "}
                    <Text as="span" color="gray.500">
                      {teacher.number}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Gender:{" "}
                    <Text as="span" color="gray.500">
                      {teacher.gender}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Course:{" "}
                    <Text as="span" color="gray.500">
                      {teacher.course_name}
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

export default TeacherView;
