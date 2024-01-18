import React from 'react';

import '../scss/sign-in.scss'

import { BsPerson } from "react-icons/bs";
import { BsLock } from "react-icons/bs";

import kakaoSymbol from "../scss/img/kakao_symbol.png";

const SignInTemplate = () => {
    return (
        <div className={"sign-in-full-screen"}>
            <div className={"sign-in-background"}>
                <div className={"user-sign-up-move-button"}>sign-up</div>
                <div className={"user-sign-in-modal"}>
                    <div className={"LONI-QUIZ-logo"}></div>
                    <div className={"sign-in-items"}>
                        <div className={"sign-in-id-item"}>
                            <BsPerson />
                            <input type={"text"} className={"sign-in-id-input"}/>
                        </div>
                        <div className={"sign-in-password-item"}>
                            <BsLock />
                            <input type={"password"} className={"sign-in-password-input"}/>
                        </div>
                        <div className={"auto-sign-in-check"}>
                            <input type={"checkbox"}/> 자동 로그인
                        </div>
                    </div>
                    <div className={"sign-in-buttons"}>
                        <div className={"sign-in-error-message"}></div>
                        <div className={"loni-quiz-sign-in-button"}>
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

export default SignInTemplate;