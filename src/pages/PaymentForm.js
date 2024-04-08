import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';

const PaymentForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripeCard'); // Default to stripeCard
  const [amount, setAmount] = useState(200); // Default amount
  const stripe = useStripe();
  const elements = useElements();
  const studentId = 17;
  const [fileTransaction, setFileTransaction] = useState(null);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe.js has not yet loaded.');
      return;
    }

    let formData = new FormData();
    formData.append('method', paymentMethod);
    formData.append('amount', amount);

    if (paymentMethod === 'stripeCard') {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setError('Card input is not available.');
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        return;
      }

      const { last4 } = paymentMethod.card;

      formData.append('cardNumber', last4);
    } else if (paymentMethod === 'transaction') {
      formData.append('fileTransaction', fileTransaction);
    }

    try {
      const response = await axios.post(`/crud/student/payment/student/${studentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      console.log('Payment successful:', response.data);
    } catch (error) {
      setError('Payment failed: ' + error.response.data.error);
    }
  };

  const handleFileChange = (e) => {
    setFileTransaction(e.target.files[0]);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <FormControl mb={4}>
        <FormLabel>Payment Method</FormLabel>
        <Select value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="stripeCard">Stripe Card</option>
          <option value="transaction">File Transaction</option>
        </Select>
      </FormControl>
      {paymentMethod === 'stripeCard' && (
        <FormControl mb={4}>
          <FormLabel>Card Details</FormLabel>
          <CardElement options={{ hidePostalCode: true }} />
        </FormControl>
      )}
      <FormControl mb={4}>
        <FormLabel>Amount</FormLabel>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </FormControl>
      {paymentMethod === 'transaction' && (
        <FormControl mb={4}>
          <FormLabel>Upload Transaction File</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>
      )}
      {error && <Text color="red.500">{error}</Text>}
      {success && <Text color="green.500">Payment successful!</Text>}
      <Flex>
        <Button color="teal" onClick={handleSubmit} disabled={!stripe}>
          Pay
        </Button>
      </Flex>
    </Box>
  );
};

export default PaymentForm;
