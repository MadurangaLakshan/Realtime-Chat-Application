import React from "react";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import "../styles/home.css";

const HomePage = () => {
  return (
    <div className="home-overlay">
      <div className="chat-container">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default HomePage;
