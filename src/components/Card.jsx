import { Button } from './Button';
import './Card.css';

export const Card = ({ game }) => (
  <div className='card'>
    <img src={game.thumbnail} alt="thumbnail" />
    <div className='game-info'>
      <div className='categories'>
        <h4 className='tag'>{game.platform}</h4>
        <h4 className='tag-2'>{game.genre}</h4>
      </div>
      <h2>{game.title}</h2>
      <h6>Release date: {game.release_date}</h6>
      <p>{game.short_description}</p>
    </div>
    <Button classType={'card-button'} onClickFunction={() => { window.location.href = game.game_url }}>Play now</Button>
  </div>
)