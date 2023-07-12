import { useState } from 'react';
import { useQuery } from 'react-query';

import { instance } from './utils/api';
import { codeError } from './utils/constants';
import { Loader } from './components/Loader';
import { GameList } from './components/GameList';
import { ErrorHandler } from './components/ErrorHandler';

import './App.css';

const App = () => {
  const [errorMessage, setErrorMessage] = useState();

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

  if (!data && !isLoading && errorMessage) return <ErrorHandler>{errorMessage}</ErrorHandler>

  if (isLoading) return <Loader />

  return (
    <>
      <div className='app-container'>
        <div className='gameList'>
          <GameList gameList={data} />
        </div>
      </div>
    </>
  );
}

export default App;