import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="appName">Chat Buddy</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span style={{ textTransform: "capitalize" }}>
          {currentUser.displayName}
        </span>
        <button onClick={() => signOut(auth)}>LogOut</button>
      </div>
    </div>
  );
};

export default NavBar;
