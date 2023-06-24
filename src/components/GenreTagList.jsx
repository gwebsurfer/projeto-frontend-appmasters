import { Button } from "./Button";
import './GenreTagList.css'

export const GenreTagList = ({ taglist, setFilteredData }) => {
  const uniqueGenres = ['All', ...new Set(taglist?.map((game) => game.genre))];

  const genreFilter = (genre) => {
    if (genre === 'All') {
      setFilteredData(taglist);
    } else {
      setFilteredData(taglist.filter((game) => game.genre === genre))
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