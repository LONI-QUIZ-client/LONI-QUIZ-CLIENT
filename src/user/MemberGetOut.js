import React, {useEffect, useState} from 'react';
import {JOIN_URL} from "../config/host-config";
import {useNavigate, useNavigation, useParams} from "react-router-dom";

import "./scss/MemberGetOut.scss"
import {getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";

const MemberGetOut = () => {

    const redirection= useNavigate();

    const [id, setId] = useState('');

    useEffect(() => {
        setId(getLoginUserCheck().id);
        console.log(getLoginUserCheck().id)
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

    return (
        <>
            <button onClick={getOutHandler} className={"disconnect-member"}>disconnect</button>
        </>
    );
};

export default MemberGetOut;