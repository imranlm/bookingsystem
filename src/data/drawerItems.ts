//import Authentication from 'components/icons/drawer/Authentication';
import Calendar from 'components/icons/drawer/Calendar';
import Car from 'components/icons/drawer/Car';
import Comment from 'components/icons/drawer/Comment';
import Doughnut from 'components/icons/drawer/Doughnut';
import Fencing from 'components/icons/drawer/Fencing';
import Grid from 'components/icons/drawer/Grid';
import NewBookingIcon from 'components/icons/drawer/NewBookingIcon';

import Settings from 'components/icons/drawer/Settings';
import ShoppingBag from 'components/icons/drawer/ShoppingBag';
import ShoppingCart from 'components/icons/drawer/ShoppingCart';
import SignOut from 'components/icons/drawer/SignOut';
import paths, { rootPaths } from 'routes/paths';
//import paths from 'routes/paths';
import { DrawerItem } from 'types/types';

export const drawerItems: DrawerItem[] = [
  {
    id: 1,
    icon: Grid,
    title: 'Dashboard',
    path: rootPaths.root,
    collapsible: false,
    active: true,
  },
  // {
  //   id: 2,
  //   icon: Authentication,
  //   title: 'Authentication',
  //   active: false,
  //   collapsible: true,
  //   subList: [
  //     { id: 21, title: 'Login', path: paths.login, active: false },
  //     { id: 22, title: 'Sign Up', path: paths.signup, active: false },
  //   ],
  // },

  {
    id: 3,
    icon: Doughnut,
    title: 'Assets',
    path: '#!',
    collapsible: false,
  },
  {
    id: 4,
    icon: NewBookingIcon,
    title: 'New Booking',
    path: paths.newbooking,
    collapsible: false,
  },
  {
    id: 5,
    icon: Car,
    title: 'View Bookings',
    path: paths.viewbookings,
    collapsible: false,
  },
  {
    id: 6,
    icon: ShoppingBag,
    title: 'Sell Cars',
    path: '#!',
    collapsible: false,
  },
  {
    id: 7,
    icon: ShoppingCart,
    title: 'Buy Cars',
    path: '#!',
    collapsible: false,
  },
  {
    id: 8,
    icon: Fencing,
    title: 'Services',
    path: '#!',
    collapsible: false,
  },
  {
    id: 9,
    icon: Calendar,
    title: 'Calender',
    path: '#!',
    collapsible: false,
  },
  {
    id: 10,
    icon: Comment,
    title: 'Messages',
    path: '#!',
    collapsible: false,
  },
  {
    id: 11,
    icon: Settings,
    title: 'Settings',
    path: '#!',
    active: true,
    collapsible: false,
  },
  {
    id: 12,
    icon: SignOut,
    title: 'Log out',
    path: paths.login,
    active: true,
    collapsible: false,
  },
];
