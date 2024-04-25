import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
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
import image from '../assets/img/Snapshot_2024-04-23_15-26-04-removebg-preview.png'
import coran from '../assets/img/the-holy-quran-5-removebg-preview.png'
import arabe from '../assets/img/images.jpeg'
import calligraphy from '../assets/img/elkhat-elarabi-insciption.png'
import Islamic from '../assets/img/isl.jpg'
import signup from '../assets/img/—Pngtree—laptop mock up vector_5583348(3).png'
import chosse from '../assets/img/—Pngtree—laptop mock up vector_5583348(2).png'
import login from '../assets/img/—Pngtree—laptop mock up vector_5583348(4).png'
import dash from '../assets/img/—Pngtree—laptop mock up vector_5583348(5).png'
import money from '../assets/img/money.png'
import chat from '../assets/img/live-chat.png'
import profile from '../assets/img/website.png'

function Dashboard() {
  const bgColor = useColorModeValue('#4FD1C5', 'gray.700');
  const [totalCounts, setTotalCounts] = useState({ student: 0, teacher: 0 });
  const bgImage = 'url("https://qutor.com/assets/new/bg-laptop.jpg")'; 
  const bgFooter = 'url("https://qutor.com/assets/footer.png")';
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const linkStyles = {
    backgroundColor: '#f4dd5a',
    color: isHovered ? 'white' : 'black',
    padding: '10px 20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    transition: 'color 0.3s',
    fontSize: '25px', // Set font size here
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/total/all");
        setTotalCounts(response.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchData();
  }, []);

  const [courses, setCourses] = useState([
    { id: 1, type: 'Arabe', image: arabe },
    { id: 2, type: 'Coran', image: coran },
    { id: 3, type: 'Calligraphie', image: calligraphy },
    { id: 4, type: 'T. Islamique', image: Islamic }
  ]);

  return (
    <Box>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src={image} style={{ color: '#4FD1C5', width: '150px' }} /></Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-5" to="/register"
                  style={{ width: '100px', borderRadius: '50px', backgroundColor: '#4FD1C5', color: '#ffffff', textAlign: 'center' }}
                >Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Box position="relative" h="100vh">
        <Image src={schoolImage} alt="School Image" objectFit="cover" w="100%" h="100%" />
        <VStack bg="#f3f3f3" padding={10}>
          <Flex flexDirection="row" justifyContent="space-around">
            <Flex flexDirection="column" alignItems="center" marginLeft={10}>
              <Text fontSize="3rem" align="center" color="yellow" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{totalCounts.student}</Text>
              <Text fontSize="1.5rem" align="center">Total Students</Text>
            </Flex>
            <Flex flexDirection="column" alignItems="center" marginLeft={500}>
              <Text fontSize="3rem" align="center" color="yellow" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{totalCounts.teacher}</Text>
              <Text fontSize="2rem" align="center">Total Teachers</Text>
            </Flex>
          </Flex>
        </VStack>
        <VStack spacing={4} align="center" justify="center">
          <Text fontSize="1.5rem" maxWidth="800px" margin={'30px'}>This platform provides comprehensive management solutions for our school, offering features for course management, student enrollment, teacher assignments, and more.</Text>
        </VStack>
        <Heading fontSize="4rem" textAlign={'center'} fontFamily="sans-serif" >Courses Offered</Heading>
        <VStack>
          <Flex flexWrap="wrap" justifyContent="center">
            {courses.map(course => (
              <Box key={course.id} p={10} borderWidth="1px" boxShadow="md" style={{ background: `${bgImage} no-repeat center center fixed`, backgroundSize: 'cover'}} m={50} width="300px" borderRadius="20px">
                <Heading size="md">{course.type}</Heading>
                <Image src={course.image} style={{ width: '270px', height: '250px', objectFit: 'contain' }} alt={course.type} />
              </Box>
            ))}
          </Flex>
        </VStack>
        <VStack align="center" justify="center" style={{ background: `${bgImage} no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh' }} p={8} borderRadius="lg">
        <Heading fontSize="3rem" textAlign={'center'} fontFamily="sans-serif" fontWeight={'bold'}>Join Our Learning Community</Heading>          
        <Flex flexDirection="row" alignItems="center" margin={'-2%'}>
            <Image src={chosse} w="550px" objectFit="cover" borderRadius="lg" boxShadow="md"/>
            <Text fontSize="2rem">Select role student <br></br> to sign up as a student</Text>
          </Flex>
          <Flex flexDirection="row" alignItems="center" margin={'-2%'}>
            <Text fontSize="2rem">
              Sign up by clicking on the <Link to="/register">Sign up</Link><br></br>to Create a new account to access all features.
            </Text>
            <Image src={signup} w="550px" objectFit="cover" borderRadius="lg" boxShadow="md" />
          </Flex>

          <Flex flexDirection="row" alignItems="center" margin={'-2%'}>
            <Image src={login} w="550px" objectFit="cover" borderRadius="lg" boxShadow="md" />
            <Text fontSize="2rem">Login or Already have an account?<Link to="/login">Log in</Link>here</Text>
          </Flex>

          <Flex flexDirection="row" alignItems="center" margin={'-2%'}>
            <Text fontSize="2rem" >access your dashboard to manage courses,<br></br> assignments, and more.</Text>
            <Image src={dash} w="550px" objectFit="cover" borderRadius="lg" boxShadow="md" />
          </Flex>
        </VStack>

        <Heading fontSize="4rem" textAlign={'center'} fontFamily="sans-serif" mt={'5%'}>Register as teacher</Heading>
        <Flex flexDirection={'row'} justifyContent={'center'} mt={'1.5%'}>
          <Flex flexDirection={'column'} justifyContent="center" alignItems="center">
            <Image src={profile} w="130px" objectFit="cover" borderRadius="lg" boxShadow="md" />
            <Text fontSize="1.2rem" margin={40} textAlign={'center'}>Build your Edu school profile and choose <br></br> the course you want to teach, like Coran,<br></br>T.Islamique,Calligraphie and Arabic. </Text>
          </Flex>
          <Flex flexDirection={'column'} justifyContent="center" alignItems="center">
            <Image src={chat} w="130px" objectFit="cover" borderRadius="lg" boxShadow="md" />
            <Text fontSize="1.2rem" margin={40} textAlign={'center'}>
            You can message your Edu school students <br></br>and they can message you</Text>
          </Flex>

          <Flex flexDirection={'column'} justifyContent="center" alignItems="center">
            <Image src={money} w="130px" objectFit="cover" borderRadius="lg" boxShadow="md" />
            <Text fontSize="1.2rem" margin={40} textAlign={'center'}>your hourly rate based on your course and <br></br>every session you spend teaching</Text>
          </Flex>
        </Flex>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Link 
        to={'/register/teacher'} 
        style={linkStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Sign up as Teacher
      </Link>
    </Box>
    <Box
  as="footer"
  mt={'5%'}
  style={{
    background: `${bgFooter} no-repeat center center fixed`,
    backgroundSize: 'cover',
    color: 'white',
    textAlign: 'center',
    py: 4,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column', // Set flex direction to column to stack items vertically
    alignItems: 'center',
    justifyContent: 'center', // Center items horizontally and vertically
    padding: '0 20px', // Add padding to prevent content from sticking to edges
  }}
>
  <Box style={{ position: 'absolute', top: '10px', left: '20px' }} fontSize='3rem' fontFamily={'monospace'} fontStyle={'oblique'}>Edu School</Box>
  <iframe
    title="map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.4265602796296!2d11.093183115722566!3d33.5092323207502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fc9db0a7e0a2fb%3A0x8e3c2821efc5aa5b!2sSchool%20in%20Zarzis!5e0!3m2!1sen!2stn!4v1649482727722!5m2!1sen!2stn"
    style={{
      width: '400px',
      height: '300px',
      backgroundColor: 'transparent',
      margin:'20px',
      transform: 'translateX(180%)', // Center the iframe horizontally
    }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
  <Box style={{ position: 'absolute', top: '25%'}}>
<Text fontSize={'25px'} fontWeight={'bold'}>courses</Text>
{courses.map(course => (
      <Box
        key={course.id}
        p={3}
        borderWidth="1px"
        boxShadow="md"
        width="200px"
        borderRadius="20px"
        margin="10px"
      >
        {course.type}
      </Box>
    ))}
  </Box>
</Box>

      </Box>
    </Box>
  );
}

export default Dashboard;
