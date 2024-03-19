import { Flex } from "@chakra-ui/react";
import React from "react";
import Reclamations from "./components/Reclamations";
import ReclamationView from "./components/ReclamationView";
import ReclamationUpdate from "./components/ReclamationUpdate";
import { Route, Routes } from "react-router-dom";

function TablesReclamation() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Reclamations />} />
        <Route path="/view/:id" element={<ReclamationView />} />
        <Route path="/update/:id" element={<ReclamationUpdate />} />
      </Routes>
    </>
  );
}
export default TablesReclamation;
