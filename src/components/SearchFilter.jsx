import searchIcon from "../assets/search.svg";
import './SearchFilter.css'

export const SearchFilter = ({ 
  genreList,
  filteredData,
  setFilteredData,
  selectedGenre,
  setSearchTerm,
  setSelectedGenre,
  selectedSort,
  setSelectedSort,
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

  const handleSortChange = (e) => {
    const sortOption = e.target.value;
    setSelectedSort(sortOption);
    sortGames(sortOption);
  };

  const sortGames = (sortOption) => {
    const sortedData = [...filteredData];

    sortedData.sort((a, b) => {
      // Handle non-rated games
      if (!a.rating) return 1;
      if (!b.rating) return -1;

      // Sort by rating
      if (sortOption === 'best') {
        return b.rating - a.rating;
      } else if (sortOption === 'worst') {
        return a.rating - b.rating;
      } else {
        return 0; // Default option: no sorting
      }
    });

    setFilteredData(sortedData);
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

      <div className="sort-ratings">
        <label htmlFor="selectedSort">não pode ser select</label>
        <select onChange={handleSortChange} value={selectedSort}>
          <option value="default">None</option>
          <option value="best">Top Rated</option>
          <option value="worst">Lowest Rated</option>
        </select>
      </div>
    </div>
  );
}