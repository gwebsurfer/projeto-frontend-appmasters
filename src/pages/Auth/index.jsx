import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from "firebase/auth";

import arrowImg from "../../assets/arrow.svg";
import logoImg from "../../assets/logo.svg";

import "./styles.css";

export function Auth() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSignupParam = queryParams.get('signup');
  const isSignupDefault = isSignupParam === 'true';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(isSignupDefault);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState('');

  const auth = getAuth();

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/projeto-frontend-appmasters');
    } catch (err) {
      switch(err.code) {
        case 'auth/user-not-found':
          setError('No account found with this e-mail.');
          setErrorField('email');
          break;
        case 'auth/wrong-password':
          setError('Invalid password.');
          setErrorField('password');
          break;
        default:
          setError('An error occurred during sign in.');
          setErrorField('default');
          break;
      }
    }
  }
  
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/projeto-frontend-appmasters');
    } catch (err) {
      switch(err.code) {
        case 'auth/invalid-email':
          setError('Invalid e-mail address.');
          setErrorField('email');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters long.');
          setErrorField('password');
          break;
        default:
          setError('An error occurred during sign up.');
          setErrorField('default');
          break;
      }
    }
  }  

  const handleToggleForm = () => {
    setIsSignUp(prevState => !prevState);
    setError('');
  };

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
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorField('');
          }}
          style={{ borderColor: errorField === 'email' || errorField === 'default' ? 'rgb(255, 75, 75)' : '' }}
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorField('');
          }}
          style={{ borderColor: errorField === 'password' || errorField === 'default' ? 'rgb(255, 75, 75)' : '' }}
        />
      </div>

        {error && <span className="auth-error">{error}</span>}

        <button className="button" onClick={isSignUp ? (e) => handleSignUp(e) : (e) => handleSignIn(e)}>
          {isSignUp ? 'Sign up' : 'Sign in'} <img src={arrowImg} alt="Arrow icon" />
        </button>
        <div className="footer">
          <p>{isSignUp ? 'Do you already have an account?' : "Don't have an account?"}</p>
          <Link to="#" onClick={handleToggleForm}>
            {isSignUp ? 'Access your account here.' : 'Create your account here.'}
          </Link>
        </div>
      </form>
    </div>
  );
}
