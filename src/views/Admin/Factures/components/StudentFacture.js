import { Flex, Select, Table,useColorModeValue, Thead, Tbody,Badge, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalBody, Text } from "@chakra-ui/react";import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../../../components/Card/Card.js";
import CardBody from "../../../../components/Card/CardBody.js";
import CardHeader from "../../../../components/Card/CardHeader.js";

function StudentFacture({ captions, logo }) {
  const [listeFacture, setListeFacture] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("transaction");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const paymentMethods = ["transaction", "stripeCard"]; // Payment method options
  const bgStatus = useColorModeValue("red.400", "red.400");
  const colorStatus = useColorModeValue("white", "white");
  useEffect(() => {
    fetchListeFacture();
  }, []);

  const handleUpdateStatus = async (id) => {
    try {
      // Make a PUT request to the update_status endpoint with the payment ID
      await axios.put(`/facture/student/update_status/${id}`, { status: "payed" });
      // Assuming id is available in the scope
      // You might need to adjust this part based on your component's structure
      console.log("Status updated successfully");
      // You can also perform any additional actions after the status is updated
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle errors if necessary
    }
  };

  const fetchListeFacture = async () => {
    try {
      const response = await axios.get("/facture/student", {
        params: { method: selectedOption },
      });
      const filteredData = response.data.filter((facture) =>
        facture.method === selectedOption
      );
      setListeFacture(filteredData);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeOption = async (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setIsLoaded(false);
    try {
      const response = await axios.get("/facture/student", {
        params: { method: value },
      });
      const filteredData = response.data.filter((facture) =>
        facture.method === value
      );
      setListeFacture(filteredData);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  if (!isLoaded) return <Flex>Loading...</Flex>;

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} borderRadius={"20px"}>
          <CardHeader p="6px 0px 22px 0px"></CardHeader>
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
                      <Button onClick={() => handleViewImage(fature.file)}>View</Button>
                    </Td>
                      <Td>
                      <Badge
                      bg={fature.status === "payed" ? "green.400" : bgStatus}
                      color={fature.status === "payed" ? "white" : colorStatus}
                      fontSize="16px"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      {fature.status}
                    </Badge>                      </Td>
                      <Td>
                        <Flex
                          direction={{ sm: "column", md: "row" }}
                          align="flex-start"
                        >
                    <Button
                      colorScheme="teal"
                      onClick={() => handleUpdateStatus(fature.id)} // Assuming the payment ID is available in facture.id
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
                    <Badge
                      bg={fature.status === "payed" ? "green.400" : bgStatus}
                      color={fature.status === "payed" ? "white" : colorStatus}
                      fontSize="16px"
                      p="3px 10px"
                      borderRadius="8px"
                    >
                      {fature.status}
                    </Badge>
                  </Td> 
                  </Tr>
                ))}
              </Tbody>
            </Table>)}
          </CardBody>
        </Card>
      </Flex>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
          <ModalBody display="flex" justifyContent="center" alignItems="center">
  <img
    src={require(`../../../../assets/${selectedImage}`)}
    alt="Factura Image"
    style={{ maxWidth: "1000vh" }}
  />
</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default StudentFacture;
