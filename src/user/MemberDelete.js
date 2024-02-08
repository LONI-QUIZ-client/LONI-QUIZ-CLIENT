import React, {useEffect, useState} from 'react';
import {JOIN_URL} from "../config/host-config";
import {useNavigate, useNavigation, useParams} from "react-router-dom";

import "./scss/ButtonItem.scss";
import {getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";

const MemberDelete = () => {

    const redirection= useNavigate();

    const [id, setId] = useState('');

    useEffect(() => {
        console.log(getLoginUserCheck().id);
        setId(getLoginUserCheck().id);
    }, []);

    const getOutHandler = async (e) => {
        const res = await fetch(JOIN_URL + `/${id}`, {
            method: 'DELETE'
        });
        if(res.status===200){
            const json = await res.text();
            alert(json);

            if(isLogin()){
                sessionStorage.clear();

            } else {
                localStorage.clear();
            }

            redirection('/');

        } else {
            alert('다시 시도해 주세요');
        }
    }

    const deleteMember = {
        position: 'absolute'
        , bottom: 0
        , right: 0
    }

    return (
        <>
            <button onClick={getOutHandler} style={deleteMember} className={"button-item"}>
                Delete
            </button>
        </>
    );
};

export default MemberDelete;