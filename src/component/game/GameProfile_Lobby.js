// GameProfileLobby 컴포넌트
import React, { useState, useEffect } from 'react';
import '../scss/GameLobby.scss';
import '../scss/GameBbox1.scss';
import '../css/GameLobby.css';
import starImage from "../../assets/img/star.png";
import GameChat from './GameChat';
import { getCurrentLoginUser } from "../../config/login-util";
import { JOIN_URL } from "../../config/host-config";

const GameProfileLobby = () => {
    const currentUserNickname = getCurrentLoginUser()?.username || '';
    const [imageFile, setImageFile] = useState(null);

    const fetchProfileImage = async () => {

        const url = JOIN_URL + "/profile-image";
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getCurrentLoginUser().token
            }
        });

        if (res.status === 200) {
            const profileData = await res.blob();

            // blob이미지를 url로 변환
            const imageFile = window.URL.createObjectURL(profileData);

            setImageFile(imageFile);
        } else {
            const errMsg = await res.text();
            alert(errMsg);
            setImageFile(null);
        }

    };

    useEffect(() => {
        currentUserNickname && fetchProfileImage();
    }, [currentUserNickname]);

    return (
        <div className='profile'>
            <div className='profile_image'>
                <img src={imageFile || starImage} alt='프로필 사진'/>
            </div>
            <p>{currentUserNickname}</p>
            <p>total</p>
        </div>
    );
};

export default GameProfileLobby;
