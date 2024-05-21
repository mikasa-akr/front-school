import { Flex,Box,Link } from "@chakra-ui/react";
import React,{useState} from "react";
import Reclamations from "./components/Reclamations";
import { Route, Routes,useNavigate } from "react-router-dom";
import Annulations from "./components/Annulations";

function TablesReclamation() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('reclamation');

  const handleActiveLinkChange = (newLink) => {
    setActiveLink(newLink);
  };
  
  const handlereclamationClick = () => {
    navigate("/teacher/liste/*");
    handleActiveLinkChange('reclamation');
  };
  
  const handleannulationClick = () => {
    navigate("/teacher/liste/annulation");
    handleActiveLinkChange('annulation');
  };
  

  return (
    <Flex direction="column" alignItems="center" mt={'8%'}>
      <Box mb={4}>
        <Link
          onClick={handlereclamationClick}
          fontSize="xl"
          fontWeight="bold"
          px={4}
          py={2}
          rounded="md"
          bg={activeLink === 'reclamation' ? 'teal.300' : ' '}
          _hover={{ bg: 'teal.300' }}
        >
          reclamation
        </Link>
        <Link
          onClick={handleannulationClick}
          ml={4}
          fontSize="xl"
          fontWeight="bold"
          px={4}
          py={2}
          rounded="md"
          bg={activeLink === 'annulation' ? 'teal.300' : ' '}
          _hover={{ bg: 'teal.300' }}
        >
          annulation
        </Link>
      </Box>
      <Routes>
        <Route path="/*" element={<Reclamations />} />
        <Route path="/annulation" element={<Annulations />} />
      </Routes>
    </Flex>
  );
}
export default TablesReclamation;
