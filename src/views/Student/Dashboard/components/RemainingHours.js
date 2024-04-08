import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../../components/Card/Card';

function RemainingHours() {
    const [restHour, setRestHour] = useState(null);
    const id = localStorage.getItem('id');
    const bgColor = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

    useEffect(() => {
        const fetchRestHours = async () => {
            try {
                const response = await axios.get(`/crud/student/restHour/${id}`);
                setRestHour(response.data);
            } catch (error) {
                console.error('Error fetching remaining hours:', error);
                setRestHour(null); // Set restHour to null in case of error to handle loading state
            }
        };

        fetchRestHours();
    }, [id]);

    return (
        <Box>
            <Card bg={bgColor} p="4" borderRadius="20px">
                {restHour !== null ? (
                    <>
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>Remaining Hours:</Text>
                        <Text fontSize='2xl'>{restHour}</Text>
                    </>
                ) : (
                    <Text fontSize="lg">Loading...</Text>
                )}
            </Card>
        </Box>
    );
}

export default RemainingHours;
