import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Image,
  VStack,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import schoolImage from '../assets/QURAN-MAJEED.jpg';

function Dashboard() {
  const bgColor = useColorModeValue('beige', 'gray.700');

  const [courses, setCourses] = useState([
    { id: 1, type: 'Arabe', description: 'Learn Arabic language fundamentals.' },
    { id: 2, type: 'Coran', description: 'Study the holy book of Islam, the Quran.' },
    { id: 3, type: 'Calligraphie', description: 'Master the art of Islamic calligraphy.' },
    { id: 4, type: 'T. Islamique', description: 'Explore the teachings and principles of Islam.' }
  ]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // const response = await axios.get('/course');
      // setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <Box>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Edu School</Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-5" to="/register"
                  style={{ width: '100px', borderRadius: '50px', backgroundColor: 'teal', color: '#ffffff', textAlign: 'center' }}
                >Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Box position="relative" h="100vh">
        <Image src={schoolImage} alt="School Image" objectFit="cover" w="100%" h="100%" />
        <Heading fontSize="7rem" ml="10%" fontFamily="cursive">Edu School</Heading>
        <VStack spacing={8} align="center" justify="center" h="full">
          <VStack spacing={4} align="center" justify="center">
            <Text fontSize="2rem"  maxWidth="800px">Welcome to Edu School! This platform provides comprehensive management solutions for schools, offering features for course management, student enrollment, teacher assignments, and more.</Text>
            <Heading size="4rem">Courses Offered</Heading>
            <Flex flexWrap="wrap" justifyContent="center">
              {courses.map(course => (
                <Box key={course.id} p={10} borderWidth="1px" borderRadius="lg" boxShadow="md" bg={bgColor} m={50} width="300px" borderRadius="20px">
                  <Heading size="md">{course.type}</Heading>
                  <Text>{course.description}</Text>
                </Box>
              ))}
            </Flex>
            <VStack spacing={4} align="flex-start" justify="center" maxWidth="800px">
              <Heading fontSize="2rem">How to Use Edu School</Heading>
              <Text fontSize="xl"><strong>1. Sign Up:</strong> Create an account by clicking on the "Sign Up" button above.</Text>
              <Text fontSize="xl"><strong>2. Log In:</strong> Log in to your account using the "Log In" button above.</Text>
              <Text fontSize="xl"><strong>3. Explore Courses:</strong> Browse and explore available courses on the homepage.</Text>
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default Dashboard;
