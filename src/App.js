// import logo from './logo.svg';
// import './App.css';
// import { Reset } from 'styled-reset'

import React from "react";

import Login from "./user/Login";
import {Routes, Route} from "react-router-dom";
import Join from "./user/Join";

import TodoTemplate from "./component/game/GameLobby";
import GameLobby from "./component/game/GameLobby";
import Main from "./component/main/Main";
import GamePage from "./component/gamepage/GamePage";
import UserInfo from "./user/UserInfo";

function App() {
  return (
      <>
          <Routes>
              <Route path={'/'} element={<Main />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/join'} element={<Join />} />
              <Route path={'/lobby'} element={<GameLobby />} />
              <Route path={'/gameRoom'} element={<GamePage />} />
              <Route path={'/mypage'} element={<UserInfo />} />
          </Routes>
      </>
  );
}


export default App;
