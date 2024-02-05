import React, {useEffect, useState} from 'react';
import "./scss/UserSideLeft.scss"

// import backgroundImage from './scss/img/background-img.png';
import {SIDE_URL} from "../config/host-config";


const UserSideLeft = () => {

    // 이미지 경로
    const [imagePath, setImagePath] = useState('');

    // 이미지 가져오기
    const fetchSideMenuImage = async ()=> {

        const res = await fetch("http://localhost:8888/side/side-menu", {
            method: 'GET'
        });

        if(res.status===200){
            const profileData = await res.blob(); // json, text 이외의 이미지, 비디오, pdf같은 것은 blob으로 받아

            // blob 이미지를 url으로 변환해야 img src에 경로로 넣을 수 있음
            const imgUrl = window.URL.createObjectURL(profileData);
            setImagePath(imgUrl);

            console.log(imagePath);
        } else {
            setImagePath(null);
        }

    }

    useEffect(() => {
        fetchSideMenuImage();
    }, []);

    return (
        <>
            <div className={'join-left'}>
                <div className={'background-img'} style={{ backgroundImage: `url(${imagePath})` }}></div>
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