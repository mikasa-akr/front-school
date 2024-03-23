import Dashboard from "./views/Teacher/Dashboard";
import Calendar from './views/Teacher/Calendar';
import Groups from './views/Teacher/Groups';
import Students from "./views/Teacher/Students";
import Profile from "./views/Teacher/Profile ";
import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  TeamIcon,
} from "./components/Icons/Icons.js";
import { CalendarIcon } from '@chakra-ui/icons'; // Importing the schedule icon from react-icons
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
    icon: <CalendarIcon boxSize={3.5} color="inherit" />,
    component: Calendar,
    layout: "/teacher",
  },
  {
    path: "/groups",
    name: "Groups",
    icon: <TeamIcon color="inherit" />,
    component: Groups,
    layout: "/teacher",
  },
  {
    path: "/students",
    name: "Students",
    icon: <TeamIcon color="inherit" />,
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
