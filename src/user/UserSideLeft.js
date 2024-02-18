import React, {useEffect, useState} from 'react';
import "./scss/UserSideLeft.scss"

// import backgroundImage from './scss/img/background-img.png';
import {SIDE_URL} from "../config/host-config";


const UserSideLeft = () => {

    // 이미지 경로
    const [imagePath, setImagePath] = useState('');

    const image = [
        process.env.PUBLIC_URL + "/img/KakaoTalk_Photo_2024-02-17-21-23-07 001.jpeg",
        process.env.PUBLIC_URL + "/img/KakaoTalk_Photo_2024-02-17-21-23-07 002.jpeg",
        process.env.PUBLIC_URL + "/img/KakaoTalk_Photo_2024-02-17-21-23-07 003.jpeg",
        process.env.PUBLIC_URL + "/img/KakaoTalk_Photo_2024-02-17-21-23-07 004.jpeg",
    ];



    const r = Math.floor(Math.random() * 4) + 1;


    return (
        <>
            <div className={'join-left'}>
                <div className={'background-img'} style={{ backgroundImage: `url(${image[0]})` }}></div>
                <div className={'left-container'} >
                    <div className={'join-introductory-article'}>
                        <div className={'h1-join-title'}>
                            Unleash Your Creativity<br/> with Catch Mind
                        </div>
                        <div className={'h2-join-sub-title'}>
                            Embark on a journey<br/> where imagination meets innovation!<br/> Join us at Catch Mind,<br/> the ultimate destination for <br/>an extraordinary gaming experience<br/> powered by cutting-edge AI technology
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSideLeft;