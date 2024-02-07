import React from 'react';

const ChatSection = () => {
    return (
        <div className='chat_friend_menu_ch'>
            <div className='chat_friend_menu_ch_header'>
                <h2>Chat</h2>
                <button>나가기</button>
            </div>
            <div className='chat_texts'>
                <div className='text_balloon'>
                    <p>친구 1</p>
                    <p>ㅎㅇ...</p>
                </div>
            </div>
            <div className='my_input_text'>
                <input type="text" placeholder="Type your message" />
                <button>Send</button>
            </div>
        </div>
    );
};

export default ChatSection;