import React, { useState, useEffect } from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import GameInput from "./GameInput";
import catImage from '../img/star.png';
import {LOBBY_URL} from "../../config/host-config";
import GameChat from "./GameChat";

const API_BASE_URL = LOBBY_URL;

const GameLobby = () => {
    const [lobbyData, setLobbyData] = useState([]);

    // const addRoom = (RoomTitle) => {
    //     console.log('RoomTitle: ', RoomTitle);
    //
    //     const newRoom = {
    //         lobby_title: RoomTitle
    //     };
    //
    //
    //     fetch(API_BASE_URL, {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(newRoom)
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             setLobbyData(json);
    //         });
    // }

    useEffect(() => {
        fetch(API_BASE_URL + "?page=1&amount=6")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setLobbyData(json);
            });
    }, []);

    return (
        <>
            <div className='lobby_menu'>
                <div className='btns_box'>
                    <button className='setting_btn'>Setting</button>
                    <button className='create_room_btn'>Create Room</button>
                    <button className='start_game_btn'>Game Start</button>
                </div>
            </div>
            <div className='lobby_container'>
                <div className='lobby_box1'>
                    <div className='lobby_bbox1'>
                        <div className='profile'>
                            <div className='profile_image'>
                                <img src={catImage} alt="고양이 프로필"/>
                            </div>
                            <p>NickName</p>
                            <p>0승 0패</p>
                        </div>
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