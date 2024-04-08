import { Flex } from "@chakra-ui/react";
import React from "react";
import Expenses from "./components/Expenses";
import ExpensesCreate from "./components/ExpensesCreate";
import { Route, Routes } from "react-router-dom";

function TablesGroup() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Expenses />} />
        <Route path="/create" element={<ExpensesCreate />} />
      </Routes>
    </>
  );
}
export default TablesGroup;
