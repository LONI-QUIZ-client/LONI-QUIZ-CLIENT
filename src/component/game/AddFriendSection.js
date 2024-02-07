import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const AddFriendSection = () => {
    const initialFriends = [
        { name: '친구 1', id: 1 },
        { name: '친구 2', id: 2 },
        { name: '킷캣쿠키앤크림', id: 3 },
    ];

    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredFriends, setFilteredFriends] = useState(initialFriends);

    const handleSearchChange = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);

        // 검색어에 따라 목록을 필터링하여 업데이트
        const filteredList = initialFriends.filter(
            friend => friend.name.includes(keyword)
        );
        setFilteredFriends(filteredList);
    };

    return (
        <div className='add_friend_menu'>
            <h2>Add Friend</h2>
            <div className='lobby_search_friend_box'>
                <Paper
                    className='search_user_form'
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search User"
                        inputProps={{ 'aria-label': 'search user' }}
                        value={searchKeyword}
                        onChange={handleSearchChange}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            <div className='search_friend_list'>
                <ul>
                    {filteredFriends.map(friend => (
                        <li key={friend.id}>
                            <p>{friend.name}</p>
                            <button className='follow_btn'>팔로우</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddFriendSection;
