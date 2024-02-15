import React, {useEffect, useState} from 'react';
import {BsFillDoorOpenFill, BsFillPersonFill} from "react-icons/bs";
import Logout from "./Logout";
import {useNavigate, useParams} from "react-router-dom";
import {FOLLOW_URL, JOIN_URL} from "../config/host-config";
import {getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";
import cn from "classnames";
import {LuPower, LuPowerOff} from "react-icons/lu";
import "./scss/UserMyPage.scss"
import MemberDelete from "./MemberDelete";
import { FaStar } from "react-icons/fa";
import { BsFillXDiamondFill } from "react-icons/bs";
import { FaRankingStar } from "react-icons/fa6";
import MyPageButton from "./MyPageButton";
import LobbyButton from "./LobbyButton";

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

    // ====== user state ======
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
    // ====== end user state ======

    // ======= background =======
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

    const backgroundHandler = {
        background: arrColor.length === 2 ? `linear-gradient(135deg, ${arrColor[0]} 0%, ${arrColor[1]} 100%)` : ''
    }

    const iconHandler = {
        background: arrColor.length === 2 ? `linear-gradient(135deg, ${arrColor[0]} 0%, ${arrColor[1]} 100%)` : ''
        , boxShadow: `-5px -5px 10px 5px ${arrColor[0]+50}, 5px 5px 10px 5px ${arrColor[1]+50}`
    }
    // ======= end background =======




    // ======= profile =======
    const [profilePath, setProfilePath] = useState('');

    const fetchProfile = async () => {
        const res = await fetch(JOIN_URL+'/profile-image/'+userId, {
            method: 'GET'
        });

        if(res.status===200){
            const json = await res.text();
            setProfilePath(json);
        } else {
            const json = await res.text();
            alert(json)
            setProfilePath('');
        }

    }

    const profileImage = {
        backgroundImage: `url(${profilePath})`
        , backgroundRepeat: 'no-repeat'
        , backgroundSize: 'contain'
        , backgroundPosition: 'center'
    }
    // ======= end profile =======


    // ======== follow ========

    // 팔로우 여부
    const [starFollow, setStarFollow] = useState(false);

    const payload = {
        fid: userId
        , userId: getLoginUserCheck().id
    }
    const starFollowHandler = async (e) => {

        const res = await fetch( FOLLOW_URL, {
            method: 'POST'
            , headers: {'content-type':'application/json'}
            , body: JSON.stringify(payload)
        })

        if(res.status===200){
            const json = await res.json();
            console.log(json);

            setStarFollow(!starFollow);
            console.log(starFollow);

        } else {
            console.log('팔로우를 할 수 엄슴');
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

            if(getLoginUserCheck().id !== userId){
                setUserPageMaster(false);

            } else { // if(getLoginUserCheck().id === userPageInfo.id)
                setUserPageMaster(true);
            }
        }

    }, [userId]);

    return (
        <div className={"user-info"}>
            <div className={"user-setting-buttons"}>
                <LobbyButton />
                { userPageMaster ? <Logout /> : <MyPageButton /> }
            </div>

            <div className={"user-page-background"} style={backgroundHandler}>
                <div className={"user-info-item-content"}>
                    <div className={"user-page-profile"} style={profileImage}>
                        {profilePath ? '' : <BsFillPersonFill/>}
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

            <div className={"user-game-info-contain"}>
                <div className={"user-follow-item"}>
                    <div className={"follow-star-icon"}><FaStar /></div>
                    <p>100,000</p>
                    { userPageMaster ? 'Followers' : <button onClick={starFollowHandler}> { starFollow ? 'Following' : 'Follow' } </button> }
                </div>
                <div className={"game-score-item"}>
                    <div className={"game-score-icon"}><BsFillXDiamondFill /></div>
                    <p>{userPageInfo.score}</p>
                    Point
                </div>
                <div className={"game-playing-record"}>
                    <div className={"game-playing-icon"}><FaRankingStar /></div>
                    <p>record</p>
                    Games
                </div>
            </div>
            { userPageMaster ? <MemberDelete /> : ''}
        </div>
    );
};

export default UserMyPage;