import Dashboard from "./views/Admin/Dashboard";
import Tables from './views/Admin/Tables';
import Teachers from './views/Admin/TablesTeacher';
import Groups from './views/Admin/TablesGroup';
import Session from "./views/Admin/TablesSession";
import Profile from "./views/Admin/Profile";
import Reclamation from './views/Admin/TablesReclamation';

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
} from "./components/Icons/Icons";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables/*",
    name: "Table Student",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/table/teacher/*",
    name: "Table Teacher",
    icon: <StatsIcon color="inherit" />,
    component: Teachers,
    layout: "/admin",
  },
  {
    path: "/table/group/*",
    name: "Table Group",
    icon: <StatsIcon color="inherit" />,
    component: Groups,
    layout: "/admin",
  },
  {
    path: "/table/session/*",
    name: "Table Session",
    icon: <StatsIcon color="inherit" />,
    component: Session,
    layout: "/admin",
  },
  {
    path: "/table/reclamation/*",
    name: "Table Reclamation",
    icon: <StatsIcon color="inherit" />,
    component: Reclamation,
    layout: "/admin",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
    ],
  },
  
  
];
export default dashRoutes;
