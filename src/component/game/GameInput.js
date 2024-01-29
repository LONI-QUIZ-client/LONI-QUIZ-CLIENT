import React, { useState, useEffect } from 'react';
import '../scss/GameLobby.scss';
import '../css/GameLobby.css';

const GameInput = ({ data }) => {
    const itemsPerPage = 6; // 한 페이지당 보여질 아이템 개수
    const [currentPage, setCurrentPage] = useState(1);

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

    return (
        <>
            <div className='room_list'>
                {getCurrentPageItems().map((item, index) => (
                    <div className="room_container" key={index}>
                        <div className="list">
                            <p>No. {index + 1 + (currentPage - 1) * itemsPerPage}</p>
                            <h2>{item.title}</h2>
                            <p>{item.userCount} / {item.lobbyMaxCount}</p>
                            <p className='list_name_right'>{item.userNickname}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPageCount }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={currentPage === pageNumber ? 'active' : ''}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </>
    );
};

export default GameInput;
