import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  Avatar,
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  useDisclosure,
} from '@chakra-ui/react';
import Card from '../../../../components/Card/Card';

function ListeGroupe() {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    axios.get(`/crud/teacher/Groupes/${ID}`)
      .then(function (response) {
        setSelectedGroups(response.data);
      })
      .catch(function (error) {
        console.error('Error fetching selected groups:', error);
      });
  }, [ID]);

  return (
    <Card mt="10%" bg={bgColor} borderRadius={'20px'}>
      <Flex justify="space-between" mb="4">
        <Heading>Select Group</Heading>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {selectedGroups.map((group) => (
            <Tr key={group.id}>
            <Td minWidth={{ sm: "250px" }} pl="0px">
              <Flex
                align="center"
                py=".8rem"
                minWidth="100%"
                flexWrap="nowrap"
              >
                <Avatar src={require(`../../../../assets/${group.avatar}`)} w="50px" borderRadius="12px" me="18px" />
                <Flex direction="column">
                  <Text fontSize="md" fontWeight="bold" minWidth="100%">
                    {group.name}
                  </Text>
                </Flex>
              </Flex>
            </Td>              
            <Td>{group.type}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
}

export default ListeGroupe;
