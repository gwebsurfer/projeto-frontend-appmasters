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

  const genreCount = {};
  genreList.forEach((game) => {
    if (genreCount[game.genre]) {
      genreCount[game.genre] += 1;
    } else {
      genreCount[game.genre] = 1;
    }
  });

  genreCount['All'] = genreList.length;

  return (
    <div className="genre-list">
      <select onChange={(e) => genreFilter(e.target.value)} value={selectedGenre} className="genre-select">
      {uniqueGenres.map((genre) => (
        <option value={genre} key={genre}>
          {genre} ({genreCount[genre]})
        </option>
      ))}
      </select>
    </div>
  )
}