import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { Button } from "./Button";
import logoImg from "../assets/logo.svg";
import icon from "../assets/icon.svg";
import avatar from "../assets/avatar.svg";
import './NavBar.css';

export const NavBar = ({ setIsUserLoggedIn }) => {

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const user = auth?.currentUser;

  const options = [
    { value: "favorites", label: "Favorites" },
    { value: "logout", label: "Logout" },
  ];

  const handleSelectChange = (selectedOption) => {
    if (selectedOption.value === "logout") {
      handleLogout();
    } else if (selectedOption.value === "favorites") {
      navigate('/favorites');
    }
  };

  console.log((auth?.currentUser?.uid));
  console.log(user);

  const handleLogout = async () => {
    try {
      console.log('logout')
      await signOut(auth);
      setIsUserLoggedIn(false);
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
        {user ? (
          <div className="user-info">
            <img src={avatar} alt="User Avatar" />
            <Select
              options={options}
              onChange={handleSelectChange}
              isSearchable={false}
              placeholder={user.email}
              styles={{
                container: (base) => ({
                  ...base,
                  fontSize: '0.8rem',
                  fontWeight: 300,
                }),
                option: (base, state) => ({
                  ...base,
                  color: state.isFocused ? 'rgba(246, 248, 251, 0.67)' : 'rgba(246, 248, 251, 0.87)',
                  backgroundColor: state.isFocused ? 'rgb(17, 21, 29)' : 'rgb(26, 31, 43)',
                  borderTop: '0.05rem solid rgba(246, 248, 251, 0.1)',
                  cursor: 'pointer',
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: '0.8rem',
                  color: 'rgba(246, 248, 251, 0.87)',
                  fontWeight: 300,
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'rgb(26, 31, 43)',
                  group: 'rgb(26, 31, 43)',
                  background: state.menuIsOpen ? 'rgb(26, 31, 43)' : '',
                  borderColor: state.isFocused ? 'grey' : '',
                  border: 'none',
                  cursor: 'pointer',
                }),
              }}
            />
          </div>
        ) : (
          <div className="login-area">
            <Button classType={'secondary-navbar-button'} onClickFunction={() => {navigate('/auth')}}>Login</Button>
            <Button classType={'primary-navbar-button'} onClickFunction={() => {navigate('/auth?signup=true')}}>Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  )
}