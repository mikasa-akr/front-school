import { Flex } from "@chakra-ui/react";
import React from "react";
import Groups from "./components/Groups";
import GroupView from "./components/GroupView";
import GroupUpdate from "./components/GroupUpdate";
import GroupCreate from "./components/GroupCreate";
import { Route, Routes } from "react-router-dom";

function Tables() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Groups />} />
        <Route path="/view/:id" element={<GroupView />} />
        <Route path="/update/:id" element={<GroupUpdate />} />
        <Route path="/create" element={<GroupCreate />} />
      </Routes>
    </>
  );
}
export default Tables;
