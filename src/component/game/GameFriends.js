import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import '../scss/GameModal.scss';
import '../scss/GameFriends.scss';
import addFriendBtn from "../../assets/img/baseline_person_add_black_24dp.png";
import listFriendBtn from "../../assets/img/baseline_view_list_black_24dp.png";
import chatFriendBtn from "../../assets/img/baseline_question_answer_black_24dp.png";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const AddFriendSection = () => (
    <div className='add_friend_menu'>
        <h2>Add Friend</h2>
        <div className='lobby_search_friend_box'>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search User"
                    inputProps={{ 'aria-label': 'search user' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
        <div className='search_friend_list'>
            <ul>
                <li>
                    친구 1
                </li>
                <li>
                    친구 2
                </li>
            </ul>
        </div>
    </div>
);

const FriendListSection = () => (
    <div className='list_friend_menu'>
        <h2>Friend List</h2>
        <div>
            <ul>
                <li>Friend 1</li>
                <li>Friend 2</li>
                <li>Friend 3</li>
            </ul>
        </div>
    </div>
);

const ChatSection = () => (
    <div className='chat_friend_menu'>
        <h2>Chat</h2>
        <div className='chating_texts'>
            {/* Display Chat Messages */}
        </div>
        <div>
            <input type="text" placeholder="Type your message" />
            <button>Send</button>
        </div>
    </div>
);

const GameFriends = () => {
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('addFriend');

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
            case 'chat':
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
                            <ul className='friends_menu_list'>
                                <li>
                                    <button className='add_fri_btn' onClick={() => setActiveSection('addFriend')}>
                                        <img src={addFriendBtn} alt='친구 추가'/>
                                    </button>
                                </li>
                                <li>
                                    <button className='list_fri_btn' onClick={() => setActiveSection('friendList')}>
                                        <img src={listFriendBtn} alt='친구 목록'/>
                                    </button>
                                </li>
                                <li>
                                    <button className='chat_fri_btn' onClick={() => setActiveSection('chat')}>
                                        <img src={chatFriendBtn} alt='친구 1:1 채팅'/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default GameFriends;
