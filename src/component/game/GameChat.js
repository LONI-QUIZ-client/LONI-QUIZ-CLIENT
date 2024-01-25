import React, { useEffect, useState } from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import { LOBBY_CHAT } from "../../config/host-config";

const GameChat = () => {
    const [input, setInput] = useState('');
    const [chatData, setChatData] = useState([]);
    const userId = "yy123";

    const inputSubmit = (e) => {
        e.preventDefault();

        fetch(LOBBY_CHAT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: input,
                userId: userId
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setInput('');
            });
    }

    useEffect(() => {
        fetch(LOBBY_CHAT)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setChatData(json.chats || []);
            })
            .catch(error => {
                console.error("Error fetching chat data:", error);
                setChatData([]);
            });
    }, [chatData]);

    return (
        <>
            <div className="chat-container">
                <ul id="messageArea">
                    {chatData.map((item, index) => (
                        <li key={index} reversed>
                            <span>{item.nickName}: {item.allCmContent}</span>
                        </li>
                    ))}
                </ul>
                <form id="messageForm" name="messageForm" onSubmit={inputSubmit}>
                    <div className="form-group">
                        <div className="input-group clearfix">
                            <input
                                id="message"
                                placeholder="채팅 입력..."
                                autoComplete="off"
                                className="form-control"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default GameChat;
