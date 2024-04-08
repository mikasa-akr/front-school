import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CalendarDom from "./components/CalendarDom";

function TablesSession() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<CalendarDom />} />
      </Routes>
    </>
  );
}
export default TablesSession;
