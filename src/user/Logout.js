import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";
import { IoIosLogOut } from "react-icons/io";

import "./scss/ButtonItem.scss"
import {JOIN_URL} from "../config/host-config";

const Logout = ({isUserId}) => {

    const redirection = useNavigate();

    const fetchUserLoginState = async () => {
        const res = await fetch(JOIN_URL + `/logout/${isUserId}`, {
            method: 'POST'
        });

        if(res.status===200){
            const json = await res.json();
            console.log(json);
        } else {
            alert('로그아웃 실패했습니다. 서버가 불안정하니 다시 시도해주세요');
        }
    }

    const logoutHandler = e => {

        if(isLogin()){
            localStorage.clear();

        } else if(isAutoLogin()){
            localStorage.clear();

        }

        fetchUserLoginState();
        redirection('/');

    }

    return (
        <>
            <button className={"logout-button button-item"} onClick={logoutHandler}>
                <div className={"logout-icon button-icon"}><IoIosLogOut /></div>
                Log Out
            </button>
        </>
    );
};

export default Logout;