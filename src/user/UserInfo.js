import React from 'react';

import {useNavigate} from "react-router-dom";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsPenFill } from "react-icons/bs";
import { BsStars } from "react-icons/bs";

import "./scss/UserInfo.scss";
import { BsFillPauseFill } from "react-icons/bs";

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

    const BsFillPersonFillIconStyle ={
        fontSize: '6rem'
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
                <div className={"user-info-item-content"}>
                    <div className={"user-page-profile"}>
                        <BsFillPersonFill style={BsFillPersonFillIconStyle}/>
                    </div>

                    <div className={"user-info-contain"}>
                        <div className={"user-info-change-item"}>
                            닉네임
                            <BsPenFill style={{fontSize: '2rem', marginLeft: '0.5rem'}}/>
                        </div>
                        <div className={"user-login-state-item"}>
                            <div className="login-state-icon">
                                <BsFillPauseFill/>
                            </div>
                            <div className={"login-state-modal"}>
                                Logged in
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"change-button-location"}>
                <button className={"user-page-image-change-button"}>
                    <BsStars className={"BsStarsStyle"}/>
                    CHANGE IMAGE
                </button>
            </div>

        </div>
    );
};

export default UserInfo;