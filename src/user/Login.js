import React, {useState} from 'react';

import '../scss/Login.scss';

import { BsPerson } from "react-icons/bs";
import { BsLock } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";

import {LOGIN_URL} from "../config/host-config";

import kakaoSymbol from "../scss/img/kakao_symbol.png";
import minLogo from "../scss/img/min_logo.png";
import {Button, Link} from "@mui/material";
import {json, useNavigate} from "react-router-dom";
import async from "async";
import {TOKEN, USERNAME} from "../config/login-util";


const Login = () => {

    const redirect = useNavigate()

    // 로그인 입력
    const [userLogin, setUserLogin] =  useState({
        id: '',
        pw: '',
    });

    // 로그인 오류 메시지
    const [loginMessageError, setLoginMessageError] = useState('');


    // id
    const userIdHandler = e => {

        const idVal = e.target.value;

        setUserLogin({
            ...userLogin,
            id: idVal
        });
    }

    // 패스워드
    const userPasswordHandler = e =>{

        const passwordVal = e.target.value;

        setUserLogin({
            ...userLogin,
            pw: passwordVal
        });

    }

    const fetchLoginProcess = async () => {

        const payload = {
            id : userLogin.id,
            pw : userLogin.pw
        }

        const res = await fetch(`${LOGIN_URL}`,{
            method: "POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify(payload)
        });

        if(res.status===200){
            /*const json = await res.json();
            console.log(json);*/
            setLoginMessageError('');

            const {token, userNickname} = await res.json();
            // console.log(token, userNickname);

            localStorage.setItem(TOKEN, token);
            localStorage.setItem(USERNAME, userNickname);

            redirect('/lobby'); // 로그인 후 이동

        }
        else if(res.status===400) { // 회원가입이 안된 아이디 이거나 비밀번호가 틀림
            setLoginMessageError('아이디 또는 비밀번호를 잘못 입력했습니다.' +
                ' 입력하신 내용을 다시 확인해주세요.');
        }

    }

    // 로그인 버튼
    const userLoginHandler = (e) => {
        e.preventDefault();

        if(!userLogin.id){
            setLoginMessageError('아이디를 입력해 주세요');
        } else if (!userLogin.pw) {
            setLoginMessageError('비밀번호를 입력해 주세요');
        } else {
            fetchLoginProcess();
        }

    }

    return (
        <div className={"sign-in-full-screen"}>
            <div className={"sign-in-background"}>
                <div className={"user-sign-in-modal"}>
                    <div className={"LONI-QUIZ-logo"}></div>
                    <form className={"sign-in-items"} noValidate onSubmit={userLoginHandler}>
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
                        <Button type="submit" className={"loni-quiz-sign-in-button"}
                                onClick={userLoginHandler}
                        >
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