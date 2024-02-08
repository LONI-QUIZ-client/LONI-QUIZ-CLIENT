import React from 'react';
import GameRanking from "./GameRanking";
import GameFriends from "./GameFriends";
import '../scss/GameFooter.scss';
const GameFooter = () => {
    return (
        <div className='footer-container'>
            <GameFriends/>
        </div>
    );
};

export default GameFooter;