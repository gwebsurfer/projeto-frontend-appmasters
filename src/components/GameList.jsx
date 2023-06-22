import { Card } from "./Card";

export const GameList = ({ gamelist }) => (
  <div>
    {gamelist?.map((game) => <Card key={game.id} game={game} />)}
  </div>
)