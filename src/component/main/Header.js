import React, {useEffect, useState} from 'react';
import './scss/Header.scss';
import {getAutoCurrentLoginUser, getCurrentLoginUser, isAutoLogin, isLogin} from "../../config/login-util";
import {useNavigate} from "react-router-dom";
import starImage from "../../assets/img/star.png";
import logoImage from "../../user/scss/img/project-logo.png";
import {JOIN_URL, PROFILE_URL} from "../../config/host-config";

const Header = () => {
    const [HimageFile, setHImageFile] = useState(null);
    const currentUser = (isLogin() ? getCurrentLoginUser() : getAutoCurrentLoginUser());
    const currentUserNickname = currentUser?.username || '';
    const userId = currentUser?.id || '';
    const nav = useNavigate();
    const redirection = useNavigate();
    const logoutHandler = e => {

        if(isLogin()){
            sessionStorage.clear();

        } else if(isAutoLogin()){
            localStorage.clear();

        }

        redirection('/');

    }

    const fetchProfileImage = () => {
        const url = JOIN_URL + "/profile-image";
        fetch(url, {
            method: 'Post',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                userid : getCurrentLoginUser().id
            })
        })
            .then(res => res.text())
            .then(json => {
                    setHImageFile(json)
                }
            )
    };
    useEffect(() => {
        currentUserNickname && fetchProfileImage();
    }, [currentUserNickname]);
    return (
        <div className="h-box">
            <img src={logoImage} alt="asd" className='header_logo'/>
            <div className="header">
                <table>
                    <tbody>
                        <tr>
                            <td className="header-table">
                                <li>
                                    <div>
                                        <img src={HimageFile || starImage} alt='미니 프로필 사진'  className='header_profile_image'/>
                                    </div>
                                </li>
                                <li>
                                    {/*<a href="/login">로그인/회원가입</a>*/}
                                    {
                                        isLogin()
                                            ?
                                            (
                                                <button className='header-login-btn' onClick={logoutHandler}>
                                                    로그아웃
                                                </button>
                                            )
                                            :
                                            (
                                                <a href="/login">로그인</a>
                                            )
                                    }
                                </li>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Header;