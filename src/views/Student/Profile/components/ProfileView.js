import React, { useEffect, useState } from 'react';
import { Flex, useColorModeValue, Text, IconButton, Icon, Box, HStack } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProfileUpdateForm from './ProfileUpdateForm';

function ProfileView() {
  const id = localStorage.getItem('id');
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    axios.get(`/crud/student/${id}`)
      .then(function (response) {
        setProfileData(response.data);
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }, [id]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setShowForm(!showForm);
  };

  return (
    <Box bg={bgColor} borderRadius={'20px'} padding={30} width={'30%'}>
      {showForm ? (
        <ProfileUpdateForm profileData={profileData} />
      ) : (
        <Flex direction="column" alignItems="center" my={{ sm: '24px', xl: '0px' }}>
          {profileData ? (
            <>
              <IconButton
                icon={<Icon as={FaEdit} />}
                onClick={toggleEdit}
                aria-label="Edit Profile"
                colorScheme="teal"
                alignSelf="flex-end"
                mt="10px"
              />
              <Text fontSize="lg" fontWeight="bold" mb="12px">
                Profile Information
              </Text>
              <Flex direction="column" width="100%" mb="20px" margin='10%'>
                <Text fontSize="md" color="gray.500" fontWeight="400" mb="10px">
                  This is the user's profile information.
                </Text>
                <Flex direction="row" width="100%" mb="20px" margin='15px'>
                  <Text fontSize="md" fontWeight="bold">
                    Full Name:
                  </Text>
                  <Text fontSize="md" color="gray.500" fontWeight="400">
                    {`${profileData.firstName} ${profileData.lastName}`}
                  </Text>
                </Flex>
                <Flex direction="row" width="100%" mb="20px" margin='15px'>
                  <Text fontSize="md" fontWeight="bold">
                    Mobile:
                  </Text>
                  <Text fontSize="md" color="gray.500" fontWeight="400">
                    {profileData.number}
                  </Text>
                </Flex>
                <Flex direction="row" width="100%" mb="20px" margin='15px'>
                  <Text fontSize="md" fontWeight="bold">
                    Email:
                  </Text>
                  <Text fontSize="md" color="gray.500" fontWeight="400">
                    {profileData.email}
                  </Text>
                </Flex>
                <Flex direction="row" width="100%" mb="20px" margin='15px'>
                  <Text fontSize="md" fontWeight="bold">
                    Gender:
                  </Text>
                  <Text fontSize="md" color="gray.500" fontWeight="400">
                    {profileData.gender}
                  </Text>
                </Flex>
                <Flex direction="row" width="100%" mb="20px" margin='15px'>
                  <Text fontSize="md" fontWeight="bold">
                    Date Age: 
                  </Text>
                  <Text fontSize="md" color="gray.500" fontWeight="400">
                    {profileData.age}
                  </Text>
                </Flex>
              </Flex>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </Flex>
      )}
    </Box>
  );
}

export default ProfileView;
