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

function RattrapageView({ isOpen, toggleModal, group }) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {group && (
            <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
              <Flex justify="space-between" w="100%">
                <Flex direction="column" maxWidth="70%">
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Type:{" "}
                    <Text as="span" color="gray.500">
                      {group.type}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Number:{" "}
                    <Text as="span" color="gray.500">
                      {group.number}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Student:{" "}
                    <Text as="span" color="gray.500">
                    {group.student_id && group.student_id.length > 0 ? group.student_id.map(student => `${student.firstName} ${student.lastName}`).join(', ') : 'None'}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Teacher:{" "}
                    <Text as="span" color="gray.500">
                    {group.teacher_id && group.teacher_id.length > 0 ? group.teacher_id.map(teacher => `${teacher.firstName} ${teacher.lastName}`).join(', ') : 'None'}
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
