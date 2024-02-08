import React from 'react';
import {IconButton, InputBase, Paper} from "@mui/material";
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
                    <button className='follow_btn'>팔로우</button>
                </li>
                <li>
                    친구 2
                    <button className='follow_btn'>팔로우</button>
                </li>
            </ul>
        </div>
    </div>
);

export default AddFriendSection;