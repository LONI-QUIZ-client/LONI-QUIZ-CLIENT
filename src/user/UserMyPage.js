import React, {useEffect, useState} from 'react';
import { BsFillPersonFill} from "react-icons/bs";
import Logout from "./Logout";
import {useNavigate, useParams} from "react-router-dom";
import {FOLLOW_URL, JOIN_URL, PROFILE_URL} from "../config/host-config";
import {getCurrentLoginUser, getLoginUserCheck, isAutoLogin, isLogin} from "../config/login-util";
import cn from "classnames";
import {LuPower, LuPowerOff} from "react-icons/lu";
import "./scss/UserMyPage.scss"
import MemberDelete from "./MemberDelete";
import { FaStar } from "react-icons/fa";
import { BsFillXDiamondFill } from "react-icons/bs";
import { FaRankingStar } from "react-icons/fa6";
import MyPageButton from "./MyPageButton";
import LobbyButton from "./LobbyButton";
import { IoIosCreate } from "react-icons/io";


const UserMyPage = () => {

    const redirect = useNavigate();

    // 파라미터 가져오기
    const {userId} = useParams();

    // 유저 로그인 상태
    const [isUserLoginState, setIsUserLoginState] = useState(false);

    // 유저 자기 자신인지 타인인지, 유저 아이디을 받아서 확인할것
    const [userPageMaster, setUserPageMaster] = useState(false);

    // 팔로우 창 여부
    const [followListModal, setFollowListModal] = useState(false);

    // 유저 정보 가져오기
    const [userPageInfo, setUserPageInfo] = useState({
        id: ''
        , nickname: ''
        , createDate: ''
        , score: ''
        , loginState: false
    });

    useEffect(() => {
        if(!getLoginUserCheck()){
            redirect('/login')

        } else {
            return;

        }
    }, []);

    // ====== user state ======
    const fetchUserInfo = async () => {
        const res = await fetch(JOIN_URL + '/' + userId);
        if(res.status===200){
            const json = await res.json();
            setUserPageInfo({
                id: json.id
                , nickname: json.nickname
                , createDate: json.createDate
                , score: json.score
                // , loginState: json.loginState
            });
            setIsUserLoginState(json.loginState);
        } else {
            alert('유저 정보를 불러올 수 없습니다');
            redirect('/lobby');
        }
    }
    // ====== end user state ======

    // ======= random background =======
    const [arrColor, setArrColor] = useState([]);

    const colorArray = ['#FF7759', '#FFE77C', '#AAFF59', '#59FFA5', '#59F5FF', '#59C8FF', '#5975FF', '#9459FF','#FF5986'];

    useEffect(() => {
        const sendColor = [];
        for (let i = 0; i < 2; i++) {
            const num = Math.floor(Math.random() * colorArray.length);
            sendColor.push(colorArray[num]);
        }
        setArrColor(sendColor);

    }, [userId]);

    const backgroundHandler = {
        backgroundImage: `linear-gradient(135deg, ${arrColor[0]} 0%, ${arrColor[1]} 100%)`
    }

    const iconHandler = {
        backgroundImage: isUserLoginState ? `linear-gradient(135deg, ${arrColor[0]} 0%, ${arrColor[1]} 100%)` : ''
        , boxShadow: isUserLoginState ? `-5px -5px 10px 5px ${arrColor[0]+50}, 5px 5px 10px 5px ${arrColor[1]+50}` : ''
    }
    // ======= end background =======


    // ======= profile =======
    const [profilePath, setProfilePath] = useState('');

    const fetchProfile = () => {
        fetch(JOIN_URL+`/profile-image/${userId}`)
            .then(res=>res.text())
            .then(json => {
                setProfilePath(json)
            })
    }

    const profileImage = {
        backgroundImage: profilePath ? `url(${profilePath})` : 'linear-gradient(180deg, rgba(21, 20, 34, 1) 0%, rgba(51, 48, 80, 1) 100%)'
        , backgroundRepeat: 'no-repeat'
        , backgroundSize: 'contain'
        , backgroundPosition: 'center'
    }
    // ======= end profile =======


    // ======== follow ========
    const followListHandler = e => {
        setFollowListModal(!followListModal);
    }

    // 팔로우 여부
    const [starFollow, setStarFollow] = useState(false);

    const starFollowHandler = async (e) => {

        const payload = {
            fid: getLoginUserCheck().id
            , userId: userId
        }

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
    // ======== end follow ========



    // ======== follow List ========
    const [starFollowCount, setStarFollowCount] = useState(0);
    const [userFollowList, setUserFollowList] = useState([]);

    const fetchFollowList= async (e) =>{

        const res = await fetch(FOLLOW_URL+`/${userId}`, {
            method: 'GET'
        });

        if(res.status===200){
            const json = await res.json();
            setUserFollowList(json)

            for (const follow of json) {
                console.log('follow user:' + follow.fi);

                if(follow.fi === getLoginUserCheck().id){
                    setStarFollow(true)
                }
            }

            console.log(json)

            setStarFollowCount(json.length);
        } else {
            console.log('팔로우 리스트를 볼 수 엄슴');
        }
    }
    // ======== end follow List ========

    // ======== follow state ========
    const fetchFollowState = async () => {

        const payload = {
            fid: getLoginUserCheck().id
            , userId: userId
        }

        const res = await fetch(FOLLOW_URL+"/check", {
            method: "POST"
            , headers: {'content-type':'application/json'}
            , body: JSON.stringify(payload)
        });

        if(res.status===200){
            const json = await res.json();
            console.log(`follow state: ${json}`);
        }
    }
    // ======== end follow state ========



    // ======== change profile image ========
    const profileHandler = e => {
        document.getElementById('profile-img').click();
    }

    const isProfile = async () => {
        const formData = new FormData;
        formData.append('userId', userId);
        formData.append('profileImagePath', document.getElementById('profile-img').files[0]);

        const res = await fetch(JOIN_URL+"/change/profile", {
            method: 'POST'
            , body: formData
        });

        if(res.status === 200){
            const json = await res.text();
            alert(json);

        }

    }

    // ===== few Day ====
    const [fewDay, setFewDay] = useState('');
    const fetchDate = () => {
        let create = new Date(userPageInfo.createDate);
        let today = new Date();

        let mil = Math.abs(today - create);
        let number = Math.ceil(mil/(1000 * 60 * 60 * 24));
        setFewDay(number);
        console.log(fewDay+'일 지남');
    }

    useEffect(() => {
        fetchDate();

    }, [new Date()]);

    // 유저 로그인 상태 렌더링해서 계속 상태 확인해야함
    useEffect(() => {
        fetchUserInfo();
        fetchProfile();
        fetchFollowList();
        fetchFollowState();

        // setIsUserLoginState(userPageInfo.loginState);
        // console.log(userPageInfo.loginState);
        console.log(isUserLoginState);

        if(getLoginUserCheck().id === userId){
            setUserPageMaster(true);

        } else { // if(getLoginUserCheck().id === userPageInfo.id)
            setUserPageMaster(false);
        }

        window.addEventListener("wheel", function(e){
            e.preventDefault();
        },{passive : false});

    }, [
        userId
        , isUserLoginState
        , starFollow
    ]);

    const userPageHandler = e => {
        redirect('')
    }

    return (
        <div className="user-page">
            <div className="user-info">
                <div className={"user-setting-buttons"}>
                    <LobbyButton />
                    { userPageMaster ? <Logout isUserId={userPageInfo.id}/> : <MyPageButton /> }
                </div>

                <div className={"user-page-background"} style={backgroundHandler}>
                    <div className={"user-info-item-content"}>
                        <div className={"user-page-profile"} style={profileImage}
                            onClick={userPageMaster ? profileHandler : null}>
                            { profilePath ? '' : <BsFillPersonFill/> }
                            <input
                                onChange={isProfile}
                                type="file"
                                id="profile-img"
                                accept="image/*"
                                style={{display: 'none'}}
                                name="profileImage" />
                        </div>
                        <div className={"user-info-contain"}>
                            <h1 className={"user-name-item"}>{userPageInfo.nickname}</h1>
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
                        <p> { userPageMaster ? 'Followers' : <button onClick={starFollowHandler}> { starFollow ? 'Following' : 'Follow' } </button> }</p>
                        <p onClick={followListHandler}>{starFollowCount}</p>
                        { followListModal ?
                            <ul className={"user-follow-list-item"}>
                                {userFollowList.length===0 ? '아직 팔로워가 없습니다~':''}
                                {userFollowList.map(user => (
                                    <li key={user.fi} onClick={userPageHandler}>{user.fi}</li>
                                ))}
                            </ul> : ''
                        }
                    </div>
                    <div className={"game-score-item"}>
                        <div className={"game-score-icon"}><BsFillXDiamondFill /></div>
                        <p>Point</p>
                        <p>{userPageInfo.score}</p>
                    </div>
                    <div className={"create-member-date"}>
                        <div className={"game-create-start-icon"}><IoIosCreate /></div>
                        <p>{userPageInfo.createDate}</p>
                        <p>{fewDay}일 째</p>
                    </div>
                </div>
                { userPageMaster ? <MemberDelete /> : ''}
            </div>
        </div>
    );
};

export default UserMyPage;