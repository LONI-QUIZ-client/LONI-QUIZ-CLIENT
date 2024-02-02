import React from 'react';
import { getCurrentLoginUser } from "../../config/login-util";
import '../scss/GameBbox1.scss';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';

const GameRanking = () => {
    const currentUserNickname = getCurrentLoginUser()?.username || '';

    return (
        <div className='rank_box'>
            <h4>QUIZ RANK</h4>
            <ul className='Rank_list'>
                <li>
                    <div className='User_Ranking_box'>
                        <p className='user_rank'>1등</p>
                        <p>{currentUserNickname}</p>
                        <p className='rank_score'>9999</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default GameRanking;