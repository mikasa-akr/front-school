import React, { useEffect, useState } from "react";
import {
  Text,
  Grid,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "../../../../components/Card/Card.js";
import CardBody from "../../../../components/Card/CardBody.js";
import CardHeader from "../../../../components/Card/CardHeader.js";

function FacturePage() {
  const [factures, setFactures] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const ID = localStorage.getItem('id'); // Assuming the token is stored in localStorage

  useEffect(() => {
    const fetchFactures = async () => {
        try {
            const response = await axios.get(`/facture/student/${ID}`);
            const responseData = response.data;
            setFactures(responseData.factures);
            setTotal(responseData.total);
            setIsLoaded(true);
        } catch (error) {
            console.error('Error fetching factures:', error);
        }
    };

    fetchFactures();
}, [ID]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Grid>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card bg={bgColor} overflowX={{ sm: "scroll", xl: "hidden" }} borderRadius={'20px'}>
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" fontWeight="bold">
              Factures
            </Text>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th color="gray.400">Method</Th>
                  <Th color="gray.400">Date</Th>
                  <Th color="gray.400">Amount</Th>
                  <Th color="gray.400">Status</Th>

                </Tr>
              </Thead>
              <Tbody>
                {factures.map((facture, key) => (
                  <Tr key={key}>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {facture.method}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {facture.status}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {facture.datePay}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="md" fontWeight="bold">
                        {facture.amount} $
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Flex>
    </Grid>
  );
}

export default FacturePage;
