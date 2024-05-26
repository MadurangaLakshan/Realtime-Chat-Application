import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { database } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";

const Searchbar = () => {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const Search = async () => {
    console.log("pressed enter");
    const q = query(
      collection(database, "users"),
      where("userName", "==", username)
    );

    try {
      console.log("trying");
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("its emptyy");
      }

      console.log("awaiting");
      querySnapshot.forEach((doc) => {
        console.log("bruh");
        console.log(doc);
        console.log("setting the user");
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const keyPressed = (e) => {
    e.code === "Enter" && Search();
  };

  const handleChat = async () => {
    console.log("entered handlechat");
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(database, "chats", combinedID));
      console.log("created chats");

      if (!res.exists()) {
        await setDoc(doc(database, "chats", combinedID), { messages: [] });
        console.log("messages array");
        console.log(user);
        console.log(user.uid);
        console.log(user.userName);
        // console.log(user.photoURL);

        console.log(currentUser);
        console.log(currentUser.uid);
        console.log(currentUser.displayName);
        // console.log(currentUser.photoURL);
        await updateDoc(doc(database, "userChats", currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.userName,
            photoURL: user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(database, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setUser(null);
    setUserName("");
  };

  return (
    <div className="searchbar">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find a user"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={keyPressed}
          value={username}
        />
      </div>
      {error && <span>User not found</span>}
      {user && (
        <div className="userList" onClick={handleChat}>
          <img src={user.photoURL} />
          <div className="userInfo">
            <span style={{ textTransform: "capitalize" }}>{user.userName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
