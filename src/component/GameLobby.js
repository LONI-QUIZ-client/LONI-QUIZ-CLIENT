import React from 'react';
import './scss/GameLobby.scss';
import './css/GameLobby.css';

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
                            <button className='setting_btn'>Setting</button>
                            <button className='create_room_btn'>Create Room</button>
                            <button className='start_game_btn'>Game Start</button>
                        </div>
                    </div>
                </div>

                <div className= 'lobby_box2'>
                    <div className= 'lobby_bbox2'>
                        <div className='room_list'>
                            <div className="room_container">
                                <div className="list">
                                    <span>No. 1</span>
                                    <h2>TEST 1 </h2>
                                    <span>0 / 6</span>
                                </div>
                                <div className="list">
                                    <span>No. 2</span>
                                    <h2>TEST 1 </h2>
                                    <span>0 / 6</span>
                                </div>
                                <div className="list">
                                    <span>No. 3</span>
                                    <h2>TEST 1 </h2>
                                    <span>0 / 6</span>
                                </div>
                                <div className="list">
                                    <span>No. 4</span>
                                    <h2>TEST 1 </h2>
                                    <span>0 / 6</span>
                                </div>
                                <div className="list">
                                    <span>No. 5</span>
                                    <h2>TEST 1 </h2>
                                    <span>0 / 6</span>
                                </div>
                                <div className="list">
                                    <span>No. 6</span>
                                    <h2>TEST 1 </h2>
                                    <span>0 / 6</span>
                                </div>
                                <div className="list">
                                    <span>No. 7</span>
                                    <h2>TEST 1 </h2>
                                    <span>0 / 6</span>
                                </div>
                            </div>
                        </div>
                        <div id="chat-page">
                            <div className="chat-container">
                                <ul id="messageArea">
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>
                                    <li>
                                        <span>NickName : 야</span>
                                    </li>

                                </ul>
                                <form id="messageForm" name="messageForm">
                                    <div className="form-group">
                                        <div className="input-group clearfix">
                                            <textarea id="message" placeholder="채팅 입력..." autoComplete="off" className="form-control"></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameLobby;