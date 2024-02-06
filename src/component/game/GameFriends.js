import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import '../scss/GameModal.scss';
import {FormControlLabel, Switch, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {Input} from "reactstrap";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const GameFriends = () => {
    const ariaLabel = { 'aria-label': 'description' };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='lobby_friends'>
            <button className='create_room_btn_friend' onClick={handleOpen}>Friends</button>
            <Modal
                className='friends_box'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ width: 300, bgcolor: 'background.paper', p: 3 ,borderRadius: 2, textAlign: 'center'}}>
                    <div className=''>
                        <div className='lobby_search_friend_box'>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search User"
                                    inputprops={{ 'aria-label': 'search user' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </div>
                        <div className=''>
                            <ul>
                                <li>
                                    친구 1
                                </li>
                                <li>
                                    친구 2
                                </li>
                                <li>
                                    친구 3
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <p>친구 1</p>
                            <button onClick={handleClose}>나가기</button>
                        </div>
                        <hr></hr>
                        <div>채팅구역</div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default GameFriends;