import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Divider, ListItem, Text, UnorderedList,useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../components/Card/Card';

function ListeStudent() {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const ID = localStorage.getItem('id');
    const bgColor = useColorModeValue("white", "gray.700");

    useEffect(() => {
        axios.get(`/crud/teacher/Students/${ID}`)
            .then(function (response) {
                setSelectedGroups(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching selected students:', error);
            });
    }, [ID]);

    return (
        <Card marginTop="10%" className="container">
            <Box className="row" marginBottom="2">
                <Box className="col-md-6" bg={bgColor} borderRadius={'20px'} ml={'20%'}>
                    <Text fontSize="40px" marginBottom="4">List of Students</Text>
                    <Divider mb="4"/>
                    <UnorderedList listStyleType="none" padding="0">
                        {selectedGroups.map((group) => (
                            <ListItem key={group.id} marginBottom="2" padding="3">
                                <Text>
                                    Name: {group.firstName} {group.lastName}
                                </Text>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            </Box>
        </Card>
    );
}

export default ListeStudent;
