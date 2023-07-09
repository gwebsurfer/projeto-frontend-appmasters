import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { auth } from "../../services/firebaseConfig";
import { Loader } from "../../components/Loader";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";

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

  if (loading) return <Loader />

  return (
    <div className="container-register">
      <header className="header">
        <img src={logoImg} alt="AppMasters" className="logoImg" />
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
            placeholder="************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSignUp} className="button">
          Sign up <img src={arrowImg} alt="Arrow icon" />
        </button>
        <div className="footer">
          <p>Do you already have an account?</p>
          <Link to="/auth">Access your account here.</Link>
        </div>
      </form>
    </div>
  );
}