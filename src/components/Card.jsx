import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { motion } from 'framer-motion';
import { Button } from './Button';
import { db } from "../services/firebaseConfig";
import heartIcon from "../assets/heart.svg";
import starIcon from "../assets/star.svg";
import starFilledIcon from "../assets/star-filled.svg";
import heartFilledIcon from "../assets/heart-filled.svg";
import './Card.css';

export const Card = ({ game, userDocId, userData, isUserLoggedIn }) => {
  const limitText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }

    const shortenedText = text.substring(0, limit);
    const lastSpaceIndex = shortenedText.lastIndexOf(' ');

    return shortenedText.substring(0, lastSpaceIndex) + '...';
  };

  const [rating, setRating] = useState(0);
  const [userRatings, setUserRatings] = useState([]);
  const [hoverRating, setHoverRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteHover, setIsFavoriteHover] = useState(false);
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);
  const [overallRating, setOverallRating] = useState(0.0);

  useEffect(() => {
    const ratingRef = doc(db, "gameRatings", game.id.toString());
    const unsubscribe = onSnapshot(ratingRef, (snapshot) => {
      if (snapshot.exists()) {
        const ratings = snapshot.data();
        const ratingValues = Object.values(ratings);
        const sum = ratingValues.reduce((acc, curr) => acc + curr, 0);
        const average = sum / ratingValues.length;
        setOverallRating(average.toFixed(1));
      } else {
        setOverallRating(0.0);
      }
    });
  
    return () => unsubscribe();
  }, [game.id]);

  useEffect(() => {
    if (userData) {
      if (userData.isFavorite && userData.isFavorite.includes(game.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [userData, game.id]);

  const handleMouseEnter = (starIndex) => {
    setHoverRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleFavoriteHover = () => {
    setIsFavoriteHover(true);
  };
  
  const handleFavoriteLeave = () => {
    setIsFavoriteHover(false);
  };  

  const shortDescription = limitText(game.short_description, 75);

  const navigate = useNavigate();  

  const handleFavoriteClick = async () => {
    if (!isUserLoggedIn) {
      navigate('/auth');
    } else {
      try {
        const userRef = doc(db, "users", userDocId);
        setIsFavoriteClicked(true);
  
        if (isFavorite) {
          await updateDoc(userRef, {
            isFavorite: arrayRemove(game.id)
          });
          setIsFavorite(false);
        } else {
          await updateDoc(userRef, {
            isFavorite: arrayUnion(game.id)
          });
          setIsFavorite(true);
        }
  
        setTimeout(() => {
          setIsFavoriteClicked(false);
        }, 300);
      } catch (error) {
        console.error("Erro ao favoritar o jogo:", error);
      }
    }
  };

  const handleRatingClick = async (ratingValue) => {
    if (!isUserLoggedIn) {
      navigate('/auth');
    } else {
      try {
        const userRef = doc(db, "users", userDocId);
        const ratingRef = doc(db, "gameRatings", game.id.toString());
  
        const userSnapshot = await getDoc(userRef);
        let userData = userSnapshot.data();
  
        let updatedRatings = [];
  
        if (userData && userData.ratings && userData.ratings.some(item => item.gameId === game.id)) {
          updatedRatings = userData.ratings.map((item) => {
            if (item.gameId === game.id) {
              return {
                ...item,
                rating: ratingValue
              };
            }
            return item;
          });
        } else {
          const gameRating = {
            gameId: game.id,
            rating: ratingValue
          };
          updatedRatings = [...(userData?.ratings || []), gameRating];
        }
  
        await updateDoc(userRef, {
          ratings: updatedRatings
        });

        userData = {
          ...userData,
          ratings: updatedRatings,
        }
  
        setUserRatings(updatedRatings);
        
        const ratingSnapshot = await getDoc(ratingRef);
        let updatedOverallRatings = {};
        
        if (ratingSnapshot.exists()) {
          updatedOverallRatings = ratingSnapshot.data();
          updatedOverallRatings[userDocId] = ratingValue;
        } else {
          updatedOverallRatings = { [userDocId]: ratingValue };
        }
        
        await setDoc(ratingRef, updatedOverallRatings);
        setRating(ratingValue);
        
      } catch (error) {
        console.error("Erro ao avaliar o jogo:", error);
      }
    }
  };

  const userRating = userData?.ratings?.find(item => item.gameId === game.id) || {};
  const currentRating = rating || userRating.rating || 0;
  
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className='card'>
      <img src={game.thumbnail} alt="thumbnail" />
      <div className='game-info'>
        <div className='game-rate'>
          <div className='rating'>
            {[...Array(4)].map((_, index) => {
              return (
                <img
                  key={index}
                  src={index < (hoverRating || currentRating) ? starFilledIcon : starIcon}
                  alt='Rate icon'
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleRatingClick(index + 1)}
                />
              );
            })}
          </div>
          <div
            className={`favorite ${isFavorite || isFavoriteHover ? 'favorite-hover' : ''} ${isFavoriteClicked ? 'favorite-click-animation' : ''}`}
            onMouseEnter={handleFavoriteHover}
            onMouseLeave={handleFavoriteLeave}
            onClick={handleFavoriteClick}
          >
            <img src={isFavorite || isFavoriteHover ? heartFilledIcon : heartIcon} alt='Favorite icon' />
            <span>Favorite</span>
          </div>
        </div>
        <h2>{game.title}</h2>
        <h6>Overall rating: {overallRating == 0.0 ? 'Unrated' : overallRating}</h6>
        <p>{shortDescription}</p>
        <div className='categories'>
          <h4 className='tag'>{game.platform}</h4>
          <h4 className='tag'>{game.genre}</h4>
        </div>
      </div>
      <Button classType={'card-button'} onClickFunction={() => { window.location.href = game.game_url }}>Play now</Button>
    </motion.div>
  )
}