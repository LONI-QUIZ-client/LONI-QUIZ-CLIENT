import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";

import "./scss/Logout.scss"

const Logout = () => {

    const redirection = useNavigate();

    const logoutHandler = e => {

        if(isLogin()){
            sessionStorage.clear();

        } else if(isAutoLogin()){
            localStorage.clear();

        }

        redirection('/');

    }

    return (
        <>
            <button className={"logout-button"} onClick={logoutHandler}>Log Out</button>
        </>
    );
};

export default Logout;