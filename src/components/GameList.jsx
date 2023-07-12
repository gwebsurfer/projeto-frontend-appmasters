import { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import { GenreList } from './GenreList';
import { Card } from "./Card";
import './GameList.css'

export const GameList = ({ gameList }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredData, setFilteredData] = useState(gameList);

  useEffect(() => {
    const filteredResults = gameList?.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [gameList, searchTerm]);

  const handleGenreFilter = (genre) => {
    if (genre === 'All') {
      setFilteredData(gameList);
    } else {
      const filteredResults = gameList.filter((game) => game.genre === genre);
      setFilteredData(filteredResults);
    }
    setSelectedGenre(genre);
  };

  return (
    <>
      <NavBar 
        setSearchTerm={setSearchTerm} 
        setSelectedGenre={setSelectedGenre} 
      />
      <h1>Game List</h1>
      <GenreList
        genreList={gameList}
        setFilteredData={setFilteredData}
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre}
        handleGenreFilter={handleGenreFilter}
      />
      <div className='gameList'>
        <div className="container-list">
          {filteredData?.map((game) => <Card key={game.id} game={game} />)}
        </div>
      </div>
    </>
  );
};