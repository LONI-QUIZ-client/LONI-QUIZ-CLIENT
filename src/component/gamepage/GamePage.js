import React, {useEffect, useRef, useState} from 'react';
import './scss/GamePage.scss';
import {IMG_URL} from '../../config/host-config';
import {SCORE_URL} from '../../config/host-config';
import {useLocation, useNavigate} from "react-router-dom";
import {ID, USERNAME} from "../../config/login-util";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";


const GamePage = () => {
    const nav = useNavigate();
    // 방장 확인
    const [thisRoomsSU, setThisRoomsSU] = useState([]);
    const [choicedImg, setChoicedImg] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    // 임의로 턴을 넘김
    const [nextTurn, setNextTurn] = useState(false);
    // 스피너 확인
    const [showSpinner, setShowSpinner] = useState(false);
    // 입력값 확인
    const [inputText, setInputText] = useState('');
    const [img, setImg] = useState([]);
    const [answerUserId, setAnswerUserId] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageAreaRef = useRef(null);
    const [userBool, setA] = useState(false)
    const [chatData, setChatData] = useState([]);
    const [image, setImage] = useState([]);
    const [thisRoomsUsers, setthisRoomsUsers] = useState([]);
    const [roomMembers, setRoomMembers] = useState([]);
    const [input, setInput] = useState('');
    const [time, setTime] = useState();
    const [resHA, setResHA] = useState(false);
    // const [g, setG] = useState();
    // 문제 정답 담아두기
    const [item, setItem] = useState('');
    // 유저 정보를 담을 상태 추가
    const [userData, setUserData] = useState([]);
    const [answerKey, setAnswerKey] = useState('');
    // const [count, setCount] = useState('');
    const [hidden, setHidden] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const location = useLocation();
    const roomId = location.state?.roomId;
    const userID = localStorage.getItem(ID);
    const username = localStorage.getItem(USERNAME);
    // 모달
    const modalBackground = useRef();
    // 버튼 활성화 여부
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    // 게임 끝났을 때 뜨는 모달
    const [endGame, setEndGame] = useState(false);
    const BACK_URL = 'http:///3.37.194.146/ws';

    // 정답 모달
    const openModal = (e) => {
        setIsOpen(true);
        setModalContent(e)
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    // end 모달
    const openModalz = (e) => {
        setEndGame(true);
        setModalContent(e)
    };
    const closeModalz = () => {
        setEndGame(false);
        window.location.href = '/lobby'
    };
    const handleBackgroundClickz = (event) => {
        if (event.target === event.currentTarget) {
            closeModalz();
        }
    };

    //이미지를 생성하는 API를 호출하고 그 결과를 처리
    const createImage = async () => {

        try {
            const res = await fetch(IMG_URL, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    prompt: inputText,
                }),
            });
            if (res.status === 200) {

                const imgData = await res.json();
                setImg(imgData.image);
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
    // 이미지 생성 input 엔터키 이벤트 처리
    const handleInputKey = (e) => {
        if (e.key === 'Enter') {
            createImage();
            setItem(e.target.value)
        }
    };
    // 맴버들을 계속 해서 갱신하며 추가한걸 띄워줌
    useEffect(() => {
        const socket = new SockJS(BACK_URL);
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
        const socket = new SockJS(BACK_URL);
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
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/game/memberList', memberList => {
                const receivedUsers = JSON.parse(memberList.body);
                const filteredUser = receivedUsers.filter(user => user.gno === roomId);
                const userExists = receivedUsers.some(user => user.userId === userID && user.gno === roomId);
                if (!userExists) {
                    window.location.href = '/lobby';
                }
                setUserData(filteredUser);
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

            const socket = new SockJS(BACK_URL);
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                stompClient.send("/app/game/userPointUp", {}, JSON.stringify({
                    gno: roomId, userId: userID
                }));
            });
        }
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.send("/app/game/chat", {}, JSON.stringify({
                gno: roomId, userId: username, content: input
            }));
        });
        setInput('');
    }
    // 정답자 확인
    useEffect(() => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/game/userPointUp', response => {
                const answerUser = JSON.parse(response.body);
                setAnswerUserId(answerUser.userId);
            });
        });
    }, []);

    useEffect(() => {
        if (answerUserId === '') {
        } else {
            hasAnswer()
            setAnswerUserId('')
            setNextTurn(false);
            if (thisRoomsSU[0].userId === userID) {
                nextTurnHandler();
            }

        }
    }, [answerUserId]);


    const hasAnswer = () => {

        openModal(answerKey)

    }

    const hasntAnswer = () => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.send("/app/game/hasntAnswer", {}, JSON.stringify({}));
        });
    }
    useEffect(() => {
        if (resHA) {
            openModal(answerKey)
            setNextTurn(false);
            if (thisRoomsSU[0].userId === userID) {
                nextTurnHandler();
            }
            setResHA(false)
        }
    }, [resHA]);

    useEffect(() => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.subscribe('/topic/game/hasntAnswer', function (response) {
                const responseHasntAnswer = JSON.parse(response.body);
                setResHA(responseHasntAnswer)
            });
        });
    }, []);


    // //서버에서 시간을 받아옴
    // useEffect(() => {
    //     const socket = new SockJS(BACK_URL);
    //     const stompClient = Stomp.over(socket);
    //     stompClient.connect({}, (frame) => {
    //         stompClient.subscribe('/topic/game/timer/' + roomId, function (response) {
    //             let countdownValue = JSON.parse(response.body);
    //             setG(countdownValue.gno);
    //             setTime(countdownValue.time);
    //         });
    //     });
    // }, [roomId]);
    //
    // // 서버에 시간을 받아오는 요청을 보냄
    // const timeHandler = e => {
    //     const socket = new SockJS(BACK_URL);
    //     const stompClient = Stomp.over(socket);
    //     stompClient.connect({}, (frame) => {
    //         stompClient.send("/app/game/timer/" + roomId, {}, JSON.stringify({
    //             gno: roomId
    //         }));
    //     });
    // }

    const gameEnd = () => {
        setEndGame(true)
        if (thisRoomsSU[0].userId === userID) {
            const socket = new SockJS(BACK_URL);
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                stompClient.send("/app/game/gameEnd", {}, JSON.stringify({
                    gno: roomId
                }));
            });
        }
    }

    useEffect(() => {
        if (thisRoomsUsers.length > 0) {
            const targetRoomIndex = thisRoomsUsers.findIndex(room => room.gno === roomId);
            const targetRoomMembers = targetRoomIndex >= 0 ? thisRoomsUsers[targetRoomIndex].members : [];
            setRoomMembers(targetRoomMembers)
            if (thisRoomsUsers[targetRoomIndex].count / targetRoomMembers.length === thisRoomsSU[0].lobbyMaxCount) {
                gameEnd();
            }
            const targetUserIndex = targetRoomMembers.findIndex(user => user.userId === userID);
            const targetUser = targetRoomMembers[targetUserIndex].turn;
            setA(targetUser)
        }
    }, [thisRoomsUsers])

    useEffect(() => {
    }, [roomMembers]);

    // 유저 턴
    // 게임이 시작될 때 방에 있는 사람들의 상태가 만들어지고 그걸 확인
    useEffect(() => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/game/start', message => {
                const roomsUser = JSON.parse(message.body);
                setthisRoomsUsers(roomsUser);
            });
        });
    }, []);
    // 방장을 생성
    useEffect(() => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.send("/app/game/getSuperUser", {}, JSON.stringify({
                gno: roomId
            }));
        });
    }, []);
    useEffect(() => {
    }, [thisRoomsSU])
    // 방장이 누군지 확인
    useEffect(() => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/game/getSuperUser', superUsers => {
                const receivedSuperUsers = JSON.parse(superUsers.body);
                const filteredUsers = receivedSuperUsers.filter(user => user.gno === roomId);
                setThisRoomsSU(filteredUsers);
            });
        });
    }, []);
    // 이 안에 게임 시작 이후 그 방에 유저와 진행 상태가 담김
    useEffect(() => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/game/next', gaming => {
                const thisRoomGaming = JSON.parse(gaming.body);
                setthisRoomsUsers(thisRoomGaming)
            });
        });
    }, []);
    // 정답을 상태변수에 저장
    useEffect(() => {
        // Connect to WebSocket server
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            // Subscribe to topic
            stompClient.subscribe('/topic/game/answerKey', message => {
                const receivedCheck = JSON.parse(message.body);
                if (receivedCheck.gno !== roomId) {
                    return
                }
                setAnswerKey(receivedCheck.answerKey);
            });
        });
    }, []);
    useEffect(() => {
    }, [answerKey]);

    // 현재 있는 유저들로 방의 인원을 구성
    const startHandler = () => {
        setHidden(true);
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.send("/app/game/start", {}, JSON.stringify({
                gno: roomId
            }));
        });
    }
    // 다음 사람의 state를 true로 변경
    const nextTurnHandler = () => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.send("/app/game/next", {}, JSON.stringify({
                gno: roomId
            }));
            stompClient.send("/app/game/answerKey", {}, JSON.stringify({
                gno: roomId, answerKey: ''
            }));
        });
        setNextTurn(false);

    }
    useEffect(() => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/game/image', image => {
                const pickImage = JSON.parse(image.body);
                if (pickImage.gno !== roomId) {
                    return
                }
                setImage(pickImage);
                // 사진 보낸 후 모달 닫기 버튼 null
                setSelectedImage(null);
            });
        });
    }, [])
    const imageHandler = e => {
        setChoicedImg(e.target.src)
        setSelectedImage(e.target.src)
    }
    const sendImageHandler = e => {
        setInputText("");
        setImg([]);
        setModalOpen(false);
        setNextTurn(true);
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.send("/app/game/image", {}, JSON.stringify({
                image: choicedImg, gno: roomId
            }));
            stompClient.send("/app/game/answerKey", {}, JSON.stringify({
                gno: roomId, answerKey: inputText
            }));
        });
    }
    // 나가기
    const removeUserList = () => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.send("/app/game/exitRoom", {}, JSON.stringify({
                gno: roomId, userId: userID
            }));
        });
        setTimeout(() => {
            alert("방탈출")
            window.location.href = '/lobby'
        }, 500)
    }
    const exitHandler = () => {
        removeUserList()
    }
    window.onpopstate = function (event) {
        removeUserList()
    };

    useEffect(() => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.subscribe('/topic/game/exitRoom', function (response) {
                const exitAfter = JSON.parse(response.body);
                getList();
            });
        });
    }, []);
    const getList = () => {
        const socket = new SockJS(BACK_URL);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.send("/app/game/memberList", {}, JSON.stringify({
                gno: roomId
            }));
        });
    }
    // 이미지가 로딩되었을 때 스피너를 숨깁니다.
    useEffect(() => {
        if (img.length > 0) {
            setShowSpinner(false);
        }
    }, [img]);

    return (
        <div className='box'>
            <button onClick={exitHandler} className="btn-style btn1 btn-exit">exit</button>
            {isOpen && (
                <div className="modal-background" onClick={handleBackgroundClick}>
                    <div className="answer-modal">
                        <div className="modal-content">
                            <p className='answer-text'>정답은 {modalContent}입니다.</p>
                            <button className="btn-style btn1 close" onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
            {(!isOpen && endGame) && (
                <div className="modal-background" onClick={handleBackgroundClickz}>
                    <div className="end-modal">
                        <div className="modal-content">
                            <p className='end-text'>게임 결과</p>
                            <div className='user-score'>
                                {(userData.length > 0 || roomMembers.length > 0) && (
                                    (roomMembers.length > 0 ? roomMembers : userData).map((user, index) => (
                                        <div className='end-user-score' key={index}>
                                            <div className='end-user-table'>
                                                <div className='end-nick-name'>
                                                    {roomMembers.length > 0 ? user.name : user.username}
                                                </div>
                                            </div>
                                            <div className='end-score'>
                                                <div> : {roomMembers.length > 0 ? user.point : 0}점</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <button className="btn-style btn1 end-close" onClick={closeModalz}>나가기
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='a'>
                <div className='show-img'>
                    <img className='showImg' src={image.image}/>
                    <div className='w'>
                        <button className="btn1 btn-jittery"
                                onClick={() => {
                                    setModalOpen(true);
                                    // btn-jittery 클릭 시 btn2를 보이도록 설정하고 btn-jittery를 숨김
                                    document.querySelector('.btn2').style.display = 'block';
                                    document.querySelector('.btn-jittery').style.display = 'none';
                                }}
                                style={{display: userBool !== false ? 'block' : 'none'}}>
                            문제 내기!
                        </button>
                        <button className="btn2 btn-style"
                                onClick={hasntAnswer}
                                style={{display: userBool !== false && nextTurn === true ? 'block' : 'none'}}>
                            턴 넘기기
                        </button>
                    </div>
                </div>
                {
                    thisRoomsSU.length > 0 && thisRoomsSU[0].userId === userID && (
                        userData.length > 1 ? (
                            <button onClick={startHandler} className={hidden ? 'o hidden' : 'o btn-style btn3'}>게임시작</button>
                        ) : (
                            <button disabled className={'o btn-style btn3'}>게임시작</button>
                        )
                    )
                }
                <div className='user-list'>
                    <div className='user'>
                        {(userData.length > 0 || roomMembers.length > 0) && (
                            (roomMembers.length > 0 ? roomMembers : userData).map((user) => (
                                <div className='l-a animated-slide-in'>
                                    <div className='user-table'>
                                        <div className='profile'>
                                            <img src={roomMembers.length > 0 ? user.profileImage : user.profileImage}
                                                 alt="프로필 이미지"/>
                                        </div>
                                        <div className='nick-name'>
                                            {roomMembers.length > 0 ? user.name : user.username}
                                        </div>
                                    </div>
                                    <div className='score'>
                                        <div>{roomMembers.length > 0 ? user.point : 0}점</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {
                modalOpen && <div className={'modal-container'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(true);
                    }
                }}>
                    <div className='modal-content'>
                        <div className="loading_circle" style={{display: showSpinner ? 'block' : 'none'}}></div>
                        <div className='imgs'>
                            {img.map((image, index) => (<img key={index}
                                                             src={image}
                                                             alt={`Image ${index}`}
                                                             className={`img ${selectedImage === image ? 'selected' : ''}`}
                                                             onClick={imageHandler}/>))}
                        </div>
                        <div className='items'>
                            <input
                                placeholder="제시어를 입력해주세요!"
                                type='text'
                                className='input'
                                value={inputText}
                                onChange={handleInputChange}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        handleInputKey(event);
                                        setShowSpinner(true);
                                    }
                                }}
                            />
                            <div className='buttons'>
                                <button className='create btn1 btn-style' onClick={() => {
                                    createImage();
                                    setShowSpinner(true);
                                }}>
                                    사진만들기
                                </button>
                                <button
                                    className={'modal-close-btn btn1 btn-style'}
                                    onClick={() => {
                                        sendImageHandler();
                                    }}
                                    disabled={selectedImage === null}
                                >
                                    선택하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='chat'>
                <ul className='chat-log' id="messageArea" ref={messageAreaRef}>
                    {chatData
                        .filter(item => roomId === item.gno)
                        .reverse()
                        .map((item, index) => (
                            <li key={index}>
                            <span
                                style={{color: item.userId === username ? 'green' : 'black'}}>{item.userId}: {item.content}</span>
                            </li>
                        ))
                    }
                </ul>
                <form className='chat-input' name="messageForm" onSubmit={inputSubmit}>
                    <div className="input-group clearfix">
                        <input
                            id="messagee"
                            placeholder="채팅 입력..."
                            autoComplete="off"
                            className="form-control"
                            value={input}
                            disabled={userBool !== false}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default GamePage;
