import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import Swal from 'sweetalert2';

function ListeGroupe() {
    const [selectedGroups, setSelectedGroups] = useState([]);
    const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage

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
        <Box marginTop="10%" className="container">
            <Box className="row" marginBottom="2">
                <Box className="col-md-6">
                    <Text fontSize="40px" marginBottom="4">List of Selected Groups</Text>
                    <UnorderedList listStyleType="none" padding="0">
                        {selectedGroups.map((group) => (
                            <ListItem key={group.id} marginBottom="2" padding="3">
                                <Text>
                                    Number: {group.number} &nbsp; Type: {group.type}
                                </Text>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            </Box>
        </Box>
    );
}

export default ListeGroupe;
