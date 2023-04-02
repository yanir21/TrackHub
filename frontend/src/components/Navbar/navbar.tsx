import React from "react";
import DisplayUser from "../DisplayUser/displayUser";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <DisplayUser displayName={"Ohad Shen Men"} />
      </div>
      <span className="navbar-center site-name">TrackHub</span>
    </div>
  );
};

export default Navbar;
