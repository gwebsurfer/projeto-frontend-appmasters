import { useState } from "react";
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../services/firebaseConfig";
import { Loader } from "../../components/Loader";
import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";

import "./styles.css";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, signInLoading] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, signUpLoading] = useCreateUserWithEmailAndPassword(auth);

  async function handleSignIn(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
    navigate("/");
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const savedUser = await createUserWithEmailAndPassword(email, password);
    console.log(savedUser);
    navigate("/");
  }

  const handleToggleForm = () => {
    setIsSignUp(prevState => !prevState);
  };

  const loading = signInLoading || signUpLoading;

  if (loading) return <Loader />;

  return (
    <div className="container-auth">
      <header className="header">
        <img src={logoImg} alt="AppMasters" className="logoImg" />
        <span>{isSignUp ? 'Please enter your registration information.' : 'Please enter your login information.'}</span>
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

        <button className="button" onClick={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp ? 'Sign up' : 'Sign in'} <img src={arrowImg} alt="Arrow icon" />
        </button>
        <div className="footer">
          <p>{isSignUp ? 'Do you already have an account?' : "Don't have an account?"}</p>
          <Link to="/auth" onClick={handleToggleForm}>
            {isSignUp ? 'Access your account here.' : 'Create your account here.'}
          </Link>
        </div>
      </form>
    </div>
  );
}
