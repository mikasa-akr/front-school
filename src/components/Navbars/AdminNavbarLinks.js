import React from "react";
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { BellIcon, SettingsIcon, CloseIcon } from "@chakra-ui/icons";
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
  const id = localStorage.getItem('id');

  const handleLogout = () => {
    axios.put(`/update_status/${id}`, { status: 'offline' })
    .then(response => {
        // Check if the response is successful
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("first_name");
          localStorage.removeItem("last_name");
        
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
        <MenuButton as={IconButton} icon={<ProfileIcon />} variant="ghost"/>
        <MenuList p="16px 8px">
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
        <MenuButton as={IconButton} icon={<BellIcon />} variant="ghost" />
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
