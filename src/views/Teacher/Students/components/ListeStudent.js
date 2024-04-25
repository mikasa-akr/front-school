import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Divider, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue,Avatar,Text,Flex } from '@chakra-ui/react';
import Card from '../../../../components/Card/Card';

function ListeStudent() {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const teacherId = localStorage.getItem('id');
    const bgColor = useColorModeValue("white", "gray.700");

    useEffect(() => {
        axios.get(`/crud/teacher/Students/${teacherId}`)
            .then(function (response) {
                setSelectedStudents(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching selected students:', error);
            });
    }, [teacherId]);

    return (
        <Card marginTop="10%" className="container">
            <Box className="row" marginBottom="2">
                <Box className="col-md-10" bg={bgColor} borderRadius={'20px'} mx={'auto'}>
                    <Text fontSize="xl" fontWeight="bold" marginTop="4">List of Students</Text>
                    <Divider my="4" />
                    <Table variant="striped" colorScheme="gray">
                        <Thead>
                            <Tr>
                                <Th>Student</Th>
                                <Th>Email</Th>
                                <Th>Group</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedStudents.map((student) => (
                                <Tr key={student.id}>
                                    <Td minWidth={{ sm: "250px" }} pl="0px">
                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="wrap">
                                        <Avatar src={require(`../../../../assets/${student.avatar}`)} style={{ maxWidth: "100px", height: "auto", marginRight: "10px" }} alt="avatar" />                    
                                        <Flex direction="column" minWidth="0">
                                            <Text fontSize="md" fontWeight="bold">
                                            {student.firstName} {student.lastName}
                                            </Text>
                                        </Flex>
                                        </Flex>
                                    </Td>                                      
                                    <Td>{student.email}</Td>
                                    <Td>{student.group}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Card>
    );
}

export default ListeStudent;
