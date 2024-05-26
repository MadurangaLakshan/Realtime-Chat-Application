import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

const Message = ({ msg }) => {
  const { currentUser } = useContext(AuthContext);

  const ref = useRef();
  console.log(msg);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const getMessageTime = (timestamp) => {
    const date = timestamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    return formattedTime;
  };

  return (
    <div
      ref={ref}
      className={`message ${msg.senderId === currentUser.uid && "user"}`}
    >
      {!msg.img && (
        <div className="messagecontent">
          <p>{msg.text}</p>
          {!msg.img && <span>{getMessageTime(msg.date)}</span>}
        </div>
      )}
      <div className="attachments">
        {msg.img && (
          <>
            <img src={msg.img} alt="" />
            <br />
            <span>{getMessageTime(msg.date)}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
