import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../contexts/ChatContext";
import { database } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(database, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatID]);

  console.log(messages);

  return (
    <div className="allmessages">
      {messages.map((msg) => (
        <Message msg={msg} key={msg.id} />
      ))}
    </div>
  );
};

export default AllMessages;
