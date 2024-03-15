import React from 'react';
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
import Configurator from '../components/Configurator/Configurator';
import theme from '../theme/theme';
import routes from '../routes';
import Tables from '../views/Admin/Dashboard/Tables';
import Teachers from '../views/Admin/Dashboard/TablesTeacher/components/Teachers';
import Groups from '../views/Admin/Dashboard/TablesGroup/components/Groups.js';

function Dashboard(props) {
  const { ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
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
      if (prop.layout === '/admin') {
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
                <Route path="/tables/*" element={<Tables />} />
                </Routes>              
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Portal>
          <FixedPlugin secondary={getActiveNavbar(routes)} onOpen={onOpen} />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
        />
      </MainPanel>
    </ChakraProvider>

    </>
  );
}

export default Dashboard;
