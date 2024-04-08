import React from 'react';
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/index.js';
import AdminNavbar from '../components/Navbars/AdminNavbar.js';
import MainPanel from '../components/Layout/MainPanel.js';
import PanelContainer from '../components/Layout/PanelContainer.js';
import PanelContent from '../components/Layout/PanelContent.js';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin.js';
import theme from '../theme/theme.js';
import routes from '../routesT.js';
import Groups from '../views/Teacher/Groups/index.js';
import Calendar from '../views/Teacher/Calendar/index.js';
import Students from '../views/Teacher/Students/index.js';
import Profile from '../views/Teacher/Profile /index.js';
import Dashboard from '../views/Teacher/Dashboard/index.js';
import Facture from '../views/Teacher/Facture/index.js';

function Teacher(props) {
  const { ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getRoute = () => {
    return window.location.pathname !== '/teacher/full-screen-maps';
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

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {

        return getRoutes(prop.views);
      }
      if (prop.category === 'account') {

        return getRoutes(prop.views);
      }
      if (prop.layout === '/teacher') {
        return (
          <Route key={key} path={prop.layout + prop.path} element={<prop.component />} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={routes}
        logoText="EDU SCHOOL"
        display="none"
        {...rest}
      />
      <MainPanel w={{ base: '100%', xl: 'calc(100% - 275px)' }}>
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText="EDU SCHOOL"
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Routes>
                {getRoutes(routes)}
                <Route path="/groups" element={<Groups />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/students" element={<Students />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/facture" element={<Facture />} />
                </Routes>              
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Portal>
        </Portal>
      </MainPanel>
    </ChakraProvider>

    </>
  );
}

export default Teacher;
