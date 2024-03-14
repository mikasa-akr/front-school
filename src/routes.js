import Dashboard from "./views/Admin/Dashboard/Dashboard";
import Tables from "./views/Admin/Dashboard/Tables";
import TablesTeacher from "./views/Admin/Dashboard/TablesTeacher";
import TablesGroup from "./views/Admin/Dashboard/TablesGroup";
import TablesSession from "./views/Admin/Dashboard/TablesSession";
import Profile from "./views/Admin/Dashboard/Profile";

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
    component: TablesTeacher,
    layout: "/admin",
  },
  {
    path: "/table/group/*",
    name: "Table Group",
    icon: <StatsIcon color="inherit" />,
    component: TablesGroup,
    layout: "/admin",
  },
  {
    path: "/table/session/*",
    name: "Table Session",
    icon: <StatsIcon color="inherit" />,
    component: TablesSession,
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
