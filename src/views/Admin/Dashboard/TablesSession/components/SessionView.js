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

function SessionView({ isOpen, toggleModal,session }) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");

  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Session Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {session && (
            <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
              <Flex justify="space-between" w="100%">
                <Flex direction="column" maxWidth="70%">
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Status:{" "}
                    <Text as="span" color="gray.500">
                      {session.status}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Session Date:{" "}
                    <Text as="span" color="gray.500">
                    {session.date_seance}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Time Start:{" "}
                    <Text as="span" color="gray.500">
                    {session.time_start}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Time End:{" "}
                    <Text as="span" color="gray.500">
                    {session.time_end}
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Visibility:{" "}
                    <Text as="span" color="gray.500">
                    {session.visibility}                    
                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Group:{" "}
                    <Text as="span" color="gray.500">
                    {session.groupe_seance_id ? session.groupe_seance_id.type : ''}                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Teacher:{" "}
                    <Text as="span" color="gray.500">
                    {session.teacher_id ? session.teacher_id.firstName : ''}                    </Text>
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    Course:{" "}
                    <Text as="span" color="gray.500">
                    {session.seance_course_id ? session.seance_course_id.type : ''}                    </Text>
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

export default SessionView;
