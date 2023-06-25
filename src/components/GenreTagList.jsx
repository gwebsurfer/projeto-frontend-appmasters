import { Button } from "./Button";
import './GenreTagList.css'

export const GenreTagList = ({ genreList, setFilteredData, selectedGenre, setSelectedGenre }) => {
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
      {uniqueGenres.map((genre) => (
        <Button onClickFunction={() => genreFilter(genre)} classType={`genre-button ${genre === selectedGenre && 'active'}`} key={genre}>{genre}</Button>
      ))}
    </div>
  )
}