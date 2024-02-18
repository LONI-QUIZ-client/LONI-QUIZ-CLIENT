// import logo from './logo.svg';
// import './App.css';
// import { Reset } from 'styled-reset'

import React from "react";

import Login from "./user/Login";
import {Routes, Route} from "react-router-dom";
import Join from "./user/Join";

import GameLobby from "./component/game/GameLobby";
import Main from "./component/main/Main";
import GamePage from "./component/gamepage/GamePage";
import KakaoLoading from "./user/KakaoLoading";
import UserMyPage from "./user/UserMyPage";

function App() {

  return (
      <>
          <Routes>
              <Route path={'/'} element={<Main />} />
              <Route path={'/login'} element={<Login />} />
              <Route path={'/join'} element={<Join />} />
              <Route path={'/lobby'} element={<GameLobby />} />
              <Route path={'/gameRoom'} element={<GamePage />} />
              {/*<Route path={'/mypage'} element={<UserInfo />} />*/}
              <Route path={'/user/oauth'} element={<KakaoLoading />} />
              <Route path={'/myPage/:userId'} element={<UserMyPage />} />
          </Routes>
      </>
  );
}


export default App;
