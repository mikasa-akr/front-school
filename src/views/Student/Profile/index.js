import React, { useEffect, useState } from 'react';
import { Flex, useColorModeValue, Grid } from '@chakra-ui/react';
import Header from './components/Header';
import ProfileUpdateForm from './components/ProfileUpdateForm';
import axios from 'axios';
import ProfileBgImage from '../../../assets/img/ProfileBackground.png';
import ProfileView from './components/ProfileView';

function Profile() {
  // Chakra color mode
  const bgProfile = useColorModeValue(
    'hsla(0,0%,100%,.8)',
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)'
  );

  const [studentInfo, setStudentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListeStudent = async () => {
      try {
        const response = await axios.get('/crud/student/');
        setStudentInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListeStudent();
  }, []);

  if (isLoading || !studentInfo) return <div>Loading...</div>;

  const { avatar, firstName, lastName, email } = studentInfo;

  return (
    <Flex direction="column">
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={avatar}
        firstName={firstName}
        lastName={lastName}
        email={email}
        tabs={[]}
      />
      <Grid gap='22px' mt={'10%'}>
        <Flex justify={'center'}>
          <ProfileView />
        </Flex>
      </Grid>
    </Flex>
  );
}

export default Profile;
