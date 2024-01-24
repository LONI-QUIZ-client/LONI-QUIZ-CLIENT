import React from 'react';
import './scss/Header.scss';

const Header = () => {
    return (
        <div className="h-box">
            <h2>로고</h2>
            <div className="header">
                <td className="header-table">
                    <li><a href="">사이트 개요</a></li>
                    <li><a href="">이거</a></li>
                    <li><a href="">저거</a></li>
                    <li><a href="">그거</a></li>
                </td>
            </div>
        </div>
    );
};

export default Header;