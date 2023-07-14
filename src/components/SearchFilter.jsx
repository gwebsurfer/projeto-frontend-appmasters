import searchIcon from "../assets/search.svg";
import './SearchFilter.css'

export const SearchFilter = ({ 
  genreList,
  setFilteredData,
  selectedGenre,
  setSearchTerm,
  setSelectedGenre,
 }) => {

  const uniqueGenres = ['All Games', ...new Set(genreList?.map((game) => game.genre))];

  const genreFilter = (genre) => {
    if (genre === 'All Games') {
      setFilteredData(genreList);
    } else {
      setFilteredData(genreList.filter((game) => game.genre === genre))
    }
    setSelectedGenre(genre);
  };

  const genreCount = {};
  genreList.forEach((game) => {
    if (genreCount[game.genre]) {
      genreCount[game.genre] += 1;
    } else {
      genreCount[game.genre] = 1;
    }
  });

  genreCount['All Games'] = genreList.length;

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <div className="search-filter">
      <div className="search-bar">
        <input type="text" placeholder='Search by game title' onKeyDown={handleSearchChange} />
        <img className='search-icon' src={searchIcon} alt="" />
      </div>

      <div className="genre-list">
        <select onChange={(e) => genreFilter(e.target.value)} value={selectedGenre}>
        {uniqueGenres.map((genre) => (
          <option value={genre} key={genre}>
            {genre} ({genreCount[genre]})
          </option>
        ))}
        </select>
      </div>

    </div>
  );
}