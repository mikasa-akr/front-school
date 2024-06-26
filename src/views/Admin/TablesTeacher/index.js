import { Flex } from "@chakra-ui/react";
import React from "react";
import Teachers from "./components/Teachers";
import TeacherView from "./components/TeacherView";
import TeacherUpdate from "./components/TeacherUpdate";
import { Route, Routes } from "react-router-dom";

function TablesTeacher() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Teachers />} />
        <Route path="/view/:id" element={<TeacherView />} />
        <Route path="/update/:id" element={<TeacherUpdate />} />
      </Routes>
    </>
  );
}

export default TablesTeacher;
