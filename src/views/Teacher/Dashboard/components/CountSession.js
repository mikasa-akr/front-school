import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, Flex, useColorModeValue, Center } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";

import { Chart } from "chart.js/auto"; // Import Chart.js with auto option

function CountSession() {
  const [countSessions, setTotalSessions] = useState({
    totalsessionsDone: 0,
    totalsessionsNotDone: 0,
  });
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem("id"); // Assuming the token is stored in localStorage
  const textColor = useColorModeValue("gray.400", "gray.400"); // Define textColor for better readability

  useEffect(() => {
    const fetchTotalSessions = async () => {
      try {
        const response = await axios.get(`/crud/teacher/total/session/count/${ID}`);
        setTotalSessions(response.data);
      } catch (error) {
        console.error("Error fetching total teachers:", error);
      }
    };

    fetchTotalSessions();
  }, [ID]);

  const chartData = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        label: "Sessions",
        data: [countSessions.totalsessionsDone, countSessions.totalsessionsNotDone],
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
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <Center>
      <Box bg={bgColor} p={6} borderRadius="20px" boxShadow="md" textAlign="center" width={'500px'}>
        <Text fontSize="2xl" color={textColor}>
          Session
        </Text>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Center>
  );
}

export default CountSession;
