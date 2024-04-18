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
import routes from '../routesS.js';
import Groups from '../views/Student/Groups/index.js';
import Calendar from '../views/Student/Calendar/index.js';
import Profile from '../views/Student/Profile/index.js';
import Dashboard from '../views/Student/Dashboard/index.js';
import Facture from '../views/Student/Facture/index.js';
import Annulations from '../views/Student/TablesAnnulation/index.js';

function Student(props) {
  const { ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getRoute = () => {
    return window.location.pathname !== '/student/full-screen-maps';
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
      if (prop.layout === '/student') {
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/facture" element={<Facture />} />
                <Route path="/liste/*" element={<Annulations />} />

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

export default Student;
