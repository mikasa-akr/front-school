import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Image,Flex,Avatar } from '@chakra-ui/react';
import Swal from 'sweetalert2';

function ListeGroupe() {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage
    const bgColor = useColorModeValue("white", "gray.700");

    useEffect(() => {
        axios.get(`/crud/student/Groupes/${ID}`)
            .then(function (response) {
                setSelectedGroups(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching selected groups:', error);
            });
    }, [ID]);

    return (
        <Box bg={bgColor} marginTop="10%" className="container" borderRadius={'20px'}>
            <Box className="row" marginBottom="2">
                <Box className="col-md-12">
                    <Text fontSize="xl" marginBottom="4" fontWeight="bold">List of Groups</Text>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Group</Th>
                                <Th>Type</Th>
                                <Th>Teacher</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedGroups.map((group) => (
                                <Tr key={group.id}>
                                    <Td minWidth={{ sm: "250px" }} pl="0px">
                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="wrap">
                                        <Avatar src={require(`../../../../assets/${group.avatar}`)} style={{ maxWidth: "100px", height: "auto", marginRight: "10px" }} alt="avatar" />                    
                                        <Flex direction="column" minWidth="0">
                                            <Text fontSize="md" fontWeight="bold">
                                            {group.name}
                                            </Text>
                                        </Flex>
                                        </Flex>
                                    </Td>             
                                    <Td>{group.type}</Td>
                                    <Td>{group.teacher}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    );
}

export default ListeGroupe;
