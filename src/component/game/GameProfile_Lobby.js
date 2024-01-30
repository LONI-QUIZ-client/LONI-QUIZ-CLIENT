// GameProfileLobby 컴포넌트

import React, {useState} from 'react';
import catImage from "../../assets/img/star.png";
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import GameChat from './GameChat';
import {getCurrentLoginUser} from "../../config/login-util";  // GameChat 컴포넌트 추가

const GameProfileLobby = () => {
    const currentUserNickname = getCurrentLoginUser()?.username || '';



    return (
        <div className='profile'>
            <div className='profile_image'>
                <img src={catImage} alt="고양이 프로필"/>
            </div>
            <p>{currentUserNickname}</p>
            <p>total</p>
        </div>
    );
};

export default GameProfileLobby;
