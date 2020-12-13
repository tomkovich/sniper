import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

export const MENU_ITEMS = [
  {
    availability: ["guest"],
    title: "Login",
    icon: <VpnKeyIcon />,
    path: "/login",
  },
  {
    availability: ["user", "admin"],
    title: "Account",
    icon: <PersonIcon />,
    path: "/account",
  },
  {
    availability: ["guest", "user"],
    title: "Recipes",
    icon: <FastfoodIcon />,
    path: "/posts",
  },
  {
    availability: ["user", "admin"],
    title: "Logout",
    icon: <ExitToAppIcon />,
    path: "/api/logout",
  },
];
