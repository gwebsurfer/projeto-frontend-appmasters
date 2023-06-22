import { Card } from "./Card";
import './GameList.css'

export const GameList = ({ gamelist }) => (
  <div className="container">
    {gamelist?.map((game) => <Card key={game.id} game={game} />)}
  </div>
)