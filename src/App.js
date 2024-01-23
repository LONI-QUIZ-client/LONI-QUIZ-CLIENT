// import logo from './logo.svg';
// import './App.css';
// import { Reset } from 'styled-reset'

import React from "react";

import Login from "./user/Login";
import {Routes, Route} from "react-router-dom";
import Join from "./user/Join";

function App() {
  return (
      <>
          <Routes>
              <Route path={"/login"} element={<Login />} />
              <Route path={"/join"} element={<Join />} />
          </Routes>
      </>
  );
}

export default App;
