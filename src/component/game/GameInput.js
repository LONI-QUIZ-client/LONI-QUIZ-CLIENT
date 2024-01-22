import React, {useState} from 'react';

import './scss/TodoInput.scss';

const GameInput = ({ onAdd }) => {

    // useState는 렌더링 상태를 관리하는 변수지정 리액트 훅
    const [open, setOpen] = useState(false);

    const [RoomTitle, setLobbyData] = useState('');



    return (
        <>
            {
                <div className='room_list'>
                    <div className="room_container">
                        <div className="list">
                            <span>No. 1</span>
                            <h2>TEST 1 </h2>
                            <span>0 / 6</span>
                            <span className='list_name_right'>username</span>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default GameInput;