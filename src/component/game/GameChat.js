import React, {useState} from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';

const GameInput = () => {
    const [input,setInput]=useState('');
    function inputSubmit(e) {
        e.preventDefault();
        setInput(document.getElementById('message').value);
        console.log(input);

    }

    return (
        <>
            <div className="chat-container">
                <ul id="messageArea">
                    <li className="aaa">
                        <span>NickName : 야</span>
                    </li>
                </ul>
                <form id="messageForm" name="messageForm" onSubmit={inputSubmit}>
                    <div className="form-group">
                        <div className="input-group clearfix">
                            <input id="message" placeholder="채팅 입력..." autoComplete="off" className="form-control"></input>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default GameInput;