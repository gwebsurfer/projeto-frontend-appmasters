import { Button } from "./Button";
import searchIcon from "../assets/search.svg";

export const SearchFilter = ({ setSearchTerm, setSelectedGenre }) => {

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    setSelectedGenre('All');
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder='Search by game title' onChange={handleSearchChange} />
      <img className='search-icon' src={searchIcon} alt="" />
    </div>
  );
}