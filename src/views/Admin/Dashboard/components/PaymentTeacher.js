import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center,Flex } from "@chakra-ui/react";

function PaymentTeacher() {
  const [paymentData, setPaymentData] = useState({ totalPay: 0, totalNotPay: 0 });
  const bgColor = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/crud/teacher/total/payment");
        setPaymentData(response.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Center>
      <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center">
        <Text mb={4} fontWeight="bold">
          Teacher Payment
        </Text>
        <Flex flexDirection="row" justifyContent="center" mt={'50%'}>
          <Flex flexDirection="column" padding="20px">
            <Text fontSize="xl" fontWeight="bold">
              Payed:
            </Text>
            <Text fontSize="2xl">{paymentData.totalPay}</Text>
          </Flex>
          <Flex flexDirection="column" padding="20px">
            <Text fontSize="xl" fontWeight="bold">
              Not Payed:
            </Text>
            <Text fontSize="2xl">{paymentData.totalNotPay}</Text>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
}

export default PaymentTeacher;
