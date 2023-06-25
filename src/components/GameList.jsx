import { Card } from "./Card";
import './GameList.css'

export const GameList = ({ gameList }) => (
  <div className="container">
    {gameList?.map((game) => <Card key={game.id} game={game} />)}
  </div>
)