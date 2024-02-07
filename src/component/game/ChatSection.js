import React, { useState } from 'react';

const ChatSection = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') {
            return; // 빈 메시지는 보내지 않음
        }

        // 이전 메시지와 새로운 메시지를 합쳐서 업데이트
        setChatMessages(prevMessages => [
            ...prevMessages,
            { text: inputMessage, sender: 'me' },
        ]);

        // 입력 필드 초기화
        setInputMessage('');
    };

    return (
        <div className='chat_friend_menu_ch'>
            <div className='chat_friend_menu_ch_header'>
                <h2>Chat</h2>
                <button>나가기</button>
            </div>
            <div className='chat_texts'>
                {chatMessages.map((message, index) => (
                    <div key={index} className={message.sender === 'me' ? 'my_text_balloon' : 'your_text_balloon'}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className='my_input_text'>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={inputMessage}
                    onChange={handleInputChange}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatSection;
