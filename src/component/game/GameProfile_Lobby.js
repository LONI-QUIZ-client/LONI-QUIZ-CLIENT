import React, { useState, useEffect } from 'react';
import '../scss/GameLobby.scss';
import '../scss/GameBbox1.scss';
import '../css/GameLobby.css';
import starImage from "../../assets/img/star.png";
import GameChat from './GameChat';
import { getAutoCurrentLoginUser, getCurrentLoginUser, isLogin } from "../../config/login-util";
import {JOIN_URL, LOBBY_RANK, PROFILE_URL} from "../../config/host-config";
import { useNavigate } from "react-router-dom";

const GameProfileLobby = () => {
    const currentUser = (isLogin() ? getCurrentLoginUser() : getAutoCurrentLoginUser());
    const currentUserNickname = currentUser?.username || '';
    const userId = currentUser?.id || '';
    const [imageFile, setImageFile] = useState(null);
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(LOBBY_RANK)
            .then((res) => res.json())
            .then((json) => {
                setScores(json);
            });
    }, []);

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

    // userId에 해당하는 스코어 찾기
    const userScore = scores.find(user => user.id === userId)?.score;

    return (
        <div className='profile_circle'>
            <div className='profile_image' onClick={moveDetailHandler}>
                <img src={imageFile || starImage} alt='프로필 사진' />
            </div>
            <p onClick={moveDetailHandler}>{currentUserNickname}</p>
            <p>Score: {userScore}</p>
        </div>
    );
};

export default GameProfileLobby;
