import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Image, Text, Spinner, useColorModeValue, Divider } from '@chakra-ui/react';

const Sidebar = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  
  const bgColor = useColorModeValue("white", "gray.700");
  const Color = useColorModeValue("#EDF2F7", "#4A5568");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`Messagerie/all/chat`);
        setChats(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chatId, name, avatar) => {
    onSelectChat(chatId, name, avatar);
    setSelectedChatId(chatId);
  };

  return (
    <Box p="4" bg={bgColor} borderRadius="lg" boxShadow="md" position="fixed" left="0" top="10%" bottom="0" maxH="calc(92vh - 8%)" overflowY="auto">
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => handleChatClick(chat.id,chat.name,chat.avatar)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '15%', backgroundColor: selectedChatId === chat.id ? Color : 'transparent',borderRadius:'7px' }}
            >
              <Image src={require(`../../../assets/${chat.avatar}`)} boxSize="50px" borderRadius="50%" mr="2" />
              <Text mt={'10%'}>{chat.name}</Text>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Sidebar;
