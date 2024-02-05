import React from 'react';
import GameRanking from "./GameRanking";
import GameFriends from "./GameFriends";

const GameFooter = () => {
    return (
        <div className='footer-container'>
            <GameRanking/>
            <GameFriends/>
        </div>
    );
};

export default GameFooter;