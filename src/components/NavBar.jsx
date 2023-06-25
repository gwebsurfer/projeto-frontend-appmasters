import './NavBar.css';

export const NavBar = ({ setSearchTerm }) => {

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="logo-mobile">
        <img src="/icon.svg" alt="icon" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder='Search by Game Title' onChange={handleSearchChange} />
        <img className='search-icon' src="/search.svg" alt="" />
      </div>
    </div>
  )
}