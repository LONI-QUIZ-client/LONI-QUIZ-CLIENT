import React from 'react';
import "./scss/UserSideLeft.scss"

import backgroundImage from './scss/img/background-img.png';


const UserSideLeft = () => {

    return (
        <>
            <div className={'join-left'}>
                <div className={'background-img'} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div className={'left-container'}>
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