import { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import { NavBar } from './NavBar';
import { Card } from "./Card";
import searchIcon from "../assets/search.svg";
import './GameList.css'

export const GameList = ({ gameList }) => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredData, setFilteredData] = useState(gameList);
  const [userData, setUserData] = useState(null);
  const [userDocId, setUserDocId] = useState(null);

  const colourStyles = {
    control: (styles, state) => ({ 
      ...styles, 
      width: '160px',
      backgroundColor: 'rgb(26, 31, 43)',
      color: 'rgba(246, 248, 251, 0.87)',
      fontSize: '0.8rem',
      fontWeight: 400,
      boxShadow: state.isFocused ? '0 0 0 1px rgb(100, 108, 255)' : '',
      border: '1px solid rgba(138, 148, 168, 0.5)',
      borderRadius: '0.5rem',
    }),
    option: (base, state) => ({
      ...base,
      color: state.isFocused ? 'rgb(255, 255, 255)' : 'rgba(246, 248, 251, 0.87)',
      backgroundColor: state.isFocused ? 'rgba(26, 31, 43, 1)' : 'rgba(26, 31, 43, 0.7)',
      borderBottom: '0.05rem solid rgba(246, 248, 251, 0.05)',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: 400,
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

  const uniqueGenres = ['All Games', ...new Set(gameList?.map((game) => game.genre))];

  const genreCount = {};
  gameList.forEach((game) => {
    if (genreCount[game.genre]) {
      genreCount[game.genre] += 1;
    } else {
      genreCount[game.genre] = 1;
    }
  });

  genreCount['All Games'] = gameList.length;

  const genreOptions = uniqueGenres.map(genre => ({ 
    value: genre, 
    label: genre,
  }));

  const CustomOption = ({ data, ...props }) => (
    <components.Option {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {data.label}
        <span style={{ backgroundColor: 'rgb(100, 108, 255)', borderRadius: '4px', padding: '0 5px' }}>
          {genreCount[data.value]}
        </span>
      </div>
    </components.Option>
  );

  const genreFilter = (selectedOption) => {
    if (selectedOption.value === 'All Games') {
      setFilteredData(gameList);
    } else {
      setFilteredData(gameList.filter((game) => game.genre === selectedOption.value))
    }
    setSelectedGenre(selectedOption);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };
  
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

  useEffect(() => {
    const filteredResults = gameList?.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [gameList, searchTerm]);

  return (
    <>
      <NavBar setIsUserLoggedIn={setIsUserLoggedIn} />

      <div className="search-filter">
        <div className="search-bar">
          <input type="text" placeholder='Search by game title' onKeyDown={handleSearchChange} />
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
          />
        </div>
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
    </>
  );
};