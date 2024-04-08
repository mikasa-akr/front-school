import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Spinner, useColorModeValue, Wrap, WrapItem, Card, CardHeader, CardBody, Button } from '@chakra-ui/react';
const SessionWeekPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue("gray.50","gray.800");
  const bgC = useColorModeValue("white", "gray.700");
  const id = localStorage.getItem('id');
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

  useEffect(() => {
   axios.get(`/session/student/sessions/week/${id}`)
      .then(response => {
        setSessions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error.message);
        setLoading(false);
      });
  }, []);

  const retard = (id) => {
    axios.post(`/reclamation/student/retard/${id}`, {})
      .then(response => {
        console.log('Rattrapage created successfully');
      })
      .catch(error => {
        console.error('Error creating rattrapage:', error.message);
      });
  };

  return (
    <Box>
      <Card bg={bgC} borderRadius="20px">
        <CardHeader>
          <Text fontSize="2xl" mb={-6} fontWeight="bold" color={textColor}>Weekly Schedule</Text>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Spinner size="lg"/>
          ) : (
            <Box overflowY="auto" maxHeight="292px">
              {sessions.map(session => (
                <Box key={session.id} padding={'6px'}>
                  <Box bg={bgColor} borderRadius="8px" p={2} boxShadow="md">
                    <Text>{session.seance_course_id}</Text>
                    <Text>{session.date_seance}  {session.time_start}</Text>
                    <Button
                    variant="outline"
                    colorScheme="teal"
                     onClick={() => retard(session.id)}>-5 min</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default SessionWeekPage;
