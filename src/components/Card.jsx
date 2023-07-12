import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { motion } from 'framer-motion';
import { Button } from './Button';
import { auth, db } from "../services/firebaseConfig";
import heartIcon from "../assets/heart.svg";
import starIcon from "../assets/star.svg";
import starFilledIcon from "../assets/star-filled.svg";
import heartFilledIcon from "../assets/heart-filled.svg";
import './Card.css';

export const Card = ({ game }) => {
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteHover, setIsFavoriteHover] = useState(false);
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);

  const handleMouseEnter = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    setRating(0);
  };

  const handleFavoriteHover = () => {
    setIsFavoriteHover(true);
  };
  
  const handleFavoriteLeave = () => {
    setIsFavoriteHover(false);
  };  

  const shortDescription = limitText(game.short_description, 75);

  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userDocId, setUserDocId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkUserDoc = async () => {
      if (isUserLoggedIn) {
        try {
          const userUID = auth?.currentUser?.uid;
          const userRef = doc(db, "users", userUID);
  
          const userSnapshot = await getDoc(userRef);
  
          if (userSnapshot.exists()) {
            setUserDocId(userSnapshot.id);
            const userData = userSnapshot.data();
  
            if (userData) {
              setUserRatings(userData.ratings || []);
  
              if (userData.isFavorite && userData.isFavorite.includes(game.id)) {
                setIsFavorite(true);
              } else {
                setIsFavorite(false);
              }
            }
          } else {
            const newUserData = {
              ratings: [],
              isFavorite: []
            };
  
            const newUserRef = doc(db, "users", userUID);
            await setDoc(newUserRef, newUserData);
  
            setUserDocId(newUserRef.id);
          }
        } catch (error) {
          console.error("Erro ao verificar o documento do usuário:", error);
        }
      }
    };
  
    checkUserDoc();
  }, [isUserLoggedIn, game.id]);

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
  
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
  
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
  
        setUserRatings(updatedRatings);
        setRating(ratingValue);
  
      } catch (error) {
        console.error("Erro ao avaliar o jogo:", error);
      }
    }
  };

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
          <div className='rate'>
          {[...Array(4)].map((_, index) => {
            const userRating = userRatings.find(item => item.gameId === game.id);

            return (
              <img
                key={index}
                src={index < (rating || (userRating && userRating.rating) || 0) ? starFilledIcon : starIcon}
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
        <h6>Release date: {game.release_date}</h6>
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