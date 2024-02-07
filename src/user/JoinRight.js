import React, {useEffect, useState} from 'react';
import {Link, TextField} from "@mui/material";
import {JOIN_URL} from "../config/host-config";
import {useNavigate} from "react-router-dom";
import cn from 'classnames';

import "./scss/JoinRight.scss"
import 'animate.css';

import person from "../user/scss/img/person-fill.png"


const JoinRight = () => {

    const redirect = useNavigate();

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
    })

    // 회원가입 버튼 활성화 여부
    const [lock, setLock] = useState(true);

    // id 중복체크
    const fetchIdDuplicatedCheck = async (id) => {

        let msg='', flag=false;

        const res = await fetch(JOIN_URL + "/check?type=id&keyword=" + id)
        const json = await res.json();

        if (json) {
            msg = '아이디가 중복 되었습니다';
            flag = false;
        } else {
            msg = '사용 가능한 아이디 입니다.';
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
            msg = '닉네임이 중복 되었습니다!';
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
        });

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
            msg = '닉네임을 입력해 주세요';
            flag = false;
        } else if(!nameRegex.test(nickNmVal)){
            msg = '2-25글자 수, 한글로 지정해 주세요';
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

    }

    const idHandler = e => {
        const idVal = e.target.value;
        // console.log(inputVal);

        // 아이디는 최소 5글자 ~ 최대 15글자
        const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{2,25}$/;

        let msg, flag;
        if(!idVal){
            msg = '아이디를 입력해 주세요';
            flag = false;
        } else if(!idRegex.test(idVal)){ // 정규표현식에 맞지 않다면
            msg = '5-25 글자 수, 영문&숫자 조합으로 지정해 주세요';
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

    }

    const passwordHandler = e => {
        const pwVal = e.target.value;
        const pwRegex  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,25}$/;; // 비밀번호는 최소 8글자 ~ 최대 25

        let msg, flag;
        if(!pwVal){
            msg = '비밀번호를 입력해 주세요';
            flag = false;
        } else if(!pwRegex.test(pwVal)){ // 정규표현식에 맞지 않다면
            msg = '8-25 글자 수, 영어&숫자&특수문자 조합으로 지정해주세요';
            flag = false;
        } else {
            msg = '사용 가능한 비밀번호 입니다';
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

    const [pwCheckVal, setPwCheckVal] = useState('');

    const passwordCheckHandler = e => {
        console.log(e.target.value);
        setPwCheckVal(e.target.value);

        /*let msg, flag;
        if(!pwCheckVal){
            msg = '비밀번호를 입력해주세요'
            flag = false;
        } else if(joinInfo.pw !== pwCheckVal){
            msg = '비밀번호와 올바르지 않습니다';
            flag = false;
        } else if(checkInput.pw === true && joinInfo.pw === pwCheckVal){
            msg = '비밀번호와 일치합니다';
            flag = true;
        }*/

        /*setInputErrorMessage({
            ...inputErrorMessage,
            passwordCheck: msg
        });

        setCheckInput({
            ...checkInput,
            passwordCheck: flag
        });*/
    }

    useEffect( () => {

        let msg, flag;
        if(!pwCheckVal){
            msg = '';
            flag = false;
        } else if(checkInput.password === true && joinInfo.pw !== pwCheckVal){
            msg = '비밀번호와 일치하지 않습니다';
            flag = false;
        } else if(checkInput.password === true && joinInfo.pw === pwCheckVal){
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
        });

    }, [joinInfo.pw, pwCheckVal]);

    const [imageFile, setImageFile] = useState(null);

    const profileHandler = e => {
        document.getElementById('profile-img').click();
    }

    const isProfile = () => {
        const uploadFile = document.getElementById('profile-img').files[0];

        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);

        reader.onload = () => {
            setImageFile(reader.result);
        }

    }

    const fetchJoinPost = async () => {

        const jsonBlob = new Blob(
            [ JSON.stringify(joinInfo) ],
            { type: 'application/json' }
        );

        const formData = new FormData;

        formData.append('user', jsonBlob);
        formData.append('profileImage', document.getElementById('profile-img').files[0]);

        const res = await fetch(JOIN_URL,{
            method: 'POST'
            , body: formData
        });

        if(res.status === 200){
            const json = await res.text();
            alert(joinInfo.nickname);

            redirect('/login');
        } else {
            alert('입력을 올바르게 하셨는지 다시 확인해 주세요');
        }

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

        if(inputIsValid()) setLock(false)
        else setLock(true)

    }, [nn, id, pw, pwc]);

    const joinHandler = e => {
        e.preventDefault();

        if(!lock) {
            fetchJoinPost();
        } else {
            alert('회원가입이 실패했습니다 다시 시도해 주세요');
        }
    }

    const profileImageHandler = {
        background: '#D9D9D9'
        , borderRadius: '50%'
        , width: '10rem', height: '10rem'
        , overflow: 'hidden'
        , backgroundRepeat: 'no-repeat'
        , backgroundSize: `${imageFile ? 'contain' : ''}`
        , backgroundPosition: 'center'
        , backgroundImage: `url(${imageFile || person})`
    }

    return (
        <form noValidate>
            <div className={'join-right-item'}>
                {/*<div className={"join-title"}>Join LONIQUIZ</div>*/}
                <div
                    onClick={profileHandler}
                    className={'join-input-profile-item'}
                    style={profileImageHandler} />
                <input
                    onChange={isProfile}
                    type="file"
                    id="profile-img"
                    accept="image/*"
                    style={{display: 'none'}}
                    name="profileImage" />

                <div className={'join-input-items'}>
                    <div className={"join-item"}>
                        <TextField
                            className="join-input"
                            type="text"
                            label="닉네임"
                            onChange={nickNameHandler}
                            error={!!inputErrorMessage.nickName && !checkInput.nickName}
                            variant="outlined"/>
                        <span className={cn('error-message', {nn})}>{inputErrorMessage.nickName}</span>
                    </div>
                    <div className={"join-item"}>
                        <TextField
                            className="join-input"
                            type="text"
                            label="아이디"
                            onChange={idHandler}
                            size={"medium"}
                            error={!!inputErrorMessage.id && !checkInput.id}
                            variant="outlined" />
                        <span className={cn('error-message', {id})}>{inputErrorMessage.id}</span>
                    </div>
                    <div className={"join-item"}>
                        <TextField
                            className="join-input"
                            type="password"
                            label="비밀번호"
                            onChange={passwordHandler}
                            size={"medium"}
                            error={!!inputErrorMessage.password && !checkInput.password}
                            variant="outlined" />
                        <span className={cn('error-message', {pw})}>{inputErrorMessage.password}</span>
                    </div>
                    <div className={"join-item"}>
                        <TextField
                            id={"passwordCheck"}
                            className="join-input"
                            type="password"
                            label="비밀번호 확인"
                            onChange={passwordCheckHandler}
                            error={!!inputErrorMessage.passwordCheck && !checkInput.passwordCheck}
                            size={"medium"}
                            variant="outlined" />
                        <span className={cn('error-message', {pwc})}>{inputErrorMessage.passwordCheck}</span>
                    </div>
                </div>
                <div className={'join-button'}>
                    <button
                        className={cn('join-practice', {'animate__animated animate__bounce': !lock ,'animate__animated animate__headShake': lock, lock})}
                        type="submit"
                        onClick={joinHandler}
                        disabled={lock}>
                        Join
                    </button>
                </div>
                <div className={'if-login-can-user'}>
                    Are you already a member?
                    <Link href="/login" variant="body2" className={'login-link-move'}>Log In</Link>
                </div>
            </div>
        </form>
    );
};

export default JoinRight;