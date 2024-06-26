import Dashboard from "./views/Student/Dashboard";
import Calendar from './views/Student/Calendar';
import Groups from './views/Student/Groups';
import Profile from "./views/Student/Profile";
import Facture from "./views/Student/Facture";

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  TeamIcon,
  CalendarIcon,
  ChatIcon
} from "./components/Icons/Icons.js";
import Annulation from "./views/Student/TablesAnnulation";
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
    path: "/facture",
    name: "Facture",
    icon: <DocumentIcon color="inherit" />,
    component: Facture,
    layout: "/student",
  },
  {
    path: "/liste/*",
    name: "Reclamation",
    icon: <StatsIcon color="inherit" />,
    component: Annulation,
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
