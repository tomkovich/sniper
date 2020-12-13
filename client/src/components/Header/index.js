import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../../assets/images/cookie.svg";
import UserInfo from "./UserInfo";
import MenuItem from "./MenuItem";

// Material UI Components
import { Link as LinkGoogle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { MENU_ITEMS } from "../../constans/menuItems";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 40,
  },
  appBar: {
    width: `calc(100% - ${theme.sidebarWidth})`,
    backgroundColor: "transparent",
    position: "relative",
    marginRight: 0,
    boxShadow: "none",
    paddingTop: 10,
  },
  drawer: {
    width: theme.sidebarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.sidebarWidth,
    backgroundColor: theme.colors.sidebar,
  },
  toolbar: {
    minHeight: 20,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logo: {
    width: 50,
    margin: "10px auto 0 auto",
  },
  googleLink: {
    textDecoration: "none",
    fontSize: 13,
    color: "#333",
    "&:hover": {
      textDecoration: "none",
      color: "#e6e6e6",
    },
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();

  const renderMarkup = user ? (
    <UserInfo user={user} />
  ) : (
    <LinkGoogle
      href="/auth/google"
      color="inherit"
      className={classes.googleLink}
    >
      <Button variant="contained" color="secondary">
        Login with Google
      </Button>
    </LinkGoogle>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>{renderMarkup}</Toolbar>
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
        <div className={classes.logo}>
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        <Typography
          variant="body2"
          style={{ margin: "10px auto 20px auto", color: "#bbbbbb" }}
        >
          Cook with us!
        </Typography>
        <List component="div">
          {MENU_ITEMS.map(({ role, ...rest }, i) => (
            <MenuItem key={i} {...rest} role={!user ? "guest" : user.role} />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
