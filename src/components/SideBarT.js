import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarFooter } from 'cdbreact';
import { Collapse } from 'reactstrap';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT token

function SideBarT() {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [teacher, setTeacher] = useState(null); // State to store teacher information

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
            <Link to="/teacher/" style={{ color: '#525f7f', textDecoration: 'none' }}>Dashboard</Link>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="calendar" textFontSize="14px" textColor="#ffffff">
            <Link to={`/teacher/calendar/${id}`} style={{ color: '#525f7f', textDecoration: 'none' }}>Calendar</Link>
          </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="list" textFontSize="14px" textColor="#ffffff">
              <Link to={`/teacher/listeGroup/${id}`} style={{ color: '#525f7f', textDecoration: 'none' }}>List Group</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="list" textFontSize="14px" textColor="#ffffff">
              <Link to={`/teacher/listeStudent/${id}`} style={{ color: '#525f7f', textDecoration: 'none' }}>List Student</Link>
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

export default SideBarT;
