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
import {TOKEN, ID, USERNAME} from "../config/login-util";

import LoginRight from "./LoginRight";
import UserSideLeft from "./UserSideLeft";



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

            const {token, id, userNickname} = await res.json();
            // console.log(token, userNickname);

            localStorage.setItem(TOKEN, token);
            localStorage.setItem(ID, id);
            localStorage.setItem(USERNAME, userNickname);

            redirect('/'); // 로그인 후 이동

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
        <div className={"user-login"}>
            <UserSideLeft />
            <LoginRight />
        </div>
    );
};

export default Login;