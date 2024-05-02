import {
  Avatar,
  Box,
  Flex,
  Text,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { FaEdit } from "react-icons/fa";

const Header = ({ backgroundHeader, backgroundProfile, tabs }) => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const text = useColorModeValue("gray.700", "white");
  const border = useColorModeValue("white", "rgba(255, 255, 255, 0.31)");
  const email = useColorModeValue("gray.400", "gray.300");
  const number = useColorModeValue("gray.400", "gray.300");
  const gender = useColorModeValue("gray.400", "gray.300");
  const age = useColorModeValue("gray.400", "gray.300");
  const ID = localStorage.getItem("id"); // Assuming the token is stored in localStorage

  useEffect(() => {
    const fetchListeStudent = async () => {
      try {
        const response = await axios.get(`/crud/student/${ID}`);
        setStudentInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "An Error Occurred!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    fetchListeStudent();
  }, [ID]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setShowForm(!showForm);
  };

  return (
    <Box
      mb={{ sm: "205px", md: "75px", xl: "70px" }}
      borderRadius="15px"
      px="0px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      align="center"
    >
      <Box
        bgImage={backgroundHeader}
        w="100%"
        h="300px"
        borderRadius="25px"
        bgPosition="50%"
        bgRepeat="no-repeat"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx="1.5rem"
          w={{ sm: "90%", xl: "95%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align="center"
          backdropFilter="saturate(200%) blur(50px)"
          position="absolute"
          mt={showForm ? "-55%" : "-22%"} // Adjusted margin-top conditionally          
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
          border="2px solid"
          borderColor={border}
          bg={backgroundProfile}
          p="24px"
          borderRadius="20px"
          transform={{
            sm: "translateY(45%)",
            md: "translateY(110%)",
            lg: "translateY(160%)",
          }}
        >
          {showForm ? (
            <ProfileUpdateForm profileData={studentInfo} />
          ) : (
            <>
              <IconButton
                icon={<Icon as={FaEdit} />}
                onClick={toggleEdit}
                aria-label="Edit Profile"
                colorScheme="teal"
                alignSelf="end"
              />
              <Flex
                direction="column"
                maxWidth="100%"
                my={{ sm: "14px" }}
                mr='43%'
              >
                <Avatar
                me={{ md: "22px" }}
                src={
                  studentInfo && require(`../../../../assets/${studentInfo.avatar}`)
                }
                w="80px"
                h="80px"
                borderRadius="15px"
                alignSelf={'center'}
              />
                <Text
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color={text}
                  fontWeight="bold"
                  ms={{ sm: "8px", md: "0px" }}
                  margin='10px'
                >
                  Full Name :{studentInfo && `${studentInfo.firstName} ${studentInfo.lastName}`}
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "md" }}
                  color={email}
                  fontWeight="semibold"
                  margin='10px'
                >
                  Email: {studentInfo && studentInfo.email}
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "md" }}
                  color={number}
                  fontWeight="semibold"
                  margin='10px'
                >
                  Mobile : {studentInfo && studentInfo.number}
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "md" }}
                  color={gender}
                  fontWeight="semibold"
                  margin='10px'
                >
                  Gender: {studentInfo && studentInfo.gender}
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "md" }}
                  color={age}
                  fontWeight="semibold"
                  margin='10px'
                >
                  Date of Birth: {studentInfo && studentInfo.age}
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
