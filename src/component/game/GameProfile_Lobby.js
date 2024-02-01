// GameProfileLobby 컴포넌트
import React, { useState, useEffect } from 'react';
import '../scss/GameLobby.scss';
import '../scss/GameBbox1.scss';
import '../css/GameLobby.css';
import GameChat from './GameChat';
import { getCurrentLoginUser } from "../../config/login-util";
import { JOIN_URL } from "../../config/host-config";

const GameProfileLobby = () => {
    const currentUserNickname = getCurrentLoginUser()?.username || '';
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetch(JOIN_URL + '/profile-image')
            .then(res => res.blob())
            .then(blob => {
                setImageFile(URL.createObjectURL(blob));
            })
            .catch(error => {
                console.error('프로필 이미지 가져오기 실패:', error);
            });
    }, []);

    return (
        <div className='profile'>
            <div className='profile_image'>
                {imageFile && <img src={imageFile} alt="유저 프로필" />}
            </div>
            <p>{currentUserNickname}</p>
            <p>total</p>
        </div>
    );
};

export default GameProfileLobby;
