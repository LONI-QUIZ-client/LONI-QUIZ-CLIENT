import React, {useState, useEffect} from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';
import {redirect, useNavigate} from "react-router-dom";
import {ID, USERNAME} from '../../config/login-util';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import GameModal from "./GameModal";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const GameInput = ({data}) => {
    const itemsPerPage = 6; // 한 페이지당 보여질 아이템 개수
    const [currentPage, setCurrentPage] = useState(1);
    const [fullMember, setFullMember] = useState(false);
    const userId = localStorage.getItem(ID);
    const username = localStorage.getItem(USERNAME);


    // data.dto가 없거나 undefined인 경우 빈 배열로 초기화
    const dtoArray = data && data.dto ? data.dto : [];

    // 현재 페이지에 해당하는 리스트 가져오기
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return dtoArray.slice(startIndex, endIndex);
    };

    // 전체 페이지 개수 계산
    const totalPageCount = Math.ceil(dtoArray.length / itemsPerPage);

    // 페이지 변경 시 호출될 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const redirect = useNavigate()

    useEffect(() => {
        // Connect to WebSocket server
        const socket = new SockJS('http://localhost:8888/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/game/members', memberList => {
                const receivedUsers = JSON.parse(memberList.body);
                console.log(receivedUsers)
                const isFullBoolean = !!receivedUsers.isFull;
                console.log(isFullBoolean)
                setFullMember(isFullBoolean)


            });
        });
    }, []);

    useEffect(() => {
        console.log(fullMember);
    }, [fullMember]);

    const StartGameRoom = (roomId, maxCount) => {
        const socket = new SockJS('http://localhost:8888/ws');
        const stompClient = Stomp.over(socket);

        console.log("전송!!!!!!!!!")
        stompClient.connect({}, () => {
            stompClient.send("/app/game/members", {}, JSON.stringify({
                userId: userId,
                gno: roomId,
                username: username,
                maxUser: maxCount
            }));
        });
        redirect('/gameRoom', {state: {roomId}});


    }

    return (
        <>
            <div className='lobby_search_room_box'>
                <Paper
                    className = 'room_search_form'
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Room"
                        inputprops={{ 'aria-label': 'search room' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            <div className='room_list'>
                {getCurrentPageItems().map((item, index) => (
                    <div className="room_container" key={index} onClick={() => {
                        StartGameRoom(item.gno, item.maxCount)
                    }}>
                        <div className="list">
                            <p>No. {index + 1 + (currentPage - 1) * itemsPerPage}</p>
                            <h2>{item.title}</h2>
                            <p>{item.userCount} / {item.lobbyMaxCount}</p>
                            <p className='list_name_right'>{item.userNickname}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='room_footer'>
                <div className="pagination">
                    {Array.from({length: totalPageCount}, (_, i) => i + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={currentPage === pageNumber ? 'active' : ''}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
                <div>
                    <GameModal/>
                </div>
            </div>
        </>
    );
};

export default GameInput;
