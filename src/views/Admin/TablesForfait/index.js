import { Flex } from "@chakra-ui/react";
import React from "react";
import Forfaits from "./components/Forfaits";
import ForfaitCreate from "./components/ForfaitCreate";
import { Route, Routes } from "react-router-dom";

function TablesGroup() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Forfaits />} />
        <Route path="/create" element={<ForfaitCreate />} />
      </Routes>
    </>
  );
}
export default TablesGroup;
