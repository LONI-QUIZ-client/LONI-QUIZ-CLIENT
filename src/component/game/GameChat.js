import React, { useEffect, useState, useRef } from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
// Import LOBBY_CHAT from the local host config
import { LOBBY_CHAT } from "../../config/host-config";

const GameChat = () => {
    const [input, setInput] = useState('');
    const [chatData, setChatData] = useState([]);
    const userId = "yy123";
    const messageAreaRef = useRef(null);

    useEffect(() => {
        // Connect to WebSocket server
        const socket = new SockJS('http://localhost:8888/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            // Subscribe to topic
            stompClient.subscribe('/topic/messages', message => {
                const receivedMessage = JSON.parse(message.body);
                setChatData(prevChatData => [...prevChatData, receivedMessage]);
            });
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the message area when chatData changes
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [chatData]);

    const inputSubmit = (e) => {
        e.preventDefault();

        // Send message via WebSocket
        const socket = new SockJS('http://localhost:8888/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.send("/app/chat", {}, JSON.stringify({
                nickname: userId,
                content: input
            }));
        });

        setInput('');
    }

    return (
        <>
            <div className="chat-container">
                <ul id="messageArea" ref={messageAreaRef}>
                    {chatData.map((item, index) => (
                        <li key={index}>
                            <span>{item.nickname}: {item.content}</span>
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
