import {
  Avatar,
  Badge,
  Button,
  Flex,
  Link,
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt,FaEye } from "react-icons/fa";


function TablesTableRow(props) {
  const { logo, firstName, email, lastName, age, status, number, gender } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {firstName} {lastName}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {number}
          </Text>
      </Td>
      <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {gender}
          </Text>
      </Td>
      <Td>
        <Badge
          bg={status === "Online" ? "green.400" : bgStatus}
          color={status === "Online" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {age}
        </Text>
      </Td>
      <Td>
        <Flex
          direction={{ sm: "column", md: "row" }}
          align="flex-start"
          p={{ md: "18px" }}
        >
          <Link
            to=''
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
            color="blue.500"
            cursor="pointer"
            display="flex"
            alignItems="center"
          >
            <Icon as={FaEye} me="4px" />
            <Text fontSize="sm" fontWeight="semibold">
              View
            </Text>
          </Link>
          <Link
            to=''
            p="0px"
            bg="transparent"
            mb={{ sm: "10px", md: "0px" }}
            me={{ md: "12px" }}
            color="red.500"
            cursor="pointer"
            display="flex"
            alignItems="center"
          >
            <Icon as={FaTrashAlt} me="4px" />
            <Text fontSize="sm" fontWeight="semibold">
              DELETE
            </Text>
          </Link>
          <Link
            to=''
            p="0px"
            bg="transparent"
            color={textColor}
            cursor="pointer"
            display="flex"
            alignItems="center"
          >
            <Icon as={FaPencilAlt} me="4px" />
            <Text fontSize="sm" fontWeight="semibold">
              EDIT
            </Text>
          </Link>
        </Flex>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
