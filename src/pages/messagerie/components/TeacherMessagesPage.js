import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Image, Text, Spinner, Input, Button, VStack, Center, Flex, useColorModeValue, useColorMode } from '@chakra-ui/react';


const TeacherMessagesPage = ({ selectedChatId, selectedChatInfo }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const chatEndRef = useRef(null);
  const bgColor = useColorModeValue("teal.100", "teal.300");
  const { colorMode } = useColorMode();
  const bgImage = colorMode === 'dark' ? 'gray.700' : 'white';
  const Color = useColorModeValue("#EDF2F7", "#4A5568");

  const teacherId = localStorage.getItem('id');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedChatId) return; // Return if no chat is selected
        const response = await axios.get(`/Messagerie/messages/${selectedChatId}`);
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChatId]);

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when component mounts
  }, [messages]); // Scroll whenever messages change


  const scrollToBottom = () => {
    if (chatEndRef.current) { // Check if chatEndRef is not null
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Group messages by date
  const groupedMessages = messages.reduce((acc, curr) => {
    const messageDate = new Date(curr.timeSend);
    let formattedDate;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (messageDate.toDateString() === today.toDateString()) {
      formattedDate = 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      formattedDate = 'Yesterday';
    } else {
      formattedDate = messageDate.toLocaleDateString();
    }
    acc[formattedDate] = acc[formattedDate] || [];
    acc[formattedDate].push(curr);
    return acc;
  }, {});

  return (
    <Box
      bg={bgImage}
      w={'98%'}
      h={'84.3vh'}
      p="4"
      borderRadius={'20px'}
    >
      <VStack h="100%" spacing="4" justify="space-between">
        <Flex justify="space-between" bg={Color} w='100%' borderRadius='10px' >
          {selectedChatInfo && ( // Check if selectedChatInfo is not null
            <Flex flexDirection={'row'} margin='3'>
              <Image src={selectedChatInfo.avatar ? require(`../../../assets/${selectedChatInfo.avatar}`) : ''} boxSize="50px" borderRadius="50%" mr="2" />
              <Text fontWeight="bold" mt='3'>{selectedChatInfo.name}</Text>
            </Flex>
          )}
        </Flex>
        <Box overflowY="scroll" flex="1">
          {loading ? (
            <Center>
        <Text fontWeight="bold" fontSize="2rem" mt="60%">
          No Chat selected. Please select a chat.
        </Text>            
        </Center>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : Object.entries(groupedMessages).length === 0 ? (
            <Text>No messages found.</Text>
          ) : (
            Object.entries(groupedMessages).map(([date, msgs]) => (
              <VStack key={date} spacing="4" align="flex-start" w='165vh'>                
              <Text fontWeight="bold" ml='50%'>{date}</Text>
                {msgs.map((message) => (
                  <Box
                    key={message.id}
                    p="4"
                  >
                    <Flex>
                      {message.senderId !== teacherId && (
                        <Image
                        src={message.senderA ? require(`../../../assets/${message.senderA}`) : ''} boxSize="30px"
                          borderRadius="50%"
                          mr="2"
                        />
                      )}
                      <Text fontWeight="bold">{message.sender}</Text>
                    </Flex>
                    <Flex bg={message.senderId === teacherId ? 'gray.200' : 'teal.200'} flexDirection={'column'} borderRadius='10px' padding='0.2cm'>  
                      <Text >{message.context}</Text>              
                      <Text fontSize="smaller" mt="-3" mb="-1" ml="10" align="end">
                      {new Date(message.timeSend).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>                    
                    </Flex>
                  </Box>
                ))}
              </VStack>
            ))
          )}
          <div ref={chatEndRef} />
        </Box>
      </VStack>
    </Box>
  );
};

export default TeacherMessagesPage;
