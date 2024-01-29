// import logo from './logo.svg';
// import './App.css';
// import { Reset } from 'styled-reset'

import React from "react";

import Login from "./user/Login";
import {Routes, Route} from "react-router-dom";
import Join from "./user/Join";

import TodoTemplate from "./component/game/GameLobby";
import GameLobby from "./component/game/GameLobby";

function App() {
  return (
      <>

          <Routes>
              <Route path={"/login"} element={<Login />} />
              <Route path={"/join"} element={<Join />} />
                            <GameLobby />
          </Routes>
      </>
  );
}


export default App;
