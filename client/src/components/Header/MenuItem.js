import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const MenuItem = ({ title, icon, path, availability, role }) => {
  const itemMarkup = (checkRole) => {
    if (availability.includes(checkRole)) {
      return (
        <ListItem
          key={title}
          component={Link}
          to={path}
          style={{ color: "#fff", fontWeight: 600 }}
        >
          <ListItemIcon style={{ color: "#77DCFF" }}>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      );
    } else {
      return "";
    }
  };

  return itemMarkup(role);
};

MenuItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  path: PropTypes.string,
  availability: PropTypes.array,
  user: PropTypes.object,
  role: PropTypes.string,
};

export default MenuItem;
