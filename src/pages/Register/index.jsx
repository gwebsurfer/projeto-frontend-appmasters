import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";
import { auth } from "../../services/firebaseConfig";

import "./styles.css";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword, loading] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSignUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  }

  if (loading) {
    return <p>carregando...</p>;
  }
  return (
    <div className="container">
      <header className="header">
        <img src={logoImg} alt="Workflow" className="logoImg" />
        <span>Please enter your registration information.</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="ellie@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSignUp} className="button">
          Sign up <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p>Do you already have an account?</p>
          <Link to="/">Access your account here.</Link>
        </div>
      </form>
    </div>
  );
}