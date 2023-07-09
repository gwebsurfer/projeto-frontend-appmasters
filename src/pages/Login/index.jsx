import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import App from "../../App";
import { auth } from "../../services/firebaseConfig";
import { Loader } from "../../components/Loader";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";

import "./styles.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  if (loading) return <Loader />

  if (user) return <App />

  return (
    <div className="container-login">
      <header className="header">
        <img src={logoImg} alt="AppMasters" className="logoImg" />
        <span>Please enter your login information.</span>
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

        <button className="button" onClick={handleSignIn}>
          Sign in <img src={arrowImg} alt="Arrow icon" />
        </button>
        <div className="footer">
          <p>Don&apos;t have an account?</p>
          <Link to="/register">Create your account here.</Link>
        </div>
      </form>
    </div>
  );
}