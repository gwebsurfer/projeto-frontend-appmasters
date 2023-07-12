import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";
import { Button } from "./Button";
import logoImg from "../assets/logo.svg";
import icon from "../assets/icon.svg";
import './NavBar.css';

export const NavBar = () => {

  console.log(auth?.currentUser?.uid);

  const handleLogout = async () => {
    try {
      console.log('logout')
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logoImg} alt="logo" />
      </div>
      <div className="logo-mobile">
        <img src={icon} alt="icon" />
      </div>
      <div>
        <Button onClickFunction={handleLogout}>Log out</Button>
      </div>
    </div>
  )
}