import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, useColorModeValue, Center, Flex } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";

function PaymentTeacher() {
  const [paymentData, setPaymentData] = useState({ totalPay: 0, totalNotPay: 0 });
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

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

  const chartData = {
    labels: ["Paid", "Not Paid"],
    datasets: [
      {
        label: "Payment Status",
        data: [paymentData.totalPay, paymentData.totalNotPay],
        backgroundColor: ["#2ECC71", "#E74C3C"], // Customize colors here
        borderColor: ["#2ECC71", "#E74C3C"], // Customize borders here
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    legend: {
      display: true,
      position: "top",
    },
  };

  return (
    <Center>
      <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center">
        <Text mb={4} fontWeight="bold" color={textColor}>
          Teacher Payment
        </Text>
        <Doughnut data={chartData} options={chartOptions} />
      </Box>
    </Center>
  );
}

export default PaymentTeacher;
