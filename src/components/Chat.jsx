import React, { useContext } from "react";
import dots from "../assets/see_more.png";
import AllMessages from "./AllMessages";
import InputPanel from "./InputPanel";
import { ChatContext } from "../contexts/ChatContext";

const Chat = () => {
  const { data, dispatch } = useContext(ChatContext);

  const handleExitFullscreen = () => {
    dispatch({ type: "TOGGLE_FULLSCREEN", payload: false });
  };

  return (
    <div className={`chat ${data.isFullscreen ? "fullscreen" : ""}`}>
      <div className="chatInfo">
        {data.isFullscreen && (
          <button className="exitFullscreen" onClick={handleExitFullscreen}>
            Back
          </button>
        )}
        {data.user.photoURL && (
          <div className="info">
            <img src={data.user.photoURL} alt="" />
            <span style={{ textTransform: "capitalize" }}>
              {data.user.displayName}
            </span>
          </div>
        )}
        <div className="options">
          <img className="dots" src={dots} alt="" />
        </div>
      </div>
      <AllMessages />
      <InputPanel />
    </div>
  );
};

export default Chat;
