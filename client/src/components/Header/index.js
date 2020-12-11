import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../assets/images/target.svg";
import { COLORS } from "../../styles/colors";
import Account from "./Account";

// Material UI Components
import { Link as LinkGoogle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { MENU_ITEMS } from "../../constans/menuItems";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    backgroundColor: COLORS.MAIN,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logo: {
    width: 50,
    maxHeight: "100%",
    marginRight: 20,
  },
  googleLink: {
    textDecoration: "none",
    fontSize: 13,
    "&:hover": {
      textDecoration: "none",
      color: "#f1f1f1",
    },
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();

  const renderMarkup = user ? (
    <Account user={user} />
  ) : (
    <LinkGoogle
      href="/auth/google"
      color="inherit"
      className={classes.googleLink}
    >
      Login with Google
    </LinkGoogle>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <div className={classes.logo}>
            <img src={logo} />
          </div>
          <Typography variant="h6" noWrap>
            {renderMarkup}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <List component="div">
          {MENU_ITEMS.map(({ title, icon }) => (
            <ListItem key={title} component={title === "logout" ? "a" : Link}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
