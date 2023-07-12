import { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import { SearchFilter } from './SearchFilter';
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

  return (
    <>
      <NavBar />
      <SearchFilter
        genreList={gameList}
        setFilteredData={setFilteredData}
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre}
        setSearchTerm={setSearchTerm}
      />
      <div className='gameList'>
        <div className="container-list">
          {filteredData?.map((game) => <Card key={game.id} game={game} />)}
        </div>
      </div>
    </>
  );
};