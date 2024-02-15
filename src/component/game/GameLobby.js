import React, {useState, useEffect} from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import GameInput from "./GameInput";
import {LOBBY_URL} from "../../config/host-config";
import GameChat from "./GameChat";
import GameProfileLobby from "./GameProfile_Lobby";
import GameModal from "./GameModal";
import {json, Link} from "react-router-dom";
import GameFooter from "./GameFooter";
import GameRanking from "./GameRanking";
import Header from "../main/Header";



const API_BASE_URL = LOBBY_URL;

const GameLobby = () => {
    const [lobbyData, setLobbyData] = useState([]);
    const [text, setText] = useState();


    useEffect(() => {
        fetch(API_BASE_URL + "?page=1&amount=15")
            .then(res => res.json())
            .then(json => {
                setLobbyData(json);
                setText(json.gno);
            });
    }, [text]);

    return (
        <>
            <Header />
            <div className='aa'>
                <div className='z'>
                    <div className='lobby_container'>
                        <div className='lobby_box1'>
                            <div className='lobby_bbox1'>
                                <GameProfileLobby />
                                <GameRanking/>
                            </div>
                        </div>
                        <div className='lobby_box2'>
                            <div className='lobby_bbox2'>
                                <GameInput data={lobbyData}/>
                                <div id="chat-page">
                                    <GameChat/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lobby_footer'>
                        <GameFooter/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default GameLobby;