import { Card } from "./Card";
import './GameList.css'

export const GameList = ({ gameList }) => (
  <div className="container-list">
    {gameList?.map((game) => <Card key={game.id} game={game} />)}
  </div>
)