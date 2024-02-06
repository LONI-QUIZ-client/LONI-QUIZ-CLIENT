import React, {useEffect, useRef, useState} from 'react';
import './scss/GamePage.scss';
import {IMG_URL} from '../../config/host-config';
import {SCORE_URL} from '../../config/host-config';
import {useLocation, useNavigate} from "react-router-dom";
import {ID} from "../../config/login-util";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const GamePage = () => {
        const nav = useNavigate();
        const [inputText, setInputText] = useState('');
        const [img, setImg] = useState([]);
        const [messages, setMessages] = useState([]);
        const [newMessage, setNewMessage] = useState('');

        const messageAreaRef = useRef(null);

        const [chatData, setChatData] = useState([]);

        const [input, setInput] = useState('');

        // 문제 정답 담아두기
        const [item, setItem] = useState('');
        // const [count, setCount] = useState('');

        // 유저 정보를 담을 상태 추가
        const [userData, setUserData] = useState([]);

        const [answerKey, setAnswerKey] = useState('');

        const location = useLocation();
        const roomId = location.state?.roomId;
        const userID = localStorage.getItem(ID);

        // 모달
        const [modalOpen, setModalOpen] = useState(false);
        const modalBackground = useRef();

        //이미지를 생성하는 API를 호출하고 그 결과를 처리
        const createImage = async () => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                stompClient.send("/app/game/answerKey", {}, JSON.stringify({
                    gno: roomId,
                    answerKey: inputText
                }));
            });
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

        // 맴버들을 계속 해서 갱신하며 추가한걸 띄워줌
        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.send("/app/game/memberList", {}, JSON.stringify({
                    gno: roomId
                }));
            });

        }, []);

        // 메세지를 받아와서 담아줌
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


        // 멤버리스트에서 비교해서 방이 다 찼는지 비교후 방이 다 찼으면 내보내고 아니면 리스트에 담아줌
        useEffect(() => {
            // Connect to WebSocket server
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/game/memberList', memberList => {
                    const receivedUsers = JSON.parse(memberList.body);
                    console.log("만들어진 방들과 그 방에 유저들", receivedUsers)
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


        // 채팅을 서버에 보내줌

        const inputSubmit = (e) => {
            e.preventDefault();

            if (input === answerKey) {
                console.log("정답!!!!")
                const socket = new SockJS('http://localhost:8888/ws');
                const stompClient = Stomp.over(socket);
                stompClient.connect({}, () => {
                    stompClient.send("/app/game/userPointUp", {}, JSON.stringify({
                        gno: roomId,
                        userId: userID
                    }));
                    stompClient.send("/app/game/answerKey", {}, JSON.stringify({
                        gno: roomId,
                        answerKey: ''
                    }));
                });
            }
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

        //서버에서 시간을 받아옴
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


        // 서버에 시간을 받아오는 요청을 보냄
        const timeHandler = e => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, (frame) => {
                stompClient.send("/app/game/timer", {}, JSON.stringify({}));
            });
        }

        window.onpopstate = function (event) {
            removeUserList()
            alert("방탈출");
        };

        const [thisRoomsUsers, setthisRoomsUsers] = useState([]);

        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
                stompClient.subscribe('/topic/game/exitRoom', function (response) {
                    const exitAfter = JSON.parse(response.body);
                    getList();
                });
            });
        }, []);
        useEffect(() => {
            if (thisRoomsUsers.length > 0) {
                const targetRoomIndex = thisRoomsUsers.findIndex(room => room.gno === roomId);
                const targetRoomMembers = targetRoomIndex >= 0 ? thisRoomsUsers[targetRoomIndex].members : [];
                console.log("w제발", targetRoomMembers)
                const targetUserIndex = targetRoomMembers.findIndex(user => user.userId === userID);
                const targetUser = targetRoomMembers[targetUserIndex].turn;
                setA(targetUser)
                console.log(setA)
                console.log(targetUser)
            }
        }, [thisRoomsUsers])

        const [userBool, setA] = useState(false)
        useEffect(() => {
            // console.log(a)
        }, [userBool])

        // 게임이 시작될 때 방에 있는 사람들의 상태가 만들어지고 그걸 확인
        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/game/start', message => {
                    const roomsUser = JSON.parse(message.body);
                    console.log("방번호와 게임 시작중 쓰일 유저들의 상태", roomsUser)
                    setthisRoomsUsers(roomsUser);
                });
            });
        }, []);

        // 방장을 생성
        const [thisRoomsSU, setThisRoomsSU] = useState([]);
        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.send("/app/game/getSuperUser", {}, JSON.stringify({
                    gno: roomId
                }));
            });
        }, []);

        // 방장이 누군지 확인
        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/game/getSuperUser', superUsers => {
                    const receivedSuperUsers = JSON.parse(superUsers.body);
                    console.log("방장!!!", receivedSuperUsers)
                    setThisRoomsSU(receivedSuperUsers);
                });
            });
        }, []);

        // 이 안에 게임 시작 이후 그 방에 유저와 진행 상태가 담김
        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/game/next', gaming => {
                    const thisRoomGaming = JSON.parse(gaming.body);
                    console.log("방 번호랑 지금 state", thisRoomGaming)
                    setthisRoomsUsers(thisRoomGaming)
                });
            });
        }, []);

        // 정답을 상태변수에 저장
        useEffect(() => {
            // Connect to WebSocket server
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                // Subscribe to topic
                stompClient.subscribe('/topic/game/answerKey', message => {
                    const receivedCheck = JSON.parse(message.body);
                    if (receivedCheck.gno !== roomId) {
                        return
                    }
                    console.log(receivedCheck)
                    setAnswerKey(receivedCheck.answerKey);
                });
            });
        }, []);

        useEffect(() => {
            console.log(answerKey)
        }, [answerKey]);

        // 현재 있는 유저들로 방의 인원을 구성
        const startHandler = () => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
                stompClient.send("/app/game/start", {}, JSON.stringify({
                    gno: roomId
                }));
            });
        }

        // 다음 사람의 state를 true로 변경
        const nextTurnHandler = () => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
                stompClient.send("/app/game/next", {}, JSON.stringify({
                    gno: roomId
                }));
            });
        }


        const [image, setImage] = useState([]);

        useEffect(() => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/game/image', image => {
                    const pickImage = JSON.parse(image.body);
                    if (pickImage.gno !== roomId) {
                        return
                    }
                    setImage(pickImage);
                    console.log(pickImage)
                });
            });
        }, [])

        const imageHandler = e => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
                stompClient.send("/app/game/image", {}, JSON.stringify({
                    image: e.target.src,
                    gno: roomId
                }));
            });
        }

        const exitHandler = () => {
            removeUserList()
            nav('/lobby')
        }

        const removeUserList = () => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
                stompClient.send("/app/game/exitRoom", {}, JSON.stringify({
                    gno: roomId,
                    userId: userID
                }));
            });
        }

        const getList = () => {
            const socket = new SockJS('http://localhost:8888/ws');
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                stompClient.send("/app/game/memberList", {}, JSON.stringify({
                    gno: roomId
                }));
            });
        }
        return (
            <div className='box'>
                <button onClick={timeHandler} className='p'>시작</button>
                <button onClick={startHandler} className='o'>게임시작</button>
                <button onClick={nextTurnHandler} className='i'>턴넘기기</button>
                <button onClick={exitHandler} className='u'>나가기</button>

                <div className='time'>
                    {time}
                </div>
                <div className='a'>
                    <div className='show-img'>
                        <img className='showImg' src={image.image}/>
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
                                                {user.username}
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
                <div className={'btn-wrapper'}>
                    <button
                        className={'modal-open-btn'}
                        onClick={() => setModalOpen(true)}
                        style={{display: userBool !== false ? 'block' : 'none'}}
                    >
                        모달 열기
                    </button>
                </div>
                {
                    modalOpen &&
                    <div className={'modal-container'} ref={modalBackground} onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(true);
                        }
                    }}>
                        <div className='modal-content'>
                            {/* 이미지를 매핑하여 화면에 표시 */}
                            <div className="loading_circle"></div>
                            <div className='imgs'>
                                {img.map((image, index) => (
                                    <img key={index} src={image} alt={`Image ${index}`} className='img'
                                         onClick={imageHandler}/>
                                ))}
                            </div>
                            <div className='items'>
                                <input
                                    placeholder="제시어를 입력해주세요!"
                                    type='text'
                                    className='input'
                                    value={inputText}
                                    onChange={handleInputChange}
                                    onKeyPress={handleInputKey}
                                />
                                <button className='create' onClick={createImage}>
                                    사진만들기
                                </button>
                                <button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
                                    모달 닫기
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <div className='chat'>
                    <ul className='chat-log' id="messageArea" ref={messageAreaRef}>
                        {/* 채팅 메시지를 화면에 역순으로 표시 */}
                        {chatData
                            .filter(item => roomId === item.gno)
                            .reverse()
                            .map((item, index) => (
                                <li key={index}>
                                    <span>{item.userId}: {item.content}</span>
                                </li>
                            ))
                        }
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
