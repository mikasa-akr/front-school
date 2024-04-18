import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, Flex, useColorModeValue, Center } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";

function CountFacture() {
  const [countFactures, setTotalFactures] = useState({
    totalfacturesDone: 0,
    totalfacturesNotDone: 0,
  });
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem("id"); // Assuming the token is stored in localStorage
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

  useEffect(() => {
    const fetchTotalFactures = async () => {
      try {
        const response = await axios.get(`/crud/teacher/total/facture/count/${ID}`);
        setTotalFactures(response.data);
      } catch (error) {
        console.error("Error fetching total factures:", error);
      }
    };

    fetchTotalFactures();
  }, [ID]);

  const chartData = {
    labels: ["Payed", "Not Payed"],
    datasets: [
      {
        label: "Factures",
        data: [countFactures.totalfacturesDone, countFactures.totalfacturesNotDone],
        backgroundColor: ["#2ECC71", "#E74C3C"], // Customize bar colors here
        borderColor: ["#2ECC71", "#E74C3C"], // Customize bar borders here
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <Center>
      <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center" width={'500px'}>
        <Text fontSize="2xl" color={textColor}>
          Facture
        </Text>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Center>
  );
}

export default CountFacture;
