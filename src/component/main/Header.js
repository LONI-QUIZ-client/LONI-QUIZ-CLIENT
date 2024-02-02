import React from 'react';
import './scss/Header.scss';
import {isLogin} from "../../config/login-util";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const nav = useNavigate();
    const logoutHandler = e => {
        localStorage.clear();
        nav('/')
        // setImgUrl(null);
        // redirection('/login');
    };
    return (
        <div className="h-box">
            <img src={process.env.PUBLIC_URL + "/img/LOLO.png"} alt="asd"/>
            <div className="header">
                <td className="header-table">
                    <li><a href="">사이트 개요</a></li>
                    <li><a href="">이거</a></li>
                    <li><a href="">저거</a></li>
                    <li>
                        {/*<a href="/login">로그인/회원가입</a>*/}
                        {
                            isLogin()
                                ?
                                (
                                    <button onClick={logoutHandler}>
                                        로그아웃
                                    </button>
                                )
                                :
                                (
                                    <a href="/login">로그인</a>
                                )

                        }
                    </li>
                </td>
            </div>
        </div>
    );
};

export default Header;