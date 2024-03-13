// SideBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarFooter } from 'cdbreact';
import { Collapse } from 'reactstrap';

function SideBarS() {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const id = localStorage.getItem('id'); // Assuming the token is stored in localStorage


  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };
  return (
    <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#ffffff', zIndex: 1000 }}>
      <CDBSidebar textColor="#11cdef" backgroundColor="#ffffff" style={{ height: '100%', overflowY: 'auto' }}>
        <CDBSidebarHeader prefix={<i className="fa" />}>EduHub ™</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenuItem icon="th-large" textFontSize="14px" textColor="#ffffff">
            <Link to="/student/" style={{ color: '#525f7f', textDecoration: 'none' }}>Dashboard</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="th-large" textFontSize="14px" textColor="#ffffff">
            <Link to={`/student/calendar/${id}`} style={{ color: '#525f7f', textDecoration: 'none' }}>Calendar</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="list" textFontSize="14px" textColor="#ffffff">
              <Link to={`/student/listeGroup/${id}`} style={{ color: '#525f7f', textDecoration: 'none' }}>List Group</Link>
          </CDBSidebarMenuItem>
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

export default SideBarS;
