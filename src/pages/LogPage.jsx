import React, { useState } from "react";
import LogI from "../assets/loginphoto.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/authStyle.css";
import { auth } from "../firebase";

const LogPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="overlay">
      <div className="head_image-container">
        <span className="heading">Let's pick up from where we left off</span>
        <img className="image" src={LogI} alt="login" />
      </div>
      <div className="log-form-container">
        <span className="appName">Chat Buddy</span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Log in</button>
          {error && <span>Username or Password incorrect</span>}
        </form>
        <p className="sign-in">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "blue" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogPage;
