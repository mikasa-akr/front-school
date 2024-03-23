import Dashboard from "./views/Student/Dashboard";
import Calendar from './views/Student/Calendar';
import Groups from './views/Student/Groups';
import Profile from "./views/Student/Profile";
import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  TeamIcon,
  CalendarIcon
} from "./components/Icons/Icons.js";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/student",
  },
  {
    path: "/groups",
    name: "Groups",
    icon: <TeamIcon color="inherit" />,
    component: Groups,
    layout: "/student",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: <CalendarIcon color="inherit" />,
    component: Calendar,
    layout: "/student",
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
        layout: "/student",
      },
    ],
  },
  
  
];
export default dashRoutes;
