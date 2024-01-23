import React from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';

const GameInput = ({ data }) => {
    return (
        <>
            <div className='room_list'>
                {data && data.dto && data.dto.map((item, index) => (
                    <div className="room_container" key={index}>
                        <div className="list">
                            <span>No. {index + 1}</span>
                            <h2>{item.title}</h2>
                            <span>{item.userCount} / {item.lobbyMaxCount}</span>
                            <span className='list_name_right'>{item.userNickname}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default GameInput;
