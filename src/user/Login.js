import React, {useState} from 'react';

import '../scss/Login.scss'

import { BsPerson } from "react-icons/bs";
import { BsLock } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";

import {LOGIN_URL} from "../config/host-config";

import kakaoSymbol from "../scss/img/kakao_symbol.png";
import minLogo from "../scss/img/min_logo.png";
import {Button, Link} from "@mui/material";
import {json} from "react-router-dom";


const Login = () => {

    // 로그인 입력
    const [userLogin, setUserLogin] =  useState({
        id: '',
        pw: '',
    });

    // 로그인 오류 메시지
    const [loginMessageError, setLoginMessageError] = useState('');

    // 로그인 입력 조건 확인
    const [loginInputCorrect, setLoginInputCorrect] =  useState({
        id: false,
        pw: false,
    });

    // id
    const userIdHandler = e => {

        const idVal = e.target.value;
        console.log(idVal);

        setUserLogin({
            ...userLogin,
            id: idVal
        });

        setLoginInputCorrect({
            ...loginInputCorrect,
            id: true
        })

    }

    // 패스워드
    const userPasswordHandler = e =>{

        const passwordVal = e.target.value;
        console.log(passwordVal);

        setUserLogin({
            ...userLogin,
            pw: passwordVal
        });

        setLoginInputCorrect({
            ...loginInputCorrect,
            pw: true
        })

    }

    // 로그인 버튼
    const userLoginHandler = e => {

        if(!userLogin.id){
            setLoginMessageError('Please enter a ID');
        } else if (!userLogin.pw) {
            setLoginMessageError('Please enter a password');
        } else if (!userLogin.pw) {
            setLoginMessageError('Please enter a password');
        } else if (!userLogin.pw) {
            setLoginMessageError('Please enter a password');
        }

        else {
            setLoginMessageError('');
        }

        const payload = {
            id : userLogin.id,
            pw : userLogin.pw
        }

         fetch(`${LOGIN_URL}`,{
            method: "POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify(payload)
        })
             .then(res => {
                if (res.status === 200){
                    return res.text();
                    // return res.json();
                }
            })
            .then(json => {
                console.log(json);
            })
    }

    return (
        <div className={"sign-in-full-screen"}>
            <div className={"sign-in-background"}>
                <div className={"user-sign-in-modal"}>
                    <div className={"LONI-QUIZ-logo"}></div>
                    <form className={"sign-in-items"}>
                        <div className={"sign-in-id-item"}>
                            <BsPerson />
                            <input type={"text"} className={"sign-in-id-input"} placeholder="ID" onChange={userIdHandler}/>
                        </div>
                        <div className={"sign-in-password-item"}>
                            <BsLock />
                            <input type={"password"} className={"sign-in-password-input"} placeholder="password" onChange={userPasswordHandler}/>
                        </div>
                        <div className={"auto-sign-in-check"}>
                            <FaRegCheckCircle />자동 로그인
                        </div>
                        <Link className={"user-sign-up-move-link"} href='/join'>회원가입</Link>
                    </form>
                    <div className={"sign-in-buttons"}>
                        <div className={"sign-in-error-message"}>{loginMessageError}</div>
                        {/*<div className={"loni-quiz-sign-in-button"} onClick={loginHandler()}>*/}
                        <Button type={"submit"} className={"loni-quiz-sign-in-button"} onClick={userLoginHandler}>
                            <img src={minLogo} alt={"미니로고"}/>
                            LONI-QUIZ 로그인
                        </Button>
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

export default Login;