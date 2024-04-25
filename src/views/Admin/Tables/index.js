import { Flex } from "@chakra-ui/react";
import React from "react";
import Students from "../Tables/components/Students";
import StudentView from "../Tables/components/StudentView";
import StudentUpdate from "../Tables/components/StudentUpdate";
import { Route, Routes } from "react-router-dom";

function Tables() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Students />} />
        <Route path="/view/:id" element={<StudentView />} />
        <Route path="/update/:id" element={<StudentUpdate />} />
      </Routes>
    </>
  );
}

export default Tables;
