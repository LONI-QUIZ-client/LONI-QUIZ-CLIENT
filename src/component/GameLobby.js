import React from 'react';
import './scss/GameLobby.scss';

const GameLobby = () => {
    return (
        <>
            <div className= 'lobby_container'>
                <div className= 'lobby_box1'>
                    <div className= 'lobby_bbox1'>
                        <div className= 'profile'>
                            <div className='profile_image'></div>
                            <p>NickName</p>
                            <p>0승 0패</p>
                        </div>
                        <div className='btns_box'>
                            <button className='setting_btn'>환경설정</button>
                            <button className='create_room_btn'>방만들기</button>
                            <button className='start_game_btn'>게임시작</button>
                        </div>
                    </div>
                </div>
                <div className= 'lobby_box2'>
                    <div className= 'lobby_bbox2'>
                        <div className='room_list'>
                            <ul>
                                <li>
                                    <h2>방 번호: </h2>
                                    <h2>제목: </h2>
                                    <h2>0/0</h2>
                                </li>
                            </ul>
                        </div>
                        <div className='chat_box'>
                            <ul>
                                <li>
                                    <p>nickname: text.</p>
                                </li>
                                <li>
                                    <p>nickname: text.</p>
                                </li>
                                <li>
                                    <p>nickname: text.</p>
                                </li>
                            </ul>
                            <form id='messageForm' name="messageForm">
                                <div className="input-group clearfix">
                                    <input className='test1'/>
                                    <input type="text" style={{ display: 'none' }} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameLobby;