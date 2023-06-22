export const Card = ({ game }) => (
  <div>
    <h2>{game.title}</h2>
    <img src={game.thumbnail} alt="" />
  </div>
)