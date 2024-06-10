import React,{useState,useEffect} from "react";
import {
  Button,
  Flex,
  IconButton,
  Menu,
  Avatar,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { BellIcon, SettingsIcon, CloseIcon, SunIcon, MoonIcon,ChatIcon } from "@chakra-ui/icons";
import { ProfileIcon } from "../Icons/Icons";
import SidebarResponsive from "../Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import routes from "../../routes.js";
import axios from "axios";

export default function HeaderLinks(props) {
  const { secondary, onOpen } = props;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const id = localStorage.getItem('id');
  const avatar = localStorage.getItem('avatar');
  const first = localStorage.getItem('first_name');
  const last = localStorage.getItem('last_name');
  const roles = localStorage.getItem('roles');
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    if (roles === 'ROLE_TEACHER') {
    axios.put(`/teacher/update_status/${id}`, { status: 'offline' })
    .then(response => {
        // Check if the response is successful
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("first_name");
          localStorage.removeItem("last_name");
          localStorage.removeItem("avatar");
          localStorage.removeItem("roles");

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
  }else{
    axios.put(`/student/update_status/${id}`, { status: 'offline' })
    .then(response => {
        // Check if the response is successful
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("first_name");
          localStorage.removeItem("last_name");
          localStorage.removeItem("avatar");
          localStorage.removeItem("roles");

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
  }
  };

  const navigateToProfile = () => {
    if (roles === 'ROLE_STUDENT') {
      navigate("/student/profile");
    } else if (roles === 'ROLE_TEACHER') {
      navigate("/teacher/profile");
    }
    else if (roles === 'ROLE_ADMIN') {
      navigate("/admin/dashboard");
    }
  };

  const navigateToChat = () => {
    if (roles === 'ROLE_STUDENT') {
      navigate("/chat/student");
    } else if (roles === 'ROLE_TEACHER') {
      navigate("/chat/teacher");
    }
    else if (roles === 'ROLE_ADMIN') {
      navigate("/chat/admin");
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (roles === 'ROLE_TEACHER') {
          const response = await axios.get(`/notification/teacher/${id}`);
          setNotifications(response.data);
        } else {
          const response = await axios.get(`/notification/student/${id}`);
          setNotifications(response.data);
        }        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <Menu>
        <MenuButton as={Avatar} src={require(`../../assets/${avatar}`)} style={{ maxWidth: "50px", height: "auto", marginRight: "10px" }} alt="avatar" />
        <MenuList p="20px 8px">
        <MenuItem onClick={navigateToProfile} display="flex" alignItems="center">
  <Avatar
    src={require(`../../assets/${avatar}`)}
    style={{ maxWidth: "40px", height: "auto", marginRight: "10px" }}
    alt="avatar"
  />
  <Text mt={4} fontSize="lg">{first} {last}</Text>
</MenuItem>
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
<Flex ml="8px">
  <Menu>
    <MenuButton as={IconButton} icon={<BellIcon />} variant="ghost" fontSize="3xl" />
    <MenuList p="20px 8px" overflowY="auto" maxHeight="500px">
      <Text fontWeight='bold'>Notifications</Text>
      <Divider />
      {notifications.map((notification) => {
        const notificationTime = new Date(notification.time);
        const currentTime = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentTime - notificationTime;

        // Convert milliseconds to hours
        const timeDifferenceInHours = Math.floor(timeDifference / (1000 * 60 * 60));

        // If the time difference is less than 24 hours, display in hours
        if (timeDifferenceInHours < 24) {
          return (
            <MenuItem key={notification.id}>
              {notification.content}
              <br />
              {timeDifferenceInHours}h
            </MenuItem>
          );
        } else {
          // Calculate the time difference in days
          const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
          return (
            <MenuItem key={notification.id}>
              {notification.content}
              <br />
              {timeDifferenceInDays} day{timeDifferenceInDays > 1 ? 's' : ''} ago
            </MenuItem>
          );
        }
      })}
    </MenuList>
  </Menu>
</Flex>


      <Flex ml="8px">
        <IconButton icon={<ChatIcon />} variant="ghost" fontSize="2xl" onClick={navigateToChat} />
      </Flex>

      <Flex ml="8px">
        <IconButton
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          variant="ghost"
          fontSize="3xl"
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
