import { useEffect, useState } from 'react';
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";
import { NavBar } from './NavBar';
import { SearchFilter } from './SearchFilter';
import { Card } from "./Card";
import './GameList.css'

export const GameList = ({ gameList }) => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredData, setFilteredData] = useState(gameList);
  const [userData, setUserData] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  
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
      <NavBar />
      <SearchFilter
        genreList={gameList}
        setFilteredData={setFilteredData}
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre}
        setSearchTerm={setSearchTerm}
      />
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