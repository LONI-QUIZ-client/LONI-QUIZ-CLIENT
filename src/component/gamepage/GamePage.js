import React, {useEffect, useRef, useState} from 'react';
import './scss/GamePage.scss';
import {IMG_URL} from '../../config/host-config';
import {SCORE_URL} from '../../config/host-config';
import {useLocation, useNavigate} from "react-router-dom";
import {ID} from "../../config/login-util";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {connect} from "react-redux";


const GamePage = () => {
        const [inputText, setInputText] = useState('');
        const [img, setImg] = useState([]);
        const [messages, setMessages] = useState([]);
        const [newMessage, setNewMessage] = useState('');

        const messageAreaRef = useRef(null);

        const [chatData, setChatData] = useState([]);

        const [input, setInput] = useState('');

        // 문제 정답 담아두기
        const [item, setItem] = useState('');

        // 유저 정보를 담을 상태 추가
        const [userData, setUserData] = useState([]);

        const [image, setImage] = useState();

        const location = useLocation();
        const roomId = location.state?.roomId;
        const userID = localStorage.getItem(ID);


        //이미지를 생성하는 API를 호출하고 그 결과를 처리
        const createImage = async () => {
            try {
                const res = await fetch(IMG_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: inputText,
                    }),
                });

                if (res.status === 200) {
                    console.log('API 호출 성공');
                    const imgData = await res.json();
                    setImg(imgData.image);
                    console.log(item)
                } else {
                    console.error('API 호출 실패');
                }
            } catch (error) {
                console.error('API 호출 중 에러:', error);
            }
        };

        //이미지생성 인풋에 텍스트를 입력할 때마다 입력된 값을 상태로 업데이트
        const handleInputChange = (e) => {
            setInputText(e.target.value);
        };

        //채팅창에 텍스트를 입력할 때마다 입력된 값을 상태로 업데이트
        const handleNewMessageChange = (e) => {
            setNewMessage(e.target.value);
        };

        // 채팅
        const sendMessage = () => {
            setMessages([newMessage, ...messages]);
            setNewMessage('');
        };

        // 채팅 input 엔터키 이벤트 처리
        const handleInputKeyPress = (e) => {
            // 엔터 키를 눌렀을 때 sendMessage 함수 호출
            if (e.key === 'Enter') {
                sendMessage();
                if (newMessage === item) {
                    console.log('정답')
                } else {
                    console.log('땡')
                }
            }
        };

        // 이미지 생성 input 엔터키 이벤트 처리
        const handleInputKey = (e) => {
            if (e.key === 'Enter') {
                createImage();
                setItem(e.target.value)
            }
        };

        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.send("/app/game/memberList", {}, JSON.stringify({
                    gno: roomId
                }));
            });

        }, []);

        useEffect(() => {
            // Connect to WebSocket server
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                // Subscribe to topic
                stompClient.subscribe('/topic/game/messages', message => {
                    const receivedMessage = JSON.parse(message.body);
                    setChatData(prevChatData => [...prevChatData, receivedMessage]);
                });
            });
        }, []);

        useEffect(() => {
            // Connect to WebSocket server
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/game/memberList', memberList => {
                    const receivedUsers = JSON.parse(memberList.body);
                    console.log(receivedUsers)
                    const userExists = receivedUsers.some(user => user.userId === userID && user.gno === roomId);
                    if (!userExists) {
                        alert("방이 다 찼습니다.")
                        window.location.href = '/lobby';
                    }
                    setUserData(receivedUsers);
                });
            });
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
                stompClient.send("/app/game/chat", {}, JSON.stringify({
                    gno: roomId,
                    userId: userID,
                    content: input
                }));
            });
            setInput('');
        }


        const [time, setTime] = useState();

        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, (frame) => {
                stompClient.subscribe('/topic/game/timer', function (response) {
                    let countdownValue = JSON.parse(response.body);
                    setTime(countdownValue)
                });
            });
        }, []);

        const timeHandler = e => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, (frame) => {
                stompClient.send("/app/game/timer", {}, JSON.stringify({}));
            });
        }


        useEffect(() => {

            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/game/image', image => {
                    const images = image.body;
                    setImage(images)
                });
            });
        }, []);


        const imageHandler = e => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, (frame) => {
                stompClient.send("/app/game/image", {}, JSON.stringify({
                    image: e.target.src
                }));
            });
        }


        window.onpopstate = function (event) {
            alert("방탈출");
        };

        return (
            <div className='box'>

                <img src={image}/>
                <button onClick={timeHandler}></button>
                <div>{time}</div>

                <div className='a'>
                    <div className='show-img'>
                        {/* 이미지를 매핑하여 화면에 표시 */}
                        {img.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index}`} className='img' onClick={imageHandler}/>
                        ))}
                        <input
                            type='text'
                            className='input'
                            value={inputText}
                            onChange={handleInputChange}
                            onKeyPress={handleInputKey}
                        />
                        <button className='create' onClick={createImage}>
                            사진만들기
                        </button>
                    </div>
                    <div className='user-list'>
                        {/* 받아온 유저 정보를 활용하여 화면에 표시 */}
                        {userData && (
                            userData.map((user, index) => (
                                roomId === user.gno && (
                                    <div key={index} className='user'>
                                        <div className='l-a'>
                                            {/*<div className='p-img'>*/}
                                            {/*    <img src={user.profile} alt={`Profile ${index}`} />*/}
                                            {/*</div>*/}
                                            <div className='nick-name'>
                                                {user.id}
                                            </div>
                                        </div>
                                        <div className='score'>
                                            <div>
                                                {user.username}점
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        )}
                    </div>
                </div>
                <div className='chat'>
                    <ul className='chat-log' id="messageArea" ref={messageAreaRef}>
                        {/* 채팅 메시지를 화면에 표시 */}
                        {chatData.map((item, index) => (
                            roomId === item.gno && (
                                <li key={index}>
                                    <span>{item.userId}: {item.content}</span>
                                </li>
                            )
                        ))}

                    </ul>
                    <form className='chat-input' name="messageForm" onSubmit={inputSubmit}>
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
            </div>
        );


    }
;

export default GamePage;
