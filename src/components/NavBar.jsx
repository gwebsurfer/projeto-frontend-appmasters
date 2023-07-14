import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { Button } from "./Button";
import logoImg from "../assets/logo.svg";
import icon from "../assets/icon.svg";
import avatar from "../assets/avatar.svg";
import downArrow from "../assets/down-arrow.svg";
import './NavBar.css';

export const NavBar = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const user = auth?.currentUser;

  console.log(auth?.currentUser?.uid);

  const handleLogout = async () => {
    try {
      console.log('logout')
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logoImg} alt="logo" />
      </div>
      <div className="logo-mobile">
        <img src={icon} alt="icon" />
      </div>
      <div className="dropdown">
        {user ? (
          <div className="user-info" onClick={toggleDropdown}>
            <img src={avatar} alt="User Avatar" />
            <span>{user?.email}</span>
            <img src={downArrow} alt="Dropdown Arrow" />
            {dropdownOpen && (
              <ul className="dropdown-menu" onClick={handleDropdownClick}>
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div>
            <Button><Link to="/auth?signup=true">Sign Up</Link></Button>
            <Button><Link to="/auth">Login</Link></Button>
          </div>
        )}
      </div>
    </div>
  )
}