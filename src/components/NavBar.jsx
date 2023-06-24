import './NavBar.css';

export const NavBar = () => {

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="logo-mobile">
        <img src="/icon.svg" alt="icon" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder='Search by Game Title' />
        <img className='search-icon' src="/search.svg" alt="" />
      </div>
    </div>
  )
}