import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import AllChats from "./AllChats";
import { ChatContext } from "../contexts/ChatContext";

const SideBar = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={`sidebar ${data.isFullscreen ? "" : "fullscreen"}`}>
      <NavBar />
      <SearchBar />
      <AllChats />
    </div>
  );
};

export default SideBar;
