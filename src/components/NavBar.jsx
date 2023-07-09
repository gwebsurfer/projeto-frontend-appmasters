import logoImg from "../assets/logo.svg";
import icon from "../assets/icon.svg";
import searchIcon from "../assets/search.svg";

import './NavBar.css';

export const NavBar = ({ setSearchTerm, setSelectedGenre }) => {

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    setSelectedGenre('All');
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logoImg} alt="logo" />
      </div>
      <div className="logo-mobile">
        <img src={icon} alt="icon" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder='Search by game title' onChange={handleSearchChange} />
        <img className='search-icon' src={searchIcon} alt="" />
      </div>
    </div>
  )
}