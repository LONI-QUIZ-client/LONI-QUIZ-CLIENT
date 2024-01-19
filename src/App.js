// import logo from './logo.svg';
// import './App.css';
// import { Reset } from 'styled-reset'

import React from "react";

import SignInModal from "./user/SignInModal";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
      <>
          <Routes>
              <Route path={"/"} element={<SignInModal />} />
          </Routes>
      </>
  );
}

export default App;
