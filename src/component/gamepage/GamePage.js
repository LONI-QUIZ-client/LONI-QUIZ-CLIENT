import React, { useState } from 'react';
import './scss/GamePage.scss';
import { IMG_URL } from '../../config/host-config';

const GamePage = () => {
    const [inputText, setInputText] = useState('');
    const [img, setImg] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

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
            } else {
                console.error('API 호출 실패');
            }
        } catch (error) {
            console.error('API 호출 중 에러:', error);
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const sendMessage = () => {
        setMessages([newMessage, ...messages]);
        setNewMessage('');
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
                    />
                    <button className='create' onClick={createImage}>
                        사진만들기
                    </button>
                </div>
                <div className='user-list'>
                    <div className='user'>1</div>
                    <div className='user'>2</div>
                    <div className='user'>3</div>
                    <div className='user'>4</div>
                    <div className='user'>5</div>
                    <div className='user'>6</div>
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
                        value={newMessage}
                        onChange={handleNewMessageChange}
                    />
                    <button onClick={sendMessage}>전송</button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
