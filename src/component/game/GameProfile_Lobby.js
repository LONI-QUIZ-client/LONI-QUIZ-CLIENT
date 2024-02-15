// GameProfileLobby 컴포넌트
import React, { useState, useEffect } from 'react';
import '../scss/GameLobby.scss';
import '../scss/GameBbox1.scss';
import '../css/GameLobby.css';
import starImage from "../../assets/img/star.png";
import GameChat from './GameChat';
import { getAutoCurrentLoginUser, getCurrentLoginUser, isLogin } from "../../config/login-util";
import { JOIN_URL } from "../../config/host-config";
import { useNavigate } from "react-router-dom";

const GameProfileLobby = () => {
    const currentUser = (isLogin() ? getCurrentLoginUser() : getAutoCurrentLoginUser());
    const currentUserNickname = currentUser?.username || '';
    const userId = currentUser?.id || '';
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const fetchProfileImage = async () => {
        const url = JOIN_URL + "/profile-image";
        fetch(url, {
            method: 'Post',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                userid : getCurrentLoginUser().id
            })
        })
            .then(res => res.text())
            .then(json => {
                    setImageFile(json)
                }
            )
    };

    const moveDetailHandler = () => {
        navigate(`/mypage/${userId}`);
    };

    useEffect(() => {
        currentUserNickname && fetchProfileImage();
    }, [currentUserNickname]);

    return (
        <div className='profile'>
            <div className='profile_image' onClick={moveDetailHandler}>
                <img src={imageFile || starImage} alt='프로필 사진' />
            </div>
            <p onClick={moveDetailHandler}>{currentUserNickname}</p>
            <p>total</p>
        </div>
    );
};

export default GameProfileLobby;
