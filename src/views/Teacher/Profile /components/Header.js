import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = ({ backgroundHeader, backgroundProfile, tabs }) => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const text = useColorModeValue("gray.700", "white");
  const border = useColorModeValue("white", "rgba(255, 255, 255, 0.31)");
  const email = useColorModeValue("gray.400", "gray.300");
  const ID = localStorage.getItem("id"); // Assuming the token is stored in localStorage

  useEffect(() => {
    const fetchListeStudent = async () => {
      try {
        const response = await axios.get(`/crud/teacher/${ID}`);
        setStudentInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListeStudent();
  }, []);

  if (isLoading || !studentInfo) return <div>Loading...</div>;

  const { avatar, firstName, lastName, email: userEmail } = studentInfo;

  // Chakra color mode
  const textColor = text;
  const borderProfileColor = border;
  const emailColor = email;

  return (
    <Box
      mb={{ sm: "205px", md: "75px", xl: "70px" }}
      borderRadius='15px'
      px='0px'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      align='center'>
      <Box
        bgImage={backgroundHeader}
        w='100%'
        h='300px'
        borderRadius='25px'
        bgPosition='50%'
        bgRepeat='no-repeat'
        position='relative'
        display='flex'
        justifyContent='center'>
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx='1.5rem'
          maxH='330px'
          w={{ sm: "90%", xl: "95%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          backdropFilter='saturate(200%) blur(50px)'
          position='absolute'
          boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
          border='2px solid'
          borderColor={borderProfileColor}
          bg={backgroundProfile}
          p='24px'
          borderRadius='20px'
          transform={{
            sm: "translateY(45%)",
            md: "translateY(110%)",
            lg: "translateY(160%)",
          }}>
          <Flex
            align='center'
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Avatar
              me={{ md: "22px" }}
              src={require(`../../../../assets/${avatar}`)}
              w='80px'
              h='80px'
              borderRadius='15px'
            />
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
                {firstName} {lastName}
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight='semibold'>
                {userEmail}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
