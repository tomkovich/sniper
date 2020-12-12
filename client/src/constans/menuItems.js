import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

export const MENU_ITEMS = [
  {
    availability: false,
    title: "Login",
    icon: <VpnKeyIcon />,
    path: "/login",
  },
  {
    availability: "user",
    title: "Account",
    icon: <PersonIcon />,
    path: "/account",
  },
  {
    availability: false,
    title: "Recipes",
    icon: <FastfoodIcon />,
    path: "/posts",
  },
  {
    availability: "user",
    title: "Logout",
    icon: <ExitToAppIcon />,
    path: "/api/logout",
  },
];
