import React, { useEffect, useState } from 'react';
import { getAutoCurrentLoginUser, getCurrentLoginUser, isLogin } from '../../config/login-util';
import '../scss/GameBbox1.scss';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LOBBY_RANK, LOBBY_URL } from '../../config/host-config';

const GameRanking = () => {
    const currentUserNickname = (isLogin() ? getCurrentLoginUser() : getAutoCurrentLoginUser())?.username || '';
    const [open, setOpen] = useState(false);
    const [scores, setScores] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch(LOBBY_RANK)
            .then((res) => res.json())
            .then((json) => {
                setScores(json);
            });
    }, []);

    return (
        <div className="lobby_ranking">
            <button className="create_room_btn_friend" onClick={handleOpen}>
                Ranking
            </button>
            <Modal
                className='ranking_box'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ width: 300, bgcolor: 'background.paper', p: 2 }}>
                    <div className="rank_box">
                        <h4>QUIZ RANK</h4>
                        <ul className="Rank_list">
                            {scores.map((user, index) => (
                                <li key={index}>
                                    <div className="User_Ranking_box">
                                        <p className="user_rank">{`${index + 1}등`}</p>
                                        <p>{user.nickname}</p>
                                        <p className="rank_score">{user.score}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default GameRanking;
