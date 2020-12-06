import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../assets/images/target.svg";
import Account from "./Account";

const Header = ({ user }) => {
  const renderMarkup = user ? (
    <Account user={user} />
  ) : (
    <a href="/auth/google">Login with Google</a>
  );

  return (
    <nav>
      <div className="nav-wrapper deep-purple darken-1">
        <Link to={user ? "/posts" : "/"} className="brand-logo ml15">
          <img src={logo} />
        </Link>
        <ul className="right hide-on-med-and-down">
          <li className="payments-component">{renderMarkup}</li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
