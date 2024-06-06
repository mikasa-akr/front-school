import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Select,
  Input,
  VStack,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';

function ForfaitCreate() {
  const [subscription, setSubscription] = useState('');
  const [price, setPrice] = useState('');
  const [NbrHourSeanceOptions, setNbrHourSeanceOptions] = useState([]); // State for dynamic options
  const [title, setTitle] = useState('');
  const [NbrHourSeance, setNbrHourSeance] = useState('');
  const [NbrHourSession, setNbrHourSession] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    axios
      .post('/signUp/forfait', {
        subscription: subscription,
        title: title,
        price: price,
        NbrHourSeance: NbrHourSeance,
        NbrHourSession: NbrHourSession
      })
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Forfait saved successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        setSubscription('');
        setTitle('');
        setPrice(' ');
        setNbrHourSeance('');
        setNbrHourSession('');
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      });
  };

  useEffect(() => {
    // Update NbrHourSeance options based on selected NbrHourSession
    if (NbrHourSession === '4') {
      setNbrHourSeanceOptions([
        { value: '0.5', label: '30min' },
        { value: '1', label: '1h' },
      ]);
    } else if (NbrHourSession === '6') {
      setNbrHourSeanceOptions([
        { value: '0.75', label: '45min' },
        { value: '1.5', label: '1h 30min' },
      ]);
    } else if (NbrHourSession === '8') {
      setNbrHourSeanceOptions([
        { value: '1', label: '1h' },
        { value: '2', label: '2h' },
      ]);
    } else if (NbrHourSession === '12') {
      setNbrHourSeanceOptions([
        { value: '1.5', label: '1h 30min' },
        { value: '3', label: '3h' },
      ]);
    } else if (NbrHourSession === '16') {
      setNbrHourSeanceOptions([
        { value: '2', label: '2h' },
        { value: '4', label: '4h' },
      ]);
    } 
  }, [NbrHourSession]);


  return (
    <Flex>
      <Container mt="10%">
        <VStack spacing="6">
          <Heading as="h4" size="md" color="#ffffff">
            Create Forfait
          </Heading>
          <FormControl>
            <FormLabel htmlFor="title">Title:</FormLabel>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter Title"
              size="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="price">Price:</FormLabel>
            <Input
              id="price"
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Enter Price"
              size="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="subscription">Type:</FormLabel>
            <Select
              id="subscription"
              value={subscription}
              onChange={(event) => setSubscription(event.target.value)}
              size="md"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="NbrHourSession">Select Number of Hour Total:</FormLabel>
            <Select
              id="NbrHourSession"
              value={NbrHourSession}
              onChange={(event) => setNbrHourSession(event.target.value)}
              size="md"
            >
              <option value="4">4h</option>
              <option value="6">6h</option>
              <option value="8">8h</option>
              <option value="12">12h</option>
              <option value="16">16h</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="NbrHourSeance">Select Number of Hour per Session:</FormLabel>
            <Select
              id="NbrHourSeance"
              value={NbrHourSeance} // Reflect selected value
              onChange={(event) => setNbrHourSeance(event.target.value)}
              size="md"
            >
              {NbrHourSeanceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={handleSave}
            colorScheme="teal"
            borderRadius="xl"
            isLoading={isSaving}
            loadingText="Saving..."
          >
            Save Forfait
          </Button>
          <Text color="gray.500" textAlign="center">
                        <Link to="/admin/table/forfait/*">View All Forfait</Link>
                    </Text>
        </VStack>
      </Container>
    </Flex>
  );
}

export default ForfaitCreate;
