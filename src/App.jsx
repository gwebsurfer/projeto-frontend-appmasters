import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { instance } from './utils/api';
import { codeError } from './utils/constants';
import { Loader } from './components/Loader';
import { GameList } from './components/GameList';
import { GenreTagList } from './components/GenreTagList';
import { NavBar } from './components/NavBar';
import { ErrorHandler } from './components/ErrorHandler';

import './App.css';

const App = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [filteredData, setFilteredData] = useState();

  const { isLoading, data } = useQuery("game-list", () => {

    return instance
      .get('/data')
      .then(response => response.data)
      .catch(function (error) {
        if (error.code === 'ECONNABORTED') return setErrorMessage('O servidor demorou para responder, tente mais tarde.');

        if (codeError.includes(error.response?.status))
          return setErrorMessage('O servidor falhou em responder, tente recarregar a página.', error.response?.status);

        return setErrorMessage('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.', error.response?.status);
      });
  });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  if (!data && !isLoading && errorMessage) return <ErrorHandler>{errorMessage}</ErrorHandler>

  if (isLoading) return <Loader />

  return (
    <>
      <NavBar />
      <div className='app-container'>
        <h1>Game List</h1>
        <GenreTagList taglist={data} setFilteredData={setFilteredData} />
        <div className='gamelist'>
          <GameList gamelist={filteredData} />
        </div>
      </div>
    </>
  );
}

export default App;