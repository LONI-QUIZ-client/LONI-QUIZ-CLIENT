import React from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';

const GameInput = () => {
    return (
        <>
            <div className="chat-container">
                <ul id="messageArea">
                    <li>
                        <span>NickName : 야</span>
                    </li>
                </ul>
                <form id="messageForm" name="messageForm">
                    <div className="form-group">
                        <div className="input-group clearfix">
                            <textarea id="message" placeholder="채팅 입력..." autoComplete="off" className="form-control" ></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default GameInput;