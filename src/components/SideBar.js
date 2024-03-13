// SideBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarFooter } from 'cdbreact';
import { Collapse } from 'reactstrap';

function SideBar() {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#ffffff', zIndex: 1000 }}>
      <CDBSidebar textColor="#11cdef" backgroundColor="#ffffff" style={{ height: '100%', overflowY: 'auto' }}>
        <CDBSidebarHeader prefix={<i className="fa" />}>EduHub ™</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenuItem icon="th-large" textFontSize="14px" textColor="#ffffff">
            <Link to="/crud/" style={{ color: '#525f7f', textDecoration: 'none' }}>Dashboard</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="th"
            textFontSize="14px"
            textColor=""
            onClick={toggleCollapse}
          >
            <span style={{ color: '#525f7f' }}>Table</span>
            <i className={`fa fa-angle-${collapseOpen ? 'up' : 'down'}`} style={{ float: 'right', marginRight: '10px' }} />
          </CDBSidebarMenuItem>
          <Collapse isOpen={collapseOpen}>
          <CDBSidebarMenuItem icon="user-plus" textFontSize="14px">
              <Link to="/crud/admin/" style={{ color: '#525f7f', textDecoration: 'none' }}>CRUD Admin</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="user-plus" textFontSize="14px" textColor="#525f7f">
              <Link to="/crud/student/" style={{ color: '#525f7f', textDecoration: 'none' }}>CRUD Student</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="user-plus" textFontSize="14px" textColor="#525f7f">
              <Link to="/crud/teacher/" style={{ color: '#525f7f', textDecoration: 'none' }}>CRUD Teacher</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" textFontSize="14px" textColor="">
              <Link to="/crud/forfait/" style={{ color: '#525f7f', textDecoration: 'none' }}>CRUD Forfait</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" textFontSize="14px" textColor="#ffffff">
            <Link to="/crud/session/" style={{ color: '#525f7f', textDecoration: 'none' }}>CRUD Session</Link>
            </CDBSidebarMenuItem> 
            <CDBSidebarMenuItem icon="th-large" textFontSize="14px" textColor="#ffffff">
            <Link to="/crud/group/" style={{ color: '#525f7f', textDecoration: 'none' }}>CRUD Group</Link>
            </CDBSidebarMenuItem>     
            </Collapse>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div>
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideBar;
