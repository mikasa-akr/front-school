import Dashboard from "./views/Student/Dashboard /index.js";
import Calendar from './views/Student/Calendar/index.js';
import Groups from './views/Student/Groups/index.js';
import Profile from "./views/Student/Profile/index.js";
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
    layout: "/student",
  },
  {
    path: "/groups",
    name: "Groups",
    icon: <StatsIcon color="inherit" />,
    component: Groups,
    layout: "/student",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: <StatsIcon color="inherit" />,
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
