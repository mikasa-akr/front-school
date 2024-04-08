import React, { useState } from 'react';
import { Flex, Link, Box } from '@chakra-ui/react';
import { Route, Routes } from "react-router-dom";
import TeacherFacture from "./components/TeacherFacture";
import StudentFacture from "./components/StudentFacture";
import { useNavigate } from "react-router-dom";

function Facture() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('teacher'); // State to track active link

  const handleActiveLinkChange = (newLink) => {
    setActiveLink(newLink);
  };

  const handleTeacherClick = () => {
    navigate("/admin/facture/*");
    handleActiveLinkChange('teacher');
  };

  const handleStudentClick = () => {
    navigate("/admin/facture/student");
    handleActiveLinkChange('student');
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
          bg={activeLink === 'teacher' ? 'teal.300' : ' '}
          _hover={{ bg: 'teal.300' }}
        >
          Teacher
        </Link>
        <Link
          onClick={handleStudentClick}
          ml={4}
          fontSize="xl"
          fontWeight="bold"
          px={4}
          py={2}
          rounded="md"
          bg={activeLink === 'student' ? 'teal.300' : ' '}
          _hover={{ bg: 'teal.300' }}
        >
          Student
        </Link>
      </Box>
      <Routes>
        <Route path="/*" element={<TeacherFacture />} />
        <Route path="/student" element={<StudentFacture />} />
      </Routes>
    </Flex>
  );
}

export default Facture;
