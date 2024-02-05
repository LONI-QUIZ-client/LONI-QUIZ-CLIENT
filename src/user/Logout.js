import React from 'react';
import {useNavigate} from "react-router-dom";
import {isAutoLogin, isLogin} from "../config/login-util";

import "./scss/Logout.scss"

const Logout = () => {

    const redirection = useNavigate();

    const logoutHandler = e => {

        if(isLogin()){
            sessionStorage.clear();
            redirection('/');
        } else if(isAutoLogin()){
            localStorage.clear();
            redirection('/');
        } else {
            alert('로그아웃 실패 했습니다');
        }

    }

    return (
        <>
            <button className={"logout-button"} onClick={logoutHandler}>Log Out</button>
        </>
    );
};

export default Logout;