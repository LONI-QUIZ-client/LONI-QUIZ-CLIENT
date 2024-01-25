import React, {useEffect, useState} from 'react';

import '../scss/Join.scss'

import {Grid, Link, TextField} from "@mui/material";
import {JOIN_URL} from "../config/host-config";
import { IoMdPerson } from "react-icons/io";


const Join = () => {

    const [imag, setImage] = useState(null);

    const [inputErrorMessage, setInputErrorMessage] = useState({
        nickName: '',
        id: '',
        password:'',
        passwordCheck:'',
    });

    const [checkInput, setCheckInput] = useState({
        nickName: false,
        id: false,
        password: false,
        passwordCheck: false,
    })

    const [joinInfo, setJoinInfo] = useState({
        nickname: '',
        id: '',
        pw:'',
        profile:'',
    })

    const [lock, setLock] =  useState(true);


    // id 중복체크
    const fetchIdDuplicatedCheck = async (id) => {

        let msg='', flag=false;

        const res = await fetch(JOIN_URL + "/check?type=id&keyword=" + id)
        const json = await res.json();

        if (json) {
            msg = '아이디가 중복되었습니다!';
            flag = false;
        } else {
            msg = '사용 가능한 아이디입니다.';
            flag = true;
        }

        setInputErrorMessage({
            ...inputErrorMessage,
            id: msg
        });

        setCheckInput({
            ...checkInput,
            id: flag
        })

        setJoinInfo({
            ...joinInfo,
            id: id
        });

    }

    // 닉네임 중복체크
    const fetchNickNameDuplicatedCheck = async (nickname) => {

        let msg='', flag=false;

        const res = await fetch(JOIN_URL + "/check?type=nickname&keyword=" + nickname)
        const json = await res.json();

        if (json) {
            msg = '닉네임이 중복되었습니다!';
            flag = false;
        } else {
            msg = '사용 가능한 닉네임 입니다.';
            flag = true;
        }

        setInputErrorMessage({
            ...inputErrorMessage,
            nickName: msg
        });

        setCheckInput({
            ...checkInput,
            nickName: flag
        })

        setJoinInfo({
            ...joinInfo,
            nickname: nickname
        });

    }

    const nickNameHandler = e => {
        // console.log(inputVal);
        const nickNmVal = e.target.value;
        const nameRegex = /^[가-힣]{2,25}$/;
        // 닉네임은 최소 2글자 ~ 최대 25글자, 한글로

        let msg, flag;
        if(!nickNmVal){
            msg = 'Please enter a nickname';
            flag = false;
        } else if(!nameRegex.test(nickNmVal)){
            msg = '한글로 2-25 글자로 지정해주세요';
            flag = false;
        } else {
            fetchNickNameDuplicatedCheck(nickNmVal);
            return;
        }

        setInputErrorMessage({
            ...inputErrorMessage,
            nickName: msg
        });

        setCheckInput({
            ...checkInput,
            nickName: flag
        })

        setJoinInfo({
            ...joinInfo,
            nickname: nickNmVal
        });

    }

    const idHandler = e => {
        // console.log(inputVal);
        const idVal = e.target.value;

        const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{2,25}$/;
        // 아이디는 최소 5글자 ~ 최대 15글자

        let msg, flag;
        if(!idVal){
            msg = 'Please enter a ID';
            flag = false;
        } else if(!idRegex.test(idVal)){ // 정규표현식에 맞지 않다면
            msg = '영어-숫자조합으로 5-25 글자로 지정해주세요';
            flag = false;
        } else {
            fetchIdDuplicatedCheck(idVal);
            return;
        }

        setInputErrorMessage({
            ...inputErrorMessage,
            id: msg
        });

        setCheckInput({
            ...checkInput,
            id: flag
        })

        setJoinInfo({
            ...joinInfo,
            id: idVal
        });
    }

    const passwordHandler = e => {
        // console.log(e.target.value);

        const pwVal = e.target.value;
        const pwRegex  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,25}$/;; // 비밀번호는 최소 8글자 ~ 최대 25

        let msg, flag;
        if(!pwVal){
            msg = 'Please enter a password';
            flag = false;
        } else if(!pwRegex.test(pwVal)){ // 정규표현식에 맞지 않다면
            msg = '영어-숫자-특수문자 조합으로 8-25 글자로 지정해주세요';
            flag = false;
        } else {
            msg = 'password available';
            flag = true;
        }

        setInputErrorMessage({
            ...inputErrorMessage,
            password: msg
        });

        setCheckInput({
            ...checkInput,
            password: flag
        })

        setJoinInfo({
            ...joinInfo,
            pw: pwVal
        });

    }

    const passwordCheckHandler = e => {
        const pwCheckVal = e.target.value;

        let msg, flag;
        if(!pwCheckVal){
            msg = 'Please enter a password-check';
            flag = false;
        } else if(joinInfo.pw !== pwCheckVal){
            msg = '비밀번호와 일치하지 않습니다';
            flag = false;
        } else {
            msg = '비밀번호와 일치합니다';
            flag = true;
        }

        setInputErrorMessage({
            ...inputErrorMessage,
            passwordCheck: msg
        });

        setCheckInput({
            ...checkInput,
            passwordCheck: flag
        })

        setJoinInfo({
            ...joinInfo,
            passwordCheck: pwCheckVal
        });
    }

    const inputIsValid = () => {
        for (const key in checkInput) {
            const valid = checkInput[key]
            if(!valid) return false
        }
            return true;
    }






    const {nickName : nn, id, password : pw, passwordCheck : pwc} =  checkInput;
    useEffect(() => {
        // console.log(`${inputIsValid()} 값이 바뀌면 실행된다!!`)

        if(inputIsValid()) setLock(false)
        else setLock(true)

    }, [nn, id, pw, pwc]);

    const joinHandler = e => {
        e.preventDefault();

        if(!lock) { // 잠겨있지 않을 때
            // console.log('회원가입 성공!!');
            fetchJoinPost();
        } else { // 잠겨있을 때

            console.log('회원가입 실패!!');
        }
    }

    const profileHandler = e => {
        document.getElementById('profile-img').click();
    }

    const uploadImage = (e) => {
        const uploadFile = e.target.files[0];

        console.log(uploadFile)

        setImage(uploadFile);
    }


    // const uploadImage = e => {
    //     const uploadFile = e.target.files[0];
    //     console.log(uploadFile);
    //
    //     if(uploadFile){
    //         const reader = new FileReader();
    //         reader.readAsDataURL(uploadFile);
    //
    //         reader.onload = () => {
    //             setImageSrc(reader.result);
    //             setJoinInfo({
    //                 ...joinInfo,
    //                 profile: reader.result,
    //             });
    //             console.log(reader.result);
    //         }
    //
    //     }
    //
    // }


    const fetchJoinPost = async () => {

        const formate = new FormData();

        formate.append("id", joinInfo.id);
        formate.append("pw", joinInfo.pw);
        formate.append("nickname", joinInfo.nickname);
        formate.append("profile", imag);


        const res = await fetch(JOIN_URL, {
            method: 'POST',
            body: formate
        });

        if(res.status === 200){
            const json = await res.text();
            console.log(json);
        } else {
            console.log('다시확인바람');
        }

    }


    return (
        <div className={'join-screen'}>
            <div className={'join-main-content'}>
                <div className={'left-login-move'}>
                    <div className={'game-logo'}></div>
                    <div className={'if-login-can-user'}>
                        Are you already a member?
                        <Link href="/login" variant="body2">
                            login
                        </Link>
                    </div>
                </div>
                <div className={'join-right-input-modal'}>
                    <form>
                        <div style={{width: 40, height: 40}}
                             onClick={profileHandler}
                             className={'join-input-profile-item'}>

                        </div>

                        <input
                            onChange={uploadImage}
                            type="file"
                            id="profile-img"
                            accept="image/*"
                            style={{display: 'none'}}
                            name="profileImage" />

                        <Grid container spacing={2}>
                            <Grid item xs={12} className={'join-input-item'}>
                                <TextField
                                    type={"text"}
                                    name="nickname"
                                    label="nickname"
                                    onChange={nickNameHandler}
                                    variant="standard"/>
                                <span>{inputErrorMessage.nickName}</span>
                            </Grid>
                            <Grid item xs={12} className={'join-input-item'}>
                                <TextField
                                    type={"text"}
                                    name="id"
                                    label="ID"
                                    onChange={idHandler}
                                    variant="standard" />
                                <span style={{fontSize: '1rem'}}>{inputErrorMessage.id}</span>
                            </Grid>
                            <Grid item xs={12} className={'join-input-item'}>
                                <TextField
                                    type={"password"}
                                    name="pw"
                                    label="password"
                                    onChange={passwordHandler}
                                    variant="standard" />
                                <span>{inputErrorMessage.password}</span>
                            </Grid>
                            <Grid item xs={12} className={'join-input-item'}>
                                <TextField
                                    type={"password"}
                                    name="pwCheck"
                                    label="password-check"
                                    onChange={passwordCheckHandler}
                                    variant="standard" />
                                <span></span>
                            </Grid>
                            <Grid item xs={12} className={'join-input-item'}>
                                <button
                                    type="submit"
                                    onClick={joinHandler}
                                    disabled={lock}>
                                    Join
                                </button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Join;