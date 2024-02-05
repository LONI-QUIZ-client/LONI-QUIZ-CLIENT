import React, {useState} from 'react';
import { getCurrentLoginUser } from "../../config/login-util";
import '../scss/GameBbox1.scss';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const GameRanking = () => {
    const currentUserNickname = getCurrentLoginUser()?.username || '';
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='lobby_ranking'>
            <button className='create_room_btn_friend' onClick={handleOpen}>Ranking</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ width: 300, bgcolor: 'background.paper', p: 2 }}>
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
                </Box>
            </Modal>
        </div>
    );
};

export default GameRanking;