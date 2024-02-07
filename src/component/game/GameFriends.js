import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import '../scss/GameModal.scss';
import '../scss/GameFriends.scss';
import addFriendBtn from "../../assets/img/baseline_person_add_black_24dp.png";
import listFriendBtn from "../../assets/img/baseline_view_list_black_24dp.png";
import chatFriendBtn from "../../assets/img/baseline_question_answer_black_24dp.png";
import {InputBase, IconButton, Paper, Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddFriendSection from "./AddFriendSection";
import FriendListSection from "./FriendListSection";
import ChatSection from "./ChatSection";

const GameFriends = () => {
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('friendList');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ChatListSection = () => {
        return (
            <div className='chat_friend_menu'>
                <div className='chat_friend_menu_header'>
                    <h2>Chat List</h2>
                </div>
                <div className='chat_list'>
                    <ol>
                        <li onClick={() => setActiveSection('chatFriend')}>
                            <div className='chat_list_ch'>
                                <p>친구 1</p>
                                <p>메시지</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        );
    }

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'addFriend':
                return <AddFriendSection />;
            case 'friendList':
                return <FriendListSection />;
            case 'chat':
                return <ChatListSection />;
            case 'chatFriend':
                return <ChatSection />;
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
                                <IconButton aria-label="fingerprint" color="primary" className='chat_fri_btn' onClick={() => setActiveSection('chat')}>
                                    <img src={chatFriendBtn} alt='채팅 리스트'/>
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
