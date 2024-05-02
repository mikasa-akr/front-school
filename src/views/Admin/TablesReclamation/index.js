import React, { useState } from 'react';
import { Flex, Link, Box } from '@chakra-ui/react';
import { Route, Routes, Navigate } from "react-router-dom";
import Annulated from "./components/Annulated";
import Reclamations from "./components/Reclamations";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('annulated'); // State to track active link

  const handleActiveLinkChange = (newLink) => {
    setActiveLink(newLink);
  };

  const handleTeacherClick = () => {
    navigate("admin/table/reclamation/*");
    handleActiveLinkChange('annulated');
  };

  const handleStudentClick = () => {
    navigate("/admin/table/reclamation/reclamation");
    handleActiveLinkChange('reclamation');
  };

  return (
    <Flex direction="column" alignItems="center" mt={'8%'}>
      <Box mb={4}>
        <Link
          onClick={handleTeacherClick}
          fontSize="xl"
          fontWeight="bold"
          px={4}
          py={2}
          rounded="md"
          bg={activeLink === 'annulated' ? 'teal.300' : ' '}
          _hover={{ bg: 'teal.300' }}
        >
          Annulation
        </Link>
        <Link
          onClick={handleStudentClick}
          ml={4}
          fontSize="xl"
          fontWeight="bold"
          px={4}
          py={2}
          rounded="md"
          bg={activeLink === 'reclamation' ? 'teal.300' : ' '}
          _hover={{ bg: 'teal.300' }}
        >
          Reclamation
        </Link>
      </Box>
      <Routes>
        <Route path="/*" element={<Annulated />} />
        <Route path="/reclamation" element={<Reclamations />} />
      </Routes>
    </Flex>
  );
}

export default Dashboard;
