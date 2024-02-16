import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import '../scss/GameModal.scss';
import '../scss/GameFriends.scss';
import addFriendBtn from "../../assets/img/baseline_person_add_black_24dp.png";
import listFriendBtn from "../../assets/img/baseline_view_list_black_24dp.png";
import {InputBase, IconButton, Paper, Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddFriendSection from "./AddFriendSection";
import FriendListSection from "./FriendListSection";

const GameFriends = () => {
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('friendList');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const renderActiveSection = () => {
        switch (activeSection) {
            case 'addFriend':
                return <AddFriendSection />;
            case 'friendList':
                return <FriendListSection />;
            default:
                return null;
        }
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
                <Box sx={{ width: 300, bgcolor: 'background.paper', p: 3, borderRadius: 2, textAlign: 'center' }}>
                    <div className='game_friend_modal_container'>
                        <div className='game_friend_modal_page'>
                            {renderActiveSection()}
                        </div>
                        <div className='game_friend_modal_menu'>
                            <Stack direction="row" spacing={1}>
                                <IconButton aria-label="fingerprint" color="secondary" className='add_fri_btn' onClick={() => setActiveSection('addFriend')}>
                                    <img src={addFriendBtn} alt='친구 추가'/>
                                </IconButton>
                                <IconButton aria-label="fingerprint" color="success" className='list_fri_btn' onClick={() => setActiveSection('friendList')}>
                                    <img src={listFriendBtn} alt='친구 목록'/>
                                </IconButton>
                            </Stack>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default GameFriends;

