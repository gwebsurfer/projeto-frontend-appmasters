import './GenreList.css'

export const GenreList = ({ genreList, setFilteredData, selectedGenre, setSelectedGenre }) => {
  const uniqueGenres = ['All', ...new Set(genreList?.map((game) => game.genre))];

  const genreFilter = (genre) => {
    if (genre === 'All') {
      setFilteredData(genreList);
    } else {
      setFilteredData(genreList.filter((game) => game.genre === genre))
    }
    setSelectedGenre(genre);
  };

  return (
    <div className="genre-list">
      <select onChange={(e) => genreFilter(e.target.value)} value={selectedGenre} className="genre-select">
      {uniqueGenres.map((genre) => (
        <option value={genre} key={genre}>{genre}</option>
      ))}
      </select>
    </div>
  )
}