import React from "react";

import Payments from "../Payments";

const Account = ({ user }) => {
  return (
    <>
      <Payments />
      <div className="credits-count ml15">
        Your Credits: <span>{user.credits}</span>
      </div>
      <a href="/api/logout">{user.name}</a>
    </>
  );
};

export default Account;
