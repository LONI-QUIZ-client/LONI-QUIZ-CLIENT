import React from 'react';
import "./scss/ButtonItem.scss"
import {IoIosLogOut} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {getLoginUserCheck} from "../config/login-util";
import { IoHome } from "react-icons/io5";


const MyPageButton = () => {

    const redirect = useNavigate();

    const moveMyPageHandler = e => {
        alert('마이페이지로 이동합니다');
        redirect(`/mypage/${getLoginUserCheck().id}`);
    }

    return (
        <>
            <button className={"button-item"} onClick={moveMyPageHandler}>
                <div className={"button-icon"}><IoHome /></div>
                Go MyPage
            </button>
        </>
    );
};

export default MyPageButton;