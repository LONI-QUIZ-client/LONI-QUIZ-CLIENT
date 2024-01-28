import React, { useState } from 'react';
import './scss/GamePage.scss';
import { IMG_URL } from '../../config/host-config';

const GamePage = () => {
    const [inputText, setInputText] = useState('');
    const [img, setImg] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [item, setItem ] = useState('');
    // const [count, setCount] = useState('');

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
            if (newMessage === item){
                console.log('정답')
            }
            else {
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

    return (
        <div className='box'>
            <div className='a'>
                <div className='show-img'>
                    {/* 이미지를 매핑하여 화면에 표시 */}
                    {img.map((image, index) => (
                        <img key={index} src={image} alt={`Image ${index}`} className='img' />
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
                    <div className='user'>
                        <div className='l-a'>
                            <div className='p-img'>
                                <img src={process.env.PUBLIC_URL + "/img/Main.png"} alt=""/>
                            </div>
                            <div className='nick-name'>
                                asd
                            </div>
                        </div>
                        <div className='score'>
                            <div>
                                10점
                            </div>
                        </div>
                    </div>
                    <div className='user'></div>
                    <div className='user'></div>
                    <div className='user'></div>
                    <div className='user'></div>
                    <div className='user'></div>
                </div>
            </div>
            <div className='chat'>
                <div className='chat-log'>
                    {/* 채팅 메시지를 화면에 표시 */}
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <div className='chat-input'>
                    <input
                        type='text'
                        className='chating'
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        onKeyPress={handleInputKeyPress}
                    />
                    <button onClick={sendMessage}>전송</button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
