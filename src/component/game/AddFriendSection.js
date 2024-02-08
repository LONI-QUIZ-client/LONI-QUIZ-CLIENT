import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { USER_SEARCH } from "../../config/host-config";
import {getCurrentLoginUser} from "../../config/login-util";

const AddFriendSection = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredFriends, setFilteredFriends] = useState([]);
    const logindId = getCurrentLoginUser().id;

    const handleSearchChange = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);

        if (keyword.trim() === '') {
            // 빈 값일 때는 검색 결과를 초기화
            setFilteredFriends([]);
        } else {
            fetch(USER_SEARCH, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    nickname: keyword
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(json => {
                    // 서버 응답 데이터를 활용하여 친구 목록 업데이트
                    const serverFriends = json.map(user => ({
                        name: user.nickname,
                        id: user.id,
                    }));
                    setFilteredFriends(serverFriends);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    };


    const followerHandler = e => {
        fetch("http://localhost:8888/follower", {
            method: "post",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                fid : logindId,
                userId : filteredFriends[0].id
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
    }

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
                {searchKeyword.trim() !== '' && (
                    <ul>
                        {filteredFriends.map(user => (
                            <li key={user.id}>
                                <p>{user.name}</p>
                                <button className='follow_btn' onClick={followerHandler}>팔로우</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AddFriendSection;
