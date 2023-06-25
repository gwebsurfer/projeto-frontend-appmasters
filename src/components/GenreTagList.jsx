import { Button } from "./Button";
import './GenreTagList.css'

export const GenreTagList = ({ genreList, setFilteredData }) => {
  const uniqueGenres = ['All', ...new Set(genreList?.map((game) => game.genre))];

  const genreFilter = (genre) => {
    if (genre === 'All') {
      setFilteredData(genreList);
    } else {
      setFilteredData(genreList.filter((game) => game.genre === genre))
    }
  }

  return (
    <div className="genre-list">
      {uniqueGenres.map((genre) => (
        <Button onClickFunction={() => genreFilter(genre)} classType={'genre-button'} key={genre}>{genre}</Button>
      ))}
    </div>
  )
}