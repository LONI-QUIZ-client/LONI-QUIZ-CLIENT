import React, {useEffect, useState} from 'react';
import {JOIN_URL} from "../config/host-config";
import {useNavigate, useNavigation, useParams} from "react-router-dom";

import "./scss/ButtonItem.scss";
import {getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";
import cn from "classnames";
import "./scss/MemberDelete.scss"

const MemberDelete = () => {

    const redirection= useNavigate();

    const [id, setId] = useState('');

    const [inputPw, setInputPw] = useState('');

    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        console.log(getLoginUserCheck().id);
        setId(getLoginUserCheck().id);

    }, []);

    const memberDeleteHandler = async (e) => {
        setDeleteModal(!deleteModal)
    }

    const checkInputPw = e => {
        setInputPw(e.target.value);
    }

    const deleteCheckHandler = async () => {

        const res = await fetch(JOIN_URL + `/${id}`, {
            method: 'DELETE'
            , headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pw: inputPw })
        });

        const json = await res.text();
        if(res.status===200){
            alert(json);
            localStorage.clear();
            redirection('/');

        } else {
            alert(json);

        }

    }

    const deleteMember = {
        position: 'absolute'
        , bottom: 0
        , right: 0
    }

    return (
        <>
            <button onClick={memberDeleteHandler} style={deleteMember} className={"button-item"}>
                Delete
            </button>

            {/*<div className={cn({ 'block-black': deleteClicked })} style={{ display: deleteClicked ? 'block' : 'none' }}>*/}
            {
                deleteModal ?
                    <div className={"delete-member-modal"}>
                        <div className={"user-password-check"}>계정 삭제</div>
                        <div className={"user-password-account"}>
                            <p>계정 비밀번호를 입력해주세요.</p>
                            <p>본인확인이 되면 계정이 삭제됩니다.</p>
                        </div>
                        <input
                            onChange={checkInputPw}
                            type={"password"}
                            className={"password-check-input-item"}/>
                        <button onClick={deleteCheckHandler}>Delete</button>
                    </div>
                    : ''
            }
            {/*</div>*/}

        </>
    );
};

export default MemberDelete;