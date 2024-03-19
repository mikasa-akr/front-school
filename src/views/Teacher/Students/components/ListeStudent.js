import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';

function ListeStudent() {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const ID = localStorage.getItem('id');

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
        <Box marginTop="10%" className="container">
            <Box className="row" marginBottom="2">
                <Box className="col-md-6">
                    <Text fontSize="40px" marginBottom="4">List of Students</Text>
                    <UnorderedList listStyleType="none" padding="0">
                        {selectedGroups.map((group) => (
                            <ListItem key={group.id} marginBottom="2" padding="3">
                                <Text>
                                    First Name: {group.firstName} &nbsp; Last Name: {group.lastName}
                                </Text>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            </Box>
        </Box>
    );
}

export default ListeStudent;
