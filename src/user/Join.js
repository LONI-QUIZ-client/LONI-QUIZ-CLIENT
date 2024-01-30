import React from 'react';

import './scss/Join.scss'

import UserSideLeft from "./UserSideLeft";
import JoinRight from "./JoinRight";


const Join = () => {

    return (
        <div className={'join-main-content'}>
            <div className={'join-container'}>
                {/*<div className={'game-logo'}></div>*/}
                <UserSideLeft />
                <JoinRight />
            </div>
        </div>
    );
};

export default Join;