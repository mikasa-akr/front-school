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
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    axios
      .post('/crud/expenses/signUp/expenses', {
        category: category,
        amount: amount
      })
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Expenses saved successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        setCategory(' ');
        setAmount(' ');
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

  return (
    <Flex>
      <Container mt="10%">
        <VStack spacing="6">
          <Heading as="h4" size="md" color="#ffffff">
            Create Expenses
          </Heading>
          <FormControl>
            <FormLabel htmlFor="category">Category:</FormLabel>
            <Input
              id="category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Enter category"
              size="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="amount">Amount:</FormLabel>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Enter amount"
              size="md"
            />
          </FormControl>
          <Button
            onClick={handleSave}
            colorScheme="teal"
            borderRadius="xl"
            isLoading={isSaving}
            loadingText="Saving..."
          >
            Save Expenses
          </Button>
          <Text color="gray.500" textAlign="center">
            <Link to="/admin/table/expenses/*">View All Expenses</Link>
          </Text>
        </VStack>
      </Container>
    </Flex>
  );
}

export default ForfaitCreate;
