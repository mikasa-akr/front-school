import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Card, 
    CardHeader, 
    CardBody, 
    Box, 
    useColorModeValue, 
    Radio, 
    Button, 
    Text,
    Icon,RadioGroup, Stack, Flex 
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons'; // Importing the schedule icon from react-icons
import gens from "../../../../assets/img/calendrier.png";

const VoteRattrapage = () => {
    const [vote, setVote] = useState('');
    const [info, setInfo] = useState(null);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingVote, setLoadingVote] = useState(false);
    const [showCardBody, setShowCardBody] = useState(true); // State to control the visibility of CardBody
    const id = localStorage.getItem('id'); // Assuming the token is stored in localStorage
    const [sessionId, setSessionId] = useState(null);
    const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability
    const bgColor = useColorModeValue("gray.10", "gray.700");
    const submitColor = useColorModeValue("teal.300", "teal.300");

    const handleVoteChange = (e) => {
        setVote(e.target.value);
    };

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                setLoadingInfo(true);
                const response = await axios.get(`/rattrapage/info/${id}`);
                const sessions = response.data;
                if (sessions.length > 0) {
                    const firstSession = sessions[0];
                    const sessionIdFromResponse = firstSession.sessionId;
                    setSessionId(sessionIdFromResponse); // Set the sessionId state
                } else {
                    console.error('No sessions found in the response');
                }
                setInfo(sessions);
            } catch (error) {
                console.error('Error fetching info:', error);
            } finally {
                setLoadingInfo(false);
            }
        };
    
        fetchInfo(); // Call fetchInfo on component mount
    }, [id]); // Add id as a dependency
    
    const rattrapageDateTime = info && info.length > 0 && info[0].dateAtR ? new Date(info[0].dateAtR.date) : null;
    
    useEffect(() => {
        if (info && rattrapageDateTime) {
            const currentTime = new Date(); 
            const timeDiff = Math.abs(currentTime - rattrapageDateTime);
            const diffHours = timeDiff / (1000 * 60 * 60); 
    
            setShowCardBody(diffHours <= 3);
    
        }
    }, [info, rattrapageDateTime, sessionId]);  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoadingVote(true);
            const response = await axios.post(`/rattrapage/vote/${sessionId}`, { agree: vote });
            console.log(response.data);
            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error('Error saving vote:', error);
            // Handle error, e.g., show an error message to the user
        } finally {
            setLoadingVote(false);
        }
    };

    return (
        <Card bg={bgColor} borderRadius={'20px'}>
            <CardHeader>  
            <Box textAlign="center" display="flex" alignItems="center"> 
            <img src={gens} alt="Group Icon" width={50} height={50} />
                <Text fontSize='2xl' color={textColor} padding={15}>
                    Rattrapage schedule
                </Text>
            </Box>
            </CardHeader>
            {showCardBody && (
                <CardBody>
                    {loadingInfo ? (
                        <Text>Loading session information...</Text>
                    ) : info ? (
                        <Box>
                            {info.map((sessionInfo, index) => (
                                <div key={index}>
                                    <Text>
                                        You teacher {sessionInfo.nameF} {sessionInfo.nameL} canceled the Session {sessionInfo.sessionDate.date} and Rattrapage it with {sessionInfo.rattrapageDate.date}
                                    </Text>
                                </div>
                            ))}
                            <Text>Do you agree with this rattrapage?</Text>
                        </Box>
                    ) : 
                   <h1>No Rattrapage gived</h1> }
                    <form onSubmit={handleSubmit}>
                        <Flex direction="row" alignItems="center">
                            <RadioGroup value={vote} onChange={handleVoteChange}>
                                <Stack direction="row" spacing={4}>
                                    <Radio value="yes" isChecked={vote === "yes"}>
                                        Yes
                                    </Radio>
                                    <Radio value="no" isChecked={vote === "no"}>
                                        No
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                            <Button
                                type="submit"
                                disabled={!info || loadingVote}
                                color={submitColor}
                                mt={0} // Adjust the margin top as needed
                                ml={3} // Adjust the margin left for spacing
                            >
                                Submit Vote
                            </Button>
                        </Flex>
                    </form>
                    {loadingVote && <Text>Saving vote...</Text>}
                </CardBody>
            )}
        </Card>
    );
};

export default VoteRattrapage;
