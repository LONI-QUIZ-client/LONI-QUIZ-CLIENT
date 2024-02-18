import React, {useEffect, useState} from 'react';
import "./scss/UserSideLeft.scss";
// import backgroundImages from '../../public/img/sideLeft';

// import backgroundImage from './scss/img/background-img.png';
// import {SIDE_URL} from "../config/host-config";



const UserSideLeft = () => {

    // 이미지 경로
    const [imagePath, setImagePath] = useState('');

    const imageList = [
        process.env.PUBLIC_URL + "/img/sideLeft/3f70671c29ad5a674b3b5b09dc91366b.jpg"
        , process.env.PUBLIC_URL + "/img/sideLeft/7fe6525cb0d32c33a996d3697f0224cd.jpg"
        , process.env.PUBLIC_URL + "/img/sideLeft/51098444f53cf1e3d53d2a70773f6c8a.jpg"
        , process.env.PUBLIC_URL + "/img/sideLeft/bab20d8b972fb21fb2b7eb4cfc09812f.jpg"
    ]

    useEffect(() => {
        const ranNum = Math.floor(Math.random() * (imageList.length - 1) + 1)

        setImagePath(imageList[ranNum]);
    }, []);

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