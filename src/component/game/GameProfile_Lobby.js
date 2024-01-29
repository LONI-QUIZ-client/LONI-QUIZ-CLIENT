import React from 'react';
import catImage from "../../assets/img/star.png";
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';

const GameProfileLobby = () => {
    return (
        <div className='profile'>
            <div className='profile_image'>
                <img src={catImage} alt="고양이 프로필"/>
            </div>
            <p>NickName</p>
            <p>0승 0패</p>
        </div>
    );
};

export default GameProfileLobby;