import { useContext } from "react";
import dots from "../assets/see_more.png";
import AllMessages from "./AllMessages";
import InputPanel from "./InputPanel";
import { ChatContext } from "../contexts/ChatContext";

const chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
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

export default chat;
