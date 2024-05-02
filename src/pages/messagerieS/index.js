import React, { useState } from 'react';
import TeacherMessagesPage from './components/TeacherMessagesPage.js';
import Sidebar from './components/Sidebar.js';
import { ChakraProvider, Flex, Portal, useDisclosure } from '@chakra-ui/react';
import AdminNavbar from '../../components/Navbars/AdminNavbar.js';
import routes from '../../routesT.js';
import MainPanel from '../../components/Layout/MainPanel.js';
import theme from '../../theme/theme.js';

export default function Dashboard(props) {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatInfo, setSelectedChatInfo] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ...rest } = props;

  const handleChatSelect = (chatId, chatName, chatAvatar) => {
    setSelectedChatId(chatId);
    setSelectedChatInfo({ name: chatName, avatar: chatAvatar });
  };

  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };

  return (
    <>
      <ChakraProvider theme={theme} resetCss={false}>
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText="EDU SCHOOL"
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            {...rest}
          />
        </Portal>
        <MainPanel w={{xl: 'calc(100% - 275px)' }}>
          <Flex mt={'5.8%'}>
            <Sidebar onSelectChat={handleChatSelect} />
            <TeacherMessagesPage selectedChatId={selectedChatId} selectedChatInfo={selectedChatInfo} />          
          </Flex>
        </MainPanel>
      </ChakraProvider>
    </>
  );
}
