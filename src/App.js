// import logo from './logo.svg';
// import './App.css';
// import { Reset } from 'styled-reset'

import React from "react";

import SignInTemplate from "./user/SignInTemplate";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
      <>
          <Routes>
              <Route path={"/"} element={<SignInTemplate />} />
          </Routes>
      </>
  );
}

export default App;
