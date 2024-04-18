import React from "react";
import {
  Button,
  Flex,
  IconButton,
  Menu,
  Avatar,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BellIcon, SettingsIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { ProfileIcon } from "../Icons/Icons";
import SidebarResponsive from "../Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import routes from "../../routes.js";
import axios from "axios";

export default function HeaderLinks(props) {
  const { secondary, onOpen } = props;

  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const id = localStorage.getItem('id');
  const avatar = localStorage.getItem('avatar');

  const handleLogout = () => {
    axios.put(`/update_status/${id}`, { status: 'offline' })
    .then(response => {
        // Check if the response is successful
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("first_name");
          localStorage.removeItem("last_name");
          localStorage.removeItem("avatar");

        
            // Navigate to login page
            navigate("/login");
        } else {
            throw new Error('Failed to update status');
        }
    })
    .catch(error => {
        console.error("Error updating status:", error);
        // Handle error (e.g., display an error message to the user)
    });
};

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <Menu>
      <MenuButton as={Avatar} src={require(`../../assets/${avatar}`)} style={{ maxWidth: "50px", height: "auto", marginRight: "10px" }} alt="avatar" />        <MenuList p="16px 8px">
          <MenuItem onClick={handleLogout} icon={<CloseIcon />}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        {...props}
      />
      <Menu>
        <MenuButton as={IconButton} icon={<BellIcon />} variant="ghost" fontSize="xl" />
      </Menu>
      <Flex ml="8px">
        <IconButton
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          variant="ghost"
          fontSize="xl"
          onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
