import { Flex } from "@chakra-ui/react";
import React from "react";
import Sessions from "./components/Sessions";
import SessionView from "./components/SessionView";
import SessionUpdate from "./components/SessionUpdate";
import SessionCreate from "./components/SessionCreate";
import { Route, Routes } from "react-router-dom";

function TablesSession() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Sessions />} />
        <Route path="/view/:id" element={<SessionView />} />
        <Route path="/update/:id" element={<SessionUpdate />} />
        <Route path="/create" element={<SessionCreate />} />
      </Routes>
    </>
  );
}
export default TablesSession;
