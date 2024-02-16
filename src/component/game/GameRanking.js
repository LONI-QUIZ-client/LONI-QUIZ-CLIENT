import React, { useEffect, useState } from 'react';
import { LOBBY_RANK } from '../../config/host-config';
import '../scss/GameBbox1.scss';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import { useNavigate } from 'react-router-dom';

const GameRanking = () => {
    const [scores, setScores] = useState([]);
    const redirection = useNavigate();

    useEffect(() => {
        fetch(LOBBY_RANK)
            .then((res) => res.json())
            .then((json) => {
                setScores(json);
            });
    }, []);

    // 유저 마이페이지로 이동
    const userMypageHandler = (userId) => {
        console.log(userId);
        redirection(`/mypage/${userId}`);
    };

    // 렌더링에 사용할 scores 배열 형식 변경
    const formattedScores = scores.map((user, index) => ({
        rank: index + 1,
        name: user.nickname,
        score: user.score,
        id: user.id, // 추가: 사용자 ID도 저장
    }));

    return (
        <div className="rank_box">
            <h4>QUIZ RANK</h4>
            <ul className="Rank_list">
                {formattedScores.map((user, index) => (
                    <li key={index}>
                        <div className="User_Ranking_box" onClick={() => userMypageHandler(user.id)}>
                            <p>{`${user.rank}등 ${user.name}`}</p>
                            <p className="rank_score">{user.score}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameRanking;
