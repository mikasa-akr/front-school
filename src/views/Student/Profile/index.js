import React, { useEffect, useState } from 'react';
import { Flex, useColorModeValue, Grid } from '@chakra-ui/react';
import Header from './components/Header';
import ProfileUpdateForm from './components/ProfileUpdateForm';
import axios from 'axios';
import ProfileBgImage from '../../../assets/img/ProfileBackground.png';

function Profile() {
  // Chakra color mode
  const bgProfile = useColorModeValue(
    'hsla(0,0%,100%,.8)',
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)'
  );

  const [studentInfo, setStudentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setShowForm(!showForm);
  };

  if (isLoading || !studentInfo) return <div>Loading...</div>;

  const { avatar, firstName, lastName, email, number, age, gender } = studentInfo;

  return (
    <Flex direction="column" position="relative" mt='8%'>
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={avatar}
        firstName={firstName}
        lastName={lastName}
        number={number}
        email={email}
        age={age}
        gender={gender}
        tabs={[]}
        toggleEdit={toggleEdit}
      />
      {showForm && (
        <ProfileUpdateForm
          profileData={studentInfo}
          toggleEdit={toggleEdit}
          backgroundProfile={bgProfile}
        />
      )}
    </Flex>
  );
}

export default Profile;
