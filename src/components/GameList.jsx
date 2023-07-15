import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { components } from 'react-select';
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import { NavBar } from './NavBar';
import { Card } from "./Card";
import { Button } from './Button';
import { Footer } from './Footer';
import searchIcon from "../assets/search.svg";
import './GameList.css'

export const GameList = ({ gameList }) => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState({ value: 'All Games', label: 'All Games' });
  const [filteredData, setFilteredData] = useState(gameList);
  const [userData, setUserData] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [favoritesMode, setFavoritesMode] = useState(false);
  const navigate = useNavigate(); 

  const colourStyles = {
    control: (styles, state) => ({ 
      ...styles, 
      width: '200px',
      backgroundColor: 'rgb(26, 31, 43)',
      color: 'rgba(246, 248, 251, 0.87)',
      fontSize: '0.8rem',
      fontWeight: '400',
      boxShadow: state.isFocused ? '0 0 0 1px rgb(100, 108, 255)' : '',
      border: '1px solid rgba(138, 148, 168, 0.5)',
      borderRadius: '0.5rem',
    }),
    option: (base, state) => ({
      ...base,
      color: state.isDisabled ? 'rgba(246, 248, 251, 0.4)' : 'rgba(246, 248, 251, 0.87)' && state.isFocused ? 'rgb(255, 255, 255)' : 'rgba(246, 248, 251, 0.87)',
      backgroundColor: state.isFocused ? 'rgb(17, 21, 29)' : 'rgba(26, 31, 43, 0.7)',
      borderBottom: '0.05rem solid rgba(246, 248, 251, 0.05)',
      cursor: state.isDisabled ? 'default' : 'pointer',
      fontSize: state.isDisabled ? '0.6rem' : '0.8rem',
      fontWeight: '400',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: 'rgba(246, 248, 251, 0.87)',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(26, 31, 43, 0.9)',
    }),
  };

  const uniqueGenres = [...new Set(gameList?.map((game) => game.genre))];

  const genreCount = {};
  gameList.forEach((game) => {
    if (genreCount[game.genre]) {
      genreCount[game.genre] += 1;
    } else {
      genreCount[game.genre] = 1;
    }
  });

  genreCount['All Games'] = gameList.length;

  const genreOptions = [
    { value: 'All Games', label: 'All Games' },
    { value: '', label: 'GENRE LIST', isDisabled: true },
    ...uniqueGenres.map(genre => ({ value: genre, label: genre })),
  ];  

  const CustomOption = ({ data, ...props }) => (
    <components.Option {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {data.label}
        {data.isDisabled ? null : (
        <span style={{ backgroundColor: 'rgb(100, 108, 255)', borderRadius: '4px', padding: '0 5px' }}>
          {genreCount[data.value]}
        </span>
        )}
      </div>
    </components.Option>
  );

  const genreFilter = (selectedOption) => {
    let filteredGames = gameList;
    
    if (selectedOption.value !== 'All Games') {
      filteredGames = filteredGames.filter((game) => game.genre === selectedOption.value);
    }
    
    if (favoritesMode) {
      filteredGames = filteredGames.filter((game) => userData.isFavorite.includes(game.id));
    }
    
    setFilteredData(filteredGames);
    setSelectedGenre(selectedOption);
    filterData();
  };

  const filterData = useCallback(() => {
    let filteredGames = gameList;
  
    if (searchTerm) {
      filteredGames = filteredGames.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  
    if (selectedGenre.value !== 'All Games') {
      filteredGames = filteredGames.filter((game) => game.genre === selectedGenre.value);
    }
  
    if (favoritesMode && userData) {
      filteredGames = filteredGames.filter((game) => userData.isFavorite.includes(game.id));
    }
  
    setFilteredData(filteredGames);
  }, [favoritesMode, userData, gameList, selectedGenre.value, searchTerm]);
  
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    filterData();
  }, [filterData, gameList, searchTerm]);
  
  const checkUserDoc = async () => {
    const userUID = auth?.currentUser?.uid;
    const userRef = doc(db, "users", userUID);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      setUserDocId(userSnapshot.id);
      const userData = userSnapshot.data();
      setUserData(userData);
    } else {
      const newUserData = {
        ratings: [],
        isFavorite: []
      };

      const newUserRef = doc(db, "users", userUID);
      await setDoc(newUserRef, newUserData);

      setUserDocId(newUserRef.id);
      setUserData(newUserData);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsUserLoggedIn(!!user);
      if(user){
        checkUserDoc();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <NavBar setIsUserLoggedIn={setIsUserLoggedIn} />

      <div className="search-filter">
        <div className="search-bar">
          <input type="text" placeholder='Search by game title' onChange={handleSearchChange} />
          <img className='search-icon' src={searchIcon} alt="" />
        </div>

        <div className="genre-list">
          <Select 
            styles={colourStyles}
            options={genreOptions}
            value={selectedGenre}
            onChange={genreFilter}
            isSearchable={false}
            placeholder='Genre'
            components={{ Option: CustomOption }}
            isOptionDisabled={(option) => option.isDisabled}
          />
        </div>

        <Button classType="show-favorites-btn" onClickFunction={() => { 
          if (!isUserLoggedIn) {
            navigate('/auth')
          } else {
            setFavoritesMode(!favoritesMode);
            filterData();
          }
        }}>
          {favoritesMode ? 'Show All' : 'My Favorites'}
        </Button>
      </div>
      
      <div className='gameList'>
        <div className="container-list">
        {filteredData?.map((game) => (
          <Card
            key={game.id}
            game={game}
            userDocId={userDocId}
            userData={userData}
            isUserLoggedIn={isUserLoggedIn}
          />
        ))}
        </div>
      </div>

      <Footer />
    </>
  );
};