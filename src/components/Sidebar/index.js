import {
  Box,
  Switch,
  Text,
  useColorMode,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SidebarContent from "./SidebarContent";

function Sidebar(props) {
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  const { colorMode, toggleColorMode } = useColorMode();
  const [switched, setSwitched] = useState(props.isChecked);
  const bgColor = useColorModeValue("gray.10", "gray.700");

  const { logoText, routes, sidebarVariant } = props;

  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  let BG = useColorModeValue("white", "gray.700");
  if (sidebarVariant === "opaque") {
    sidebarBg = BG;
    sidebarRadius = "16px";
    sidebarMargins = "16px 0px 16px 16px";
  }

  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)" // Adjust height if needed
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
          // Add overflow: auto to allow scrolling
          overflowY="auto"
        >
          <SidebarContent routes={routes} logoText={"EDU SCHOOL"} display="none" sidebarVariant={sidebarVariant} />

        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
