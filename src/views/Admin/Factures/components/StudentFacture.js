import { Flex, Radio, RadioGroup, Text, Tbody,Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Icon,
  Td,
  Tr,
  Grid,
  Button,
  useColorModeValue,
  Badge,
  Table,
  Thead,
  Th,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "../../../../components/Card/Card.js";
import CardBody from "../../../../components/Card/CardBody.js";
import CardHeader from "../../../../components/Card/CardHeader.js";
function StudentFacture({ captions, logo }) {
  const [listeFacture, setListeFacture] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
  const [isOpen, setIsOpen] = useState(false); // State to control the modal in StudentView
  const [selectedOption, setSelectedOption] = useState("transaction");
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const bgColor = useColorModeValue("white", "gray.700");
  const paymentMethods = ["transaction", "stripeCard"]; // Payment method options
  const toggleModal = (student) => {
    setSelectedStudent(student);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchListeFacture();
  }, []);

  const fetchListeFacture = async () => {
    try {
      const response = await axios.get("/facture/student", {
        params: { method: selectedOption },
      });
      const filteredData = response.data.filter((facture) =>
        facture.method === selectedOption
      ); // Filter data based on method
      setListeFacture(filteredData);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeOption = async (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setIsLoaded(false); // Set loaded to false to display the loading message
    try {
      const response = await axios.get("/facture/student", {
        params: { method: value },
      });
      const filteredData = response.data.filter((facture) =>
        facture.method === value
      ); // Filter data based on method
      setListeFacture(filteredData);
      setIsLoaded(true); // Set loaded to true once data is fetched
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoaded) return <Flex>Loading...</Flex>;

  return (
    <>
      <Grid>
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <Card
            overflowX={{ sm: "scroll", xl: "hidden" }}
            bg={bgColor}
            borderRadius={"20px"}
          >
            <CardHeader p="6px 0px 22px 0px">
            </CardHeader>
            <Flex justifyContent="center" mb={4}>
              <Select
                value={selectedOption}
                onChange={handleChangeOption}
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </Select>
            </Flex>
            <CardBody>
            {selectedOption === "transaction" && (
              <Table variant="simple">
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th color="gray.400">Student</Th>
                    <Th color="gray.400">Amount</Th>
                    <Th color="gray.400">Date</Th>
                    <Th color="gray.400">File</Th>
                    <Th color="gray.400">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listeFacture.map((fature, key) => (
                    <Tr key={key}>
                      <Td>
                        <Text fontSize="md" fontWeight="bold">
                          {fature.student_id}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="md" fontWeight="bold">
                          {fature.amount}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="md" fontWeight="bold">
                          {fature.datePay}
                        </Text>
                      </Td>
                      <Td>
                      <img
  src={require("../../../../assets/3e1e6e4ab844cb27d49a43239daf9f42.png")} // Assuming filename is in transactionFile  style={{ maxWidth: "200px", maxHeight: "100px" }}
/>
                    </Td>
                      <Td>
                        <Text fontSize="md" fontWeight="bold">
                          {fature.status}
                        </Text>
                      </Td>
                      <Td>
                        <Flex
                          direction={{ sm: "column", md: "row" }}
                          align="flex-start"
                        >
                          <Button
                            colorScheme="teal"
                            mr={2}
                          >
                            Valid
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
               )}
               {selectedOption === "stripeCard" && (
              <Table variant="simple">
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th color="gray.400">Student</Th>
                  <Th color="gray.400">Amount</Th>
                  <Th color="gray.400">Date</Th>
                  <Th color="gray.400">Card Number</Th>
                  <Th color="gray.400">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listeFacture.map((fature, key) => (
                  <Tr key={key}>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {fature.student_id}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {fature.amount}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {fature.datePay}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {fature.stripeCard}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {fature.status}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>)}
            </CardBody>
          </Card>
        </Flex>
      </Grid>
    </>
  );
}

export default StudentFacture;
