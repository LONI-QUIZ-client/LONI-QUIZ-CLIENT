import React, {useEffect, useState} from 'react';
import {BsFillDoorOpenFill, BsFillPersonFill} from "react-icons/bs";
import Logout from "./Logout";
import {useNavigate, useParams} from "react-router-dom";
import {JOIN_URL} from "../config/host-config";
import {getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";
import cn from "classnames";
import {LuPower, LuPowerOff} from "react-icons/lu";
import "./scss/UserMyPage.scss"
const UserMyPage = () => {

    const redirect = useNavigate();

    // 파라미터 가져오기
    const {userId} = useParams();

    // 유저 정보 가져오기
    const [userPageInfo, setUserPageInfo] = useState({
        id: ''
        , nickname: ''
        , createDate: ''
        , score: ''
    });

    // 유저 로그인 상태
    const [isUserLoginState, setIsUserLoginState] = useState(true);

    // 유저 자기 자신인지 타인인지, 유저 아이디을 받아서 확인할것
    const [userPageMaster, setUserPageMaster] = useState(false);

    const fetchUserInfo = async () => {
        const res = await fetch(JOIN_URL + '/' + userId);
        if(res.status===200){
            const json = await res.json();
            setUserPageInfo({
                id: json.id
                , nickname: json.nickname
                , createDate: json.createDate
                , score: json.score
            });
        } else {
            alert('유저 정보를 불러올 수 없습니다');
            redirect('/lobby');
        }
    }

    // 유저 로그인 상태 렌더링해서 계속 상태 확인해야함
    useEffect(() => {
        fetchUserInfo();

        if(!isLogin() && !isAutoLogin()){
            alert('로그인 하세요');
            redirect('/login');
        } else {
            if(getLoginUserCheck().id !== userPageInfo.id){
                setUserPageMaster(false);

            } else { // if(getLoginUserCheck().id === userPageInfo.id)
                setUserPageMaster(true);
            }
        }



    }, [userPageInfo.id]);

    // 로비 이동
    const moveLobbyHandler = e => {
        redirect('/lobby')
    }


    // MOVE LOBBY Button
    const BsFillDoorOpenFillStyle = {
        width: '3.5rem'
        , height: '3.5rem'
        , marginRight: '0.2rem'
    }

    return (
        <div className={"user-info"}>
            <div className={"user-setting-buttons"}>
                <button
                    onClick={moveLobbyHandler}
                    className={"lobby-move-button"}>
                    <BsFillDoorOpenFill style={BsFillDoorOpenFillStyle}/>
                    MOVE LOBBY
                </button>
                { userPageMaster ? <Logout /> : '' }
            </div>

            <div className={"user-page-background"}>
                <div className={"user-info-item-content"}>
                    <div className={"user-page-profile"}>
                        <BsFillPersonFill />
                    </div>
                    <div className={"user-info-contain"}>
                        <div className={"user-info-change-item"}>
                            {userPageInfo.nickname}
                        </div>
                        <div className={"user-login-state-item"}>
                            <div className={cn("logout-state-icon", {'login-state-icon':isUserLoginState})}>
                                { isUserLoginState ? <LuPower /> : <LuPowerOff /> }
                            </div>
                            <div className={cn("logout-state-modal", {'login-state-modal':isUserLoginState})}>
                                { isUserLoginState ? 'Logged in' : 'logged out' }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"user-game-info-contain"}>

            </div>

        </div>
    );
};

export default UserMyPage;