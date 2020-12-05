import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../assets/images/target.svg";

const Header = ({ user }) => {
  const renderMarkup = user ? (
    <a href="/api/logout">{user.name}</a>
  ) : (
    <a href="/auth/google">Login with Google</a>
  );

  return (
    <nav>
      <div className="nav-wrapper deep-purple darken-1">
        <Link to={user ? "/posts" : "/"} className="brand-logo ml5">
          <img src={logo} />
        </Link>
        <ul className="right hide-on-med-and-down">
          <li>{renderMarkup}</li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
