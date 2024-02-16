import React from 'react';
import './scss/Button.scss';

import {isAutoLogin, isLogin} from "../../config/login-util";
import {Link, useNavigate} from 'react-router-dom';

const Button = () => {

    const nav = useNavigate();

    const entry = () => {
        if(!isLogin()){
            nav('/login')
        } else if(!isAutoLogin()){
            nav('/login')
        } else{
            nav('/lobby')
        }
    }
    return (
        <div>
            <div className="button_container">
                <button className="btn" onClick={entry}><span>시작하기</span></button>
            </div>
        </div>
    );
};

export default Button;