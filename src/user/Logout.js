import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";
import { IoIosLogOut } from "react-icons/io";

import "./scss/ButtonItem.scss"

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
            <button className={"logout-button button-item"} onClick={logoutHandler}>
                <div className={"logout-icon button-icon"}>
                    <IoIosLogOut />
                </div>
                Log Out
            </button>
        </>
    );
};

export default Logout;