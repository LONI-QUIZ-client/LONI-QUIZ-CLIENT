import React, {useState} from 'react';

import '../scss/SignInModal.scss'

import { BsPerson } from "react-icons/bs";
import { BsLock } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";

import kakaoSymbol from "../scss/img/kakao_symbol.png";
import minLogo from "../scss/img/min_logo.png";
import {Link} from "@mui/material";
import {json} from "react-router-dom";

const SignInModal = () => {

    /*const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const idHandler = e => {
        setId(e.target.value);
    }
    const pwHandler = e => {
        setPw(e.target.value);
    }
    const loginHandler = () => {
        const payload = {
            id : id,
            pw : pw
        }
        const requestInfo = {
            method : "GET",
            headers : {
                "content-type" : "application/json"
            },
            body: JSON.stringify(payload)
        }
        fetch("http://localhost:8888/user/login", requestInfo)
            .then(res => res.json())
            .then(json => {
                console.log(json);
            })
    }*/

    const USER_LOGIN_URL = "http://localhost:8888/user/login"


    return (
        <div className={"sign-in-full-screen"}>
            <div className={"sign-in-background"}>
                <div className={"user-sign-in-modal"}>
                    <div className={"LONI-QUIZ-logo"}></div>
                    <form className={"sign-in-items"}>
                        <div className={"sign-in-id-item"}>
                            <BsPerson />
                            {/*<input type={"text"} className={"sign-in-id-input"} placeholder="ID" onChange={idHandler}/>*/}
                            <input type={"text"} className={"sign-in-id-input"} placeholder="ID" />
                        </div>
                        <div className={"sign-in-password-item"}>
                            <BsLock />
                            {/*<input type={"password"} className={"sign-in-password-input"} placeholder="password" onChange={pwHandler}/>*/}
                            <input type={"password"} className={"sign-in-password-input"} placeholder="password" />
                        </div>
                        <div className={"auto-sign-in-check"}>
                            <FaRegCheckCircle />자동 로그인
                        </div>
                        <Link className={"user-sign-up-move-link"}>회원가입</Link>
                    </form>
                    <div className={"sign-in-buttons"}>
                        <div className={"sign-in-error-message"}>아이디를 입력하시오</div>
                        {/*<div className={"loni-quiz-sign-in-button"} onClick={loginHandler()}>*/}
                        <div className={"loni-quiz-sign-in-button"} >
                            <img src={minLogo} alt={"미니로고"}/>
                            LONI-QUIZ 로그인
                        </div>
                        <div className={"kakao-sign-in-button"}>
                            <img src={kakaoSymbol} alt={"카카오톡-심볼"}/>
                            카카오 로그인
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;