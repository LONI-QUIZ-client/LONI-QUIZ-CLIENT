import React from 'react';
import {BsFillDoorOpenFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import "./scss/ButtonItem.scss"

const LobbyButton = () => {

    const redirect = useNavigate();

    // 로비 이동
    const moveLobbyHandler = e => {
        redirect('/lobby');
    }

    return (
        <>
            <button onClick={moveLobbyHandler} className={"lobby-move-button button-item"}>
                <div className={"fill-door-open-fill-icon button-icon"}><BsFillDoorOpenFill /></div>
                Go Lobby
            </button>
        </>
    );
};

export default LobbyButton;