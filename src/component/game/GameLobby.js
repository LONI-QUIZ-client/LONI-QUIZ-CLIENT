import React, { useState, useEffect } from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import GameInput from "./GameInput";
import {LOBBY_URL} from "../../config/host-config";
import GameChat from "./GameChat";
import GameProfileLobby from "./GameProfile_Lobby";
import GameModal from "./GameModal";
import {Link} from "react-router-dom";

const API_BASE_URL = LOBBY_URL;

const GameLobby = () => {
    const [lobbyData, setLobbyData] = useState([]);


    useEffect(() => {
        fetch(API_BASE_URL + "?page=1&amount=15")
            .then(res => res.json())
            .then(json => {
                setLobbyData(json);
            });
    }, []);

    return (
        <>
            <div className='lobby_menu'>
                <Link to={'/login'}>로그인/회원가입</Link>
                <div className='btns_box'>
                    <button className='setting_btn'>Setting</button>
                    <GameModal />
                    <button className='start_game_btn'>Game Start</button>
                </div>
            </div>
            <div className='lobby_container'>
                <div className='lobby_box1'>
                    <div className='lobby_bbox1'>
                        <GameProfileLobby />
                    </div>
                </div>
                <div className='lobby_box2'>
                    <div className='lobby_bbox2'>
                        <GameInput data={lobbyData} />
                        <div id="chat-page">
                            <GameChat />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default GameLobby;