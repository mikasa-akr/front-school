import React, { useEffect, useState } from "react";
import {
  Text,
  Center,
  Grid,
  Flex,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react"; // Import missing components
import axios from "axios";
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51OyasWBNWgwGqFvzzcG0jn80B1lHgihqrkhbRdcCvexIeAZcLur7KbRpipxkKC9DTkO1xhsLehILhrBNm8Wi9ep400Td1NEJiI");

function FacturePage() {
  const stripe = useStripe();
  const elements = useElements();
  const [factures, setFactures] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFactureIds, setSelectedFactureIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue("black", "white");
  const ID = localStorage.getItem('id');

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const response = await axios.get(`/facture/teacher/${ID}`);
        const responseData = response.data;
  
        // Directly use factures from the server
        setFactures(responseData.factures);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching factures:', error);
      }
    };
  
    fetchFactures();
  }, [ID]);
  

  const handlePay = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePayment = async () => {
    setIsSaving(true);

    try {
      const response = await axios.post(`facture/teacher/payment/teacher/${ID}`, {
        factureIds: selectedFactureIds
      });

      const { clientSecret } = response.data;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (paymentResult.error) {
        setIsSaving(false);
        setError(`Payment failed: ${paymentResult.error.message}`);
      } else {
        setIsSaving(false);
        closeModal();
        setFactures([]);
        setSelectedFactureIds([]);
        setIsLoaded(false);
        setShowModal(false);

        console.log('Payment successful!');
      }
    } catch (error) {
      setIsSaving(false);
      setError('An error occurred during payment.');
      console.error('Error processing payment:', error);
    }
  };
  const handleCheckboxChange = (id) => {
    // 1. Create a copy of the factures array
    const updatedFactures = [...factures];
  
    // 2. Toggle the selected state of the clicked facture
    const newFactures = updatedFactures.map((facture) => 
      facture.id === id ? { ...facture, selected: !facture.selected } : facture
    );
  
    // 3. Set the state with the updated factures
    setFactures(newFactures);
  
    // 4. Access the updated facture ID
    const factureId = id;
    console.log(factureId)
  
    // 5. Update selectedFactureIds based on selection
    setSelectedFactureIds(prevIds => {
      if (newFactures.find(facture => facture.id === id).selected) {
        return [...prevIds, factureId];
      } else {
        return prevIds.filter(id => id !== factureId);
      }
    });
  };
  
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Grid gap={6}>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }} mt={20}>
        <Text fontSize="2xl" fontWeight="bold" color={bgColor} mb={4}>Pending Factures</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Facture ID</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Select</Th>
            </Tr>
          </Thead>
          <Tbody>
            {factures.filter(facture => facture.status !== 'payed').map((facture, index) => (
              <Tr key={facture.id}>
                <Td>{facture.id}</Td>
                <Td>{facture.amount} $</Td>
                <Td>{facture.status}</Td>
                <Td>{facture.dateAt}</Td>
                <Td>
                  <Checkbox isChecked={facture.selected} onChange={() => handleCheckboxChange(facture.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Center mt={4}>
          <Button size="md" onClick={handlePay}>Pay</Button>
        </Center>
        <Text fontSize="2xl" fontWeight="bold" color={bgColor} mt={8} mb={4}>Paid Factures</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Facture ID</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Date Paid</Th>
            </Tr>
          </Thead>
          <Tbody>
            {factures.filter(facture => facture.status === 'payed').map((facture, index) => (
              <Tr key={facture.id}>
                <Td>{facture.id}</Td>
                <Td>{facture.amount} $</Td>
                <Td>{facture.status}</Td>
                <Td>{facture.datePay}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
  
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Payment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mt={4}>
                <FormLabel>Card Details</FormLabel>
                <CardElement options={{ hidePostalCode: true }} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button size="md" colorScheme="teal" mr={3} onClick={handlePayment} isLoading={isSaving}>
                Pay
              </Button>
              <Button size="md" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Grid>
  );
}

const WrappedFacturePage = () => (
  <Elements stripe={stripePromise}>
    <FacturePage />
  </Elements>
);

export default WrappedFacturePage;
