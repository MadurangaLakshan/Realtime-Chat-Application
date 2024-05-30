import React, { useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import AllChats from "./AllChats";

const SideBar = () => {
  return (
    <div className="sidebar">
      <NavBar />
      <SearchBar />
      <AllChats />
    </div>
  );
};

export default SideBar;
