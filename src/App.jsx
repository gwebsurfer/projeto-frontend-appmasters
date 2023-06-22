import axios from 'axios';
import { useQuery } from 'react-query';

import './App.css';
import { GameList } from './components/GameList';

const App = () => {
  const { isLoading, error, data } = useQuery("gamelist", () => {
    return axios
      .get('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data',
        { headers: { "dev-email-address": "gab@gab.art.br" } })
      .then(response => response.data);
  });

  if (isLoading) return 'Carregando...'

  console.log(error);

  if (error) return 'Ops, ocorreu um erro' + error.message;

  return (
    <div className='app-container'>
      <h1>Lista de Jogos</h1>
      <div className='gamelist'>
        {console.log(data)}
        <GameList gamelist={data} />
      </div>
    </div>
  );
}

export default App;