import Dashboard from "./views/Teacher/Dashboard ";
import Calendar from './views/Teacher/Calendar';
import Groups from './views/Teacher/Groups';
import Students from "./views/Teacher/Students";
import Profile from "./views/Teacher/Profile ";
import Annulation from "./views/Teacher/Annulation";
import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
} from "./components/Icons/Icons.js";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/teacher",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: <StatsIcon color="inherit" />,
    component: Calendar,
    layout: "/teacher",
  },
  {
    path: "/annulation",
    name: "Annulation",
    icon: <StatsIcon color="inherit" />,
    component: Annulation,
    layout: "/teacher",
  },
  {
    path: "/groups",
    name: "Groups",
    icon: <StatsIcon color="inherit" />,
    component: Groups,
    layout: "/teacher",
  },
  {
    path: "/students",
    name: "Students",
    icon: <StatsIcon color="inherit" />,
    component: Students,
    layout: "/teacher",
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
        layout: "/teacher",
      },
    ],
  },
  
  
];
export default dashRoutes;
