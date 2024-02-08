
import React, {useState} from 'react';
import {BsLock, BsPerson} from "react-icons/bs";
import {FaRegCheckCircle} from "react-icons/fa";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {KAKAO_AUTH_URL, LOGIN_URL} from "../config/host-config";
import {TOKEN, ID, USERNAME} from "../config/login-util";
import KakaoImgBtn from "../assets/img/kakaoLoginBtn.png"

import "../user/scss/LoginRight.scss"

const LoginRight = () => {

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

        const res = await fetch(LOGIN_URL,{
            method: "POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify(payload)
        });

        if(res.status===200){
            const {token, userNickname, id} = await res.json();
            localStorage.setItem(TOKEN, token);
            localStorage.setItem(USERNAME, userNickname);
            localStorage.setItem(ID, id);

            setLoginMessageError('');


            redirect('/lobby'); // 로그인 후 이동

        }
        else { // 회원가입이 안된 아이디 이거나 비밀번호가 틀림
            const json = await res.text();

            setLoginMessageError('아이디 또는 비밀번호가 일치하지 않습니다');
            alert(json);
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

    // 회원가입으로 이동
    const moveJoinHandler = () => {
        redirect('/join')
    }

    return (
        <div className={"user-login-right"}>
            <div className={"login-title"}>Log In</div>
            <form className={"login-items"} noValidate onSubmit={userLoginHandler}>
                <div className={"login-id-item"}>
                    <BsPerson className={"id-icon"}/>
                    <input type={"text"} className={"login-id-input"} placeholder="아이디" onChange={userIdHandler}/>
                </div>
                <div className={"login-password-item"}>
                    <BsLock className={"password-icon"}/>
                    <input type={"password"} className={"login-password-input"} placeholder="비밀번호"
                           onChange={userPasswordHandler}/>
                </div>
                <div className={"auto-login-check"}>
                    <FaRegCheckCircle/>자동 로그인
                </div>
                <div className={"user-join-move-link"} onClick={moveJoinHandler}>회원가입</div>
                <div className={"login-state-item"}>
                    <div className={"login-error-message"}>{loginMessageError}</div>
                    <Button
                        type="submit"
                        className={"user-login-button"}
                        onClick={userLoginHandler}>
                        Login
                    </Button>
                </div>
            </form>
            <a href={KAKAO_AUTH_URL} className='kakaoBtn'>
                <img src={KakaoImgBtn} style={{width: '100%', marginTop: '10px'}} alt='로고'/>
            </a>
        </div>
    );
};

export default LoginRight;