import React from 'react';
import "./scss/ButtonItem.scss"
import {IoIosLogOut} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {getLoginUserCheck} from "../config/login-util";

const MyPageButton = () => {

    const redirect = useNavigate();

    const moveMyPageHandler = e => {
        console.log(getLoginUserCheck().id)
        redirect(`/mypage/${getLoginUserCheck().id}`);
    }

    return (
        <>
            <button className={"button-item"} onClick={moveMyPageHandler}>
                <div className={"button-icon"}>
                    <IoIosLogOut />
                </div>
                Go MyPage
            </button>
        </>
    );
};

export default MyPageButton;