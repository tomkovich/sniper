import Axios from "axios";
import React from "react";

import Payments from "../Payments";

const UserInfo = ({ user }) => {
  const handleClick = async () => {
    const res = await Axios.post("/api/survey", {
      title: "meow",
      body: "Hey people",
      subject: "A new cat",
      recipients: "opa@mail.com",
    });
  };

  return (
    <>
      <Payments />
      <div className="credits-count ml15">
        Your Credits: <span>{user.credits}</span>
      </div>
      <a href="/api/logout">{user.name}</a>
      <button onClick={handleClick}>Send</button>
    </>
  );
};

export default UserInfo;
