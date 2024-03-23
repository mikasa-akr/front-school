import { Flex } from "@chakra-ui/react";
import React from "react";
import Rattrapages from "./components/Rattrapages";
import RattrapageView from "./components/RattrapageView";
import { Route, Routes } from "react-router-dom";

function TablesRattrapage() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Rattrapages />} />
        <Route path="/view/:id" element={<RattrapageView />} />
      </Routes>
    </>
  );
}
export default TablesRattrapage;
