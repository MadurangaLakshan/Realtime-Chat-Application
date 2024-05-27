import React, { useState } from "react";
import regI from "../assets/registerphoto.png";
import "../styles/authStyle.css";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, database, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { FiUser } from "react-icons/fi";

const RegPage = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleReg = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const storageRef = ref(storage, userName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress tracking logic
        },
        (error) => {
          console.error("Upload error:", error);
          setError(true);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(userCredential.user, {
              displayName: userName,
              photoURL: downloadURL,
            });

            await setDoc(doc(database, "users", userCredential.user.uid), {
              uid: userCredential.user.uid,
              userName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(
              doc(database, "userChats", userCredential.user.uid),
              {}
            );

            setuserName("");
            setEmail("");
            setPassword("");
            setFile(null);
            setError(false);

            navigate("/");
          } catch (error) {
            console.error("Error updating user profile:", error);
            setError(true);
          }
        }
      );
    } catch (error) {
      console.error("Error creating user:", error);
      setError(true);
    }
  };

  return (
    <div className="overlay">
      <div className="head_image-container">
        <span className="heading">Innovate your chatting experience!</span>
        <img className="image" src={regI} alt="Registration" />
      </div>
      <div className="reg-form-container">
        <span className="appName">Chat Buddy</span>
        <span className="title">Register</span>
        <form onSubmit={handleReg}>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="file-upload" className="file-input-label">
            <input
              type="file"
              id="file-upload"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />

            <span className="file-input-icon">
              <FiUser className="profile-icon" /> Add profile picture
            </span>
          </label>

          <button className="create">Create</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p className="sign-in">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "blue" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegPage;
