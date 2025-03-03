// Login.js
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
// import SignInwithGoogle from "./SignInWithGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      window.location.href = "/app";
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Welcome to Econote</h1>
      <h4 className="form-title">Login</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
      <p className="form-text">
        New user? <a href="/register" className="form-link">Register here</a>
      </p>
      {/* <SignInwithGoogle /> */}
    </div>
  );
}

export default Login;
