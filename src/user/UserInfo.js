import React from 'react';

import {useNavigate} from "react-router-dom";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsPenFill } from "react-icons/bs";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { BsStars } from "react-icons/bs";


import "./scss/UserInfo.scss";

const UserInfo = () => {

    const redirect = useNavigate();

    // 로비 이동
    const moveLobbyHandler = e => {
        redirect('/lobby')
    }

    // MOVE LOBBY Button
    const BsFillDoorOpenFillStyle = {
        width: '3.5rem'
        , height: '3.5rem'
        , marginRight: '0.2rem'
    }


    return (
        <div className={"user-info"}>
            <button
                onClick={moveLobbyHandler}
                className={"lobby-move-button"}>
                <BsFillDoorOpenFill style={BsFillDoorOpenFillStyle}/>
                MOVE LOBBY
            </button>


            <div className={"user-page-background"}>
                <div
                    className={"user-page-profile"}>
                    <BsFillPersonFill />
                </div>
                <div className={"user-info-contain"}>
                    <div className={"user-info-change-item"}>
                        <div className={"user-name"}>닉네임</div>
                        <BsPenFill />
                    </div>
                    <div className={"user-login-state-item"}>
                        <p className={"user-login-state-icon"}>
                            <TbPlayerPauseFilled style={{width:'3rem',height:'3rem'}}/>
                        </p>
                        {/*<div className={"user-state"}>*/}
                            Logged in
                        {/*</div>*/}
                    </div>
                </div>
                <button className={"user-page-image-change-button"}>
                    <BsStars className={"BsStarsStyle"}/>
                    CHANGE IMAGE
                </button>
            </div>

        </div>
    );
};

export default UserInfo;