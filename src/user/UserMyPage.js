import React, {useEffect, useState} from 'react';
import {BsFillDoorOpenFill, BsFillPersonFill} from "react-icons/bs";
import Logout from "./Logout";
import {useNavigate, useParams} from "react-router-dom";
import {JOIN_URL} from "../config/host-config";
import {getCurrentLoginUser, getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";
import cn from "classnames";
import {LuPower, LuPowerOff} from "react-icons/lu";
import "./scss/UserMyPage.scss"
import MemberGetOut from "./MemberGetOut";
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
    const [isUserLoginState, setIsUserLoginState] = useState(false);

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

    const [arrColor, setArrColor] = useState([]);
    const colorArray = ['#FF7759', '#FFE77C', '#AAFF59', '#59FFA5', '#59F5FF', '#59C8FF', '#5975FF', '#9459FF','#FF5986'];
    useEffect(() => {
        const sendColor = [];
        for (let i = 0; i < 2; i++) {
            const num = Math.floor(Math.random() * colorArray.length);
            sendColor.push(colorArray[num]);
        }
        setArrColor(sendColor);

    }, []);

    const [profilePath, setProfilePath] = useState(null);

    const fetchProfile = async () => {
        const res = await fetch(JOIN_URL+"/profile-image", {
            method: 'GET'
            , headers: {
                'Authorization': 'Bearer ' + getLoginUserCheck().token
            }
        });

        if(res.status===200){
            const json = await res.blob();
            const imageUrl = window.URL.createObjectURL(json);
            setProfilePath(imageUrl);
        } else {
            const json = await res.text();
            alert(json)
            setProfilePath(null);
        }

    }

    // 유저 로그인 상태 렌더링해서 계속 상태 확인해야함
    useEffect(() => {
        fetchUserInfo();
        fetchProfile();

        if(!isLogin() && !isAutoLogin()){
            alert('로그인 하세요');
            redirect('/login');
        } else {
            setIsUserLoginState(true);
            if(getLoginUserCheck().id !== userPageInfo.id){
                setUserPageMaster(false);

            } else { // if(getLoginUserCheck().id === userPageInfo.id)
                setUserPageMaster(true);
            }
        }

    }, [userPageInfo.id]);

    const backgroundHandler = {
        background: arrColor.length === 2 ? `linear-gradient(135deg, ${arrColor[0]} 0%, ${arrColor[1]} 100%)` : ''
    }

    const iconHandler = {
        background: arrColor.length === 2 ? `linear-gradient(135deg, ${arrColor[0]} 0%, ${arrColor[1]} 100%)` : ''
        , boxShadow: `-5px -5px 10px 5px ${arrColor[0]+50}, 5px 5px 10px 5px ${arrColor[1]+50}`
    }

    const profileImage = {
        background: `url(${profilePath})`
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
                { userPageMaster ? <MemberGetOut /> : ''}
            </div>

            <div className={"user-page-background"} style={backgroundHandler}>
                <div className={"user-info-item-content"}>
                    <div className={"user-page-profile"} style={profileImage}>
                        {profileImage ? '' : <BsFillPersonFill/>}
                    </div>
                    <div className={"user-info-contain"}>
                        <div className={"user-name-item"}>{userPageInfo.nickname}</div>
                        <div className={"user-login-state-item"}>
                            <div
                                className={cn("logout-state-icon", {'login-state-icon':isUserLoginState})} style={iconHandler}>
                                { isUserLoginState ? <LuPower /> : <LuPowerOff /> }
                            </div>
                            <div className={cn("logout-state-modal", {'login-state-modal':isUserLoginState})}>
                                { isUserLoginState ? 'Logged in' : 'logged out' }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"user-follow-info-contain"}>
                <div className={"follow-item"}>
                    follow
                    count
                </div>
            </div>
        </div>
    );
};

export default UserMyPage;