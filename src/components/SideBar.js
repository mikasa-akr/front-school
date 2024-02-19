import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarFooter,
} from 'cdbreact';
import { Collapse } from 'reactstrap';

function SideBar() {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <CDBSidebar textColor="#ffffff" backgroundColor="#108a00" style={{ height: '100vh' }}>
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>School ™</CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenuItem icon="th-large" textFontSize="14px" textColor="#ffffff">
          <Link to="/crud/" style={{ color: '#ffffff', textDecoration: 'none' }}>Dashboard</Link>
        </CDBSidebarMenuItem>
        <CDBSidebarMenuItem
          icon="th"
          textFontSize="14px"
          textColor="#ffffff"
          onClick={toggleCollapse}
        >
          <span style={{ color: '#ffffff' }}>Table</span>
          <i className={`fa fa-angle-${collapseOpen ? 'up' : 'down'}`} style={{ float: 'right', marginRight: '10px' }} />
        </CDBSidebarMenuItem>
        <Collapse isOpen={collapseOpen}>
          <CDBSidebarMenuItem icon="user-plus" textFontSize="14px" textColor="#ffffff">
            <Link to="/crud/admin/" style={{ color: '#ffffff', textDecoration: 'none' }}>CRUD admin</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="user-plus" textFontSize="14px" textColor="#ffffff">
            <Link to="/crud/student/" style={{ color: '#ffffff', textDecoration: 'none' }}>CRUD Student</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="user-plus" textFontSize="14px" textColor="#ffffff">
            <Link to="/crud/teacher/" style={{ color: '#ffffff', textDecoration: 'none' }}>CRUD Teacher</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note" textFontSize="14px" textColor="#ffffff">
            <Link to="/crud/forfait/" style={{ color: '#ffffff', textDecoration: 'none' }}>CRUD Forfait</Link>
          </CDBSidebarMenuItem>
        </Collapse>
      </CDBSidebarContent>
      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div>
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
}

export default SideBar;
