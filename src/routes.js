import Dashboard from "./views/Admin/Dashboard";
import Tables from './views/Admin/Tables';
import Teachers from './views/Admin/TablesTeacher';
import Groups from './views/Admin/TablesGroup';
import Session from "./views/Admin/Calendar";
import Profile from "./views/Admin/Profile";
import Reclamation from './views/Admin/TablesReclamation';
import Rattrapages from "./views/Admin/TablesRattrapage";
import Forfaits from "./views/Admin/TablesForfait";
import Expenses from "./views/Admin/TablesExpenses";

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
} from "./components/Icons/Icons";
import { CalendarIcon } from '@chakra-ui/icons';
import Facture from "./views/Admin/Factures";
import FactureTeacher from "./views/Admin/Factures/components/TeacherFacture";

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
    name: "Calendar",
    icon: <CalendarIcon boxSize={3.5} color="inherit" />,
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
    path: "/table/rattrapage/*",
    name: "Table Rattrapage",
    icon: <StatsIcon color="inherit" />,
    component: Rattrapages,
    layout: "/admin",
  },
  {
    path: "/table/forfait/*",
    name: "Table Forfait",
    icon: <StatsIcon color="inherit" />,
    component: Forfaits,
    layout: "/admin",
  },
  {
    path: "/table/expenses/*",
    name: "Table Expenses",
    icon: <StatsIcon color="inherit" />,
    component: Expenses,
    layout: "/admin",
  },
  {
    path: "/facture/*",
    name: "Facture",
    icon: <StatsIcon color="inherit" />,
    component: Facture,
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
