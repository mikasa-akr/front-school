import { Flex,Box,Link } from "@chakra-ui/react";
import React,{useState} from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import Annulations from "./components/Annulations";

function TablesReclamation() {

  return (

      <Routes>
        <Route path="/*" element={<Annulations />} />
      </Routes>
  );
}
export default TablesReclamation;
