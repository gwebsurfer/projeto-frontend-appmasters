import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../services/firebaseConfig";
import { Loader } from "../../components/Loader";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";

import "./styles.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, loading] =
    useSignInWithEmailAndPassword(auth);

  async function handleSignIn(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
    navigate("/");
  }

  if (loading) return <Loader />

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