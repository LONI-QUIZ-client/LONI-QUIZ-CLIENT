import React from 'react';

import '../scss/Join.scss'

import JoinLeft from "./JoinLeft";
import JoinRight from "./JoinRight";


const Join = () => {

    return (
        <div className={'join-screen'}>
            <div className={'join-main-content'}>
                <div className={'game-logo'}></div>
                <JoinLeft />
                <JoinRight />
            </div>
        </div>
    );
};

export default Join;